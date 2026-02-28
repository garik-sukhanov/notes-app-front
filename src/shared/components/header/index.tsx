import styled from 'styled-components';

import { BREAKPOINTS } from '@/shared/constants';
import { useMediaQuery } from '@/shared/hooks';

import { ChangeThemeButton, LogoutButton } from '../buttons';
import { Logo } from '../logo';
import { Menu } from '../menu';

export const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`);

  return (
    <HeaderWrapper $isMobile={isMobile}>
      <Logo compact />
      <Menu isMobile={isMobile} />
      {!isMobile && <ChangeThemeButton />}
      {!isMobile && <LogoutButton />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ $isMobile?: boolean }>`
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid gray;
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? 'auto 1fr' : '2em 1fr 4em 5em'};
  align-items: center;
  gap: 10px;
  padding: 8px 16px;

  & > :nth-child(2) {
    justify-self: ${({ $isMobile }) => ($isMobile ? 'end' : 'start')};
  }
`;
