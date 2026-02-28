import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { Link } from '@/shared/components/ui';
import { ROUTES } from '@/shared/model/routes';

const MenuList = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
`;

const MenuItem = styled(Link)<{ $active?: boolean }>`
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textBase};
  position: relative;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  text-decoration: none !important;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const Menu = () => {
  const location = useLocation();

  return (
    <MenuList>
      <MenuItem to={ROUTES.NOTES} $active={location.pathname === ROUTES.NOTES}>
        Заметки
      </MenuItem>
      <MenuItem to={ROUTES.USERS} $active={location.pathname === ROUTES.USERS}>
        Пользователи
      </MenuItem>
    </MenuList>
  );
};
