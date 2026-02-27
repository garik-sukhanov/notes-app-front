import { styled } from 'styled-components';

import type { ReactNode } from 'react';

import { TOKENS } from '@/shared/tokens';

export interface PageProps {
  children?: ReactNode;
  title?: string;
  renderTopRight?: ReactNode;
}

export const Page = ({ children, title, renderTopRight }: PageProps) => {
  return (
    <PageWrapper>
      <TopLine>
        <PageTitle>{title}</PageTitle>
        {renderTopRight}
      </TopLine>
      {children}
    </PageWrapper>
  );
};

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${TOKENS.spacing[5]};
`;

const PageWrapper = styled.div`
  height: 100%;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;
