// Colors
export const PRIMARY_COLOR = '#40075E';
export const SECONDARY_COLOR = '#3A3A3A';
export const SUCCESS_COLOR = '#17874B';
export const ERROR_COLOR = '#D93232';
export const WARNING_COLOR = '#D97E00';
export const INFO_COLOR = '#096BC3';
export const MODAL_BACKDROPCOLOR = '#40075E70';

// Fonts
export const NUNITO_REGULAR = 'Nunito-Regular';
export const NUNITO_BOLD = 'Nunito-Bold';
export const NUNITO_SEMI_BOLD = 'Nunito-SemiBold';
export const NUNITO_BLACK = 'Nunito-Black';
export const NUNITO_ITALIC = 'Nunito-Italic';

// Spacing
export const SMALL_SPACING = 8;
export const MEDIUM_SPACING = 16;
export const TABLET_MEDIUM_SPACING = 56;
export const LARGE_SPACING = 24;
export const EXTRA_LARGE_SPACING = 32;
export const EXTRA_MEDIUM_LARGE_SPACING = 40;
export const EXTRA_EXTRA_LARGE_SPACING = 48;
export const EXTRA_VERY_LARGE_SPACING = 72;
export const EXTRA_VERY_LARGE_SPACING_TABLET = 120;

// Border Radius
export const SMALL_BORDER_RADIUS = 4;
export const MEDIUM_BORDER_RADIUS = 8;
export const MEDIUM_LARGE_BORDER_RADIUS = 16;
export const LARGE_BORDER_RADIUS = 28;

export const BUTTON_MAX_WIDTH = 360;

export const Neutrals = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#D82B2C',
  orange: '#FFB321',
  shadow: '#00000033',
  shadow10: '#ECECEC',
  gray: '#E8E8E8',
  darkPurple: '#470A68',
  lightPurple: '#D2BCE4',
  lightBlue: '#00AEEF',
  lightGray: '#F2F4F4',
  darkGray: '#AEAEAE',
  chineseSilver: '#CACACA',
  chineseSilver2: '#CCCCCC',
  cultured: '#F6F6F6',
  deepViolet: '#40075E',
  deepViolet2: '#470868',
  grape: '#6F28A9',
  grape2: '#672DA3',
  darkOrchid: '#843CBF',
  americanViolet: '#541389',
  davyGrey: '#545454',
  brightGray: '#F1EAF6',
  graniteGray: '#666666',
  salem: '#17874B',
  darkTangerine: '#FF9E18',
  darkSilver: '#6E6E6E',
  chineseBlack: '#161616',
  aliceBlue: '#EDFAFF',
  nyanza: '#E8FAD7',
  lumber: '#FDE3D0',
  lavenderBlush: '#FFECEE',
  lightBlack: '#00000066',
  chinesePurple: '#6A1B9A',
  antiFlashWhite: '#F2F2F2',
  lavenderIndigo: '#9747FF',
  oldSilver: '#858585',
  mexicanPink: '#EC008C',
  alienArmpit: '#73C900',
  yellowRose: '#FFF200',
  mikadoYellow: '#F7C10E',
  fulvous: '#E68E00',
  appleGreen: '#6FC200',
  inchworm: '#ABDF66',
  hotPink: '#F466BA',
  celadonBlue: '#007BA9',
  mayaBlue: '#65CCF2',
  lavenderFloral: '#BB82E8',
  paleLavender: '#E9CFFF',
  philippineSilver: '#B8B8B8',
  grayOpacity16: '#E8E8E829',
  raspberryPink: '#AF2376',
} as const;

export const SelectorColorStyle = {
  primary: Neutrals.darkSilver,
  secondary: Neutrals.davyGrey,
  primaryDark: Neutrals.deepViolet,
} as const;

export const fontStyles = {
  regularText: {
    fontFamily: NUNITO_REGULAR,
    color: PRIMARY_COLOR,
    fontSize: 16,
    lineHeight: 24,
  },
  regularTextTablet: {
    fontFamily: NUNITO_REGULAR,
    color: PRIMARY_COLOR,
    fontSize: 18,
    lineHeight: 24,
  },
  smallText: {
    fontFamily: NUNITO_REGULAR,
    color: PRIMARY_COLOR,
    fontSize: 14,
    lineHeight: 24,
  },
  italicText: {
    fontFamily: NUNITO_ITALIC,
    color: PRIMARY_COLOR,
    fontSize: 16,
    lineHeight: 24,
  },
  headingText: {
    fontFamily: NUNITO_BOLD,
    color: PRIMARY_COLOR,
    fontSize: 16,
    lineHeight: 24,
  },
} as const;
