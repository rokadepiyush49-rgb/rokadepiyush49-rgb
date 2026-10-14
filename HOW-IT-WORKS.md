# How this profile is built

The README on the profile page is **generated**. Every image in it is an
animated SVG drawn by the scripts in `scripts/`. No GIFs, no image services,
no dependencies to install: plain Node 20+.

```
data/profile.mjs           ← every word on the profile (edit this)
scripts/readme.mjs         ← builds README.md from it
data/contributions.json    ← real contribution calendar (synced daily)
scripts/lib/sprites.mjs    ← Mario, Goomba, ?-block, coins… as pixel grids
scripts/lib/pixel.mjs      ← 5×7 pixel font, sprite + shape rasterisers
scripts/scenes.mjs         ← hero, save room, vine, divider, headers, footer
scripts/generate-assets.mjs← cards, world map, score, quests, contact, build
        │
        └──▶ readme/*.svg  ←  referenced by README.md
```

## Commands

| command | what it does |
| --- | --- |
| `npm run assets` | re-render `README.md` and every `readme/*.svg` from the current data |
| `npm run sync:contributions` | pull the real calendar into `data/contributions.json` |
| `npm run sync` | both, in order |
| `npm run preview` | then open <http://localhost:4321/preview/> for a GitHub-like preview (light/dark, phone width) |

For exact local numbers, pass a token: `GITHUB_TOKEN=$(gh auth token) npm run sync`.

## Updating content

Edit `data/profile.mjs` (name, tagline, stack, power-ups, levels, quests,
contact), run `npm run assets`, commit. Or just push: the workflow re-renders
on every change under `data/` or `scripts/`.

`README.md` is generated too (`scripts/readme.mjs`), so new levels, repo
buttons and achievements show up on their own. Don't hand-edit it.

## The daily world map

[`.github/workflows/sync-world.yml`](.github/workflows/sync-world.yml) runs at
03:17 UTC every day with the built-in `GITHUB_TOKEN`, re-renders the assets
and commits only if something changed.

## Why SVG

GitHub serves README images through its image proxy, which passes SVG through
intact, so CSS animation runs. That buys crisp pixels at any zoom, real
`<title>`/`<desc>` text for screen readers, and a whole profile that weighs
less than one decent GIF.

Motion is **additive**: alternate sprite frames start hidden and pop-ins use
`animation-fill-mode: backwards`, so with `prefers-reduced-motion` (or if an
animation never starts) every image still shows a complete, legible frame.

Links can't live inside an SVG shown through `<img>`, so every clickable
control is its own small badge image wrapped in a Markdown link.

## Pixel art

- Fonts: GitHub won't load web fonts inside SVGs, so every heading uses the
  hand-made 5×7 bitmap font in `pixel.mjs`. Body copy uses the system mono stack.
- Small sprites are typed as character grids (`sprites.mjs`).
- The big hero Mario is traced from reference art with `rasterHD`: shapes in
  the reference's own pixel coordinates, sampled onto a fine grid with four
  tones and inked outlines per part.
- The generator is deterministic (seeded RNG, no `Date.now()`), so re-running
  it only produces a diff when the data changed.

## View counter

The `PLAYERS VISITED` badge is a free public counter
(visitor-badge.laobi.icu). It counts page hits relayed through GitHub's image
proxy, not unique visitors.
