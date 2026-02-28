import { useLocation } from 'react-router-dom';

import { Menu } from '@/shared/components/ui';
import { BREAKPOINTS } from '@/shared/constants';
import { useMediaQuery } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';

export const BusinessMenu = () => {
  const location = useLocation();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`);

  return (
    <Menu isMobile={isMobile}>
      <Menu.Item to={ROUTES.NOTES} $active={location.pathname === ROUTES.NOTES}>
        Заметки
      </Menu.Item>
      <Menu.Item to={ROUTES.USERS} $active={location.pathname === ROUTES.USERS}>
        Пользователи
      </Menu.Item>
    </Menu>
  );
};

export { BusinessMenu as Menu };
