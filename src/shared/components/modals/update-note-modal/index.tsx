import { Modal, type ModalProps } from 'antd';
import type { MouseEvent } from 'react';

import { useUpdateNoteMutation } from '@/shared/hooks/notes/use-update-note';
import type { NoteType } from '@/shared/types';

import { NoteForm } from '../../forms';

export type UpdateNoteModalProps = ModalProps & {
  noteValues: NoteType;
};

export const UpdateNoteModal = ({
  noteValues,
  ...props
}: UpdateNoteModalProps) => {
  const { mutate } = useUpdateNoteMutation();

  const onFinish = (values: Omit<NoteType, 'id'>) =>
    mutate(
      { ...values, id: noteValues.id },
      {
        onSuccess: () => {
          props.onCancel?.(
            new MouseEvent('click') as unknown as MouseEvent<HTMLButtonElement>,
          );
        },
      },
    );

  return (
    <Modal title="Изменить заметку" footer={null} {...props}>
      <NoteForm onFinish={onFinish} initialValues={noteValues} />
    </Modal>
  );
};
