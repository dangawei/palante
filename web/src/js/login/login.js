define(function(require, exports, module) {
  var common = require("common")

   var login = {
       init:function () {
           var _this = this;
           $("#J_login").click(function () {
              _this.post()
           })
       },
       post:function () {
          var loginname = $("#lg_form_account").val()
          var password = $("#lg_form_password").val()
          if(loginname==""){
             common.showTip("登录名没有填写")
             return
          }
          if(password==""){
             common.showTip("登录密码没有填写")
             return
          }
          $.ajax({
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              //提交数据的类型 POST GET
              type:"POST",
              //提交的网址
              url:common.rootUrl + '/user/login',
              //提交的数据
              data:{
                  loginAccount:$("#lg_form_account").val(),
                  passwordOrCaptcha:$("#lg_form_password").val(),
                  loginType:1
              },
              //返回数据的格式
              datatype: 'json',   //"xml", "html", "script", "json", "jsonp", "text".
              //在请求之前调用的函数
              beforeSend:function(data){

              },
              //成功返回之后调用的函数
              success:function(remoteData){
                  if(remoteData.codeId==1){
                       var option = {
                         path:"/"
                       }
                       common.cookie("userType",remoteData.resData.userType,option)
                       window.sessionStorage.setItem('userType', remoteData.resData.userType);
                       common.cookie("token",remoteData.resData.token,option)
                       common.cookie("username",$("#lg_form_account").val(),option)
                       window.location.href= '/member/order/zucheorder.html'
                  }else{
                      common.showcodeId(remoteData.codeId,remoteData.codeDes)
                  }
                  return
              },
              //调用出错执行的函数
              error: function(){

              }
          });
       }
   }
   login.init()
})
