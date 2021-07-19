const QIMOSDK = requirePlugin('7moorSDK');

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    bannerImage: '/images/logo.png',
    userProfile: null,
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
    // 初始化 更多按钮的加号 展示类型
    QIMOSDK._initMoreBtnsShowType('onlyAgent');
    // 监听 自定义事件 回调函数
    QIMOSDK._onCustomEventCallBack((eventType, params) => {
      // 打开 订单列表 的事件
      if (eventType === '_onOpenOrderCard') {
        this.openCardListPage();
      }
    });
  },
  methods: {
    /** 页面跳转函数 */
    openCardListPage() {
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
      // 先获取用户授权
      if (!this.data.userProfile) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        try {
          console.log('企业微信中的 wx 实例:\n', wx);
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              // console.log('getUserProfile:\n', res);
              this.setData({
                userProfile: res,
                bannerImage: res.userInfo.avatarUrl,
              });
              QIMOSDK._initUserParams({
                uid: res.signature,
                nickName: res.userInfo.nickName || '淳淳测试访客昵称',
                avatar: res.userInfo.avatarUrl || 'https://img2.baidu.com/it/u=2421505363,3507499484&fm=26&fmt=auto&gp=0.jpg',
                  __ApiRootUrl: 'https://dev1-v7-webchat.7moor.com',
              });
            },
            fail (err) {
              console.log('getUserProfile err:\n', err);
            },
          });
        } catch (error) {
          console.error('wx.getUserProfile 报错:\n', error);
          this.setData({
            userProfile: { error },
          });
          QIMOSDK._initUserParams({
              __ApiRootUrl: 'https://dev1-v7-webchat.7moor.com',
          });
        }
        return false;
      }
      // 判断是否选择或输入了渠道ID
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
      // 初始化 渠道ID
      QIMOSDK._initAccessId(value);
      // 戴森 七鱼
      // "version": "1.2.3",
      // "provider": "wxae5e29812005203f"
      // 初始化配置信息
      // QIMOSDK.__configAppId('BvsC24eUXzT');
      // QIMOSDK._$configAppKey('37158cd867677d2d74775f408a5de331');
      // 前往 客服 页面
      wx.navigateTo({
        url: 'plugin://7moorSDK/chat',
      });
    },
  }
})