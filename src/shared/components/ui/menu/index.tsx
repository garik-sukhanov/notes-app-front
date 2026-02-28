import styled, { css } from 'styled-components';

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon, MenuIcon } from '@/shared/assets/icons';

import { Link } from '../link';

interface MenuContextProps {
  isBurger?: boolean;
  onClose?: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

const MenuList = styled.nav<{ $isBurger?: boolean; $isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;

  ${({ $isBurger, $isOpen, theme }) =>
    $isBurger &&
    css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 280px;
      background-color: ${theme.colors.bgContainer};
      flex-direction: column;
      padding: ${theme.spacing[10]} ${theme.spacing[6]};
      box-shadow: ${theme.shadows.primary};
      z-index: 1001;
      transform: translateX(${$isOpen ? '0' : '100%'});
      transition: transform 0.3s ease-in-out;
      align-items: flex-start;
      gap: ${theme.spacing[2]};
    `}
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  backdrop-filter: blur(2px);
`;

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textBase};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuItem = styled(Link)<{ $active?: boolean; $isBurger?: boolean }>`
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textBase};
  position: relative;
  padding: ${({ theme, $isBurger }) =>
    $isBurger
      ? `${theme.spacing[3]} ${theme.spacing[4]}`
      : theme.spacing[2] + ' 0'};
  text-decoration: none !important;
  width: ${({ $isBurger }) => ($isBurger ? '100%' : 'auto')};
  border-radius: ${({ theme, $isBurger }) =>
    $isBurger ? theme.spacing[2] : '0'};
  background-color: ${({ theme, $active, $isBurger }) =>
    $active && $isBurger ? `${theme.colors.primary}1a` : 'transparent'};

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
    display: ${({ $isBurger }) => ($isBurger ? 'none' : 'block')};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  ${({ $isBurger, theme }) =>
    $isBurger &&
    css`
      &:hover {
        background-color: ${theme.colors.bgBase};
      }
    `}
`;

interface MenuProps {
  children: ReactNode;
  isBurger?: boolean;
  isMobile?: boolean;
}

const Menu = ({ children, isBurger: isBurgerProp, isMobile }: MenuProps) => {
  const isBurger = isBurgerProp ?? isMobile;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isBurger && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurger, isOpen]);

  if (isBurger) {
    return (
      <MenuContext.Provider value={{ isBurger, onClose: closeMenu }}>
        <BurgerButton onClick={toggleMenu} aria-label="Open menu">
          <MenuIcon />
        </BurgerButton>
        {createPortal(
          <>
            <Overlay $isOpen={isOpen} onClick={closeMenu} />
            <MenuList $isBurger={isBurger} $isOpen={isOpen}>
              <BurgerButton
                onClick={toggleMenu}
                aria-label="Close menu"
                style={{ position: 'absolute', top: '16px', right: '16px' }}
              >
                <CloseIcon />
              </BurgerButton>
              {children}
            </MenuList>
          </>,
          document.body,
        )}
      </MenuContext.Provider>
    );
  }

  return (
    <MenuContext.Provider value={{ isBurger }}>
      <MenuList $isBurger={isBurger} $isOpen={isOpen}>
        {children}
      </MenuList>
    </MenuContext.Provider>
  );
};

interface ItemProps {
  children: ReactNode;
  to: string;
  $active?: boolean;
}

const Item = ({ children, to, $active }: ItemProps) => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu.Item must be used within a Menu component');
  }

  return (
    <MenuItem
      to={to}
      $active={$active}
      $isBurger={context.isBurger}
      onClick={context.onClose}
    >
      {children}
    </MenuItem>
  );
};

Menu.Item = Item;

export { Menu };
