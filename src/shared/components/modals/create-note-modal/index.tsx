import { Modal, type ModalProps } from 'antd';

import { useCreateNoteMutation } from '@/shared/hooks';

import { NoteForm } from '../../forms';

export type CreateNoteModalProps = ModalProps;

export const CreateNoteModal = (props: CreateNoteModalProps) => {
  const { mutate } = useCreateNoteMutation();

  return (
    <Modal title="Создать заметку" footer={null} {...props}>
      <NoteForm onFinish={mutate} />
    </Modal>
  );
};
