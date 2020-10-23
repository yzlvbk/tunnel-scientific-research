import React, { ReactElement } from 'react'
import style from '../../style/index.module.less'

interface Props {

}

export default function RainbowBar(props: Props): ReactElement {
  return (
    <div className={style['rainbow-bar']}>
      <span className={style['rainbow-bar-item']}>20</span>
      <span className={style['rainbow-bar-item']}>-8</span>
      <span className={style['rainbow-bar-item']}>-36</span>
      <span className={style['rainbow-bar-item']}>-64</span>
      <span className={style['rainbow-bar-item']}>-94</span>
      <span className={style['rainbow-bar-item']}>-120</span>
    </div>
  )
}
