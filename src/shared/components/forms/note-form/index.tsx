import { z } from 'zod';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputWrapper, Label, ErrorText, TextArea } from '@/shared/components/ui';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const noteSchema = z.object({
  title: z.string().min(1, 'Введите заголовок'),
  description: z.string().optional(),
});

type NoteFormType = z.infer<typeof noteSchema>;

export interface NoteFormProps {
  onFinish?: (values: NoteFormType) => void;
  initialValues?: Partial<NoteFormType>;
  id?: string;
}

export const NoteForm = ({
  onFinish,
  initialValues,
  id,
}: NoteFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteSchema),
    values: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
    },
  });

  const onSubmit = (data: NoteFormType) => {
    onFinish?.(data);
  };

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Заголовок</Label>
            <Input 
              {...field} 
              $error={!!errors.title} 
              $fullWidth 
            />
            {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label>Подробности</Label>
            <TextArea 
              {...field} 
              $error={!!errors.description} 
              $fullWidth 
              rows={6}
            />
            {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
          </InputWrapper>
        )}
      />
      <Button type="submit" $variant="primary">
        Сохранить
      </Button>
    </Form>
  );
};
