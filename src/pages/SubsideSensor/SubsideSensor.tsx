import React, { Component } from 'react'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { reqSensorDataTable, reqSensorInfo } from '../../request/api'

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
  }
]

const sensorBaseColumns: ColumnsType<Object> = [
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
    title: '状态',
    dataIndex: 'State',
    align: 'center'
  }
]


export default class SubsideSensor extends Component {
  intervalTimer: any = null // 定时器
  state = {
    sensorTableData: [],  // 传感器信息
    sensorBaseInfo: [] // 传感器基本信息
  }

  public async componentDidMount() {
    this.getSensorTable()
    this.getSensorBaseInfo()

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
    if (!data.isSuccess) return
    const sensorTableData: any[] = []
    data.data.forEach((item: any, index: number) => {
      sensorTableData.push(
        {
          key: index,
          Name: item.Name,
          Id: item.Id,
          IclX: item.IclX,
          IclY: item.IclY,
          AcclX: item.AcclX,
          AcclY: item.AcclX,
          AcclZ: item.AcclX,
        }
      )
    })
    this.setState({ sensorTableData })
  }

  // 获取传感器基本信息
  public getSensorBaseInfo = async () => {
    const data = await reqSensorInfo()
    if (!data.isSuccess) return
    const sensorBaseInfo = data.data.map((item: any, index: number) => {
      item.key = index
      return item
    })
    this.setState({ sensorBaseInfo })
  }

  render() {
    const { sensorTableData, sensorBaseInfo } = this.state
    return (
      <div>
        <Card title="传感器信息">
          <Table columns={sensorColumns} dataSource={sensorTableData} pagination={false} />
        </Card>

        <Card title="传感器基本信息">
          <Table columns={sensorBaseColumns} dataSource={sensorBaseInfo} pagination={false} />
        </Card>
      </div>
    )
  }
}
