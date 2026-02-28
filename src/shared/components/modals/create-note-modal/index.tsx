import { Modal, type ModalProps } from 'antd';
import type { MouseEvent } from 'react';

import { useCreateNoteMutation } from '@/shared/hooks';
import type { NoteType } from '@/shared/types';

import { NoteForm } from '../../forms';

export type CreateNoteModalProps = ModalProps;

export const CreateNoteModal = (props: CreateNoteModalProps) => {
  const { mutate } = useCreateNoteMutation();

  const onFinish = (values: NoteType) =>
    mutate(values, {
      onSuccess: () => {
        props.onCancel?.(
          new MouseEvent('click') as unknown as MouseEvent<HTMLButtonElement>,
        );
      },
    });

  return (
    <Modal title="Создать заметку" footer={null} {...props}>
      <NoteForm onFinish={onFinish} />
    </Modal>
  );
};
