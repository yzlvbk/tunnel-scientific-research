import React, { Component } from 'react'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { reqDeformSensorInfo } from '../../request/api'

const sensorBaseColumns: ColumnsType<Object> = [
  {
    title: '隧道名称',
    dataIndex: 'TunnelName',
    align: 'center'
  },
  {
    title: '环号',
    dataIndex: 'RingId',
    align: 'center'
  },
  {
    title: '编号',
    dataIndex: 'ComponentNumber',
    align: 'center'
  },
  {
    title: '管片名',
    dataIndex: 'SegmentModel',
    align: 'center'
  },
  {
    title: '分类',
    dataIndex: 'Classification',
    align: 'center'
  },
  {
    title: '传感器名称',
    dataIndex: 'MonitoringPoint',
    align: 'center'
  },
  {
    title: '厂商',
    dataIndex: 'Factory',
    align: 'center'
  }
]

interface Props {

}
interface State {

}

export default class ConvergenceSensor extends Component<Props, State> {
  public state = {
    sensorDeformData: []
  }

  public async componentDidMount() {
    const data = await reqDeformSensorInfo('342')
    if (!data.isSuccess) return
    const sensorDeformData = data.data.map((item: any, index: number) => {
      item.key = index
      return item
    })
    this.setState({ sensorDeformData })
  }

  render() {
    const { sensorDeformData } = this.state
    return (
      <div>
        <Card title="传感器信息">
          <Table columns={sensorBaseColumns} dataSource={sensorDeformData} pagination={{ defaultPageSize: 50 }} scroll={{ y: 640 }} />
        </Card>
      </div>
    )
  }
}
