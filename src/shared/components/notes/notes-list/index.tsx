import styled from 'styled-components';

import { Card, Empty } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import type { NoteType } from '@/shared/types';
import { getSkeletonData } from '@/shared/utils/getSkeletonData';

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <DeleteOutlined key="ellipsis" />,
];

interface NotesListProps {
  notes?: NoteType[];
  isLoading: boolean;
}

export const NotesList = ({ notes, isLoading }: NotesListProps) => {
  const notesList: NoteType[] =
    notes ??
    getSkeletonData<Omit<NoteType, 'id'>>(8, { title: '', description: '' });

  if (notes?.length === 0 && !isLoading) {
    return <Empty description={'У вас пока нет заметок'} />;
  }

  return (
    <NotesGrid>
      {notesList.map(({ title, description, id }) => (
        <NoteCard loading={isLoading} actions={actions} key={id}>
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
