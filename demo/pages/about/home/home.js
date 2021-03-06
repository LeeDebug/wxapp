const QIMOSDK = requirePlugin('QIMOSDK');

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    bannerImage: '/images/logo.png',
    userProfile: null,
    account: '',
    accessId: '',
    starCount: 233,
    forksCount: 666,
    visitTotal: 996,
    curentAgent: '',
    agentObj: [
      // test2 测试环境
      'test2 testsdk 王锦丨eo8xZ1F1sSkXPkvv',
      'test2 testsdk 淳淳丨MVNiMWnIomIWw6o8',
      'test2 陈辰丨x9VVE6xnOxIaKlrt',
      // 'test2 娇慧丨9VILa6qKIdrV5cAV',
      // 'test2 5821@7mqd3 淳淳 旧版流程丨4g57CdDYjDfeFxrC',
      // 'v7 正式环境 5821@dxtest21 淳淳丨uoLJYUtpEJA9HNmJ',
      // v7 正式环境
      'v7 正式环境 王锦丨kVKqWOK0KRPTjhjp',
      'v7 正式环境 陈辰丨V55pH6u0g3WjYL8w',
      'v7 正式环境 娇慧丨5VqrzSEyLkwGvvE2',
      'v7 正式环境 淳淳丨uoLJYUtpEJA9HNmJ',
      'v7 正式环境 王锦安卓丨rwB6TYC1hUDshtcd',
      'v7 正式环境 宋鹏丨5ICmhGOOLte7wQvI',
      // 其他
      '其他丨请在下方输入框手动填写',
    ],
    plusImgShowTypesList: [
      '一直展示丨always',
      '仅机器人丨onlyRobot',
      '仅人工丨onlyAgent',
    ],
    curentPlusImageShowType: '2', // always onlyRobot onlyAgent
    userParamsList: [
      { title: 'uid', value: '', },
      { title: 'nickName', value: '', },
      { title: 'avatar', value: '', },
    ],
    qimoLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAADcklEQVRYhe2YbWjPURTHP5tZ2vLC1F7sladSkhdLibC9wMhDachDrITyzJb4K6OtWB6WzfjLUB6avECJrVjsIQk1tLzxlq228kKYx6Ez51/Xv/u7v4e/KeVb/+7/f8859/+995577jk3LbehnBSQA6wFCoA+oA24ALyPOmR6RLss4CDwBjgCLACWAXXAO2Bf1LGjGJUCH4CYQ6cC6AfWDyYhWYH7wLEQNmeA68DsP0loMnAOuAoUhiCTwGLgDnASmJgKIXHYw8ATdVwvVAP5wBSg1qG3CehU38sKQygN2KMOu8vxB1eAmUAZ8BR4DGwH5gA3HHYx9cFSm3BIdnGB+XsN8AyY5RhQUAJIvOgCioBVwAyVtej2dgMLHWMUqQt8BF4kOs0VqtEY4kJMbS4CW4BvQBNwAKgEWoHvOrF6mbAS90Khkj+avELSsdNhKLFmEXBX2+PANoe+OPJ4oAe4BJzV/qke+tN0oi0SqfN06W2QgeJAh56QjeqcYVCtny7dVhljhYd9lrAq9hAu18DWoSejMwIZ1Hlfa/RuB1Y6AmZRBpBnESwBrun3UzorLzSqbqY693QPPYneucBWXfk0DZwmxnjFoZfa7vYhswGYD5wHTuuWlDn05SCs0+/dFnmmKzCKrMpDVq4nqN4iE3/JBg552LomSIZDNsqjX7bkgWtQTUX2qt6tJFm+ErbCtUI2o9oAZEzcNnzRxMgohGzoC6kv+BxGOWqCNmj4T8gP/xShH5a+cYPIZQAuQq8sfXKlVPnEr0Ej9FYT9GTIdfJVr4G/RihT27jD9oRPDhWZ0FdL/1Jtm31SDue9FJXQI0u/bEuD3t5xdeYai15zCv/d70WoycNAsro2LQw/ATu04Ev4VdxnS/3QYZG3pmtSvtphbGZ89zTDHGbUWX7IscglpPQC+40+ydMfJpz6siZayamCCbNeD3phyiTmWvp7tK3QrGJ44oCYp6xR6yhXxkfAej3xDlBhkUk68sX43Wc+39iOvV/Gh1GvyzKPNfqDvAM4/c7vwSpo6SOzHqo1mwsxvNPiASSX0sno1a2U2n2E4y6boIWhF+QdYLOGEieC3vY3gXlawoRFidZi7UHswqYfdbo1lQF0zXeAwIiSD8kDgzjeaH69HyVDTpbEHvEVWwrjRKqvsAJ5fJqkAfZ52KT+NwA/ATQwsre1hd8JAAAAAElFTkSuQmCC'
  },
  attached() {
    let that = this;
    // 监听 自定义事件 回调函数
    QIMOSDK._onCustomEventCallBack((params, navigateBack) => {
      // 打开 订单列表 的事件
      if (params._eventType === '_onOpenOrderCard') {
        // 如果想跳转到客户自身小程序的页面，需要先调用第三个参数的 navigateBack() 方法，再进行后面的跳转逻辑；
        // 并且，调用完后，如果跳转报错：navigateTo:fail rejected due to no permission currently
        // 需要将后续的逻辑放到任务队列中，比如：setTimeout(() => { todo sth ... }, 500);
        navigateBack();
        setTimeout(() => {
          this.openCardListPage();
        }, 500);
      }
    });
    const local = wx.getStorageSync(`wx_userProfile`);
    if (local) {
      // console.log('local:\n', local);
      this.setData({
        userProfile: local,
        bannerImage: local.userInfo.avatarUrl,
        userParamsList: [
          { title: 'uid', value: local.signature, },
          { title: 'nickName', value: local.userInfo.nickName, },
          { title: 'avatar', value: local.userInfo.avatarUrl, },
          { title: '__ApiRootUrl', value: 'https://test2-v7-webchat.7moor.com', },
        ],
      });
    }
  },
  methods: {
    initUserProfile() {
      // 先获取用户授权
      if (!this.data.userProfile) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        try {
          // console.log('企业微信中的 wx 实例:\n', wx);
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              // console.log('getUserProfile:\n', res);
              wx.setStorageSync(`wx_userProfile`, res);
              this.setData({
                userProfile: res,
                bannerImage: res.userInfo.avatarUrl,
                userParamsList: [
                  { title: 'uid', value: res.signature, },
                  { title: 'nickName', value: res.userInfo.nickName, },
                  { title: 'avatar', value: res.userInfo.avatarUrl, },
                  { title: '__ApiRootUrl', value: 'https://test2-v7-webchat.7moor.com', },
                ],
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
          QIMOSDK._initOtherParams({
            test233: 'test666',
          });
        }
        return false;
      } else {
        this.initQIMOUserParams();
        return true;
      }
    },
    initQIMOUserParams() {
      const obj = {};
      this.data.userParamsList.forEach(v => {
        obj[v.title] = v.value;
      });
      console.log('_initUserParams:\n', obj);
      QIMOSDK._initUserParams(obj);
    },
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
    plusImgChange(e) {
      this.setData({ curentPlusImageShowType: e.detail.value });
    },
    changeAccount(e) {
      this.setData({ account: e.detail.value });
    },
    changeAccessId(e) {
      this.setData({ accessId: e.detail.value });
    },
    // 进入 人工客服
    gotoQIMOSDK(e) {
      if (!this.initUserProfile()) return false;
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
      // 初始化 更多按钮的加号 展示类型
      const plus = this.data.plusImgShowTypesList[this.data.curentPlusImageShowType].split('丨')[1];
      QIMOSDK._initMoreBtnsShowType(plus);
      // 戴森 七鱼
      // "version": "1.2.3",
      // "provider": "wxae5e29812005203f"
      // 初始化配置信息
      // QIMOSDK.__configAppId('BvsC24eUXzT');
      // QIMOSDK._$configAppKey('37158cd867677d2d74775f408a5de331');
      // 前往 客服 页面
      wx.navigateTo({
        url: 'plugin://QIMOSDK/chat',
      });
    },
    // 修改自定义参数
    changeParamsValue(e) {
      const title = e.currentTarget.dataset.title;
      const list = this.data.userParamsList.map(v => {
        if (v.title === title) {
          v.value = e.detail.value;
        }
        return v;
      })
      this.setData({
        userParamsList: list,
      });
    },
    // 添加自定义参数
    addUserParam() {
      this.setData({
        userParamsList: [
          ...this.data.userParamsList,
          {
            title: 'param' + (this.data.userParamsList.length + 1),
            value: 'value' + (this.data.userParamsList.length + 1),
          },
        ],
      });
    },
  }
})