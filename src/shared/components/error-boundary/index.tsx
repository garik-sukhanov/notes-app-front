import styled from 'styled-components';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Card, Flex, Link, Typography } from '@/shared/components/ui';

interface ErrorBoundaryState {
  hasError: boolean;
  error: string | null;
  info: ErrorInfo | null;
}

const ErrorContainer = styled(Flex)`
  min-height: 100dvh;
  padding: ${({ theme }) => theme.spacing[10]};
  background-color: ${({ theme }) => theme.colors.bgBase};
`;

const StackTrace = styled.pre`
  background-color: ${({ theme }) => theme.colors.bgContainer};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  overflow: auto;
  max-width: 100%;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textBase};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
    this.setState({ error: error.message, hasError: true, info });
  }

  render() {
    const { hasError, error, info } = this.state;

    if (hasError) {
      return (
        <ErrorContainer $vertical $align="center" $justify="center" $gap={6}>
          <Card style={{ maxWidth: '600px', width: '100%' }}>
            <Flex $vertical $gap={4}>
              <Typography $variant="h1" $align="center">
                500
              </Typography>
              <Typography $variant="h2" $align="center">
                Что-то пошло не так
              </Typography>

              <Typography $variant="body" $color="error">
                {error ?? 'Неизвестная ошибка'}
              </Typography>

              {info?.componentStack && (
                <StackTrace>{info.componentStack}</StackTrace>
              )}

              <Flex $justify="center" style={{ marginTop: '20px' }}>
                <Link to="/">Вернуться на главную</Link>
              </Flex>
            </Flex>
          </Card>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
