import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/helpers';
import { Component as UsersPage } from './users.page';

vi.mock('@/shared/hooks', () => ({
  useGetUsersQuery: vi.fn().mockReturnValue({
    data: {
      pagination: {
        total: 2,
        page: 1,
      },
      data: [
        {
          id: 'd73e7180-2e02-4ab1-8c91-e20ffbc81cdc',
          username: 'user1',
          email: 'user1@user.ru',
          roles: ['user', 'loser', 'veryLongRole'],
        },
        {
          id: 'd73e7180-2e02-4ab1-8c91-e20ffbc81cdc',
          username: 'user2',
          email: 'user2@user.ru',
          roles: ['user'],
        },
      ],
    },
    isLoading: false,
  }),
}));

describe('UsersPage', () => {
  it('renders correctly', () => {
    render(renderWithTheme(<UsersPage />));
    expect(screen.getByText('Список пользователей')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('loser'.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText('veryLongRole'.toUpperCase())).toBeInTheDocument();
  });
});
