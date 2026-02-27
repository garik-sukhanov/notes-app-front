import { App } from 'antd';

import { useMutation } from '@tanstack/react-query';

import { useSession } from '@/shared/model/session';
import { authService } from '@/shared/services';
import type { LoginDto } from '@/shared/types/dto';

export const useLoginMutation = () => {
  const { login } = useSession();
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: (data) => {
      notification.success({
        message: 'Успешная авторизация',
      });
      login(data.data.accessToken);
    },
    onError: (error) => {
      notification.error({
        message: 'Ошибка авторизации',
      });
      console.log('ошибка авторизации', error);
    },
  });
};
