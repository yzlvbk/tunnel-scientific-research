import * as React from 'react'
import { Card } from 'antd'
import ConvergenceTransformChart from './components/ConvergenceTransformChart/ConvergenceTransformChart'
import ConvergenceTransformTimeChart from './components/ConvergenceTransformTimeChart/ConvergenceTransformTimeChart'
import DatePicker from '../SubsideHistory/components/DatePicker/DataPicker'

export interface IConvergenceTransformProps {
}

export default class ConvergenceTransform extends React.Component<IConvergenceTransformProps> {
  public state = {
    transformDate: ['2020-10-21 10:00', '2020-10-21 11:00']
  }

  public TransformDateChangeFromSon = (dates: any) => {
    console.log('TransformDateChangeFromSon', dates)
    this.setState({ transformDate: dates })
  }

  public render() {
    const { transformDate } = this.state
    return (
      <div>
        <Card title="收敛分析图">
          <ConvergenceTransformChart />
        </Card>

        <Card title="收敛变形图">
          <DatePicker dateChangeFromSon={this.TransformDateChangeFromSon.bind(this)} />
          <ConvergenceTransformTimeChart transformDate={transformDate} />
        </Card>
      </div>
    );
  }
}
