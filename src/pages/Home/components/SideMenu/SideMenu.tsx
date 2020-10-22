import React, { Component } from 'react'
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import logo from '../../../../assets/img/LOGO.svg'
import { Menu } from 'antd';
import {
  LineChartOutlined,
  HeatMapOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { menuList } from './menuConfig'
import SideMenuLess from './SideMenu.module.less'

interface SideMenuProps extends RouteComponentProps {
  collapsed: boolean
}
interface menu {
  title: string,
  key: string,
  icon: string,
  children?: menu[]
}

const iconMap = {
  LineChartOutlined: <LineChartOutlined />,
  HeatMapOutlined: <HeatMapOutlined />,
  ProjectOutlined: <ProjectOutlined />
}

class SideMenu extends Component<SideMenuProps> {
  menuNodes: any // 导航菜单
  openKeys!: string // 展开菜单

  constructor(props: SideMenuProps) {
    super(props)
    this.menuNodes = this.getMenuNodes(menuList)
  }

  /* 根据menuList的数据数组生成对应的标签数组 */
  public getMenuNodes = (menuList: menu[]) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname === '/' ? '/subsideMonitor' : this.props.location.pathname

    return menuList.map((item: menu) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={iconMap[item.icon]}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {

        const cItem = item.children.find((cItem: any) => path.indexOf(cItem.key) === 0)
        if (cItem) {
          this.openKeys = item.key
        }
        return (
          <Menu.SubMenu
            key={item.key}
            title={item.title}
            icon={iconMap[item.icon]}
          >
            {this.getMenuNodes(item.children)}
          </Menu.SubMenu>
        )
      }
    })
  }

  render() {
    let path = this.props.location.pathname === '/' ? '/subsideMonitor' : this.props.location.pathname
    const { collapsed } = this.props

    return (
      <>
        {/* logo和title */}
        <div className={SideMenuLess['side-menu']}>
          <img className={SideMenuLess.logo} src={logo} alt="" />
          {!collapsed && <span style={{ marginLeft: 10 }}>隧道科研</span>}
        </div>

        {/* 导航菜单 */}
        <Menu theme="dark" mode="inline" defaultOpenKeys={[this.openKeys]} defaultSelectedKeys={[path]}>
          {/* <Menu.SubMenu key="/subside" icon={<LineChartOutlined />
          } title="大提沉降">
            <Menu.Item key="/subsideMonitor">实时监测</Menu.Item>
            <Menu.Item key="/subsideHistory">历史数据</Menu.Item>
            <Menu.Item key="/subsideSensor">传感器信息</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="/convergence" icon={<HeatMapOutlined />} title="隧道收敛变形">
            <Menu.Item key="/convergenceTransform">收敛变形</Menu.Item>
            <Menu.Item key="/convergenceSensor">传感器信息</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="/projectInfo" icon={<ProjectOutlined />}>工程概况</Menu.Item> */}
          {this.menuNodes}
        </Menu>
      </>
    )
  }
}

export default withRouter(SideMenu)