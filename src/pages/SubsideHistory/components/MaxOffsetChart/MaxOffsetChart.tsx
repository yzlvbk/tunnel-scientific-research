import React, { Component } from 'react'
import * as echarts from 'echarts'
import { reqLeveeHistoryMaxDisp } from '../../../../request/api'
import style from '../../style/index.module.less'

interface IMaxOffsetChartProps {
  tabsDates: string[]
  clickChart: any
  currentTabKey: string // 当前选中tab项
}

export default class MaxOffsetChart extends Component<IMaxOffsetChartProps> {
  myChart: any

  public componentDidMount() {
    this.startDrawChart()
  }

  public shouldComponentUpdate(nextProps: IMaxOffsetChartProps) {
    return (nextProps.currentTabKey === 'maxOffset' && this.props.tabsDates !== nextProps.tabsDates) || this.props.currentTabKey !== nextProps.currentTabKey
  }

  public componentDidUpdate() {
    this.startDrawChart()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public startDrawChart = async () => {
    const { tabsDates } = this.props
    const data = await reqLeveeHistoryMaxDisp(tabsDates[0], tabsDates[1])
    if (!data.isSuccess) return
    this.drawMaxOffsetChart(data.data)
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawMaxOffsetChart = (maxOffsetData: { x: [], y: [], maxLenList: [] }) => {
    const { x, y, maxLenList } = maxOffsetData

    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // X轴数据
    const dataX = x

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector(`.${style['max-offset-chart']}`))

    // 2.配置option
    const option = {
      color: ['#333'], // 线条颜色
      title: {
        text: '大堤最大沉降图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return `<div>
            最大沉降: ${params[0].value}
            <br>
            测点位置: E0+${maxLenList[params[0].dataIndex]}
            </div>
            `
        }
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
        name: '沉降(mm)',
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
      series: [{
        name: '最大沉降',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: y
      }
      ]
    }

    // 3.将配置项给实例
    // @ts-ignore
    this.myChart.setOption(option, true)

    window.addEventListener('resize', this.resizeChart)

    // 立即执行resize，否则刷新页面，echarts宽度多处200px
    setTimeout(() => {
      this.myChart.resize()
    }, 100)

    // 注册点击echarts事件
    this.myChart.on('click', (params: any) => {
      // 通知父组件chart点击事件
      this.props.clickChart(params.name)
    })
  }

  render() {
    console.log('MaxOffsetChart render')

    return (
      <div className={style['max-offset-chart']}></div>
    )
  }
}
