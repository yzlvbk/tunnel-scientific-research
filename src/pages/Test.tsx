import React, { Component } from 'react'

interface testState {
  count: number,
  str: string
}

export default class Test extends Component {
  public state: testState = {
    count: 0,
    str: 'str'
  }

  public click = (num: number) => {
    this.setState({ count: this.state.count + num })
  }

  public render() {
    return (
      <div>
        <h1>test</h1>
        <p>count: {this.state.count}</p>
        <button onClick={(e) => this.click(2)}>add</button>
      </div>
    )
  }
}
