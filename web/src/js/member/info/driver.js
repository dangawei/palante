define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var cardata = {
      driverLicense:"",
      driverLicenseUrl:"",
      driverLicenseMaturity:"",
      token:""
  }
  var cardID = {
     init:function () {
       var laydate = layui.laydate;
        //国际版
        laydate.render({
          elem: '#J_jiazhaodate'
          ,lang: 'en'
          ,done: function(value, date){
            cardata.driverLicenseMaturity = value
          }
        });
        this.list()
     },
     list:function (){
       var _this = this;
       common.loginAjax({
         url:common.rootUrl+"/user_information/detail",
         param:{
           token:common.cookie("token")
         },
         type:"get",
         success:function (e) {
           var data = e.resData
               cardata.driverLicense = data.driverLicense || ""
               cardata.driverLicenseUrl = data.driverLicenseUrl || ""
               cardata.driverLicenseMaturity = data.driverLicenseMaturity || ""
               $("#J_jiazhaodate").val(cardata.driverLicenseMaturity)
               $("#J_cardID").val(cardata.driverLicense)              
               //如果已经认证了，就不用修改了，
               if(data.driverLicenseApproveStatus==1){
                 var str = '<img src="'+data.driverLicenseUrl+'"/>'
                 $("#J-uploadimg01").html(str)
                 $("#J_jiazhaodate").prop("disabled",true)
                 $("#J_cardID").prop("disabled",true)
                 $("#upfile01").prop("disabled",true)
                }else{
                  var str = '<img src="'+data.driverLicenseUrl+'"/>'
                  $("#J-uploadimg01").html(str)
                  _this.upfile()
                  _this.userstatus()
           }
         }
       })
     },
     upfile:function () {
       var $ = layui.jquery
       ,upload = layui.upload;
       //普通图片上传
       var uploadInst = upload.render({
         elem: '#upfile01'
         ,accept: 'file' //普通文件
         ,url: common.picurl()
         ,before: function(obj){
           //预读本地文件示例，不支持ie8
           obj.preview(function(index, file, result){
           });
         }
         ,done: function(res){
           //如果上传失败
           if(res.codeId!==1){
             return layer.msg('上传失败');
           }
           cardata.driverLicenseUrl = res.resData
           var str = '<img src="'+res.resData+'"/>'
           $('#J-uploadimg01').html(str)
           //上传成功
         }
         ,error: function(){
         }
       });
       var uploadInst = upload.render({
         elem: '#upfile02'
         ,accept: 'file' //普通文件
         ,url: common.picurl()
         ,before: function(obj){
           //预读本地文件示例，不支持ie8
           obj.preview(function(index, file, result){
           });
         }
         ,done: function(res){
           //如果上传失败
           if(res.codeId!==1){
             return layer.msg('上传失败');
           }
           cardata.identityCardUpUrl = res.resData
           var str = '<img src="'+res.resData+'"/>'
           $('#J-uploadimg02').html(str)
           //上传成功
         }
         ,error: function(){
         }
       });
     },
     userstatus:function () {
          var _this = this;
          var str = '<a href="javascript:void(0)" class="btn btn-primary btn-large mr20" id="J_userAdd">添加</a><a href="javascript:void(0)" class="btn btn-large">取消</a>'
          $("#J-userBtn").html(str)
         $el.find('#J_userAdd').off('click').click('#J_userAdd', function (e) {
            _this.post()
          })
     },
     post:function () {
       var _this = this;
       common.loginAjax({
         url:common.rootUrl+"/user_information/approve_driver_license",
         param:{
           token:common.cookie("token"),
           driverLicense:$("#J_cardID").val(),
           driverLicenseUrl:cardata.driverLicenseUrl,
           driverLicenseMaturity:cardata.driverLicenseMaturity,
         },
         type:"post",
         success:function (e) {
           if(e.codeId == 1){
              common.showTip("添加成功")
              window.location.href="/member/info/driver.html"
           }else{
             userstatus = 2
           }
         }
       })
     }
  }
  cardID.init()
})
