import { ChangeThemeButton } from '@/shared/components';
import { LoginForm, type LoginFormValues } from '@/shared/components/forms';
import {
  Card,
  CardTitle,
  Flex,
  Link,
  Typography,
} from '@/shared/components/ui';
import { useLoginMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';

function LoginPage() {
  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <Card>
      <Flex $align="top" $justify="space-between">
        <CardTitle>Вход в аккаунт</CardTitle>
        <ChangeThemeButton />
      </Flex>

      <LoginForm onFinish={onSubmit} id="login-form" />
      <Typography $variant="body">
        Нет аккаунта? <Link to={ROUTES.REGISTER}>зарегистрироваться</Link>
      </Typography>
    </Card>
  );
}

export const Component = LoginPage;
