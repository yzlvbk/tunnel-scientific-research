/* 封装axios请求函数模块 */
import axios from 'axios'
import { message } from 'antd'

// 开发环境
const defaultUrl = 'http://118.190.216.205:8008/api/leveescience' //默认url
const tunnelUrl = 'http://118.190.216.205:80/tunnel_service' // 隧道url

// 生产环境
// const baseUrl = ''

//isTunnelUrl 代表是否为隧道url
export default function http(url, data = {}, type = 'GET', isTunnelUrl = false) {
  const baseUrl = isTunnelUrl ? tunnelUrl : defaultUrl
  return new Promise((resolve, reject) => {
    let promise

    // 1.执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get((baseUrl + url), {
        params: data // 指定请求参数
      })
    }

    if (type === 'POST') {
      promise = axios.post((baseUrl + url), data)
    }

    promise.then(response => {
      // 2.如果成功了，调用resolve
      resolve(response.data)
    }).catch(() => {
      // 3.如果失败了，不调用reject，而是显示异常信息
      message.error('请求数据失败!')
      return false
    })
  })
}