import { Input as AntInput, type InputProps as AntInputProps } from 'antd';

type InputProps = AntInputProps;

function Input(props: InputProps) {
  return <AntInput {...props} />;
}

export { Input };
