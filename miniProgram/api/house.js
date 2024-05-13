// 导入封装的网络请求模块实例
import http from '../utils/http'

export const getHouseDetail = (houseId) => {
  return http.post(`/admin/house/${houseId}`)
}