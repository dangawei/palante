define(function(require, exports, module) {
   var common = require("common")
  var orderID = common.getUrlParam("orderID") || ""
   var $el = $(document)
   var orderdata = {}
   var cancel_reason = ""
   var orderview = {
       init:function () {
          this.list()
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
               _this.itemhtml()
               _this.shophtml()
               _this.orderhtml()
             }else{
                common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
       },
       listhtml:function () {
          var createdAt = common.disposeTime(orderdata.createdAt/1000,"time")
          var itemli=""
          if(orderdata.orderType==2){
            itemli = '<li><label>租车时间:</label><div class="pagetxt">'+orderdata.duration+'月</div></li><li><label>取车时间:</label><div class="pagetxt">'+common.disposeTime(orderdata.pickUpDate/1000,"time")+'</div></li>'
          }
          var str = '<ul>'+
          '<li><label>订单号:</label><div class="pagetxt">'+orderdata.serialNumber+'</div></li><li><label>订单金额:</label><div class="pagetxt">'+orderdata.totalPrice+'</div></li>'+
          '<li><label>订单状态:</label><div class="pagetxt">'+common.orderstatus(orderdata.status)+'</div></li><li><label>订单时间:</label><div class="pagetxt">'+createdAt+'</div></li>'+
          '<li><label>支付时间:</label><div class="pagetxt">'+common.disposeTime(orderdata.paidAt/1000,"time")+'</div></li>'+
          itemli+
          '</ul>'
          $("#J_orderinfo").html(str)
       },
       itemhtml:function () {
          var createdAt = common.disposeTime(orderdata.createdAt/1000,"time")
          var itemli=""
          if(orderdata.orderType==2){
            itemli = '<li><label>保证金:</label><div class="pagetxt">￥'+orderdata.foregift+'元</div></li>'
          }
          var str = '<ul>'+
          '<li><label>商品名称:</label><div class="pagetxt">'+orderdata.itemName+'</div></li><li><label>商品型号:</label><div class="pagetxt">'+orderdata.carModelName+'</div></li>'+
          '<li><label>商品配置:</label><div class="pagetxt">'+orderdata.carSkuValue+'</div></li><li><label>单价:</label><div class="pagetxt">￥'+orderdata.unitPrice+'元</div></li>'+
          '<li><label>商品图片:</label><div class="pagetxt"><img src="'+orderdata.carSkuPicUrl+'" with="60" height="60"></div></li>'+
          '<li><label>商品数量:</label><div class="pagetxt">'+orderdata.quantity+'</div></li>'+
           itemli+
          '</ul>'
          $("#J_itemInfo").html(str)
       },
       shophtml:function () {
         var str = '<ul>'+
          '<li><label>门店名称:</label><div class="pagetxt">'+orderdata.dealerStorefrontName+'</div></li><li><label>门店地址:</label><div class="pagetxt">'+orderdata.dealerStorefrontAddress+'</div></li>'+
          '<li><label>联系人:</label><div class="pagetxt">'+orderdata.principalsName+'</div></li><li><label>联系人电话:</label><div class="pagetxt">'+orderdata.principalsTelephone+'</div></li>'+
         '</ul>'
          $("#J_shop").html(str)
       },
       orderhtml:function () {
         var _this = this
         var str = '<div class="textalign mt40">'
           if(orderdata.status == 1){
            str+='<a href="/member/order/paylist.html?orderID='+orderID+'" class="btn btn-max btn-warning mr10">确认支付</a>'
           }
           if(orderdata.status == 1){
              str+='<a href="javascript:void(0)" class="btn btn-error btn-max mr10" id="J_closeorder">取消订单</a>'
           }
           if(orderdata.status == 2){
             str = '<a href="javascript:void(0)" class="btn btn-error btn-max mr10" id="J-orderout">申请退款</a>'
           }
          str += '</div>'
          $("#J_orderBtn").html(str)
          $("#J-orderout").click(function () {
            var str = '<div class="order-refunt-item">'+
                      '<div class="order-refunt-list"><div class="order-refunt-txt"><textarea placeholder="填写退款理由" id="J_ordertextarea"/></div></div>'+
                      '</div>'
            layer.open({
              title:"申请退款",
              type: 1,
              content:str,
              area: ['500px', '300px'],
              btn: ['申请退款'],
              yes: function(index, layero){
                var refundReason = $el.find("#J_ordertextarea").val()
                _this.refunt(orderID,refundReason,index)
              }
            });
          })
          $("#J_closeorder").click(function () {
              var str = '<div class="order-refunt-item">'+
                        '<div class="order-refunt-list"><div class="order-refunt-txt"><textarea placeholder="填写取消订单理由" id="J_ordertextarea"/></div></div>'+
                        '</div>'
              layer.open({
                title:"取消订单理由",
                type: 1,
                content:str,
                area: ['500px', '300px'],
                btn: ['取消订单'],
                yes: function(index, layero){
                  var refundReason = $el.find("#J_ordertextarea").val()
                  _this.closeorder(refundReason,index)
                }
              });
          })
       },
       refunt (orderID,refundReason,index) {
         common.loginAjax({
           url:common.rootUrl+"/refund_order/refund",
           param:{
             token:common.cookie("token"),
             orderBuyerId:parseInt(orderID),
             refundReason:refundReason,
           },
           type:"post",
           success:function (e) {
             if(e.codeId == 1){
               if(orderdata.orderType==1){
                  window.location.href="/member/order/sell.html"
               }else if (orderdata.orderType==2) {
                 window.location.href="/member/order/zucheorder.html"
               }else if (orderdata.orderType==3) {
                 window.location.href="/member/order/presell.html"
               }
             }else{
               layer.msg(e.codeDes)
             }
           }
         })
       },
       closeorder:function (refundReason,index) {
         common.loginAjax({
           url:common.rootUrl+"/order/cancelled",
           param:{
             token:common.cookie("token"),
             order_buyer_id:parseInt(orderID),
             cancel_reason:refundReason
           },
           type:"post",
           success:function (e) {
             if(e.codeId == 1){
               if(orderdata.orderType==1){
                  window.location.href="/member/order/sell.html"
               }else if (orderdata.orderType==2) {
                 window.location.href="/member/order/zucheorder.html"
               }else if (orderdata.orderType==3) {
                 window.location.href="/member/order/presell.html"
               }
             }else{
                common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
       }
    }
   orderview.init()
})
