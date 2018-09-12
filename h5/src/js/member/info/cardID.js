define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var cardata = {
      address:"",
      sex:"",
      birthday:"",
      age:"",
      realName:"",
      identityCard:"",
      identityCardUpUrl:"",
      identityCardDownUrl:"",
      identityCardMaturity:"",
      token:""
  }
  var cardID = {
     init:function () {
       var laydate = layui.laydate;
        //国际版
        laydate.render({
          elem: '#J_birthday'
          ,lang: 'en'
          ,done: function(value, date){
            cardata.birthday = value
          }
        });
        laydate.render({
          elem: '#J_cardendtime'
          ,lang: 'en'
          ,done: function(value, date){
            cardata.identityCardMaturity = value
          }
        })
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
               cardata.address = data.address || ""
               cardata.sex = data.sex || ""
               cardata.birthday = data.birthday || ""
               cardata.age = data.age || ""
               cardata.realName = data.realName || ""
               cardata.identityCard = data.identityCard || ""
               cardata.identityCardUpUrl = data.identityCardUpUrl || ""
               cardata.identityCardDownUrl = data.identityCardDownUrl || ""
               cardata.identityCardMaturity = data.identityCardUpUrl || ""
               $("#J_birthday").val(cardata.birthday)
               $("#J_sexname").val(cardata.sex)
               $("#J_age").val(cardata.age)
               $("#J_address").val(cardata.address)
               $("#J_cardID").val(cardata.identityCard)
               $("#J_rename").val(cardata.realName)
               //如果已经认证了，就不用修改了，
               if(data.identityCardApproveStatus==1){
                 var str = '<img src="'+cardata.identityCardDownUrl+'"/>'
                 $("#J-uploadimg01").html(str)
                 var str02 = '<img src="'+cardata.identityCardUpUrl+'"/>'
                 $("#J-uploadimg02").html(str02)
                 $("#J_birthday").prop("disabled",true)
                 $("#J_sexname").prop("disabled",true)
                 $("#J_age").prop("disabled",true)
                 $("#J_address").prop("disabled",true)
                 $("#J_cardID").prop("disabled",true)
                 $("#J_rename").prop("disabled",true)
                 $("#J_cardendtime").prop("disabled",true)
                 $("#upfile01").prop("disabled",true)
                 $("#upfile02").prop("disabled",true)
                }else{
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
           cardata.identityCardUpUrl = res.resData
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
           cardata.identityCardDownUrl = res.resData
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
       if($("#J_age").val()==""){
          return
       }
       common.loginAjax({
         url:common.rootUrl+"/user_information/approve_identity_card",
         param:{
           token:common.cookie("token"),
           address:$("#J_address").val() || "",
           sex:parseInt($("#J_sexname").val()) || "",
           birthday:$("#J_birthday").val() || "",
           age:parseInt($("#J_age").val()) || "",
           realName:$("#J_rename").val(),
           identityCard:$("#J_cardID").val(),
           identityCardUpUrl:cardata.identityCardUpUrl,
           identityCardDownUrl:cardata.identityCardDownUrl,
           identityCardMaturity:cardata.identityCardMaturity
         },
         type:"post",
         success:function (e) {
           if(e.codeId == 1){
               common.showTip("添加成功")
           }else{
             userstatus = 2
           }
           _this.userstatus()
         }
       })
     }
  }
  cardID.init()
})
