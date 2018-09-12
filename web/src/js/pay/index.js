define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var orderID = common.getUrlParam("orderID")
  var orderdata = {}
  var Time = 60
  var orderTime;
  var pay = {
    init:function () {
      var _this = this;
        _this.list()
        $(".paylsit li").click(function () {
          $(this).addClass("ative").siblings().removeClass("ative")
        })
    },
    list:function () {
      var _this = this;
      common.loginAjax({
            url:common.rootUrl+"/order/details",
            param:{
              order_id:orderID,
              token:common.cookie("token")
            },
            type:"get",
            success:function (e) {
              orderdata = e.resData
              $("#J-order-price").html("￥"+orderdata.orderAmount)
              _this.click()
            }
        });
    },
    click:function (){
        var _this = this;
        var $el = $(document)
        $el.find('#J-order-Btn').off('click').click(function () {
          var payname = $el.find(".paylsit li.ative").data("name")
           if(payname=="alipay"){
              _this.alipaypost()
           }else if(payname=="weixin"){
             _this.weixinpost()
           }else if(payname=="outline"){
             _this.outlinepost()
           }
           else {
             common.showTip("支付方式没有选择")
           }
        })
    },
    outlinepost () {
      window.location.href = "/member/order/zucheorder.html"
    },
    alipaypost () {
      var _this = this;
      common.loginAjax({
            url:common.rootUrl+"/pay_order/ali_order",
            param:{
              order_id:parseInt(orderID),
              token:common.cookie("token")
            },
            type:"post",
            success:function (e) {
              if(e.codeId == 1){
                $("#J_playhtml").html(e.resData)
                _this.orderoutTime()
              }else{
                layer.msg(e.codeDes)
              }
            }
        });
    },
    weixinpost () {
      var _this = this;
      var $el = $(document)
      common.loginAjax({
            url:common.rootUrl+"/pay_order/wechat_order",
            param:{
              order_id:parseInt(orderID),
              token:common.cookie("token")
            },
            type:"post",
            success:function (e) {
              if(e.codeId == 1){
                  Time = 60
                 _this.orderoutTime()
                 $el.find("#J_maskBOX").show()
                 $el.find("#J_weixinprice").html(e.resData.amount)
                 $el.find('#J_weixincode').html("")
                 $el.find('#J_weixincode').qrcode(e.resData.code_url)
                 $el.find('.J_weixinBTN').off('click').click(function () {
                    $el.find("#J_maskBOX").hide()
                    $el.find('#J_weixincode').html("")
                 })
              }else{
                layer.msg(e.codeDes)
              }
            }
        });
    },
    orderoutTime () {
      orderTime = setInterval(this.sendTime,1000)
    },
    sendTime () {
      if(Time==0){
        window.location.href="/member/order/zucheorder.html"
        clearInterval(orderTime)
      }else {
        pay.orderlist()
      }
    },
    orderlist:function () {
      var _this = this;
      common.loginAjax({
            url:common.rootUrl+"/order/details",
            param:{
              order_id:orderID,
              token:common.cookie("token")
            },
            type:"get",
            success:function (e) {
              Time = Time -1
              if(e.resData.status==2){
                 common.showTip("支付成功")
                 setTimeout(function () {
                     if(e.resData.orderType == 1){
                       window.location.href="/member/order/sell.html"
                     }
                     if(e.resData.orderType == 2){
                       window.location.href="/member/order/zucheorder.html"
                     }
                     if(e.resData.orderType == 3){
                       window.location.href="/member/order/presell.html"
                     }
                 },1500)
              }
            }
        });
    },
  }
  pay.init()
})
