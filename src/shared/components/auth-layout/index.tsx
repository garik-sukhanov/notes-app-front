import { styled } from 'styled-components';

import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeContext } from '@/shared/context';
import { TOKENS } from '@/shared/tokens';
import { ThemeVariants } from '@/shared/types/collections';

export function AuthLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper $theme={theme}>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $theme: ThemeVariants }>`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: ${({ $theme }) =>
    $theme === ThemeVariants.Dark
      ? TOKENS.bgPatterns.secondary
      : TOKENS.bgPatterns.primary};
`;
