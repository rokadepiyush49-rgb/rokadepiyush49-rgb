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

/* ------------------------------------------------------------ rasteriser */
/**
 * Paint simple shapes onto a pixel grid in z-order and return a sprite grid.
 * Used for the big hero Mario, which is too detailed to hand-type cleanly.
 *   { e:[cx,cy,rx,ry] }  ellipse      { r:[x0,y0,x1,y1] }  rect (x1/y1 exclusive)
 *   { p:[[x,y],...] }    pixels
 * c = colour char, sh = shade char (bottom-right), hi = highlight (top-left),
 * clip = { x0, y0, x1, y1 } limits where the shape may paint.
 */
export function raster({ w, h, shapes }) {
  const g = Array.from({ length: h }, () => Array(w).fill('.'));
  const put = (x, y, ch, clip) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    if (clip) {
      if (clip.x0 !== undefined && x < clip.x0) return;
      if (clip.y0 !== undefined && y < clip.y0) return;
      if (clip.x1 !== undefined && x >= clip.x1) return;
      if (clip.y1 !== undefined && y >= clip.y1) return;
    }
    g[y][x] = ch;
  };
  for (const s of shapes) {
    if (s.p) {
      for (const [x, y] of s.p) put(x, y, s.c, s.clip);
      continue;
    }
    if (s.e) {
      const [cx, cy, rx, ry] = s.e;
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
          const dx = (x + 0.5 - cx) / rx;
          const dy = (y + 0.5 - cy) / ry;
          if (dx * dx + dy * dy > 1) continue;
          let ch = s.c;
          if (s.sh && dx * 0.55 + dy * 0.85 > (s.shT ?? 0.55)) ch = s.sh;
          else if (s.hi && -dx * 0.6 - dy * 0.8 > (s.hiT ?? 0.55)) ch = s.hi;
          put(x, y, ch, s.clip);
        }
      }
      continue;
    }
    if (s.r) {
      const [x0, y0, x1, y1] = s.r;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          let ch = s.c;
          if (s.sh && (x >= x1 - (s.shW ?? 1) || y >= y1 - (s.shH ?? 1))) ch = s.sh;
          else if (s.hi && (x === x0 || y === y0)) ch = s.hi;
          put(x, y, ch, s.clip);
        }
      }
    }
  }
  return g.map((row) => row.join(''));
}

/**
 * Higher-detail rasteriser for the hero Mario. Shapes are authored in the
 * reference image's own pixel coordinates and sampled onto a grid of `u`
 * image-pixels per cell. Each shape gets 4 tones (highlight/base/shade/deep,
 * lit from the top-left) and an optional 1-cell ink line around its own edge,
 * which is what gives modern pixel art its outlined, "inked" parts.
 *   { e:[cx,cy,rx,ry] } ellipse · { r:[x0,y0,x1,y1] } rect · { poly:[[x,y],…] }
 */
export function rasterHD({ x0, y0, x1, y1, u, shapes }) {
  const w = Math.ceil((x1 - x0) / u);
  const h = Math.ceil((y1 - y0) / u);
  const g = Array.from({ length: h }, () => Array(w).fill('.'));
  const inPoly = (pts, x, y) => {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  for (const s of shapes) {
    let bx0, by0, bx1, by1, test, cx, cy, hw, hh;
    if (s.e) {
      const [ex, ey, rx, ry] = s.e;
      [bx0, by0, bx1, by1] = [ex - rx, ey - ry, ex + rx, ey + ry];
      [cx, cy, hw, hh] = [ex, ey, rx, ry];
      test = (x, y) => ((x - ex) / rx) ** 2 + ((y - ey) / ry) ** 2 <= 1;
    } else if (s.r) {
      [bx0, by0, bx1, by1] = s.r;
      test = (x, y) => x >= bx0 && x < bx1 && y >= by0 && y < by1;
    } else {
      const xs = s.poly.map((p) => p[0]);
      const ys = s.poly.map((p) => p[1]);
      [bx0, by0, bx1, by1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
      test = (x, y) => inPoly(s.poly, x, y);
    }
    if (cx === undefined) [cx, cy, hw, hh] = [(bx0 + bx1) / 2, (by0 + by1) / 2, (bx1 - bx0) / 2, (by1 - by0) / 2];
    const clip = s.clip || {};
    const set = new Map();
    const gx0 = Math.max(0, Math.floor((bx0 - x0) / u) - 1);
    const gx1 = Math.min(w - 1, Math.ceil((bx1 - x0) / u) + 1);
    const gy0 = Math.max(0, Math.floor((by0 - y0) / u) - 1);
    const gy1 = Math.min(h - 1, Math.ceil((by1 - y0) / u) + 1);
    for (let gy = gy0; gy <= gy1; gy++) {
      for (let gx = gx0; gx <= gx1; gx++) {
        const px = x0 + (gx + 0.5) * u;
        const py = y0 + (gy + 0.5) * u;
        if (!test(px, py)) continue;
        if (clip.y0 !== undefined && py < clip.y0) continue;
        if (clip.y1 !== undefined && py >= clip.y1) continue;
        if (clip.x0 !== undefined && px < clip.x0) continue;
        if (clip.x1 !== undefined && px >= clip.x1) continue;
        const v = ((px - cx) / hw) * (s.lx ?? 0.55) + ((py - cy) / hh) * (s.ly ?? 0.83);
        set.set(`${gx},${gy}`, v);
      }
    }
    for (const [k, v] of set) {
      const [gx, gy] = k.split(',').map(Number);
      let ch = s.c;
      if (s.line && (!set.has(`${gx - 1},${gy}`) || !set.has(`${gx + 1},${gy}`) || !set.has(`${gx},${gy - 1}`) || !set.has(`${gx},${gy + 1}`))) ch = s.line;
      else {
        const dith = (gx + gy) % 2 === 0 ? 0.035 : -0.035;
        const vv = s.dither ? v + dith : v;
        if (s.dk && vv > (s.dkT ?? 0.72)) ch = s.dk;
        else if (s.sh && vv > (s.shT ?? 0.35)) ch = s.sh;
        else if (s.hi && vv < (s.hiT ?? -0.5)) ch = s.hi;
      }
      g[gy][gx] = ch;
    }
  }
  return g.map((row) => row.join(''));
}
