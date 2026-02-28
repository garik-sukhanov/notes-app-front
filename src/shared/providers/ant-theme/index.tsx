import { ThemeProvider as StyledProvider } from 'styled-components';

import { type ReactNode, useContext } from 'react';

import { ThemeContext } from '@/shared/context/theme';
import { darkTokens, lightTokens } from '@/shared/tokens';
import { ThemeVariants } from '@/shared/types/collections';

export const AntThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  const tokens = theme === ThemeVariants.Dark ? darkTokens : lightTokens;

  return <StyledProvider theme={tokens}>{children}</StyledProvider>;
};
