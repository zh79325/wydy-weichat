//app.js
var util = require('./utils/util.js');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (loginRes) {
          var code = loginRes.code;
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log(res);
              var info = res.userInfo;
              res.code = code;
              that.decryptUser(res, cb);
            }
          })
        }
      })
    }
  },
  decryptUser: function (info, cb) {
    var self = this;
    util.post('api/weixin/decryptUser',
      info,
      function (r) {
        console.log(r);
        self.globalData.userInfo = r.data;
        typeof cb == "function" && cb(self.globalData.userInfo)
      });
  },
  globalData: {
    userInfo: null
  }
})