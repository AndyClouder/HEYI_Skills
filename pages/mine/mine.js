// 合一 Skills - 我的技能页逻辑
import { getMySkills, createSkill, deleteSkill } from '../../utils/cloud.js'

const app = getApp()

Page({
  data: {
    customSkills: [],
    loading: true
  },

  async onLoad() {
    wx.showLoading({ title: '加载中...' })
    await this.loadCustomSkills()
    wx.hideLoading()
  },

  async onShow() {
    if (!this.data.loading) {
      await this.loadCustomSkills()
    }
  },

  async loadCustomSkills() {
    try {
      const customSkills = await getMySkills()
      this.setData({
        customSkills,
        loading: false
      })
    } catch (err) {
      console.error('加载自定义技能失败', err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      this.setData({ loading: false })
    }
  },

  // 点击上传
  onUploadTap() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['md'],
      success: (res) => {
        const filePath = res.tempFiles[0].path
        this.parseSkillsFile(filePath)
      }
    })
  },

  // 解析 Skills.md 文件
  parseSkillsFile(filePath) {
    wx.showLoading({ title: '解析中...' })

    // 读取文件内容
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'utf-8',
      success: async (res) => {
        const content = res.data
        const skills = this.parseMarkdown(content)

        if (skills.length === 0) {
          wx.hideLoading()
          wx.showToast({
            title: '未识别到技能，请检查格式',
            icon: 'none'
          })
          return
        }

        // 保存到云数据库
        let successCount = 0
        let failCount = 0

        for (const skill of skills) {
          try {
            // 生成唯一 code（使用自定义前缀 + 时间戳 + 随机数）
            const code = `C${Date.now().toString(36)}${Math.random().toString(36).substr(2, 4)}`.toUpperCase()

            // 确定门类（默认为"造"）
            const gate = skill.gate || '造'

            await createSkill({
              ...skill,
              code,
              no: code,
              gate,
              source: 'custom'
            })
            successCount++
          } catch (err) {
            console.error('保存技能失败', err)
            failCount++
          }
        }

        wx.hideLoading()

        if (successCount > 0) {
          wx.showToast({
            title: `成功导入 ${successCount} 个技能`,
            icon: 'success'
          })
          await this.loadCustomSkills()
        }

        if (failCount > 0) {
          setTimeout(() => {
            wx.showToast({
              title: `${failCount} 个失败`,
              icon: 'none'
            })
          }, 1500)
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '文件读取失败',
          icon: 'none'
        })
      }
    })
  },

  // 解析 Markdown 格式的技能定义
  parseMarkdown(content) {
    const skills = []
    const lines = content.split('\n')
    let currentSkill = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // 匹配 ## 技能名称 或 ### 技能名称
      if (line.startsWith('##') || line.startsWith('###')) {
        // 保存上一个技能
        if (currentSkill && currentSkill.name) {
          skills.push(currentSkill)
        }

        // 解析新技能名称
        const nameMatch = line.replace(/^#+\s*/, '').match(/^(.*?)[:：]?/)
        currentSkill = {
          name: nameMatch ? nameMatch[1].trim() : line.replace(/^#+\s*/, ''),
          desc: '',
          techName: '',
          prompt: '',
          gate: '',
          examples: [],
          steps: []
        }
      }
      // 匹配 **描述** 或 **Description**
      else if (line.match(/^\*\*描述\*\*[:：]/) || line.match(/^\*\*Description\*\*[:：]/i)) {
        if (currentSkill) {
          currentSkill.desc = line.replace(/^\*\*(描述|Description)\*\*[:：]\s*/i, '').trim()
        }
      }
      // 匹配 **命令** 或 **Command**
      else if (line.match(/^\*\*命令\*\*[:：]/) || line.match(/^\*\*Command\*\*[:：]/i)) {
        if (currentSkill) {
          currentSkill.techName = line.replace(/^\*\*(命令|Command)\*\*[:：]\s*/i, '').trim()
        }
      }
      // 匹配 **提示词** 或 **Prompt**
      else if (line.match(/^\*\*提示词\*\*[:：]/) || line.match(/^\*\*Prompt\*\*[:：]/i)) {
        if (currentSkill) {
          currentSkill.prompt = line.replace(/^\*\*(提示词|Prompt)\*\*[:：]\s*/i, '').trim()
        }
      }
      // 匹配 **门类** 或 **Gate**
      else if (line.match(/^\*\*门类\*\*[:：]/) || line.match(/^\*\*Gate\*\*[:：]/i)) {
        if (currentSkill) {
          const gateValue = line.replace(/^\*\*(门类|Gate)\*\*[:：]\s*/i, '').trim()
          // 映射门类字符
          const gateMap = {
            '观': '观', '洞察': '观',
            '思': '思', '思考': '思',
            '书': '书', '创作': '书',
            '造': '造', '创造': '造',
            '行': '行', '执行': '行',
            '和': '和', '协作': '和'
          }
          currentSkill.gate = gateMap[gateValue] || '造'
        }
      }
      // 其他内容作为描述的补充
      else if (line && currentSkill && !currentSkill.desc) {
        if (!line.startsWith('#') && !line.startsWith('*')) {
          currentSkill.desc = line
        }
      }
    }

    // 保存最后一个技能
    if (currentSkill && currentSkill.name) {
      skills.push(currentSkill)
    }

    return skills
  },

  // 查看技能详情
  onViewSkill(e) {
    const skill = e.currentTarget.dataset.skill
    wx.navigateTo({
      url: `/pages/detail/detail?code=${skill.code}`
    })
  },

  // 编辑技能
  onEditSkill(e) {
    const skill = e.currentTarget.dataset.skill
    wx.showToast({
      title: '编辑功能开发中',
      icon: 'none'
    })
  },

  // 删除技能
  async onDeleteSkill(e) {
    const skill = e.currentTarget.dataset.skill

    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${skill.name}"吗？删除后无法恢复。`,
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' })

          try {
            await deleteSkill(skill._id)
            await this.loadCustomSkills()

            wx.hideLoading()
            wx.showToast({
              title: '已删除',
              icon: 'success'
            })
          } catch (err) {
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})
