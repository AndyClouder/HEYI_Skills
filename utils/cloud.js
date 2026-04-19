// 合一 Skills - 云数据库操作封装

// 集合名称
const COLLECTIONS = {
  SKILLS: 'skills',
  USERS: 'users'
}

/**
 * 初始化云数据库
 */
function initCloud() {
  if (!wx.cloud) {
    console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    return null
  }
  // 不传入环境 ID，自动使用当前环境
  return wx.cloud.init({
    env: 'default',
    traceUser: true
  })
}

/**
 * 获取数据库实例
 */
function getDB() {
  if (!wx.cloud) {
    console.error('云开发未初始化')
    return null
  }
  return wx.cloud.database()
}

/**
 * 获取当前用户 OpenID
 */
async function getOpenId() {
  try {
    const res = await wx.cloud.callFunction({
      name: 'getOpenId'
    })
    return res.result.openid
  } catch (err) {
    console.error('获取 OpenID 失败', err)
    return null
  }
}

// ============ 技能相关操作 ============

/**
 * 获取所有技能
 * @param {Object} filters - 过滤条件 {gate, source, keyword}
 */
async function getSkills(filters = {}) {
  const db = getDB()
  if (!db) return []

  try {
    let query = db.collection(COLLECTIONS.SKILLS)

    // 按门类筛选
    if (filters.gate) {
      query = query.where({
        gate: filters.gate
      })
    }

    // 按来源筛选
    if (filters.source) {
      const where = query._query.field || {}
      query = db.collection(COLLECTIONS.SKILLS).where({
        ...where,
        source: filters.source
      })
    }

    // 按关键词搜索
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      query = db.collection(COLLECTIONS.SKILLS).where({
        name: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      })
    }

    const res = await query.orderBy('createdAt', 'desc').get()
    return res.data
  } catch (err) {
    console.error('获取技能失败', err)
    return []
  }
}

/**
 * 根据 code 获取单个技能
 */
async function getSkillByCode(code) {
  const db = getDB()
  if (!db) return null

  try {
    const res = await db.collection(COLLECTIONS.SKILLS).where({
      code: code
    }).get()

    return res.data.length > 0 ? res.data[0] : null
  } catch (err) {
    console.error('获取技能失败', err)
    return null
  }
}

/**
 * 创建自定义技能
 */
async function createSkill(skillData) {
  const db = getDB()
  if (!db) return null

  try {
    const openId = await getOpenId()

    const data = {
      ...skillData,
      source: 'custom',
      authorOpenId: openId,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }

    const res = await db.collection(COLLECTIONS.SKILLS).add({ data })
    return { ...data, _id: res._id }
  } catch (err) {
    console.error('创建技能失败', err)
    return null
  }
}

/**
 * 更新技能
 */
async function updateSkill(skillId, updateData) {
  const db = getDB()
  if (!db) return false

  try {
    const openId = await getOpenId()

    // 只能更新自己的技能
    const res = await db.collection(COLLECTIONS.SKILLS).where({
      _id: skillId,
      authorOpenId: openId
    }).update({
      data: {
        ...updateData,
        updatedAt: new Date().getTime()
      }
    })

    return res.stats.updated > 0
  } catch (err) {
    console.error('更新技能失败', err)
    return false
  }
}

/**
 * 删除技能
 */
async function deleteSkill(skillId) {
  const db = getDB()
  if (!db) return false

  try {
    const openId = await getOpenId()

    // 只能删除自己的技能
    const res = await db.collection(COLLECTIONS.SKILLS).where({
      _id: skillId,
      authorOpenId: openId
    }).remove()

    return res.stats.removed > 0
  } catch (err) {
    console.error('删除技能失败', err)
    return false
  }
}

/**
 * 获取我的自定义技能
 */
async function getMySkills() {
  const db = getDB()
  if (!db) return []

  try {
    const openId = await getOpenId()

    const res = await db.collection(COLLECTIONS.SKILLS).where({
      source: 'custom',
      authorOpenId: openId
    }).orderBy('createdAt', 'desc').get()

    return res.data
  } catch (err) {
    console.error('获取我的技能失败', err)
    return []
  }
}

// ============ 用户相关操作 ============

/**
 * 获取用户数据（收藏、历史）
 */
async function getUserData() {
  const db = getDB()
  if (!db) return { favorites: [], history: [] }

  try {
    const openId = await getOpenId()

    const res = await db.collection(COLLECTIONS.USERS).where({
      _id: openId
    }).get()

    if (res.data.length === 0) {
      // 创建新用户
      await db.collection(COLLECTIONS.USERS).add({
        data: {
          _id: openId,
          favorites: [],
          history: [],
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        }
      })
      return { favorites: [], history: [] }
    }

    return {
      favorites: res.data[0].favorites || [],
      history: res.data[0].history || []
    }
  } catch (err) {
    console.error('获取用户数据失败', err)
    return { favorites: [], history: [] }
  }
}

/**
 * 切换收藏
 */
async function toggleFavorite(skillCode) {
  const db = getDB()
  if (!db) return false

  try {
    const openId = await getOpenId()
    const userData = await getUserData()

    const favorites = userData.favorites || []
    const index = favorites.indexOf(skillCode)
    const isFavorited = index >= 0

    if (isFavorited) {
      favorites.splice(index, 1)
    } else {
      favorites.push(skillCode)
    }

    await db.collection(COLLECTIONS.USERS).where({
      _id: openId
    }).update({
      data: {
        favorites: favorites,
        updatedAt: new Date().getTime()
      }
    })

    return !isFavorited
  } catch (err) {
    console.error('切换收藏失败', err)
    return false
  }
}

/**
 * 检查是否收藏
 */
async function isFavorited(skillCode) {
  const userData = await getUserData()
  return (userData.favorites || []).includes(skillCode)
}

/**
 * 添加使用历史
 */
async function addHistory(skillCode) {
  const db = getDB()
  if (!db) return

  try {
    const openId = await getOpenId()
    const userData = await getUserData()

    const history = userData.history || []

    // 移除重复记录
    const filteredHistory = history.filter(h => h.code !== skillCode)

    // 添加到开头
    filteredHistory.unshift({
      code: skillCode,
      timestamp: new Date().getTime()
    })

    // 只保留最近 100 条
    const trimmedHistory = filteredHistory.slice(0, 100)

    await db.collection(COLLECTIONS.USERS).where({
      _id: openId
    }).update({
      data: {
        history: trimmedHistory,
        updatedAt: new Date().getTime()
      }
    })
  } catch (err) {
    console.error('添加历史失败', err)
  }
}

/**
 * 清空历史
 */
async function clearHistory() {
  const db = getDB()
  if (!db) return false

  try {
    const openId = await getOpenId()

    await db.collection(COLLECTIONS.USERS).where({
      _id: openId
    }).update({
      data: {
        history: [],
        updatedAt: new Date().getTime()
      }
    })

    return true
  } catch (err) {
    console.error('清空历史失败', err)
    return false
  }
}

/**
 * 获取收藏的技能列表
 */
async function getFavoriteSkills() {
  const userData = await getUserData()
  const favorites = userData.favorites || []

  if (favorites.length === 0) return []

  const db = getDB()
  if (!db) return []

  try {
    // 云数据库 in 查询最多支持 20 个
    const chunks = []
    for (let i = 0; i < favorites.length; i += 20) {
      chunks.push(favorites.slice(i, i + 20))
    }

    const results = []
    for (const chunk of chunks) {
      const res = await db.collection(COLLECTIONS.SKILLS).where({
        code: db.command.in(chunk)
      }).get()
      results.push(...res.data)
    }

    return results
  } catch (err) {
    console.error('获取收藏技能失败', err)
    return []
  }
}

/**
 * 获取历史技能列表
 */
async function getHistorySkills() {
  const userData = await getUserData()
  const history = userData.history || []

  if (history.length === 0) return []

  const db = getDB()
  if (!db) return []

  try {
    const codes = history.map(h => h.code)
    const chunks = []
    for (let i = 0; i < codes.length; i += 20) {
      chunks.push(codes.slice(i, i + 20))
    }

    const results = []
    for (const chunk of chunks) {
      const res = await db.collection(COLLECTIONS.SKILLS).where({
        code: db.command.in(chunk)
      }).get()
      results.push(...res.data)
    }

    // 按历史记录顺序排序
    const codeIndex = new Map(codes.map((c, i) => [c, i]))
    return results.sort((a, b) => codeIndex.get(a.code) - codeIndex.get(b.code))
  } catch (err) {
    console.error('获取历史技能失败', err)
    return []
  }
}

module.exports = {
  initCloud,
  getDB,
  getOpenId,
  getSkills,
  getSkillByCode,
  createSkill,
  updateSkill,
  deleteSkill,
  getMySkills,
  getUserData,
  toggleFavorite,
  isFavorited,
  addHistory,
  clearHistory,
  getFavoriteSkills,
  getHistorySkills
}
