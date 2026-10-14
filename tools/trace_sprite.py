#!/usr/bin/env python3
"""
Trace upscaled / slightly blurry pixel art back into a clean sprite grid.

    python3 tools/trace_sprite.py <image.png> [--colors 22] [--cell auto]

1. Flood-fills the near-white background from the image border (white inside
   the character, like gloves and eyes, is kept).
2. Searches cell sizes and offsets for the grid that best explains the art
   (lowest colour variance inside cells).
3. Samples the centre of every cell, quantises to a small palette, and writes
   scripts/lib/mario-main.mjs with the grid + palette.

Needs Pillow. The output is committed, so this only re-runs when the art changes.
"""

import argparse
import json
import os
from collections import Counter, deque

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'scripts', 'lib', 'mario-main.mjs')
CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


def is_bg(p):
    r, g, b, a = p
    return a < 40 or (min(r, g, b) > 222 and max(r, g, b) - min(r, g, b) < 26)


def remove_background(im):
    w, h = im.size
    px = im.load()
    seen = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y][x]:
            continue
        seen[y][x] = True
        if not is_bg(px[x, y]):
            continue
        px[x, y] = (0, 0, 0, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return im


def score_grid(px, w, h, cell, ox, oy):
    """Mean within-cell colour spread (lower = the grid fits the art better)."""
    total = 0.0
    n = 0
    y = oy
    while y + cell <= h:
        x = ox
        while x + cell <= w:
            xs = range(int(x + cell * 0.2), int(x + cell * 0.8) + 1)
            ys = range(int(y + cell * 0.2), int(y + cell * 0.8) + 1)
            cols = [px[i, j] for j in ys for i in xs if 0 <= i < w and 0 <= j < h]
            opaque = [c for c in cols if c[3] > 0]
            if len(opaque) > len(cols) // 2:
                for k in range(3):
                    vals = [c[k] for c in opaque]
                    m = sum(vals) / len(vals)
                    total += sum((v - m) ** 2 for v in vals) / len(vals)
                n += 1
            x += cell
        y += cell
    return total / max(n, 1)


def sample(px, w, h, cell, ox, oy):
    rows = []
    y = oy
    while y < h:
        row = []
        x = ox
        while x < w:
            xs = range(int(x + cell * 0.3), int(x + cell * 0.7) + 1)
            ys = range(int(y + cell * 0.3), int(y + cell * 0.7) + 1)
            cols = [px[i, j] for j in ys for i in xs if 0 <= i < w and 0 <= j < h]
            opaque = [c[:3] for c in cols if c[3] > 0]
            if not cols or len(opaque) <= len(cols) // 2:
                row.append(None)
            else:
                opaque.sort(key=lambda c: c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11)
                row.append(opaque[len(opaque) // 2])
            x += cell
        rows.append(row)
        y += cell
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('image')
    ap.add_argument('--colors', type=int, default=22)
    ap.add_argument('--cell', default='auto')
    ap.add_argument('--merge', type=float, default=46, help='merge palette colours closer than this')
    ap.add_argument('--out', default=OUT)
    ap.add_argument('--speck', type=float, default=95, help='max colour distance smoothed by despeckle')
    args = ap.parse_args()

    im = remove_background(Image.open(args.image).convert('RGBA'))
    bbox = im.getbbox()
    im = im.crop((bbox[0] - 2, bbox[1] - 2, bbox[2] + 2, bbox[3] + 2))
    w, h = im.size
    px = im.load()

    sizes = []
    if args.cell == 'auto':
        c = 3.6
        while c <= 6.2:
            sizes.append(c)
            c = round(c + 0.1, 2)
    else:
        sizes = [float(args.cell)]
    best = None
    for c in sizes:
        for ox in (0, c / 4, c / 2, 3 * c / 4):
            for oy in (0, c / 4, c / 2, 3 * c / 4):
                s = score_grid(px, w, h, c, ox, oy)
                if best is None or s < best[0]:
                    best = (s, c, ox, oy)
    _, cell, ox, oy = best
    print(f'cell {cell:.2f}px offset ({ox:.2f}, {oy:.2f})')

    rows = sample(px, w, h, cell, ox, oy)
    gh, gw = len(rows), max(len(r) for r in rows)

    # quantise the sampled colours to a small palette
    flat = [c for r in rows for c in r if c]
    strip = Image.new('RGB', (len(flat), 1))
    strip.putdata(flat)
    pal_img = strip.quantize(colors=args.colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    pal = pal_img.getpalette()[: args.colors * 3]
    idx = list(pal_img.get_flattened_data() if hasattr(pal_img, 'get_flattened_data') else pal_img.getdata())
    used = Counter(idx)

    # fold near-duplicate colours (blur noise) into the most common of them
    rgb = lambda i: tuple(pal[i * 3 : i * 3 + 3])
    dist = lambda a, b: sum((x - y) ** 2 for x, y in zip(rgb(a), rgb(b))) ** 0.5
    remap = {}
    for i, _ in used.most_common():
        target = next((j for j in remap.values() if j == remap.get(j, j) and dist(i, j) < args.merge), None)
        remap[i] = target if target is not None else i
    idx = [remap[i] for i in idx]
    used = Counter(idx)

    # despeckle: an isolated cell whose colour is close to its neighbourhood's
    # dominant colour is blur noise; high-contrast specks (eye glints) stay
    it = iter(idx)
    cells = [[(next(it) if c else None) for c in r] for r in rows]
    for _ in range(2):
        nxt = [row[:] for row in cells]
        for y, row in enumerate(cells):
            for x, v in enumerate(row):
                if v is None:
                    continue
                nb = [cells[j][i] for j in range(y - 1, y + 2) for i in range(x - 1, x + 2)
                      if (i, j) != (x, y) and 0 <= j < len(cells) and 0 <= i < len(cells[j]) and cells[j][i] is not None]
                if len(nb) < 6 or nb.count(v) > 1:
                    continue
                mode, cnt = Counter(nb).most_common(1)[0]
                if cnt >= 4 and dist(v, mode) < args.speck:
                    nxt[y][x] = mode
        cells = nxt
    idx = [v for r in cells for v in r if v is not None]
    used = Counter(idx)

    order = [i for i, _ in used.most_common()]
    char_of = {i: CHARS[k] for k, i in enumerate(order)}
    it = iter(idx)
    grid = []
    for r in rows:
        line = ''
        for c in r:
            line += char_of[next(it)] if c else '.'
        grid.append(line.ljust(gw, '.'))

    # trim empty rows/cols
    while grid and set(grid[0]) == {'.'}:
        grid.pop(0)
    while grid and set(grid[-1]) == {'.'}:
        grid.pop()
    left = min(len(r) - len(r.lstrip('.')) for r in grid)
    right = max(len(r.rstrip('.')) for r in grid)
    grid = [r[left:right] for r in grid]

    palette = {char_of[i]: '#%02X%02X%02X' % tuple(pal[i * 3 : i * 3 + 3]) for i in order}
    with open(args.out, 'w') as f:
        f.write('/** Generated by tools/trace_sprite.py from the main-character reference art. Do not edit by hand. */\n\n')
        f.write(f'export const MAIN_PAL = {json.dumps(palette, indent=2)};\n\n')
        f.write('export const MARIO_MAIN = [\n')
        for r in grid:
            f.write(f"  '{r}',\n")
        f.write('];\n')
    print(f'grid {len(grid[0])}x{len(grid)}, {len(palette)} colours -> {os.path.relpath(args.out)}')


if __name__ == '__main__':
    main()
