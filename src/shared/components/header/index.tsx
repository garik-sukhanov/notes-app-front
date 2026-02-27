import styled from 'styled-components';

import { Avatar, Dropdown, Switch } from 'antd';
import { useContext } from 'react';

import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { ThemeContext } from '@/shared/context';
import { useSession } from '@/shared/model/session';
import { ThemeVariants } from '@/shared/types/collections';

import { Logo } from '../logo';
import { Menu } from '../menu';

export const Header = () => {
  const { logout } = useSession();
  const { theme, handleChangeTheme } = useContext(ThemeContext);

  return (
    <HeaderWrapper>
      <Logo compact />
      <Menu mode="horizontal" />
      <Dropdown
        menu={{
          items: [
            {
              key: 'profile',
              label: 'Профиль',
              icon: <UserOutlined />,
            },
            {
              key: 'settings',
              label: 'Настройки',
              icon: <SettingOutlined />,
            },

            {
              key: 'theme',
              label: (
                <Switch
                  checked={theme === ThemeVariants.Dark}
                  checkedChildren="темная 🌙"
                  unCheckedChildren="Светлая ☀️"
                  onChange={handleChangeTheme}
                />
              ),
            },
            {
              type: 'divider',
            },
            {
              key: 'logout',
              label: 'Выйти',
              style: { color: 'red' },
              icon: <LoginOutlined />,
              onClick: () => {
                logout();
              },
            },
          ],
        }}
      >
        <StyledAvatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      </Dropdown>
    </HeaderWrapper>
  );
};

const StyledAvatar = styled(Avatar)`
  margin: 0 auto;
  cursor: pointer;
`;

const HeaderWrapper = styled.div`
  height: fit-content;
  width: 100%;
  border-bottom: 1px solid #000;
  display: grid;
  grid-template-columns: 4em 1fr 4em;
  align-items: center;
`;
