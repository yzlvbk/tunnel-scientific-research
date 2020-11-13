import React, { ReactElement } from 'react'
import style from './index.module.less'

interface Props {
  zoom: number
}

export default function RainbowBar(props: Props): ReactElement {
  const { zoom = 5 } = props
  return (
    <div className={style['rainbow-bar']}>
      <span className={style['rainbow-bar-item']}>{5 * zoom}</span>
      <span className={style['rainbow-bar-item']}>{2 * zoom}</span>
      <span className={style['rainbow-bar-item']}>{-1 * zoom}</span>
      <span className={style['rainbow-bar-item']}>{-4 * zoom}</span>
      <span className={style['rainbow-bar-item']}>{-7 * zoom}</span>
      <span className={style['rainbow-bar-item']}>{-10 * zoom}</span>
    </div>
  )
}
