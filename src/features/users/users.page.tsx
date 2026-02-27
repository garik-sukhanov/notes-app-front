import { Table, Tag } from 'antd';
import type { TableProps } from 'antd/es/table';

import { Page } from '@/shared/components';
import { useGetUsersQuery } from '@/shared/hooks';
import type { UserType } from '@/shared/types';

const columns: TableProps<UserType>['columns'] = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 100,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  },
  {
    title: 'roles',
    dataIndex: 'roles',
    key: 'roles',
    width: 100,
    render: (_, { roles }) => (
      <>
        {roles.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
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
        pagination={{
          total: data?.pagination.total,
          current: data?.pagination.page,
          pageSize: data?.pagination.size,
        }}
      />
    </Page>
  );
}

export const Component = UsersPage;
