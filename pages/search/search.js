// 搜索页
const { getSkills } = require('../../utils/cloud.js')
const { searchSuggestions } = require('../../utils/data.js')

const app = getApp()
const RECENT_KEY = 'heyi_recent_search'

function highlight(name, kw) {
  if (!kw) return [{ text: name, hit: false }]
  const parts = []
  const lower = name.toLowerCase()
  const kwLower = kw.toLowerCase()
  let i = 0
  while (i < name.length) {
    const idx = lower.indexOf(kwLower, i)
    if (idx === -1) { parts.push({ text: name.slice(i), hit: false }); break }
    if (idx > i) parts.push({ text: name.slice(i, idx), hit: false })
    parts.push({ text: name.slice(idx, idx + kw.length), hit: true })
    i = idx + kw.length
  }
  return parts
}

Page({
  data: {
    keyword: '',
    suggestions: searchSuggestions || [],
    recent: [],
    allSkills: [],
    results: []
  },

  async onLoad() {
    this.setData({
      recent: wx.getStorageSync(RECENT_KEY) || []
    })
    try {
      const allSkills = await getSkills()
      this.setData({ allSkills })
    } catch (err) {
      console.error(err)
    }
  },

  onInput(e) {
    const kw = e.detail.value
    this.setData({ keyword: kw })
    this.search(kw)
  },

  onConfirm(e) {
    const kw = (e.detail.value || '').trim()
    if (!kw) return
    this.saveRecent(kw)
    this.search(kw)
  },

  onClear() {
    this.setData({ keyword: '', results: [] })
  },

  onTag(e) {
    const kw = e.currentTarget.dataset.k
    this.setData({ keyword: kw })
    this.saveRecent(kw)
    this.search(kw)
  },

  saveRecent(kw) {
    let recent = wx.getStorageSync(RECENT_KEY) || []
    recent = [kw, ...recent.filter(x => x !== kw)].slice(0, 8)
    wx.setStorageSync(RECENT_KEY, recent)
    this.setData({ recent })
  },

  clearRecent() {
    wx.removeStorageSync(RECENT_KEY)
    this.setData({ recent: [] })
  },

  search(kw) {
    kw = (kw || '').trim()
    if (!kw) { this.setData({ results: [] }); return }
    const all = this.data.allSkills || []
    const lower = kw.toLowerCase()
    const results = all.filter(s => {
      const hay = [s.name, s.desc, s.gate, s.techName || '', s.code || ''].join(' ').toLowerCase()
      return hay.includes(lower)
    }).map(s => ({
      ...s,
      _nameParts: highlight(s.name, kw)
    }))
    this.setData({ results })
  },

  async onTap(e) {
    const code = e.currentTarget.dataset.code
    await app.addHistory(code)
    wx.navigateTo({ url: `/pages/detail/detail?code=${code}` })
  }
})
