# 合一 Skills · v2 小程序包

## 文件说明

此 `heyiSkills-v2/` 目录包含重构后的**合一 Skills 小程序**，按「禅意极简」设计系统实现。

### 新增页面
- `pages/launch/` — 启动页（太极图腾 + 合一字样 + 自动跳转）
- `pages/onboarding/` — 两步新手引导（六门 + 三律）
- `pages/search/` — 独立搜索页（关键词高亮 + 最近搜索）

### 重构页面
- `pages/index/` — 首页：每日一念 / 六门 / 今日荐 / 近日所行
- `pages/list/` — 分门列表：大门牌 + 筛选 chip + 卡片
- `pages/detail/` — 技能详情：四段式（这是什么 / 看效果 / 怎么用 / 心法）
- `pages/favorites/` — 「藏」页：收藏 + 历史
- `pages/mine/` — 「己」页：六门修习进度 + 自制之技 + 今日一念

### 系统文件
- `app.json` — tabBar 改为「合一 / 藏 / 己」，新增 3 页
- `app.wxss` — 统一设计 token（三色 / 三体 / 三律）

## 合入步骤

1. **备份**：先把你原 `heyiSkills/` 备份一份
2. **替换**：把此目录下的 `app.json` / `app.wxss` / `pages/*` 覆盖过去
3. **保留**：`utils/` / `cloud/` / `project.config.json` / 云函数**不动**
4. **新建页面需微信 IDE 里重新 "创建同名目录" 或直接 `npm install` 后重启

## 注意事项

- 所有 WXML/WXSS 都基于你现有 `utils/cloud.js` 的接口：`getSkills / getFavoriteSkills / getHistorySkills / getCustomSkills / clearHistory`。如果 `clearHistory` 没实现，favorites.js 里有容错。
- `launch` 页会读 localStorage `heyi_onboarded`，首次进入自动去 onboarding。
- 没有修改任何 `utils/*.js` 或 `cloudfunctions/*`。

## 设计系统摘要

- **三色**：宣纸 `#f5f1e8` / 松墨 `#1a1713` / 朱砂 `#9c3a2a`
- **三体**：Noto Serif SC（骨）· Cormorant Garamond Italic（气）· JetBrains Mono（身）
- **三律**：留白过半 · 线条克制 · 朱砂克制（只作强调 + 状态）

---

合一 Lab · 比你早一步的同路人
