import { Card, Flex, Typography } from 'antd';

import {
  RegisterForm,
  type RegisterFormValues,
} from '@/shared/components/forms';
import { useRegisterMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit';

function RegisterPage() {
  const { mutate } = useRegisterMutation();

  const onSubmit = (data: RegisterFormValues) => {
    const dto = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    mutate(dto);
  };

  return (
    <Card title="Регистрация">
      <Flex vertical gap={20}>
        <RegisterForm onFinish={onSubmit} id="register-form" />
        <Typography>
          Уже зарегистрированы?
          <Button type="link" href={ROUTES.LOGIN}>
            Войдите в аккаунт
          </Button>
        </Typography>
      </Flex>
    </Card>
  );
}

export const Component = RegisterPage;
