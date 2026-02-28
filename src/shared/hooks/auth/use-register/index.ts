import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@/shared/context';
import { useSession } from '@/shared/model/session';
import { authService } from '@/shared/services';
import type { RegisterDto } from '@/shared/types/dto';

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const { error: notifyError, success } = useNotification();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: (data) => {
      success('Успешная регистрация');
      login(data.data.accessToken);
      navigate('/');
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

