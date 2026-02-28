import styled from 'styled-components';
import { useMemo } from 'react';
import { UpdateNoteModal } from '@/shared/components';
import { useDeleteNoteMutation } from '@/shared/hooks/notes/use-delete-note';
import type { NoteType } from '@/shared/types';
import { Trigger } from '@/shared/ui';
import { getSkeletonData } from '@/shared/utils/getSkeletonData';
import { Card, CardTitle, Typography, Flex, Button } from '@/shared/components/ui';

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
    return <EmptyDescription $variant="body">У вас пока нет заметок</EmptyDescription>;
  }

  return (
    <NotesGrid>
      {notesList.map(({ title, description, id }) => (
        <NoteCard key={id}>
          <CardTitle>{title || 'Загрузка...'}</CardTitle>
          <Typography $variant="body">{description}</Typography>
          {!isLoading && (
            <Flex $gap={2} $justify="flex-end" style={{ marginTop: 'auto' }}>
              <Trigger
                modal={
                  <UpdateNoteModal
                    noteValues={{ id, title, description }}
                  />
                }
              >
                <Button $variant="secondary" $size="small">Изменить</Button>
              </Trigger>
              <Button 
                $variant="secondary" 
                $size="small" 
                onClick={() => deleteNote(id)}
              >
                Удалить
              </Button>
            </Flex>
          )}
        </NoteCard>
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
`;

const NoteCard = styled(Card)`
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
