import { useParams } from 'react-router-dom';

import { Page } from '@/shared/components';

function NotePage() {
  const { spaceId } = useParams();

  return (
    <Page title="Заметка">
      <div>Space: {spaceId}</div>
    </Page>
  );
}

export const Component = NotePage;
