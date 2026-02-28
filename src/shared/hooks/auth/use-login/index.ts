import { useMutation } from '@tanstack/react-query';

import { useNotification } from '@/shared/context';
import { useSession } from '@/shared/model/session';
import { authService } from '@/shared/services';
import type { LoginDto } from '@/shared/types/dto';

export const useLoginMutation = () => {
  const { login } = useSession();
  const { success, error: notifyError } = useNotification();

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: (data) => {
      success('Успешная авторизация');
      login(data.data.accessToken);
    },
    onError: (err) => {
      notifyError('Ошибка авторизации');
      console.log('ошибка авторизации', err);
    },
  });
};
