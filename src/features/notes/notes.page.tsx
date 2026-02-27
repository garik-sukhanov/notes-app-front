import { Avatar, Button, Card, Spin } from 'antd';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { CreateNoteModal, Page } from '@/shared/components';
import { useGetAllNotesQuery } from '@/shared/hooks';
import { Trigger } from '@/shared/ui';

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

function NotesPage() {
  const { data, isLoading } = useGetAllNotesQuery();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Page
      title="Список заметок"
      renderTopRight={
        <Trigger modal={<CreateNoteModal />}>
          <Button>Создать заметку</Button>
        </Trigger>
      }
    >
      {data?.data.map(({ title, description }) => (
        <Card loading={false} actions={actions} style={{ minWidth: 300 }}>
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            }
            title={title}
            description={
              <>
                <p>{description}</p>
              </>
            }
          />
        </Card>
      ))}
    </Page>
  );
}

export const Component = NotesPage;
