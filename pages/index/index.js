var util = require('../../utils/util.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '影片搜索',
    userInfo: {},
    searchResult:{
      page:1,
      query:''
    }
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.moveToLocation();
  },
  //事件处理函数
  bindViewTap: function () {
    return;
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  search: function () {
    var value = this.data.inputValue;
    if (!value) {
      this.showTooltip('请输入关键字');
      return;
    }

    this.setData({
      processing: true
    })
  
    
    util.get.bind(this)("api/movies/search?query=" + value + "&page=" + 1,
    function(r){
      console.log(r);
      if (!r.movies || r.movies.length==0){
        this.showTooltip('未找到 ' + value+" 相关的影片");
        this.setData({
          processing: false
        });
        return;
      }
      var self=this;
      var key = "query-" + r.query;
      wx.setStorageSync("query-"+r.query, r);
      wx.navigateTo({
        url: '../queryList/queryList?key=' + key,
        success:function(){
          self.setData({
            processing: false,
            searchResult: r
          });
        }
      })
    }
    );

  },
  showTooltip: function (tooltip) {
    this.setData({
      tooltip: tooltip
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
