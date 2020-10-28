import * as React from 'react'
import { Card, Slider, Select } from 'antd'
import ConvergenceTransformChart from './components/ConvergenceTransformChart/ConvergenceTransformChart'
import ConvergenceTransformTimeChart from './components/ConvergenceTransformTimeChart/ConvergenceTransformTimeChart'
import DatePicker from '../SubsideHistory/components/DatePicker/DataPicker'
import style from './style/index.module.less'

const { Option } = Select

export interface IConvergenceTransformProps {
}

export default class ConvergenceTransform extends React.Component<IConvergenceTransformProps> {
  public state = {
    transformDate: ['2020-10-21 10:00', '2020-10-21 11:00'], // 收敛变形图的开始和结束时间
    slideValue: 0, // zoom缩放数值
    selectLoop: '342' // 选中环数，默认342环
  }

  public TransformDateChangeFromSon = (dates: any) => {
    this.setState({ transformDate: dates })
  }

  public slideOnChange = (value: any): void => {
    this.setState({ slideValue: value })
  }

  public selectChange = (value: any): void => {
    this.setState({ selectLoop: value })
    console.log(`selected ${value}`)
  }

  public render() {
    const { transformDate, slideValue, selectLoop } = this.state
    return (
      <div>
        <Card title="收敛分析图">
          <Select defaultValue="342" style={{ width: 120 }} onChange={this.selectChange}>
            <Option value="342">342环</Option>
            <Option value="1045" >东线1045环</Option>
            <Option value="1028" disabled>西线1028环</Option>
          </Select>
          <ConvergenceTransformChart slideValue={slideValue} />
          <div className={style["slide-warp"]}>
            <Slider
              defaultValue={15}
              max={30}
              tipFormatter={null}
              onChange={this.slideOnChange}
            />
          </div>
        </Card>

        <Card title="收敛变形图">
          <DatePicker dateChangeFromSon={this.TransformDateChangeFromSon.bind(this)} />
          <ConvergenceTransformTimeChart transformDate={transformDate} selectLoop={selectLoop} />
        </Card>
      </div>
    );
  }
}
