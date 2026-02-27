import { useQuery } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { GetNotesResponseDto } from '@/shared/types/dto';

export const useGetAllNotesQuery = () => {
  return useQuery<{ data: GetNotesResponseDto }, Error, GetNotesResponseDto>({
    queryKey: ['notes'],
    queryFn: () => noteService.getAll(),
    select: (data) => data.data,
  });
};
