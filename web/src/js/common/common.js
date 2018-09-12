define(function(require, exports, module) {
   var $body = $(document.body);
   var $el = $(document);
   var tipTimeout;
   var Utils = {
      getUrlParam:function (name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if (r != null) return decodeURIComponent(r[2]);
         return null;
       },
      setStorage: function (args) {
            if (!window.localStorage || !window.sessionStorage) return;
            if ("local" == args.type) {
                for (var i in args.data) {
                    try {
                        localStorage.setItem(i, JSON.stringify(args.data[i]))
                    } catch (e) {
                        for (var k in localStorage) {
                            if (/menu_\d+.*/.test(k)) {
                                localStorage.removeItem(k)
                            }
                        }
                        localStorage.setItem(i, JSON.stringify(args.data[i]))
                    }
                }
            } else {
                for (var i in args.data) {
                    sessionStorage.setItem(i, JSON.stringify(args.data[i]))
                }
            }
        },
        getStorage: function (key, type) {
            if (!window.localStorage || !window.sessionStorage) return null;
            if ("local" == type || !type) {
                if (localStorage.getItem(key)) {
                    try {
                        return JSON.parse(localStorage.getItem(key))
                    } catch (e) {
                        return localStorage.getItem(key)
                    }
                } else {
                    return null
                }
            } else {
                if ("session" == type) {
                    if (sessionStorage.getItem(key)) {
                        try {
                            return JSON.parse(sessionStorage.getItem(key))
                        } catch (e) {
                            return sessionStorage.getItem(key)
                        }
                    } else {
                        return null
                    }
                }
            }
        },
        removeStorage: function (key) {
            if (!window.localStorage || !window.sessionStorage) return;
            localStorage.removeItem(key);
            sessionStorage.removeItem(key)
      },
      cookie:function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
      },
      repeatText: '正在提交数据，请勿重复操作',
       // rootUrl: 'http://api.mall.qcchuxing.com',
       // rootPicUrl: 'http://api.public.qcchuxing.com',
      rootUrl: 'http://192.168.1.203:9094',
      rootPicUrl: 'http://192.168.1.203:9097',
      lodText: '<p class="c-init c-loading load-container"><i class="loader"></i></p>',
      errorText: '<p class="c-tryagain J_tryagain">网络出错,请稍后重试</p>',
      picurl:function () {
          var url = Utils.rootPicUrl+'/pic/upload/';
          return url
      },
      extend: function (source, target) {
          source = source || {};
          target = target || {};
          var result = {};
          for (var p in target) {
              result[p] = target[p];
          }
          for (var p in source) {
              if (!result[p]) {
                  result[p] = source[p];
              }
          }
          return result;
      },
      showcodeId:function (id,codeDes) {
          if(id == -3){
              Utils.showTip(codeDes)
          }else if(id == -99 || id == -1 || id == 1009 || id == 1010){
              var options = {
                path:"/"
              }
             Utils.cookie("token","",options)
             Utils.cookie("username","",options)
             window.location.href='/login/'
          }
          else{
              Utils.showTip(codeDes)
          }
      },
      showTip: function (str, timeout) {
          if (!str) {
              return;
          }
          var $tipEl = $('#J_tip');
          Utils.showMask();
          if ($tipEl.length == 0) {
              $tipEl = $('<div id="J_tip" class="c-tip none">');
              $body.append($tipEl);
          }
          window.clearTimeout(tipTimeout);
          $tipEl.html(str).css({'opacity': 1}).removeClass('none');
          /* $tipEl.animate({opacity: 1}, 500, 'ease-out');*/
          timeout = timeout || 2000;
          window.tipTimeout = setTimeout(function () {
              Utils.hideTip();
              Utils.hideMask();
          }, timeout);
      },
      hideTip: function () {
          var $tipEl = $('#J_tip');
          if ($tipEl.length) {
              $tipEl.addClass('none');
              /* $tipEl.animate({opacity: 0}, 500, 'ease-out', function () {

               });*/
          }
      },
      nologin:function (id) {
          if(id==-99){
              window.location.href='/'
          }
      },
      confirm: function (option) {
          option = option || {};
          var title = option.title || '';
          var eventType = option.eventType || 'click';
          var yes = option.yes;
          var no = option.no;

          var $confirm = $('#J_confirm');

          function hideConfirm(noanimate) {
              if (!noanimate) {
                  $confirm.addClass('none');
              }
              else {
                  $confirm.addClass('none').css({opacity: 0});
              }
          }

          if ($confirm.length == 0) {
              var content = ['<div class="c-confirm" id="J_confirm">',
                  '<div class="c-cfm-main">',
                  '<div class="c-cfm-tl">',
                  title,
                  '</div>',
                  '<div class="c-cfm-bton">',
                  '<span class="c-cfm-cancel J_confirm_cancel">取消</span>',
                  '<span class="c-cfm-sure J_confirm_sure">确定</span>',
                  '</div>',
                  '</div>',
                  '</div>'].join('');
              $confirm = $(content);
              $body.append($confirm);
          }
          else {
              $confirm.find('.c-cfm-tl').html(title);
              $confirm.removeClass('none').css({opacity: 1});
              $confirm.off(eventType);
          }
          //添加事件
          //否
          $confirm.on(eventType, '.J_confirm_cancel', function (e) {
              e.preventDefault();
              hideConfirm();
              no && no();
          });
          //是
          $confirm.on(eventType, '.J_confirm_sure', function (e) {
              e.preventDefault();
              hideConfirm('immediate');
              yes && yes();
          });
      },
      confirmtext: function (option) {
          option = option || {};
          var title = option.title || '';
          var eventType = option.eventType || 'click';
          var yes = option.yes;
          var no = option.no;

          var $confirm = $('#J_confirm');

          function hideConfirm(noanimate) {
              if (!noanimate) {
                  $confirm.addClass('none');
              }
              else {
                  $confirm.addClass('none').css({opacity: 0});
              }
          }

          if ($confirm.length == 0) {
              var content = ['<div class="c-confirm" id="J_confirm">',
                  '<div class="c-cfm-main">',
                  '<div class="c-cfm-tl">',
                  title,
                  '</div>',
                  '<div class="c-cfm-bton">',
                  '<span class="c-cfm-cancel J_confirm_cancel">取消</span>',
                  '<span class="c-cfm-sure J_confirm_sure">确定</span>',
                  '</div>',
                  '</div>',
                  '</div>'].join('');
              $confirm = $(content);
              $body.append($confirm);
          }
          else {
              $confirm.find('.c-cfm-tl').html(title);
              $confirm.removeClass('none').css({opacity: 1});
              $confirm.off(eventType);
          }
          //添加事件
          //否
          $confirm.on(eventType, '.J_confirm_cancel', function (e) {
              e.preventDefault();
              hideConfirm();
              no && no();
          });
          //是
          $confirm.on(eventType, '.J_confirm_sure', function (e) {
              e.preventDefault();
              hideConfirm('immediate');
              yes && yes();
          });
      },
      loadShow: function (option) {
        var title = '正在加载...';
        if(option){title = option.title}
        var load = $body.find('#J_loading');
        if (load.length > 0) { load.show(); return;}
        $body.prepend('<div id="J_loading">'+title+'</div>');
      },
      loadHide: function () {
          $('#J_loading').addClass('none');
      },
      showMask: function () {
          var mask = $body.find('.my-mask');
          if (mask.length > 0) {
              mask.show();
              return;
          }
          $body.prepend('<div class="my-mask"></div>');
      },
      hideMask: function () {
          $body.find('.my-mask').hide();
      },
      disposeOrderNum: function (num) {
          var result = '';
          if (num) {
              num = num + '';
              if (num.length == 32) {
                  result = num.substring(8, 24);
              }
              else {
                  result = num;
              }
          }
          return result.toUpperCase();
      },
      //处理时间
      disposeTime: function (time, type) {
          type = type || 'date';
          time = time ? parseInt(time, 10) : null;
          var result = '';
          if (time) {
              var tdate = new Date(time * 1000);
              var year = tdate.getFullYear();
              var month = tdate.getMonth() + 1;
              var date = tdate.getDate();
              var hour = tdate.getHours();
              var minute = tdate.getMinutes();
              var second = tdate.getSeconds();
              month = month > 9 ? month : '0' + month;
              date = date > 9 ? date : '0' + date;
              hour = hour > 9 ? hour : '0' + hour;
              minute = minute > 9 ? minute : '0' + minute;
              second = second > 9 ? second : '0' + second;
              result = [year, month, date].join('-');
              if (type == 'time') {
                  result += ' ' + [hour, minute, second].join(':');
              }
          }
          return result;
      },
      loginAjax: function (option) {
         var _this = this;
          var url = option.url;
          var param = option.param || {};
          var type = option.type || 'post';
          var complete = option.complete;
          var success = option.success;
          var fail = option.fail;
          var error = option.error;
          var showMsg = option.showMsg;
          param.v = Date.now();
          var loginFunc = function () {
              //this.loadShow();
              var ajaxTimeoutTest = $.ajax({
                  url: url,
                  type: type,
                  data: param,
                  timeout: 10000,
                  dataType: "json",
                  success: function (result) {
                      result = result || {};
                      var status = result.code;
                      var msg = result.message;
                       success && success(result);
                  },
                  error: function () {
                      error && error();
                      _this.showTip('网络请求失败,请检查您的网络环境', 1000);
                      //this.loadHide();
                  },
                  complete: function ($xhr, status) {//请求完成后最终执行参数
                      if (status == 'timeout') {//超时,status还有success,error等值的情况
                          ajaxTimeoutTest.abort();
                          _this.showTip('网络请求失败,请检查您的网络环境', 1000);
                          _this.loadHide();
                          complete && complete($xhr,status);
                      }
                  }
              });
          }
          loginFunc();
      },
      //处理数据
      disposeRequestData: function (result, succfuc, failfuc) {
          result = result || {};
          var status = result.status;
          var msg = result.msg;
          if (status == 200) {
              succfuc && succfuc(result);
          }
          else {
              failfuc && failfuc(result);
          }
      },
      //请求客户端
      callNative: function (option) {
          option = option || {};
          var url = option.url;
          if (!url) {
              return;
          }
          var timeout = option.timeout || 6000;
          var params = option.params || {};
          var data = [];
          for (var p in params) {
              data.push(p + '=' + params[p]);
          }
          var callbackName = 'nativeCallback' + callbackCount;
          callbackCount++;
          data.push('callback=' + callbackName);
          data = data.join('&');
          var succ = option.succ;
          var fail = option.fail;
          window[callbackName] = function () {
              clearTimeout(callnativeTimeout);
              succ && succ.apply(window, arguments);
              delete window[callbackName];
          }
          //console.log('partner://' + url + '?' + data);
          location.href = 'partner://' + url + '?' + data;
          var callnativeTimeout = window.setTimeout(function () {
              fail && fail();
          }, timeout);
      },
      /*
       * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
       * @param fn {function}  需要调用的函数
       * @param delay  {number}    延迟时间，单位毫秒
       * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
       * @return {function}实际调用函数
       */
      throttle: function (fn, delay, immediate, debounce) {
          var curr = +new Date(),//当前事件
              last_call = 0,
              last_exec = 0,
              timer = null,
              diff, //时间差
              context,//上下文
              args,
              exec = function () {
                  last_exec = curr;
                  fn.apply(context, args);
              };
          return function () {
              curr = +new Date();
              context = this,
                  args = arguments,
                  diff = curr - (debounce ? last_call : last_exec) - delay;
              clearTimeout(timer);
              if (debounce) {
                  if (immediate) {
                      timer = setTimeout(exec, delay);
                  } else if (diff >= 0) {
                      exec();
                  }
              } else {
                  if (diff >= 0) {
                      exec();
                  } else if (immediate) {
                      timer = setTimeout(exec, -diff);
                  }
              }
              last_call = curr;
          }
      },
      /**
       * 时间转换毫秒
       */
      disposeRequestgettime:function (data) {
          var result = '';
          if(data){
              var s=data;
              var a=s.split(/[^0-9]/);
              var d=new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5]);
              result = (d.getTime())/1000
          }
          return result
      },
      vuejsbox:function (option) {
          var _this = this;
          var option = option || '';
          var  title = option.title || '';
          var  btntitle = option.btntitle || '添加';
          var  typeID = option.typeID || '';
          var  pageID = option.pageID || '';
          var  nopassID = option.nopassID || '';
          var eventType = option.eventType || 'click';
          var yes = option.yes;
          var no = option.no;

          var vueboxhtml = '<div id="vueboxhtml">' +
              '</div>';
          var $vueboxhtml = $body.find('#vueboxhtml');
          var textarea = '';
          var str = '';
          var vueboxpage = '';
          if($vueboxhtml.length<1){
              $body.append(vueboxhtml);
          }
          if(nopassID==1){
              textarea = ''
          }
          if(typeID!==1){
              str = '<div class="vuebox-btn">' +
                  '<a href="javascript:" class="vueclose J_vuebox_cancel btn_gree btn">'+btntitle+'</a>' +
                  '<a href="javascript:" class="vueclose J_vuebox_close btn_gray btn">取消</a>' +
                  '</div>'
          }
          if(pageID==1){
              vueboxpage = '<div class="vueboxpage" id="J_vueboxpage"></div>'
          }
          var $vuebox = '<div id="vueboxhtmlbd"><div id="vuebox">' +
              '<div class="vuebox-title" id="J_moduevueboxtitle">'+title+' <div id="J_module_close"></div></div>' +
              '<div class="vuebox-bd" id="J_modulevuebox-bd">' +
              +textarea+
              '</div>' +str+
              '' +vueboxpage+
              '</div></div>'
          $('#vueboxhtml').html($vuebox)
          //添加事件
          //否
          $body.find('.J_vuebox_close,#J_module_close').off('click').click('.J_vuebox_close,#J_module_close', function (e) {
              e.preventDefault();
              $el.find('#vueboxhtml').html('')
           /*   $('#vueboxhtml').css({"background":"inherit","position":"inherit"})*/
              no && no();
              return false
          });
          //是
          $body.find('.J_vuebox_cancel').off('click').click('.J_vuebox_cancel', function (e) {
              e.preventDefault();
              $el.find('#vueboxhtml').html('')
             /* $('#vueboxhtml').css({"background":"inherit","position":"inherit"})*/
              yes && yes();
              return false
          });
      },
      loadingbox:function (option) {
          var option = option || {}
          var loadingbox = '<div id="loadingbox"></div>';
          var $loadingbox = $body.find('#loadingbox');
          if ($loadingbox.length < 1) {
              $body.append(loadingbox);
          }else{
              $('#loadingbox').removeClass('none')
          }
          var str = '';
          str = '<div class="loadingmask">' +
              '<div class="loadingbd">' +
              '文件上传中...' +
              '</div>' +
              '</div>'
          $('#loadingbox').html(str)
      },
      hideloadingbox:function () {
          $('#loadingbox').addClass('none')
      },
      verification:function (name) {
          var str = ""
          if(name=="tel"){
             str=/^[1][3,4,5,7,8][0-9]{9}$/
          }
          return str
      },
      showlogin:function (option) {
        var option = option || '';
        var $el = $(document)
        var str = '<div id="J-barlogin"></div>'
        if($el.find("#J-barlogin").length<1){
            $el.find("body").append(str)
        }else{
            $el.find("#J-barlogin").show()
        }
       var loginhtml = '<div id="J-minlogin"><div class="minloginmask"></div><div class="minloginbox"><div class="min-login-hd">快速登录'+
       '<div id="J-minlogin-close">X</div>'+
       '</div><div class="min-login-bd">'+
       '<div class="minlogin-ul"><ul>'+
       '<li><input type="text" class="minlogintxt" id="J_minlogintel" placeholder="输入手机号码"></li>'+
       '<li><input type="password" class="minlogintxt" id="J_minloginpassword" placeholder="输入登录密码"></li>'+
       '<li><a herf="javascript:void(0)" class="btn btn-gree minloginBtn" id="J-minloginBtn">登录</a></li>'+
       '<li><span id="J_minloginerror" class="red"></span></li>'+
       '</ul></div></div></div></div>'
       $el.find("#J-barlogin").html(loginhtml)
       $el.on("click","#J-minloginBtn",function(){
            Utils.minloginpost(option)
       })
       $el.on("click","#J-minlogin-close",function(){
         Utils.hidelogin()
       })
      },
      minloginpost:function (option) {
        var yes = option.yes
        var telreg = Utils.verification("tel")
        if(!telreg.test($("#J_minlogintel").val())){
          Utils.showTip("手机号码格式不对")
          return
        }
        Utils.loginAjax({
          url:Utils.rootUrl+"/user/login",
          param:{
            loginAccount:$("#J_minlogintel").val(),
            passwordOrCaptcha:$("#J_minloginpassword").val(),
            loginType:1
          },
          type:"post",
          success:function (e) {
            if(e.codeId == 1){
                var option = {
                  path:"/"
                }
                Utils.cookie("token",e.resData.token,option)
                Utils.cookie("username",$("#J_minlogintel").val(),option)
                Utils.hidelogin()
                yes && yes()
             }else{
               $el.find("#J_minloginerror").html(e.codeDes)
             }
          }
        })
      },
      hidelogin:function () {
          $el.find("#J-barlogin").html("")
      },
      orderstatus:function (code) {
          //1待支付2待发货3待取货4已取货5取消6订单关闭7失效8退货
          var staus = [
            {id:1,name:"待支付"},
            {id:2,name:"待提车"},
            {id:3,name:"待确认"},
            {id:4,name:"已取车"},
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
      },
      drivingstatus:function (code) {
          //1待支付2待发货3待取货4已取货5取消6订单关闭7失效8退货
          var staus = [
            {id:-1,name:"取消预约"},
            {id:1,name:"提交订单"},
            {id:2,name:"通知试车"},
            {id:3,name:"完成试驾"}
          ]
          var str = ""
           staus.forEach(function (item) {
             if(item.id == code){
                str = item.name
             }
           })
          return str
      },
      loginout:function (option) {
        Utils.loginAjax({
          url:Utils.rootUrl+"/user/logout",
          param:{
            token:Utils.cookie("token")
          },
          type:"post",
          success:function (e) {
            option.yes()
            var option = {
              path:"/"
            }
            Utils.cookie("token","",option)
            Utils.cookie("username","",option)
            if(e.codeId == 1){
                window.location.href="/"
             }else{
               Utils.showcodeId(e.codeId,e.codeDes)
             }
          }
        })
      }
  }
  module.exports = Utils
});
