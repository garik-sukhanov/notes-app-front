import styled from 'styled-components';

import { useMemo } from 'react';

import { Typography } from '@/shared/components/ui';
import { useDeleteNoteMutation } from '@/shared/hooks/notes/use-delete-note';
import type { NoteType } from '@/shared/types';
import { getSkeletonData } from '@/shared/utils/getSkeletonData';

import { NoteCard } from './note-card';

interface NotesListProps {
  notes?: NoteType[];
  isLoading: boolean;
}

const EmptyDescription = styled(Typography)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`;

export const NotesList = ({ notes, isLoading }: NotesListProps) => {
  const { mutate: deleteNote } = useDeleteNoteMutation();

  const notesList: NoteType[] = useMemo(
    () =>
      notes ??
      getSkeletonData<Omit<NoteType, 'id'>>(8, { title: '', description: '' }),
    [notes],
  );

  if (notes?.length === 0 && !isLoading) {
    return (
      <EmptyDescription $variant="body">
        У вас пока нет заметок
      </EmptyDescription>
    );
  }

  return (
    <NotesGrid>
      {notesList.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isLoading={isLoading}
          onDelete={deleteNote}
        />
      ))}
    </NotesGrid>
  );
};

const NotesGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
  grid-auto-rows: minmax(150px, auto);
  width: 100%;
  justify-items: stretch;
  margin: 0 auto;
  align-items: stretch;
  perspective: 1000px;
`;
