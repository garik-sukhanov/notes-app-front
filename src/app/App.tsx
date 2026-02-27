import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/components/error-boundary';

export default function App() {
  return (
    <div>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
