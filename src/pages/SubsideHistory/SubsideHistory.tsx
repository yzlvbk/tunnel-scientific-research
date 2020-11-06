import * as React from 'react'
import { Card, Tabs, Spin, Cascader } from 'antd'
import { reqLevee3DHistory } from '../../request/api'
import LeveeThreeD from '../../components/LeveeThreeD/LeveeThreeD'
import RainbowBar from '../../components/rainbowBar/RainbowBar'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'
import DatePicker from '../../components/DatePicker/DataPicker'
import MaxOffsetChart from './components/MaxOffsetChart/MaxOffsetChart'
import SinglePointChart from './components/SinglePointChart/SinglePointChart'
import HistoryCharts from './components/HistoryCharts/HistoryCharts'

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
  public state = {
    allLeveeTimeTransformValue: {}, // 日期范围内全部历史数据
    leveeTimeTransformValue: {}, // 当前绘制的数据
    zoomSlideValue: [],
    currentTabKey: 'maxOffset',
    tabsDates: ['2020-10-21 10:00:00', '2020-10-21 11:00:00'], // tabs标签选中的日期范围
    spinVisible: false, // 3D请求数据时加载icon
    selectValuetoSon: 0, // 传给子组件zoomslide的选中值
    cascaderSelectValue: ['加速度', 'E0'] // 级联选择器选中值
  }

  public async componentDidMount() {
    const { tabsDates } = this.state
    this.getHistory3D(tabsDates[0], tabsDates[1])
  }

  public getHistory3D = async (startTime: string, endTime: string) => {
    const data = await reqLevee3DHistory(startTime, endTime)
    if (Object.keys(data.data).length === 0) return
    const zoomSlideValue = Object.keys(data.data)
    const leveeTimeTransformValue = data.data[Object.keys(data.data)[0]] // 默认绘制第一条数据
    this.setState({ allLeveeTimeTransformValue: data.data, leveeTimeTransformValue, zoomSlideValue, spinVisible: false, selectValuetoSon: 0 })
  }

  public threeDSlideChangeFormSon = (data: any) => {
    const { zoomSlideValue, selectValuetoSon } = this.state
    const index = zoomSlideValue.findIndex(item => {
      return item === data
    })
    if (index !== selectValuetoSon) {
      this.setState({ selectValuetoSon: index })
    }

    const leveeTimeTransformValue = this.state.allLeveeTimeTransformValue[data]
    this.setState({ leveeTimeTransformValue })
  }

  public threeDDateChangeFromSon = async (dates: any) => {
    this.setState({ spinVisible: true, tabsDates: dates })
    this.getHistory3D(dates[0], dates[1])
  }

  public tabsChange = (key: any) => {
    this.setState({ currentTabKey: key })
    this.forceUpdate()
  }

  //* 级联选择器发生变化
  public cascaderSelectValueChange = (value: any) => {
    console.log(value)
    this.setState({ cascaderSelectValue: value })
  }

  // 监听子组件点击最大位移chart
  public clickChart = (name: any) => {
    const { zoomSlideValue } = this.state
    const index = zoomSlideValue.findIndex(item => {
      return item === name
    })

    const leveeTimeTransformValue = this.state.allLeveeTimeTransformValue[name]
    leveeTimeTransformValue && this.setState({ leveeTimeTransformValue, selectValuetoSon: index })
  }

  public render() {
    const {
      leveeTimeTransformValue,
      zoomSlideValue,
      tabsDates,
      spinVisible,
      selectValuetoSon,
      currentTabKey,
      cascaderSelectValue
    } = this.state

    console.log('history render')

    return (
      <div className="subside-history">
        <Card title="大提历史3D模型">
          <RainbowBar />
          <DatePicker dateChangeFromSon={this.threeDDateChangeFromSon.bind(this)} />
          <Spin spinning={spinVisible} tip="正在加载...">
            <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} />
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
