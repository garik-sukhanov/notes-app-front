import styled from 'styled-components';

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
        <Footer>
          <Row>
            <Typography>Тема:</Typography>
            <ChangeThemeButton />
          </Row>
          <LogoutButton $variant="secondary" $fullWidth />
        </Footer>
      )}
    </Menu>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  width: 100%;
  border-top: 1px solid gray;

`;

export { BusinessMenu as Menu };
