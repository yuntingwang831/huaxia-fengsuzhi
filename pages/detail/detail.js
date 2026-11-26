const customs = require('../../data/customs.js')

Page({
  data: { item: null, riddles: [], riddle: null, ri: 0, total: 0, guess: '', status: '', score: 0, done: false },

  onLoad(options) {
    const item = customs.find(i => i.id === Number(options.id))
    this.setData({ item })
    wx.setNavigationBarTitle({ title: item.title })
    const sec = (item.sections || []).find(s => s.type === 'riddles')
    if (sec && sec.riddles.length) {
      this.setData({ riddles: sec.riddles, riddle: sec.riddles[0], total: sec.riddles.length })
    }
  },

  onGuess(e) { this.setData({ guess: e.detail.value }) },

  submit() {
    const { riddle, guess, status } = this.data
    if (!riddle || status === 'right' || status === 'shown') return
    const g = guess.trim()
    if (!g) return
    if (riddle.ans.indexOf(g) > -1) {
      this.setData({ status: 'right', score: this.data.score + 1 })
    } else {
      this.setData({ status: 'wrong' })
    }
  },

  show() {
    if (this.data.status !== 'right') this.setData({ status: 'shown' })
  },

  next() {
    const i = this.data.ri + 1
    if (i >= this.data.total) { this.setData({ done: true }); return }
    this.setData({ ri: i, riddle: this.data.riddles[i], guess: '', status: '' })
  },

  restart() {
    this.setData({ ri: 0, riddle: this.data.riddles[0], guess: '', status: '', score: 0, done: false })
  },

  onShareAppMessage() {
    const item = this.data.item
    return {
      title: (item ? item.title : '节令') + ' · 华夏风俗志',
      path: '/pages/detail/detail?id=' + (item ? item.id : 1)
    }
  }
})