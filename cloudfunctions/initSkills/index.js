// 云函数入口文件 - 初始化技能数据
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 30个精选技能数据 - 基于 SkillHub.cn
const skillsData = [
  // ========== 观 ==========
  {
    no: "01", gate: "观", code: "SUMMARIZE",
    name: "把任何内容总结成一页",
    desc: "网页、PDF、图片、音频、YouTube——丢给它，自动提取要点。不用自己从头看，AI 帮你读完。",
    techName: "Summarize", source: "skillhub", rating: 5, verified: true,
    installs: "31.9万", downloads: "637",
    fullDesc: "使用 summarize CLI 总结 URL 或文件，支持网页、PDF、图片、音频、YouTube 等多种格式。智能提取核心要点，节省你的阅读时间。",
    dharma: "博观约取 · 厚积薄发\n信息太多不是问题，找到要点才是。",
    skillhubUrl: "https://skillhub.cn/skills/summarize",
    tags: ['AI工具', '阅读', '效率']
  },
  {
    no: "02", gate: "观", code: "MULTI-SEARCH",
    name: "17 个搜索引擎一次问",
    desc: "百度、Google、必应、搜狗...一个指令问遍 17 个搜索引擎，国内外信息都能查，不用一个个切。",
    techName: "Multi Search Engine", source: "skillhub", rating: 5, verified: true,
    installs: "11.2万", downloads: "299",
    fullDesc: "集成 17 个搜索引擎（8 个国内 + 9 个国际），支持高级搜索语法、时间筛选、站内搜索、隐私引擎及 WolframAlpha 知识查询，无需 API 密钥。",
    dharma: "兼听则明 · 偏信则暗\n一个来源不够看，十七个才有数。",
    skillhubUrl: "https://skillhub.cn/skills/multi-search-engine",
    tags: ['搜索', 'AI工具', '效率']
  },
  {
    no: "03", gate: "观", code: "BAIDU",
    name: "百度搜索，AI 帮你读",
    desc: "不是给你链接列表，是 AI 直接从搜索结果里整理出答案。看文档、查资料、做研究都能用。",
    techName: "Baidu Search", source: "skillhub", rating: 4, verified: true,
    installs: "9.6万", downloads: "169",
    fullDesc: "使用百度 AI 搜索引擎（BDSE）搜索网页，获取实时信息、文档资料或研究主题。AI 会帮你从搜索结果中提取有用信息。",
    dharma: "探骊得珠 · 去粗取精\n搜索只是手段，找到答案才是目的。",
    skillhubUrl: "https://skillhub.cn/skills/baidu-search",
    tags: ['搜索', 'AI工具']
  },
  {
    no: "04", gate: "观", code: "TAVILY",
    name: "AI 专用的搜索引擎",
    desc: "不是给人看的链接列表，是给 AI 看结构化答案的搜索。结果直接变成你问题的回答。",
    techName: "Tavily Web Search", source: "skillhub", rating: 5, verified: true,
    installs: "4.9万", downloads: "77",
    fullDesc: "专为 AI 设计的搜索 API，它能理解你的问题，从多个来源提取信息，整合成一份可直接使用的答案。",
    dharma: "寻根问底 · 不止于表\n好的搜索不只是找到，是理解后重新组织。",
    skillhubUrl: "https://skillhub.cn/skills/tavily",
    tags: ['搜索', 'AI工具', '数据']
  },
  {
    no: "05", gate: "观", code: "YOUTUBE",
    name: "视频看完，省下 40 分钟",
    desc: "YouTube/B站链接丢进去，要点、金句、时间戳都帮你理好。看讲座、学课程、追访谈都能用。",
    techName: "YouTube Watcher", source: "skillhub", rating: 4, verified: true,
    installs: "4.0万", downloads: "218",
    fullDesc: "支持主流视频平台的链接提取和总结，生成带时间戳的要点笔记，让你快速判断是否值得完整观看。",
    dharma: "观其大略 · 取其精华\n不是每个视频都值得从头看到尾。",
    skillhubUrl: "https://skillhub.cn/skills/youtube-watcher",
    tags: ['视频', 'AI工具', '学习']
  },

  // ========== 思 ==========
  {
    no: "06", gate: "思", code: "ONTOLOGY",
    name: "搭一个只属于你的知识库",
    desc: "把你读过的文章、写过的笔记、存过的资料都丢进去，以后问什么都先查自己的脑子，再查全网。",
    techName: "ontology", source: "skillhub", rating: 5, verified: true,
    installs: "18.4万", downloads: "406",
    fullDesc: "类型化知识图谱，用于结构化智能体记忆与可组合技能。支持创建/查询实体（人员、项目、任务、事件、文档）及关联。",
    dharma: "为己之学 · 积少成多\n真正的知识是你自己的笔记，不是搜索引擎。",
    skillhubUrl: "https://skillhub.cn/skills/ontology",
    tags: ['笔记', '知识管理', 'AI工具']
  },
  {
    no: "07", gate: "思", code: "OBSIDIAN",
    name: "让 AI 帮你管 Obsidian 笔记",
    desc: "用 Markdown 写的笔记都在 Obsidian 里？AI 能帮你搜索、整理、关联，让笔记活起来。",
    techName: "Obsidian", source: "skillhub", rating: 4, verified: true,
    installs: "9.4万", downloads: "274",
    fullDesc: "操作 Obsidian 仓库（纯 Markdown 笔记）并通过 obsidian-cli 自动化。让你的笔记库变成可查询的知识图谱。",
    dharma: "温故知新 · 触类旁通\n笔记不是存档，是活的思维网络。",
    skillhubUrl: "https://skillhub.cn/skills/obsidian",
    tags: ['笔记', '知识管理']
  },
  {
    no: "08", gate: "思", code: "NOTION",
    name: "把想法直接落进 Notion",
    desc: "说一句'把这几个点整理到我的 Notion 项目管理页'，它真的就去做了。",
    techName: "Notion", source: "skillhub", rating: 4, verified: true,
    installs: "7.1万", downloads: "190",
    fullDesc: "连接 Notion，AI 可以创建页面、更新数据库、整理内容。你的想法直接变成结构化的笔记。",
    dharma: "思随行起 · 行有所归\n想法不落地，就只是想法。",
    skillhubUrl: "https://skillhub.cn/skills/notion",
    tags: ['笔记', '协作', '效率']
  },
  {
    no: "09", gate: "思", code: "AGENT-MEMORY",
    name: "让 AI 真的记得你",
    desc: "每次开对话都要重新交代背景？这个技能让 AI 记住你的项目、偏好、上下文，下次直接接着聊。",
    techName: "Agent Memory", source: "skillhub", rating: 5, verified: true,
    installs: "4.6万", downloads: "14",
    fullDesc: "跨对话持久记忆，AI 会自动提取并记住你分享的信息，在后续对话中主动调用，像真的认识你一样。",
    dharma: "知人者智 · 自知者明\n好的对话，是记得上一次说了什么的。",
    skillhubUrl: "https://skillhub.cn/skills/agent-memory",
    tags: ['AI工具', '效率']
  },
  {
    no: "10", gate: "思", code: "ELITE-MEMORY",
    name: "长期记忆，永久保存",
    desc: "不止一次对话，是永久记住。你的项目、偏好、经验都存在这里，像第二个大脑。",
    techName: "Elite Longterm Memory", source: "skillhub", rating: 4, verified: true,
    installs: "4.1万", downloads: "133",
    fullDesc: "长期记忆系统，永久保存你的重要信息。可以随时检索和调用，像你的数字外脑。",
    dharma: "过目不忘 · 积微成著\n你的大脑用来思考，记忆交给 AI。",
    skillhubUrl: "https://skillhub.cn/skills/elite-longterm-memory",
    tags: ['AI工具', '知识管理']
  },

  // ========== 书 ==========
  {
    no: "11", gate: "书", code: "WORD",
    name: "一句话，生成一份 Word",
    desc: "不用再打开 Word 排版。格式、封面、目录一次到位，打印出来就能交。",
    techName: "Word / DOCX", source: "skillhub", rating: 5, verified: true,
    installs: "7.0万", downloads: "147",
    fullDesc: "文档处理三件套之一，支持创建专业的 Word 文档，包括格式、封面、目录、页眉页脚等。",
    dharma: "言之有物 · 形式得体\n好的内容配得上规范的格式。",
    skillhubUrl: "https://skillhub.cn/skills/word-docx",
    tags: ['写作', '文档', '效率']
  },
  {
    no: "12", gate: "书", code: "HUMANIZER",
    name: "把 AI 文写成真人的",
    desc: "AI 写的东西一眼就能看出来？这个技能能消除 AI 味，让文字更自然。",
    techName: "Humanizer", source: "skillhub", rating: 5, verified: true,
    installs: "11.2万", downloads: "418",
    fullDesc: "消除 AI 写作痕迹，使文本更自然真实。基于维基百科'AI 写作特征'指南，识别并修正夸张象征、宣传用语、肤浅分析等模式。",
    dharma: "大巧若拙 · 返璞归真\n最好的文字是看不出技巧的。",
    skillhubUrl: "https://skillhub.cn/skills/humanizer",
    tags: ['写作', 'AI工具']
  },
  {
    no: "13", gate: "书", code: "WECHAT-ARTICLE",
    name: "公众号爆款文生成器",
    desc: "标题、开头、正文、结尾 CTA，一篇公众号的套路都懂，帮你生成有人愿意读的文章。",
    techName: "wechat-article-writer", source: "skillhub", rating: 4, verified: true,
    installs: "19", downloads: "13",
    fullDesc: "专门写公众号文章的技能，懂传播规律，知道怎么写标题吸引人、怎么开头留住人、怎么结尾引导转化。",
    dharma: "先有观点，再有文字\n很多人打不开公众号，不是不会写，是没想清楚要说什么。",
    skillhubUrl: "https://skillhub.cn/skills/wechat-article-writer",
    tags: ['写作', '公众号']
  },
  {
    no: "14", gate: "书", code: "HUMANIZE-TEXT",
    name: "把 AI 文变得像人写的",
    desc: "又一个去 AI 味的工具，帮你把 AI 生成的文字变得更自然、更有温度。",
    techName: "Humanize AI text", source: "skillhub", rating: 4, verified: true,
    installs: "4.7万", downloads: "144",
    fullDesc: "识别并修正 AI 写作的特征模式，让文字更接近真人表达。",
    dharma: "文如其人 · 言为心声\n好的文字应该听起来像你说话。",
    skillhubUrl: "https://skillhub.cn/skills/humanize-ai-text",
    tags: ['写作', 'AI工具']
  },
  {
    no: "15", gate: "书", code: "EMAIL-SKILL",
    name: "替你写一封不尴尬的邮件",
    desc: "拒绝、催款、道歉、推进——那些你不想动笔的邮件，它知道分寸。中英文都行。",
    techName: "imap-smtp-email", source: "skillhub", rating: 4, verified: true,
    installs: "3.8万", downloads: "79",
    fullDesc: "处理各种邮件场景，语气得体，分寸刚好。还能直接发送。",
    dharma: "言有物，行有度\n最难写的不是长文，是那几句话的分寸。",
    skillhubUrl: "https://skillhub.cn/skills/imap-smtp-email",
    tags: ['写作', '邮件', '效率']
  },

  // ========== 造 ==========
  {
    no: "16", gate: "造", code: "PPTX",
    name: "一段话，一份 PPT",
    desc: "告诉它要讲什么、讲给谁听、多少页。配色、版式、图表自动安排。",
    techName: "Powerpoint / PPTX", source: "skillhub", rating: 5, verified: true,
    installs: "3.3万", downloads: "58",
    fullDesc: "文档处理三件套之一，自动生成 PPT，支持自定义样式、图表、动画。",
    dharma: "先有骨架，再有血肉\n做 PPT 之前，先想清楚这三件事：说什么、给谁看、要什么行动。",
    skillhubUrl: "https://skillhub.cn/skills/powerpoint-pptx",
    tags: ['设计', '演示', '效率']
  },
  {
    no: "17", gate: "造", code: "XLSX",
    name: "把一堆乱表格整出来",
    desc: "合并多张表、算公式、清洗脏数据、画图。不会 VLOOKUP 也能干净地收尾一个 Excel。",
    techName: "Excel / XLSX", source: "skillhub", rating: 5, verified: true,
    installs: "6.7万", downloads: "123",
    fullDesc: "文档处理三件套之一，处理 Excel 的专业工具。合并、清洗、计算、可视化，一条龙。",
    dharma: "数中有理 · 表而达之\n数据不只是数字，是有故事的信息。",
    skillhubUrl: "https://skillhub.cn/skills/excel-xlsx",
    tags: ['数据', '效率']
  },
  {
    no: "18", gate: "造", code: "PDF",
    name: "把任何东西输出成 PDF",
    desc: "报告、合同、电子书、日报。页眉、页码、封面、目录齐全，直接能印、能发、能归档。",
    techName: "Pdf", source: "skillhub", rating: 5, verified: true,
    installs: "4.0万", downloads: "30",
    fullDesc: "从任意内容生成专业 PDF。支持页眉页脚、页码、目录、封面等完整要素。",
    dharma: "善始善终 · 可存可传\n一份好的文档，要能存、能印、能分享。",
    skillhubUrl: "https://skillhub.cn/skills/pdf",
    tags: ['文档', '效率']
  },
  {
    no: "19", gate: "造", code: "NANO-PDF",
    name: "用说话的方式编辑 PDF",
    desc: "不说'打开 Acrobat 点这里点那里'，直接说'把第 3 页删了''加个水印'，它就懂。",
    techName: "Nano Pdf", source: "skillhub", rating: 4, verified: true,
    installs: "8.1万", downloads: "148",
    fullDesc: "使用自然语言指令编辑 PDF，不用学复杂的专业软件。",
    dharma: "大道至简 · 行云流水\n好的工具，是听懂人话而不是让人学话。",
    skillhubUrl: "https://skillhub.cn/skills/nano-pdf",
    tags: ['文档', '效率']
  },
  {
    no: "20", gate: "造", code: "NANO-BANANA",
    name: "用 AI 生成图片",
    desc: "说你要什么图，AI 帮你生成。文章配图、海报素材、表情包，都能做。",
    techName: "Nano Banana Pro", source: "skillhub", rating: 5, verified: true,
    installs: "11.5万", downloads: "275",
    fullDesc: "使用 Gemini 3 Pro Image 生成或编辑图像。支持文生图、图生图及 1K/2K/4K 分辨率。",
    dharma: "一图千言 · 意在笔先\n好的配图不只是装饰，是内容的延伸。",
    skillhubUrl: "https://skillhub.cn/skills/nano-banana-pro",
    tags: ['设计', 'AI工具', '图片']
  },

  // ========== 行 ==========
  {
    no: "21", gate: "行", code: "AGENT-BROWSER",
    name: "AI 代你操作浏览器",
    desc: "订机票、查快递、填表单、抓数据——那些重复点击的事交给它。你只需要说'帮我订下周去上海的高铁'。",
    techName: "Agent Browser", source: "skillhub", rating: 5, verified: true,
    installs: "20.8万", downloads: "597",
    fullDesc: "基于 Rust 的快速无头浏览器自动化，允许 AI 通过结构化命令执行页面导航、点击、输入和快照操作。",
    dharma: "工欲善事 · 假物于人\n重复的事，交给机器。你去想更重要的事。",
    skillhubUrl: "https://skillhub.cn/skills/agent-browser",
    tags: ['自动化', '效率', '浏览器']
  },
  {
    no: "22", gate: "行", code: "GOG",
    name: "让 AI 管你的邮箱和日历",
    desc: "Gmail、日历、云盘、通讯录、表格、文档——Google 全家桶，AI 都能帮你操作。",
    techName: "Gog", source: "skillhub", rating: 4, verified: true,
    installs: "13.7万", downloads: "745",
    fullDesc: "Google Workspace 命令行工具，支持 Gmail、日历、云端硬盘、通讯录、表格和文档。",
    dharma: "事有缓急 · 收放自如\n工具不是目的，是把时间花在更重要的事上。",
    skillhubUrl: "https://skillhub.cn/skills/gog",
    tags: ['协作', '效率', '自动化']
  },
  {
    no: "23", gate: "行", code: "DESKTOP-CONTROL",
    name: "让 AI 控制你的电脑",
    desc: "打开软件、操作文件、执行命令——你说，AI 做。像有个懂技术的助手坐在你电脑前。",
    techName: "Desktop Control", source: "skillhub", rating: 4, verified: true,
    installs: "4.5万", downloads: "215",
    fullDesc: "桌面级控制，AI 可以直接操作你的电脑，执行各种任务。",
    dharma: "指臂使使 · 如运诸掌\n好的工具是你想的，它做的。",
    skillhubUrl: "https://skillhub.cn/skills/desktop-control",
    tags: ['自动化', '效率']
  },
  {
    no: "24", gate: "行", code: "AUTOMATION",
    name: "把重复的事变成自动化",
    desc: "每天都要做的流程？让 AI 记住步骤，以后一键执行。节省时间，减少出错。",
    techName: "Automation Workflows", source: "skillhub", rating: 4, verified: true,
    installs: "5.9万", downloads: "182",
    fullDesc: "工作流自动化，把重复性的操作变成可复用的流程。",
    dharma: "融会贯通 · 举一反三\n流程的价值不在一次，在于可重复。",
    skillhubUrl: "https://skillhub.cn/skills/automation-workflows",
    tags: ['自动化', '效率']
  },
  {
    no: "25", gate: "行", code: "BROWSER-USE",
    name: "又一个浏览器自动化工具",
    desc: "和 Agent Browser 类似，用 Python 写的。有些网站用这个更稳。",
    techName: "Browser Use", source: "skillhub", rating: 4, verified: true,
    installs: "4.3万", downloads: "65",
    fullDesc: "Python 实现的浏览器自动化工具，在某些场景下比 Agent Browser 更稳定。",
    dharma: "殊途同归 · 百虑一致\n目的相同，工具不同，选最顺手的用。",
    skillhubUrl: "https://skillhub.cn/skills/browser-use",
    tags: ['自动化', '浏览器']
  },

  // ========== 和 ==========
  {
    no: "26", gate: "和", code: "WEATHER",
    name: "今天天气怎么样",
    desc: "不用打开天气 APP，直接问。今天下雨吗？明天冷吗？要不要带伞？AI 帮你查。",
    techName: "Weather", source: "skillhub", rating: 4, verified: true,
    installs: "15.7万", downloads: "295",
    fullDesc: "获取当前天气和预报（无需 API 密钥）。每天早上问一句，穿衣出行有数。",
    dharma: "未雨绸缪 · 顺势而为\n每天一句问安，是对自己最基本的照顾。",
    skillhubUrl: "https://skillhub.cn/skills/weather",
    tags: ['生活', '查询']
  },
  {
    no: "27", gate: "和", code: "NEWS-SUMMARY",
    name: "每天早上的新闻摘要",
    desc: "不用刷半小时新闻，AI 帮你总结今天最重要的几条。十分钟看完，够用了。",
    techName: "News Summary", source: "skillhub", rating: 4, verified: true,
    installs: "3.7万", downloads: "77",
    fullDesc: "新闻聚合与摘要，从海量资讯中筛选出重要信息，节省你的阅读时间。",
    dharma: "兼收并蓄 · 去粗取精\n信息时代，'不读'比'多读'更重要。",
    skillhubUrl: "https://skillhub.cn/skills/news-summary",
    tags: ['新闻', '阅读']
  },
  {
    no: "28", gate: "和", code: "TENCENT-COS",
    name: "把文件存到腾讯云",
    desc: "图片、文档、视频——AI 帮你上传到腾讯云 COS，存好以后随时取用。",
    techName: "Tencent COS", source: "skillhub", rating: 4, verified: true,
    installs: "6.3千", downloads: "4",
    fullDesc: "腾讯云对象存储服务，安全可靠地存储你的各类文件。",
    dharma: "善藏不如善藏\n好的存储是不占你本地空间，但随时能调取。",
    skillhubUrl: "https://skillhub.cn/skills/tencent-cos",
    tags: ['存储', '云服务']
  },
  {
    no: "29", gate: "和", code: "TENCENT-ASR",
    name: "把语音转成文字",
    desc: "录音、会议、语音消息——腾讯云的语音识别帮你转成文字，支持方言和多种语言。",
    techName: "TencentCloud ASR", source: "skillhub", rating: 4, verified: true,
    installs: "1.5千", downloads: "1",
    fullDesc: "腾讯云语音识别服务，将语音转换为文字。",
    dharma: "言为心声 · 落纸为证\n好想法值得被记下来，不只是飘在空中。",
    skillhubUrl: "https://skillhub.cn/skills/tencentcloud-asr",
    tags: ['语音', 'AI工具']
  },
  {
    no: "30", gate: "和", code: "SKILL-CREATOR",
    name: "把你自己的经验变成一个 Skill",
    desc: "你有你的方法论。描述一下，AI 就能把它打包成一个可复用、可分享的 Skill。",
    techName: "Skill Creator", source: "skillhub", rating: 5, verified: true,
    installs: "7.5万", downloads: "152",
    fullDesc: "创建自定义技能的工具。把你的一套方法论或工作流程打包成 Skill，自己用或分享给团队。",
    dharma: "经验即技能 · 方法可传承\n你的经验，可以变成别人也能用的工具。",
    skillhubUrl: "https://skillhub.cn/skills/skill-creator",
    tags: ['工具', '效率']
  }
]

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 检查是否已初始化
    const countRes = await db.collection('skills').count()
    if (countRes.total > 0) {
      return {
        success: true,
        message: '技能数据已存在，无需重复初始化',
        count: countRes.total
      }
    }

    // 批量添加技能数据（每次最多20条）
    let addedCount = 0
    for (let i = 0; i < skillsData.length; i += 20) {
      const batch = skillsData.slice(i, i + 20)
      const promises = batch.map(skill =>
        db.collection('skills').add({
          data: {
            ...skill,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
          }
        })
      )
      await Promise.all(promises)
      addedCount += batch.length
    }

    return {
      success: true,
      message: `成功初始化 ${addedCount} 个技能`,
      count: addedCount
    }
  } catch (err) {
    console.error('初始化技能数据失败', err)
    return {
      success: false,
      error: err.message
    }
  }
}
