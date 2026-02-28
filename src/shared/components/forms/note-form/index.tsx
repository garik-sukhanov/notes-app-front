import { Button, Form, type FormProps, Input } from 'antd';

export type NoteFormProps = FormProps;

export const NoteForm = (props: NoteFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form} {...props}>
      <Form.Item label="Заголовок" name="title">
        <Input required />
      </Form.Item>
      <Form.Item label="Подробности" name="description">
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
