/**
 * Pixel-art primitives. GitHub embeds README SVGs through <img>, so web fonts
 * never load — every heading is drawn from this hand-made 5x7 bitmap font
 * instead, and every sprite is a grid of characters rendered as merged runs.
 */

import { R, esc } from './svg.mjs';
import { FONT } from './theme.mjs';

/* ------------------------------------------------------------------ font */
const G = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  J: ['..###', '...#.', '...#.', '...#.', '#..#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#.#.#', '#..##', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
  ',': ['.....', '.....', '.....', '.....', '.##..', '..#..', '.#...'],
  ':': ['.....', '.##..', '.##..', '.....', '.##..', '.##..', '.....'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  '-': ['.....', '.....', '.....', '.###.', '.....', '.....', '.....'],
  '–': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  "'": ['..#..', '..#..', '.#...', '.....', '.....', '.....', '.....'],
  '’': ['..#..', '..#..', '.#...', '.....', '.....', '.....', '.....'],
  '"': ['.#.#.', '.#.#.', '.....', '.....', '.....', '.....', '.....'],
  '&': ['.##..', '#..#.', '#.#..', '.#...', '#.#.#', '#..#.', '.##.#'],
  '@': ['.###.', '#...#', '#.###', '#.#.#', '#.###', '#....', '.###.'],
  '#': ['.#.#.', '.#.#.', '#####', '.#.#.', '#####', '.#.#.', '.#.#.'],
  '(': ['...#.', '..#..', '.#...', '.#...', '.#...', '..#..', '...#.'],
  ')': ['.#...', '..#..', '...#.', '...#.', '...#.', '..#..', '.#...'],
  _: ['.....', '.....', '.....', '.....', '.....', '.....', '#####'],
  '·': ['.....', '.....', '.....', '..#..', '.....', '.....', '.....'],
  '×': ['.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '.....'],
  '→': ['.....', '..#..', '...#.', '#####', '...#.', '..#..', '.....'],
  '←': ['.....', '..#..', '.#...', '#####', '.#...', '..#..', '.....'],
  '♥': ['.....', '##.##', '#####', '#####', '.###.', '..#..', '.....'],
  '★': ['..#..', '..#..', '#####', '.###.', '.###.', '.#.#.', '#...#'],
  '%': ['##..#', '##..#', '...#.', '..#..', '.#...', '#..##', '#..##'],
  '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
  '=': ['.....', '.....', '#####', '.....', '#####', '.....', '.....'],
  '>': ['.#...', '..#..', '...#.', '....#', '...#.', '..#..', '.#...'],
  '<': ['...#.', '..#..', '.#...', '#....', '.#...', '..#..', '...#.'],
  '|': ['..#..', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  '$': ['..#..', '.####', '#.#..', '.###.', '..#.#', '####.', '..#..'],
  '~': ['.....', '.....', '.#...', '#.#.#', '...#.', '.....', '.....'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
};

const GW = 5;
const GH = 7;

/** Width in px of a pixel-font string. */
export function pxWidth(str, s = 2, { bold = false, ls = 1 } = {}) {
  const n = [...String(str)].length;
  if (!n) return 0;
  const adv = GW + (bold ? 1 : 0) + ls;
  return R((n * adv - ls) * s);
}

/** Set of lit cells (in glyph units) for a string. */
function cells(str, { bold, ls }) {
  const lit = new Set();
  const adv = GW + (bold ? 1 : 0) + ls;
  [...String(str).toUpperCase()].forEach((ch, i) => {
    const g = G[ch] || G['?'];
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        if (g[y][x] !== '#') continue;
        lit.add(`${i * adv + x},${y}`);
        if (bold) lit.add(`${i * adv + x + 1},${y}`);
      }
    }
  });
  return lit;
}

/** Merge a set of "x,y" cells into one compact path of horizontal runs. */
export function runsPath(set) {
  const rows = new Map();
  for (const k of set) {
    const [x, y] = k.split(',').map(Number);
    if (!rows.has(y)) rows.set(y, []);
    rows.get(y).push(x);
  }
  let d = '';
  for (const [y, xs] of [...rows.entries()].sort((a, b) => a[0] - b[0])) {
    xs.sort((a, b) => a - b);
    let start = xs[0];
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
      const x = xs[i];
      if (x === prev + 1) {
        prev = x;
        continue;
      }
      d += `M${start} ${y}h${prev - start + 1}v1h-${prev - start + 1}z`;
      start = x;
      prev = x;
    }
  }
  return d;
}

function dilate(set, diag = true) {
  const out = new Set();
  const n = diag
    ? [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
    : [[0, -1], [-1, 0], [1, 0], [0, 1]];
  for (const k of set) {
    const [x, y] = k.split(',').map(Number);
    for (const [dx, dy] of n) {
      const key = `${x + dx},${y + dy}`;
      if (!set.has(key)) out.add(key);
    }
  }
  return out;
}

/**
 * Pixel-font text. (x, y) is the top-left of the glyph box unless `anchor`
 * says otherwise. Optional outline (1 unit, 8-neighbour) and drop shadow.
 */
export function ptext(str, {
  x = 0,
  y = 0,
  s = 2,
  fill = '#111',
  bold = false,
  ls = 1,
  anchor = 'start',
  outline = null,
  shadow = null,
  shadowOff = 1,
  cls = '',
  style = '',
} = {}) {
  const w = pxWidth(str, s, { bold, ls });
  const ox = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const lit = cells(str, { bold, ls });
  let out = '';
  if (shadow) {
    const sh = new Set([...lit, ...(outline ? dilate(lit) : [])]);
    out += `<path d="${runsPath(sh)}" fill="${shadow}" transform="translate(${shadowOff} ${shadowOff})"/>`;
  }
  if (outline) out += `<path d="${runsPath(dilate(lit))}" fill="${outline}"/>`;
  out += `<path d="${runsPath(lit)}" fill="${fill}"/>`;
  return `<g${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''} transform="translate(${R(ox)} ${R(y)}) scale(${s})">${out}</g>`;
}

/* --------------------------------------------------------------- sprites */
/**
 * Render a character grid. `pal` maps chars to colours; '.' is transparent.
 * `outline` adds a 1-unit 4-neighbour border (the modern chunky look from
 * the reference art) and shifts the art by one unit to make room.
 */
export function sprite(grid, pal, { x = 0, y = 0, s = 4, outline = null, flip = false, cls = '', style = '' } = {}) {
  const h = grid.length;
  const w = Math.max(...grid.map((r) => r.length));
  const byColor = new Map();
  const all = new Set();
  const off = outline ? 1 : 0;
  for (let gy = 0; gy < h; gy++) {
    for (let gx = 0; gx < w; gx++) {
      const ch = grid[gy][flip ? w - 1 - gx : gx];
      if (!ch || ch === '.' || ch === ' ') continue;
      const col = pal[ch];
      if (!col) continue;
      if (!byColor.has(col)) byColor.set(col, new Set());
      const key = `${gx + off},${gy + off}`;
      byColor.get(col).add(key);
      all.add(key);
    }
  }
  let out = '';
  if (outline) out += `<path d="${runsPath(dilate(all, false))}" fill="${outline}"/>`;
  for (const [col, set] of byColor) out += `<path d="${runsPath(set)}" fill="${col}"/>`;
  return `<g${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''} transform="translate(${R(x)} ${R(y)}) scale(${s})">${out}</g>`;
}

/** Size of a sprite in px (including the optional outline). */
export function spriteSize(grid, s = 4, outline = false) {
  const w = Math.max(...grid.map((r) => r.length)) + (outline ? 2 : 0);
  const h = grid.length + (outline ? 2 : 0);
  return { w: w * s, h: h * s };
}

/**
 * Rasterise a union of circles / rects onto a pixel grid and shade it like
 * the reference clouds: light body, dithered underside, darker base row.
 * Returns a grid usable with sprite().
 */
export function blob({ w, h, circles = [], rects = [], shade = true, dither = true }) {
  const inside = (x, y) => {
    const px = x + 0.5;
    const py = y + 0.5;
    for (const [cx, cy, r] of circles) if ((px - cx) ** 2 + (py - cy) ** 2 <= r * r) return true;
    for (const [rx, ry, rw, rh] of rects) if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) return true;
    return false;
  };
  const grid = [];
  for (let y = 0; y < h; y++) {
    let row = '';
    for (let x = 0; x < w; x++) {
      if (!inside(x, y)) {
        row += '.';
        continue;
      }
      const below1 = inside(x, y + 1);
      const below2 = inside(x, y + 2);
      const below4 = inside(x, y + 4);
      if (shade && !below1) row += 's';
      else if (shade && !below2) row += 's';
      else if (dither && !below4 && (x + y) % 2 === 0) row += 's';
      else row += 'w';
    }
    grid.push(row);
  }
  return grid;
}

/* ------------------------------------------------------------ mono text */
export const MONO_RATIO = 0.6;

export function wrap(text, maxWidth, size) {
  const max = Math.max(8, Math.floor(maxWidth / (size * MONO_RATIO)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) line = word;
    else if ((line + ' ' + word).length <= max) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Mono body copy. y is the baseline of the first line. */
export function mono(text, { x, y, size = 13, fill = '#0B2440', maxWidth = 9999, lh = null, anchor = 'start', weight = 400, cls = '' }) {
  const lines = maxWidth < 9999 ? wrap(text, maxWidth, size) : [String(text)];
  const step = lh || Math.round(size * 1.45);
  return lines
    .map(
      (l, i) =>
        `<text x="${R(x)}" y="${R(y + i * step)}" font-family="${FONT.mono}" font-size="${size}" font-weight="${weight}" fill="${fill}"${
          anchor !== 'start' ? ` text-anchor="${anchor}"` : ''
        }${cls ? ` class="${cls}"` : ''}>${esc(l)}</text>`
    )
    .join('');
}

export function monoLines(text, maxWidth, size) {
  return wrap(text, maxWidth, size).length;
}
