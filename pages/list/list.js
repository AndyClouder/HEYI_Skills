// 合一 Skills - 列表页逻辑
import { gates } from '../../utils/data.js'
import { getSkills } from '../../utils/cloud.js'

const app = getApp()

Page({
  data: {
    mode: 'gate', // gate 或 search
    gates: [],
    currentGate: '',
    gateInfo: {},
    keyword: '',
    searchFocus: false,
    filteredSkills: [],
    allSkills: [],
    total: 0,
    sourceLabels: {
      skillhub: 'SkillHub 精选',
      custom: '自制'
    },
    loading: true
  },

  async onLoad(options) {
    wx.showLoading({ title: '加载中...' })

    try {
      // 从云数据库获取所有技能
      const allSkills = await getSkills()

      // 计算每个门的技能数量
      const gatesWithCount = gates.map(g => ({
        ...g,
        count: allSkills.filter(s => s.gate === g.id).length
      }))

      this.setData({
        gates: gatesWithCount,
        allSkills,
        total: allSkills.length,
        loading: false
      })

      // 根据参数初始化
      if (options.mode === 'search') {
        this.setData({
          mode: 'search',
          searchFocus: true,
          keyword: options.keyword || ''
        })
        if (options.keyword) {
          this.performSearch(options.keyword)
        } else {
          this.setData({ filteredSkills: allSkills })
        }
      } else if (options.gate) {
        this.setData({
          mode: 'gate',
          currentGate: options.gate
        })
        this.filterByGate(options.gate)
      } else {
        // 默认显示全部
        this.setData({
          filteredSkills: allSkills
        })
      }
    } catch (err) {
      console.error('加载失败', err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      this.setData({ loading: false })
    }

    wx.hideLoading()
  },

  // 按六门筛选
  filterByGate(gateId) {
    if (!gateId) {
      this.setData({
        filteredSkills: this.data.allSkills,
        gateInfo: {}
      })
      return
    }

    const gateInfo = gates.find(g => g.id === gateId)
    const filteredSkills = this.data.allSkills.filter(s => s.gate === gateId)

    this.setData({
      filteredSkills,
      gateInfo
    })
  },

  // 执行搜索
  performSearch(keyword) {
    if (!keyword.trim()) {
      this.setData({ filteredSkills: this.data.allSkills })
      return
    }

    const filtered = this.data.allSkills.filter(s => {
      const searchIn = [
        s.name,
        s.desc,
        s.gate,
        s.techName || ''
      ].join(' ').toLowerCase()

      return searchIn.includes(keyword.toLowerCase())
    })

    this.setData({
      filteredSkills: filtered
    })
  },

  // 点击筛选 Chip
  onGateFilter(e) {
    const gate = e.currentTarget.dataset.gate
    this.setData({
      currentGate: gate,
      keyword: ''
    })

    if (gate) {
      this.filterByGate(gate)
    } else {
      this.setData({
        filteredSkills: this.data.allSkills,
        gateInfo: {}
      })
    }
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ keyword })

    if (keyword.trim()) {
      this.performSearch(keyword)
    } else {
      this.setData({ filteredSkills: this.data.allSkills })
    }
  },

  // 搜索确认
  onSearchConfirm(e) {
    const keyword = e.detail.value
    this.performSearch(keyword)
  },

  // 清除搜索
  onSearchClear() {
    this.setData({
      keyword: '',
      filteredSkills: this.data.currentGate
        ? this.data.allSkills.filter(s => s.gate === this.data.currentGate)
        : this.data.allSkills
    })
  },

  // 点击技能卡片
  async onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    await app.addHistory(code)

    wx.navigateTo({
      url: `/pages/detail/detail?code=${code}`
    })
  }
})
