// 己 · 我的修习
const { gates } = require('../../utils/data.js')
const { getSkills, getHistorySkills, getCustomSkills } = require('../../utils/cloud.js')

const GATE_EN = { '观':'observe','思':'reflect','书':'compose','造':'create','行':'execute','和':'harmonize' }
const DIARY_KEY = 'heyi_today_diary'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
}
function dateStr() {
  const d = new Date()
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  return `${d.getFullYear()} · ${mm} · ${dd}`
}

Page({
  data: {
    gateProgress: [],
    customSkills: [],
    diary: '',
    diaryDateStr: dateStr()
  },

  async onLoad() {
    const stored = wx.getStorageSync(DIARY_KEY)
    if (stored && stored.key === todayKey()) {
      this.setData({ diary: stored.text || '' })
    }
    await this.refresh()
  },

  async onShow() { await this.refresh() },

  async refresh() {
    try {
      const [allSkills, history, customSkills] = await Promise.all([
        getSkills(),
        getHistorySkills(),
        typeof getCustomSkills === 'function' ? getCustomSkills() : Promise.resolve([])
      ])

      const usedCodes = new Set((history || []).map(h => h.code))
      const gateProgress = gates.map(g => {
        const total = (allSkills || []).filter(s => s.gate === g.id).length
        const used = (allSkills || []).filter(s => s.gate === g.id && usedCodes.has(s.code)).length
        return {
          id: g.id,
          en: GATE_EN[g.id] || '',
          total,
          used,
          percent: total ? Math.round(used * 100 / total) : 0
        }
      })

      this.setData({ gateProgress, customSkills: customSkills || [] })
    } catch (err) {
      console.error(err)
    }
  },

  onDiaryInput(e) {
    this.setData({ diary: e.detail.value })
  },
  onDiarySave() {
    wx.setStorageSync(DIARY_KEY, { key: todayKey(), text: this.data.diary })
  },

  onUploadTap() {
    wx.showModal({
      title: '上传自制之技',
      content: '此功能开发中。你可以在合一公众号留言 "投稿"，或等待下一版。',
      confirmText: '知道了',
      showCancel: false,
      confirmColor: '#9c3a2a'
    })
  },
  onViewSkill(e) {
    const s = e.currentTarget.dataset.skill
    if (s && s.code) {
      wx.navigateTo({ url: `/pages/detail/detail?code=${s.code}` })
    }
  },
  onEditSkill() {
    wx.showToast({ title: '编辑功能开发中', icon: 'none' })
  },
  async onDeleteSkill(e) {
    const s = e.currentTarget.dataset.skill
    const r = await new Promise(res => wx.showModal({
      title: '删除此技?',
      content: `"${s.name}" 将从你的自制之技中散去`,
      confirmText: '删',
      cancelText: '不了',
      confirmColor: '#9c3a2a',
      success: res
    }))
    if (r.confirm) {
      wx.showToast({ title: '删除功能开发中', icon: 'none' })
    }
  }
})
