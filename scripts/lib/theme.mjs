/**
 * Design tokens for the Mushroom-Kingdom profile.
 * Pulled from the reference art: NES sky blue, ?-block gold, brick orange,
 * warp-pipe green, and the black-ink-on-yellow "LET'S PLAY" poster look.
 */

export const W = 880; // README assets are authored at this width

export const P = {
  // sky
  sky: '#3AA6E4',
  skyHi: '#62BDF0',
  skyLo: '#9ADDF9',
  cloud: '#FFFFFF',
  cloudShade: '#BDE8FB',
  cloudInk: '#1E5F86',

  // panels (the blue halftone poster)
  panel: '#3BA3DD',
  panelHi: '#5DB8E8',
  panelLo: '#2484BD',

  // ink
  ink: '#111111',
  inkSoft: '#0B2440',
  inkFaint: '#24557D',
  paper: '#FFFFFF',

  // mario
  red: '#E52521',
  redDark: '#A3140F',
  blue: '#2459D8',
  blueDark: '#163A9C',
  skin: '#FFC08A',
  skinShade: '#E0945A',
  brown: '#6B3A13',
  brownDark: '#3E2108',
  gold: '#FFD43B',

  // world
  yellow: '#F8C21C',
  orange: '#F2541B',
  qblock: '#F8A31C',
  qblockHi: '#FFD98A',
  qblockLo: '#9C4A00',
  brick: '#C84C0C',
  brickHi: '#FC9838',
  brickLo: '#6E2400',
  grass: '#43B047',
  grassHi: '#86D63A',
  grassLo: '#1E6B22',
  pipe: '#2DB34A',
  pipeHi: '#B8F25A',
  pipeLo: '#106B24',
  coin: '#FFC93C',
  coinHi: '#FFF1A8',
  coinLo: '#C07A00',

  // underground (contribution world)
  cave: '#0B0F1E',
  caveHi: '#141B33',
  caveBrick: '#1F5FBF',
  caveBrickHi: '#5C9BF2',
  caveBrickLo: '#0C2D66',
  caveText: '#E8F0FF',
  caveFaint: '#7D8DB8',

  // night room
  wall: '#23294F',
  wallHi: '#2E3663',
  wallLo: '#171B38',
  wood: '#8A4F24',
  woodHi: '#B4713A',
  woodLo: '#4E2A10',
  screen: '#0D1B2A',
  screenGlow: '#7FE3FF',
};

/** level 0..4 for the contribution world */
export const RAMP = ['#18213D', '#1F5FBF', '#C8641C', '#F8A31C', '#FFD43B'];

export const FONT = {
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', 'DejaVu Sans Mono', monospace",
};
