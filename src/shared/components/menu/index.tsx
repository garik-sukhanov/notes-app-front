import { useLocation } from 'react-router-dom';

import { Menu, Typography } from '@/shared/components/ui';
import { ROUTES } from '@/shared/model/routes';

import { ChangeThemeButton, LogoutButton } from '../buttons';

export const BusinessMenu = ({ isMobile }: { isMobile?: boolean }) => {
  const location = useLocation();

  return (
    <Menu isMobile={isMobile}>
      <Menu.Item to={ROUTES.NOTES} $active={location.pathname === ROUTES.NOTES}>
        Заметки
      </Menu.Item>
      <Menu.Item to={ROUTES.USERS} $active={location.pathname === ROUTES.USERS}>
        Пользователи
      </Menu.Item>
      {isMobile && (
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px 0',
            width: '100%',
            borderTop: '1px solid gray',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>Тема:</Typography>
            <ChangeThemeButton />
          </div>
          <LogoutButton $variant="secondary" $fullWidth />
        </div>
      )}
    </Menu>
  );
};

export { BusinessMenu as Menu };
