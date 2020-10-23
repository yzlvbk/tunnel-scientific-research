import * as React from 'react'
import * as echarts from 'echarts'
import style from '../../style/index.module.less'
import { reqLeveeTimeMaxDispTable } from '../../../../request/api'

export interface ITimeChartProps {
}

export default class TimeChart extends React.Component<ITimeChartProps> {
  myChart: any

  public state = {
    length: [],
    current: [],
    increment: [],
    preday: []
  }

  public componentDidMount() {
    this.getTimeChartData()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public getTimeChartData = async () => {
    const data = await reqLeveeTimeMaxDispTable()
    if (data.statusCode !== 200) return
    this.setState({
      length: data.data.length,
      current: data.data.current,
      increment: data.data.increment,
      preday: data.data.preday
    }, () => {
      this.drawTimeChart()
    })
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawTimeChart = () => {
    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // moocX轴数据
    const dataX = this.state.length

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector(`.${style['time-chart']}`))

    // 2.配置option
    const option = {
      color: ['pink', 'blue'], // 线条颜色
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['2018', '2019']
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
        name: '位置(m)',
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
        name: 'current',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: this.state.current
      }
      ]
    };

    // 3.将配置项给实例
    // @ts-ignore
    this.myChart.setOption(option, true)

    window.addEventListener('resize', this.resizeChart)

    // 立即执行resize，否则刷新页面，echarts宽度多处200px
    setTimeout(() => {
      this.myChart.resize()
    }, 100);
  }

  public render() {
    return (
      <div className={style['time-chart']}></div>
    )
  }
}


