// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { code, collection = 'skills' } = event

    if (!code) {
      return {
        success: false,
        error: 'code 参数缺失'
      }
    }

    const res = await db.collection(collection)
      .where({
        code: code
      })
      .get()

    return {
      success: true,
      data: res.data[0] || null
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
