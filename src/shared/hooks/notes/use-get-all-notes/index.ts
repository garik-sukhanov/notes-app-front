import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { noteService } from '@/shared/services';
import type { GetNotesResponseDto } from '@/shared/types/dto';

export const useGetAllNotesQuery = (params?: {
  page?: number;
  size?: number;
}): UseQueryResult<GetNotesResponseDto, Error> => {
  const page = params?.page ?? 1;
  const size = params?.size ?? 10;

  return useQuery<GetNotesResponseDto, Error>({
    queryKey: ['notes', page, size],
    queryFn: async () => {
      const res = await noteService.getAll({ page, size });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
};
