import { Menu as AntMenu, type MenuProps as AntMenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { BorderOuterOutlined, UserOutlined } from '@ant-design/icons';

import { ROUTES } from '@/shared/model/routes';

export type MenuProps = AntMenuProps;

export const Menu = ({ mode = 'inline', style, ...props }: MenuProps) => {
  const { onClick } = props;
  const navigate = useNavigate();

  const handleClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    navigate(key);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <AntMenu
      onClick={handleClick}
      mode={mode}
      defaultSelectedKeys={[window.location.pathname]}
      style={{
        backgroundColor: 'transparent',
        ...style,
      }}
      {...props}
      items={[
        {
          key: ROUTES.USERS,
          icon: <UserOutlined />,
          label: 'Пользователи',
        },
        {
          key: ROUTES.NOTES,
          icon: <BorderOuterOutlined />,
          label: 'Заметки',
        },
      ]}
    />
  );
};
