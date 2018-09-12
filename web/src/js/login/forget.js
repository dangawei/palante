define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var num = 59;
  var telreg = common.verification("tel")
  var regdata={
      userType:1
  }
   var login = {
       init:function () {
           var _this = this;
           $("#tabs-person").click(function () {
              regdata.userType = 1
              $(this).addClass("ative")
              $("#tabs-compant").removeClass("ative")
           })
           $("#tabs-compant").click(function () {
              regdata.userType = 2
              $(this).addClass("ative")
              $("#tabs-person").removeClass("ative")
           })
           $("#J_reg").click(function () {
              _this.post()
           })
           $el.find($("#J_telcode")).click(function () {
               if(!telreg.test($el.find($("#lg_form_account")).val())){
                 common.showTip("手机格式不对")
                 return
               }
               $el.find($("#J_telcode")).prop("disabled","disabled")
               _this.sendcode()
           })
       },
       sendcode:function () {
          var _this = this;
          common.loginAjax({
            url:common.rootUrl+"/verification_code/send",
            param:{
              mobile:$el.find($("#lg_form_account")).val(),
              purpose:2,
            },
            type:"get",
            success:function (e) {
              if(e.codeId == 1){
                 _this.code()
              }
            }
          })
       },
       code:function () {
         var timer = null
          timer = setInterval(function(){
            var str = num--
             $('#J_telcode').val("已发送"+str)
             if(num<0){
                num = 59
                clearInterval(timer)
                 $el.find($("#J_telcode")).prop("disabled","")
                 $el.find($("#J_telcode")).val("发送验证码")
             }
          },1000)
       },
       post:function () {
          var loginname = $("#lg_form_account").val()
          var password = $("#lg_form_password").val()
          var password01 = $("#lg_form_password01").val()
          if(loginname==""){
              common.showTip("用户名没有填写")
              return
          }
          if(password.length<5){
            common.showTip("密码位数不对")
            return
          }
          if($("#J_telval").val().length!=6){
            common.showTip("验证不对")
            return
          }
          if(password!==password01){
              common.showTip("密码不一致")
              return
          }
          $.ajax({
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              //提交数据的类型 POST GET
              type:"POST",
              //提交的网址
              url:common.rootUrl + '/user/resetPassword',
              //提交的数据
              data:{
                  loginAccount:$("#lg_form_account").val(),
                  password:$("#lg_form_password").val(),
                  verificationCode:$("#J_telval").val()
              },
              //返回数据的格式
              datatype: 'json',   //"xml", "html", "script", "json", "jsonp", "text".
              //在请求之前调用的函数
              beforeSend:function(data){

              },
              //成功返回之后调用的函数
              success:function(remoteData){
                  if(remoteData.codeId==1){
                       common.showTip("修改成功")
                       setTimeout(function () {
                         window.location.href = "/login/"
                       },1500)                       
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
