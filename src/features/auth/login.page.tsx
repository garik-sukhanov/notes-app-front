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
        onFinish={() => {
          void handleSubmit(onSubmit)();
        }}
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
            <Flex vertical align="flex-start">
              <Typography>
                Нет аккаунта?
                <Button type="link" href={ROUTES.REGISTER}>
                  зарегистрироваться
                </Button>
              </Typography>
              <Typography>
                Забыли пароль?
                <Button type="link" href={ROUTES.REGISTER}>
                  восстановить
                </Button>
              </Typography>
            </Flex>
          }
        >
          <Button
            htmlType="submit"
            variant="filled"
            form="login-form"
            type="primary"
            size="large"
            block
          >
            Войти
          </Button>
        </Card>
      </Form>
    </Card>
  );
}

export const Component = LoginPage;
