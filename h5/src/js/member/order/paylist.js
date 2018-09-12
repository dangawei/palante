define(function(require, exports, module) {
   var common = require("common")
   var orderID = common.getUrlParam("orderID")
   var orderdata = {}
   var paylist = {
     init:function () {
       var _this = this;
           _this.list()
         $(".paylsit li").click(function () {
           $(this).addClass("ative").siblings().removeClass("ative")
         })
     },
     clickhtml :function () {
        var _this = this;
     },
     list:function () {
       var _this = this;
       common.loginAjax({
         url:common.rootUrl+"/order/details",
         param:{
           token:common.cookie("token"),
           order_id:parseInt(orderID),
         },
         type:"get",
         success:function (e) {
           if(e.codeId == 1){
             orderdata = e.resData
             _this.listhtml()
             _this.pricehtml()
             _this.orderBtn()
           }else{
              common.showcodeId(e.codeId,e.codeDes)
           }
         }
       })
     },
     listhtml:function () {
        var status = common.orderstatus(orderdata.status)
        var userName=""
        if(orderdata.orderType == 2){
          var str = orderdata.userName || ""
          userName = '<span>租车人：'+str+'</span>'
        }
        var strhtml = ''
            strhtml = '<div class="item">'+
                     '<div class="item-img"><img src="'+orderdata.pic+'" width="100" height="100"alt=""></div>'+
                     '<div class="item-info"><p class="itemname mb10"><span class="name">'+orderdata.itemName+'</span> <span>'+orderdata.carModelName+'</span></p><p class="mb10">商品单价：'+orderdata.unitPrice+' 商品数量：'+orderdata.quantity+'</p><p class="itemshop mb10">取车门店：'+orderdata.dealerStorefrontName+'</p></div>'
       var str = '<div class="order-status">'+
        '<div class="order-status-hd"><span class="f20 colororg">'+status+'</span><span class="f20 colororg"><i>订单总价：</i>￥'+orderdata.totalPrice+'</span></div>'+
        '<div class="order-status-bd"><span>订单号：'+orderdata.serialNumber+'</span>'+userName+'<span>联系电话：'+orderdata.principalsTelephone+'</span></div>'+
        strhtml+
        '</div>'+
        '</div>'
        $("#J-pay-item").html(str)
     },
     pricehtml:function () {
       var str = ""
       if(orderdata.orderType==2){
         str = '<div class="order-price-hd"><h2>费用明细</h2></div>'+
        '<div class="order-price-bd"><p><span>车辆租赁费('+orderdata.duration+'月)</span><span>￥'+orderdata.totalPrice+'</span></p><p><span>车辆押金</span><span>￥'+orderdata.foregift+'</span> </p></div>'
      }else if(orderdata.orderType==1){
        str = '<div class="order-price-hd"><h2>费用明细</h2></div>'+
       '<div class="order-price-bd"><p><span>车辆总价</span><span>￥'+orderdata.totalPrice+'</span></p></div>'
      }
       $("#J-price-order").html(str)
     },
     orderBtn:function () {
         var _this = this;
          var str = ""
         if(orderdata.status == 1){
           str = '<a href="javascript:void(0)" class="btn btn-warning mr10" id="J_pay">立即支付</a><a href="javascript:void(0)" class="btn btn-warning" data-id="'+orderdata.id+'" id="J-close-order">取消订单</a>'
         }else if(orderdata.status == 3){
           str = '<a href="javascript:void(0)" class="btn btn-warning">确认收货</a>'
         }
         $("#J-order-Btn").html(str)
         $("#J-close-order").click(function (e) {
             var ID = $(this).data("id")
             var option = {
               title:"确定要取消订单吗?",
               yes:function () {
                 _this.closeorder(ID)
               }
             }
           common.confirm(option)
         })
         $("#J_pay").click(function () {
            var payname = $(".paylsit li.ative").data("name")
             if(payname=="alipay"){
                _this.alipaypost()
             }else if(payname=="weixin"){
               _this.weixinpost()
             }
         })
     },
     closeorder:function (id) {
       common.loginAjax({
         url:common.rootUrl+"/order/cancelled",
         param:{
           token:common.cookie("token"),
           order_buyer_id:parseInt(id),
           cancel_reason:""
         },
         type:"post",
         success:function (e) {
           if(e.codeId == 1){
             window.location.href="/member/order/zucheorder.html"
           }else{
              common.showcodeId(e.codeId,e.codeDes)
           }
         }
       })
     },
     alipaypost:function () {
       common.loginAjax({
         url:common.rootUrl+"/order/cancelled",
         param:{
           token:common.cookie("token"),
           order_buyer_id:parseInt(id),
           cancel_reason:""
         },
         type:"post",
         success:function (e) {
           if(e.codeId == 1){
             window.location.href="/member/order/zucheorder.html"
           }else{
              common.showcodeId(e.codeId,e.codeDes)
           }
         }
       })
     }
   }
   paylist.init()
})
