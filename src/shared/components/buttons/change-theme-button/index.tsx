import { useContext } from 'react';

import { ThemeContext } from '@/shared/context';
import { ThemeVariants } from '@/shared/types/collections';
import { Switch } from '@/shared/components/ui';

export const ChangeThemeButton = () => {
  const { theme, handleChangeTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme === ThemeVariants.Dark}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
      onChange={handleChangeTheme}
    />
  );
};
