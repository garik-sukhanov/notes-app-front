import { useQuery } from '@tanstack/react-query';

import { userService } from '@/shared/services/user.service';
import type { GetUsersResponseDto } from '@/shared/types/dto';

export const useGetUsersQuery = () => {
  return useQuery<{ data: GetUsersResponseDto }, Error, GetUsersResponseDto>({
    queryKey: ['users'],
    queryFn: () => {
      return userService.getAll();
    },
    select: (data) => data.data,
  });
};
