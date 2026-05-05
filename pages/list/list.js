// 列表页
const { gates } = require('../../utils/data.js')
const { getSkills } = require('../../utils/cloud.js')

const app = getApp()

const GATE_EXT = {
  '观': { roman: 'i'   },
  '思': { roman: 'ii'  },
  '书': { roman: 'iii' },
  '造': { roman: 'iv'  },
  '行': { roman: 'v'   },
  '和': { roman: 'vi'  },
}

Page({
  data: {
    gates: [],
    currentGate: '',
    gateInfo: {},
    allSkills: [],
    filteredSkills: [],
    total: 0,
    loading: true
  },

  async onLoad(options) {
    wx.showLoading({ title: '读取中', mask: true })
    try {
      const allSkills = await getSkills()
      const gatesWithCount = gates.map(g => ({
        ...g,
        ...GATE_EXT[g.id],
        count: allSkills.filter(s => s.gate === g.id).length
      }))

      this.setData({
        gates: gatesWithCount,
        allSkills,
        total: allSkills.length,
        loading: false
      })

      if (options.gate) {
        this.applyGate(options.gate)
      } else {
        this.setData({ filteredSkills: allSkills })
      }
    } catch (err) {
      console.error(err)
      wx.showToast({ title: '加载失败', icon: 'none' })
      this.setData({ loading: false })
    }
    wx.hideLoading()
  },

  applyGate(gateId) {
    if (!gateId) {
      this.setData({ currentGate: '', gateInfo: {}, filteredSkills: this.data.allSkills })
      wx.setNavigationBarTitle({ title: '全部技能' })
      return
    }
    const gateInfo = this.data.gates.find(g => g.id === gateId) || {}
    const filteredSkills = this.data.allSkills.filter(s => s.gate === gateId)
    this.setData({ currentGate: gateId, gateInfo, filteredSkills })
    wx.setNavigationBarTitle({ title: `${gateId}门` })
  },

  onGateFilter(e) {
    this.applyGate(e.currentTarget.dataset.gate)
  },

  async onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    await app.addHistory(code)
    wx.navigateTo({ url: `/pages/detail/detail?code=${code}` })
  }
})
