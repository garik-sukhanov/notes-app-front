import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ThemeContext } from '@/shared/context';
import { useTheme } from '@/shared/hooks';
import { lightTokens, darkTokens } from '@/shared/tokens';
import { ThemeVariants } from '@/shared/types/collections';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const { theme, handleChangeTheme } = useTheme();

  const currentTokens = theme === ThemeVariants.Light ? lightTokens : darkTokens;

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      <StyledThemeProvider theme={currentTokens}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
