import * as React from 'react'
import { Card, Tabs } from 'antd'
import { reqLevee3DHistory } from '../../request/api'
import LeveeThreeD from '../SubsideMonitor/components/LeveeThreeD/LeveeThreeD'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'
import DatePicker from './components/DatePicker/DataPicker'
import MaxOffsetChart from './components/MaxOffsetChart/MaxOffsetChart'
import SinglePointChart from './components/SinglePointChart/SinglePointChart'

const { TabPane } = Tabs

export interface IAppProps {
}

export default class SubsideHistory extends React.Component<IAppProps> {
  public state = {
    allLeveeTimeTransformValue: {}, // 全部历史数据
    leveeTimeTransformValue: {}, // 绘制的数据
    zoomSlideValue: [],
    currentTabKey: 'maxOffset',
    tabsDates: ['2020-10-21 10:00:00', '2020-10-21 11:00:00'] // tabs标签选中的日期范围
  }

  public async componentDidMount() {
    this.getHistory3D('2020-10-21 10:00:00', '2020-10-21 11:00:00')
  }

  public getHistory3D = async (startTime: string, endTime: string) => {
    const data = await reqLevee3DHistory(startTime, endTime)
    if (Object.keys(data.data).length === 0) return
    const zoomSlideValue = Object.keys(data.data)
    const leveeTimeTransformValue = data.data[Object.keys(data.data)[0]] // 默认绘制第一条数据
    this.setState({ allLeveeTimeTransformValue: data.data, leveeTimeTransformValue, zoomSlideValue })
    console.log('end');

  }

  public threeDSlideChangeFormSon = (data: any) => {
    const leveeTimeTransformValue = this.state.allLeveeTimeTransformValue[data]
    this.setState({ leveeTimeTransformValue })
  }

  public threeDDateChangeFromSon = async (dates: any) => {
    this.getHistory3D(dates[0], dates[1])
  }

  public tabsDateChangeFromSon = (dates: any) => {
    this.setState({ tabsDates: dates })
  }

  public tabsChange = (key: any) => {
    this.setState({ currentTabKey: key })
  }


  public render() {
    const { leveeTimeTransformValue, zoomSlideValue, tabsDates } = this.state
    return (
      <div className="subside-history">
        <Card title="大提历史3D模型">
          <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} />
          <ZoomSlider slideChangeFormSon={this.threeDSlideChangeFormSon.bind(this)} zoomSlideValue={zoomSlideValue} />
          <DatePicker dateChangeFromSon={this.threeDDateChangeFromSon.bind(this)} />
        </Card>

        <Card title="大提历史数据图">
          <Tabs defaultActiveKey="maxOffset"
            tabBarExtraContent={<DatePicker dateChangeFromSon={this.tabsDateChangeFromSon.bind(this)} />}
            onChange={this.tabsChange}>
            <TabPane tab="最大位移" key="maxOffset">
              <MaxOffsetChart tabsDates={tabsDates} />
            </TabPane>

            <TabPane tab="单个测点数据" key="singlePoint">
              <SinglePointChart tabsDates={tabsDates} />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
