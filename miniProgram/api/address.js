// 导入封装的网络请求模块实例
import http from '@/utils/http'

/**
 * @description 新增收货地址
 * @param {*} address
 * @returns Promise
 */
export const reqAddAddress = (address) => {
  return http.post('/userAddress/save', address)
}

/**
 * @description 获取收获地址列表
 * @returns Promise
 */
// get /userAddress/findUserAddress 获取收获地址列表
export const reqGetAddressList = () => {
  return http.get('/userAddress/findUserAddress')
}

/**
 * @description 收货地址详情
 * @param {*} id
 * @returns Promise
 */
// get /userAddress/{id} 收货地址详情
export const reqGetAddressDetail = (id) => {
  return http.get(`/userAddress/${id}`)
}

/**
 * @description 更新收货地址
 * @returns Promise
 */
// post /userAddress/update 更新收货地址
export const reqUpdateAddress = (address) => {
  return http.post('/userAddress/update', address)
}

/**
 * @description 删除收货地址
 * @param {*} id
 * @returns Promise
 */
// get /userAddress/delete/{id} 删除收货地址
export const reqDeleteAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}
