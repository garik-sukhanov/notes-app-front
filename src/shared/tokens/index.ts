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

export const lightTokens = {
  colorBgBase: '#F3FAE1',
  colorTextBase: '#333232',
  colorPrimary: '#884FC1',
  colorBgContainer: '#f5f5f5',
};

export const darkTokens = {
  colorBgBase: '#333232',
  colorTextBase: '#F3FAE1',
  colorPrimary: '#A864EC',
  colorBgContainer: '#1d1d1d',
};

export type ThemeTokens = typeof lightTokens;

export const TOKENS = {
  bgPatterns,
  spacing,
  shadows,
};
