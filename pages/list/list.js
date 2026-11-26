const customs = require('../../data/customs.js')
const daily = require('../../data/daily.js')

function todayCard() {
  const d = new Date()
  const day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000)
  return daily[day % daily.length]
}

Page({
  data: { list: customs, tabs: ['全部', '宋代', '元代'], active: 0, today: null },
  onLoad() { this.setData({ today: todayCard() }) },
  onTab(e) {
    const i = e.currentTarget.dataset.i
    const t = this.data.tabs[i]
    this.setData({
      active: i,
      list: t === '全部' ? customs : customs.filter(x => x.dynasty === t)
    })
  },
  goDetail(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },
  goDaily() {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + this.data.today.id })
  }
})