import * as React from 'react'
import { Card } from 'antd'
import { reqLeveeTimeTransform } from '../../request/api'
import LeveeThreeD from './components/LeveeThreeD/LeveeThreeD'


export interface ISubSideMonitorProps {
}

export default class SubSideMonitor extends React.Component<ISubSideMonitorProps> {

  public state = {
    leveeTimeTransformValue: {}
  }

  public async componentDidMount() {
    const data = await reqLeveeTimeTransform()
    if (data.statusCode !== 200) return
    this.setState({ leveeTimeTransformValue: data.data })
  }

  public render() {
    const { leveeTimeTransformValue } = this.state
    return (
      <div className="monitor">
        <Card title="大提3D模型" className="three-d-model">

          <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} />
        </Card>
      </div>
    );
  }
}
