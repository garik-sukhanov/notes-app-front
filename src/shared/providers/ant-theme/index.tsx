import { ThemeProvider as StyledProvider } from 'styled-components';

import { ConfigProvider, theme as antdTheme } from 'antd';
import { type ReactNode, useContext } from 'react';

import { ThemeContext } from '@/shared/context/theme';
import { darkTokens, lightTokens } from '@/shared/tokens';
import { ThemeVariants } from '@/shared/types/collections';

export const AntThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  const tokens = theme === ThemeVariants.Dark ? darkTokens : lightTokens;

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === ThemeVariants.Dark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: tokens,
      }}
    >
      <StyledProvider theme={tokens}>{children}</StyledProvider>
    </ConfigProvider>
  );
};
