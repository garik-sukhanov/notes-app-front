import styled from 'styled-components';

import { Spin } from 'antd';

export const RouteFallback = () => (
  <StyledRouteFallback>
    <Spin size="large" />
  </StyledRouteFallback>
);

const StyledRouteFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
