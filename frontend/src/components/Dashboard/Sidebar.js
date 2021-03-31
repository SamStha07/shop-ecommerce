import { LaptopOutlined } from '@material-ui/icons';
import { Menu } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu.Item theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item
            key='1'
            // icon={<UserOutlined />}
          >
            nav 1
          </Menu.Item>
          <Menu.Item
            key='2'
            // icon={<VideoCameraOutlined />}
          >
            nav 2
          </Menu.Item>
          <Menu.Item
            key='3'
            // icon={<UploadOutlined />}
          >
            nav 3
          </Menu.Item>
        </Menu.Item>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {/* {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: this.toggle,
            }
          )} */}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
