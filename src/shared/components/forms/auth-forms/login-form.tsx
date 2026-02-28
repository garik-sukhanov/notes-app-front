import { z } from 'zod';

import { Form, type FormProps } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input } from '@/shared/ui/kit';

const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(8, 'Не менее 8 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormProps = Omit<FormProps, 'onFinish'> & {
  onFinish?: (values: LoginFormValues) => void;
};

export const LoginForm = ({ onFinish, ...props }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormValues) => {
    onFinish?.(data);
  };

  const handleFormFinish: FormProps['onFinish'] = () => {
    void handleSubmit(onSubmit)();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleFormFinish}
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
      <Button
        htmlType="submit"
        variant="filled"
        type="primary"
        size="large"
        block
      >
        Войти
      </Button>
    </Form>
  );
};
