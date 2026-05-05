// 藏 · 收藏
const { getFavoriteSkills, getHistorySkills, getSkills, clearHistory } = require('../../utils/cloud.js')

Page({
  data: {
    favorites: [],
    history: [],
    total: 30
  },

  async onLoad() {
    await this.refresh()
  },

  async onShow() {
    await this.refresh()
  },

  async refresh() {
    try {
      const [favorites, history, allSkills] = await Promise.all([
        getFavoriteSkills(),
        getHistorySkills(),
        getSkills()
      ])
      this.setData({
        favorites: favorites || [],
        history: (history || []).slice(0, 8),
        total: (allSkills || []).length
      })
    } catch (err) {
      console.error(err)
    }
  },

  onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    wx.navigateTo({ url: `/pages/detail/detail?code=${code}` })
  },

  async onClearHistory() {
    const r = await new Promise(res => wx.showModal({
      title: '清空近日所行?',
      content: '记录将一并散去，技不会消失',
      confirmText: '清空',
      cancelText: '不了',
      confirmColor: '#9c3a2a',
      success: res
    }))
    if (r.confirm) {
      try {
        if (typeof clearHistory === 'function') await clearHistory()
        this.setData({ history: [] })
        wx.showToast({ title: '已 清 空', icon: 'none' })
      } catch (err) { console.error(err) }
    }
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
