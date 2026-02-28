import { z } from 'zod';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input, InputWrapper, Label, ErrorText } from '@/shared/components/ui';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const registerSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    username: z.string().min(3, 'Минимум 3 символа'),
    password: z.string().min(8, 'Не менее 8 символов'),
    confirmPassword: z.string().min(1, 'Пожалуйста, подтвердите пароль!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают!',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onFinish?: (values: RegisterFormValues) => void;
  id?: string;
}

export const RegisterForm = ({ onFinish, id }: RegisterFormProps) => {
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

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Email</Label>
            <Input 
              {...field} 
              type="email"
              $error={!!errors.email} 
              $fullWidth 
              placeholder="m@example.com" 
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Username</Label>
            <Input 
              {...field} 
              type="text"
              $error={!!errors.username} 
              $fullWidth 
              placeholder="John Dow" 
            />
            {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Пароль</Label>
            <Input 
              {...field} 
              type="password"
              $error={!!errors.password} 
              $fullWidth 
            />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Подтвердите пароль</Label>
            <Input 
              {...field} 
              type="password"
              $error={!!errors.confirmPassword} 
              $fullWidth 
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Button
        type="submit"
        $variant="primary"
        $size="large"
        $fullWidth
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};
