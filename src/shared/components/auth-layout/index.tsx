import { styled } from 'styled-components';

import { Outlet } from 'react-router-dom';

import { TOKENS } from '@/shared/tokens';

export function AuthLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: ${TOKENS.bgPatterns.primary};
`;
