import * as React from 'react'
import * as echarts from 'echarts'
import { connect } from 'react-redux'
import { reqConvergentDeformationTime, reqConvergentDeformationPipe } from '../../../../request/api'

export interface IConvergenceTransformTimeChartProps {
  transformDate: string[],
  selectLoop: string
}

class ConvergenceTransformTimeChart extends React.Component<IConvergenceTransformTimeChartProps> {
  myChart: any

  public resizeChart = () => {
    this.myChart.resize()
  }

  public componentDidMount() {
    this.startDrawChart()
  }

  public componentDidUpdate() {
    this.startDrawChart()
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public startDrawChart = async () => {
    const { transformDate, selectLoop } = this.props

    const data = await reqConvergentDeformationTime(selectLoop, transformDate[0], transformDate[1])
    if (data.data.length === 0) return
    this.drawConvergenceTransformTimeChart(data.data)
  }

  public drawConvergenceTransformTimeChart = (data: any) => {
    // 定义颜色
    var fontColor = "#1890ff"
    var lineColor = "#CACACA"

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector('.convergence-transform-time-chart'))

    // 2.配置option
    const option = {
      color: ['#333'], // 线条颜色
      title: {
        text: '大堤实时沉降图',
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
        name: '时间',
        axisLine: { //坐标轴轴线相关设置
          lineStyle: {
            color: fontColor
          }
        }
      },
      yAxis: [{
        name: '变形(mm)',
        type: 'value',
        splitNumber: 5,
        min: -30,
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
        type: 'line',
        symbol: 'emptyCircle', // 标记形状
        lineStyle: {
          width: 1
        },
        data: data
      }
      ]
    };

    // 3.将配置项给实例
    // @ts-ignore
    this.myChart.setOption(option, true)

    // 4.响应式变化
    window.addEventListener('resize', this.resizeChart)

    // 立即执行resize，否则刷新页面，echarts宽度多出200px
    setTimeout(() => {
      this.myChart.resize()
    }, 100)

    // 注册点击echarts事件
    this.myChart.on('click', (params: any) => {
      this.clickEchartReqAnalyse(params.value[0])
    })
  }

  // 点击echart请求收敛分析图数据
  public clickEchartReqAnalyse = async (startTime: string) => {
    const { selectLoop } = this.props
    // 存储数据至react-redux
    // @ts-ignore
    this.props.dispatch(async (dispatch) => {
      const data = await reqConvergentDeformationPipe(selectLoop, startTime)
      if (data.data.length === 0) return
      dispatch({ type: 'saveTransformData', payload: data.data })
    })
  }

  public render() {
    return (
      <div style={{ height: 300 }} className="convergence-transform-time-chart">
      </div>
    )
  }
}

export default connect()(ConvergenceTransformTimeChart)
