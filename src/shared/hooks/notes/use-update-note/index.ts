import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { NoteType } from '@/shared/types';

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteType) => {
      return noteService.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
