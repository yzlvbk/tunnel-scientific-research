import React, { Component } from 'react'
import { Slider } from 'antd'
import style from '../../style/index.module.less'

interface Props {
  zoomSlideValue: string[]
  slideChangeFormSon: any
}
interface State {

}

export default class ZoomSlider extends Component<Props, State> {

  public formatter = (value: any) => {
    const { zoomSlideValue } = this.props
    return zoomSlideValue[value]
  }

  public slideChange = () => {
    let timer: any
    return (value: any) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        const { zoomSlideValue, slideChangeFormSon } = this.props
        slideChangeFormSon(zoomSlideValue[value])
      }, 500)
    }
  }

  public render() {
    const { zoomSlideValue } = this.props

    return (
      <div className={style['zoom-slider']}>
        <Slider style={{ width: 400 }}
          tipFormatter={this.formatter}
          max={zoomSlideValue.length - 1}
          onChange={this.slideChange()}
        />
      </div>
    )
  }
}
