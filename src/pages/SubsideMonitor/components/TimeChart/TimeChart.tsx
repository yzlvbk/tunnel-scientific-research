import * as React from 'react'
import * as echarts from 'echarts'
import style from '../../style/index.module.less'

export interface ITimeChartProps {
}

export default class TimeChart extends React.Component<ITimeChartProps> {
  myChart: any // 

  componentDidMount() {
    this.drawTimeChart()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawTimeChart = () => {
    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // moocX轴数据
    const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

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
        name: '时间',
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }
      },
      yAxis: [{
        name: '倾角(deg)',
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
        name: '2018',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4]
      },
      {
        name: '2019',
        type: 'line',
        lineStyle: {
          width: 1
        },
        data: [9, 5, 7, 8, 6, 7, 8, 7, 7, 6, 8, 6]
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


