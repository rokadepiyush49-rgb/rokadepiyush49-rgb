#!/usr/bin/env node
/**
 * Pulls the real contribution calendar (and public repo count) for the
 * profile owner into data/contributions.json. Then run `npm run assets`.
 *
 *   1. GitHub GraphQL API — exact; needs GITHUB_TOKEN (the Actions token works).
 *   2. Public calendar page — no auth; parsed from data-date / tooltips.
 *
 * Exits 1 (and keeps the old file) if both sources fail.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'data', 'contributions.json');

const current = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : {};
const LOGIN = process.env.GITHUB_LOGIN || current.login || 'rokadepiyush49-rgb';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const UA = { 'User-Agent': 'mario-profile-generator' };

async function viaGraphQL() {
  if (!TOKEN) return null;
  const query = `query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...UA, Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  const user = json.data?.user;
  const cal = user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(`no calendar returned for ${LOGIN}`);

  const all = cal.weeks.flatMap((w) => w.contributionDays);
  const days = {};
  for (const d of all) if (d.contributionCount > 0) days[d.date] = d.contributionCount;
  return {
    days,
    from: all[0].date,
    to: all[all.length - 1].date,
    repos: user.repositories?.totalCount,
    source: 'GitHub GraphQL API',
  };
}

async function viaPublicPage() {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(LOGIN)}/contributions`, {
    headers: { ...UA, Accept: 'text/html' },
  });
  if (!res.ok) throw new Error(`calendar ${res.status} ${res.statusText}`);
  const html = await res.text();

  const dates = [];
  const levels = new Map();
  const ids = new Map();
  const cellRe = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
  let m;
  while ((m = cellRe.exec(html))) {
    dates.push(m[1]);
    const lv = /data-level="(\d)"/.exec(m[0]);
    if (lv) levels.set(m[1], Number(lv[1]));
    const id = /id="([^"]+)"/.exec(m[0]);
    if (id) ids.set(id[1], m[1]);
  }
  if (!dates.length) throw new Error('no contribution cells found');

  const days = {};
  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
  while ((m = tipRe.exec(html))) {
    const date = ids.get(m[1]);
    const n = parseInt(m[2], 10);
    if (date && Number.isFinite(n) && n > 0) days[date] = n;
  }
  if (!Object.keys(days).length) {
    const MID = [0, 1, 3, 6, 10];
    for (const [date, lv] of levels) if (lv > 0) days[date] = MID[lv];
  }
  dates.sort();

  let repos;
  try {
    const r = await fetch(`https://api.github.com/users/${encodeURIComponent(LOGIN)}`, { headers: UA });
    if (r.ok) repos = (await r.json()).public_repos;
  } catch {
    /* keep the previous count */
  }
  return { days, from: dates[0], to: dates[dates.length - 1], repos, source: 'public contributions page' };
}

async function main() {
  console.log(`\n  syncing contributions for @${LOGIN}`);
  let result = null;
  for (const [name, fn] of [
    ['GraphQL API', viaGraphQL],
    ['public page', viaPublicPage],
  ]) {
    try {
      result = await fn();
      if (result) {
        console.log(`  ✓ ${name}`);
        break;
      }
      console.log(`  – ${name} skipped (no GITHUB_TOKEN)`);
    } catch (err) {
      console.log(`  ✗ ${name}: ${err.message}`);
    }
  }
  if (!result) {
    console.error('  could not sync; leaving data/contributions.json untouched');
    process.exit(1);
  }

  const out = {
    login: LOGIN,
    source: result.source,
    repos: result.repos ?? current.repos ?? 0,
    range: { from: result.from, to: result.to },
    days: Object.fromEntries(Object.entries(result.days).sort(([a], [b]) => (a < b ? -1 : 1))),
  };
  fs.writeFileSync(FILE, `${JSON.stringify(out, null, 2)}\n`);
  const total = Object.values(out.days).reduce((a, b) => a + b, 0);
  console.log(`  ${Object.keys(out.days).length} active days · ${total} contributions · ${out.repos} public repos\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
