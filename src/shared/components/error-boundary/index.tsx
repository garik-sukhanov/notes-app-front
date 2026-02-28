import { Result, Space, Typography } from 'antd';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

interface ErrorBoundaryState {
  hasError: boolean;
  error: string | null;
  info: ErrorInfo | null;
}

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
        <Space direction="vertical" style={{ backgroundColor: '#fff' }}>
          <Result
            status="500"
            title="500"
            subTitle={<Title level={2}>Sorry, something went wrong.</Title>}
            extra={<Link to="/">Back Home</Link>}
          />
          <Space
            direction="vertical"
            style={{ padding: 20, height: '100dvh', overflowY: 'auto' }}
          >
            <Title level={3}>{error ?? 'Unknown error'}</Title>
            <Text>{info?.componentStack ?? 'Unknown component stack'}</Text>
          </Space>
        </Space>
      );
    }

    return this.props.children;
  }
}
