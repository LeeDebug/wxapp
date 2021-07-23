const app = getApp();
const QIMOSDK = requirePlugin('QIMOSDK');
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

  handleSendCard(e) {
    const type = e.currentTarget.dataset.type;
    // todo 模拟 页面重定向至 插件
    wx.redirectTo({
      url: 'plugin://QIMOSDK/chat',
      success: function(res) {
        let msg = null;
        if (type === 'A') {
          msg = '20210719113430';
          QIMOSDK._sendTextMessage(msg);
        } else {
          msg = {
            orderList: [ // 订单列表
              {
                clickTarget: 'uesr', // 订单点击事件
                clickUrl: 'TARGETTYPE_USER',
                content: '这是商品描述或者为订单描述文字说明说明说明', // 商品备注
                imgUrl: 'https://dpic.tiankong.com/1n/e2/QJ6231550446.jpg@!350h', // 商品图片
                price: '￥9999' // 价格
              },
              {
                clickTarget: 'uesr', // 订单点击事件
                clickUrl: 'TARGETTYPE_USER',
                content: '这是商品描述或者为订单描述文字说明说明说明', // 商品备注
                imgUrl: 'https://dpic.tiankong.com/1n/e2/QJ6231550446.jpg@!350h', // 商品图片
                price: '￥9999' // 价格
              },
              {
                clickTarget: 'uesr', // 订单点击事件
                clickUrl: 'TARGETTYPE_USER',
                content: '这是商品描述或者为订单描述文字说明说明说明', // 商品备注
                imgUrl: 'https://dpic.tiankong.com/1n/e2/QJ6231550446.jpg@!350h', // 商品图片
                price: '￥9999' // 价格
              }
            ],
            orderNum: '0123456789012345', // 订单编号
            orderNumName: '订单号:', // 订单单号的标题
            orderTitle: '商品订单' // 订单标题
          }
          QIMOSDK._sendOrderCardMessage(msg);
        }
      },
      fail: function(res) {
        console.log('======= fail res:\n', res);
      },
    });
  },

});