#!/usr/bin/env node
/**
 * Renders every image README.md references into ./readme/.
 *
 *   node scripts/generate-assets.mjs
 *
 * Deterministic: same data in, byte-identical SVGs out (no Math.random, no
 * Date.now), so re-running only produces a diff when the content changed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { P, W, RAMP } from './lib/theme.mjs';
import { svgDoc, esc, R, notch, panel, slab } from './lib/svg.mjs';
import { ptext, pxWidth, sprite, spriteSize, mono, wrap } from './lib/pixel.mjs';
import * as S from './lib/sprites.mjs';
import { FRAME_CSS, SPIN_CSS, TILE_CSS, TWINKLE_CSS, bumpBlock, coin, chipRow, itemIn } from './lib/bits.mjs';
import { buildCalendar, level, deriveStats, prettyDay } from './lib/calendar.mjs';
import { hero, divider, sectionHeader, saveRoom, vine, footer } from './scenes.mjs';
import { buildReadme } from './readme.mjs';
import { profile } from '../data/profile.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'readme');
fs.mkdirSync(OUT, { recursive: true });

const contrib = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'contributions.json'), 'utf8'));
const cal = buildCalendar(contrib);
const stats = deriveStats(contrib);

const written = [];
function write(name, svg) {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, svg.replace(/\n\s*\n/g, '\n'));
  written.push([name, fs.statSync(file).size]);
}

const pct = (n) => `${R(n, 2)}%`;

/* ══════════════════════════════════════════════════════════════ POWER-UPS */
function powerUps() {
  const groups = profile.powerUps;
  const gap = 18;
  const colW = (W - gap) / 2;
  const heights = groups.map(
    (g) => 76 + chipRow(g.items, { x: 0, y: 0, maxWidth: colW - 52, s: 2, rowGap: 8 }).height + 26
  );
  const rowH = [];
  for (let i = 0; i < groups.length; i += 2) rowH.push(Math.max(heights[i], heights[i + 1] || 0));
  const total = rowH.reduce((a, b) => a + b + gap, 0) - gap + 4;

  const blocks = groups.map((g, i) => {
    const row = Math.floor(i / 2);
    const x = (i % 2) * (colW + gap);
    const y = rowH.slice(0, row).reduce((a, b) => a + b + gap, 0);
    const chips = chipRow(g.items, { x: x + 22, y: y + 72, maxWidth: colW - 52, s: 2, rowGap: 8, delay0: 150 + i * 90, step: 45 });
    const label = g.label.toUpperCase();
    const ts = Math.min(3, R((colW - 72 - 30) / pxWidth(label, 1, { bold: true }), 2));
    return `
    <g class="tile" style="animation-delay:${i * 90}ms">
      ${panel({ x, y, w: colW, h: rowH[row] })}
      ${slab({ x: x + 18, y: y + 16, w: 40, h: 40, fill: '#fff', shadow: 3, border: 2.5 })}
      <g class="float" style="animation-delay:${i * 0.3}s">${itemIn(g.item, x + 38, y + 36, 28)}</g>
      ${ptext(label, { x: x + 72, y: y + 20 + (3 - ts) * 3.5, s: ts, bold: true, fill: '#fff', outline: P.ink })}
      ${ptext(g.note.toUpperCase(), { x: x + 72, y: y + 50, s: 1.5, fill: P.inkSoft })}
      ${chips.markup}
    </g>`;
  });

  return svgDoc({
    w: W,
    h: total,
    title: 'Power-ups: languages, frameworks, data and tools',
    desc: groups.map((g) => `${g.label}: ${g.items.join(', ')}`).join('. '),
    css: `${TILE_CSS}
    @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    .float{animation:float 1.6s steps(2) infinite}`,
    body: blocks.join(''),
  });
}

/* ═══════════════════════════════════════════════════════════════ LEVELS */
function levelCard(lv, i) {
  const pad = 26;
  const innerW = W - 6;
  const chipsProbe = chipRow(lv.stack, { x: 0, y: 0, maxWidth: innerW - 2 * pad - 90, s: 2, rowGap: 8 });
  const chipsY = 132;
  const descY = chipsY + chipsProbe.height + 34;
  const descLines = wrap(lv.blurb, innerW - 2 * pad - 90, 13.5).length;
  const repoY = descY + (descLines - 1) * 20 + 22;
  const repoList = lv.repos.filter((r) => r.kind === 'repo');
  const fullW = repoList.reduce((a, r) => a + r.url.replace(/^https?:\/\/github\.com\//, '').length * 7.8 + 62, 0);
  const shortNames = fullW > innerW - 2 * pad - 90;
  const groundY = repoY + 52;
  const h = groundY + 22 + 6;

  const chips = chipRow(lv.stack, { x: pad, y: chipsY, maxWidth: innerW - 2 * pad - 90, s: 2, rowGap: 8, delay0: 120, step: 45 });

  const badge = lv.badge.toUpperCase();
  const bw = pxWidth(badge, 2) + 48;
  const isLive = lv.repos.some((r) => r.kind === 'live');

  const repoChips = repoList
    .reduce(
      (acc, r, k) => {
        const full = r.url.replace(/^https?:\/\/github\.com\//, '');
        const label = shortNames ? full.split('/')[1] : full;
        const w = R(label.length * 13 * 0.6 + 50);
        acc.out.push(`<g class="tile" style="animation-delay:${300 + k * 90}ms">
          ${slab({ x: acc.x, y: repoY, w, h: 30, fill: '#fff', shadow: 3, border: 2.5 })}
          ${sprite(S.ICON_PIPE, S.PIPE_PAL, { x: acc.x + 9, y: repoY + 6, s: 1.6 })}
          ${mono(label, { x: acc.x + 36, y: repoY + 20, size: 13, fill: P.ink, weight: 700 })}
        </g>`);
        acc.x += w + 12;
        return acc;
      },
      { x: pad, out: [] }
    ).out;

  const q = bumpBlock({ id: `lq${i}`, x: W - 6 - 22 - 48, y: groundY - 48 - 22, s: 3, period: 4.2 + i * 0.4, at: 0.1, pop: 40 });
  const clip = notch(1.5, 1.5, W - 9, h - 9, 8);

  const body = `
  <g class="tile">
    ${panel({ x: 0, y: 0, w: W, h })}
    <clipPath id="cc${i}"><path d="${clip}"/></clipPath>
    <g clip-path="url(#cc${i})">
      <rect x="0" y="${groundY}" width="${W}" height="40" fill="url(#brickS)"/>
      <rect x="0" y="${groundY}" width="${W}" height="3" fill="${P.ink}"/>
    </g>
    <path d="${clip}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    ${slab({ x: pad, y: 22, w: pxWidth(lv.code, 2) + 20, h: 24, fill: P.ink, shadow: 0, border: 2 })}
    ${ptext(lv.code, { x: pad + 10, y: 27, s: 2, fill: P.gold })}
    ${ptext(lv.name.toUpperCase(), { x: pad + 4, y: 60, s: 4, bold: true, fill: '#fff', outline: P.ink, shadow: P.ink })}
    ${mono(lv.subtitle, { x: pad, y: 118, size: 14, fill: P.inkSoft, weight: 700 })}
    <g class="tile" style="animation-delay:200ms">
      ${slab({ x: W - 6 - pad - bw, y: 22, w: bw, h: 30, fill: isLive ? P.yellow : '#fff', shadow: 3 })}
      <g class="tw">${sprite(S.STAR, S.STAR_PAL, { x: W - 6 - pad - bw + 9, y: 27, s: 1.25 })}</g>
      ${ptext(badge, { x: W - 6 - pad - bw + 36, y: 30, s: 2, fill: P.ink })}
    </g>
    ${chips.markup}
    ${mono(lv.blurb, { x: pad, y: descY, size: 13.5, fill: P.inkSoft, maxWidth: innerW - 2 * pad - 90, lh: 20, weight: 600 })}
    ${repoChips.join('')}
    ${q.body}
  </g>`;

  return svgDoc({
    w: W,
    h,
    title: `${lv.code}: ${lv.name} — ${lv.subtitle}`,
    desc: `${lv.name}, ${lv.subtitle}. ${lv.badge}. Built with ${lv.stack.join(', ')}. ${lv.blurb} ${lv.repos.map((r) => r.url).join(', ')}`,
    css: `${TILE_CSS}${SPIN_CSS}${TWINKLE_CSS}${q.css}`,
    body,
  });
}

/* ═════════════════════════════════════════════════════════════ BUTTONS */
const BTN_ICON = {
  repo: [S.ICON_PIPE, S.PIPE_PAL],
  live: [S.STAR, S.STAR_PAL],
  mail: [S.ICON_MAIL, { K: P.ink, W: '#fff' }],
  github: [S.ICON_CAT, { K: P.ink, W: '#fff' }],
  linkedin: [S.ICON_IN, { B: '#0A66C2', W: '#fff' }],
  instagram: [S.ICON_CAM, { K: '#C13584' }],
};

function button({ label, kind, fill = '#fff' }) {
  const h = 38;
  const [grid, pal] = BTN_ICON[kind];
  const gw = Math.max(...grid.map((r) => r.length));
  const is = R(18 / Math.max(gw, grid.length), 3);
  const L = label.toUpperCase();
  const tw = pxWidth(L, 2);
  const w = R(12 + 18 + 10 + tw + 12 + 12 + 14);
  const bw = w - 4;
  const bh = h - 4;
  const css = `
  @keyframes glint{0%,70%{transform:translateX(-60px)}100%{transform:translateX(${w + 40}px)}}
  .gl{animation:glint 3.4s ease-in infinite}
  @keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}
  .ar{animation:nudge 1s steps(2) infinite}`;
  const body = `
  <clipPath id="bc"><rect x="0" y="0" width="${bw}" height="${bh}"/></clipPath>
  <rect x="4" y="4" width="${bw}" height="${bh}" fill="${P.ink}"/>
  <rect x="0" y="0" width="${bw}" height="${bh}" fill="${fill}"/>
  <rect x="0" y="${bh - 5}" width="${bw}" height="5" fill="#000" fill-opacity="0.12"/>
  <g clip-path="url(#bc)"><path class="gl" d="M0 0 H14 L4 ${bh} H-10 Z" fill="#fff" fill-opacity="0.65"/></g>
  <rect x="1.25" y="1.25" width="${bw - 2.5}" height="${bh - 2.5}" fill="none" stroke="${P.ink}" stroke-width="2.5"/>
  ${sprite(grid, pal, { x: R(12 + (18 - gw * is) / 2), y: R((bh - grid.length * is) / 2), s: is })}
  ${ptext(L, { x: 40, y: R((bh - 14) / 2), s: 2, fill: P.ink })}
  <g class="ar">${ptext('→', { x: 40 + tw + 10, y: R((bh - 14) / 2), s: 2, fill: P.red })}</g>`;
  return svgDoc({ w, h, title: label, css, body });
}

/* ══════════════════════════════════════════════════ CONTRIBUTION WORLD */
function contributionWorld() {
  const CELL = 12;
  const GAP = 3;
  const STEP = CELL + GAP;
  const gridX = 52;
  const gridY = 128;
  const gridW = cal.weeks.length * STEP;
  const floorY = 318;
  const h = floorY + 26 + 9;
  const inner = W - 9;

  const cells = [];
  const hot = [];
  const hotCols = new Set();
  cal.weeks.forEach((col, ci) => {
    col.forEach((c, ri) => {
      if (c.count === null) return;
      const lv = level(c.count, cal.max);
      const x = gridX + ci * STEP;
      const y = gridY + ri * STEP;
      const delay = R((ci / cal.weeks.length) * 1800 + ri * 30, 0);
      let art = `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="${RAMP[lv]}"/>`;
      if (lv === 1) art += `<rect x="${x}" y="${y}" width="${CELL}" height="2" fill="${P.caveBrickHi}"/><rect x="${x}" y="${y + 6}" width="${CELL}" height="1" fill="${P.caveBrickLo}"/><rect x="${x + 6}" y="${y}" width="1" height="6" fill="${P.caveBrickLo}"/>`;
      if (lv === 2) art += `<rect x="${x}" y="${y}" width="${CELL}" height="2" fill="${P.brickHi}"/><rect x="${x}" y="${y + 6}" width="${CELL}" height="1" fill="${P.brickLo}"/><rect x="${x + 4}" y="${y + 7}" width="1" height="5" fill="${P.brickLo}"/>`;
      if (lv === 3) art += `<rect x="${x + 0.5}" y="${y + 0.5}" width="${CELL - 1}" height="${CELL - 1}" fill="none" stroke="${P.qblockLo}" stroke-width="1"/><rect x="${x + 4}" y="${y + 3}" width="4" height="1" fill="#FFF4D6"/><rect x="${x + 7}" y="${y + 4}" width="1" height="2" fill="#FFF4D6"/><rect x="${x + 5}" y="${y + 6}" width="2" height="1" fill="#FFF4D6"/><rect x="${x + 5}" y="${y + 8}" width="2" height="2" fill="#FFF4D6"/>`;
      if (lv === 4) art = `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="${P.coin}"/><rect x="${x + 0.5}" y="${y + 0.5}" width="${CELL - 1}" height="${CELL - 1}" fill="none" stroke="${P.coinLo}" stroke-width="1"/><rect x="${x + 3}" y="${y + 2}" width="2" height="8" fill="${P.coinHi}"/><rect x="${x + 7}" y="${y + 3}" width="2" height="6" fill="${P.coinLo}"/>`;
      cells.push(`<g class="c${lv === 4 ? ' l4' : ''}" style="animation-delay:${delay}ms">${art}</g>`);
      if (lv >= 3) {
        hot.push({ x: x + CELL / 2, y: y + CELL / 2, lv, delay, ci });
        hotCols.add(ci);
      }
    });
  });

  /* coin arcs between neighbouring hot cells */
  hot.sort((a, b) => a.x - b.x || a.y - b.y);
  const links = [];
  for (let i = 0; i < hot.length - 1; i++) {
    const a = hot[i];
    const b = hot[i + 1];
    if (Math.hypot(b.x - a.x, b.y - a.y) > 70) continue;
    links.push(
      `<path class="lnk sm" d="M${a.x} ${a.y}Q${R((a.x + b.x) / 2)} ${R(Math.min(a.y, b.y) - 16)} ${b.x} ${b.y}" fill="none" stroke="${P.gold}" stroke-width="1.4" stroke-dasharray="2 3" style="animation-delay:${a.delay + 260}ms"/>`
    );
  }

  /* coins popping off the hottest days */
  const pops = hot
    .filter((p) => p.lv === 4)
    .slice(0, 16)
    .map((p, i) => `<g class="cp" style="animation-delay:${R(1.6 + i * 0.45, 2)}s">${sprite(S.COIN, S.COIN_PAL, { x: p.x - 5, y: p.y - 22, s: 1 })}</g>`)
    .join('');

  /* mario runs the year, jumping on every hot week */
  const T = 22;
  const runX0 = gridX - 40;
  const runX1 = gridX + gridW + 4;
  const xAt = (ci) => ((gridX + ci * STEP + CELL / 2 - 18 - runX0) / (runX1 - runX0)) * 90;
  const jumps = [...hotCols].sort((a, b) => a - b).map(xAt);
  const kf = ['0%{transform:translateY(0)}'];
  let last = -10;
  for (const t of jumps) {
    if (t - last < 3.2 || t < 2 || t > 88) continue;
    kf.push(`${pct(t - 1.4)}{transform:translateY(0)}${pct(t)}{transform:translateY(-24px)}${pct(t + 1.4)}{transform:translateY(0)}`);
    last = t;
  }
  kf.push('100%{transform:translateY(0)}');
  const my = floorY - 36;

  const css = `${FRAME_CSS}${SPIN_CSS}
  @keyframes cellIn{0%{transform:translateY(-6px) scale(.4)}70%{transform:translateY(-2px) scale(1.15)}100%{transform:translateY(0) scale(1)}}
  .c{transform-box:fill-box;transform-origin:50% 50%;animation:cellIn .55s cubic-bezier(.3,1.4,.5,1) backwards}
  @keyframes shine{0%,100%{opacity:1}50%{opacity:.7}}
  .l4{animation:cellIn .55s cubic-bezier(.3,1.4,.5,1) backwards, shine 1.6s steps(2) 1.2s infinite}
  @keyframes lnkIn{0%{stroke-dashoffset:60;opacity:0}100%{stroke-dashoffset:0;opacity:.75}}
  .lnk{opacity:.75;animation:lnkIn 1s ease-out backwards}
  @keyframes cp{0%{transform:translateY(6px);opacity:0}15%{opacity:1}60%{transform:translateY(-14px);opacity:1}80%,100%{transform:translateY(-18px);opacity:0}}
  .cp{opacity:0;animation:cp 7.2s ease-out infinite}
  @keyframes run{0%{transform:translateX(0)}90%{transform:translateX(${runX1 - runX0}px)}100%{transform:translateX(${runX1 - runX0}px)}}
  @keyframes vis{0%{opacity:1}90%{opacity:0}}
  @keyframes hopY{${kf.join('')}}
  .run{animation:run ${T}s linear infinite}
  .hop{animation:hopY ${T}s linear infinite}
  .vis{animation:vis ${T}s steps(1) infinite}
  `;

  const legendX = gridX + gridW - 110;
  const legendY = gridY + 7 * STEP + 14;
  const legend = `
    ${ptext('LESS', { x: legendX - 8, y: legendY + 2, s: 1.5, fill: P.caveFaint, anchor: 'end' })}
    ${[0, 1, 2, 3, 4].map((lv) => `<rect x="${legendX + lv * 16}" y="${legendY}" width="12" height="12" fill="${RAMP[lv]}"/>`).join('')}
    ${ptext('MORE', { x: legendX + 5 * 16 + 4, y: legendY + 2, s: 1.5, fill: P.caveFaint })}`;

  const months = cal.months
    .map((m) => ptext(m.label.toUpperCase(), { x: gridX + m.col * STEP, y: gridY - 16, s: 1.5, fill: P.caveFaint }))
    .join('');
  const daysL = ['MON', 'WED', 'FRI']
    .map((d, i) => ptext(d, { x: gridX - 8, y: gridY + (i * 2 + 1) * STEP + 1, s: 1.2, fill: P.caveFaint, anchor: 'end' }))
    .join('');

  const clip = notch(1.5, 1.5, inner - 3, h - 9, 10);
  const body = `
  <path d="${notch(7.5, 7.5, inner - 3, h - 9, 10)}" fill="${P.ink}"/>
  <path d="${clip}" fill="${P.cave}"/>
  <clipPath id="uc"><path d="${clip}"/></clipPath>
  <g clip-path="url(#uc)">
    <rect x="0" y="0" width="${W}" height="26" fill="url(#caveBrick)"/>
    <rect x="0" y="26" width="${W}" height="3" fill="${P.ink}"/>
    <rect x="0" y="${floorY}" width="${W}" height="40" fill="url(#caveBrick)"/>
    <rect x="0" y="${floorY}" width="${W}" height="3" fill="${P.ink}"/>
  </g>
  <path d="${clip}" fill="none" stroke="${P.ink}" stroke-width="3"/>
  ${ptext('WORLD 1-2 · UNDERGROUND', { x: 26, y: 44, s: 1.5, fill: P.gold })}
  ${ptext('EVERY COMMIT IS A COIN.', { x: 26, y: 62, s: 3, bold: true, fill: P.caveText })}
  ${mono(`@${contrib.login} · custom calendar, refreshed daily by GitHub Actions`, { x: 26, y: 102, size: 12, fill: P.caveFaint })}
  <g transform="translate(${inner - 26 - pxWidth(String(cal.total), 5, { bold: true }) - 34} 44)">${coin(0, 4, 2.2)}</g>
  ${ptext(String(cal.total), { x: inner - 26, y: 46, s: 5, bold: true, fill: P.gold, anchor: 'end', shadow: '#5E3300' })}
  ${mono(`contributions · ${contrib.range.from} → ${contrib.range.to}`, { x: inner - 26, y: 102, size: 11, fill: P.caveFaint, anchor: 'end' })}
  ${months}${daysL}
  ${cells.join('')}
  ${links.join('')}
  ${pops}
  ${legend}
  ${mono(`${stats.activeDays} active days · best day ${stats.bestDay.count} on ${stats.bestDay.date ?? '—'} · longest streak ${stats.longestStreak} day${stats.longestStreak === 1 ? '' : 's'}`, { x: gridX, y: legendY + 11, size: 11.5, fill: P.caveFaint })}
  <g class="vis"><g class="run"><g class="hop">${`<g class="fA" style="animation-duration:.24s">${sprite(S.MARIO_WALK_A, S.MARIO_PAL, { x: runX0, y: my, s: 2, outline: P.ink })}</g><g class="fB" style="animation-duration:.24s">${sprite(S.MARIO_WALK_B, S.MARIO_PAL, { x: runX0, y: my, s: 2, outline: P.ink })}</g>`}</g></g></g>`;

  return svgDoc({
    w: W,
    h,
    title: `Contribution world — ${cal.total} contributions from ${contrib.range.from} to ${contrib.range.to}`,
    desc: `Underground-level styled GitHub contribution calendar for ${contrib.login}: bricks for light days, ?-blocks and coins for the busiest. ${stats.activeDays} active days, best day ${stats.bestDay.count}, longest streak ${stats.longestStreak} days. Mario runs across the year jumping at every busy week.`,
    css,
    body,
  });
}

/* ═════════════════════════════════════════════════════════ HIGH SCORE */
function highScore() {
  const h = 158;
  const gap = 14;
  const tw = (W - 3 * gap) / 4;
  const tiles = [
    { v: String(cal.total).padStart(6, '0'), l: 'SCORE · 12 MONTHS', icon: 'coin' },
    { v: `×${stats.activeDays}`, l: 'ACTIVE DAYS', icon: 'oneup' },
    { v: String(stats.bestDay.count), l: `BEST DAY · ${prettyDay(stats.bestDay.date).toUpperCase()}`, icon: 'star' },
    { v: `${stats.longestStreak}D`, l: 'LONGEST STREAK', icon: 'flower' },
  ];
  const body = tiles
    .map((t, i) => {
      const x = i * (tw + gap);
      const vs = pxWidth(t.v, 5, { bold: true }) > tw - 40 ? 4 : 5;
      const ls = pxWidth(t.l, 2) > tw - 30 ? 1.5 : 2;
      return `<g class="tile" style="animation-delay:${i * 110}ms">
        ${panel({ x, y: 4, w: tw, h: h - 8 })}
        <g class="${t.icon === 'coin' ? '' : 'float'}" style="animation-delay:${i * 0.2}s">${t.icon === 'coin' ? coin(x + 16, 18, 1.6) : itemIn(t.icon, x + 30, 32, 26)}</g>
        ${ptext(t.v, { x: x + (tw - 6) / 2, y: 58, s: vs, bold: true, fill: '#fff', outline: P.ink, shadow: P.ink, anchor: 'middle' })}
        ${ptext(t.l, { x: x + (tw - 6) / 2, y: ls === 2 ? 112 : 114, s: ls, fill: P.ink, anchor: 'middle' })}
      </g>`;
    })
    .join('');
  return svgDoc({
    w: W,
    h,
    title: 'High score: GitHub activity summary',
    desc: tiles.map((t) => `${t.l}: ${t.v}`).join('. '),
    css: `${TILE_CSS}${SPIN_CSS}
    @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    .float{animation:float 1.6s steps(2) infinite}`,
    body,
  });
}

/* ═════════════════════════════════════════════════════════ QUEST LOG */
function logPanel(items, { title, describe, tag = 'NOW PLAYING' }) {
  const gap = 14;
  const rows = items.map((q) => {
    const lines = wrap(q.detail, W - 130 - 40, 13).length;
    return { q, h: 104 + (lines - 1) * 19 };
  });
  let y = 0;
  const body = rows
    .map(({ q, h }, i) => {
      const y0 = y;
      y += h + gap;
      const when = q.when.toUpperCase();
      const ww = pxWidth(when, 2) + 20;
      const org = q.org.toUpperCase();
      const room = W - 6 - 22 - ww - 18 - 96 - (q.current ? pxWidth(tag, 1.5) + 14 : 0);
      const ts = Math.min(3, R(room / pxWidth(org, 1, { bold: true }), 2));
      return `<g class="tile" style="animation-delay:${i * 90}ms">
        ${panel({ x: 0, y: y0, w: W, h })}
        ${slab({ x: 20, y: y0 + 16, w: 56, h: 56, fill: q.current ? P.qblock : '#fff', shadow: 3 })}
        <g class="${q.current ? 'tw' : 'float'}" style="animation-delay:${i * 0.25}s">${itemIn(q.icon, 48, y0 + 44, 36)}</g>
        ${ptext(org, { x: 96, y: y0 + 20 + (3 - ts) * 3.5, s: ts, bold: true, fill: '#fff', outline: P.ink })}
        ${slab({ x: W - 6 - 22 - ww, y: y0 + 16, w: ww, h: 26, fill: q.current ? P.yellow : '#fff', shadow: 3 })}
        ${ptext(when, { x: W - 6 - 22 - ww + 10, y: y0 + 22, s: 2, fill: P.ink })}
        ${q.current ? `<g class="blink">${ptext(tag, { x: W - 6 - 22 - ww - 14, y: y0 + 24, s: 1.5, fill: P.ink, anchor: 'end' })}</g>` : ''}
        ${mono(q.where ? `${q.role} · ${q.where}` : q.role, { x: 96, y: y0 + 60, size: 14, fill: P.inkSoft, weight: 700 })}
        ${mono(q.detail, { x: 96, y: y0 + 82, size: 13, fill: P.inkSoft, maxWidth: W - 130 - 40, lh: 19, weight: 500 })}
      </g>`;
    })
    .join('');
  return svgDoc({
    w: W,
    h: y - gap + 2,
    title,
    desc: items.map(describe).join(' '),
    css: `${TILE_CSS}${TWINKLE_CSS}
    @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    .float{animation:float 1.8s steps(2) infinite}
    @keyframes blink{0%{opacity:1}50%{opacity:0}}
    .blink{animation:blink 1s steps(1) infinite}`,
    body,
  });
}

/* ════════════════════════════════════════════════════════════ CONTACT */
function contact() {
  const h = 230;
  const id = profile.identity;
  const rows = [
    { grid: S.ICON_MAIL, pal: { K: P.ink, W: '#fff' }, text: id.email },
    { grid: S.ICON_CAT, pal: { K: P.ink, W: '#fff' }, text: `@${id.login}` },
    { grid: S.ICON_IN, pal: { B: '#0A66C2', W: '#fff' }, text: `in/${id.linkedin}` },
    { grid: S.ICON_CAM, pal: { K: '#C13584' }, text: `@${id.instagram}` },
    { grid: S.ICON_PIN, pal: { K: P.ink, R: P.red, W: '#fff' }, text: id.location },
  ];
  const lx = 476;
  const list = rows
    .map((r, i) => {
      const cy = 24 + i * 38;
      const gw = Math.max(...r.grid.map((x) => x.length));
      const s = R(20 / Math.max(gw, r.grid.length), 3);
      return `<g class="tile" style="animation-delay:${150 + i * 90}ms">
        ${slab({ x: lx, y: cy, w: 32, h: 32, fill: '#fff', shadow: 3, border: 2.5 })}
        ${sprite(r.grid, r.pal, { x: R(lx + (32 - gw * s) / 2), y: R(cy + (32 - r.grid.length * s) / 2), s })}
        ${mono(r.text, { x: lx + 46, y: cy + 21, size: 15, fill: P.ink, weight: 700 })}
      </g>`;
    })
    .join('');

  const ms = 1.12;
  const msz = spriteSize(S.MARIO_MAIN, ms);
  const mx = 34;
  const my = h - 6 - 34 - msz.h + 5;
  const [pvx, pvy] = S.MAIN_PIVOT.map((v, i) => R((i ? my : mx) + v * ms));
  const shout = profile.contact.shout;
  const bw = pxWidth(shout, 3, { bold: true }) + 36;
  const bx = 150;
  const by = 28;

  const css = `${TILE_CSS}
  @keyframes jump{0%,40%,100%{transform:translateY(0)}55%{transform:translateY(-30px)}70%{transform:translateY(0)}78%{transform:translateY(-8px)}86%{transform:translateY(0)}}
  .jump{animation:jump 1.8s cubic-bezier(.3,.7,.4,1) infinite}
  @keyframes pump{0%,30%,100%{transform:rotate(0)}40%{transform:rotate(-10deg)}50%{transform:rotate(3deg)}60%{transform:rotate(-6deg)}70%{transform:rotate(0)}}
  .pump{animation:pump 1.8s cubic-bezier(.3,.7,.4,1) infinite}
  @keyframes bubblePop{0%{transform:scale(.8) rotate(-4deg)}60%{transform:scale(1.06) rotate(1.5deg)}100%{transform:scale(1) rotate(0)}}
  .bubble{transform-box:fill-box;transform-origin:10% 100%;animation:bubblePop .7s cubic-bezier(.3,1.3,.4,1) backwards}
  @keyframes wig{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
  .wig{transform-box:fill-box;transform-origin:10% 100%;animation:wig 1.8s steps(2) 1s infinite}`;

  const clip = notch(1.5, 1.5, W - 9, h - 9, 8);
  const body = `
  ${panel({ x: 0, y: 0, w: W, h })}
  <clipPath id="ctc"><path d="${clip}"/></clipPath>
  <g clip-path="url(#ctc)">
    <rect x="0" y="${h - 6 - 34}" width="380" height="40" fill="url(#brickS)"/>
    <rect x="0" y="${h - 6 - 34}" width="380" height="3" fill="${P.ink}"/>
  </g>
  <g class="jump">
    <g class="pump" style="transform-origin:${pvx}px ${pvy}px">${sprite(S.MARIO_MAIN_ARM, S.MAIN_PAL, { x: mx, y: my, s: ms })}</g>
    ${sprite(S.MARIO_MAIN_BODY, S.MAIN_PAL, { x: mx, y: my, s: ms })}
  </g>
  <g class="bubble"><g class="wig">
    <path d="M${bx + 10} ${by + 50} L${bx - 22} ${by + 74} L${bx + 34} ${by + 50} Z" fill="#fff" stroke="${P.ink}" stroke-width="3" class="sm"/>
    <path d="${notch(bx, by, bw, 54, 8)}" fill="#fff"/>
    <path d="${notch(bx, by, bw, 54, 8)}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${bx + 8}" y="${by + 47}" width="28" height="5" fill="#fff"/>
    ${ptext(shout, { x: bx + bw / 2, y: by + 17, s: 3, bold: true, fill: P.red, anchor: 'middle', shadow: P.ink })}
  </g></g>
  ${mono('press start →', { x: bx + 4, y: by + 106, size: 14, fill: P.inkSoft, weight: 700 })}
  ${mono('open to internships,', { x: bx + 4, y: by + 128, size: 13, fill: P.inkSoft, weight: 600 })}
  ${mono('collabs and hackathons.', { x: bx + 4, y: by + 147, size: 13, fill: P.inkSoft, weight: 600 })}
  ${list}`;

  return svgDoc({
    w: W,
    h,
    title: 'Contact panel',
    desc: `Contact ${id.name}: email ${id.email}, GitHub @${id.login}, LinkedIn ${id.linkedin}, Instagram @${id.instagram}, based in ${id.location}.`,
    css,
    body,
  });
}

/* ═══════════════════════════════════════════════════════════════ BUILD */
write('hero.svg', hero({ profile, contrib, total: cal.total }));
write('divider.svg', divider());
write('save-room.svg', saveRoom({ profile }));
write('vine.svg', vine());
write('footer.svg', footer());

const HEADS = [
  ['sec-about.svg', 'Player 1', 'origin story'],
  ['sec-powerups.svg', 'Power-ups', 'tools of the trade'],
  ['sec-levels.svg', 'Levels', 'things I shipped'],
  ['sec-world.svg', 'World map', 'live from github'],
  ['sec-score.svg', 'High score', 'activity readout'],
  ['sec-quests.svg', 'Quest log', "where I've been"],
  ['sec-trophies.svg', 'Star road', 'wall of wins'],
  ['sec-contact.svg', 'Continue?', 'press start'],
];
for (const [file, title, kicker] of HEADS) write(file, sectionHeader(title, kicker));

write('powerups.svg', powerUps());
profile.levels.forEach((lv, i) => {
  write(`level-${i + 1}.svg`, levelCard(lv, i));
  for (const r of lv.repos) {
    write(`btn-${r.slug}.svg`, button({ label: r.label, kind: r.kind, fill: r.kind === 'live' ? P.yellow : '#fff' }));
  }
});
write('world.svg', contributionWorld());
write('score.svg', highScore());
write('quests.svg', logPanel(profile.quests, { title: 'Quest log: experience and leadership', describe: (q) => `${q.role}, ${q.org} (${q.when}). ${q.detail}` }));
write('trophies.svg', logPanel(profile.trophies, { tag: 'NEW!', title: 'Star road: achievements', describe: (q) => `${q.org}: ${q.role}. ${q.detail}` }));
write('contact.svg', contact());
write('btn-mail.svg', button({ label: 'Email', kind: 'mail' }));
write('btn-github.svg', button({ label: 'GitHub', kind: 'github' }));
write('btn-linkedin.svg', button({ label: 'LinkedIn', kind: 'linkedin' }));
write('btn-instagram.svg', button({ label: 'Instagram', kind: 'instagram' }));

fs.writeFileSync(path.join(ROOT, 'README.md'), buildReadme(profile));

const total = written.reduce((a, [, s]) => a + s, 0);
console.log('\n  readme/ assets\n  ' + '─'.repeat(44));
for (const [n, s] of written.sort((a, b) => b[1] - a[1])) console.log(`  ${n.padEnd(28)} ${(s / 1024).toFixed(1).padStart(7)} KB`);
console.log('  ' + '─'.repeat(44));
console.log(`  ${String(written.length).padEnd(28)} ${(total / 1024).toFixed(1).padStart(7)} KB total\n`);
