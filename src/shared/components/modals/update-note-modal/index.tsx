import { useUpdateNoteMutation } from '@/shared/hooks/notes/use-update-note';
import type { NoteType } from '@/shared/types';
import { NoteForm } from '../../forms';
import { Modal } from '@/shared/components/ui';

export interface UpdateNoteModalProps {
  noteValues: NoteType;
  open?: boolean;
  onCancel?: () => void;
}

export const UpdateNoteModal = ({
  noteValues,
  open,
  onCancel,
}: UpdateNoteModalProps) => {
  const { mutate } = useUpdateNoteMutation();

  const onFinish = (values: { title: string; description?: string }) =>
    mutate(
      { ...values, id: noteValues.id } as NoteType,
      {
        onSuccess: () => {
          onCancel?.();
        },
      },
    );

  return (
    <Modal title="Изменить заметку" open={open} onCancel={onCancel} footer={null}>
      <NoteForm onFinish={onFinish} initialValues={noteValues} />
    </Modal>
  );
};
