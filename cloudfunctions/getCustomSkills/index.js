// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { collection = 'custom_skills', openid } = event

    // 获取用户 openid（如果未传入）
    const userOpenid = openid || cloud.getWXContext().OPENID

    const res = await db.collection(collection)
      .where({
        _openid: userOpenid
      })
      .orderBy('createdAt', 'desc')
      .get()

    return {
      success: true,
      data: res.data
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
