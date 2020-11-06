import React, { Component } from 'react'
import * as echarts from 'echarts'
import { reqLeveeHistoryAcclData, reqLeveeHistoryIclData } from '../../../../request/api'

interface IProps {
  tabsDates: string[]
  cascaderSelectValue: string[]
}

export default class HistoryCharts extends Component<IProps> {
  myChart: any

  public componentDidMount() {
    const { tabsDates, cascaderSelectValue } = this.props
    if (cascaderSelectValue[0] === '加速度') {
      this.startDrawAccl(cascaderSelectValue[1], tabsDates[0], tabsDates[1])
    } else if (cascaderSelectValue[0] === '倾角') {
      this.startDrawAccl(cascaderSelectValue[1], tabsDates[0], tabsDates[1])
    }
  }

  public shouldComponentUpdate(nextprops: IProps) {
    const { tabsDates, cascaderSelectValue } = this.props
    return tabsDates !== nextprops.tabsDates || cascaderSelectValue !== nextprops.cascaderSelectValue
  }

  public componentDidUpdate() {
    const { tabsDates, cascaderSelectValue } = this.props
    if (cascaderSelectValue[0] === '加速度') {
      this.startDrawAccl(cascaderSelectValue[1], tabsDates[0], tabsDates[1])
    } else if (cascaderSelectValue[0] === '倾角') {
      this.startDrawAccl(cascaderSelectValue[1], tabsDates[0], tabsDates[1])
    }
  }

  // 执行绘制加速度
  public startDrawAccl = async (name: string, startTime: string, endTime: string) => {
    const data = await reqLeveeHistoryAcclData(name, startTime, endTime)
    this.drawHistoryAcclChart(data.data)
  }
  // 执行绘制倾角
  public startDrawIcl = async () => {
    const data2 = await reqLeveeHistoryIclData('E0', '2020-10-21 10:00:00', '2020-10-21 11:00:00')
    this.drawHistoryIclChart(data2.data)
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawHistoryAcclChart = (data: any) => {
    //* 配置X轴数据
    const dataX: string[] = []
    const dataY_AcclX: any[] = [] // x加速度
    const dataY_AcclY: any[] = []// y加速度
    const dataY_AcclZ: any[] = []// z加速度
    data.forEach((item: any, index: number) => {
      dataX.push(item.TimeTag)
      dataY_AcclX.push(item.AcclX)
      dataY_AcclY.push(item.AcclY)
      dataY_AcclZ.push(item.AcclZ)
    })
    //* 配置series
    const series: any[] = [
      {
        name: 'AcclX',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: dataY_AcclX
      },
      {
        name: 'AcclY',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: dataY_AcclY
      },
      {
        name: 'AcclZ',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: dataY_AcclZ
      }
    ]

    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector('.sensor-history-chart'))

    // 2.配置option
    const option = {
      // color: ['#333'], // 线条颜色
      title: {
        text: '',
        left: 'center'
      },
      legend: {
        top: '10px',
        textStyle: {
          color: lineColor
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataView: {
            show: true
          },
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        },
        iconStyle: {
          borderColor: lineColor
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, //坐标轴两边留白
        data: dataX,
        name: '时间',
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }
      },
      yAxis: [{
        name: '',
        type: 'value',
        splitNumber: 5,
        axisLine: {
          show: true
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: lineColor,
          }
        },
        // @ts-ignore
        // eslint-disable-next-line no-dupe-keys
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }

      }],
      dataZoom: [
        // x轴滚动条
        {
          type: 'inside',
          show: true,
          realtime: true,
          start: 0,
          end: 100,
        },
        // y轴滚动条
        {
          type: 'inside',
          show: true,
          realtime: true,
          start: 0,
          end: 100,
          yAxisIndex: 0,
        }
      ],
      series
    }

    // 3.将配置项给实例
    // @ts-ignore
    this.myChart.setOption(option, true)

    window.addEventListener('resize', this.resizeChart)

    // 立即执行resize，否则刷新页面，echarts宽度多处200px
    setTimeout(() => {
      this.myChart.resize()
    }, 100)
  }

  public drawHistoryIclChart = (data: any) => {
    //* 配置X轴数据
    const dataX: string[] = []
    const dataY_IclX: any[] = [] // x倾角
    const dataY_IclY: any[] = []// y倾角
    data.forEach((item: any, index: number) => {
      dataX.push(item.TimeTag)
      dataY_IclX.push(item.IclX)
      dataY_IclY.push(item.IclY)
    })
    //* 配置series
    const series: any[] = [
      {
        name: 'AcclX',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: dataY_IclX
      },
      {
        name: 'AcclY',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: dataY_IclY
      }
    ]

    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector('.sensor-history-chart'))

    // 2.配置option
    const option = {
      // color: ['#333'], // 线条颜色
      title: {
        text: '',
        left: 'center'
      },
      legend: {
        top: '10px',
        textStyle: {
          color: lineColor
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataView: {
            show: true
          },
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        },
        iconStyle: {
          borderColor: lineColor
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, //坐标轴两边留白
        data: dataX,
        name: '时间',
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }
      },
      yAxis: [{
        name: '',
        type: 'value',
        splitNumber: 5,
        axisLine: {
          show: true
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: lineColor,
          }
        },
        // @ts-ignore
        // eslint-disable-next-line no-dupe-keys
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }

      }],
      dataZoom: [
        // x轴滚动条
        {
          type: 'inside',
          show: true,
          realtime: true,
          start: 0,
          end: 100,
        },
        // y轴滚动条
        {
          type: 'inside',
          show: true,
          realtime: true,
          start: 0,
          end: 100,
          yAxisIndex: 0,
        }
      ],
      series
    }

    // 3.将配置项给实例
    // @ts-ignore
    this.myChart.setOption(option, true)

    window.addEventListener('resize', this.resizeChart)

    // 立即执行resize，否则刷新页面，echarts宽度多处200px
    setTimeout(() => {
      this.myChart.resize()
    }, 100)
  }

  public render() {
    console.log('sensor-history-chart render')

    return (
      <>
        <div className='sensor-history-chart' style={{ height: 300 }}></div>
      </>
    )
  }
}
