// 云函数：初始化精选技能到数据库
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 30个精选技能数据（从 SkillHub 同步）
const featuredSkills = [
  // 观 - 洞察理解类
  {
    code: '001',
    no: '001',
    name: 'AI 润色中文',
    desc: '把AI写的生硬中文改成自然表达',
    fullDesc: 'AI写的中文往往有翻译腔。这个技能能让AI把生硬的中文改得更自然、更地道。',
    techName: 'ai-polish-chinese',
    gate: '观',
    source: 'skillhub',
    installs: '5万+',
    examples: [
      { input: '请润色：我正在寻找一个方法来解决这个问题。', output: '我在找办法解决这个问题。' }
    ],
    steps: [
      '复制你的中文文本',
      '粘贴给 Claude，提示"润色这段中文"',
      'AI 会自动使用润色技能'
    ],
    dharma: '大道至简。好文章不是靠堆砌辞藻，而是用最简单的话说清楚最复杂的想法。',
    rating: 5
  },
  {
    code: '002',
    no: '002',
    name: '论文降重',
    desc: '智能改写，降低论文重复率',
    fullDesc: '用AI改写论文中重复率高的段落，保持原意不变，表达更自然。',
    techName: 'paper-rewrite',
    gate: '观',
    source: 'skillhub',
    installs: '3万+',
    examples: [
      { input: '这段查重率太高，帮我改写', output: '已用不同表达方式改写，保持原意' }
    ],
    steps: ['复制重复段落', '粘贴给 Claude', 'AI 会自动降重改写'],
    dharma: '表达有千万种，真理只有一个。',
    rating: 5
  },
  {
    code: '003',
    no: '003',
    name: '阅读理解',
    desc: '提问式阅读，快速理解长文',
    fullDesc: '给你一个长文档或论文，AI 可以用问答的方式帮你快速抓住重点。',
    techName: 'reading-comprehension',
    gate: '观',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '这篇论文的核心观点是什么？', output: '核心观点是...' }
    ],
    steps: ['上传文档', '随时提问', 'AI 基于文档回答'],
    dharma: '学而不思则罔，思而不学则殆。',
    rating: 4
  },

  // 思 - 逻辑分析类
  {
    code: '004',
    no: '004',
    name: '结构化思考',
    desc: '把零散想法整理成清晰框架',
    fullDesc: '你有一堆想法但说不清楚？这个技能帮你把散乱的思路变成结构化的框架。',
    techName: 'structured-thinking',
    gate: '思',
    source: 'skillhub',
    installs: '4万+',
    examples: [
      { input: '我有个想法但不知道怎么组织', output: '让我帮你梳理成结构...' }
    ],
    steps: ['说出你的想法', 'AI 帮你结构化', '得到清晰框架'],
    dharma: '谋定而后动。思考的结构决定行动的效率。',
    rating: 5
  },
  {
    code: '005',
    no: '005',
    name: 'SWOT 分析',
    desc: '快速做决策分析',
    fullDesc: '输入你的选择或项目，AI 帮你从优势、劣势、机会、威胁四个角度分析。',
    techName: 'swot-analysis',
    gate: '思',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '帮我分析要不要跳槽', output: '以下是 SWOT 分析...' }
    ],
    steps: ['描述你的选择', 'AI 做 SWOT 分析', '得到决策参考'],
    dharma: '知彼知己，百战不殆。',
    rating: 4
  },
  {
    code: '006',
    no: '006',
    name: '翻译官',
    desc: '专业级中英互译',
    fullDesc: '不是简单的字面翻译，而是理解语境后的专业翻译。',
    techName: 'translator',
    gate: '思',
    source: 'skillhub',
    installs: '5万+',
    examples: [
      { input: '把这段中文翻译成地道的英文', output: 'Here is the idiomatic translation...' }
    ],
    steps: ['输入要翻译的内容', '指定目标语言', 'AI 提供专业翻译'],
    dharma: '信达雅。翻译是跨文化的桥梁。',
    rating: 5
  },

  // 书 - 内容创作类
  {
    code: '007',
    no: '007',
    name: '写公众号',
    desc: '按你的模板风格写文章',
    fullDesc: '提供几篇你喜欢的文章作为参考，AI 就能模仿你的风格写新内容。',
    techName: 'wechat-article',
    gate: '书',
    source: 'skillhub',
    installs: '6万+',
    examples: [
      { input: '按这个风格写一篇关于 AI 的文章', output: '参考风格，生成新文章...' }
    ],
    steps: ['提供参考文章', '说明写作主题', 'AI 模仿风格创作'],
    dharma: '文无定法，但有风格。风格是思想的外衣。',
    rating: 5
  },
  {
    code: '008',
    no: '008',
    name: '小红书文案',
    desc: '生成小红书风格笔记',
    fullDesc: '爆款标题、吸睛开头、emoji 丰富、话术接地气。',
    techName: 'xiaohongshu-writer',
    gate: '书',
    source: 'skillhub',
    installs: '4万+',
    examples: [
      { input: '帮我写个探店笔记', output: '✨姐妹们！今天发现...' }
    ],
    steps: ['告诉产品/主题', 'AI 生成小红书文案', '直接发布或微调'],
    dharma: '内容为王，形式为后。好的文案要入乡随俗。',
    rating: 5
  },
  {
    code: '009',
    no: '009',
    name: '邮件写作',
    desc: '商务邮件快速生成',
    fullDesc: '说明邮件目的，AI 帮你写一封得体、专业的商务邮件。',
    techName: 'email-writer',
    gate: '书',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '给客户写封跟进邮件', output: '主题：关于...的跟进 / 尊敬的...' }
    ],
    steps: ['说明邮件目的', 'AI 生成邮件草稿', '检查后发送'],
    dharma: '礼多人不怪。专业是效率的前提。',
    rating: 4
  },
  {
    code: '010',
    no: '010',
    name: '周报生成',
    desc: '把零散工作整理成专业周报',
    fullDesc: '罗列你做的事，AI 帮你整理成条理清晰的周报。',
    techName: 'weekly-report',
    gate: '书',
    source: 'skillhub',
    installs: '3万+',
    examples: [
      { input: '我本周做了 A、B、C', output: '## 本周工作\n### 1. 项目A...' }
    ],
    steps: ['列出工作事项', 'AI 整理成周报格式', '复制提交'],
    dharma: '凡事预则立。汇报是工作的一部分。',
    rating: 4
  },

  // 造 - 编码创造类
  {
    code: '011',
    no: '011',
    name: 'HTML 生成',
    desc: '描述网页，AI 写代码',
    fullDesc: '用自然语言描述你想要的网页，AI 直接生成可用的 HTML 代码。',
    techName: 'html-generator',
    gate: '造',
    source: 'skillhub',
    installs: '4万+',
    examples: [
      { input: '做一个登录页面', output: '<div class="login">...</div>' }
    ],
    steps: ['描述网页需求', 'AI 生成 HTML/CSS', '复制到项目中'],
    dharma: '工欲善其事，必先利其器。',
    rating: 5
  },
  {
    code: '012',
    no: '012',
    name: 'Python 脚本',
    desc: '用自然语言写 Python 代码',
    fullDesc: '描述你想要的程序功能，AI 写出 Python 脚本。',
    techName: 'python-coder',
    gate: '造',
    source: 'skillhub',
    installs: '3万+',
    examples: [
      { input: '写个脚本批量重命名文件', output: 'import os...\n# 批量重命名' }
    ],
    steps: ['描述程序功能', 'AI 生成 Python 代码', '运行或保存'],
    dharma: '代码是思维的延伸。',
    rating: 5
  },
  {
    code: '013',
    no: '013',
    name: 'Excel 公式',
    desc: '用自然语言生成 Excel 公式',
    fullDesc: '说明你想要计算什么，AI 直接给你 Excel 公式。',
    techName: 'excel-formula',
    gate: '造',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '计算 A 列中大于 100 的个数', output: '=COUNTIF(A:A,">100")' }
    ],
    steps: ['说明计算需求', 'AI 生成公式', '粘贴到 Excel'],
    dharma: '善假于物。工具让效率倍增。',
    rating: 4
  },
  {
    code: '014',
    no: '014',
    name: '正则表达式',
    desc: '用自然语言生成正则',
    fullDesc: '描述你想要匹配的模式，AI 生成正则表达式。',
    techName: 'regex-generator',
    gate: '造',
    source: 'skillhub',
    installs: '1万+',
    examples: [
      { input: '匹配手机号', output: '/^1[3-9]\\d{9}$/' }
    ],
    steps: ['描述匹配规则', 'AI 生成正则', '复制使用'],
    dharma: '化繁为简的艺术。',
    rating: 4
  },

  // 行 - 效率执行类
  {
    code: '015',
    no: '015',
    name: '会议总结',
    desc: '把会议记录整理成结构化总结',
    fullDesc: '粘贴会议记录，AI 提取要点、决策、待办。',
    techName: 'meeting-summary',
    gate: '行',
    source: 'skillhub',
    installs: '3万+',
    examples: [
      { input: '整理这段会议记录', output: '## 会议总结\n### 要点\n### 决策\n### 待办' }
    ],
    steps: ['粘贴会议记录', 'AI 整理结构化总结', '分享给团队'],
    dharma: '好记性不如烂笔头。',
    rating: 5
  },
  {
    code: '016',
    no: '016',
    name: '简历优化',
    desc: '让简历更专业、更亮眼',
    fullDesc: '上传简历，AI 帮你优化表达、突出重点。',
    techName: 'resume-polish',
    gate: '行',
    source: 'skillhub',
    installs: '4万+',
    examples: [
      { input: '帮我优化简历', output: '已优化：使用行为动词、量化成果...' }
    ],
    steps: ['上传简历内容', 'AI 提出优化建议', '应用优化后保存'],
    dharma: '人以简历相识。第一印象很重要。',
    rating: 5
  },
  {
    code: '017',
    no: '017',
    name: '学习计划',
    desc: '生成个性化的学习计划',
    fullDesc: '告诉 AI 你想学什么、有多少时间，AI 帮你制定学习计划。',
    techName: 'study-plan',
    gate: '行',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '我想学 Python，三个月入门', output: '## 三月学习计划\n### 第一个月...' }
    ],
    steps: ['说明学习目标和时间', 'AI 制定学习计划', '按计划执行'],
    dharma: '学而不厌，诲人不倦。',
    rating: 4
  },
  {
    code: '018',
    no: '018',
    name: '项目规划',
    desc: '把想法拆解成可执行计划',
    fullDesc: '描述你的项目想法，AI 帮你拆解成任务清单。',
    techName: 'project-planner',
    gate: '行',
    source: 'skillhub',
    installs: '2万+',
    examples: [
      { input: '我想做一个个人博客', output: '## 项目计划\n### 1. 技术选型\n### 2. 任务拆解' }
    ],
    steps: ['描述项目想法', 'AI 拆解任务清单', '逐步执行'],
    dharma: '千里之行，始于足下。',
    rating: 4
  },

  // 和 - 协作沟通类
  {
    code: '019',
    no: '019',
    name: '谈判助手',
    desc: '准备谈判话术和策略',
    fullDesc: '说明谈判场景，AI 帮你准备话术、预判对方立场。',
    techName: 'negotiation-helper',
    gate: '和',
    source: 'skillhub',
    installs: '1万+',
    examples: [
      { input: '我要和老板谈涨薪', output: '## 谈话要点\n## 话术建议\n## 预案' }
    ],
    steps: ['描述谈判场景', 'AI 准备话术策略', '做好准备再谈'],
    dharma: '上兵伐谋。谈判是智慧的较量。',
    rating: 4
  },
  {
    code: '020',
    no: '020',
    name: '冲突调解',
    desc: '化解团队冲突的建议',
    fullDesc: '描述冲突情况，AI 提供调解建议。',
    techName: 'conflict-resolution',
    gate: '和',
    source: 'skillhub',
    installs: '1万+',
    examples: [
      { input: '团队里两个人因为分工吵架', output: '## 调解建议' }
    ],
    steps: ['描述冲突情况', 'AI 提供调解方案', '促进沟通'],
    dharma: '和而不同。',
    rating: 4
  },

  // 更多精选技能...
  {
    code: '021',
    no: '021',
    name: '内容扩写',
    desc: '把简短的思路扩展成完整内容',
    techName: 'content-expand',
    gate: '书',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '扩写这段话', output: '扩写后的内容...' }],
    steps: ['输入简短内容', 'AI 扩写', '获得完整文章'],
    dharma: '言简意赅是艺术，有时也需要铺陈。',
    rating: 4
  },
  {
    code: '022',
    no: '022',
    name: '改写降重',
    desc: '智能改写避免查重',
    techName: 'rewrite-unique',
    gate: '书',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '改写这段避免重复', output: '改写后的内容...' }],
    steps: ['输入重复段落', 'AI 改写', '通过查重'],
    dharma: '太阳底下无新事，但可以有新说法。',
    rating: 4
  },
  {
    code: '023',
    no: '023',
    name: '关键词提取',
    desc: '从文章中提取核心关键词',
    techName: 'keyword-extract',
    gate: '思',
    source: 'skillhub',
    installs: '1万+',
    examples: [{ input: '提取关键词', output: '关键词：AI, 技能, 效率...' }],
    steps: ['输入文章', 'AI 提取关键词', '用于标签/SEO'],
    dharma: '提纲挈领。',
    rating: 3
  },
  {
    code: '024',
    no: '024',
    name: '摘要生成',
    desc: '快速生成文章摘要',
    techName: 'summary-generator',
    gate: '思',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '总结这篇文章', output: '摘要：本文讲述了...' }],
    steps: ['输入长文', 'AI 生成摘要', '快速了解内容'],
    dharma: '一目了然。',
    rating: 4
  },
  {
    code: '025',
    no: '025',
    name: '闲聊陪伴',
    desc: '像朋友一样聊天',
    techName: 'chat-companion',
    gate: '和',
    source: 'skillhub',
    installs: '3万+',
    examples: [{ input: '今天心情不好', output: '怎么了？和我说说...' }],
    steps: ['直接聊天', 'AI 陪伴回应', '获得情感支持'],
    dharma: '独学而无友，则孤陋而寡闻。',
    rating: 4
  },
  {
    code: '026',
    no: '026',
    name: '思维导图',
    desc: '把想法生成思维导图结构',
    techName: 'mindmap',
    gate: '思',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '帮我做个思维导图', output: '# 中心主题\n## 分支1\n## 分支2' }],
    steps: ['描述主题', 'AI 生成导图结构', '导入导图工具'],
    dharma: '思则有备。',
    rating: 4
  },
  {
    code: '027',
    no: '027',
    name: 'SQL 生成',
    desc: '用自然语言生成 SQL 查询',
    techName: 'sql-generator',
    gate: '造',
    source: 'skillhub',
    installs: '1万+',
    examples: [{ input: '查询销售额前10的产品', output: 'SELECT * FROM products ORDER BY sales DESC LIMIT 10' }],
    steps: ['描述查询需求', 'AI 生成 SQL', '在数据库执行'],
    dharma: '数据说话。',
    rating: 4
  },
  {
    code: '028',
    no: '028',
    name: '数据分析',
    desc: '让 AI 帮你分析数据',
    techName: 'data-analysis',
    gate: '观',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '分析这组数据', output: '## 数据分析\n### 趋势\n### 异常值' }],
    steps: ['上传数据', 'AI 分析趋势', '获得洞察'],
    dharma: '数中有术。',
    rating: 4
  },
  {
    code: '029',
    no: '029',
    name: 'PPT 大纲',
    desc: '生成演示文稿大纲',
    techName: 'ppt-outline',
    gate: '书',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '做个产品介绍 PPT', output: '## PPT 大纲\n### 封面\n### 目录' }],
    steps: ['说明主题', 'AI 生成大纲', '按大纲制作'],
    dharma: '言简意赅，画面清晰。',
    rating: 4
  },
  {
    code: '030',
    no: '030',
    name: '面试准备',
    desc: '模拟面试，准备回答',
    techName: 'interview-prep',
    gate: '行',
    source: 'skillhub',
    installs: '2万+',
    examples: [{ input: '准备产品经理面试', output: '## 常见问题\n### 回答思路' }],
    steps: ['说明职位', 'AI 提供问题和回答', '模拟练习'],
    dharma: '有备无患。',
    rating: 4
  }
]

exports.main = async (event, context) => {
  try {
    const { action } = event

    if (action === 'init') {
      // 初始化精选技能到数据库
      const results = []

      for (const skill of featuredSkills) {
        try {
          // 检查是否已存在
          const existing = await db.collection('skills').where({
            code: skill.code
          }).get()

          if (existing.data.length === 0) {
            // 不存在则添加
            await db.collection('skills').add({
              data: {
                ...skill,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
              }
            })
            results.push({ code: skill.code, status: 'added' })
          } else {
            results.push({ code: skill.code, status: 'exists' })
          }
        } catch (err) {
          results.push({ code: skill.code, status: 'error', error: err.message })
        }
      }

      return {
        success: true,
        results,
        total: featuredSkills.length
      }
    }

    return { success: false, message: '未知操作' }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
