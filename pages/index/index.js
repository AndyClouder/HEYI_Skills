// 合一 Skills - 首页逻辑
import { gates, searchSuggestions } from '../../utils/data.js'
import { getSkills, getHistorySkills, getFavoriteSkills } from '../../utils/cloud.js'

const app = getApp()

Page({
  data: {
    gates: [],
    searchSuggestions: [],
    hotSkills: [],
    historySkills: [],
    favoriteSkills: [],
    totalSkills: 0,
    customSkillsCount: 0,
    loading: true
  },

  async onLoad() {
    wx.showLoading({ title: '加载中...' })

    try {
      // 从云数据库获取所有技能
      const allSkills = await getSkills()

      // 为六门添加技能数量
      const gatesWithCount = gates.map(gate => ({
        ...gate,
        count: allSkills.filter(s => s.gate === gate.id).length
      }))

      // 热门技能（精选技能中按安装量排序）
      const hotSkills = allSkills
        .filter(s => s.source === 'skillhub' && s.installs)
        .sort((a, b) => {
          const getInstallNum = (s) => {
            if (!s.installs) return 0
            const num = parseFloat(s.installs.replace('万', ''))
            return s.installs.includes('万') ? num * 10000 : num
          }
          return getInstallNum(b) - getInstallNum(a)
        })
        .slice(0, 5)
        .map((s, i) => ({ ...s, rank: i + 1 }))

      // 获取历史技能和收藏技能
      const [historySkills, favoriteSkills] = await Promise.all([
        getHistorySkills(),
        getFavoriteSkills()
      ])

      const customCount = allSkills.filter(s => s.source === 'custom').length

      this.setData({
        gates: gatesWithCount,
        searchSuggestions,
        hotSkills,
        historySkills,
        favoriteSkills,
        totalSkills: allSkills.length,
        customSkillsCount: customCount,
        loading: false
      })
    } catch (err) {
      console.error('加载失败', err)
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
      this.setData({ loading: false })
    }

    wx.hideLoading()
  },

  async onShow() {
    // 每次显示时刷新数据
    if (this.data.totalSkills > 0) {
      this.refreshData()
    }
  },

  async refreshData() {
    try {
      const allSkills = await getSkills()

      const [historySkills, favoriteSkills] = await Promise.all([
        getHistorySkills(),
        getFavoriteSkills()
      ])

      const gatesWithCount = gates.map(gate => ({
        ...gate,
        count: allSkills.filter(s => s.gate === gate.id).length
      }))

      this.setData({
        historySkills,
        favoriteSkills,
        gates: gatesWithCount
      })
    } catch (err) {
      console.error('刷新失败', err)
    }
  },

  // 点击搜索框
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/list/list?mode=search'
    })
  },

  // 点击搜索建议
  onSuggestionTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: `/pages/list/list?mode=search&keyword=${keyword}`
    })
  },

  // 点击六门
  onGateTap(e) {
    const gate = e.currentTarget.dataset.gate
    wx.navigateTo({
      url: `/pages/list/list?mode=gate&gate=${gate}`
    })
  },

  // 点击技能
  onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    this.navigateToDetail(code)
  },

  // 跳转详情页
  navigateToDetail(code) {
    // 记录历史
    app.addHistory(code)

    wx.navigateTo({
      url: `/pages/detail/detail?code=${code}`
    })
  }
})
