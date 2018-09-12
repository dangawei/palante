//保存缓存里
function saveStorage (typeName,typedata){
    window.sessionStorage.setItem(typeName, typedata)
    return
}
function API () {
   var ROOT = process.env.API_ROOT_URL
   return ROOT
}
//获取缓存里
function getStorage (typeName){
    return window.sessionStorage.getItem(typeName)
}
//对象转换url
function http_builder_url(url, data) {
      if(typeof(url) == 'undefined' || url == null || url == '') {
          return '';
      }
      if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
          return '';
      }
      url += (url.indexOf("?") != -1) ? "" : "?";
      for(var k in data) {
          url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
      }
      return url;
}
//时间格式转换
function gettime (type,time) {
  type = type || 'date'
  time = time ? parseInt(time, 10) : null
  var result = ''
  if (time) {
    var tdate = new Date(time * 1000)
    var year = tdate.getFullYear()
    var month = tdate.getMonth() + 1
    var date = tdate.getDate()
    var hour = tdate.getHours()
    var minute = tdate.getMinutes()
    var second = tdate.getSeconds()
    month = month > 9 ? month : '0' + month
    date = date > 9 ? date : '0' + date
    hour = hour > 9 ? hour : '0' + hour
    minute = minute > 9 ? minute : '0' + minute
    second = second > 9 ? second : '0' + second
    result = [year, month, date].join('-')
    if (type == 'time') {
        result += ' ' + [hour, minute, second].join(':')
    }
  }
  return result
}
//强制保存小数点后面两位
function toDecimal2(x) {
  var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return parseFloat(s);
}
// 保存缓存里
export default {
    save: function (typeName,typedata) {
      return saveStorage(typeName,typedata)
    },
    get: function (typeName) {
      return getStorage(typeName)
    },
    gettime: function (type,time) {
      return gettime(type,time)
    },
    toDecimal2:function(num){
      return toDecimal2(num)
    },
    getroot:function () {
      return API()
    },
    getobjurl:function (url,data) {
        return http_builder_url(url,data)
    }
}
