import { Button, Pagination } from 'antd';

import { CreateNoteModal, Page } from '@/shared/components';
import { NotesList } from '@/shared/components/notes';
import { useGetAllNotesQuery } from '@/shared/hooks';
import { Trigger } from '@/shared/ui';

function NotesPage() {
  const { data, isLoading } = useGetAllNotesQuery();

  return (
    <Page
      title="Список заметок"
      slotHeaderRight={
        <Trigger modal={<CreateNoteModal />}>
          <Button>Создать заметку</Button>
        </Trigger>
      }
      slotPagination={
        <Pagination
          pageSize={data?.pagination.size}
          current={data?.pagination?.page}
          total={data?.pagination?.total}
        />
      }
    >
      <NotesList notes={data?.data} isLoading={isLoading} />
    </Page>
  );
}

export const Component = NotesPage;
