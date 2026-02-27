import { createContext } from 'react';

import { THEME_KEY, ThemeVariants } from '@/shared/types/collections';

interface ThemeContextValue {
  theme: ThemeVariants;
  handleChangeTheme: (checked: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme:
    (localStorage.getItem(THEME_KEY) as ThemeVariants) || ThemeVariants.Light,
  handleChangeTheme: () => {},
});
