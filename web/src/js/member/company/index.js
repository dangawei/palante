define(function(require, exports, module) {
      var $el = $(document)
      var common = require("common")
      var city = require("city")
      var userdata = {
          provinceCode:"",
          cityCode:"",
          areaCode:"",
          address:"",
          businessLicense:"",
          businessLicenseNo:"",
          brief:"",
          name:"",
          contactName:"",
          contactTelephone:"",
          icon:"",
          pic:""
      }
      var userstatus = 1  // 1是完善 2未完善
      var info = {
          init:function () {
            this.upfile()
            this.upfile2()
            this.list()
            this.cityshow()
            var laydate = layui.laydate;
             //国际版
             laydate.render({
               elem: '#J-rename'
               ,lang: 'en'
               ,done: function(value, date){
                 userdata.birthday = value
               }
             });
             this.upfile()
          },
          list:function () {
            var _this = this;
            common.loginAjax({
              url:common.rootUrl+"/user_enterprise/get_by_accountId",
              param:{
                token:common.cookie("token")
              },
              type:"get",
              success:function (e) {
                if(e.codeId == 1){
                    userstatus = 2
                    userdata.id = e.resData.id
                    userdata.provinceCode = e.resData.provinceCode
                    userdata.cityCode = e.resData.cityCode
                    userdata.areaCode = e.resData.areaCode
                    userdata.address = e.resData.address
                    userdata.businessLicense = e.resData.businessLicense
                    userdata.businessLicenseNo = e.resData.businessLicenseNo
                    userdata.brief = e.resData.brief
                    userdata.name = e.resData.name
                    userdata.contactName = e.resData.contactName
                    userdata.contactTelephone = e.resData.contactTelephone
                    userdata.icon = e.resData.icon
                    userdata.pic = e.resData.pic
                    var str = '<img src="'+userdata.pic+'"/>'
                    $('#J-uploadimg').html(str)
                    var str01 = '<img src="'+userdata.businessLicense+'"/>'
                    $('#J-uploadimg2').html(str01)
                    $("#J-companyname").val(userdata.name)
                    $("#J-businessLicenseNo").val(userdata.businessLicenseNo)
                    $("#J-brief").val(userdata.brief)
                    $("#J-user").val(userdata.contactName)
                    $("#J-iphone").val(userdata.contactTelephone)
                    $("#J-adress").val(userdata.address)
                    var provinceName = ""
                    var cityName = ""
                    var areaName = ""
                    if(e.resData.provinceName){
                      provinceName = e.resData.provinceName
                    }
                    if(e.resData.cityName){
                      cityName = e.resData.cityName
                    }
                    if(e.resData.areaName){
                      areaName = e.resData.areaName
                    }
                    $("#J_cityshowinfo").html(provinceName+"-"+cityName+"-"+areaName+'<a href="javascript:void(0)" class="btn btn-gree">修改</a>')

                }else{
                  userstatus = 1
                  $el.find("#J_cityshow01").removeClass("none")
                }
                _this.userstatus()
              }
            })
          },
          userstatus:function () {
              var _this = this;
              var str = ""
               if(userstatus==1){
                  str = '<a href="javascript:void(0)" class="btn btn-primary btn-large mr20" id="J_userAdd">添加</a>'
               }else if(userstatus==2){
                  str = '<a href="javascript:void(0)" class="btn btn-primary btn-large mr20" id="J_userSave">保存</a>'
               }
               $("#J-userBtn").html(str)
               $el.on('click',"#J_userAdd",function () {
                 _this.post()
               })
               $el.on('click',"#J_userSave",function () {
                 _this.savepost()
               })
          },
          upfile:function () {
            var $ = layui.jquery
            ,upload = layui.upload;
            //普通图片上传
            var uploadInst = upload.render({
              elem: '#upfile1'
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
                userdata.pic = res.resData
                var str = '<img src="'+res.resData+'"/>'
                $('#J-uploadimg').html(str)
                //上传成功
              }
              ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                  uploadInst.upload();
                });
              }
            });
          },
          upfile2:function () {
            var $ = layui.jquery
            ,upload = layui.upload;
            //普通图片上传
            var uploadInst = upload.render({
              elem: '#upfile2'
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
                userdata.businessLicense = res.resData
                var str = '<img src="'+res.resData+'"/>'
                $('#J-uploadimg2').html(str)
                //上传成功
              }
              ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                  uploadInst.upload();
                });
              }
            });
          },
          cityshow:function () {
            var classnone = ""
            var editciyt = ""
             var str = '<p id="J_cityshowinfo"></p><div id="J_cityshow01" class="none"><div id="J_cityshow"><span class="fl mr10"><div id="J-province"></div></span><span class="fl mr10"><div id="J-city"><select class="pc-select"><option value="">全部</option></select></div></span><span class="fl mr10"><div id="J-area"><select class="pc-select"><option value="">全部</option></select></div></span></div></div>'
              $("#J-citycomponents").html(str)
              this.province()
              $el.on("click","#J_cityshowinfo a",function () {
                  $("#J_cityshowinfo").addClass("none")
                  $el.find("#J_cityshow01").removeClass("none")
              })
          },
          province:function () {
             var _this = this;
             var data = city.getprovince()
             var str = '<select class="pc-select"><option value="">全部</option>'
              for(var i=0;i<data.length;i++){
                  str +='<option value="'+data[i].value+'">'+data[i].label+'</option>'
              }
              str +="</select>"
              $el.find('#J-province').html(str)
              $el.find('#J-province select').change(function () {
                  userdata.provinceCode = $el.find('#J-province select').val()
                  _this.city()
              })
          },
          city:function () {
            var _this = this;
            var data = city.getcity($el.find('#J-province select').val())
            var str = '<select class="pc-select"><option value="">全部</option>'
             for(var i=0;i<data.length;i++){
                 str +='<option value="'+data[i].value+'">'+data[i].label+'</option>'
             }
             str +="</select>"
             $el.find('#J-city').html(str)
             $el.find('#J-city select').change(function () {
                 userdata.cityCode = $el.find('#J-city select').val()
                 _this.area()
             })
          },
          area:function () {
            var data = city.getarea($el.find('#J-city select').val())
            var str = '<select class="pc-select"><option value="">全部</option>'
             for(var i=0;i<data.length;i++){
                 str +='<option value="'+data[i].value+'">'+data[i].label+'</option>'
             }
             str +="</select>"
             $el.find('#J-area').html(str)
             $el.find('#J-area select').change(function () {
                 userdata.areaCode = $el.find('#J-area select').val()
             })
          },
          savepost (){

              var _this = this;
              common.loginAjax({
                url:common.rootUrl+"/user_enterprise/update_by_accountId",
                param:{
                  id:userdata.id,
                  token:common.cookie("token"),
                  provinceCode:userdata.provinceCode,
                  cityCode:userdata.cityCode,
                  areaCode:userdata.areaCode,
                  businessLicense:userdata.businessLicense,
                  pic:userdata.pic,
                  businessLicenseNo:$("#J-businessLicenseNo").val(),
                  name:$("#J-companyname").val(),
                  brief:$("#J-brief").val(),
                  address:$("#J-adress").val(),
                  contactName:$("#J-user").val(),
                  contactTelephone:$("#J-iphone").val()
                },
                type:"post",
                success:function (e) {
                  if(e.codeId == 1){
                    window.location.href = window.location.href
                  }else{
                    common.showcodeId(e.codeId,e.codeDes)
                  }
                  _this.userstatus()
                }
              })
          },
          post:function () {
            var _this = this;
            common.loginAjax({
              url:common.rootUrl+"/user_enterprise/update_by_accountId",
              param:{
                token:common.cookie("token"),
                provinceCode:userdata.provinceCode,
                cityCode:userdata.cityCode,
                areaCode:userdata.areaCode,
                businessLicense:userdata.businessLicense,
                pic:userdata.pic,
                businessLicenseNo:$("#J-businessLicenseNo").val(),
                name:$("#J-companyname").val(),
                brief:$("#J-brief").val(),
                address:$("#J-adress").val(),
                contactName:$("#J-user").val(),
                contactTelephone:$("#J-iphone").val()
              },
              type:"post",
              success:function (e) {
                if(e.codeId == 1){
                  window.location.href = window.location.href
                }else{
                  common.showcodeId(e.codeId,e.codeDes)
                }
                _this.userstatus()
              }
            })
          }
      }
      info.init()
})
