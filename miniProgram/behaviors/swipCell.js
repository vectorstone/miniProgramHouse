export const swipeCellBehavior = Behavior({
  // 页面的初始数据
  data: {
    swipeCellQueue: [] // 用来存储滑动单元格实例
  },

  methods: {
    // onSwipeCellClick onSwipeCellPage 这两个方法的作用时,当用户点击页面空白的地方或者点击滑块的时候都执行对应的方法
    // 里面执行的是关闭滑动单元格的逻辑

    // 给页面绑定点击事件
    onSwipeCellPage() {
      this.onSwipeCellCommonClick()
    },

    // 单击滑动单元格时触发的事件
    onSwipeCellClick() {
      this.onSwipeCellCommonClick()
    },

    // 关掉滑块统一的逻辑
    onSwipeCellCommonClick() {
      // 需要对单元格实例数组进行遍历,遍历以后获取每一个实例,让每一个实例调用close方法即可
      this.data.swipeCellQueue.forEach((instance) => {
        instance.close()
      })

      // 将滑动单元格数组重置为空
      this.data.swipeCellQueue = []
    },

    // 当用户打开滑块时触发
    swipeCellOpen(event) {
      console.log(event)
      // 获取删除swipe的id
      const { id } = event.target
      // 获取单元格实例
      const instance = this.selectComponent(`#${id}`)
      this.data.swipeCellQueue.push(instance)
    }
  }
})
