import React, { Component } from 'react'
import { Slider } from 'antd'

interface Props {
  slideChangeFormSon: any,
  style?: React.CSSProperties,
  className?: string
}
interface State {

}


export default class VerticalZoomSlider extends Component<Props, State> {
  public state = {}

  public slideChange = () => {
    const { slideChangeFormSon } = this.props
    let timer: any = null
    return (value: any) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        slideChangeFormSon(value)
        clearTimeout(timer)
      }, 700)
    }
  }

  render() {
    const { style, className } = this.props
    return (
      <div className={className} style={style}>
        <Slider
          vertical
          min={1}
          max={10}
          defaultValue={5}
          onChange={this.slideChange()}
        />
      </div>
    )
  }
}
