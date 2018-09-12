define(function(require, exports, module) {
    var $el = $(document)
    var common = require("common")
    var orderNum = common.getUrlParam("out_trade_no")
    var pay = {
      init:function () {
        this.orderlist()
      },
      orderlist:function () {
        var _this = this;
        common.loginAjax({
              url:common.rootUrl+"/order/by_serialNumber",
              param:{
                serialNumber:orderNum,
                token:common.cookie("token")
              },
              type:"get",
              success:function (e) {
                if(e.resData.status==2){
                  if(e.resData.orderType == 1){
                    window.location.href="/member/order/sell.html"
                  }
                  if(e.resData.orderType == 2){
                    window.location.href="/member/order/zucheorder.html"
                  }
                  if(e.resData.orderType == 3){
                    window.location.href="/member/order/presell.html"
                  }
                }
              }
          });
      },
    }
    pay.init()
})
