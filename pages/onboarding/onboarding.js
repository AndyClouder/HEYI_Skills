const { gates } = require('../../utils/data.js')

Page({
  data: {
    step: 0,
    gates
  },
  next() {
    this.setData({ step: this.data.step + 1 })
  },
  finish() {
    wx.setStorageSync('heyi_onboarded', true)
    wx.switchTab({ url: '/pages/index/index' })
  }
})
