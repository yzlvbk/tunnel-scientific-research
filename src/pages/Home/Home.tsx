import React, { Component } from 'react'
import home from './Home.module.less'
import { Route, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from './components/SideMenu/SideMenu'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { debounce } from '../../utils/debounce'
import SubSideMonitor from '../SubsideMonitor/TimeMonitor'
import SubsideHistory from '../SubsideHistory/SubsideHistory'
import SubsideSensor from '../SubsideSensor/SubsideSensor'
import ConvergenceTransform from '../ConvergenceTransform/ConvergenceTransform'
import ConvergenceSensor from '../ConvergenceSensor/ConvergenceSensor'
import ProjectInfo from '../ProjectInfo/ProjectInfo'

const { Header, Sider, Content } = Layout

export default class Home extends Component<RouteComponentProps> {
  public state = {
    collapsed: false  // 侧边栏是否折叠
  }

  // 切换折叠按钮
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  // 根据窗口变化，是否折叠导航栏
  public handleResize = () => {
    if (window.innerWidth < 960) {
      !this.state.collapsed && this.setState({ collapsed: true })
    } else {
      this.state.collapsed && this.setState({ collapsed: false })
    }
  }

  componentDidMount() {
    // home页面，path='/'时，重定向至 /subsideMonitor
    if (this.props.location.pathname === '/' || this.props.location.pathname === '/TunnelSearch') this.props.history.push('/subsideMonitor')
    //监听窗口大小改变
    window.addEventListener('resize', debounce(this.handleResize, 100))
  }

  render() {
    const { collapsed } = this.state

    return (
      <Layout className={home.home}>
        {/* 侧边栏 */}
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          {/* 导航菜单 */}
          <div className={home.sider}>
            <SideMenu collapsed={this.state.collapsed} />
            {collapsed ? <MenuUnfoldOutlined className={home.trigger} onClick={this.toggle} /> : <MenuFoldOutlined className={home.trigger} onClick={this.toggle} />}
          </div>
        </Sider>

        <Layout style={{ position: 'relative' }}>
          {/* 头部区域 */}
          <Header style={{ position: 'fixed', top: 0, backgroundColor: '#fff', padding: 0, width: '100%', height: 48, zIndex: 100 }}></Header>

          {/* 内容区域 */}
          <Content className={home.content}>
            <Switch>

              <Route path="/subsideMonitor" component={SubSideMonitor} />
              <Route path='/subsideHistory' component={SubsideHistory} />
              <Route path='/subsideSensor' component={SubsideSensor} />
              <Route path='/convergenceTransform' component={ConvergenceTransform} />
              <Route path='/convergenceSensor' component={ConvergenceSensor} />
              <Route path='/projectInfo' component={ProjectInfo} />
            </Switch>
          </Content>
        </Layout>
      </Layout >
    );
  }
}
