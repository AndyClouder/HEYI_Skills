// 合一 Skills - 收藏页逻辑
import { getFavoriteSkills, getHistorySkills, clearHistory } from '../../utils/cloud.js'
import { getUserData } from '../../utils/cloud.js'

const app = getApp()

Page({
  data: {
    favorites: [],
    history: [],
    loading: true
  },

  async onLoad() {
    wx.showLoading({ title: '加载中...' })
    await this.loadData()
    wx.hideLoading()
  },

  async onShow() {
    if (!this.data.loading) {
      await this.loadData()
    }
  },

  async loadData() {
    try {
      const [favorites, history] = await Promise.all([
        getFavoriteSkills(),
        this.getHistoryWithTime()
      ])

      this.setData({
        favorites,
        history,
        loading: false
      })
    } catch (err) {
      console.error('加载失败', err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      this.setData({ loading: false })
    }
  },

  // 获取带时间标签的历史记录
  async getHistoryWithTime() {
    try {
      const userData = await getUserData()
      const historyData = userData.history || []

      if (historyData.length === 0) return []

      // 获取技能信息
      const codes = historyData.map(h => h.code)
      const skills = await getSkills()

      const historyWithSkills = historyData.map((h, index) => {
        const skill = skills.find(s => s.code === h.code)
        if (!skill) return null

        // 计算相对时间
        const time = this.getRelativeTime(h.timestamp)

        return { ...skill, time, timestamp: h.timestamp }
      }).filter(Boolean)

      return historyWithSkills
    } catch (err) {
      console.error('获取历史失败', err)
      return []
    }
  },

  // 计算相对时间
  getRelativeTime(timestamp) {
    if (!timestamp) return '未知'

    const now = new Date().getTime()
    const diff = now - timestamp

    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diff < minute) return '刚刚'
    if (diff < hour) return `${Math.floor(diff / minute)}分钟前`
    if (diff < day) return `${Math.floor(diff / hour)}小时前`
    if (diff < day * 7) return `${Math.floor(diff / day)}天前`

    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}`
  },

  // 清空历史
  async onClearHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有使用历史吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await clearHistory()
            this.setData({ history: [] })
            wx.showToast({
              title: '已清空',
              icon: 'success'
            })
          } catch (err) {
            wx.showToast({
              title: '清空失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: `/pages/detail/detail?code=${code}`
    })
  }
})

// 临时导入（避免循环依赖）
async function getSkills() {
  const cloud = require('../../utils/cloud.js')
  return await cloud.getSkills()
}
