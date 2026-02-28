import styled from 'styled-components';

import { Card, Empty } from 'antd';
import { useMemo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import type { NoteType } from '@/shared/types';
import { getSkeletonData } from '@/shared/utils/getSkeletonData';
import { Trigger } from '@/shared/ui';
import { UpdateNoteModal } from '@/shared/components';
import { useDeleteNoteMutation } from '@/shared/hooks/notes/use-delete-note';

interface NotesListProps {
  notes?: NoteType[];
  isLoading: boolean;
}

export const NotesList = ({ notes, isLoading }: NotesListProps) => {
  const { mutate: deleteNote } = useDeleteNoteMutation();

  const notesList: NoteType[] = useMemo(
    () =>
      notes ??
      getSkeletonData<Omit<NoteType, 'id'>>(8, { title: '', description: '' }),
    [notes],
  );

  if (notes?.length === 0 && !isLoading) {
    return <Empty description={'У вас пока нет заметок'} />;
  }

  return (
    <NotesGrid>
      {notesList.map(({ title, description, id }) => (
        <NoteCard
          loading={isLoading}
          actions={
            isLoading
              ? undefined
              : [
                  <Trigger
                    key={`edit-${id}`}
                    modal={
                      <UpdateNoteModal
                        noteValues={{ id, title, description }}
                      />
                    }
                  >
                    <EditOutlined />
                  </Trigger>,
                  <DeleteOutlined
                    key={`delete-${id}`}
                    onClick={() => deleteNote(id)}
                  />,
                ]
          }
          key={id}
        >
          <Card.Meta title={title} description={description} />
        </NoteCard>
      ))}
    </NotesGrid>
  );
};

const NotesGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-flow: dense;
`;

const NoteCard = styled(Card)`
  width: 300px;
  height: fit-content;
`;
