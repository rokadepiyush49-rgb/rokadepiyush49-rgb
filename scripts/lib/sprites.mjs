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

/* ------------------------------------------------------- big hero mario */
import { raster } from './pixel.mjs';

export const BIG_PAL = {
  R: '#E0402A',
  r: '#A82612',
  L: '#FF7A5C',
  W: '#FFFFFF',
  w: '#C7D3E3',
  H: '#5A2E12',
  h: '#2E1406',
  S: '#FFC08A',
  s: '#DE8E52',
  E: '#2C7BE0',
  K: '#1A0E06',
  B: '#2E6BD8',
  b: '#1B3F96',
  l: '#6FA4F2',
  Y: '#FFCA3A',
  O: '#8A4A1C',
  o: '#4E260A',
};

/** Eye boxes (grid units) so the generator can draw blinking eyelids. */
export const BIG_EYES = [
  [18, 12, 3, 5],
  [23, 12, 2, 5],
];

export const MARIO_BIG = raster({
  w: 36,
  h: 45,
  shapes: [
    // shoes
    { e: [12, 42, 5.6, 2.7], c: 'O', sh: 'o', shT: 0.3 },
    { e: [25.5, 42, 6.2, 2.7], c: 'O', sh: 'o', shT: 0.3 },
    // legs
    { r: [9, 33, 17, 41], c: 'B', sh: 'b', shW: 2 },
    { r: [19, 33, 28, 41], c: 'B', sh: 'b', shW: 2 },
    // sleeves
    { e: [8.5, 27, 3.7, 5.6], c: 'R', sh: 'r', hi: 'L' },
    { e: [28.5, 27, 3.7, 5.6], c: 'R', sh: 'r', hi: 'L' },
    // shirt
    { r: [10, 21, 27, 31], c: 'R', sh: 'r' },
    // overalls
    { r: [11, 26, 26, 36], c: 'B', sh: 'b', hi: 'l', shW: 2 },
    { r: [12, 21, 15, 27], c: 'B', sh: 'b' },
    { r: [22, 21, 25, 27], c: 'B', sh: 'b' },
    { p: [[13, 25], [14, 25], [13, 26], [14, 26], [23, 25], [24, 25], [23, 26], [24, 26]], c: 'Y' },
    // gloves
    { e: [7.5, 32.5, 3.5, 3.3], c: 'W', sh: 'w' },
    { e: [29.5, 32.5, 3.5, 3.3], c: 'W', sh: 'w' },
    // hair behind the ear, head, ear, sideburn
    { e: [10.5, 15, 3, 5.6], c: 'H', sh: 'h' },
    { e: [18.5, 15.5, 9, 8], c: 'S', sh: 's', shT: 0.62 },
    { e: [11, 15.5, 2.1, 2.7], c: 'S', sh: 's' },
    { p: [[11, 15], [11, 16]], c: 's' },
    { r: [12, 10, 14, 16], c: 'H', sh: 'h' },
    // cap + brim + emblem
    { e: [18.5, 8.5, 10.6, 7.2], c: 'R', sh: 'r', hi: 'L', clip: { y1: 11 } },
    { e: [24.5, 11, 8.2, 1.9], c: 'r' },
    { e: [18.5, 6, 3.7, 3.2], c: 'W' },
    { p: [[16, 5], [16, 6], [16, 7], [17, 6], [18, 7], [19, 6], [20, 5], [20, 6], [20, 7]], c: 'R' },
    // brows + eyes
    { r: [18, 11, 22, 12], c: 'K' },
    { r: [23, 11, 26, 12], c: 'K' },
    { r: [18, 12, 21, 17], c: 'W' },
    { r: [23, 12, 25, 17], c: 'W' },
    { r: [19, 13, 21, 17], c: 'E' },
    { r: [24, 13, 25, 17], c: 'E' },
    { p: [[20, 14], [20, 15], [24, 14], [24, 15]], c: 'K' },
    // nose, moustache, mouth
    { e: [27.6, 17.4, 3.7, 2.8], c: 'S', sh: 's', hi: 'W', hiT: 0.8 },
    { e: [22, 20.6, 5.6, 1.8], c: 'h' },
    { e: [17.6, 20.1, 2.6, 1.4], c: 'h' },
    { r: [21, 22, 25, 23], c: 's' },
  ],
});

/* ------------------------------------------- high-detail hero mario (HD) */
/*
 * Traced by eye from the user's reference art (500x500, Mario standing,
 * 3/4 view). Coordinates below are that image's own pixels; rasterHD samples
 * them at U image-pixels per cell — roughly twice the reference's density.
 */
import { rasterHD } from './pixel.mjs';

export const HD_PAL = {
  K: '#2A1206', // ink line
  R: '#D2432B', r: '#A82C17', q: '#741A0C', L: '#F07A58', // cap + shirt
  S: '#F7B47C', s: '#DB8A50', t: '#B4642E', F: '#FFD5AE', // skin
  H: '#6E3A1A', h: '#46220C', // hair
  M: '#2E1608', m: '#55301A', // moustache + brows
  W: '#FFFFFF', w: '#CBD6E5', v: '#97A8C2', // white, glove shades
  E: '#2F86E6', e: '#1B4FA8', X: '#0E0E1A', // eyes
  B: '#2F6FD6', b: '#1F4FA6', n: '#153A80', l: '#66A0F0', // overalls
  Y: '#FFC93A', y: '#D08A10', // buttons
  O: '#8E4C1E', o: '#5A2C0E', j: '#BC7438', // shoes
};

const HD_FRAME = { x0: 150, y0: 56, x1: 356, y1: 428, u: 4.1 };

const HD_SHAPES = [
  // shoes
  { e: [221, 410, 37, 14], c: 'O', sh: 'o', hi: 'j', line: 'K' },
  { e: [302, 410, 39, 14], c: 'O', sh: 'o', hi: 'j', line: 'K' },
  // legs
  { r: [201, 360, 265, 402], c: 'B', sh: 'b', dk: 'n', hi: 'l', line: 'K' },
  { r: [266, 360, 330, 402], c: 'B', sh: 'b', dk: 'n', hi: 'l', line: 'K' },
  // sleeves + shirt
  { e: [186, 306, 23, 45], c: 'R', sh: 'r', dk: 'q', hi: 'L', line: 'K' },
  { e: [329, 306, 19, 43], c: 'R', sh: 'r', dk: 'q', hi: 'L', line: 'K' },
  { e: [258, 300, 78, 50], c: 'R', sh: 'r', dk: 'q', hi: 'L', line: 'K' },
  // overalls (one piece so no seam), straps, buttons
  {
    poly: [[210, 276], [314, 276], [318, 318], [328, 346], [332, 382], [198, 382], [200, 346], [206, 318]],
    c: 'B', sh: 'b', dk: 'n', hi: 'l', line: 'K',
  },
  { r: [211, 254, 233, 286], c: 'B', sh: 'b', hi: 'l', line: 'K' },
  { r: [289, 254, 310, 286], c: 'B', sh: 'b', hi: 'l', line: 'K' },
  { e: [240, 293, 8.5, 8], c: 'Y', sh: 'y', line: 'K' },
  { e: [299, 293, 7.5, 8], c: 'Y', sh: 'y', line: 'K' },
  { r: [263, 366, 268, 404], c: 'K' },
  // gloves
  { e: [182, 351, 27, 25], c: 'W', sh: 'w', dk: 'v', line: 'K', shT: 0.3 },
  { e: [329, 351, 19, 23], c: 'W', sh: 'w', dk: 'v', line: 'K', shT: 0.3 },
  { r: [172, 349, 188, 353], c: 'w' },
  // hair, face, ear, sideburn
  { e: [195, 196, 25, 46], c: 'H', sh: 'h', line: 'K' },
  { e: [268, 200, 61, 61], c: 'S', sh: 's', dk: 't', hi: 'F', line: 'K', shT: 0.45, dkT: 0.8 },
  { e: [195, 202, 13, 18], c: 'S', sh: 's', line: 'K' },
  { e: [197, 203, 5, 9], c: 's' },
  { r: [208, 156, 225, 210], c: 'H', sh: 'h', ly: 0.2, lx: 0.9 },
  // shadow under the brim
  { e: [276, 160, 62, 7], c: 's' },
  // cap dome, brim, emblem
  { e: [255, 128, 91, 69], c: 'R', sh: 'r', dk: 'q', hi: 'L', line: 'K', clip: { y1: 158 }, hiT: -0.45 },
  { e: [295, 150, 60, 12.5], c: 'r', sh: 'q', hi: 'R', line: 'K' },
  { e: [272, 106, 23, 19], c: 'W', sh: 'w', line: 'q', shT: 0.6 },
  {
    poly: [[259, 117], [259, 97], [265, 97], [272, 106], [279, 97], [285, 97], [285, 117], [280, 117], [280, 107], [272, 115], [264, 107], [264, 117]],
    c: 'R',
  },
  // brows + eyes
  { poly: [[238, 168], [268, 161], [270, 168], [240, 175]], c: 'M' },
  { poly: [[284, 164], [310, 167], [309, 173], [284, 171]], c: 'M' },
  { e: [256, 193, 15.5, 19.5], c: 'W', line: 'K' },
  { e: [262, 198, 8.5, 12.5], c: 'E', sh: 'e', shT: 0.2 },
  { e: [263, 199, 4.6, 8], c: 'X' },
  { r: [255, 184, 261, 191], c: 'W' },
  { e: [298, 194, 12, 18.5], c: 'W', line: 'K' },
  { e: [301, 198, 7, 12], c: 'E', sh: 'e', shT: 0.2 },
  { e: [302, 199, 3.6, 7], c: 'X' },
  { r: [296, 186, 301, 192], c: 'W' },
  // moustache, then the nose over it
  {
    poly: [[222, 237], [229, 227], [246, 228], [263, 224], [282, 227], [300, 224], [318, 226], [334, 229], [338, 238], [330, 247], [317, 250], [300, 246], [282, 251], [263, 247], [246, 250], [229, 247]],
    c: 'M', hi: 'm', line: 'K', hiT: -0.3,
  },
  { e: [320, 222, 25.5, 19.5], c: 'S', sh: 's', dk: 't', hi: 'F', line: 'K', shT: 0.3 },
  { r: [306, 209, 313, 214], c: 'W' },
  { r: [262, 251, 292, 255], c: 't' },
];

export const MARIO_HD = rasterHD({ ...HD_FRAME, shapes: HD_SHAPES });

/** Closed-eye overlay on the same grid, for blinking. */
export const MARIO_HD_LIDS = rasterHD({
  ...HD_FRAME,
  shapes: [
    { e: [257, 194, 15.5, 19.5], c: 'S', sh: 's', shT: 0.2 },
    { e: [298, 195, 12, 18.5], c: 'S', sh: 's', shT: 0.2 },
    { r: [243, 199, 272, 204], c: 'K' },
    { r: [287, 199, 309, 204], c: 'K' },
  ],
});
