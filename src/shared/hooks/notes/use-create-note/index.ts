import { App } from 'antd';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { NoteType } from '@/shared/types';

export const useCreateNoteMutation = () => {
  const { notification } = App.useApp();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<NoteType, 'id'>) => {
      return noteService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      notification.error({
        message: `Ошибка создания заметки`,
      });
      console.error(error);
    },
  });
};
