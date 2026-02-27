import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { Component as NotePage } from './note.page';

describe('NotePage', () => {
  const spaceId = 'mock note id';
  it('renders correctly with spaceId', () => {
    render(
      <MemoryRouter initialEntries={[`/note/${spaceId}`]}>
        <Routes>
          <Route path="/note/:spaceId" element={<NotePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Пространство/i)).toBeInTheDocument();
    expect(screen.getByText(/Все Заметки/i)).toBeInTheDocument();
  });
});
