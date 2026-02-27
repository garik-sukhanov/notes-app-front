import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export type ButtonProps = AntButtonProps;

function Button(props: ButtonProps) {
  return <AntButton {...props} />;
}

export { Button };
