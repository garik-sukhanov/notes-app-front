import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export { Link };
