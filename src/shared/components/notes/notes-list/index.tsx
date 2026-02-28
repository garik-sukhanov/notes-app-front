import styled from 'styled-components';

import { Card, Empty } from 'antd';
import { useMemo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { UpdateNoteModal } from '@/shared/components';
import { useDeleteNoteMutation } from '@/shared/hooks/notes/use-delete-note';
import type { NoteType } from '@/shared/types';
import { Trigger } from '@/shared/ui';
import { getSkeletonData } from '@/shared/utils/getSkeletonData';

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense;
  grid-auto-rows: minmax(50px, auto);
  width: 100%;
  justify-items: stretch;
  margin: 0 auto;
  align-items: stretch;
`;

const NoteCard = styled(Card)`
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  height: fit-content;
  .ant-card-body {
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
