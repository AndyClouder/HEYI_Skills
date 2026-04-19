// 合一 Skills - 主入口
import { initCloud, toggleFavorite, isFavorited, addHistory as addHistoryToCloud } from './utils/cloud.js'

App({
  globalData: {
    userInfo: null,
    openId: null,
    cloudReady: false
  },

  onLaunch() {
    // 初始化云开发
    this.initCloudEnv()
  },

  // 初始化云开发环境
  async initCloudEnv() {
    try {
      if (wx.cloud) {
        initCloud()
        this.globalData.cloudReady = true

        // 获取用户 OpenID
        const cloud = require('./utils/cloud.js')
        const openId = await cloud.getOpenId()
        this.globalData.openId = openId

        console.log('云开发初始化成功', openId)
      } else {
        console.warn('当前微信版本不支持云开发')
        wx.showToast({
          title: '请更新微信版本',
          icon: 'none'
        })
      }
    } catch (err) {
      console.error('云开发初始化失败', err)
    }
  },

  // 切换收藏（云数据库版本）
  async saveFavorites(skillCode) {
    if (!this.globalData.cloudReady) {
      wx.showToast({
        title: '云开发未就绪',
        icon: 'none'
      })
      return
    }

    try {
      return await toggleFavorite(skillCode)
    } catch (err) {
      console.error('收藏操作失败', err)
      return false
    }
  },

  // 检查是否收藏（云数据库版本）
  async isFavorited(skillCode) {
    if (!this.globalData.cloudReady) {
      return false
    }

    try {
      return await isFavorited(skillCode)
    } catch (err) {
      console.error('检查收藏失败', err)
      return false
    }
  },

  // 添加使用历史（云数据库版本）
  async addHistory(skillCode) {
    if (!this.globalData.cloudReady) {
      return
    }

    try {
      await addHistoryToCloud(skillCode)
    } catch (err) {
      console.error('添加历史失败', err)
    }
  }
})
