import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { useNotification } from '@/shared/context';
import { useSession } from '@/shared/model/session';
import { authService } from '@/shared/services';
import type { RegisterDto } from '@/shared/types/dto';

export const useRegisterMutation = () => {
  const { login } = useSession();
  const { error: notifyError } = useNotification();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: (data) => {
      login(data.data.accessToken);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const isConflict = error.status === 409;
        const message = isConflict
          ? 'Пользователь с таким email уже существует'
          : `Ошибка сервера`;
        notifyError(message);
      }
      console.log('ошибка авторизации', error);
    },
  });
};
