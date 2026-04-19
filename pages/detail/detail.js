// 合一 Skills - 详情页逻辑
import { getSkillByCode } from '../../utils/cloud.js'
import { gates } from '../../utils/data.js'

const app = getApp()

Page({
  data: {
    code: '',
    skill: {},
    sourceLabels: {
      skillhub: 'SkillHub 精选',
      custom: '自制'
    },
    isFavorited: false,
    dharmaExpanded: false,
    loading: true
  },

  async onLoad(options) {
    const code = options.code

    wx.showLoading({ title: '加载中...' })

    try {
      const skill = await getSkillByCode(code)

      if (!skill) {
        wx.hideLoading()
        wx.showToast({
          title: '技能不存在',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
        return
      }

      // 检查是否收藏
      const isFavorited = await app.isFavorited(code)

      this.setData({
        code,
        skill,
        isFavorited,
        loading: false
      })

      // 设置页面标题
      wx.setNavigationBarTitle({
        title: skill.gate
      })
    } catch (err) {
      console.error('加载失败', err)
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }

    wx.hideLoading()
  },

  async onShow() {
    // 刷新收藏状态
    if (this.data.code) {
      const isFavorited = await app.isFavorited(this.data.code)
      this.setData({ isFavorited })
    }
  },

  // 切换心法展开/收起
  toggleDharma() {
    this.setData({
      dharmaExpanded: !this.data.dharmaExpanded
    })
  },

  // 切换收藏
  toggleFavorite() {
    const { code, isFavorited } = this.data
    app.saveFavorites(code)

    this.setData({
      isFavorited: !isFavorited
    })

    wx.showToast({
      title: isFavorited ? '已取消收藏' : '已收藏',
      icon: 'none',
      duration: 1500
    })
  },

  // 点击"试一试"
  onTryTap() {
    const { skill, code } = this.data

    // 记录使用
    app.addHistory(code)

    // 生成安装指令
    const installCommands = this.generateInstallCommand(skill)

    wx.showModal({
      title: '安装此技能',
      content: installCommands.guide,
      confirmText: '复制命令',
      cancelText: '关闭',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: installCommands.command,
            success: () => {
              wx.showToast({
                title: '已复制，去终端粘贴',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },

  // 生成安装指令
  generateInstallCommand(skill) {
    // SkillHub 安装命令
    const command = `skillhub install ${skill.techName}`

    // 详细指南
    const guide = `【第一步】安装 SkillHub（如果还没安装）\n在终端运行：\nnpm install -g @skillhub/skills\n\n【第二步】安装此技能\n在终端运行：\n\n${command}\n\n或者在 OpenClaw/Claude Code 中输入上述命令即可。`

    return { command, guide }
  },

  // 分享
  onShareAppMessage() {
    const { skill } = this.data
    return {
      title: `${skill.name} - 合一 Skills`,
      path: `/pages/detail/detail?code=${skill.code}`,
      imageUrl: ''
    }
  }
})
