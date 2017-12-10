function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isDev(){
 var systemInfo= wx.getSystemInfoSync();
 return systemInfo.platform == 'devtools';
}

function getApi(op){
  var server;
  if(isDev()){
    server="http://localhost:8080/";
  }else{
    server ="https://wydy.shop/";
  }
  return server+op;
}
function bindCurrent(callback,obj){
  if (typeof callback == "function"){
    return callback.bind(obj)
  }
}
function get(op,success,fail){
  var url = getApi(op);
  success = bindCurrent(success,this);
  fail = bindCurrent(fail, this);
  wx.request({
    url: url,
    data: {},
    header: {
      // "Content-Type":"application/json"
    },
    success: function (res) {
      typeof success == "function" && success(res.data);
    },
    fail: function (err) {
      typeof fail == "function" && fail(err);
    }

  })
}

function post(op,data, success, fail) {
  success = bindCurrent(success, this);
  fail = bindCurrent(fail, this);
  var url = getApi(op);
  if (typeof data == "function"){
    data = bindCurrent(data, this);
    fail=success;
    success=data;
    data={};
  }
  wx.request({
    url: url,
    data: data,
    method:'POST',
    header: {
      // "Content-Type":"application/json"
    },
    success: function (res) {
      typeof success == "function" && success(res.data);
    },
    fail: function (err) {
      typeof fail == "function" && fail(err);
    }

  })
}

module.exports = {
  formatTime: formatTime,
  get: get,
  post: post
}


