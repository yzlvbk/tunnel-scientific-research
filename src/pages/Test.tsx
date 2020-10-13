import React, { Component } from 'react'
import style from './Test.module.less'
import { Button } from 'antd';

interface IProps {
  name: string,
  age: number
}

interface TestState {
  count: number,
  str: string
}

export default class Test extends Component<IProps, TestState> {
  // constructor(props: IProps) {
  //   super(props);
  //   this.state = {
  //     count: 0,
  //     str: 'str'
  //   }
  // }

  readonly state: Readonly<TestState> = {
    count: 0,
    str: 'str'
  }

  public click = (num: number) => {
    this.setState({ count: this.state.count + num })
  }

  public render() {
    console.log(this)
    const { count } = this.state

    return (
      <div>
        <h1>test</h1>
        <p className={style.color}>count: {count}</p>
        <Button type="primary" onClick={(e) => this.click(2)}>add</Button>
      </div>
    )
  }
}
