// 合一 Skills - 数据管理
// 基于 SkillHub.cn (https://skillhub.cn/) 真实技能精选

// 六门分类定义
export const gates = [
  { id: "观", en: "Observe", order: 1, desc: "看见 · 读取 · 摄入外部信息" },
  { id: "思", en: "Reflect", order: 2, desc: "向内整理 · 复盘 · 提问" },
  { id: "书", en: "Compose", order: 3, desc: "成文 · 表达 · 字里" },
  { id: "造", en: "Create", order: 4, desc: "造物 · 视觉 · 成品" },
  { id: "行", en: "Execute", order: 5, desc: "落地 · 自动 · 成事" },
  { id: "和", en: "Harmonize", order: 6, desc: "节奏 · 连接 · 同行" }
];

// 30个精选技能 - 基于 SkillHub.cn 真实数据
export const skills = [
  // ========== 观 ==========
  {
    no: "01", gate: "观", code: "SUMMARIZE",
    name: "把任何内容总结成一页",
    desc: "网页、PDF、图片、音频、YouTube——丢给它，自动提取要点。不用自己从头看，AI 帮你读完。",
    techName: "Summarize", source: "skillhub", rating: 5, verified: true,
    installs: "31.9万", downloads: "637",
    fullDesc: "使用 summarize CLI 总结 URL 或文件，支持网页、PDF、图片、音频、YouTube 等多种格式。智能提取核心要点，节省你的阅读时间。",
    examples: [
      { input: "总结这篇 50 页的 PDF 报告", output: "报告核心要点：\n1. 背景：AI 技能市场快速增长\n2. 数据：用户年增长 300%\n3. 结论：非技术用户是主要增量" },
      { input: "这个 YouTube 视频讲了什么？", output: "视频要点：\n- 主题：如何用 AI 提升办公效率\n- 核心方法：3 个实用技能\n- 推荐工具：在 SkillHub 搜索" }
    ],
    steps: ["复制 URL 或上传文件", "AI 自动分析内容", "得到结构化的要点总结"],
    dharma: "博观约取 · 厚积薄发\n信息太多不是问题，找到要点才是。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/summarize"
  },
  {
    no: "02", gate: "观", code: "MULTI-SEARCH",
    name: "17 个搜索引擎一次问",
    desc: "百度、Google、必应、搜狗...一个指令问遍 17 个搜索引擎，国内外信息都能查，不用一个个切。",
    techName: "Multi Search Engine", source: "skillhub", rating: 5, verified: true,
    installs: "11.2万", downloads: "299",
    fullDesc: "集成 17 个搜索引擎（8 个国内 + 9 个国际），支持高级搜索语法、时间筛选、站内搜索、隐私引擎及 WolframAlpha 知识查询，无需 API 密钥。",
    examples: [
      { input: "对比 Claude 和 GPT-4 的最新能力", output: "综合 17 个搜索源的结果：\n- Claude 长文本能力更强\n- GPT-4 多模态更成熟\n- 详细对比见附件..." },
      { input: "最近一周 AI 行业有什么大新闻？", output: "本周要闻：\n1. 腾讯发布 SkillHub\n2. OpenAI 更新...\n（来自 8 个国内源实时汇总）" }
    ],
    steps: ["描述你要查的问题", "AI 自动搜索多个引擎", "整合成一份答案"],
    dharma: "兼听则明 · 偏信则暗\n一个来源不够看，十七个才有数。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/multi-search-engine"
  },
  {
    no: "03", gate: "观", code: "BAIDU",
    name: "百度搜索，AI 帮你读",
    desc: "不是给你链接列表，是 AI 直接从搜索结果里整理出答案。看文档、查资料、做研究都能用。",
    techName: "Baidu Search", source: "skillhub", rating: 4, verified: true,
    installs: "9.6万", downloads: "169",
    fullDesc: "使用百度 AI 搜索引擎（BDSE）搜索网页，获取实时信息、文档资料或研究主题。AI 会帮你从搜索结果中提取有用信息。",
    examples: [
      { input: "2024 年中国新能源汽车销量", output: "根据最新数据：\n- 2024 年预计销量 1000 万辆\n- 同比增长 35%\n- 比亚迪、特斯拉居前两位" },
      { input: "怎么在 Word 里加页码？", output: "操作步骤：\n1. 双击页脚区域\n2. 点击'页码'按钮\n3. 选择样式\n（附截图说明）" }
    ],
    steps: ["说出你要查的", "AI 百度搜索并整理", "直接得到答案"],
    dharma: "探骊得珠 · 去粗取精\n搜索只是手段，找到答案才是目的。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/baidu-search"
  },
  {
    no: "04", gate: "观", code: "TAVILY",
    name: "AI 专用的搜索引擎",
    desc: "不是给人看的链接列表，是给 AI 看结构化答案的搜索。结果直接变成你问题的回答。",
    techName: "Tavily Web Search", source: "skillhub", rating: 5, verified: true,
    installs: "4.9万", downloads: "77",
    fullDesc: "专为 AI 设计的搜索 API，它能理解你的问题，从多个来源提取信息，整合成一份可直接使用的答案。",
    examples: [
      { input: "分析当前跨境电商的市场机会", output: "市场分析报告：\n1. 市场规模：5 万亿元\n2. 增长趋势：年增 25%\n3. 主要机会：东南亚市场..." }
    ],
    steps: ["描述研究问题", "AI 多源搜索分析", "得到结构化报告"],
    dharma: "寻根问底 · 不止于表\n好的搜索不只是找到，是理解后重新组织。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/tavily"
  },
  {
    no: "05", gate: "观", code: "YOUTUBE",
    name: "视频看完，省下 40 分钟",
    desc: "YouTube/B站链接丢进去，要点、金句、时间戳都帮你理好。看讲座、学课程、追访谈都能用。",
    techName: "YouTube Watcher", source: "skillhub", rating: 4, verified: true,
    installs: "4.0万", downloads: "218",
    fullDesc: "支持主流视频平台的链接提取和总结，生成带时间戳的要点笔记，让你快速判断是否值得完整观看。",
    examples: [
      { input: "总结这个 TED 演讲", output: "主题：如何在工作中保持创造力\n要点1：每天留出 30 分钟无目的探索（02:15）\n要点2：接受不完美（08:30）..." }
    ],
    steps: ["粘贴视频链接", "AI 分析并总结", "得到带时间戳的笔记"],
    dharma: "观其大略 · 取其精华\n不是每个视频都值得从头看到尾。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/youtube-watcher"
  },

  // ========== 思 ==========
  {
    no: "06", gate: "思", code: "ONTOLOGY",
    name: "搭一个只属于你的知识库",
    desc: "把你读过的文章、写过的笔记、存过的资料都丢进去，以后问什么都先查自己的脑子，再查全网。",
    techName: "ontology", source: "skillhub", rating: 5, verified: true,
    installs: "18.4万", downloads: "406",
    fullDesc: "类型化知识图谱，用于结构化智能体记忆与可组合技能。支持创建/查询实体（人员、项目、任务、事件、文档）及关联。",
    examples: [
      { input: "我之前关于'习惯养成'写过什么？", output: "根据你的知识库：\n- 2024.03《习惯力量》笔记：微习惯策略\n- 2024.01 日记：21 天打卡体验\n- 相关概念：番茄工作法" },
      { input: "帮我整理一下这个项目的所有资料", output: "已整理项目知识图谱：\n- 文档 15 份\n- 会议记录 8 条\n- 待办事项 12 个\n- 关联人员 5 人" }
    ],
    steps: ["告诉 AI 你的信息", "自动构建知识图谱", "以后问什么都查自己的库"],
    dharma: "为己之学 · 积少成多\n真正的知识是你自己的笔记，不是搜索引擎。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/ontology"
  },
  {
    no: "07", gate: "思", code: "OBSIDIAN",
    name: "让 AI 帮你管 Obsidian 笔记",
    desc: "用 Markdown 写的笔记都在 Obsidian 里？AI 能帮你搜索、整理、关联，让笔记活起来。",
    techName: "Obsidian", source: "skillhub", rating: 4, verified: true,
    installs: "9.4万", downloads: "274",
    fullDesc: "操作 Obsidian 仓库（纯 Markdown 笔记）并通过 obsidian-cli 自动化。让你的笔记库变成可查询的知识图谱。",
    examples: [
      { input: "我的笔记里关于'产品思维'的内容", output: "找到相关笔记 7 篇：\n1. 《产品思维三十讲》摘录\n2. 读书笔记：启示录\n3. 项目复盘..." },
      { input: "帮我建立这些笔记的关联", output: "已建立双向链接：\n- 产品思维 → 用户体验\n- 产品思维 → 需求分析\n- 建议：创建一个'产品知识'索引页" }
    ],
    steps: ["连接你的 Obsidian 笔记库", "AI 建立索引和关联", "自然语言查询你的笔记"],
    dharma: "温故知新 · 触类旁通\n笔记不是存档，是活的思维网络。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/obsidian"
  },
  {
    no: "08", gate: "思", code: "NOTION",
    name: "把想法直接落进 Notion",
    desc: "说一句'把这几个点整理到我的 Notion 项目管理页'，它真的就去做了。",
    techName: "Notion", source: "skillhub", rating: 4, verified: true,
    installs: "7.1万", downloads: "190",
    fullDesc: "连接 Notion，AI 可以创建页面、更新数据库、整理内容。你的想法直接变成结构化的笔记。",
    examples: [
      { input: "把今天的会议记录整理成 Notion 页面", output: "已在 Notion 创建页面：\n标题：产品周会 2024.03.15\n标签：#会议 #产品\n内容：已整理格式和待办" },
      { input: "把这个加到我的读书清单数据库", output: "已添加到'读书清单'：\n书名：XXX\n状态：想读\n标签：产品、思维" }
    ],
    steps: ["授权 Notion 访问", "描述你要做什么", "AI 执行操作"],
    dharma: "思随行起 · 行有所归\n想法不落地，就只是想法。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/notion"
  },
  {
    no: "09", gate: "思", code: "AGENT-MEMORY",
    name: "让 AI 真的记得你",
    desc: "每次开对话都要重新交代背景？这个技能让 AI 记住你的项目、偏好、上下文，下次直接接着聊。",
    techName: "Agent Memory", source: "skillhub", rating: 5, verified: true,
    installs: "4.6万", downloads: "14",
    fullDesc: "跨对话持久记忆，AI 会自动提取并记住你分享的信息，在后续对话中主动调用，像真的认识你一样。",
    examples: [
      { input: "我叫小明，在做一款面向大学生的健身APP", output: "[已记住] 好的小明，了解了你的健身APP项目。" },
      { input: "（新对话）上次那个APP叫什么名字来着？", output: "你上次提到的健身APP应该还没确定名字，但我知道它是面向大学生的。" }
    ],
    steps: ["第一次对话时自然介绍背景", "AI 自动提取并记忆", "后续对话自动调用上下文"],
    dharma: "知人者智 · 自知者明\n好的对话，是记得上一次说了什么的。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/agent-memory"
  },
  {
    no: "10", gate: "思", code: "ELITE-MEMORY",
    name: "长期记忆，永久保存",
    desc: "不止一次对话，是永久记住。你的项目、偏好、经验都存在这里，像第二个大脑。",
    techName: "Elite Longterm Memory", source: "skillhub", rating: 4, verified: true,
    installs: "4.1万", downloads: "133",
    fullDesc: "长期记忆系统，永久保存你的重要信息。可以随时检索和调用，像你的数字外脑。",
    examples: [
      { input: "记录：我常用的这个配色方案", output: "已保存到长期记忆：\n- 背景：#f5f1e8\n- 主色：#1a1713\n- 点缀：#9c3a2a" },
      { input: "我之前存的那个配色方案是什么？", output: "你的配色方案：\n宣纸米 #f5f1e8、松墨黑 #1a1713、朱砂红 #9c3a2a" }
    ],
    steps: ["告诉 AI 要记住什么", "存入长期记忆", "随时可以调取"],
    dharma: "过目不忘 · 积微成著\n你的大脑用来思考，记忆交给 AI。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/elite-longterm-memory"
  },

  // ========== 书 ==========
  {
    no: "11", gate: "书", code: "WORD",
    name: "一句话，生成一份 Word",
    desc: "不用再打开 Word 排版。格式、封面、目录一次到位，打印出来就能交。",
    techName: "Word / DOCX", source: "skillhub", rating: 5, verified: true,
    installs: "7.0万", downloads: "147",
    fullDesc: "文档处理三件套之一，支持创建专业的 Word 文档，包括格式、封面、目录、页眉页脚等。",
    examples: [
      { input: "写一份关于'AI办公应用'的报告，3000字", output: "[生成完整 Word 文档，含封面、目录、章节、页码]" }
    ],
    steps: ["描述你要写的文档", "AI 生成并格式化", "下载 Word 文件"],
    dharma: "言之有物 · 形式得体\n好的内容配得上规范的格式。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/word-docx"
  },
  {
    no: "12", gate: "书", code: "HUMANIZER",
    name: "把 AI 文写成真人的",
    desc: "AI 写的东西一眼就能看出来？这个技能能消除 AI 味，让文字更自然。",
    techName: "Humanizer", source: "skillhub", rating: 5, verified: true,
    installs: "11.2万", downloads: "418",
    fullDesc: "消除 AI 写作痕迹，使文本更自然真实。基于维基百科'AI 写作特征'指南，识别并修正夸张象征、宣传用语、肤浅分析等模式。",
    examples: [
      { input: "[一段 AI 味很浓的文字]", output: "[修改后] 更自然的表达：\n- 去掉'总而言之''值得注意的是'\n- 减少排比句\n- 加入更口语化的表达" }
    ],
    steps: ["粘贴 AI 生成的文字", "AI 检测并修改 AI 味", "得到更自然的版本"],
    dharma: "大巧若拙 · 返璞归真\n最好的文字是看不出技巧的。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/humanizer"
  },
  {
    no: "13", gate: "书", code: "WECHAT-ARTICLE",
    name: "公众号爆款文生成器",
    desc: "标题、开头、正文、结尾 CTA，一篇公众号的套路都懂，帮你生成有人愿意读的文章。",
    techName: "wechat-article-writer", source: "skillhub", rating: 4, verified: true,
    installs: "19", downloads: "13",
    fullDesc: "专门写公众号文章的技能，懂传播规律，知道怎么写标题吸引人、怎么开头留住人、怎么结尾引导转化。",
    examples: [
      { input: "写一篇关于'AI 学习'的公众号文章", output: "[生成完整文章]\n标题：普通人学 AI，只需要这 3 步\n开头：很多人觉得 AI 很难...\n正文：\n结尾：关注我，一起学 AI" }
    ],
    steps: ["说明主题和风格", "AI 生成完整文章", "你检查后发布"],
    dharma: "先有观点，再有文字\n很多人打不开公众号，不是不会写，是没想清楚要说什么。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/wechat-article-writer"
  },
  {
    no: "14", gate: "书", code: "HUMANIZE-TEXT",
    name: "把 AI 文变得像人写的",
    desc: "又一个去 AI 味的工具，帮你把 AI 生成的文字变得更自然、更有温度。",
    techName: "Humanize AI text", source: "skillhub", rating: 4, verified: true,
    installs: "4.7万", downloads: "144",
    fullDesc: "识别并修正 AI 写作的特征模式，让文字更接近真人表达。",
    examples: [
      { input: "[AI 生成的文案]", output: "[人工化处理]\n- 调整句式，打破固定节奏\n- 加入个人化表达\n- 减少 AI 常用词" }
    ],
    steps: ["粘贴文字", "AI 优化处理", "得到更自然的版本"],
    dharma: "文如其人 · 言为心声\n好的文字应该听起来像你说话。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/humanize-ai-text"
  },
  {
    no: "15", gate: "书", code: "EMAIL-SKILL",
    name: "替你写一封不尴尬的邮件",
    desc: "拒绝、催款、道歉、推进——那些你不想动笔的邮件，它知道分寸。中英文都行。",
    techName: "imap-smtp-email", source: "skillhub", rating: 4, verified: true,
    installs: "3.8万", downloads: "79",
    fullDesc: "处理各种邮件场景，语气得体，分寸刚好。还能直接发送。",
    examples: [
      { input: "婉拒一个合作邀请", output: "感谢您的邀请，经过考虑我们目前精力有限，暂不能合作，希望未来有机会..." },
      { input: "催一下客户付款", output: "温馨提醒：关于XX项目的款项，如果方便的话请您确认一下付款进度，谢谢。" }
    ],
    steps: ["说清楚邮件场景", "AI 生成得体的邮件", "可直接发送"],
    dharma: "言有物，行有度\n最难写的不是长文，是那几句话的分寸。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/imap-smtp-email"
  },

  // ========== 造 ==========
  {
    no: "16", gate: "造", code: "PPTX",
    name: "一段话，一份 PPT",
    desc: "告诉它要讲什么、讲给谁听、多少页。配色、版式、图表自动安排。",
    techName: "Powerpoint / PPTX", source: "skillhub", rating: 5, verified: true,
    installs: "3.3万", downloads: "58",
    fullDesc: "文档处理三件套之一，自动生成 PPT，支持自定义样式、图表、动画。",
    examples: [
      { input: "做一份关于'产品迭代计划'的汇报，10页", output: "[生成完整 PPTX，含目录、现状分析、迭代方案、时间轴]" }
    ],
    steps: ["描述主题和受众", "指定页数和风格", "AI 生成 PPT 文件"],
    dharma: "先有骨架，再有血肉\n做 PPT 之前，先想清楚这三件事：说什么、给谁看、要什么行动。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/powerpoint-pptx"
  },
  {
    no: "17", gate: "造", code: "XLSX",
    name: "把一堆乱表格整出来",
    desc: "合并多张表、算公式、清洗脏数据、画图。不会 VLOOKUP 也能干净地收尾一个 Excel。",
    techName: "Excel / XLSX", source: "skillhub", rating: 5, verified: true,
    installs: "6.7万", downloads: "123",
    fullDesc: "文档处理三件套之一，处理 Excel 的专业工具。合并、清洗、计算、可视化，一条龙。",
    examples: [
      { input: "把这三张表合并，按日期排序", output: "[生成合并后的表格，去重，排序整齐]" },
      { input: "分析这份销售数据，画个图", output: "[生成 Excel，含原始数据和可视化图表]" }
    ],
    steps: ["上传或描述表格数据", "说明处理需求", "AI 生成新的 Excel 文件"],
    dharma: "数中有理 · 表而达之\n数据不只是数字，是有故事的信息。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/excel-xlsx"
  },
  {
    no: "18", gate: "造", code: "PDF",
    name: "把任何东西输出成 PDF",
    desc: "报告、合同、电子书、日报。页眉、页码、封面、目录齐全，直接能印、能发、能归档。",
    techName: "Pdf", source: "skillhub", rating: 5, verified: true,
    installs: "4.0万", downloads: "30",
    fullDesc: "从任意内容生成专业 PDF。支持页眉页脚、页码、目录、封面等完整要素。",
    examples: [
      { input: "把这份文档生成 PDF，加封面和页码", output: "[生成完整 PDF，可直接打印或归档]" }
    ],
    steps: ["提供内容或文档", "指定 PDF 样式", "AI 生成文件"],
    dharma: "善始善终 · 可存可传\n一份好的文档，要能存、能印、能分享。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/pdf"
  },
  {
    no: "19", gate: "造", code: "NANO-PDF",
    name: "用说话的方式编辑 PDF",
    desc: "不说'打开 Acrobat 点这里点那里'，直接说'把第 3 页删了''加个水印'，它就懂。",
    techName: "Nano Pdf", source: "skillhub", rating: 4, verified: true,
    installs: "8.1万", downloads: "148",
    fullDesc: "使用自然语言指令编辑 PDF，不用学复杂的专业软件。",
    examples: [
      { input: "把这份 PDF 的第 1-3 页提取出来", output: "[已提取生成新 PDF]" },
      { input: "给所有页面加个水印'内部资料'", output: "[已添加水印]" }
    ],
    steps: ["上传 PDF 文件", "用自然语言描述操作", "AI 执行并输出新文件"],
    dharma: "大道至简 · 行云流水\n好的工具，是听懂人话而不是让人学话。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/nano-pdf"
  },
  {
    no: "20", gate: "造", code: "NANO-BANANA",
    name: "用 AI 生成图片",
    desc: "说你要什么图，AI 帮你生成。文章配图、海报素材、表情包，都能做。",
    techName: "Nano Banana Pro", source: "skillhub", rating: 5, verified: true,
    installs: "11.5万", downloads: "275",
    fullDesc: "使用 Gemini 3 Pro Image 生成或编辑图像。支持文生图、图生图及 1K/2K/4K 分辨率。",
    examples: [
      { input: "生成一张禅意风格的海报，主题是'慢下来'", output: "[生成图片：宣纸底色，水墨笔触，极简留白]" },
      { input: "给这篇文章配个插图，关于远程办公", output: "[生成插图：温暖的居家办公场景]" }
    ],
    steps: ["描述你想要的图", "AI 生成图片", "下载使用"],
    dharma: "一图千言 · 意在笔先\n好的配图不只是装饰，是内容的延伸。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/nano-banana-pro"
  },

  // ========== 行 ==========
  {
    no: "21", gate: "行", code: "AGENT-BROWSER",
    name: "AI 代你操作浏览器",
    desc: "订机票、查快递、填表单、抓数据——那些重复点击的事交给它。你只需要说'帮我订下周去上海的高铁'。",
    techName: "Agent Browser", source: "skillhub", rating: 5, verified: true,
    installs: "20.8万", downloads: "597",
    fullDesc: "基于 Rust 的快速无头浏览器自动化，允许 AI 通过结构化命令执行页面导航、点击、输入和快照操作。",
    examples: [
      { input: "帮我查下北京到上海的机票，下周三早上出发", output: "[AI 打开订票网站，搜索，返回结果]" },
      { input: "把这个网页的数据抓下来", output: "[AI 打开网页，定位数据，提取生成表格]" }
    ],
    steps: ["描述你要做的操作", "AI 控制浏览器执行", "得到结果或确认"],
    dharma: "工欲善事 · 假物于人\n重复的事，交给机器。你去想更重要的事。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/agent-browser"
  },
  {
    no: "22", gate: "行", code: "GOG",
    name: "让 AI 管你的邮箱和日历",
    desc: "Gmail、日历、云盘、通讯录、表格、文档——Google 全家桶，AI 都能帮你操作。",
    techName: "Gog", source: "skillhub", rating: 4, verified: true,
    installs: "13.7万", downloads: "745",
    fullDesc: "Google Workspace 命令行工具，支持 Gmail、日历、云端硬盘、通讯录、表格和文档。",
    examples: [
      { input: "把今天的邮件分类，重要的标出来", output: "[邮件已分类：5 封重要需回复，12 封可归档]" },
      { input: "下周二下午安排个会议，主题是项目复盘", output: "[已在日历创建会议，并发送邀请]" }
    ],
    steps: ["授权 Google 账号", "告诉 AI 你的需求", "AI 执行操作"],
    dharma: "事有缓急 · 收放自如\n工具不是目的，是把时间花在更重要的事上。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/gog"
  },
  {
    no: "23", gate: "行", code: "DESKTOP-CONTROL",
    name: "让 AI 控制你的电脑",
    desc: "打开软件、操作文件、执行命令——你说，AI 做。像有个懂技术的助手坐在你电脑前。",
    techName: "Desktop Control", source: "skillhub", rating: 4, verified: true,
    installs: "4.5万", downloads: "215",
    fullDesc: "桌面级控制，AI 可以直接操作你的电脑，执行各种任务。",
    examples: [
      { input: "帮我打开 Photoshop 并把这几张图压缩", output: "[AI 打开软件，执行操作，输出压缩后的图片]" },
      { input: "把这些文件按日期整理到不同文件夹", output: "[AI 创建文件夹，移动文件]" }
    ],
    steps: ["描述你要做的操作", "AI 控制电脑执行", "确认结果"],
    dharma: "指臂使使 · 如运诸掌\n好的工具是你想的，它做的。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/desktop-control"
  },
  {
    no: "24", gate: "行", code: "AUTOMATION",
    name: "把重复的事变成自动化",
    desc: "每天都要做的流程？让 AI 记住步骤，以后一键执行。节省时间，减少出错。",
    techName: "Automation Workflows", source: "skillhub", rating: 4, verified: true,
    installs: "5.9万", downloads: "182",
    fullDesc: "工作流自动化，把重复性的操作变成可复用的流程。",
    examples: [
      { input: "记录一下这个周报生成流程，以后自动做", output: "[已保存工作流：收集数据 → 生成周报 → 发送邮件]" },
      { input: "执行'周报'工作流", output: "[自动执行全流程，完成周报]" }
    ],
    steps: ["描述你的工作流程", "AI 记录并自动化", "以后一键执行"],
    dharma: "融会贯通 · 举一反三\n流程的价值不在一次，在于可重复。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/automation-workflows"
  },
  {
    no: "25", gate: "行", code: "BROWSER-USE",
    name: "又一个浏览器自动化工具",
    desc: "和 Agent Browser 类似，用 Python 写的。有些网站用这个更稳。",
    techName: "Browser Use", source: "skillhub", rating: 4, verified: true,
    installs: "4.3万", downloads: "65",
    fullDesc: "Python 实现的浏览器自动化工具，在某些场景下比 Agent Browser 更稳定。",
    examples: [
      { input: "帮我抓取这个网页的所有文章标题", output: "[AI 打开网页，提取数据，返回列表]" }
    ],
    steps: ["描述操作需求", "AI 自动化执行", "得到结果"],
    dharma: "殊途同归 · 百虑一致\n目的相同，工具不同，选最顺手的用。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/browser-use"
  },

  // ========== 和 ==========
  {
    no: "26", gate: "和", code: "WEATHER",
    name: "今天天气怎么样",
    desc: "不用打开天气 APP，直接问。今天下雨吗？明天冷吗？要不要带伞？AI 帮你查。",
    techName: "Weather", source: "skillhub", rating: 4, verified: true,
    installs: "15.7万", downloads: "295",
    fullDesc: "获取当前天气和预报（无需 API 密钥）。每天早上问一句，穿衣出行有数。",
    examples: [
      { input: "今天上海天气怎么样？", output: "上海今天：\n- 温度：15-22℃\n- 天气：多云转晴\n- 建议：早晚偏凉，适当添衣" },
      { input: "这周会下雨吗？", output: "本周天气预报：\n周一二：晴\n周三：小雨\n周四五：晴" }
    ],
    steps: ["直接问天气", "AI 查询并回答", "得到出行建议"],
    dharma: "未雨绸缪 · 顺势而为\n每天一句问安，是对自己最基本的照顾。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/weather"
  },
  {
    no: "27", gate: "和", code: "NEWS-SUMMARY",
    name: "每天早上的新闻摘要",
    desc: "不用刷半小时新闻，AI 帮你总结今天最重要的几条。十分钟看完，够用了。",
    techName: "News Summary", source: "skillhub", rating: 4, verified: true,
    installs: "3.7万", downloads: "77",
    fullDesc: "新闻聚合与摘要，从海量资讯中筛选出重要信息，节省你的阅读时间。",
    examples: [
      { input: "今天有什么重要新闻？", output: "今日要闻：\n1. [科技] 腾讯发布 SkillHub\n2. [经济] 央行宣布...\n3. [国际] ...\n（每条 50 字摘要）" }
    ],
    steps: ["直接问今日新闻", "AI 汇总并摘要", "得到精简版资讯"],
    dharma: "兼收并蓄 · 去粗取精\n信息时代，'不读'比'多读'更重要。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/news-summary"
  },
  {
    no: "28", gate: "和", code: "TENCENT-COS",
    name: "把文件存到腾讯云",
    desc: "图片、文档、视频——AI 帮你上传到腾讯云 COS，存好以后随时取用。",
    techName: "Tencent COS", source: "skillhub", rating: 4, verified: true,
    installs: "6.3千", downloads: "4",
    fullDesc: "腾讯云对象存储服务，安全可靠地存储你的各类文件。",
    examples: [
      { input: "把这些照片上传到腾讯云", output: "[已上传 15 张照片到 COS]\n存储桶：my-bucket\n路径：/photos/2024-03-15/" }
    ],
    steps: ["选择要存的文件", "AI 上传到云", "获得可分享的链接"],
    dharma: "善藏不如善藏\n好的存储是不占你本地空间，但随时能调取。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/tencent-cos"
  },
  {
    no: "29", gate: "和", code: "TENCENT-ASR",
    name: "把语音转成文字",
    desc: "录音、会议、语音消息——腾讯云的语音识别帮你转成文字，支持方言和多种语言。",
    techName: "TencentCloud ASR", source: "skillhub", rating: 4, verified: true,
    installs: "1.5千", downloads: "1",
    fullDesc: "腾讯云语音识别服务，将语音转换为文字。",
    examples: [
      { input: "把这段会议录音转成文字", output: "[已转写]\n会议时长：45 分钟\n文字稿：5000 字\n识别准确率：95%" }
    ],
    steps: ["上传音频文件", "AI 语音识别", "得到文字稿"],
    dharma: "言为心声 · 落纸为证\n好想法值得被记下来，不只是飘在空中。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/tencentcloud-asr"
  },
  {
    no: "30", gate: "和", code: "SKILL-CREATOR",
    name: "把你自己的经验变成一个 Skill",
    desc: "你有你的方法论。描述一下，AI 就能把它打包成一个可复用、可分享的 Skill。",
    techName: "Skill Creator", source: "skillhub", rating: 5, verified: true,
    installs: "7.5万", downloads: "152",
    fullDesc: "创建自定义技能的工具。把你的一套方法论或工作流程打包成 Skill，自己用或分享给团队。",
    examples: [
      { input: "我有一套'三分钟写作法'，想做成 Skill", output: "[AI 引导你描述方法，生成 Skill 代码，可安装使用]" },
      { input: "把我们团队的复盘流程做成 Skill", output: "[生成团队专属 Skill，成员都能用统一格式做复盘]" }
    ],
    steps: ["描述你的方法论", "AI 引导完善并生成", "得到可用的 Skill"],
    dharma: "经验即技能 · 方法可传承\n你的经验，可以变成别人也能用的工具。",
    heyiNote: "",
    skillhubUrl: "https://skillhub.cn/skills/skill-creator"
  }
];

// 获取所有技能
export function getAllSkills() {
  return skills;
}

// 根据六门获取技能
export function getSkillsByGate(gateId) {
  return skills.filter(s => s.gate === gateId);
}

// 根据代码获取技能
export function getSkillByCode(code) {
  return skills.find(s => s.code === code);
}

// 获取自定义技能
export function getCustomSkills() {
  // 在小程序环境中，需要从 wx 获取
  // 这里返回空数组，实际使用时在页面中调用 wx.getStorageSync
  if (typeof wx !== 'undefined') {
    return wx.getStorageSync('heyi_custom_skills') || [];
  }
  return [];
}

// 根据ID获取自定义技能
export function getCustomSkillById(id) {
  const customSkills = getCustomSkills();
  return customSkills.find(s => s.id === id);
}

// 获取所有技能（包括自定义）
export function getAllSkillsWithCustom() {
  const customSkills = getCustomSkills();
  return [...skills, ...customSkills];
}

// 搜索技能（包括自定义）
export function searchSkills(keyword) {
  const allSkills = getAllSkillsWithCustom();
  if (!keyword.trim()) {
    return allSkills;
  }

  const keywordLower = keyword.toLowerCase();
  return allSkills.filter(s => {
    const searchIn = [
      s.name,
      s.desc,
      s.gate,
      s.techName || ''
    ].join(' ').toLowerCase();

    return searchIn.includes(keywordLower);
  });
}

// 获取推荐搜索词
export const searchSuggestions = [
  "总结 PDF",
  "生成 PPT",
  "写公众号",
  "Excel 数据分析",
  "PDF 编辑",
  "邮件写作",
  "天气查询",
  "新闻摘要"
];

// 统计信息
export const stats = {
  total: skills.length,
  bySource: {
    skillhub: skills.length  // 全部来自 SkillHub
  },
  byGate: {
    观: skills.filter(s => s.gate === '观').length,
    思: skills.filter(s => s.gate === '思').length,
    书: skills.filter(s => s.gate === '书').length,
    造: skills.filter(s => s.gate === '造').length,
    行: skills.filter(s => s.gate === '行').length,
    和: skills.filter(s => s.gate === '和').length
  }
};
