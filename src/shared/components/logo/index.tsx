import styled from 'styled-components';

import { Typography } from 'antd';
import { Link } from 'react-router-dom';

interface LogoProps {
  compact?: boolean;
}
export const Logo = ({ compact = false }: LogoProps) => {
  return (
    <StyledLogoWrap to="/">
      👾
      <StyledTitle
        level={1}
        className="logo-title"
        visible={!compact ? 'true' : 'false'}
      >
        {' '}
        BAS
      </StyledTitle>
    </StyledLogoWrap>
  );
};

const StyledLogoWrap = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  cursor: pointer;
`;

const StyledTitle = styled(Typography.Title)<{ visible: string }>`
  font-size: 24px !important;
  font-weight: bold;
  margin: 0 !important;
  word-break: keep-all;
  opacity: ${({ visible }) => (visible === 'true' ? 1 : 0)};
  width: ${({ visible }) => (visible === 'true' ? '100%' : '0')};
  transition:
    opacity 0.3s ease-in-out,
    width 0.3s normal;
`;
