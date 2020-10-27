import * as React from 'react'
import * as echarts from 'echarts'
import { reqLeveeHistorySingle } from '../../../../request/api'
import style from '../../style/index.module.less'

export interface ISinglePointChartProps {
  tabsDates: string[]
}

export default class SinglePointChart extends React.Component<ISinglePointChartProps> {
  myChart: any

  public startDrawChart = async () => {
    const { tabsDates } = this.props
    const data = await reqLeveeHistorySingle(tabsDates[0], tabsDates[1], '0.5')
    if (!data.isSuccess) return
    this.drawSinglePointChart(data.data)
  }

  public async componentDidMount() {
    this.startDrawChart()
  }

  public async componentDidUpdate() {
    this.startDrawChart()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawSinglePointChart = (maxOffsetData: { x: [], y: [] }) => {
    const { x, y } = maxOffsetData
    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // X轴数据
    const dataX = x

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector(`.${style['single-point-chart']}`))

    // 2.配置option
    const option = {
      color: ['#333'], // 线条颜色
      title: {
        text: '大堤单点位移图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
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
        name: '位移(mm)',
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
        name: '单点位移',
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: y
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
      <div className={style['single-point-chart']}></div>
    )
  }
}