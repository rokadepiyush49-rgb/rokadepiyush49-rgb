/**
 * Small composed pieces shared by several assets: ground, clouds, chips,
 * bumping ?-blocks, spinning coins, and the CSS that drives them.
 *
 * Motion rule (same as the reference profile): animation is additive. If it
 * never runs — reduced motion, a stalled image proxy — every asset still
 * renders in a complete, legible state. Alternate sprite frames start hidden.
 */

import { P } from './theme.mjs';
import { R, slab, registerDef } from './svg.mjs';
import { ptext, pxWidth, sprite, spriteSize, blob } from './pixel.mjs';
import * as S from './sprites.mjs';

/* ------------------------------------------------------------- deterministic */
export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
}

/* ---------------------------------------------------------------------- css */
export const FRAME_CSS = `
@keyframes fA{0%{opacity:1}50%{opacity:0}}
@keyframes fB{0%{opacity:0}50%{opacity:1}}
.fA{animation:fA .36s steps(1) infinite}
.fB{opacity:0;animation:fB .36s steps(1) infinite}
`;

export const SPIN_CSS = `
@keyframes spin{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.14)}}
.spin{transform-box:fill-box;transform-origin:50% 50%;animation:spin 1.3s steps(7) infinite}
`;

export const TILE_CSS = `
@keyframes tileIn{0%{transform:translateY(12px)}100%{transform:translateY(0)}}
.tile{animation:tileIn .6s cubic-bezier(.3,1.5,.5,1) backwards}
`;

export const TWINKLE_CSS = `
@keyframes twinkle{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1)}}
.tw{transform-box:fill-box;transform-origin:50% 50%;animation:twinkle 2.4s steps(4) infinite}
`;

/** A ?-block that bumps on a loop and pops a coin. Unique keyframes per id. */
export function bumpBlock({ id, x, y, s = 3, period = 4, at = 0.1, score = null, pop = null }) {
  const rise = pop ?? s * 18;
  const { w } = spriteSize(S.QBLOCK, s);
  const coin = spriteSize(S.COIN, s * 0.8);
  const a = (n) => `${R(n * 100, 1)}%`;
  const css = `
  @keyframes ${id}B{0%,${a(at)}{transform:translateY(0)}${a(at + 0.03)}{transform:translateY(-${R(s * 3)}px)}${a(at + 0.06)},100%{transform:translateY(0)}}
  @keyframes ${id}C{0%,${a(at)}{transform:translateY(0);opacity:0}${a(at + 0.01)}{opacity:1}${a(at + 0.14)}{transform:translateY(-${R(rise)}px);opacity:1}${a(at + 0.2)}{transform:translateY(-${R(rise * 0.66)}px);opacity:0}100%{opacity:0}}
  @keyframes ${id}S{0%,${a(at + 0.06)}{transform:translateY(0);opacity:0}${a(at + 0.08)}{opacity:1}${a(at + 0.3)}{transform:translateY(-${R(s * 10)}px);opacity:0}100%{opacity:0}}
  .${id}B{animation:${id}B ${period}s infinite}
  .${id}C{opacity:0;animation:${id}C ${period}s cubic-bezier(.2,.8,.4,1) infinite}
  .${id}S{opacity:0;animation:${id}S ${period}s ease-out infinite}
  `;
  const body = `
  <g class="${id}C"><g class="spin">${sprite(S.COIN, S.COIN_PAL, { x: x + (w - coin.w) / 2, y: y - coin.h + s * 2, s: s * 0.8 })}</g></g>
  ${score ? `<g class="${id}S">${ptext(score, { x: x + w / 2, y: y - s * 8, s: Math.max(1.5, s * 0.6), fill: '#fff', anchor: 'middle', shadow: P.ink })}</g>` : ''}
  <g class="${id}B">${sprite(S.QBLOCK, S.QBLOCK_PAL, { x, y, s })}</g>`;
  return { css, body };
}

/** A spinning coin (one shared symbol, referenced with <use>). */
registerDef('coinS', `<g id="coinS">${sprite(S.COIN, S.COIN_PAL, { x: 0, y: 0, s: 1 }).replace(/^<g transform="[^"]*">/, '').replace(/<\/g>$/, '')}</g>`);
export function coin(x, y, s = 2, delay = 0) {
  return `<g class="spin" style="animation-delay:${R(delay, 2)}s"><use href="#coinS" transform="translate(${R(x)} ${R(y)}) scale(${s})"/></g>`;
}

/** Pixel chip: white block, black ink, hard shadow. Returns markup + size. */
export function chipRow(items, { x, y, maxWidth, s = 2, gap = 10, rowGap = 10, fill = '#fff', ink = P.ink, delay0 = 0, step = 50 }) {
  const h = 7 * s + 12;
  let cx = x;
  let cy = y;
  const out = [];
  items.forEach((label, i) => {
    const w = R(pxWidth(label.toUpperCase(), s) + 20);
    if (cx > x && cx + w > x + maxWidth) {
      cx = x;
      cy += h + rowGap;
    }
    out.push(`<g class="tile" style="animation-delay:${delay0 + i * step}ms">
      ${slab({ x: cx, y: cy, w, h, fill, shadow: 3, border: 2.5 })}
      ${ptext(label.toUpperCase(), { x: cx + 10, y: cy + 6, s, fill: ink })}
    </g>`);
    cx += w + gap;
  });
  return { markup: out.join(''), height: cy - y + h };
}

/* -------------------------------------------------------------------- world */
/** Grass + striped dirt (from the big-Mario reference). Needs groundDefs(). */
export function groundDefs(id, gy) {
  return `
  <pattern id="${id}G" x="0" y="${gy - 4}" width="16" height="26" patternUnits="userSpaceOnUse">
    <rect x="1" y="1" width="2" height="3" fill="#5CC83A"/><rect x="5" y="0" width="2" height="4" fill="#5CC83A"/>
    <rect x="10" y="2" width="2" height="2" fill="#5CC83A"/><rect x="13" y="1" width="2" height="3" fill="#5CC83A"/>
    <rect y="4" width="16" height="10" fill="#5CC83A"/>
    <rect x="3" y="6" width="2" height="1" fill="#9BE85A"/><rect x="9" y="8" width="3" height="1" fill="#9BE85A"/>
    <rect x="13" y="5" width="1" height="1" fill="#9BE85A"/><rect x="6" y="11" width="2" height="1" fill="#9BE85A"/>
    <rect y="14" width="16" height="4" fill="#2E8A2E"/>
    <rect x="2" y="18" width="3" height="2" fill="#2E8A2E"/><rect x="9" y="18" width="4" height="2" fill="#2E8A2E"/>
    <rect x="10" y="20" width="2" height="2" fill="#2E8A2E"/>
  </pattern>
  <pattern id="${id}D" x="0" y="${gy + 12}" width="32" height="48" patternUnits="userSpaceOnUse">
    <rect width="32" height="48" fill="#E0842A"/>
    <rect width="32" height="6" fill="#8A4A1C"/>
    <rect y="6" width="6" height="2" fill="#8A4A1C"/><rect x="12" y="6" width="8" height="2" fill="#8A4A1C"/><rect x="26" y="6" width="6" height="2" fill="#8A4A1C"/>
    <rect x="4" y="13" width="2" height="2" fill="#F6AE52"/><rect x="18" y="16" width="2" height="2" fill="#F6AE52"/>
    <rect x="28" y="11" width="2" height="2" fill="#F6AE52"/><rect x="10" y="20" width="2" height="2" fill="#F6AE52"/>
    <rect y="26" width="32" height="4" fill="#B85E1E"/>
    <rect y="30" width="8" height="2" fill="#B85E1E"/><rect x="16" y="30" width="10" height="2" fill="#B85E1E"/>
    <rect x="6" y="37" width="2" height="2" fill="#B85E1E"/><rect x="22" y="40" width="2" height="2" fill="#B85E1E"/>
    <rect y="42" width="32" height="6" fill="#8A4A1C"/>
  </pattern>`;
}

export function ground(id, x, gy, w, h) {
  return `<rect x="${x}" y="${gy + 12}" width="${w}" height="${h - 12}" fill="url(#${id}D)"/>
  <rect x="${x}" y="${gy - 4}" width="${w}" height="26" fill="url(#${id}G)"/>`;
}

const CLOUD_PAL = { w: P.cloud, s: P.cloudShade };

export function cloudGrid(kind = 0) {
  const shapes = [
    { w: 34, h: 15, circles: [[9, 10, 5.5], [17, 7, 7], [26, 10, 5.5]], rects: [[3, 10, 28, 5]] },
    { w: 24, h: 12, circles: [[7, 8, 4.5], [14, 5.5, 5.5], [19, 8, 4]], rects: [[3, 8, 18, 4]] },
    { w: 46, h: 16, circles: [[9, 11, 5.5], [18, 7, 7], [28, 6, 6.5], [37, 11, 5.5]], rects: [[4, 11, 38, 5]] },
  ][kind];
  return blob(shapes);
}

export function cloud(x, y, s = 3, kind = 0, ink = P.cloudInk) {
  return sprite(cloudGrid(kind), CLOUD_PAL, { x, y, s, outline: ink });
}

/**
 * A cloud that drifts left forever without ever popping: the second copy
 * starts exactly one travel-length to the right, so the loop is seamless and
 * the static frame shows the first copy where it was placed.
 */
export function driftingCloud({ x, y, s, kind, travel, dur, delay = 0, ink }) {
  return `<g class="drift" style="animation-duration:${dur}s;animation-delay:-${delay}s;--t:-${travel}px">
    ${cloud(x, y, s, kind, ink)}${cloud(x + travel, y, s, kind, ink)}
  </g>`;
}
export const DRIFT_CSS = `
@keyframes drift{0%{transform:translateX(0)}100%{transform:translateX(var(--t))}}
.drift{animation:drift 60s linear infinite}
`;

export function bush(x, y, s = 3, wide = false) {
  const g = blob(
    wide
      ? { w: 36, h: 13, circles: [[8, 9, 5], [17, 6.5, 6.5], [27, 8.5, 5.5]], rects: [[3, 9, 30, 4]], dither: false }
      : { w: 24, h: 12, circles: [[7, 8, 4.5], [13, 5.5, 5.5], [18, 8, 4]], rects: [[3, 8, 18, 4]], dither: false }
  );
  return sprite(g, { w: '#4CB838', s: '#2B8A2A' }, { x, y, s, outline: '#14451A' });
}

export function sparkle(x, y, s = 2, delay = 0, color = '#fff') {
  const grid = ['..#..', '..#..', '##.##', '..#..', '..#..'];
  return `<g class="tw" style="animation-delay:${R(delay, 2)}s">${sprite(grid, { '#': color }, { x, y, s })}</g>`;
}

/** Green warp pipe. (x, y) is the top-left of the lip. */
export function pipe(x, y, w, h) {
  const lipH = Math.min(24, Math.round(h * 0.35));
  const bx = x + 4;
  const bw = w - 8;
  return `
  <rect x="${bx}" y="${y + lipH}" width="${bw}" height="${h - lipH}" fill="${P.pipe}"/>
  <rect x="${bx + 4}" y="${y + lipH}" width="${R(bw * 0.18)}" height="${h - lipH}" fill="${P.pipeHi}"/>
  <rect x="${R(bx + bw * 0.7)}" y="${y + lipH}" width="${R(bw * 0.12)}" height="${h - lipH}" fill="${P.pipeLo}"/>
  <rect x="${bx}" y="${y + lipH}" width="${bw}" height="${h - lipH}" fill="none" stroke="${P.ink}" stroke-width="3"/>
  <rect x="${x}" y="${y}" width="${w}" height="${lipH}" fill="${P.pipe}"/>
  <rect x="${x + 4}" y="${y + 3}" width="${R(w * 0.18)}" height="${lipH - 6}" fill="${P.pipeHi}"/>
  <rect x="${R(x + w * 0.72)}" y="${y + 3}" width="${R(w * 0.12)}" height="${lipH - 6}" fill="${P.pipeLo}"/>
  <rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${lipH - 3}" fill="none" stroke="${P.ink}" stroke-width="3"/>`;
}

export const ITEMS = {
  shroom: [S.SHROOM, S.SHROOM_PAL],
  oneup: [S.SHROOM, S.ONEUP_PAL],
  flower: [S.FLOWER, S.FLOWER_PAL],
  star: [S.STAR, S.STAR_PAL],
  coin: [S.COIN, S.COIN_PAL],
  rocket: [S.ROCKET, S.ROCKET_PAL],
  flag: [S.FLAG_ICON, S.FLAG_PAL],
};

/** Draw an item sprite centred in a (size x size) box. */
export function itemIn(kind, cx, cy, size) {
  const [grid, pal] = ITEMS[kind] || ITEMS.coin;
  const gw = Math.max(...grid.map((r) => r.length));
  const gh = grid.length;
  const s = R(size / Math.max(gw, gh), 3);
  return sprite(grid, pal, { x: R(cx - (gw * s) / 2), y: R(cy - (gh * s) / 2), s });
}
