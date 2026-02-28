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

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Не менее 8 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onFinish?: (values: LoginFormValues) => void;
  id?: string;
}

export const LoginForm = ({ onFinish, id }: LoginFormProps) => {
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

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Email</Label>
            <Input 
              {...field} 
              $error={!!errors.email} 
              $fullWidth 
              placeholder="m@example.com" 
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
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
      <Button
        type="submit"
        $variant="primary"
        $size="large"
        $fullWidth
      >
        Войти
      </Button>
    </Form>
  );
};
