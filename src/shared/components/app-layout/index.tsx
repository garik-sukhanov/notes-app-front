import styled from 'styled-components';

import { Layout } from 'antd';
import { type ReactNode } from 'react';

import { useIsFetching } from '@tanstack/react-query';

import { Header } from '../header';
import { LoadLine } from '../ui';

const { Content } = Layout;

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const isFetching = useIsFetching();

  return (
    <OutsideLayout>
      <LoadLine isLoading={!!isFetching} />
      <Header />
      <StyledContent>{children}</StyledContent>
    </OutsideLayout>
  );
};

const OutsideLayout = styled(Layout)`
  min-height: 100dvh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled(Content)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;
