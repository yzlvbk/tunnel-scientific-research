import * as React from 'react'
import { Card } from 'antd'
import { reqLeveeTimeTransform, reqLeveeTimeMaxDispTable } from '../../request/api'
import LeveeThreeD from '../../components/LeveeThreeD/LeveeThreeD'
import RainbowBar from '../../components/rainbowBar/RainbowBar'
import TimeChart from './components/TimeChart/TimeChart'
import TimeTable from './components/TimeTable/TimeTable'
import { connect } from "react-redux"

class SubSideMonitor extends React.Component<{}> {
  inervalTimer: any

  public state = {
    leveeTimeTransformValue: {}
  }

  // 实时请求数据
  public timeGetData = async () => {
    const data = await reqLeveeTimeTransform() // 3D实时数据
    if (data.statusCode !== 200) return
    this.setState({ leveeTimeTransformValue: data.data })

    // @ts-ignore
    // 保存图表实时数据
    this.props.dispatch(async dispatch => {
      const data2 = await reqLeveeTimeMaxDispTable()
      dispatch({ type: 'saveTimeMonitorData', payload: data2.data })
    })
  }

  public componentDidMount() {
    this.timeGetData()

    this.inervalTimer = setInterval(() => {
      this.timeGetData()
      // 每5分钟请求一次
    }, 1000 * 60 * 5)
  }

  public componentWillUnmount() {
    if (this.inervalTimer) {
      clearInterval(this.inervalTimer)
    }
  }


  public render() {
    const { leveeTimeTransformValue } = this.state

    return (
      <div className="monitor">
        <Card title="大提实时3D模型" className="three-d-model">
          <RainbowBar />
          <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} />
        </Card>

        <Card title="数据曲线图">
          <TimeChart />
        </Card>

        <Card title="实时数据表格">
          <TimeTable />
        </Card>
      </div>
    );
  }
}

export default connect()(SubSideMonitor)
