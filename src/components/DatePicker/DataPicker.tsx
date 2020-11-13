import * as React from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

export interface IDatePickerProps {
  dateChangeFromSon: any
}

export default class DatePickerComponent extends React.Component<IDatePickerProps> {

  public dateChange = (value: any, dateString: any) => {
    const { dateChangeFromSon } = this.props
    dateChangeFromSon(dateString)
  }


  public disabledDate = (current: any): boolean => {
    return false
  }

  public render() {
    const startDefaultValue = moment(Number(new Date()) - (24 * 3600 * 1000)) // 默认开始时间
    const endDefaultValue = moment(new Date())// 默认结束时间

    return (
      <div
        style={{
          position: 'absolute',
          right: 22,
          top: 15
        }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            allowClear={false}
            defaultValue={[startDefaultValue, endDefaultValue]}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            ranges={{
              Today: [moment().startOf('day'), moment().endOf('day')],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            disabledDate={this.disabledDate}
            onChange={this.dateChange}
          />
        </Space>
      </div>
    );
  }
}
