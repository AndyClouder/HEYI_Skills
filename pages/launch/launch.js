Page({
  onLoad() {
    const seen = wx.getStorageSync('heyi_onboarded')
    setTimeout(() => {
      if (seen) {
        wx.switchTab({ url: '/pages/index/index' })
      } else {
        wx.redirectTo({ url: '/pages/onboarding/onboarding' })
      }
    }, 1800)
  }
})
