import * as React from 'react'
import { Card } from 'antd'
import { reqLevee3DHistory } from '../../request/api'
import LeveeThreeD from '../SubsideMonitor/components/LeveeThreeD/LeveeThreeD'
import ZoomSlider from './components/ZoomSlider/ZoomSlider'

export interface IAppProps {
}

export default class SubsideHistory extends React.Component<IAppProps> {
  public state = {
    allLeveeTimeTransformValue: {}, // 全部历史数据
    leveeTimeTransformValue: {}, // 绘制的数据
    zoomSlideValue: []
  }

  public async componentDidMount() {
    const data = await reqLevee3DHistory('2020-10-21 10:00:00', '2020-10-21 11:00:00')
    const zoomSlideValue = Object.keys(data.data)
    const leveeTimeTransformValue = data.data[Object.keys(data.data)[0]] // 默认绘制第一条数据
    this.setState({ allLeveeTimeTransformValue: data.data, leveeTimeTransformValue, zoomSlideValue })
    console.log(data)
  }

  public slideChangeFormSon = (data: any) => {
    const leveeTimeTransformValue = this.state.allLeveeTimeTransformValue[data]
    this.setState({ leveeTimeTransformValue })
  }

  public render() {
    const { leveeTimeTransformValue } = this.state
    const { zoomSlideValue } = this.state
    return (
      <div className="subside-history">
        <Card title="大提历史3D模型">
          <LeveeThreeD leveeTimeTransformValue={leveeTimeTransformValue} />
          <ZoomSlider slideChangeFormSon={this.slideChangeFormSon.bind(this)} zoomSlideValue={zoomSlideValue} />
        </Card>

      </div>
    );
  }
}
