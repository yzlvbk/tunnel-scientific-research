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

/* 传感器信息 */
export const reqSensorDataTable = () => http('/levee/GetSensorDataTable', {}, 'GET')

/* 传感器基本信 */
export const reqSensorInfo = () => http('/levee/GetSensorInfo', {}, 'GET')

/* 收敛变形历史图 */
export const reqConvergentDeformationTime = (pipeId, startTime, endTime) => http('/convergentDeformationTime', { pipeId, startTime, endTime }, 'POST', true)

/* 收敛变形专业图 */
export const reqConvergentDeformationPipe = (pipeId, startTime) => http('/convergentDeformationPipe', { pipeId, startTime }, 'POST', true)