import React, { Component } from 'react'
import home from './Home.module.less'
import { Route, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from './components/SideMenu/SideMenu'
import {
  MenuFoldOutlined
} from '@ant-design/icons'
import SubSideMonitor from '../SubsideMonitor/SubSideMonitor'
import SubsideHistory from '../SubsideHistory/SubsideHistory'
const { Header, Sider, Content } = Layout


export default class Home extends Component<RouteComponentProps> {

  componentDidMount() {
    // home页面，path='/'时，重定向至 /subsideMonitor
    if (this.props.location.pathname === '/') this.props.history.push('/subsideMonitor')
  }
  public state = {
    collapsed: false  // 侧边栏是否折叠
  }

  // 切换折叠按钮
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout className={home.home}>
        {/* 侧边栏 */}
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          {/* 导航菜单 */}
          <div className={home.sider}>
            <SideMenu collapsed={this.state.collapsed} />
            <MenuFoldOutlined className={home.trigger} onClick={this.toggle} />
          </div>
        </Sider>

        <Layout>
          {/* 头部区域 */}
          <Header style={{ backgroundColor: '#fff', padding: 0, height: 48 }}></Header>

          {/* 内容区域 */}
          <Content className={home.content}>
            <Switch>
              <Route path="/subsideMonitor" component={SubSideMonitor} />
              <Route path='/SubsideHistory' component={SubsideHistory} />
            </Switch>
          </Content>
        </Layout>
      </Layout >
    );
  }
}
