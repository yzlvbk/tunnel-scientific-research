import React, { Component } from 'react'
import home from './Home.module.less'
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

interface Props {

}
interface State {

}

export default class Home extends Component<Props, State> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className={home.home}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={home.logo}>{!this.state.collapsed && '隧道科研'}</div>
          {/* 侧边栏导航 */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={home['site-layout']}>

          <Header className={home['site-layout-background']} style={{ padding: 0 }}>
            <MenuFoldOutlined className={home.trigger} onClick={this.toggle} />
          </Header>

          <Content
            className={home['site-layout-background']}
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
  }
}
