import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '@/shared/context';
import { noteService } from '@/shared/services';
import type { NoteType } from '@/shared/types';

export const useCreateNoteMutation = () => {
  const { error: notifyError } = useNotification();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<NoteType, 'id'>) => {
      return noteService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      notifyError(`Ошибка создания заметки`);
      console.error(error);
    },
  });
};
