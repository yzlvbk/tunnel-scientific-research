import React, { Component } from 'react'
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { reqSensorDataTable } from '../../request/api'

const columns: ColumnsType<Object> = [
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

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    Name: `Edward King`,
    Id: 1,
    IclX: `London, Park Lane no.`,
    IclY: `London, Park Lane no.`,
    AcclX: 'dasda',
    AcclY: 'dasda',
    AcclZ: 'dasda',
  });
}

interface Props {

}
interface State {

}



export default class SubsideSensor extends Component<Props, State> {
  state = {
    sensorTableData: []
  }
  // sensorTableData: any = []


  public async componentDidMount() {
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

  render() {
    const { sensorTableData } = this.state
    return (
      <div>
        <Card title="传感器基本信息">
          <Table columns={columns} dataSource={sensorTableData} pagination={false} />
        </Card>
      </div>
    )
  }
}
