define(function(require, exports, module) {
   var common = require("common")
   var page = {
      pageNo:1,
      pageSize:15,
      totalpage:0
   }
   var cardata = []
   var car = {
       init:function () {
         this.carlist()
       },
       carlist:function () {
         var _this = this;
         common.loginAjax({
           url:common.rootUrl+"/order/car_page",
           param:{
             token:common.cookie("token"),
             pageNo:page.pageNo,
             pageSize:page.pageSize,
             orderType:2
           },
           type:"get",
           success:function (e) {
             if(e.codeId == 1){
                page.totalpage = e.resData.totalCount
                orderdata = e.resData.list
                _this.carhtml()
                _this.page()
             }
             else if(e.codeId == -9){
               page.totalpage = 0
               orderdata = []
               _this.carhtml()
               _this.page()
             }
             else{
               common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
       },
       carhtml:function () {
          var str = '<div class="carBox">'
          orderdata.forEach(function (a) {
            var item = {
                carSkuPicUrl:a.carSkuPicUrl || "",
                carModelName:a.carModelName || "",
                carSkuValue:a.carSkuValue || "",
                licencePlateNumber:a.licencePlateNumber || "",
                carVin:a.carVin || "",
                totalDistance:a.totalDistance || 0,
                electricQuantity:a.electricQuantity || 0
            }
            str += '<div class="car_list">'
            str += '<div class="car-item">'
            str += '<div class="car-item-img fl"><img src="'+item.carSkuPicUrl+'"></div>'
            str += '<div class="car-item-title fl"><h2>'+item.carModelName+'</h2><p>'+item.carSkuValue+'</p><p>车牌号：'+item.licencePlateNumber+'</p><p>vin:'+item.carVin+'</p></div>'
            str += '</div>'
            str += '<div class="car-parms"><div class="car-item-title"><p><label>车辆位置<i class="location"></i></label>红石中央大厦</p><p><label>电池电量<i class="battery"></i></label>'+item.electricQuantity+'%</p><p><label>行驶里程<i class="mileage"></i></label>'+item.totalDistance+'</p></div></div>'
            str += '<div class="car-more"><a href="/member/car/gocarview.html?vin='+item.carVin+'">查看车辆详情></a></div>'
            str +='</div>'
          })
        str += '</div>'
        $("#J_orderhtml").html(str)
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
            _this.carlist()
          }
         }
       });
     }
   }
   car.init()
})
