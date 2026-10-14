/**
 * Every sprite on the profile, as character grids. '.' is transparent.
 * Rendered by sprite() in pixel.mjs; palettes live next to the grids.
 */

import { P } from './theme.mjs';

/* ----------------------------------------------------------------- mario */
export const MARIO_PAL = {
  R: P.red,
  r: P.redDark,
  B: P.blue,
  b: P.blueDark,
  S: P.skin,
  s: P.skinShade,
  H: P.brown,
  h: P.brownDark,
  Y: P.gold,
  W: '#FFFFFF',
  w: '#D3DEEA',
  K: P.ink,
};

const HEAD = [
  '.....RRRRR......',
  '....RRRRRRRRR...',
  '....HHHSSKS.....',
  '...HSHSSSKSSS...',
  '...HSHHSSSHSSS..',
  '...HHSSSSHHHH...',
  '.....SSSSSSS....',
];

export const MARIO_STAND = [
  ...HEAD,
  '....RRBRRR......',
  '...RRRBRRBRRR...',
  '..RRRRBBBBRRRR..',
  '..WWRBYBBYBRWW..',
  '..WWWBBBBBBWWW..',
  '..WWBBBBBBBBWW..',
  '....BBB..BBB....',
  '...HHH....HHH...',
  '..HHHH....HHHH..',
];

export const MARIO_WALK_A = [
  ...HEAD,
  '....RRRRBRR.WW..',
  '..RRRRRRBBRWWW..',
  '.WWRRRRRBYBBWW..',
  '.WWW.RRBBBBBB...',
  '..W..BBBBBBBB...',
  '...BBBBBBBBBB...',
  '..BBBB...BBBB...',
  '.HHHH.....HHH...',
  '.HHHH.....HHHH..',
];

export const MARIO_WALK_B = [
  ...HEAD,
  '.....RRBRR......',
  '....RRRBBRR.....',
  '....RRRBYBBWW...',
  '....RRRBBBBWW...',
  '....WWWBBBB.....',
  '.....WWBBBB.....',
  '......BBBBB.....',
  '.....HHHHHH.....',
  '.....HHHHH......',
];

export const MARIO_JUMP = [
  '..............WW',
  '.....RRRRR...WWW',
  '....RRRRRRRRRWW.',
  '....HHHSSKS..RR.',
  '...HSHSSSKSSSRR.',
  '...HSHHSSSHSSSR.',
  '...HHSSSSHHHHR..',
  '.....SSSSSSSR...',
  '..RRRRRBRRRB....',
  '.RRRRRRRBRRB...H',
  'WWRRRRRRBBBB..HH',
  'WWW.BBRBYBBYBHHH',
  'WW..BBBBBBBBBHHH',
  '...BBBBBBBBBBHH.',
  '..HHHBBBB.......',
  '..HHH...........',
];

/** Seen from behind — used at the desk in the save room. */
export const MARIO_BACK = [
  '.....RRRRRR.....',
  '....RRRRRRRR....',
  '...RRRRRRRRRR...',
  '...RRRRRRRRRR...',
  '....HHHHHHHH....',
  '...SHHHHHHHHS...',
  '...SHHHHHHHHS...',
  '....HHHHHHHH....',
  '..RRRRBRRBRRRR..',
  '.RRRRRBRRBRRRRR.',
  '.RRRRRBRRBRRRRR.',
  '.RRRRRBBBBRRRRR.',
  '....BBBBBBBB....',
  '....BBBBBBBB....',
];

/** Climbing the vine: one hand up. Flip it for the other hand. */
export const MARIO_CLIMB = [
  '..WW............',
  '..WW.RRRRRR.....',
  '..RRRRRRRRRR....',
  '...RRRRRRRRR....',
  '...RRRRRRRRRR...',
  '....HHHHHHHH....',
  '...SHHHHHHHHS...',
  '...SHHHHHHHHS...',
  '....HHHHHHHHWW..',
  '...RRRBRRBRRWW..',
  '...RRRBRRBRRR...',
  '...RRRBBBBRRR...',
  '....BBBBBBBB....',
  '....BBBBBBBB....',
  '....BBB..BBB....',
  '...HHHH...HHH...',
  '..........HHH...',
];

/* ------------------------------------------------------------- creatures */
export const GOOMBA_PAL = { G: '#9A4A1C', T: '#F2C89A', K: P.ink, W: '#FFFFFF' };
export const GOOMBA = [
  '......GGGG......',
  '.....GGGGGG.....',
  '....GGGGGGGG....',
  '...GGGGGGGGGG...',
  '..GKKGGGGGGKKG..',
  '.GGGWKKGGKKWGGG.',
  '.GGGWKWGGWKWGGG.',
  'GGGGWKWGGWKWGGGG',
  'GGGGWWWGGWWWGGGG',
  'GGGGGGGGGGGGGGGG',
  '.GGGGTTTTTTGGGG.',
  '....TTTTTTTT....',
  '....TTTTTTTTKK..',
  '..KKKTTTTTKKKKK.',
  '.KKKKKTTTKKKKKK.',
  '.KKKKKK...KKKK..',
];

export const PIRANHA_PAL = { R: P.red, W: '#FFFFFF', K: P.ink, m: '#4A0A0A', G: P.pipe, g: P.pipeLo };
const PIRANHA_STEM = [
  '.......GG.......',
  '..GG...GG...GG..',
  '.GGGG..GG..GGGG.',
  '.GGgGG.GG.GGgGG.',
  '..GGGGGGGGGGGG..',
  '....GGGGGGGG....',
  '.......GG.......',
  '.......GG.......',
  '.......GG.......',
];
export const PIRANHA_OPEN = [
  '.....KKKKKK.....',
  '...KKRRRRRRKK...',
  '..KRRWWRRRRRRK..',
  '.KRRWWRRRRWWRRK.',
  '.KRRRRRRRRWWRRK.',
  'KRRRRRRWWRRRRRRK',
  'KWKWKWKWKWKWKWKK',
  'KmmmmmmmmmmmmmmK',
  'KmmmmmmmmmmmmmmK',
  'KKWKWKWKWKWKWKWK',
  'KRRRRWWRRRRRRRRK',
  '.KRRRWWRRRRWWRK.',
  '..KRRRRRRRRRRK..',
  '...KKRRRRRRKK...',
  '.....KKKKKK.....',
  ...PIRANHA_STEM,
];
export const PIRANHA_SHUT = [
  '................',
  '.....KKKKKK.....',
  '...KKRRRRRRKK...',
  '..KRRWWRRRRRRK..',
  '.KRRWWRRRRWWRRK.',
  '.KRRRRRRRRWWRRK.',
  'KRRRRRRWWRRRRRRK',
  'KWKWKWKWKWKWKWKK',
  'KKWKWKWKWKWKWKWK',
  'KRRRRWWRRRRRRRRK',
  '.KRRRWWRRRRWWRK.',
  '..KRRRRRRRRRRK..',
  '...KKRRRRRRKK...',
  '.....KKKKKK.....',
  '................',
  ...PIRANHA_STEM,
];

/* ----------------------------------------------------------------- items */
export const QBLOCK_PAL = { O: P.qblock, D: P.qblockLo, W: '#FFF4D6', K: '#6E3200', L: P.qblockHi };
export const QBLOCK = [
  '.DDDDDDDDDDDDDD.',
  'DLLLLLLLLLLLLLOD',
  'DLKOOOOOOOOOOKOD',
  'DLOOOWWWWWOOOOOD',
  'DLOOWWKKKWWKOOOD',
  'DLOOWWKOOWWKOOOD',
  'DLOOOKKOOWWKOOOD',
  'DLOOOOOOWWWKOOOD',
  'DLOOOOOWWKKKOOOD',
  'DLOOOOOWWKOOOOOD',
  'DLOOOOOOKKOOOOOD',
  'DLOOOOOWWOOOOOOD',
  'DLOOOOOWWKOOOOOD',
  'DLKOOOOOKKOOOKOD',
  'DOOOOOOOOOOOOOOD',
  '.DDDDDDDDDDDDDD.',
];
export const USED_BLOCK = [
  '.DDDDDDDDDDDDDD.',
  'DOOOOOOOOOOOOOOD',
  'DOKOOOOOOOOOOKOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOOOOOOOOOOOOOOD',
  'DOKOOOOOOOOOOKOD',
  'DOOOOOOOOOOOOOOD',
  '.DDDDDDDDDDDDDD.',
];
export const USED_PAL = { O: '#A0521C', D: '#4E2408', K: '#2A1204' };

export const COIN_PAL = { Y: P.coin, L: P.coinHi, O: P.coinLo, D: '#5E3300' };
export const COIN = [
  '...DDDD...',
  '..DYYYYD..',
  '.DYLLYYYD.',
  '.DYLYYOYD.',
  'DYLYYYOYYD',
  'DYLYYYOYYD',
  'DYLYYYOYYD',
  'DYLYYYOYYD',
  'DYLYYYOYYD',
  'DYLYYYOYYD',
  '.DYLYYOYD.',
  '.DYYYYYYD.',
  '..DYYYYD..',
  '...DDDD...',
];

export const SHROOM_PAL = { R: P.red, W: '#FFFFFF', K: P.ink, S: '#FFE3BE' };
export const ONEUP_PAL = { R: '#2DB34A', W: '#FFFFFF', K: P.ink, S: '#FFE3BE' };
export const SHROOM = [
  '......KKKK......',
  '....KKRRRRKK....',
  '...KWWRRRRWWK...',
  '..KWWWRRRRWWWK..',
  '.KRWWRRRRRRWWRK.',
  '.KRRRRWWWWRRRRK.',
  'KRRRRWWWWWWRRRRK',
  'KWWRRWWWWWWRRWWK',
  'KWWWRRWWWWRRWWWK',
  'KWWWRRRRRRRRWWWK',
  '.KKKKKKKKKKKKKK.',
  '..KSSSKSSKSSSK..',
  '..KSSSKSSKSSSK..',
  '..KSSSSSSSSSSK..',
  '...KSSSSSSSSK...',
  '....KKKKKKKK....',
];

export const FLOWER_PAL = { O: P.orange, Y: P.gold, W: '#FFFFFF', K: P.ink, G: P.pipe };
export const FLOWER = [
  '....KKKKKKKK....',
  '..KKOOOOOOOOKK..',
  '.KOOYYYYYYYYOOK.',
  'KOOYYWWWWWWYYOOK',
  'KOOYYWWWWWWYYOOK',
  '.KOOYYYYYYYYOOK.',
  '..KKOOOOOOOOKK..',
  '....KKKKKKKK....',
  '.......GG.......',
  '.GGG...GG...GGG.',
  'GGGGG..GG..GGGGG',
  '.GGGGG.GG.GGGGG.',
  '..GGGGGGGGGGGG..',
  '....GGGGGGGG....',
  '.......GG.......',
  '.......GG.......',
];

export const STAR_PAL = { Y: P.gold, L: '#FFF6B8', K: P.ink };
export const STAR = [
  '.......KK.......',
  '......KYYK......',
  '......KLYK......',
  '.....KYLYYK.....',
  'KKKKKKYYYYKKKKKK',
  'KYYYYLYYYYYYYYYK',
  '.KYYYYKYYKYYYYK.',
  '..KYYYKYYKYYYK..',
  '...KYYKYYKYYK...',
  '...KYYYYYYYYK...',
  '..KYYYYYYYYYYK..',
  '..KYYYYKKYYYYK..',
  '.KYYYKK..KKYYYK.',
  '.KYYK......KYYK.',
  'KYKK........KKYK',
  'KK............KK',
];

export const HEART = [
  '.KK.KK.',
  'KRRKRRK',
  'KRWRRRK',
  'KRRRRRK',
  '.KRRRK.',
  '..KRK..',
  '...K...',
];
export const HEART_PAL = { K: P.ink, R: P.red, W: '#FFB3B0' };

export const ROCKET_PAL = { K: P.ink, W: '#F4F7FB', R: P.red, B: P.sky, O: P.orange, Y: P.gold };
export const ROCKET = [
  '.....KK.....',
  '....KWWK....',
  '...KWWWWK...',
  '...KWRRWK...',
  '...KWRRWK...',
  '...KWWWWK...',
  '...KWBBWK...',
  '...KWBBWK...',
  '..KKWWWWKK..',
  '.KRKWWWWKRK.',
  'KRRKWWWWKRRK',
  'KRKKKKKKKKRK',
  'KK..KOOK..KK',
  '....KYYK....',
  '.....YY.....',
  '.....O......',
];

export const FLAG_PAL = { K: P.ink, W: '#FFFFFF', G: P.pipe, P: '#D0D7E0' };
export const FLAG_ICON = [
  'KK..........',
  'KKKKKKKKK...',
  'KKWWWWWWWK..',
  'KKWWGGWWWWK.',
  'KKWGGGGWWWWK',
  'KKWWGGWWWWK.',
  'KKWWWWWWWK..',
  'KKKKKKKKK...',
  'KK..........',
  'KK..........',
  'KK..........',
  'KK..........',
  'KK..........',
  'KK..........',
];

/* ----------------------------------------------------------------- icons */
export const ICON_MAIL = [
  'KKKKKKKKKKKK',
  'KWKWWWWWWKWK',
  'KWWKWWWWKWWK',
  'KWWWKWWKWWWK',
  'KWWWWKKWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
];

export const ICON_CAT = [
  '.K........K.',
  '.KK......KK.',
  '.KKKKKKKKKK.',
  'KKKKKKKKKKKK',
  'KKWWKKKKWWKK',
  'KKWWKKKKWWKK',
  'KKKKKKKKKKKK',
  '.KKKKKKKKKK.',
  '..KKKKKKKK..',
  '.K.KK..KK.K.',
  '.K.KK..KK...',
  '..KK...KK...',
];

export const ICON_IN = [
  'BBBBBBBBBBBB',
  'BWWBBBBBBBBB',
  'BWWBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BWWBWWBWWWBB',
  'BWWBWWWBBWWB',
  'BWWBWWBBBWWB',
  'BWWBWWBBBWWB',
  'BWWBWWBBBWWB',
  'BWWBWWBBBWWB',
  'BBBBBBBBBBBB',
];

export const ICON_CAM = [
  '.KKKKKKKKKK.',
  'K..........K',
  'K.......KK.K',
  'K...KKKK...K',
  'K..K....K..K',
  'K..K....K..K',
  'K..K....K..K',
  'K..K....K..K',
  'K...KKKK...K',
  'K..........K',
  '.KKKKKKKKKK.',
];

export const ICON_PIN = [
  '..KKKKKK..',
  '.KRRRRRRK.',
  'KRRRWWRRRK',
  'KRRWWWWRRK',
  'KRRWWWWRRK',
  'KRRRWWRRRK',
  '.KRRRRRRK.',
  '.KRRRRRRK.',
  '..KRRRRK..',
  '..KRRRRK..',
  '...KRRK...',
  '....KK....',
];

export const ICON_PIPE = [
  'KKKKKKKKKKKK',
  'KLGGGGGGGDDK',
  'KLGGGGGGGDDK',
  'KKKKKKKKKKKK',
  '.KLGGGGGGDK.',
  '.KLGGGGGGDK.',
  '.KLGGGGGGDK.',
  '.KLGGGGGGDK.',
  '.KLGGGGGGDK.',
  '.KLGGGGGGDK.',
  '.KKKKKKKKKK.',
];
export const PIPE_PAL = { K: P.ink, L: P.pipeHi, G: P.pipe, D: P.pipeLo };

/* --------------------------------------------- main character (traced) */
/*
 * MARIO_MAIN is traced from the user's thumbs-up reference art by
 * tools/trace_sprite.py. Here it is split into layers for animation:
 *   - the raised arm (rotates about the shoulder for a thumbs-up pump)
 *   - the body (keeps a copy of the shoulder joint so rotation never opens a gap)
 *   - eyelids for blinking (eye-coloured cells repainted as skin + a lash line)
 * Colours are looked up by value, so a re-trace that reshuffles letters still works.
 */
import { MARIO_MAIN, MAIN_PAL } from './mario-main.mjs';
export { MAIN_PAL, MARIO_MAIN };

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const near = (target) =>
  Object.entries(MAIN_PAL).sort(
    ([, a], [, b]) => hex(a).reduce((s, v, i) => s + (v - hex(target)[i]) ** 2, 0) - hex(b).reduce((s, v, i) => s + (v - hex(target)[i]) ** 2, 0)
  )[0][0];
const isEye = (ch) => {
  const c = MAIN_PAL[ch];
  if (!c) return false;
  const [r, g, b] = hex(c);
  return (r > 150 && g > 160 && b > 180) || b > r + 50; // whites, greys and blues
};

/** Arm outline in grid cells (thumb, glove, forearm, sleeve up to the shoulder). */
const ARM_POLY = [[0, 15], [25, 15], [26, 40], [28, 44], [34, 52], [33, 58], [30, 60], [26, 58], [14, 50], [0, 48]];
export const MAIN_PIVOT = [31.5, 56.5];
const inPoly = (x, y) => {
  let c = false;
  for (let i = 0, j = ARM_POLY.length - 1; i < ARM_POLY.length; j = i++) {
    const [xi, yi] = ARM_POLY[i];
    const [xj, yj] = ARM_POLY[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

export const MARIO_MAIN_ARM = MARIO_MAIN.map((row, y) => [...row].map((ch, x) => (inPoly(x + 0.5, y + 0.5) ? ch : '.')).join(''));
export const MARIO_MAIN_BODY = MARIO_MAIN.map((row, y) =>
  [...row]
    .map((ch, x) => {
      if (!inPoly(x + 0.5, y + 0.5)) return ch;
      return Math.hypot(x + 0.5 - MAIN_PIVOT[0], y + 0.5 - MAIN_PIVOT[1]) < 6.5 ? ch : '.';
    })
    .join('')
);

/** Eye boxes found from the blue iris cells in the face area. */
const SKIN = near('#FDEBB6');
const INK = near('#000000');
const eyeBoxes = (() => {
  const cols = [];
  for (let y = 18; y < 42; y++) {
    for (let x = 30; x < 62; x++) {
      const c = MAIN_PAL[MARIO_MAIN[y][x]];
      if (c && hex(c)[2] > hex(c)[0] + 90) cols.push([x, y]);
    }
  }
  const split = (cols.reduce((a, [x]) => a + x, 0) / Math.max(cols.length, 1)) | 0;
  return [cols.filter(([x]) => x < split), cols.filter(([x]) => x >= split)].map((pts) => {
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    return [Math.min(...xs) - 2, Math.min(...ys) - 3, Math.max(...xs) + 2, Math.max(...ys) + 1];
  });
})();

export const MARIO_MAIN_LIDS = MARIO_MAIN.map((row, y) =>
  [...row]
    .map((ch, x) => {
      const box = eyeBoxes.find(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1);
      if (!box || !isEye(ch)) return '.';
      const lash = Math.round(box[1] + (box[3] - box[1]) * 0.62);
      return y === lash ? INK : SKIN;
    })
    .join('')
);
