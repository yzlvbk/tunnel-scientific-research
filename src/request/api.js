import http from './http'

/* 大堤3D实时数据 */
export const reqLeveeTimeTransform = () => http('/levee/Get3D', {}, 'GET')