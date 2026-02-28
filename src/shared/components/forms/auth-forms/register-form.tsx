import { z } from 'zod';

import { Form, type FormProps } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterFormProps = Omit<FormProps, 'onFinish'> & {
  onFinish?: (values: RegisterFormValues) => void;
};

export const RegisterForm = ({ onFinish, ...props }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    onFinish?.(data);
  };

  const handleFormFinish: FormProps['onFinish'] = () => {
    void handleSubmit(onSubmit)();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleFormFinish}
      autoComplete="off"
      validateTrigger="onChange"
      {...props}
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
            <Input {...field} size="large" type="text" placeholder="John Dow" />
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
      <Button type="primary" size="large" htmlType="submit" block>
        Зарегистрироваться
      </Button>
    </Form>
  );
};
