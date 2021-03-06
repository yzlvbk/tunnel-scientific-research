import React, { Component } from 'react'
import { Slider } from 'antd'
import style from '../../style/index.module.less'

interface Props {
  zoomSlideValue: string[]
  slideChangeFormSon: any
  selectValueFromFather: number // 父组件传来的value
}
interface State {

}

export default class ZoomSlider extends Component<Props, State> {
  timer: any
  public state = {
    selectValue: 0
  }

  public componentDidUpdate() {
    const { selectValueFromFather } = this.props
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ selectValue: selectValueFromFather })
      clearTimeout(this.timer)
    }, 500)
  }

  public formatter = (value: any) => {
    const { zoomSlideValue } = this.props
    return zoomSlideValue[value]
  }

  public slideChange = (value: any) => {
    this.setState({ selectValue: value })
    const { zoomSlideValue, slideChangeFormSon } = this.props
    slideChangeFormSon(zoomSlideValue[value])
  }

  public render() {
    const { zoomSlideValue } = this.props
    const { selectValue } = this.state

    return (
      <div className={style['zoom-slider']}>
        <Slider style={{ width: 400 }}
          value={selectValue}
          tipFormatter={this.formatter}
          max={zoomSlideValue.length - 1}
          onChange={this.slideChange}
        />
      </div>
    )
  }
}
