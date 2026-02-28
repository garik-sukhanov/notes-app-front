import { useState } from 'react';

import { CreateNoteModal } from '@/shared/components';
import { NotesList } from '@/shared/components/notes';
import { Button, Page, Pagination } from '@/shared/components/ui';
import { useGetAllNotesQuery } from '@/shared/hooks';
import { Trigger } from '@/shared/ui';

function NotesPage() {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading, isFetching } = useGetAllNotesQuery({ page, size });


  return (
    <Page
      title="Список заметок"
      slotHeaderRight={
        <Trigger modal={<CreateNoteModal />}>
          <Button $variant="primary">Создать заметку</Button>
        </Trigger>
      }
      slotPagination={
        data && (
          <Pagination
            pageSize={data.pagination.size}
            current={data.pagination.page}
            total={data.pagination.total}
            onChange={(p) => setPage(p)}
          />
        )
      }
    >
      <NotesList notes={data?.data} isLoading={isLoading || isFetching} />

    </Page>
  );
}

export const Component = NotesPage;
