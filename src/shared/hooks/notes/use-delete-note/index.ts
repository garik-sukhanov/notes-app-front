import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '@/shared/context';
import { noteService } from '@/shared/services';
import type { NoteType } from '@/shared/types';

export const useDeleteNoteMutation = () => {
  const { error: notifyError } = useNotification();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NoteType['id']) => {
      return noteService.delete(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      notifyError(`Ошибка удаления заметки`);
      console.error(error);
    },
  });
};
