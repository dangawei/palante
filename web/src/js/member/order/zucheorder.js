define(function(require, exports, module) {
   var common = require("common")
   var $el = $(document)
   var page = {
      pageNo:1,
      pageSize:15,
      totalpage:0
   }
   var subform = {
      status:""
   }
   var orderdata = []
   var order = {
       init:function () {
         var _this = this;
         var laydate = layui.laydate;
         //常规用法
         laydate.render({
           elem: '#test1'
         });
         laydate.render({
           elem: '#test2'
         });
         this.list()
         $('#J-zucheorder').change(function () {
           subform.status = $("#J-zucheorder select").val()
         })
         $el.on("click","#J_searchBtn",function () {
           page.pageNo = 1
           _this.list()
         })
         $el.on("click",".J-orderseece",function () {
           _this.post($(this).data("orderid"))
         })
       },
       list:function () {
         var _this = this;
         common.loginAjax({
           url:common.rootUrl+"/order/page",
           param:{
             token:common.cookie("token"),
             status:subform.status,
             pageNo:page.pageNo,
             pageSize:page.pageSize,
             order_type:2
           },
           type:"get",
           success:function (e) {
             if(e.codeId == 1){
                page.totalpage = e.resData.totalCount
                orderdata = e.resData.list
                _this.orderhtml()
             }else {
               common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
       },
      orderhtml:function () {
          var _this = this;
          var $el = $(document)
          var str = ""
          orderdata.forEach(function (item) {
            var time = common.disposeTime(item.createdAt/1000,"time")
            var status = common.orderstatus(item.status)
            var strbtn = ""
            var duration=""
            var foregift = ""
            if(item.status == 1){
              strbtn = '<a href="/pay/pay.html?orderID='+item.id+'" class="btn btn-warning">去付款</a>'
            }
            if(item.orderType==2){
              duration = '<p>租车时间:'+item.duration+'</p>'
            }
            if(item.orderType==2){
              foregift = '<p>保证金:'+item.foregift+'</p>'
            }
            if(item.status == 3){
              strbtn += '<a href="javascript:void(0)" data-orderid="'+item.id+'" class="btn btn-warning J-orderseece">确认取车</a>'
            }
            if(item.status == 2){
              strbtn += '<a href="javascript:void(0)" data-orderid="'+item.id+'" class="btn btn-warning J-orderout mb5">申请退款</a>'
            }
            strbtn += '<a href="/member/order/orderview.html?orderID='+item.id+'" data-orderid="'+item.id+'">订单详情</a>'
            str +='<div class="borderbox"><div class=""><table class="table tableorder"><tbody class="tableorder-hd"><tr><th colspan="4"><div class="order-title"><span>订单时间:'+time+'</span><span>订单号:'+item.serialNumber+'</span></div></th></tr></tbody><tbody class="tableorder-bd"><tr> <td><div class="orderitem"><div class="orderitemimg fl"><img src="'+item.carSkuPicUrl+'" alt=""></div>'+
            '<div class="orderitemtitle fl">'+
            '<p>'+item.itemName+item.carModelName+'</p>'+
            '<p>'+item.carSkuValue+'</p>'+duration+foregift+
            '</div>'+
            '<div class="orderitemprice fl">￥'+item.unitPrice+'元</div><div class="orderitemnum fl">'+item.quantity+'</div><div class="orderitemoption fl"><a href="#"></a></div></div></td>'+
            '<td class="orderleft"><div class="orderTotal fl"><b>￥'+item.tradeAmount+'</b></div></td>'+
            '<td class="orderleft">'+
            '<div class="orderstatus fl w80">'+status+'</div></td>'+
            '<td class="orderleft w80"><div class="mt10 textalign">'+strbtn+
            '</div></td></tr></tbody></table></div></div>'
          })
          $("#J_orderhtml").html(str)
          this.page()

          $(".J-orderout").click(function () {
            var orderID = $(this).data("orderid")
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
       },
      refunt (orderID,refundReason,index) {
        var _this = this;
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
              layer.close(index);
              _this.list()
            }else{
              layer.msg(e.codeDes)
            }
          }
        })
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
            // _this.list()
            //首次不执行
           if(!first){
             //do something
             _this.list()
           }
          }
        });
      },
      post:function (id) {
        common.loginAjax({
          url:common.rootUrl+"/order/picked_up",
          param:{
            token:common.cookie("token"),
            order_buyer_id:parseInt(id),
          },
          type:"post",
          success:function (e) {
            if(e.codeId == 1){
                window.location.href = window.location.href
            }
          }
        })
      }
   }
   order.init()
})
