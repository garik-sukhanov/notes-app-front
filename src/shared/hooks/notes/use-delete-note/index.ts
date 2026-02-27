import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { NoteType } from '@/shared/types';

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NoteType['id']) => {
      return noteService.delete(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
