// 导入封装的网络请求模块实例
import http from '../utils/http'

// /goods/list/{page}/{limit}
/**
 * @description 获取上别列表数据
 * @param {Object} param {page, limit,category1Id,category2Id}
 * @returns Promise
 */
export const reqGetGoodsList = ({ page, limit, ...data }) => {
  return http.get(`/goods/list/${page}/${limit}`, data)
}

/**
 * 获取商品详情
 * @param {*} goodsId
 * @returns Promise
 */
// /goods/{goodsId}
export const reqGetGoodsDetail = (goodsId) => {
  return http.get(`/goods/${goodsId}`)
}
