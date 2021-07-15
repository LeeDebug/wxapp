const app = getApp();
const QIMOSDK = requirePlugin('7moorSDK');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true
  },
  onLoad() {
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  },

  handleSendCard() {
    // todo 模拟 页面重定向至 插件
    wx.redirectTo({
      url: 'plugin://7moorSDK/chat',
      success: function(res) {
        const order = {
          title: '任天堂（Nintendo）Switch游戏机',
          desc: '任天堂（Nintendo） Switch NS NX掌上游戏机便携 塞尔达马里奥新款游戏机 主机不锁 日版黑机彩色手柄+中文赛/塞尔达传说(指南+地图)',
          note: '$2330',
          picture: 'https://img10.360buyimg.com/n5/s75x75_jfs/t4030/290/29851193/293745/d5e2b731/58ac3506Nbb57b5f6.jpg',
          url: 'https://www.qi.163.com/',
          isShow: 1,
          sendByUser: 1,
          extraParam: {
            param1: '_$onClickAction事件回调中可能需要的额外参数'
          },
        };
        QIMOSDK._sendOrderCard(order);
      },
      fail: function(res) {
        console.log('======= fail res:\n', res);
      },
    });
  },

});