import { Card, Flex, Typography } from 'antd';

import { LoginForm, type LoginFormValues } from '@/shared/components/forms';
import { useLoginMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit';

function LoginPage() {
  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <Card title="Вход в аккаунт">
      <Flex vertical gap={20}>
        <LoginForm onFinish={onSubmit} id="login-form" />
        <Typography>
          Нет аккаунта?
          <Button type="link" href={ROUTES.REGISTER}>
            зарегистрироваться
          </Button>
        </Typography>
      </Flex>
    </Card>
  );
}

export const Component = LoginPage;
