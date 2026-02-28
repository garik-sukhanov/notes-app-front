import { z } from 'zod';

import { Card, Form, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRegisterMutation } from '@/shared/hooks';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input } from '@/shared/ui/kit';

const registerSchema = z
  .object({
    email: z.email('Некорректный email'),
    username: z.string().min(3, 'Минимум 3 символа'),
    password: z.string().min(8, 'Не менее 8 символов'),
    confirmPassword: z.string().min(1, 'Пожалуйста, подтвердите пароль!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают!',
    path: ['confirmPassword'],
  });

type RegisterFormType = z.infer<typeof registerSchema>;

const defaultValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

function RegisterPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const { mutate } = useRegisterMutation();

  const onSubmit = (data: RegisterFormType) => {
    const dto = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    mutate(dto);
  };

  return (
    <Card title="Регистрация">
      <Form
        id="register-form"
        onFinish={() => {
          void handleSubmit(onSubmit)();
        }}
        layout="vertical"
        initialValues={defaultValues}
        autoComplete="off"
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
              <Input
                {...field}
                size="large"
                type="email"
                placeholder="m@example.com"
              />
            </Form.Item>
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Username"
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username?.message}
            >
              <Input
                {...field}
                size="large"
                type="text"
                placeholder="John Dow"
              />
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
              <Input {...field} size="large" type="password" />
            </Form.Item>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Подтвердите пароль"
              validateStatus={errors.confirmPassword ? 'error' : ''}
              help={errors.confirmPassword?.message}
            >
              <Input {...field} size="large" type="password" />
            </Form.Item>
          )}
        />
        <Card
          extra={
            <Typography>
              Уже зарегистрированы?{' '}
              <Button type="link" href={ROUTES.LOGIN}>
                Войдите в аккаунт
              </Button>
            </Typography>
          }
        >
          <Button
            type="primary"
            size="large"
            form="register-form"
            htmlType="submit"
            block
          >
            Зарегистрироваться
          </Button>
        </Card>
      </Form>
    </Card>
  );
}

export const Component = RegisterPage;
