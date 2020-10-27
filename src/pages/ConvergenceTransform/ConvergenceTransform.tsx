import * as React from 'react'
import { Card } from 'antd'
import ConvergenceTransformChart from './components/ConvergenceTransformChart/ConvergenceTransformChart'

export interface IConvergenceTransformProps {
}

export default class ConvergenceTransform extends React.Component<IConvergenceTransformProps> {
  public render() {
    return (
      <div>
        <Card title="收敛分析图">
          <ConvergenceTransformChart />
        </Card>
      </div>
    );
  }
}
