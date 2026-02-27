import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { renderWithRouter } from '@/shared/helpers';

import { Component as NotesPage } from './notes.page';

vi.mock('@/shared/hooks', () => ({
  useGetAllNotesQuery: vi.fn().mockReturnValue({
    data: {
      pagination: {
        total: 2,
        page: 1,
      },
      data: [
        {
          id: 'd73e7180-2e02-4ab1-8c91-e20ffbc81cdc',
          name: 'First',
          address: 'planet Saturn',
        },
      ],
    },
    isLoading: false,
  }),
}));

vi.mock('@/shared/components', () => ({
  Page: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
  CreateNoteModal: () => <div>CreateNoteModal</div>,
}));

vi.mock('@/shared/ui', () => ({
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('NotesPage', () => {
  it('renders correctly with notes list', () => {
    render(renderWithRouter(<NotesPage />));

    expect(screen.getByText('Список заметок')).toBeInTheDocument();
    expect(screen.getByText('Создать заметку')).toBeInTheDocument();

    // Check for table content (First note)
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('planet Saturn')).toBeInTheDocument();
    expect(screen.getByText('Перейти')).toBeInTheDocument();
  });
});
