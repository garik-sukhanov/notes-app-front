import styled from 'styled-components';

import { ChangeThemeButton, LogoutButton } from '../buttons';
import { Logo } from '../logo';
import { Menu } from '../menu';

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo compact />
      <Menu />
      <ChangeThemeButton />
      <LogoutButton />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid gray;
  display: grid;
  grid-template-columns: 2em 1fr 4em 5em;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
`;
