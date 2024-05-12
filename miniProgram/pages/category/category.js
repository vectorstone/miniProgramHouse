import { reqCategoryData } from '../../api/category'
Page({
  data: {
    categoryList: [], // 商品分类的列表数据
    activeIndex: 0 // 被激活那一项的索引
  },
  async getCategoryData() {
    const res = await reqCategoryData()
    // console.log(res)
    if (res.code === 200) {
      this.setData({
        categoryList: res.data
      })
    }
  },
  updateActive(event) {
    console.log(event)
    const { index } = event.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },
  onLoad() {
    this.getCategoryData()
  }
})
