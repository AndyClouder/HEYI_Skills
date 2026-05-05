// 详情页
const { getSkillByCode } = require('../../utils/cloud.js')

const app = getApp()

Page({
  data: {
    code: '',
    skill: {},
    isFavorited: false,
    dharmaExpanded: false,
    loading: true
  },

  async onLoad(options) {
    const code = options.code
    wx.showLoading({ title: '读取中', mask: true })
    try {
      const skill = await getSkillByCode(code)
      if (!skill) {
        wx.hideLoading()
        wx.showToast({ title: '未见此技', icon: 'none' })
        setTimeout(() => wx.navigateBack(), 1200)
        return
      }
      const isFavorited = await app.isFavorited(code)
      this.setData({ code, skill, isFavorited, loading: false })
      wx.setNavigationBarTitle({ title: `${skill.gate} · ${skill.no}` })
    } catch (err) {
      console.error(err)
      wx.hideLoading()
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
    wx.hideLoading()
  },

  async onShow() {
    if (this.data.code) {
      const isFavorited = await app.isFavorited(this.data.code)
      this.setData({ isFavorited })
    }
  },

  toggleDharma() {
    this.setData({ dharmaExpanded: !this.data.dharmaExpanded })
  },

  async toggleFavorite() {
    const { code } = this.data
    const result = await app.toggleFavorite(code)
    this.setData({ isFavorited: result })
    wx.showToast({
      title: result ? '已藏' : '已散',
      icon: 'none',
      duration: 1200
    })
  },

  onTryTap() {
    const { skill } = this.data
    const command = `skillhub install ${skill.techName}`
    const guide = `第一步：安装 SkillHub\nnpm install -g @skillhub/skills\n\n第二步：安装此技能\n${command}\n\n在 OpenClaw / Claude Code 中运行即可。`
    wx.showModal({
      title: '试一试 · 安装指令',
      content: guide,
      confirmText: '复制命令',
      cancelText: '关闭',
      confirmColor: '#9c3a2a',
      success: (r) => {
        if (r.confirm) {
          wx.setClipboardData({
            data: command,
            success: () => wx.showToast({ title: '已 复 制', icon: 'none' })
          })
        }
      }
    })
  },

  onShareAppMessage() {
    const s = this.data.skill
    return { title: `${s.name} · 合一 Skills`, path: `/pages/detail/detail?code=${s.code}` }
  }
})
