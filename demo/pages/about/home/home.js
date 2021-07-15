const QIMOSDK = requirePlugin('7moorSDK');

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    bannerImage: '/images/logo.png',
    account: '',
    accessId: '',
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    curentAgent: '',
    agentObj: [
      '淳淳丨w6herA97Yg4kYMLF',
      '婧姐丨p4h6DEi4qyopWkcP',
      '宋鹏丨1NiyDvoOiGzlGqQ8',
      '晓琪丨nuZ95M0aefuDfoGk',
      '其他丨请在下方输入框手动填写',
    ],
    qimoLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAADcklEQVRYhe2YbWjPURTHP5tZ2vLC1F7sladSkhdLibC9wMhDachDrITyzJb4K6OtWB6WzfjLUB6avECJrVjsIQk1tLzxlq228kKYx6Ez51/Xv/u7v4e/KeVb/+7/f8859/+995577jk3LbehnBSQA6wFCoA+oA24ALyPOmR6RLss4CDwBjgCLACWAXXAO2Bf1LGjGJUCH4CYQ6cC6AfWDyYhWYH7wLEQNmeA68DsP0loMnAOuAoUhiCTwGLgDnASmJgKIXHYw8ATdVwvVAP5wBSg1qG3CehU38sKQygN2KMOu8vxB1eAmUAZ8BR4DGwH5gA3HHYx9cFSm3BIdnGB+XsN8AyY5RhQUAJIvOgCioBVwAyVtej2dgMLHWMUqQt8BF4kOs0VqtEY4kJMbS4CW4BvQBNwAKgEWoHvOrF6mbAS90Khkj+avELSsdNhKLFmEXBX2+PANoe+OPJ4oAe4BJzV/qke+tN0oi0SqfN06W2QgeJAh56QjeqcYVCtny7dVhljhYd9lrAq9hAu18DWoSejMwIZ1Hlfa/RuB1Y6AmZRBpBnESwBrun3UzorLzSqbqY693QPPYneucBWXfk0DZwmxnjFoZfa7vYhswGYD5wHTuuWlDn05SCs0+/dFnmmKzCKrMpDVq4nqN4iE3/JBg552LomSIZDNsqjX7bkgWtQTUX2qt6tJFm+ErbCtUI2o9oAZEzcNnzRxMgohGzoC6kv+BxGOWqCNmj4T8gP/xShH5a+cYPIZQAuQq8sfXKlVPnEr0Ej9FYT9GTIdfJVr4G/RihT27jD9oRPDhWZ0FdL/1Jtm31SDue9FJXQI0u/bEuD3t5xdeYai15zCv/d70WoycNAsro2LQw/ATu04Ev4VdxnS/3QYZG3pmtSvtphbGZ89zTDHGbUWX7IscglpPQC+40+ydMfJpz6siZayamCCbNeD3phyiTmWvp7tK3QrGJ44oCYp6xR6yhXxkfAej3xDlBhkUk68sX43Wc+39iOvV/Gh1GvyzKPNfqDvAM4/c7vwSpo6SOzHqo1mwsxvNPiASSX0sno1a2U2n2E4y6boIWhF+QdYLOGEieC3vY3gXlawoRFidZi7UHswqYfdbo1lQF0zXeAwIiSD8kDgzjeaH69HyVDTpbEHvEVWwrjRKqvsAJ5fJqkAfZ52KT+NwA/ATQwsre1hd8JAAAAAElFTkSuQmCC'
  },
  attached() {
    let that = this;
    // 监听 页面跳转 回调事件
    QIMOSDK._onOpenOrderCard((type) => {
      if (type === 'canOpen') {
        this.goto();
      }
    });
    // console.log("success");
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(set) {
        console.log("getSetting ==> set.authSetting['scope.userInfo']", set.authSetting['scope.userInfo']);
        // if (!set.authSetting['scope.userInfo']) {
        // }
        wx.authorize({
          scope: 'scope.userInfo',
          success (r) {
            console.log("authorize ==> r", r);
            // 初始化用户参数
            wx.getUserInfo({
              success: function(res) {
                console.log('miniprogram getUserInfo:\n', res);
                that.setData({ bannerImage: res.userInfo.avatarUrl });
                QIMOSDK._initUserParams({
                  uid: res.signature,
                  nickName: res.userInfo.nickName || '淳淳测试访客昵称',
                  avatar: res.userInfo.avatarUrl || 'https://img2.baidu.com/it/u=2421505363,3507499484&fm=26&fmt=auto&gp=0.jpg',
                });
              }
            });
          },
          fail (err) {
            console.log('authorize err:\n', err);
            // 测试代码
            wx.getUserInfo({
              success: function(res) {
                console.log('miniprogram getUserInfo:\n', res);
                that.setData({ bannerImage: res.userInfo.avatarUrl });
                QIMOSDK._initUserParams({
                  uid: res.signature,
                  nickName: res.userInfo.nickName || '淳淳测试访客昵称',
                  avatar: res.userInfo.avatarUrl || 'https://img2.baidu.com/it/u=2421505363,3507499484&fm=26&fmt=auto&gp=0.jpg',
                });
              }
            });
          },
        })
      }
    })
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    /** 页面跳转函数 */
    goto() {
      // todo 模拟跳转至 商品卡片列表 页面
      wx.navigateTo({
        url: '/pages/plugin/indexes/indexes',
        fail: function(res) {
          console.log('======= fail res:\n', res);
        },
      });
    },
    PickerChange(e) {
      this.setData({ curentAgent: e.detail.value });
    },
    changeAccount(e) {
      this.setData({ account: e.detail.value });
    },
    changeAccessId(e) {
      this.setData({ accessId: e.detail.value });
    },
    gotoQIMOSDK(e) {
      let value = '';
      let select = this.data.agentObj[this.data.curentAgent];
      if (select) {
        select = select.split('丨')[1];
        value = select;
      } else {
        wx.showToast({
          title: '请选择渠道ID',
          icon: 'none',
        });
        return false;
      }
      if (select === '请在下方输入框手动填写') {
        if (this.data.accessId) {
          value = this.data.accessId;
        } else {
          wx.showToast({
            title: '请输入渠道ID',
            icon: 'none',
          });
          return false;
        }
      }
      // const accessId = e.currentTarget.dataset.accessid;
      QIMOSDK._initAccessId(value);
      wx.navigateTo({
        url: 'plugin://7moorSDK/chat',
      });
      // wx.showLoading({
      //   title: '正在加载...',
      // })
      // // 延迟 2 秒跳转
      // setTimeout(function () {
      //   wx.hideLoading();
      // }, 500);
    },
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})