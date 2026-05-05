// 首页
const { gates, searchSuggestions } = require('../../utils/data.js')
const { getSkills, getHistorySkills, getFavoriteSkills } = require('../../utils/cloud.js')

const app = getApp()

// 六门短描述
const GATE_EXT = {
  '观': { roman: 'i', shortDesc: '看见 · 读取 · 摄入' },
  '思': { roman: 'ii', shortDesc: '向内 · 复盘 · 提问' },
  '书': { roman: 'iii', shortDesc: '成文 · 表达 · 字里' },
  '造': { roman: 'iv', shortDesc: '造物 · 视觉 · 成品' },
  '行': { roman: 'v', shortDesc: '落地 · 自动 · 成事' },
  '和': { roman: 'vi', shortDesc: '节奏 · 连接 · 同行' },
}

// 每日一念（50 条轮转）
const QUOTES = [
  { text: '为学日益，为道日损。', from: '老子' },
  { text: '工欲善其事，必先利其器。', from: '论语' },
  { text: '合抱之木，生于毫末。', from: '老子' },
  { text: '不积跬步，无以至千里。', from: '荀子' },
  { text: '道生一，一生二，二生三。', from: '老子' },
  { text: '知者不言，言者不知。', from: '老子' },
  { text: '博观而约取，厚积而薄发。', from: '苏轼' },
  { text: '事了拂衣去，深藏身与名。', from: '李白' },
  { text: '一日不见，如三秋兮。', from: '诗经' },
  { text: '温故而知新，可以为师矣。', from: '论语' },
  { text: '学而时习之，不亦说乎。', from: '论语' },
  { text: '大巧若拙，大辩若讷。', from: '老子' },
  { text: '无为而无不为。', from: '老子' },
  { text: '反者道之动，弱者道之用。', from: '老子' },
  { text: '致虚极，守静笃。', from: '老子' },
  { text: '心斋坐忘。', from: '庄子' },
  { text: '庖丁解牛，游刃有余。', from: '庄子' },
  { text: '上善若水。', from: '老子' },
  { text: '曲则全，枉则直。', from: '老子' },
  { text: '千里之行，始于足下。', from: '老子' },
  { text: '吾生也有涯，而知也无涯。', from: '庄子' },
  { text: '见素抱朴，少私寡欲。', from: '老子' },
  { text: '和光同尘。', from: '老子' },
  { text: '日新月异，其命维新。', from: '诗经' },
  { text: '既明且哲，以保其身。', from: '诗经' },
  { text: '他山之石，可以攻玉。', from: '诗经' },
  { text: '知止而后有定。', from: '大学' },
  { text: '格物致知，诚意正心。', from: '大学' },
  { text: '苟日新，日日新，又日新。', from: '大学' },
  { text: '君子不器。', from: '论语' },
  { text: '欲速则不达。', from: '论语' },
  { text: '三人行，必有我师焉。', from: '论语' },
  { text: '敏而好学，不耻下问。', from: '论语' },
  { text: '君子和而不同。', from: '论语' },
  { text: '君子喻于义，小人喻于利。', from: '论语' },
  { text: '行己有耻。', from: '论语' },
  { text: '己所不欲，勿施于人。', from: '论语' },
  { text: '有朋自远方来，不亦乐乎。', from: '论语' },
  { text: '知之为知之，不知为不知。', from: '论语' },
  { text: '文质彬彬，然后君子。', from: '论语' },
  { text: '慎独。', from: '中庸' },
  { text: '物有本末，事有终始。', from: '大学' },
  { text: '凡事豫则立，不豫则废。', from: '中庸' },
  { text: '君子务本，本立而道生。', from: '论语' },
  { text: '如切如磋，如琢如磨。', from: '诗经' },
  { text: '落霞与孤鹜齐飞。', from: '王勃' },
  { text: '独钓寒江雪。', from: '柳宗元' },
  { text: '此中有真意，欲辨已忘言。', from: '陶渊明' },
  { text: '山气日夕佳，飞鸟相与还。', from: '陶渊明' },
  { text: '行到水穷处，坐看云起时。', from: '王维' },
]

function todayQuote() {
  const d = new Date()
  const day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000)
  return QUOTES[day % QUOTES.length]
}

function todayStr() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()} · ${mm} · ${dd}`
}

// 解析安装量数字
function parseInstallNum(installs) {
  if (!installs) return 0
  const num = parseFloat(String(installs).replace('万', '').replace('千', ''))
  if (String(installs).includes('万')) return num * 10000
  if (String(installs).includes('千')) return num * 1000
  return num
}

Page({
  data: {
    gates: [],
    searchSuggestions: [],
    hotSkills: [],
    historySkills: [],
    favoriteSkills: [],
    totalSkills: 0,
    customSkillsCount: 0,
    dailyQuote: {},
    todayStr: '',
    loading: true
  },

  async onLoad() {
    wx.showLoading({ title: '读取中', mask: true })

    try {
      this.setData({
        dailyQuote: todayQuote(),
        todayStr: todayStr()
      })
      await this.loadData()
    } catch (err) {
      console.error('加载失败', err)
      wx.showToast({ title: '加载失败，请重试', icon: 'none' })
      this.setData({ loading: false })
    }

    wx.hideLoading()
  },

  async onShow() {
    // 每次显示时刷新数据
    if (!this.data.loading) {
      this.refreshData()
    }
  },

  async loadData() {
    try {
      // 从云数据库获取所有技能
      const allSkills = await getSkills()

      // 为六门添加技能数量和扩展信息
      const gatesWithCount = gates.map(g => ({
        ...g,
        ...GATE_EXT[g.id],
        count: allSkills.filter(s => s.gate === g.id).length
      }))

      // 热门技能（按安装量排序）
      const hotSkills = allSkills
        .filter(s => s.installs)
        .sort((a, b) => parseInstallNum(b.installs) - parseInstallNum(a.installs))
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
        historySkills: historySkills.slice(0, 6),
        favoriteSkills: favoriteSkills.slice(0, 4),
        totalSkills: allSkills.length,
        customSkillsCount: customCount,
        loading: false
      })
    } catch (err) {
      console.error('加载数据失败', err)
      wx.showToast({ title: '加载失败', icon: 'none' })
      this.setData({ loading: false })
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
        ...GATE_EXT[gate.id],
        count: allSkills.filter(s => s.gate === gate.id).length
      }))

      this.setData({
        historySkills: historySkills.slice(0, 6),
        favoriteSkills: favoriteSkills.slice(0, 4),
        gates: gatesWithCount
      })
    } catch (err) {
      console.error('刷新失败', err)
    }
  },

  // 点击搜索框
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  // 点击搜索建议
  onSuggestionTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: `/pages/search/search?keyword=${keyword}`
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
  async onSkillTap(e) {
    const code = e.currentTarget.dataset.code
    await app.addHistory(code)
    wx.navigateTo({
      url: `/pages/detail/detail?code=${code}`
    })
  }
})
