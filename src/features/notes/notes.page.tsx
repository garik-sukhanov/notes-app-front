import { Button, Pagination } from 'antd';
import { useState } from 'react';

import { CreateNoteModal, Page } from '@/shared/components';
import { NotesList } from '@/shared/components/notes';
import { useGetAllNotesQuery } from '@/shared/hooks';
import { Trigger } from '@/shared/ui';

function NotesPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);
  const { data, isLoading } = useGetAllNotesQuery({ page, size });

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
          onChange={(p, s) => {
            setPage(p);
            setSize(s);
          }}
          onShowSizeChange={(p, s) => {
            setPage(p);
            setSize(s);
          }}
        />
      }
    >
      <NotesList notes={data?.data} isLoading={isLoading} />
    </Page>
  );
}

export const Component = NotesPage;
