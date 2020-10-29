import React, { ReactElement } from 'react'
import style from './index.module.less'

interface Props {

}

export default function RainbowBar(props: Props): ReactElement {
  return (
    <div className={style['rainbow-bar']}>
      <span className={style['rainbow-bar-item']}>50</span>
      <span className={style['rainbow-bar-item']}>20</span>
      <span className={style['rainbow-bar-item']}>-10</span>
      <span className={style['rainbow-bar-item']}>-40</span>
      <span className={style['rainbow-bar-item']}>-70</span>
      <span className={style['rainbow-bar-item']}>-100</span>
    </div>
  )
}
