import type { ReactNode } from 'react';

import { ThemeContext } from '@/shared/context';
import { useTheme } from '@/shared/hooks';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const { theme, handleChangeTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
