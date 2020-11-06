import React, { Component } from 'react'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { reqSensorDataTable } from '../../request/api'

const sensorColumns: ColumnsType<Object> = [
  {
    title: '名称',
    dataIndex: 'Name',
    align: 'center'
  },
  {
    title: '编号',
    dataIndex: 'Id',
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'Type',
    align: 'center'
  },
  {
    title: '倾角X',
    dataIndex: 'IclX',
    align: 'center'
  },
  {
    title: '倾角Y',
    dataIndex: 'IclY',
    align: 'center'
  },
  {
    title: '加速度X',
    dataIndex: 'AcclX',
    align: 'center'
  },
  {
    title: '加速度Y',
    dataIndex: 'AcclY',
    align: 'center'
  },
  {
    title: '加速度Z',
    dataIndex: 'AcclZ',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'Status',
    align: 'center'
  }
]

export default class SubsideSensor extends Component {
  intervalTimer: any = null // 定时器
  state = {
    sensorTableData: []  // 传感器信息
  }

  public async componentDidMount() {
    this.getSensorTable()

    this.intervalTimer = setInterval(() => {
      this.getSensorTable()
    }, 1000 * 60 * 5)

  }

  public componentWillUnmount() {
    if (this.intervalTimer) clearInterval(this.intervalTimer)
  }

  // 传感器信息(5分钟定时请求)
  public getSensorTable = async () => {
    const data = await reqSensorDataTable()
    console.log(data)

    if (!data.isSuccess) return
    const sensorTableData: any[] = []
    data.data.forEach((item: any, index: number) => {
      sensorTableData.push(
        {
          key: index,
          Name: item.Name,
          Type: '姿态盒',
          Id: item.Id,
          IclX: item.IclX,
          IclY: item.IclY,
          AcclX: item.AcclX,
          AcclY: item.AcclX,
          AcclZ: item.AcclX,
          Status: '正常运行'
        }
      )
    })
    this.setState({ sensorTableData })
  }

  render() {
    const { sensorTableData } = this.state
    return (
      <div>
        <Card title="传感器信息">
          <Table columns={sensorColumns} dataSource={sensorTableData} pagination={false} />
        </Card>
      </div>
    )
  }
}
