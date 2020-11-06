import * as React from 'react'
import { connect } from "react-redux"
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface User {
  key: number
  location: string
  current: string
  preday: string
  increment: string
}

const columns: ColumnsType<User> = [
  {
    title: '位置',
    dataIndex: 'location',
    align: 'center',
    width: 100
  },
  {
    title: '实时沉降(mm)',
    dataIndex: 'current',
    align: 'center'
  },
  {
    title: '昨日沉降(mm)',
    dataIndex: 'preday',
    align: 'center'
  },
  {
    title: '沉降增量(mm/天)',
    dataIndex: 'increment',
    align: 'center'
  }
]

export interface ITimeTableProps {
  current?: string[]
  length?: string[]
  increment?: string[]
  preday?: string[]
}

class TimeTable extends React.Component<ITimeTableProps> {
  public state = {
    columnsData: []
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { current, length, increment, preday } = nextProps

    const columnsData: User[] = []

    if (length) {
      length.forEach((item: any, index: number) => {
        columnsData.push({
          key: index,
          location: length[index] || '',
          current: current[index] || '',
          preday: preday[index] || '',
          increment: increment[index] || ''
        })
      })
    }
    if (columnsData.length > 0) {
      return {
        columnsData
      }
    }
    return null;
  }


  public render() {
    const columnsData: User[] = this.state.columnsData

    return (
      <div className="time-table">
        <Table columns={columns} dataSource={columnsData} pagination={{ defaultPageSize: 50 }} scroll={{ y: 440 }} />
      </div>
    );
  }
}

export default connect(
  // @ts-ignore
  ({ TimeMonitorReducer }) => (TimeMonitorReducer)
)(TimeTable)
