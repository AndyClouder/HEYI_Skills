// 合一 Skills · 主入口
// 引入云数据库操作
const { getOpenId, getUserData, addHistory: addHistoryToCloud, toggleFavorite: toggleFavoriteInCloud } = require('./utils/cloud.js')

App({
  globalData: {
    userInfo: null,
    history: [],
    favorites: [],
    cloudReady: false
  },

  async onLaunch() {
    // 初始化云开发
    try {
      if (wx.cloud) {
        wx.cloud.init({
          env: 'default',
          traceUser: true
        })
        this.globalData.cloudReady = true

        // 从云数据库同步用户数据
        await this.syncUserData()
      }
    } catch (e) {
      console.error('云开发初始化失败', e)
    }

    // 检查本地存储（降级方案）
    if (!this.globalData.history.length) {
      this.globalData.history = wx.getStorageSync('heyi_history') || []
    }
    if (!this.globalData.favorites.length) {
      this.globalData.favorites = wx.getStorageSync('heyi_favorites') || []
    }
  },

  // 同步用户数据
  async syncUserData() {
    try {
      const { getUserData } = require('./utils/cloud.js')
      const userData = await getUserData()

      // 处理历史记录格式
      const history = (userData.history || []).map(h => typeof h === 'string' ? h : h.code)
      const favorites = userData.favorites || []

      this.globalData.history = history
      this.globalData.favorites = favorites

      // 同步到本地存储
      wx.setStorageSync('heyi_history', history)
      wx.setStorageSync('heyi_favorites', favorites)
    } catch (e) {
      console.error('同步用户数据失败', e)
    }
  },

  // 添加浏览历史
  async addHistory(code) {
    try {
      // 更新内存数据
      const history = this.globalData.history || []
      const idx = history.indexOf(code)
      if (idx > -1) history.splice(idx, 1)
      history.unshift(code)
      if (history.length > 50) history.pop()
      this.globalData.history = history

      // 保存到本地存储
      wx.setStorageSync('heyi_history', history)

      // 同步到云数据库
      if (this.globalData.cloudReady) {
        const { addHistory } = require('./utils/cloud.js')
        await addHistory(code)
      }
    } catch (e) {
      console.error('添加历史失败', e)
    }
  },

  // 切换收藏状态
  async toggleFavorite(code) {
    try {
      let favorites = this.globalData.favorites || []
      const idx = favorites.indexOf(code)
      const isFavorited = idx >= 0

      if (isFavorited) {
        favorites.splice(idx, 1)
      } else {
        favorites.unshift(code)
      }

      this.globalData.favorites = favorites
      wx.setStorageSync('heyi_favorites', favorites)

      // 同步到云数据库
      if (this.globalData.cloudReady) {
        const { toggleFavorite } = require('./utils/cloud.js')
        await toggleFavorite(code)
        // 切换后状态可能需要反转，因为云数据库也做了切换
        // 但由于我们已经在本地做了切换，所以云数据库的状态应该与本地一致
      }

      return !isFavorited
    } catch (e) {
      console.error('切换收藏失败', e)
      return false
    }
  },

  // 检查是否收藏
  isFavorited(code) {
    return (this.globalData.favorites || []).includes(code)
  },

  // 获取浏览历史
  getHistory() {
    return this.globalData.history || []
  },

  // 获取收藏列表
  getFavorites() {
    return this.globalData.favorites || []
  }
})
