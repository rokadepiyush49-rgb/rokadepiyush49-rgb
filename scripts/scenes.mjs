/**
 * The four big animated scenes: hero (World 1-1), the save room (Mario coding
 * at night), the vine climb, and the level-clear footer. Plus the divider.
 */

import { P, W } from './lib/theme.mjs';
import { svgDoc, esc, R, notch, slab } from './lib/svg.mjs';
import { ptext, pxWidth, sprite, spriteSize, blob, mono } from './lib/pixel.mjs';
import * as S from './lib/sprites.mjs';
import {
  rng,
  FRAME_CSS,
  SPIN_CSS,
  TILE_CSS,
  TWINKLE_CSS,
  DRIFT_CSS,
  bumpBlock,
  coin,
  chipRow,
  groundDefs,
  ground,
  driftingCloud,
  bush,
  sparkle,
  pipe,
  cloudGrid,
} from './lib/bits.mjs';

const pct = (n) => `${R(n, 2)}%`;

/** Two-frame sprite (frame B starts hidden; see FRAME_CSS). */
function frames(a, b, pal, opts, dur = null) {
  const st = dur ? ` style="animation-duration:${dur}s"` : '';
  return `<g class="fA"${st}>${sprite(a, pal, opts)}</g><g class="fB"${st}>${sprite(b, pal, opts)}</g>`;
}

/* ══════════════════════════════════════════════════════════════════ HERO */
export function hero({ profile, contrib, total }) {
  const H = 400;
  const gy = 340;
  const id = profile.identity;
  const frame = notch(2, 2, W - 10, H - 10, 14);

  /* far cloud bank (image-3 style), tiled twice for a seamless drift */
  const r = rng(7);
  const circles = [];
  for (let i = 0; i < 15; i++) circles.push([8 + i * 14.5 + r() * 5, 14 + r() * 5, 6.5 + r() * 5]);
  const bankGrid = blob({ w: 220, h: 26, circles, rects: [[0, 17, 220, 9]] });
  const bankPal = { w: '#FFFFFF', s: '#D2EEFB' };
  const bank = `<g class="drift" style="animation-duration:200s;--t:-880px" opacity="0.92">
    ${sprite(bankGrid, bankPal, { x: 0, y: gy - 92, s: 4 })}${sprite(bankGrid, bankPal, { x: 880, y: gy - 92, s: 4 })}
  </g>`;

  /* big mario (HD, traced from the reference art) */
  const ms = 2.6;
  const msz = spriteSize(S.MARIO_HD, ms);
  const mx = 664;
  const my = gy - msz.h + 10;

  const q = bumpBlock({ id: 'q1', x: 818, y: 168, s: 3, period: 3.8, at: 0.1, score: '+100' });

  /* left column */
  const kicker = id.kicker.toUpperCase();
  const kw = pxWidth(kicker, 2) + 22;
  const role = id.role.toUpperCase();
  const rw = pxWidth(role, 3, { bold: true }) + 26;
  const badge = id.badge.toUpperCase();
  const bw = pxWidth(badge, 2) + 20;
  const chips = chipRow(id.stack, { x: 40, y: 276, maxWidth: 500, s: 2, rowGap: 6, delay0: 500, step: 70 });

  /* HUD (SMB top bar) */
  const hud = (label, x) => ptext(label, { x, y: 20, s: 3, fill: '#fff', shadow: P.ink });
  const score = String(total).padStart(6, '0');
  const digitStrip = (cls, x) => {
    let d = '';
    for (let i = 0; i < 10; i++) d += ptext(String(9 - i), { x, y: 44 + i * 24, s: 3, fill: '#fff', shadow: P.ink });
    return `<g clip-path="url(#clip${cls})"><g class="${cls}">${d}</g></g>`;
  };
  const tx = 700;

  const css = `
  ${FRAME_CSS}${SPIN_CSS}${TILE_CSS}${TWINKLE_CSS}${DRIFT_CSS}${q.css}
  @keyframes rise{0%{transform:translateY(16px)}100%{transform:translateY(0)}}
  .r1,.r2,.r3,.r4{animation:rise .7s cubic-bezier(.2,.9,.3,1) backwards}
  .r2{animation-delay:.12s}.r3{animation-delay:.24s}.r4{animation-delay:.36s}
  @keyframes bob{0%{transform:translateY(0)}50%{transform:translateY(3px)}}
  .mBob{animation:bob 1.2s steps(1) infinite}
  @keyframes hop{0%,82%,100%{transform:translateY(0)}87%{transform:translateY(-38px)}92%{transform:translateY(0)}95%{transform:translateY(-8px)}98%{transform:translateY(0)}}
  .mHop{animation:hop 7s cubic-bezier(.3,.7,.4,1) infinite}
  @keyframes blink{0%,91%{opacity:0}92%,95%{opacity:1}96%,100%{opacity:0}}
  .lid{opacity:0;animation:blink 4.6s steps(1) infinite}
  @keyframes sheen{0%,100%{opacity:.35}50%{opacity:.8}}
  .glow{animation:sheen 6s ease-in-out infinite}
  @keyframes tick{0%{transform:translateY(0)}100%{transform:translateY(-240px)}}
  .ones{animation:tick 10s steps(10) infinite}
  .tens{animation:tick 100s steps(10) infinite}
  @keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
  .hb{transform-box:fill-box;transform-origin:50% 60%;animation:beat 1.1s steps(2) infinite}
  `;

  const defs = `
  ${groundDefs('h', gy)}
  <clipPath id="hc"><path d="${frame}"/></clipPath>
  <clipPath id="clipones"><rect x="${tx + 36}" y="44" width="18" height="24"/></clipPath>
  <clipPath id="cliptens"><rect x="${tx + 18}" y="44" width="18" height="24"/></clipPath>
  <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.75"/>
    <stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>`;

  const body = `
  <path d="${notch(8, 8, W - 10, H - 10, 14)}" fill="${P.ink}"/>
  <g clip-path="url(#hc)">
    <rect width="${W}" height="${H}" fill="url(#skyG)"/>
    <rect width="${W}" height="${H}" fill="url(#skyGrid)"/>
    ${bank}
    ${sparkle(560, 140, 2, 0)}${sparkle(780, 112, 2, 0.8)}${sparkle(470, 96, 2, 1.6)}${sparkle(612, 120, 2, 0.4)}${sparkle(840, 236, 2, 1.2)}
    ${driftingCloud({ x: 420, y: 74, s: 3, kind: 0, travel: 1000, dur: 70 })}
    ${driftingCloud({ x: 760, y: 104, s: 2, kind: 1, travel: 960, dur: 52, delay: 10 })}
    ${driftingCloud({ x: 180, y: 128, s: 2, kind: 2, travel: 1100, dur: 90, delay: 30 })}
    <ellipse class="glow sm" cx="${mx + msz.w / 2}" cy="${my + msz.h * 0.42}" rx="140" ry="125" fill="url(#spot)"/>
    ${bush(540, gy - 40, 3)}
    ${bush(770, gy - 44, 3, true)}
    ${ground('h', 0, gy, W, H - gy)}
    ${coin(686, 78, 2, 0)}${coin(718, 72, 2, 0.15)}${coin(750, 78, 2, 0.3)}
    ${q.body}
    <g class="mHop"><g class="mBob">
      ${sprite(S.MARIO_HD, S.HD_PAL, { x: mx, y: my, s: ms })}
      <g class="lid">${sprite(S.MARIO_HD_LIDS, S.HD_PAL, { x: mx, y: my, s: ms })}</g>
    </g></g>

    <g class="r1">
      ${slab({ x: 40, y: 84, w: kw, h: 26, fill: P.orange, shadow: 4 })}
      ${ptext(kicker, { x: 51, y: 90, s: 2, fill: '#fff' })}
    </g>
    <g class="r2">${ptext(id.name.toUpperCase(), { x: 46, y: 124, s: 6, bold: true, fill: '#fff', outline: P.ink, shadow: P.ink })}</g>
    <g class="r3">
      ${slab({ x: 40, y: 186, w: rw, h: 36, fill: P.yellow, shadow: 4 })}
      ${ptext(role, { x: 53, y: 194, s: 3, bold: true, fill: P.ink })}
      ${slab({ x: 40 + rw + 14, y: 191, w: bw, h: 26, fill: P.red, shadow: 4 })}
      ${ptext(badge, { x: 40 + rw + 24, y: 197, s: 2, fill: '#fff' })}
      ${mono(id.tagline, { x: 42, y: 248, size: 14, fill: P.inkSoft, maxWidth: 500, lh: 19, weight: 700 })}
    </g>
    <g class="r4">${chips.markup}</g>

    <g>
      ${hud(id.name.split(' ')[0].toUpperCase(), 40)}
      ${ptext(score, { x: 40, y: 44, s: 3, fill: '#fff', shadow: P.ink })}
      ${hud('COINS', 290)}
      <g transform="translate(290 43)">${coin(0, 0, 1.6, 0)}</g>
      ${ptext(`×${String(contrib.repos ?? 0).padStart(2, '0')}`, { x: 312, y: 44, s: 3, fill: '#fff', shadow: P.ink })}
      ${hud('WORLD', 500)}
      ${ptext(id.world, { x: 500, y: 44, s: 3, fill: '#fff', shadow: P.ink })}
      ${hud('TIME', tx)}
      ${ptext('3', { x: tx, y: 44, s: 3, fill: '#fff', shadow: P.ink })}
      ${digitStrip('tens', tx + 18)}${digitStrip('ones', tx + 36)}
      ${[0, 1, 2].map((i) => `<g class="hb" style="animation-delay:${i * 0.18}s">${sprite(S.HEART, S.HEART_PAL, { x: 790 + i * 24, y: 22, s: 3 })}</g>`).join('')}
    </g>
  </g>
  <path d="${frame}" fill="none" stroke="${P.ink}" stroke-width="4"/>`;

  return svgDoc({
    w: W,
    h: H,
    title: `${id.name} — ${id.role}`,
    desc: `World 1-1 hero banner. ${id.name}, ${id.role} (${id.badge}). ${id.tagline} Stack: ${id.stack.join(', ')}.`,
    css,
    defs,
    body,
  });
}

/* ═══════════════════════════════════════════════════════════════ DIVIDER */
export function divider() {
  const h = 76;
  const gy = 62;
  const pw = 40;
  const ph = 22;
  const xL = 10;
  const xR = W - 10 - pw;
  const py = gy - ph;
  const ms = 2;
  const x0 = xL + 2;
  const y0 = gy - 36;
  const xEnd = xR + 2 - x0;
  const walkFrom = 44;
  const walkTo = xEnd - 44;
  const T = 24;

  const xk = `@keyframes mvx{0%,8%{transform:translateX(0)}12%{transform:translateX(${walkFrom}px)}80%{transform:translateX(${walkTo}px)}84%,100%{transform:translateX(${xEnd}px)}}`;
  const yk = `@keyframes mvy{0%,3%{transform:translateY(44px)}8%{transform:translateY(-22px)}10%{transform:translateY(-32px)}12%,80%{transform:translateY(0)}82%{transform:translateY(-34px)}84%,86%{transform:translateY(-22px)}92%,100%{transform:translateY(44px)}}`;

  const coins = [];
  const coinCss = [];
  const n = 16;
  const a = x0 + 18 + walkFrom + 70;
  const b = x0 + 18 + walkTo - 60;
  for (let i = 0; i < n; i++) {
    const cx = a + ((b - a) * i) / (n - 1);
    const t = 12 + ((cx - x0 - 18 - walkFrom) / (walkTo - walkFrom)) * 68;
    coinCss.push(
      `@keyframes dc${i}{0%,${pct(t)}{transform:translateY(0);opacity:1}${pct(t + 1.4)}{transform:translateY(-16px);opacity:0}${pct(t + 1.5)},93%{transform:translateY(0);opacity:0}96%,100%{opacity:1}}.dc${i}{animation:dc${i} ${T}s linear infinite}`
    );
    coins.push(`<g class="dc${i}">${coin(R(cx - 8), y0 + 6, 1.6, (i % 5) * 0.2)}</g>`);
  }

  const css = `${FRAME_CSS}${SPIN_CSS}${xk}${yk}
  .mvx{animation:mvx ${T}s linear infinite}
  .mvy{animation:mvy ${T}s linear infinite}
  ${coinCss.join('')}`;

  const body = `
  ${coins.join('')}
  <g class="mvx"><g class="mvy">${frames(S.MARIO_WALK_A, S.MARIO_WALK_B, S.MARIO_PAL, { x: x0, y: y0, s: ms, outline: P.ink }, 0.28)}</g></g>
  ${pipe(xL, py, pw, ph + 2)}
  ${pipe(xR, py, pw, ph + 2)}
  <rect x="0" y="${gy}" width="${W}" height="${h - gy}" fill="url(#brickS)"/>
  <rect x="0" y="${gy}" width="${W}" height="2" fill="${P.ink}"/>`;

  return svgDoc({
    w: W,
    h,
    title: 'Divider: Mario walks between two warp pipes collecting coins',
    css,
    body,
  });
}

/* ══════════════════════════════════════════════════════ SECTION HEADER */
export function sectionHeader(title, kicker) {
  const h = 80;
  const q = bumpBlock({ id: 'sq', x: 2, y: 30, s: 2.75, period: 4.6, at: 0.08, pop: 14 });
  const T = title.toUpperCase();
  const K = kicker.toUpperCase();
  const tw = pxWidth(T, 4, { bold: true });
  const sx = 60;
  const sw = tw + 30;
  const kx = sx + sw + 18;
  const kw = pxWidth(K, 2) + 22;

  const trailStart = kx + kw + 26;
  const trailEnd = W - 124;
  const coins = [];
  for (let x = trailStart, i = 0; x <= trailEnd; x += 30, i++) {
    coins.push(`<g class="pop" style="animation-delay:${300 + i * 60}ms">${coin(x, 38, 1.4, (i % 6) * 0.18)}</g>`);
  }

  const css = `${SPIN_CSS}${q.css}
  @keyframes hdrIn{0%{transform:translateX(-16px)}100%{transform:translateX(0)}}
  .hdr{animation:hdrIn .6s cubic-bezier(.2,.9,.3,1) backwards}
  .hdr2{animation:hdrIn .6s cubic-bezier(.2,.9,.3,1) .12s backwards}
  @keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
  .pop{transform-box:fill-box;transform-origin:50% 50%;animation:pop .45s backwards}
  @keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
  .hb{transform-box:fill-box;transform-origin:50% 60%;animation:beat 1.1s steps(2) infinite}`;

  const body = `
  ${q.body}
  <g class="hdr">
    ${slab({ x: sx, y: 22, w: sw, h: 46, fill: P.yellow, shadow: 5 })}
    ${ptext(T, { x: sx + 15, y: 31, s: 4, bold: true, fill: P.ink })}
  </g>
  <g class="hdr2">
    ${slab({ x: kx, y: 32, w: kw, h: 26, fill: P.orange, shadow: 4 })}
    ${ptext(K, { x: kx + 11, y: 38, s: 2, fill: '#fff' })}
  </g>
  ${coins.join('')}
  ${[0, 1, 2].map((i) => `<g class="hb" style="animation-delay:${i * 0.18}s">${sprite(S.HEART, S.HEART_PAL, { x: W - 92 + i * 28, y: 34, s: 3 })}</g>`).join('')}`;

  return svgDoc({ w: W, h, title: `${title} section heading`, css, body });
}

/* ════════════════════════════════════════════════════════════ SAVE ROOM */
/** Mario coding at his desk at night — after the lofi clip in the brief. */
export function saveRoom({ profile }) {
  const w = 640;
  const h = 380;
  const frame = notch(2, 2, w - 10, h - 10, 12);
  const lines = profile.identity.now;

  /* fairy lights along a sagging wire */
  const wire = (x) => {
    const seg = x < 320 ? 0 : 1;
    const t = (x - seg * 320) / 320;
    return 16 * (1 - t) ** 2 + 2 * (1 - t) * t * 34 + t * t * 16;
  };
  const bulbs = [];
  const BULB = [P.red, P.gold, '#5CC83A', '#7FD8FF'];
  for (let x = 20, i = 0; x < w - 10; x += 34, i++) {
    const y = R(wire(x));
    bulbs.push(`<g class="bl" style="animation-delay:${R((i % 4) * 0.35, 2)}s">
      <rect x="${x - 2}" y="${y}" width="4" height="3" fill="${P.ink}"/>
      <rect x="${x - 3}" y="${y + 3}" width="6" height="7" fill="${BULB[i % 4]}"/>
      <rect x="${x - 2}" y="${y + 4}" width="2" height="2" fill="#fff" fill-opacity="0.7"/>
    </g>`);
  }

  /* monitor + typing */
  const sx = 102;
  const sy = 158;
  const lineH = 15;
  const T = 14;
  const covers = [];
  const coverCss = [];
  lines.forEach((ln, i) => {
    const start = 4 + i * 9;
    const end = start + (ln.startsWith('>') ? 7 : 2);
    coverCss.push(
      `@keyframes ty${i}{0%,${pct(start)}{transform:scaleX(1)}${pct(end)},92%{transform:scaleX(0)}93%,100%{transform:scaleX(1)}}.ty${i}{transform:scaleX(0);transform-box:fill-box;transform-origin:100% 50%;animation:ty${i} ${T}s steps(${Math.max(2, ln.length)}) infinite}`
    );
    covers.push(`<rect class="ty${i}" x="${sx}" y="${sy + i * lineH - 2}" width="192" height="${lineH}" fill="${P.screen}"/>`);
  });
  const screenText = lines
    .map((ln, i) =>
      ptext(ln.toUpperCase(), {
        x: sx + 4,
        y: sy + i * lineH,
        s: 1.5,
        fill: ln.startsWith('>') ? P.screenGlow : ln.startsWith('★') ? P.gold : '#B8F25A',
      })
    )
    .join('');
  const cursorX = sx + 4 + pxWidth(lines[lines.length - 1].toUpperCase(), 1.5) + 4;

  /* steam wisps + music notes */
  const NOTE = ['..##', '..#.', '..#.', '..#.', '###.', '###.'];
  const wisp = ['.#', '#.', '#.', '.#', '.#', '#.'];

  /* stool cap */
  const stoolGrid = blob({ w: 26, h: 7, circles: [[13, 7.5, 13]], shade: true, dither: false });
  const stool = sprite(
    stoolGrid.map((row, y) => row.replace(/w/g, (m, x) => ((x + y * 3) % 7 === 0 || (x * 5 + y) % 11 === 0 ? 'd' : 'w'))),
    { w: P.red, s: P.redDark, d: '#FFFFFF' },
    { x: 318, y: 290, s: 4, outline: P.ink }
  );

  const moon = blob({ w: 14, h: 14, circles: [[7, 7, 6.5]], shade: false, dither: false });
  const lakitu = cloudGrid(1);

  const css = `
  ${FRAME_CSS}${TWINKLE_CSS}${coverCss.join('')}
  @keyframes bl{0%,100%{opacity:.35}50%{opacity:1}}
  .bl{animation:bl 1.4s steps(1) infinite}
  @keyframes swing{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
  .lamp{transform-origin:258px 0;animation:swing 5s ease-in-out infinite}
  @keyframes flicker{0%,100%{opacity:.85}47%{opacity:.85}48%{opacity:.55}50%{opacity:.9}72%{opacity:.75}}
  .cone{animation:flicker 4s steps(1) infinite}
  @keyframes cur{0%{opacity:1}50%{opacity:0}}
  .cur{animation:cur .8s steps(1) infinite}
  @keyframes bob{0%{transform:translateY(0)}50%{transform:translateY(2px)}}
  .vibe{animation:bob 1s steps(1) infinite}
  @keyframes typeL{0%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  .tl{animation:typeL .22s steps(1) infinite}
  .tr{animation:typeL .22s steps(1) .11s infinite}
  @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  .float{animation:float 2.4s steps(2) infinite}
  @keyframes steam{0%{transform:translateY(0);opacity:0}20%{opacity:.85}100%{transform:translateY(-26px);opacity:0}}
  .st{opacity:0;animation:steam 2.6s steps(8) infinite}
  @keyframes note{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(34px,-70px);opacity:0}}
  .nt{opacity:0;animation:note 4.2s steps(14) infinite}
  @keyframes glowP{0%,100%{opacity:.55}50%{opacity:.9}}
  .scr{animation:glowP 3s ease-in-out infinite}
  @keyframes cloudI{0%{transform:translateX(0)}100%{transform:translateX(-190px)}}
  .ci{animation:cloudI 40s linear infinite}
  @keyframes bumpS{0%,80%,100%{transform:translateY(0)}84%{transform:translateY(-6px)}88%{transform:translateY(0)}}
  .bs{animation:bumpS 3.2s infinite}
  `;

  const defs = `
  <clipPath id="rc"><path d="${frame}"/></clipPath>
  <clipPath id="wc"><rect x="40" y="56" width="132" height="104"/></clipPath>
  <linearGradient id="nightG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0B1030"/><stop offset="1" stop-color="#25336B"/>
  </linearGradient>
  <linearGradient id="coneG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFF1B0" stop-opacity="0.42"/><stop offset="1" stop-color="#FFF1B0" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="scrG" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#7FE3FF" stop-opacity="0.32"/><stop offset="1" stop-color="#7FE3FF" stop-opacity="0"/>
  </radialGradient>
  <pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity="0.28"/></pattern>
  <pattern id="floorP" width="64" height="40" patternUnits="userSpaceOnUse">
    <rect width="64" height="40" fill="${P.woodLo}"/><rect width="64" height="2" fill="#6A3A18"/>
    <rect y="20" width="64" height="2" fill="#3A1E0A"/><rect x="40" width="2" height="20" fill="#3A1E0A"/><rect x="12" y="22" width="2" height="18" fill="#3A1E0A"/>
  </pattern>`;

  const body = `
  <path d="${notch(8, 8, w - 10, h - 10, 12)}" fill="${P.ink}"/>
  <g clip-path="url(#rc)">
    <rect width="${w}" height="${h}" fill="url(#wallP)"/>
    <rect y="0" width="${w}" height="10" fill="${P.wallLo}"/>

    <!-- window -->
    <rect x="30" y="46" width="152" height="124" fill="${P.wood}"/>
    <rect x="40" y="56" width="132" height="104" fill="url(#nightG)"/>
    <g clip-path="url(#wc)">
      ${sprite(moon, { w: '#FFF1B0' }, { x: 132, y: 62, s: 2 })}
      <rect x="140" y="70" width="4" height="4" fill="#E8D48A"/><rect x="152" y="80" width="6" height="4" fill="#E8D48A"/>
      ${sparkle(54, 70, 1.5, 0, '#FFF6C8')}${sparkle(96, 64, 1.5, 0.7, '#FFF6C8')}${sparkle(70, 112, 1.5, 1.3, '#FFF6C8')}${sparkle(150, 122, 1.5, 0.4, '#FFF6C8')}${sparkle(118, 98, 1.5, 1.9, '#FFF6C8')}
      <g class="ci">${sprite(cloudGrid(1), { w: '#3B4C8C', s: '#2C3A73' }, { x: 150, y: 128, s: 2 })}${sprite(cloudGrid(1), { w: '#3B4C8C', s: '#2C3A73' }, { x: 340, y: 128, s: 2 })}</g>
    </g>
    <rect x="103" y="56" width="6" height="104" fill="${P.wood}"/>
    <rect x="40" y="105" width="132" height="6" fill="${P.wood}"/>
    <rect x="31.5" y="47.5" width="149" height="121" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="24" y="168" width="164" height="9" fill="${P.woodHi}"/><rect x="24" y="168" width="164" height="9" fill="none" stroke="${P.ink}" stroke-width="2"/>

    <!-- fairy lights -->
    <path class="sm" d="M0 16 Q160 52 320 16 Q480 52 640 16" fill="none" stroke="#0A0D1F" stroke-width="2"/>
    ${bulbs.join('')}

    <!-- shelf + collectibles -->
    <rect x="304" y="118" width="192" height="9" fill="${P.woodHi}"/><rect x="304" y="118" width="192" height="9" fill="none" stroke="${P.ink}" stroke-width="2"/>
    <rect x="322" y="127" width="6" height="14" fill="${P.woodLo}"/><rect x="474" y="127" width="6" height="14" fill="${P.woodLo}"/>
    ${frames(S.GOOMBA, S.GOOMBA.map((r) => [...r].reverse().join('')), S.GOOMBA_PAL, { x: 314, y: 86, s: 2 }, 1.2)}
    <g class="float">
      ${sprite(lakitu, { w: '#FFFFFF', s: '#BFE6FA' }, { x: 356, y: 74, s: 2, outline: P.ink })}
      <rect x="372" y="86" width="4" height="6" fill="${P.ink}"/><rect x="384" y="86" width="4" height="6" fill="${P.ink}"/>
      <rect x="374" y="94" width="12" height="2" fill="${P.ink}"/><rect x="372" y="92" width="2" height="2" fill="${P.ink}"/><rect x="386" y="92" width="2" height="2" fill="${P.ink}"/>
    </g>
    ${sprite(S.SHROOM, S.SHROOM_PAL, { x: 418, y: 86, s: 2 })}
    ${sprite(S.SHROOM, S.ONEUP_PAL, { x: 458, y: 86, s: 2 })}
    ${sprite(S.FLOWER, S.FLOWER_PAL, { x: 42, y: 138, s: 2 })}

    <!-- poster -->
    <g transform="rotate(2 562 86)">
      <rect x="519" y="47" width="92" height="88" fill="${P.ink}"/>
      <rect x="516" y="44" width="92" height="88" fill="${P.red}"/>
      <rect x="516" y="44" width="92" height="88" fill="url(#dots)"/>
      <rect x="517.5" y="45.5" width="89" height="85" fill="none" stroke="${P.ink}" stroke-width="3"/>
      ${ptext("LET'S", { x: 562, y: 56, s: 2, bold: true, fill: P.gold, anchor: 'middle', shadow: P.ink })}
      ${ptext('-A', { x: 562, y: 76, s: 2, bold: true, fill: P.gold, anchor: 'middle', shadow: P.ink })}
      ${ptext('CODE!', { x: 562, y: 96, s: 2, bold: true, fill: P.gold, anchor: 'middle', shadow: P.ink })}
      ${ptext('★ ★ ★', { x: 562, y: 116, s: 1.5, fill: '#fff', anchor: 'middle' })}
    </g>
    <g class="tw" style="animation-duration:3s">${sprite(S.STAR, S.STAR_PAL, { x: 284, y: 124, s: 1.5 })}</g>
    <g class="bs">${sprite(S.QBLOCK, S.QBLOCK_PAL, { x: 560, y: 160, s: 2 })}</g>

    <!-- hanging mushroom lamp -->
    <path class="cone sm" d="M238 88 L278 88 L344 268 L172 268 Z" fill="url(#coneG)"/>
    <g class="lamp">
      <rect x="257" y="0" width="2" height="58" fill="#0A0D1F"/>
      ${sprite(S.SHROOM.slice(0, 11), S.SHROOM_PAL, { x: 234, y: 52, s: 3 })}
      <rect x="250" y="85" width="16" height="6" fill="#FFF4C0"/>
    </g>

    <!-- desk -->
    <rect x="40" y="280" width="560" height="62" fill="${P.woodLo}"/>
    <rect x="41.5" y="281.5" width="557" height="59" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="24" y="268" width="592" height="13" fill="${P.wood}"/>
    <rect x="24" y="268" width="592" height="3" fill="${P.woodHi}"/>
    <rect x="25" y="269" width="590" height="11" fill="none" stroke="${P.ink}" stroke-width="2"/>
    <rect x="460" y="300" width="120" height="3" fill="#3A1E0A"/><rect x="510" y="308" width="20" height="5" fill="${P.gold}"/>

    <!-- monitor -->
    <ellipse class="scr sm" cx="198" cy="206" rx="170" ry="120" fill="url(#scrG)"/>
    <path d="${notch(88, 144, 220, 118, 6)}" fill="#2A2F45"/>
    <path d="${notch(88, 144, 220, 118, 6)}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="${sx - 2}" y="${sy - 6}" width="196" height="98" fill="${P.screen}"/>
    ${screenText}
    ${covers.join('')}
    <rect class="cur" x="${R(cursorX)}" y="${sy + (lines.length - 1) * lineH}" width="7" height="11" fill="${P.screenGlow}"/>
    <rect x="${sx - 2}" y="${sy - 6}" width="196" height="98" fill="url(#scan)"/>
    <rect x="190" y="262" width="16" height="6" fill="#2A2F45"/><rect x="170" y="264" width="56" height="5" fill="#1A1E30"/>
    <rect x="296" y="248" width="6" height="6" fill="#5CC83A"/>

    <!-- keyboard -->
    <rect x="228" y="262" width="100" height="8" fill="#C9D3E6"/>
    <rect x="229" y="263" width="98" height="6" fill="none" stroke="${P.ink}" stroke-width="2"/>

    <!-- 1UP mug + steam -->
    <rect x="476" y="240" width="28" height="28" fill="${P.pipe}"/>
    <rect x="504" y="246" width="8" height="14" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="477.5" y="241.5" width="25" height="26" fill="none" stroke="${P.ink}" stroke-width="3"/>
    ${ptext('1UP', { x: 490, y: 251, s: 1, bold: true, fill: '#fff', anchor: 'middle' })}
    ${[0, 1, 2].map((i) => `<g class="st" style="animation-delay:${R(i * 0.85, 2)}s">${sprite(wisp, { '#': '#E6EEF8' }, { x: 480 + i * 8, y: 222, s: 3 })}</g>`).join('')}

    <!-- potted piranha -->
    <g class="float" style="animation-duration:3.4s">${frames(S.PIRANHA_OPEN, S.PIRANHA_SHUT, S.PIRANHA_PAL, { x: 548, y: 204, s: 1.75 }, 0.6)}</g>
    <path d="M540 246 H588 L582 268 H546 Z" fill="${P.brick}"/>
    <path d="M540 246 H588 L582 268 H546 Z" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="538" y="244" width="52" height="7" fill="${P.brickHi}"/><rect x="538.5" y="244.5" width="51" height="6" fill="none" stroke="${P.ink}" stroke-width="2"/>

    <!-- floor + rug -->
    <rect y="342" width="${w}" height="${h - 342}" fill="url(#floorP)"/>
    <rect x="292" y="352" width="168" height="18" fill="${P.red}"/>
    <rect x="292" y="352" width="168" height="18" fill="url(#dots)"/>
    <rect x="296" y="356" width="160" height="2" fill="${P.gold}"/><rect x="296" y="364" width="160" height="2" fill="${P.gold}"/>

    <!-- mario on his mushroom stool -->
    <rect x="352" y="318" width="36" height="34" fill="#FFE3BE"/><rect x="353.5" y="319.5" width="33" height="31" fill="none" stroke="${P.ink}" stroke-width="3"/>
    ${stool}
    <g class="vibe">
      ${sprite(S.MARIO_BACK, S.MARIO_PAL, { x: 318, y: 206, s: 6, outline: P.ink })}
    </g>
    <g class="tl">${sprite(['.WWW.', 'WWWWW', 'WWWWw', '.WWw.'], S.MARIO_PAL, { x: 300, y: 250, s: 4, outline: P.ink })}</g>
    <g class="tr">${sprite(['.WWW.', 'WWWWW', 'WWWWw', '.WWw.'], S.MARIO_PAL, { x: 278, y: 252, s: 3.4, outline: P.ink })}</g>
    ${[0, 1, 2].map((i) => `<g class="nt" style="animation-delay:${R(i * 1.4, 2)}s">${sprite(NOTE, { '#': i === 1 ? P.gold : '#FFFFFF' }, { x: 430, y: 200, s: 3 })}</g>`).join('')}

    <!-- plate -->
    ${slab({ x: 56, y: 296, w: 132, h: 28, fill: P.ink, shadow: 0, border: 2 })}
    ${ptext('SAVE ROOM ★', { x: 122, y: 303, s: 2, fill: P.gold, anchor: 'middle' })}
  </g>
  <path d="${frame}" fill="none" stroke="${P.ink}" stroke-width="4"/>`;

  return svgDoc({
    w,
    h,
    title: 'Save room: Mario coding at his desk at night',
    desc: `Pixel-art bedroom at night. Mario sits on a mushroom stool typing; the monitor reads: ${lines.join(' / ')}. Fairy lights blink, the mushroom lamp sways, steam rises from a 1UP mug and a potted piranha plant chomps.`,
    css,
    defs,
    body,
  });
}

/* ══════════════════════════════════════════════════════════ VINE CLIMB */
export function vine() {
  const w = 140;
  const h = 380;
  const cx = 70;
  const top = 48;
  const ms = 3;
  const msz = spriteSize(S.MARIO_CLIMB, ms, true);
  const mx = cx - msz.w / 2;
  const my = 284;
  const drop = 236;
  const len = my + 20 - top;

  const leaf = (x, y, flip) =>
    sprite(['..GG', '.GGG', 'GGg.', 'Gg..'], { G: '#5CC83A', g: '#2E8A2E' }, { x, y, s: 3, outline: P.ink, flip });
  let stem = `<rect x="${cx - 3}" y="${top}" width="6" height="${len}" fill="#43B047"/><rect x="${cx - 3}" y="${top}" width="2" height="${len}" fill="#9BE85A"/>
  <rect x="${cx - 4.5}" y="${top}" width="9" height="${len}" fill="none" stroke="${P.ink}" stroke-width="1.5"/>`;
  for (let y = top + 18, i = 0; y < top + len - 10; y += 30, i++) {
    stem += i % 2 ? leaf(cx + 3, y, false) : leaf(cx - 21, y, true);
  }

  const css = `${FRAME_CSS}
  @keyframes payOut{0%,6%{transform:translateY(-${drop}px)}40%{transform:translateY(12px)}50%{transform:translateY(-8px)}58%,84%{transform:translateY(0)}100%{transform:translateY(-${drop}px)}}
  @keyframes lineOut{0%,6%{transform:scaleY(.06)}40%{transform:scaleY(1.04)}50%{transform:scaleY(.97)}58%,84%{transform:scaleY(1)}100%{transform:scaleY(.06)}}
  @keyframes sway{0%,100%{transform:rotate(-4.5deg)}50%{transform:rotate(4.5deg)}}
  .swing{transform-origin:${cx}px ${top}px;animation:sway 4.6s ease-in-out infinite}
  .rig{animation:payOut 13s cubic-bezier(.3,.85,.35,1) infinite}
  .line{transform-origin:${cx}px ${top}px;animation:lineOut 13s cubic-bezier(.3,.85,.35,1) infinite}
  @keyframes spark{0%,58%{opacity:0;transform:translateY(0)}62%{opacity:1}80%{opacity:0;transform:translateY(-20px)}100%{opacity:0}}
  .sp{opacity:0;animation:spark 13s ease-out infinite}
  `;

  const body = `
  <g class="swing">
    <g class="line">${stem}</g>
    <g class="rig">
      ${frames(S.MARIO_CLIMB, S.MARIO_CLIMB.map((r) => [...r].reverse().join('')), S.MARIO_PAL, { x: mx, y: my, s: ms, outline: P.ink }, 0.5)}
      <g class="sp">${ptext('1UP', { x: cx, y: my - 16, s: 2, bold: true, fill: '#5CC83A', anchor: 'middle', outline: P.ink })}</g>
    </g>
  </g>
  ${sprite(S.USED_BLOCK, S.USED_PAL, { x: cx - 24, y: 0, s: 3 })}
  <rect x="${cx - 48}" y="${h - 30}" width="96" height="30" fill="url(#brick)"/>
  <rect x="${cx - 46.5}" y="${h - 28.5}" width="93" height="27" fill="none" stroke="${P.ink}" stroke-width="3"/>`;

  return svgDoc({
    w,
    h,
    title: 'Mario climbs down a beanstalk vine, sways, then climbs back up',
    desc: 'A vine grows down from a used block; Mario rides it to the bottom, swings, and climbs back up.',
    css,
    body,
  });
}

/* ══════════════════════════════════════════════════════════ LEVEL CLEAR */
export function footer() {
  const H = 270;
  const gy = 216;
  const frame = notch(2, 2, W - 10, H - 10, 14);
  const T = 12;

  /* stairs of hard blocks */
  let stairs = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j <= i; j++) stairs += sprite(S.USED_BLOCK, S.USED_PAL, { x: 40 + i * 32, y: gy - 32 - j * 32, s: 2 });
  }

  const poleX = 262;
  const poleTop = 78;
  const baseY = gy - 32;
  const climb = S.MARIO_CLIMB.map((r) => [...r].reverse().join(''));
  const mx0 = poleX - 2; // mario on the pole (sprite faces the pole)
  const mTop = poleTop + 6;
  const mBottom = baseY - 38;
  const walkTo = 636;

  const burst = (x, y, color, cls) => {
    let px = '';
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4;
      for (const rr of [8, 16, 24]) px += `<rect x="${R(x + Math.cos(a) * rr - 2)}" y="${R(y + Math.sin(a) * rr - 2)}" width="4" height="4" fill="${color}"/>`;
    }
    return `<g class="${cls}" style="transform-origin:${x}px ${y}px">${px}<rect x="${x - 3}" y="${y - 3}" width="6" height="6" fill="#fff"/></g>`;
  };

  const castle = `
  <g>
    <rect x="560" y="132" width="200" height="${gy - 132}" fill="url(#brick)"/>
    <rect x="610" y="84" width="100" height="48" fill="url(#brick)"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${560 + i * 44}" y="116" width="24" height="16" fill="url(#brick)"/><rect x="${561.5 + i * 44}" y="117.5" width="21" height="14" fill="none" stroke="${P.ink}" stroke-width="3"/>`).join('')}
    ${[0, 1, 2].map((i) => `<rect x="${610 + i * 38}" y="68" width="24" height="16" fill="url(#brick)"/><rect x="${611.5 + i * 38}" y="69.5" width="21" height="14" fill="none" stroke="${P.ink}" stroke-width="3"/>`).join('')}
    <rect x="561.5" y="133.5" width="197" height="${gy - 134}" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <rect x="611.5" y="85.5" width="97" height="47" fill="none" stroke="${P.ink}" stroke-width="3"/>
    <path d="M626 ${gy} V184 H630 V176 H634 V172 H646 V176 H650 V184 H654 V${gy} Z" transform="translate(4 0)" fill="${P.ink}"/>
    <rect x="626" y="96" width="14" height="22" fill="${P.ink}"/><rect x="680" y="96" width="14" height="22" fill="${P.ink}"/>
    <rect x="586" y="150" width="16" height="22" fill="${P.ink}"/><rect x="718" y="150" width="16" height="22" fill="${P.ink}"/>
  </g>`;

  const css = `${FRAME_CSS}${DRIFT_CSS}${TWINKLE_CSS}
  @keyframes flag{0%,4%{transform:translateY(0)}22%,100%{transform:translateY(${mBottom - mTop}px)}}
  .flag{animation:flag ${T}s linear infinite}
  @keyframes mx{0%,22%{transform:translateX(0)}26%{transform:translateX(34px)}54%,100%{transform:translateX(${walkTo - mx0}px)}}
  @keyframes my{0%,4%{transform:translateY(0)}22%{transform:translateY(${mBottom - mTop}px)}24%{transform:translateY(${mBottom - mTop - 16}px)}26%,100%{transform:translateY(${gy - 36 - mTop}px)}}
  .mx{animation:mx ${T}s linear infinite}
  .my{animation:my ${T}s linear infinite}
  @keyframes onPole{0%{opacity:1}24%{opacity:0}}
  @keyframes walking{0%{opacity:0}24%{opacity:1}55%{opacity:0}}
  @keyframes appear{0%{opacity:0}1%{opacity:1}}
  .op{animation:onPole ${T}s steps(1) infinite}
  .wk{opacity:0;animation:walking ${T}s steps(1) infinite}
  @keyframes cflag{0%,56%{transform:translateY(26px)}64%,100%{transform:translateY(0)}}
  .cflag{animation:cflag ${T}s ease-out infinite}
  @keyframes fw{0%,64%{transform:scale(0);opacity:0}66%{opacity:1}74%{transform:scale(1);opacity:0}100%{opacity:0}}
  .fw1,.fw2,.fw3{opacity:0;animation:fw ${T}s steps(5) infinite}
  .fw2{animation-delay:.7s}.fw3{animation-delay:1.4s}
  @keyframes pts{0%,20%{opacity:0;transform:translateY(0)}22%{opacity:1}40%{opacity:0;transform:translateY(-30px)}100%{opacity:0}}
  .pts{opacity:0;animation:pts ${T}s ease-out infinite}
  `;

  const defs = `${groundDefs('f', gy)}<clipPath id="fc"><path d="${frame}"/></clipPath>`;

  const body = `
  <path d="${notch(8, 8, W - 10, H - 10, 14)}" fill="${P.ink}"/>
  <g clip-path="url(#fc)">
    <rect width="${W}" height="${H}" fill="url(#skyG)"/>
    <rect width="${W}" height="${H}" fill="url(#skyGrid)"/>
    ${driftingCloud({ x: 380, y: 86, s: 2, kind: 0, travel: 1000, dur: 60 })}
    ${driftingCloud({ x: 790, y: 40, s: 2, kind: 1, travel: 980, dur: 46, delay: 12 })}
    ${sprite(blob({ w: 40, h: 22, circles: [[20, 22, 20]], dither: false }), { w: '#4CB838', s: '#2B8A2A' }, { x: 300, y: gy - 66, s: 3, outline: '#14451A' })}
    ${bush(470, gy - 40, 3)}${bush(790, gy - 36, 2.6, true)}
    ${burst(430, 104, P.gold, 'fw1')}${burst(500, 80, '#FFFFFF', 'fw2')}${burst(372, 128, P.red, 'fw3')}
    ${castle}
    <rect x="${poleX + 34}" y="40" width="0" height="0"/>
    <rect x="658" y="40" width="4" height="30" fill="${P.ink}"/>
    <g class="cflag">${slab({ x: 662, y: 42, w: 30, h: 20, fill: P.red, shadow: 0, border: 2 })}${sprite(['..#..', '.###.', '#####', '.#.#.'], { '#': P.gold }, { x: 669, y: 46, s: 3 })}</g>
    ${ground('f', 0, gy, W, H - gy)}
    ${stairs}
    ${sprite(S.USED_BLOCK, S.USED_PAL, { x: poleX - 14, y: baseY, s: 2 })}
    <rect x="${poleX}" y="${poleTop}" width="4" height="${baseY - poleTop}" fill="#9BE85A"/>
    <rect x="${poleX - 0.75}" y="${poleTop}" width="5.5" height="${baseY - poleTop}" fill="none" stroke="${P.ink}" stroke-width="1.5"/>
    ${sprite(blob({ w: 5, h: 5, circles: [[2.5, 2.5, 2.5]], shade: false, dither: false }), { w: '#43B047' }, { x: poleX - 4, y: poleTop - 12, s: 2.4, outline: P.ink })}
    <g class="flag"><path d="M${poleX} ${poleTop + 6} L${poleX - 34} ${poleTop + 18} L${poleX} ${poleTop + 30} Z" fill="#fff" stroke="${P.ink}" stroke-width="2" class="sm"/>
      <rect x="${poleX - 18}" y="${poleTop + 14}" width="8" height="8" fill="${P.pipe}"/></g>
    <g class="pts">${ptext('+5000', { x: poleX + 30, y: 120, s: 2, fill: '#fff', shadow: P.ink })}</g>
    <g class="mx"><g class="my">
      <g class="op">${sprite(climb, S.MARIO_PAL, { x: mx0, y: mTop, s: 2, outline: P.ink })}</g>
      <g class="wk">${frames(S.MARIO_WALK_A, S.MARIO_WALK_B, S.MARIO_PAL, { x: mx0, y: mTop, s: 2, outline: P.ink }, 0.28)}</g>
    </g></g>
    ${ptext('THANK YOU FOR VISITING!', { x: 450, y: 18, s: 3, fill: '#fff', outline: P.ink, shadow: P.ink, anchor: 'middle' })}
    ${ptext('YOUR NEXT PR IS IN ANOTHER REPO.', { x: 450, y: 48, s: 2, fill: P.ink, anchor: 'middle' })}
    ${mono('generated by scripts/generate-assets.mjs · refreshed daily by GitHub Actions', { x: W / 2 - 4, y: H - 18, size: 11, fill: '#FFF2DC', anchor: 'middle', weight: 700 })}
  </g>
  <path d="${frame}" fill="none" stroke="${P.ink}" stroke-width="4"/>`;

  return svgDoc({
    w: W,
    h: H,
    title: 'Level clear: Mario slides down the flagpole and walks into the castle',
    desc: 'Footer scene. Mario slides down the flagpole, walks into the castle, the castle flag rises and fireworks go off. Thank you for visiting!',
    css,
    defs,
    body,
  });
}
