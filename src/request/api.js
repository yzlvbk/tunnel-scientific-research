import http from './http'

/* 大堤3D实时数据 */
export const reqLeveeTimeTransform = () => http('/levee/Get3D', {}, 'GET')

/* 大堤实时测点数据 */
export const reqLeveeTimeMaxDispTable = () => http('/levee/GetMaxDispTable', {}, 'GET')

/* 模型历史数据 */
export const reqLevee3DHistory = (startTime, endTime) => http('/levee/Get3DHistory', { startTime, endTime }, 'GET')

/* 历史数据最大位移 */
export const reqLeveeHistoryMaxDisp = (startTime, endTime) => http('/levee/GetHistoryMaxDisp', { startTime, endTime }, 'GET')

/* 历史数据单个测点数据 */
export const reqLeveeHistorySingle = (startTime, endTime, length) => http('/levee/GetHistorySingle', { startTime, endTime, length }, 'GET')


