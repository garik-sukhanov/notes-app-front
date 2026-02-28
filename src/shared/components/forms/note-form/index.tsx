import { z } from 'zod';

import { Button, Form, type FormProps, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

const noteSchema = z.object({
  title: z.string().min(1, 'Введите заголовок'),
  description: z.string().optional(),
});

type NoteFormType = z.infer<typeof noteSchema>;

export type NoteFormProps = Omit<FormProps, 'onFinish' | 'initialValues'> & {
  onFinish?: (values: NoteFormType) => void;
  initialValues?: Partial<NoteFormType>;
};

export const NoteForm = ({
  onFinish,
  initialValues,
  ...props
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

  const handleFormFinish: FormProps['onFinish'] = handleSubmit(onSubmit);

  return (
    <Form
      layout="vertical"
      onFinish={handleFormFinish}
      validateTrigger="onChange"
      {...props}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Заголовок"
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title?.message}
            required
          >
            <Input {...field} />
          </Form.Item>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Подробности"
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description?.message}
          >
            <Input.TextArea {...field} rows={6} />
          </Form.Item>
        )}
      />
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
