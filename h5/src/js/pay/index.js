define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var orderID = common.getUrlParam("orderID")
  var orderdata = {}
  var pay = {
    init:function () {
      var _this = this;
        _this.list()
        $(".paylsit li").click(function () {
          $(this).addClass("ative").siblings().removeClass("ative")
        })
    },
    list:function () {
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
            }
        });
    },
    click:function (){
        $("#J-order-Btn").click(function () {
          var payname = $(".paylsit li.ative").data("name")
           if(payname=="alipay"){
              _this.alipaypost()
           }else if(payname=="weixin"){
             _this.weixinpost()
           }
        })
    }
  }
  pay.init()
})
