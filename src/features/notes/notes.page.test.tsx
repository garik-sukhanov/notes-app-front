import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { renderWithRouter } from '@/shared/helpers';

import { Component as NotesPage } from './notes.page';

vi.mock('@/shared/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useGetAllNotesQuery: vi.fn().mockReturnValue({
      data: {
        pagination: {
          total: 2,
          page: 1,
        },
        data: [
          {
            id: 'd73e7180-2e02-4ab1-8c91-e20ffbc81cdc',
            title: 'First',
            description: 'planet Saturn',
          },
        ],
      },
      isLoading: false,
    }),
  };
});

vi.mock('@/shared/components', () => ({
  Page: ({
    title,
    children,
    slotHeaderRight,
  }: {
    title: string;
    children: React.ReactNode;
    slotHeaderRight?: React.ReactNode;
  }) => (
    <div>
      <h1>{title}</h1>
      {slotHeaderRight}
      {children}
    </div>
  ),
  CreateNoteModal: () => <div>CreateNoteModal</div>,
  UpdateNoteModal: () => <div>UpdateNoteModal</div>,
}));

vi.mock('@/shared/ui', () => ({
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/hooks/notes/use-delete-note', () => ({
  useDeleteNoteMutation: vi.fn().mockReturnValue({
    mutate: vi.fn(),
  }),
}));

describe('NotesPage', () => {
  it('renders correctly with notes list', () => {
    render(renderWithRouter(<NotesPage />));

    expect(screen.getByText('Список заметок')).toBeInTheDocument();
    expect(screen.getByText('Создать заметку')).toBeInTheDocument();

    // Check for table content (First note)
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('planet Saturn')).toBeInTheDocument();
  });
});
