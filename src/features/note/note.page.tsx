import { Breadcrumb, Divider } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { Page } from '@/shared/components';
import { ROUTES } from '@/shared/model/routes';

function NotePage() {
  const { spaceId } = useParams();

  return (
    <Page title={`Пространство ${spaceId}`}>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.NOTES} title="Items">
                Все Заметки
              </Link>
            ),
          },
          {
            title: spaceId,
          },
        ]}
      />
      <Divider />
    </Page>
  );
}

export const Component = NotePage;
