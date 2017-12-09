
//index.js
//获取应用实例
var app = getApp()
Page({
   data: {
      motto: '影片搜索',
      userInfo: {}
   },
   onReady: function (e) {
     // 使用 wx.createMapContext 获取 map 上下文
     this.mapCtx = wx.createMapContext('myMap');
     this.mapCtx.moveToLocation();
   },
   //事件处理函数
   bindViewTap: function () {
      wx.navigateTo({
         url: '../logs/logs'
      })
   },
   bindKeyInput: function (e) {
      this.setData({
         inputValue: e.detail.value
      })
   },
   search:function(){
     var value = this.data.inputValue;
     if(!value){
       this.showTooltip('请输入关键字');
       return;
     }
     
     this.setData({
       processing: true
     })
     console.log(value);
   },
   showTooltip:function(tooltip){
    this.setData({
      tooltip: tooltip
    })
   },
   onLoad: function () {
      console.log('onLoad')
      var that = this
         //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
         //更新数据
         that.setData({
            userInfo: userInfo
         })
      })
   }
})
