import { useSession } from "@/shared/model/session";
import { authService } from "@/shared/services";
import type { RegisterDto } from "@/shared/types/dto";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const { login } = useSession();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: (data) => {
      login(data.data.accessToken);
    },
    onError: (error) => {
      console.log('ошибка регистрации', error);
    },
  });
};