export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  grey: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  purple: {
    100: '#F3E5F5',
    200: '#E1BEE7',
    300: '#CE93D8',
    400: '#BA68C8',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
    light: '#A864EC',
    dark: '#884FC1',
  },
  green: {
    light: '#F3FAE1',
  },
  dark: {
    base: '#333232',
    container: '#1d1d1d',
  },
};

const bgPatterns = {
  primary: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='30' height='30' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23f5e6b7ff'/><path d='M3.25 10h13.5M10 3.25v13.5' transform='translate(5,0)' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.5' stroke='%232d229141' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-4,0)' fill='url(%23a)'/></svg>")`,
  secondary: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='30' height='30' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%231a1a1aff'/><path d='M3.25 10h13.5M10 3.25v13.5' transform='translate(5,0)' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.5' stroke='%232e2291ff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-4,0)' fill='url(%23a)'/></svg>")`,
};

const shadows = {
  primary: '4px 4px 0 0 #221b19',
};

const spacing = {
  1: '2px',
  2: '4px',
  3: '8px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '40px',
  8: '48px',
  9: '56px',
  10: '64px',
};

const commonTokens = {
  spacing,
  shadows,
  bgPatterns,
};

export const lightTokens = {
  ...commonTokens,
  colors: {
    bgBase: palette.green.light,
    textBase: palette.dark.base,
    primary: palette.purple.dark,
    bgContainer: palette.grey[100],
    main: palette.purple.dark,
  },
};

export const darkTokens = {
  ...commonTokens,
  colors: {
    bgBase: palette.dark.base,
    textBase: palette.green.light,
    primary: palette.purple.light,
    bgContainer: palette.dark.container,
    main: palette.purple.light,
  },
};

export type ThemeTokens = typeof lightTokens;

export const TOKENS = {
  bgPatterns,
  spacing,
  shadows,
};
