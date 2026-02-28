import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { lightTokens } from '@/shared/tokens';

export const renderWithTheme = (children: React.ReactNode) => {
  return (
    <ThemeProvider theme={lightTokens}>
      {children}
    </ThemeProvider>
  );
};

export const renderWithThemeAndRouter = (children: React.ReactNode) => {
  return (
    <ThemeProvider theme={lightTokens}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};
