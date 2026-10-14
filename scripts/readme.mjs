/**
 * Builds README.md from data/profile.mjs so the page and the images can never
 * drift apart. Clickable things are Markdown/HTML anchors wrapping a badge
 * image: GitHub embeds SVGs through <img>, so links inside an SVG are inert.
 */

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const img = (file, alt, extra = 'width="100%"') => `<img src="readme/${file}" alt="${attr(alt)}" ${extra} />`;
const DIV = img('divider.svg', '');
const head = (file, alt) => img(file, alt);

export function buildReadme(profile) {
  const id = profile.identity;
  const repoLink = (r) => `<a href="${r.url}"><img height="38" src="readme/btn-${r.slug}.svg" alt="${attr(r.kind === 'live' ? `Play ${r.label} live` : `${r.label} source code`)}" /></a>`;

  const levels = profile.levels
    .map((lv, i) => {
      const alt = `${lv.code} — ${lv.name}, ${lv.subtitle}. Built with ${lv.stack.join(', ')}.`;
      return `${img(`level-${i + 1}.svg`, alt)}\n\n${lv.repos.map(repoLink).join('\n')}`;
    })
    .join('\n\n');

  const details = profile.levels
    .map((lv) => {
      const links = lv.repos.map((r) => `<a href="${r.url}">${r.kind === 'live' ? 'play live' : lv.repos.length > 1 ? r.label : 'repo'}</a>`).join(' · ');
      return `<details>
<summary><b>${lv.code} — ${lv.name}</b> · ${lv.subtitle} · <i>${lv.badge.toLowerCase()}</i> · ${links}</summary>

${lv.stack.map((t) => `\`${t}\``).join(' ')}

${lv.details.map((d) => `- ${d}`).join('\n')}

</details>`;
    })
    .join('\n\n');

  const table = ['| | |', '| --- | --- |', ...profile.about.table.map(([k, v]) => `| **${k}** | ${v} |`)].join('\n');

  const btn = (href, file, alt) => `  <a href="${href}"><img height="38" src="readme/${file}" alt="${attr(alt)}" /></a>`;

  return `${img('hero.svg', `${id.name} — ${id.role}. ${id.tagline}`)}

${DIV}

${head('sec-about.svg', 'Player 1')}

${profile.about.lines.join('\n')}

${table}

${DIV}

${head('sec-powerups.svg', 'Power-ups')}

${img('powerups.svg', profile.powerUps.map((g) => `${g.label}: ${g.items.join(', ')}`).join('. '))}

<p align="right">
  <img align="left" width="75%" src="readme/save-room.svg" alt="Save room: pixel-art Mario coding at his desk at night while fairy lights blink, the mushroom lamp sways and a potted piranha plant chomps" />
  <img width="16.4%" src="readme/vine.svg" alt="Mario climbs down a beanstalk vine from a used block, sways at the bottom, then climbs back up" />
</p>

<br clear="all" />

<p align="center">
  <img height="28" src="https://visitor-badge.laobi.icu/badge?page_id=${id.login}.profile&left_text=PLAYERS%20VISITED&left_color=%23111111&right_color=%23e52521" alt="Profile views counter" />
</p>

${head('sec-levels.svg', 'Levels')}

${levels}

${details}

${DIV}

${head('sec-world.svg', 'World map')}

${img('world.svg', 'Underground-level styled GitHub contribution calendar. Bricks for light days, question blocks and coins for the busiest; Mario runs across the year and jumps on every busy week.')}

${head('sec-score.svg', 'High score')}

${img('score.svg', 'Activity summary: contributions in the last 12 months, active days, best single day, and longest streak.')}

> The world map above is **not** GitHub's built-in graph, which can't be restyled or animated from a
> README. It's a custom SVG rendered from the real calendar by
> [\`scripts/sync-contributions.mjs\`](scripts/sync-contributions.mjs), and a
> [scheduled workflow](.github/workflows/sync-world.yml) refreshes it every day.

${DIV}

${head('sec-quests.svg', 'Quest log')}

${img('quests.svg', profile.quests.map((q) => `${q.role}, ${q.org} (${q.when}).`).join(' '))}

${head('sec-trophies.svg', 'Star road')}

${img('trophies.svg', profile.trophies.map((t) => `${t.org}: ${t.role}. ${t.detail}`).join(' '))}

${DIV}

${head('sec-contact.svg', 'Continue?')}

${img('contact.svg', `Contact panel: ${id.email}, GitHub @${id.login}, LinkedIn ${id.linkedin}, Instagram @${id.instagram}, ${id.location}`)}

<p align="center">
${btn(`mailto:${id.email}`, 'btn-mail.svg', `Email ${id.email}`)}
${btn(`https://github.com/${id.login}`, 'btn-github.svg', `GitHub @${id.login}`)}
${btn(`https://www.linkedin.com/in/${id.linkedin}`, 'btn-linkedin.svg', `LinkedIn ${id.linkedin}`)}
${btn(`https://instagram.com/${id.instagram}`, 'btn-instagram.svg', `Instagram @${id.instagram}`)}
</p>

${img('footer.svg', 'Level clear: Mario slides down the flagpole, walks into the castle, and fireworks go off. Thank you for visiting!')}

<!--
  ─────────────────────────────────────────────────────────────────────────
  This README is generated, along with every image in it.

    npm run assets   re-render README.md + readme/*.svg from data/profile.mjs
    npm run sync     pull real contribution data, then re-render

  Edit words in data/profile.mjs, not here. See HOW-IT-WORKS.md.
  ─────────────────────────────────────────────────────────────────────────
-->
`;
}
