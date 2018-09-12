define(function(require,exports,module){
  	var common = require("common")
    var itemID = ""
    var itemDetailData = {}
    var selShop={
       init:function () {
          itemID = common.getUrlParam("itemID") || ""
         this.list()
       },
       list:function () {
         var _this = this;
   			common.loginAjax({
   						url:common.rootUrl+"/item/getOne",
   						param:{
   							id:itemID
   						},
   						type:"get",
   						success:function (e) {
   					if(e.codeId === 1){
   							 itemDetailData = e.resData
                 $("#J_itemview").html(itemDetailData.prop)
   						}
   					}
   			})
      }
    }
    selShop.init()
})
