import { Page, Table, Tag } from '@/shared/components/ui';
import { useGetUsersQuery } from '@/shared/hooks';
import type { UserType } from '@/shared/types';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email' as const,
    key: 'email',
  },
  {
    title: 'Username',
    dataIndex: 'username' as const,
    key: 'username',
  },
  {
    title: 'Roles',
    key: 'roles',
    render: (_: unknown, { roles }: UserType) => (
      <>
        {roles.map((tag) => {
          let color: 'success' | 'warning' | 'error' | 'info' = 'info';
          if (tag === 'loser') {
            color = 'error';
          } else if (tag.length > 5) {
            color = 'warning';
          } else {
            color = 'success';
          }
          return (
            <Tag $color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

function UsersPage() {
  const { data, isLoading } = useGetUsersQuery();

  return (
    <Page title="Список пользователей">
      <Table
        dataSource={data?.data}
        columns={columns}
        loading={isLoading}
        rowKey={(record) => record.id}
      />
    </Page>
  );
}

export const Component = UsersPage;
