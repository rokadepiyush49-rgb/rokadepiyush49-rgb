/**
 * SVG document + shared defs. GitHub renders README SVGs through <img>:
 *   - CSS animation runs, <script> never does
 *   - external fonts/images never load (so everything is inline)
 *   - links inside the SVG are inert (clickable things live in README.md)
 */

import { P } from './theme.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const R = (n, d = 2) => Number(Number(n).toFixed(d));

/** Shared symbols: injected only into documents that reference them. */
const SHARED = new Map();
export function registerDef(id, markup) {
  SHARED.set(id, markup);
}

export function svgDoc({ w, h, title, desc = '', css = '', defs = '', body }) {
  const used = [...SHARED].filter(([id]) => body.includes(`#${id}"`)).map(([, m]) => m).join('');
  const all = `${body}${defs}`;
  const common = commonDefs()
    .split(/\n(?=  <(?:linearGradient|pattern) )/)
    .filter((chunk) => {
      const id = /id="([^"]+)"/.exec(chunk)?.[1];
      return id && all.includes(`url(#${id})`);
    })
    .join('\n');
  defs = `${used}${common}${defs}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}" shape-rendering="crispEdges">
<title>${esc(title)}</title>${desc ? `\n<desc>${esc(desc)}</desc>` : ''}
<defs>${defs}</defs>
<style>${BASE_CSS}${css}</style>
${body}
</svg>`;
}

const BASE_CSS = `
.sm{shape-rendering:auto}
@media (prefers-reduced-motion: reduce){*{animation:none !important}}
`;

function commonDefs() {
  return `
  <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${P.sky}"/>
    <stop offset="0.65" stop-color="${P.skyHi}"/>
    <stop offset="1" stop-color="${P.skyLo}"/>
  </linearGradient>
  <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
    <rect x="1" y="1" width="2" height="2" fill="#000" fill-opacity="0.07"/>
    <rect x="4" y="4" width="1" height="1" fill="#000" fill-opacity="0.05"/>
  </pattern>
  <pattern id="skyGrid" width="12" height="12" patternUnits="userSpaceOnUse">
    <rect width="12" height="1" fill="#fff" fill-opacity="0.07"/>
    <rect width="1" height="12" fill="#fff" fill-opacity="0.07"/>
    <rect x="5" y="5" width="2" height="2" fill="#000" fill-opacity="0.035"/>
  </pattern>
  <pattern id="dotsW" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect x="1" y="1" width="2" height="2" fill="#fff" fill-opacity="0.16"/>
    <rect x="5" y="5" width="2" height="2" fill="#fff" fill-opacity="0.08"/>
  </pattern>
  <pattern id="brick" width="32" height="32" patternUnits="userSpaceOnUse">
    <rect width="32" height="32" fill="${P.brick}"/>
    <rect width="32" height="2" fill="${P.brickHi}"/>
    <rect y="14" width="32" height="2" fill="${P.brickLo}"/>
    <rect y="16" width="32" height="2" fill="${P.brickHi}"/>
    <rect y="30" width="32" height="2" fill="${P.brickLo}"/>
    <rect x="0" y="0" width="2" height="14" fill="${P.brickHi}"/>
    <rect x="30" y="2" width="2" height="12" fill="${P.brickLo}"/>
    <rect x="16" y="16" width="2" height="14" fill="${P.brickHi}"/>
    <rect x="14" y="18" width="2" height="12" fill="${P.brickLo}"/>
  </pattern>
  <pattern id="brickS" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect width="16" height="16" fill="${P.brick}"/>
    <rect width="16" height="1" fill="${P.brickHi}"/>
    <rect y="7" width="16" height="1" fill="${P.brickLo}"/>
    <rect y="8" width="16" height="1" fill="${P.brickHi}"/>
    <rect y="15" width="16" height="1" fill="${P.brickLo}"/>
    <rect x="15" y="1" width="1" height="6" fill="${P.brickLo}"/>
    <rect x="7" y="9" width="1" height="6" fill="${P.brickLo}"/>
  </pattern>
  <pattern id="caveBrick" width="24" height="24" patternUnits="userSpaceOnUse">
    <rect width="24" height="24" fill="${P.caveBrick}"/>
    <rect width="24" height="2" fill="${P.caveBrickHi}"/>
    <rect y="10" width="24" height="2" fill="${P.caveBrickLo}"/>
    <rect y="12" width="24" height="2" fill="${P.caveBrickHi}"/>
    <rect y="22" width="24" height="2" fill="${P.caveBrickLo}"/>
    <rect x="22" y="2" width="2" height="8" fill="${P.caveBrickLo}"/>
    <rect x="10" y="14" width="2" height="8" fill="${P.caveBrickLo}"/>
  </pattern>
  <pattern id="wallP" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect width="16" height="16" fill="${P.wall}"/>
    <rect x="3" y="3" width="2" height="2" fill="${P.wallHi}"/>
    <rect x="11" y="11" width="2" height="2" fill="${P.wallHi}"/>
  </pattern>`;
}

/** Notched "pixel-rounded" rectangle path. */
export function notch(x, y, w, h, c = 6) {
  return `M${x + c} ${y}H${x + w - c}V${y + c}H${x + w}V${y + h - c}H${x + w - c}V${y + h}H${x + c}V${y + h - c}H${x}V${y + c}H${x + c}Z`;
}

/**
 * The poster panel: blue halftone body, black ink border, hard drop shadow.
 * Reads the same on GitHub's light and dark themes.
 */
export function panel({ x = 0, y = 0, w, h, fill = P.panel, c = 8, shadow = 6, border = 3, dots = true, hi = true }) {
  const d = notch(x + border / 2, y + border / 2, w - border - shadow, h - border - shadow, c);
  return `
  <path d="${notch(x + border / 2 + shadow, y + border / 2 + shadow, w - border - shadow, h - border - shadow, c)}" fill="${P.ink}" fill-opacity="0.9"/>
  <path d="${d}" fill="${fill}"/>
  ${dots ? `<path d="${d}" fill="url(#dots)"/>` : ''}
  ${hi ? `<path d="M${x + c + 4} ${y + border + 3}H${x + w - shadow - c - 4}" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>` : ''}
  <path d="${d}" fill="none" stroke="${P.ink}" stroke-width="${border}"/>`;
}

/** Flat slab with a black border and hard shadow (the poster's highlight bars). */
export function slab({ x, y, w, h, fill, shadow = 4, border = 3, shadowFill = P.ink }) {
  return `
  <rect x="${x + shadow}" y="${y + shadow}" width="${w}" height="${h}" fill="${shadowFill}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>
  <rect x="${x + border / 2}" y="${y + border / 2}" width="${w - border}" height="${h - border}" fill="none" stroke="${P.ink}" stroke-width="${border}"/>`;
}
