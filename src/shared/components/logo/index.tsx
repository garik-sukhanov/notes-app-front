import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from '@/shared/components/ui';

interface LogoProps {
  compact?: boolean;
}
export const Logo = ({ compact = false }: LogoProps) => {
  return (
    <StyledLogoWrap to="/">
      👾
      <StyledTitle
        $variant="h2"
        $visible={!compact}
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
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textBase};
`;

const StyledTitle = styled(Typography)<{ $visible: boolean }>`
  font-size: 24px !important;
  font-weight: bold;
  margin: 0 !important;
  word-break: keep-all;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  width: ${({ $visible }) => ($visible ? '100%' : '0')};
  transition:
    opacity 0.3s ease-in-out,
    width 0.3s normal;
`;
