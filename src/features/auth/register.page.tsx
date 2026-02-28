import { ChangeThemeButton } from '@/shared/components';
import {
  RegisterForm,
  type RegisterFormValues,
} from '@/shared/components/forms';
import {
  Card,
  CardTitle,
  Flex,
  Link,
  Typography,
} from '@/shared/components/ui';
import { useRegisterMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';

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
      <Flex $align="top" $justify="space-between">
        <CardTitle>Регистрация</CardTitle>
        <ChangeThemeButton />
      </Flex>
      <RegisterForm onFinish={onSubmit} id="register-form" />
      <Typography $variant="body">
        Уже зарегистрированы?{' '}
        <Link to={ROUTES.LOGIN}>Войдите&nbsp;в&nbsp;аккаунт</Link>
      </Typography>
    </Card>
  );
}

export const Component = RegisterPage;
