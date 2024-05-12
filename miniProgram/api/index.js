// 导入封装的网络请求模块实例
import http from '../utils/http'

/**
 * @description 获取首页的轮播图数据
 */
// export const reqSwiperData = () => {
//   return http.get('/index/findBanner')
// }
// 也可以简写成下面的样子,有点像lambda表达式的简写
// export const reqSwiperData = () => http.get('/index/findBanner')

export const getHouseList = (pageNum, pageSize) => {
  return http.post(`/admin/house/${pageNum}/${pageSize}`)
}

// 获取首页数据
export const reqIndexData = () => {
  // 方式1: 通过promise原生的api
  // return Promise.all([
  //   http.get('/index/findBanner'),
  //   http.get('/index/findCategory1'),
  //   http.get('/index/advertisement'),
  //   http.get('/index/findListGoods'),
  //   http.get('/index/findRecommendGoods')
  // ])

  // 方式2: 通过自己封装的并发all方法来
  return http.all(
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
  )
}
