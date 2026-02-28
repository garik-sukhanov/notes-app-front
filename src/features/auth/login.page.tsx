import { LoginForm, type LoginFormValues } from '@/shared/components/forms';
import { useLoginMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Card, CardTitle, Typography, Link } from '@/shared/components/ui';

function LoginPage() {
  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => mutate(data);

  return (
    <Card>
      <CardTitle>Вход в аккаунт</CardTitle>
      <LoginForm onFinish={onSubmit} id="login-form" />
      <Typography $variant="body">
        Нет аккаунта?{' '}
        <Link to={ROUTES.REGISTER}>
          зарегистрироваться
        </Link>
      </Typography>
    </Card>
  );
}

export const Component = LoginPage;
