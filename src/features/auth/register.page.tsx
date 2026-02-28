import {
  RegisterForm,
  type RegisterFormValues,
} from '@/shared/components/forms';
import { useRegisterMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Card, CardTitle, Typography, Link } from '@/shared/components/ui';

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
    <Card>
      <CardTitle>Регистрация</CardTitle>
      <RegisterForm onFinish={onSubmit} id="register-form" />
      <Typography $variant="body">
        Уже зарегистрированы?{' '}
        <Link to={ROUTES.LOGIN}>
          Войдите в аккаунт
        </Link>
      </Typography>
    </Card>
  );
}

export const Component = RegisterPage;
