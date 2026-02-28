import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { GetNotesResponseDto } from '@/shared/types/dto';

export const useGetAllNotesQuery = (): UseQueryResult<
  GetNotesResponseDto,
  Error
> => {
  return useQuery<GetNotesResponseDto, Error>({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await noteService.getAll();
      return res.data;
    },
  });
};
