import * as React from 'react'
import { Card, Tabs, Spin, Cascader } from 'antd'
import { reqLevee3DHistory, reqLeveeHistoryMaxDisp } from '../../request/api'
import moment from 'moment'
import LeveeThreeD from '../../components/LeveeThreeD/LeveeThreeD'
import VerticalZoomSlider from '../../components/verticalZoomSlider/VerticalZoomSlider'
import RainbowBar from '../../components/rainbowBar/RainbowBar'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'
import DatePicker from '../../components/DatePicker/DataPicker'
import MaxOffsetChart from './components/MaxOffsetChart/MaxOffsetChart'
import SinglePointChart from './components/SinglePointChart/SinglePointChart'
import HistoryCharts from './components/HistoryCharts/HistoryCharts'

// 级联选择器配置
const cascaderOptions = [
  {
    value: '加速度',
    label: '加速度',
    children: [
      {
        value: 'E0',
        label: 'E0'
      },
      {
        value: 'E1',
        label: 'E1'
      },
      {
        value: 'E2',
        label: 'E2'
      },
      {
        value: 'E3',
        label: 'E3'
      },
      {
        value: 'E4',
        label: 'E4'
      },
      {
        value: 'E5',
        label: 'E5'
      },
      {
        value: 'E6',
        label: 'E6'
      },
      {
        value: 'E7',
        label: 'E7'
      }
    ]
  },
  {
    value: '倾角',
    label: '倾角',
    children: [
      {
        value: 'E0',
        label: 'E0'
      },
      {
        value: 'E1',
        label: 'E1'
      },
      {
        value: 'E2',
        label: 'E2'
      },
      {
        value: 'E3',
        label: 'E3'
      },
      {
        value: 'E4',
        label: 'E4'
      },
      {
        value: 'E5',
        label: 'E5'
      },
      {
        value: 'E6',
        label: 'E6'
      },
      {
        value: 'E7',
        label: 'E7'
      }
    ]
  }
]

const { TabPane } = Tabs

export default class SubsideHistory extends React.Component {
  sliderTimer: any = null // 滑动条防抖定时器

  public state = {
    leveeTimeTransformValue: {}, // 当前绘制的数据
    zoomSlideValue: [],
    currentTabKey: 'maxOffset',
    // tabs标签选中的日期范围 默认范围为1天，结束时间为当前时间
    tabsDates: [moment(Number(new Date()) - (24 * 3600 * 1000)).format('YYYY-MM-DD HH:mm'), moment(new Date()).format('YYYY-MM-DD HH:mm')],
    spinVisible: false, // 3D请求数据时加载icon
    selectValuetoSon: 0, // 传给子组件zoomslide的选中值
    cascaderSelectValue: ['加速度', 'E0'],// 级联选择器选中值
    verticalZoomValue: 5 // 垂直沉降缩放比例
  }

  public componentDidMount() {
    const { tabsDates } = this.state
    // 初始化触发date change事件
    this.threeDDateChangeFromSon(tabsDates)
  }

  // 获取3D数据
  public getHistory3D = async (startTime: string, endTime: string) => {
    // startTime和endTime为同一时间，每次只请求一个时间点
    const data = await reqLevee3DHistory(startTime, endTime)
    if (Object.keys(data.data).length === 0) return
    const leveeTimeTransformValue = data.data[Object.keys(data.data)[0]] // 默认绘制第一条数据
    this.setState({ leveeTimeTransformValue, spinVisible: false })
  }

  // 日期拉动条变化
  public threeDSlideChangeFormSon = (data: any) => {
    // 防抖处理
    if (this.sliderTimer) clearTimeout(this.sliderTimer)
    this.sliderTimer = setTimeout(() => {
      const { zoomSlideValue } = this.state
      // 查找选中日期的索引
      const index = zoomSlideValue.findIndex(item => item === data)
      // 将索引传递给sliderZoom子组件
      this.setState({ selectValuetoSon: index })
      // 跟新3D历史图
      this.getHistory3D(data, data)
      // 清除定时器
      clearTimeout(this.sliderTimer)
    }, 100)

  }

  // 监听子组件日期选择变化
  public threeDDateChangeFromSon = async (dates: any) => {
    const { selectValuetoSon } = this.state
    // 根据日期范围请求最大沉降，获取sliderZoom日期值
    const data = await reqLeveeHistoryMaxDisp(dates[0], dates[1])
    const zoomSlideValue = data.data.x
    this.setState({ spinVisible: true, tabsDates: dates, zoomSlideValue })
    // 跟新3D历史图
    this.getHistory3D(zoomSlideValue[selectValuetoSon], zoomSlideValue[selectValuetoSon])
  }

  // 监听子组件垂直沉降缩放条变化
  public verticalSlideChangeFormSon = (zoomValue: number) => {
    console.log('zoomValue', zoomValue)
    this.setState({ verticalZoomValue: zoomValue })
  }

  // tab栏切换
  public tabsChange = (key: any) => {
    this.setState({ currentTabKey: key })
    this.forceUpdate()
  }

  // 级联选择器发生变化
  public cascaderSelectValueChange = (value: any) => {
    this.setState({ cascaderSelectValue: value })
  }

  // 监听子组件点击最大位移chart
  public clickChart = (name: any) => {
    const { zoomSlideValue } = this.state
    // 找到当前时间点所在的索引
    const index = zoomSlideValue.findIndex(item => item === name)
    // 将索引传递给sliderZoom子组件
    this.setState({ selectValuetoSon: index })
    // 跟新3D历史图
    this.getHistory3D(name, name)
  }

  public render() {
    const {
      leveeTimeTransformValue,
      zoomSlideValue,
      tabsDates,
      spinVisible,
      selectValuetoSon,
      currentTabKey,
      cascaderSelectValue,
      verticalZoomValue
    } = this.state

    console.log('history render')

    return (
      <div className="subside-history">
        <Card title="大提历史3D模型">
          <RainbowBar zoom={verticalZoomValue} />
          <VerticalZoomSlider
            style={{ position: 'absolute', height: 200, right: 20, top: 105, zIndex: 100 }}
            slideChangeFormSon={this.verticalSlideChangeFormSon.bind(this)}
          />
          <DatePicker dateChangeFromSon={this.threeDDateChangeFromSon.bind(this)} />
          <Spin spinning={spinVisible} tip="正在加载...">
            <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} zoom={verticalZoomValue} />
            <ZoomSlider selectValueFromFather={selectValuetoSon} slideChangeFormSon={this.threeDSlideChangeFormSon.bind(this)} zoomSlideValue={zoomSlideValue} />
          </Spin>
        </Card>

        <Card>
          <Tabs defaultActiveKey="maxOffset"
            onChange={this.tabsChange}>
            <TabPane tab="最大沉降" key="maxOffset">
              <MaxOffsetChart tabsDates={tabsDates} clickChart={this.clickChart.bind(this)} currentTabKey={currentTabKey} />
            </TabPane>

            <TabPane tab="单个测点数据" key="singlePoint">
              <SinglePointChart tabsDates={tabsDates} currentTabKey={currentTabKey} />
            </TabPane>
          </Tabs>
        </Card>

        <Card title="传感器历史图">
          <Cascader
            allowClear={false}
            defaultValue={cascaderSelectValue}
            options={cascaderOptions}
            onChange={this.cascaderSelectValueChange}
            placeholder="Please select"
            style={{ position: 'absolute', top: '15px', right: 0 }}
          />
          <HistoryCharts tabsDates={tabsDates} cascaderSelectValue={cascaderSelectValue} />
        </Card>
      </div>
    );
  }
}
