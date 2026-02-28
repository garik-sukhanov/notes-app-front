import { Modal } from '@/shared/components/ui';
import { useCreateNoteMutation } from '@/shared/hooks';
import type { NoteType } from '@/shared/types';

import { NoteForm } from '../../forms';

export interface CreateNoteModalProps {
  open?: boolean;
  onCancel?: () => void;
}

export const CreateNoteModal = ({ open, onCancel }: CreateNoteModalProps) => {
  const { mutate } = useCreateNoteMutation();

  const onFinish = (values: { title: string; description?: string }) =>
    mutate(values as NoteType, {
      onSuccess: () => {
        onCancel?.();
      },
    });

  return (
    <Modal
      title="Создать заметку"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <NoteForm onFinish={onFinish} />
    </Modal>
  );
};
