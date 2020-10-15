export const menuList = [
  {
    title: '大提沉降',
    key: '/subside',
    icon: 'LineChartOutlined',
    children: [
      {
        title: '实时监测',
        key: '/subsideMonitor',
        icon: ''
      },
      {
        title: '历史数据',
        key: '/subsideHistory',
        icon: ''
      },
      {
        title: '传感器信息',
        key: '/subsideSensor',
        icon: ''
      }
    ]
  },
  {
    title: '隧道收敛变形',
    key: '/convergence',
    icon: 'HeatMapOutlined',
    children: [
      {
        title: '收敛变形',
        key: '/convergenceTransform',
        icon: ''
      },
      {
        title: '传感器信息',
        key: '/convergenceSensor',
        icon: ''
      }
    ]
  },
  {
    title: '工程概况', // 菜单标题名称
    key: '/projectInfo', // 对应的path
    icon: 'ProjectOutlined', // 图标名称
  },
]