import { Switch } from 'antd';
import { useContext } from 'react';

import { ThemeContext } from '@/shared/context';
import { ThemeVariants } from '@/shared/types/collections';

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
