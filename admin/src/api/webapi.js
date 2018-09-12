//保存缓存里
function saveStorage (typeName,typedata){
    window.sessionStorage.setItem(typeName, typedata)
    return
}

//获取缓存里
function getStorage (typeName){
    return window.sessionStorage.getItem(typeName)
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
//数字不够12位，用0来替代
function disnum12 (val) {
  var itemlength = ""+val
   var str = ""
   for(var i=0;i<12-itemlength.length;i++){
      str = ""+str+0
   }
   if(itemlength.length<12){
     var num = str+""+val
     return disnum(num)
   }
}
//数字很大，3数，前面加一个逗号
function disnum(number) {
  console.log(number)
	if (number.length <= 3)
		return (number == '' ? '0' : number);
	else {
		var mod = number.length % 3;
		var output = (mod == 0 ? '' : (number.substring(0, mod)));
		for (var i = 0; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
}
//订单状态
function orderstatus (str){
  var staus = [
    {id:1,name:"待支付"},
    {id:2,name:"待发货"},
    {id:3,name:"待取货"},
    {id:4,name:"已取货"},
    {id:5,name:"取消"},
    {id:6,name:"订单关闭"},
    {id:7,name:"失效"},
    {id:8,name:"退货"}
  ]
  var str = ""
   staus.forEach(function (item) {
     if(item.id == code){
        str = item.name
     }
   })
  return str
  return str
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
    getorderstatus:function (str) {
      return orderstatus(str)
    },
    getdisnum12:function (val) {
      return disnum12(val)
    },
    getobjurl:function (url,data) {
        return http_builder_url(url,data)
    }
}
