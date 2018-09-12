define(function(require, exports, module) {
   var common = require("common")
   var $el = $(document)
   var page = {
      pageNo:1,
      pageSize:15,
      totalpage:0
   }
   var subform = {
      status:"",
      startTime:"",
      endTime:"",
   }
   var orderdata = []
   var order = {
       init:function () {
         var _this = this;
         var laydate = layui.laydate;
         //常规用法
         laydate.render({
           elem: '#test1',
           max:common.disposeTime((new Date().getTime())/1000, "date"),
           done:function (e){
              subform.startTime = e
           }
         });
         laydate.render({
           elem: '#test2',
           max:common.disposeTime((new Date().getTime())/1000, "date"),
           done:function (e){
              subform.endTime = e
           }
         });
         this.list()
         $('#J-zucheorder').change(function () {
           subform.status = $("#J-zucheorder select").val()
         })
         $el.on("click","#J_searchBtn",function () {
           page.pageNo = 1
           _this.list()
         })
         $el.on("click","#J-orderseece",function () {
           _this.post($(this).data("orderid"))
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
         })
       },
       list:function () {
         var _this = this;
         common.loginAjax({
           url:common.rootUrl+"/appointment_driving/getPage",
           param:{
             token:common.cookie("token"),
             status:subform.status,
             startTime:subform.startTime,
             endTime:subform.endTime,
             pageNo:page.pageNo,
             pageSize:page.pageSize
           },
           type:"get",
           success:function (e) {
             if(e.codeId == 1){
                page.totalpage = e.resData.totalCount
                orderdata = e.resData.list
                _this.orderhtml()
             }else if(e.codeId == -9){
                orderdata = []
                _this.orderhtml()
             }else{
               common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
       },
      orderhtml:function () {
          var _this = this;
          var str = ""
          orderdata.forEach(function (item) {
            var time = common.disposeTime(item.createdAt/1000,"time")
            var yutime = common.disposeTime(item.appointmentTime/1000,"time")
            var status = common.drivingstatus(item.status)
            var strbtn = ""
            var duration=""
            if(item.status==1){
              strbtn +='<a href="javascript:void(0)" class="btn btn-warning J-driving-order" data-orderid="'+item.id+'" >取消预约</a>'
            }
            str +='<div class="borderbox"><div class=""><table class="table tableorder"><tbody class="tableorder-hd"><tr><th colspan="4"><div class="order-title"><span>创建时间:'+time+'</span><span>预约时间:'+yutime+'</span></div></th></tr></tbody><tbody class="tableorder-bd"><tr> <td><div class="orderitem"><div class="orderitemimg fl"><img src="'+item.carPic+'" alt="" with="100" height="100"></div>'+
            '<div class="orderitemtitle fl">'+
            '<p>'+item.carModelName+'</p>'+
            '</div>'+
            '<div class="orderitemprice fl"></div></div></td><td class="orderleft w150">'+
            '<div class="orderstatus fl">'+status+'</div></td><td class="orderleft w120"><div class="mt10 textalign">'+strbtn+
            '</div></td></tr></tbody></table></div></div>'
          })
          $("#J_orderhtml").html(str)
          $(".J-driving-order").click(function (e) {
              var orderID = $(this).data("orderid")
              var option = {
                title:"取消驾驶订单",
                yes:function () {
                   _this.closedriving(orderID)
                }
              }
              common.confirm(option)
          })
          this.page()
      },
      page:function () {
        var _this = this;
        var laypage = layui.laypage
        laypage.render({
          elem: 'J_page'
          ,count: page.totalpage
          ,limit:page.pageSize
          ,curr:page.pageNo
          ,layout: ['count', 'prev', 'page', 'next', 'skip']
          ,jump: function(obj,first){
              page.pageNo = obj.curr
           if(!first){
              _this.list()
           }
          }
        });
      },
      closedriving:function (id) {
        common.loginAjax({
          url:common.rootUrl+"/appointment_driving/cancel",
          param:{
            token:common.cookie("token"),
            id:parseInt(id),
          },
          type:"post",
          success:function (e) {
            if(e.codeId == 1){
              window.location.href="/member/order/driving.html"
            }
          }
        })
      }
   }
   order.init()
})
