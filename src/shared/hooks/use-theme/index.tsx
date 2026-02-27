import { useState } from 'react';

import { ThemeVariants } from '@/shared/types/collections';

const THEME_KEY = 'theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeVariants>(
    () =>
      (localStorage.getItem(THEME_KEY) as ThemeVariants) || ThemeVariants.Light,
  );

  const handleChangeTheme = (checked: boolean) => {
    const newTheme = checked ? ThemeVariants.Dark : ThemeVariants.Light;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  return { theme, handleChangeTheme };
};
