import * as React from 'react'
import { Card } from 'antd'
import LeveeThreeD from './components/LeveeThreeD/LeveeThreeD'


export interface ISubSideMonitorProps {
}

export default class SubSideMonitor extends React.Component<ISubSideMonitorProps> {


  public render() {
    return (
      <div className="monitor">
        <Card title="大提3D模型" className="three-d-model">
          <LeveeThreeD />
        </Card>
      </div>
    );
  }
}
