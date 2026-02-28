import { z } from 'zod';

import { Card, Flex, Form, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input } from '@/shared/ui/kit';

const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(8, 'Не менее 8 символов'),
});

type LoginForm = z.infer<typeof loginSchema>;

const defaultValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate } = useLoginMutation();

  const onSubmit = (data: LoginForm) => mutate(data);

  return (
    <Card title="Вход в аккаунт" className="w-full max-w-sm">
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        id="login-form"
        initialValues={defaultValues}
        validateTrigger="onChange"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Email"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Input {...field} size="large" placeholder="m@example.com" />
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Пароль"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Input type={'password'} {...field} size="large" />
            </Form.Item>
          )}
        />
        <Card
          size="small"
          extra={
            <Button type="link" href="#">
              Забыли пароль?
            </Button>
          }
        >
          <Flex vertical gap="small" style={{ width: '100%' }}>
            <Button
              htmlType="submit"
              variant="filled"
              form="login-form"
              type="primary"
              size="large"
            >
              Войти
            </Button>
          </Flex>
        </Card>
        <Typography>
          Если нет аккаунта, вы можете
          <Button type="link" href={ROUTES.REGISTER}>
            зарегистрироваться
          </Button>
        </Typography>
      </Form>
    </Card>
  );
}

export const Component = LoginPage;
