import * as React from 'react'
import * as echarts from 'echarts'
import { connect } from 'react-redux'
import style from '../../style/index.module.less'

export interface IConvergenceTransformChartProps {
  transformReducer: any
}

class ConvergenceTransformChart extends React.Component<IConvergenceTransformChartProps> {
  myChart: any

  public componentDidMount() {
    this.drawConvergenceTransformChart()
  }

  public componentDidUpdate() {
    this.drawConvergenceTransformChart()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart)
  }

  public resizeChart = () => {
    this.myChart.resize()
  }

  public drawConvergenceTransformChart = () => {
    const { transformReducer } = this.props

    // 定义折线图数据
    const dataX = []
    const dataX2 = []
    for (let i = 0; i <= 360; i++) {
      dataX.push([0, i])
      // 调换位置
      transformReducer[i] && dataX2.push([transformReducer[i][1], transformReducer[i][0]])
    }

    // 定义颜色
    const lineColor = '#999'
    const fontColor = "rgb(44, 118, 114)"

    // 1.初始化echarts
    // @ts-ignore
    this.myChart = echarts.init(document.querySelector(`.${style['convergence-transform-chart']}`))

    // 2.配置option
    const option = {
      polar: {
        radius: 140
      },
      angleAxis: {
        clockwise: false, // 逆时针
        startAngle: 0, // 起始角度
        axisLine: {
          show: false,
          lineStyle: {
            color: lineColor
          }
        },
        axisLabel: {
          color: lineColor,
          formatter: '{value}°'
        },
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        },
        min: 0,
        max: 360,
        interval: 90,
        splitNumber: 4
      },
      radiusAxis: {
        min: -60, // 可变
        max: 40, // 可变
        splitNumber: 1,
        axisLabel: {
          color: fontColor
        },
        axisLine: {
          onZero: false
        },
        name: "",
        nameTextStyle: {
          color: fontColor,
          fontSize: 14
        },
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        }
      },
      tooltip: {
        axisPointer: {
          type: 'none'
        },
        trigger: 'axis',
        formatter: function (params: any) {
          return '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
            'red' +
            // eslint-disable-next-line no-useless-concat
            ';margin-right: 5px;border-radius: 50%;}"></i>' + '<br />' +
            // eslint-disable-next-line no-useless-concat
            '角度:' + params[0].value[1] + '°' + '<br />' +
            '测点值:' + params[0].value[0]
        }
      },
      dataZoom: [
        // x轴滚动条
        {
          show: false,
          type: "slider",
          height: 18, //滚动条高度
          start: 30, //开始位置
          end: 80, //结束位置
          radiusAxisIndex: 0,
          realtime: true, //实时显示
          handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "100%",
          handleStyle: {
            color: lineColor
          },
          textStyle: {
            color: fontColor //滚动条数字颜色
          },
          fillerColor: fontColor, //选中范围的填充颜色
          borderColor: lineColor, //边框颜色
          // backgroundColor: "", //两边未选中的滑动条区域的颜色
          showDataShadow: false, //是否显示数据阴影 默认auto
          showDetail: true, //即拖拽时候是否显示详细数值信息 默认true
          // handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
        }
      ],
      series: [{
        coordinateSystem: 'polar',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: '#9999CC',
          width: 15
        },
        data: dataX,
        tooltip: {
          show: false
        }
      },
      // {
      //     coordinateSystem: 'polar',
      //     type: 'line',
      //     areaStyle: {
      //         color: 'blue'
      //     },
      //     smooth: true,
      //     showSymbol: false,
      //     lineStyle: {
      //         color: 'red'
      //     },
      //     data: dataX,
      //     markLine: {
      //         symbolSize: 4,
      //         lineStyle: {
      //             color: 'yellow',
      //             type: 'solid'
      //         },
      //         symbol: ['', 'arrow'],

      //     }
      // },
      {
        coordinateSystem: 'polar',
        type: 'line',
        name: 'displace',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'red'
        },
        data: dataX2
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
    }, 100);
  }

  public render() {
    return (
      <div className={style["convergence-transform-chart"]}></div>
    );
  }
}

export default connect(
  // @ts-ignore
  ({ transformReducer }) => ({ transformReducer })
)(ConvergenceTransformChart)
