define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var orderdata = common.getStorage("seledDatas","session")
  var formdata = {
      dealer_id:""
  }
  var order = {
    init:function () {
       var _this = this;
        if(orderdata=="" || orderdata==null || orderdata==undefined){
           common.showTip("页面不存在,马上跳转首页")
           setTimeout(function () {
             window.location.href="/"
           },1500)
           return
        }
        _this.list()
        _this.orderprice()
        $el.find('#J-order-sumit').off('click').click('#J-order-sumit', function (e) {
          $el.find('#J-order-sumit input').prop("checked",true)
          _this.post()
        })
    },
    list:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/dealer_storefront/getOne",
        param:{
          token:common.cookie("token"),
          id:orderdata.dealer_storefront_id
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             var e = e.resData
              var str = '<span>'+e.name+'</span>'
              $el.find('#J-itemshop').html(str)
              var hendname =''+common.cookie("username") + '<a href="javascript:void(0)" class="ml10" id="J_orderout">[退出]</a>'
              $("#J_payordername").html(hendname)
               _this.itemlist()
               $el.on("click","#J_orderout",function () {
                  var option = {
                    yes:function () {
                    }
                  }
                  common.loginout(option)
               })
          }else{
              common.showcodeId(e.codeId,e.codeDes)
          }
        }
      })
    },
    itemlist:function () {
      var skunam = ""
        for(var i=0;i<orderdata.seldatas.length;i++){
           skunam += '<span>'+orderdata.seldatas[i].value+' </span>'
        }
      var time = ""
      if(orderdata.itemType==2){
        time +='<p>租车时间:'+orderdata.duration+'月</p>'
      }
      var pirce = ""
      var totalprice = ''
      var orderprice = ""
      if(orderdata.itemType==2){
        pirce = '<li class="w10">'+orderdata.price+'</li>'
        orderprice = orderdata.price
      }
      if(orderdata.itemType==1){
        pirce = '<li class="w10">'+orderdata.price+'</li>'
        orderprice = orderdata.price
      }
      if(orderdata.itemType==3){
        pirce = '<li class="w10">'+orderdata.subscription+'</li>'
        orderprice = orderdata.subscription
      }

       totalprice = '<li class="w10">'+orderdata.quantity*orderprice+'</li>'
      var str ='<ul>'+
      '<li class="w70"><div class="itemimg"><div class=""><img src="'+orderdata.pic+'" alt=""></div><div class="item-title">'+
      '<p>'+orderdata.itemName+'</p>'+
      '<p>'+skunam+'</p>'+
      ''+time+''+
      '</div>'+
      '</div></li> '+pirce+
      '<li class="w10">'+orderdata.quantity+'</li>'+totalprice
      '</ul>'
       $el.find("#J-itemlist").html(str)
    },
    orderprice:function () {
      var str = ""
      if(orderdata.itemType==2){
         str += '<ul><li><label>车辆租金：</label><div>'+((orderdata.price)*parseInt(orderdata.quantity))+'</div></li><li><label>保证金：</label><div>'+((orderdata.cashDeposit)*parseInt(orderdata.quantity))+'</div></li><li><label>应付金额：</label><div>'+(((orderdata.price)*parseInt(orderdata.quantity))+((orderdata.cashDeposit)*parseInt(orderdata.quantity)))+'</div></li></ul>'
       }else if(orderdata.itemType==1){
         str += '<ul><li><label>商品应付总计：</label><div>'+((orderdata.price)*parseInt(orderdata.quantity))+'</div></li><li><label>应付金额：</label><div>'+((orderdata.price)*parseInt(orderdata.quantity))+'</div></li></ul>'
      }else {
        str += '<ul><li><label>商品订金：</label><div class="f20">'+((orderdata.subscription)*parseInt(orderdata.quantity))+'</div></li></ul>'
      }
      $el.find("#J-order-price").html(str)
    },
    //提交订单
    post:function () {
      var _this = this;
      var data = {
          token:common.cookie("token"),
          dealer_storefront_id:parseInt(orderdata.dealer_storefront_id),
          item_id:parseInt(orderdata.item_id),
          car_sku_id:parseInt(orderdata.car_sku_id),
          quantity:orderdata.quantity,
          order_type:parseInt(orderdata.itemType),
          pick_up_date:common.disposeTime(new Date().getTime()/1000,"date"),
          remark:orderdata.remark,
      }
      if(orderdata.itemType==2){
          data.duration=parseInt(orderdata.duration)
      }
      common.loginAjax({
        url:common.rootUrl+"/order/create_order",
        param:data,
        type:"post",
        success:function (e) {
          if(e.codeId == 1){
              var data = {
               type:"",
               data:{
                 seledDatas:""
               }
             }
             common.setStorage(data)
             window.location.href="/pay/pay.html?orderID="+e.resData
          }else{
             $el.find('#J-order-sumit input').prop("checked",false)
             common.showcodeId(e.codeId,e.codeDes)
          }
        }
      })
    }
  }
  order.init()
})
