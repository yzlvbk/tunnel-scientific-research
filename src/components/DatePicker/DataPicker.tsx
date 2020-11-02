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
    console.log('dateChange')

  }


  public disabledDate = (current: any): boolean => {
    return false
  }

  public render() {
    return (
      <div
        style={{
          position: 'absolute',
          right: 22,
          top: 15
        }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            defaultValue={[moment('2020-10-21 10:00'), moment('2020-10-21 11:00')]}
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
