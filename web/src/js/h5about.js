define(function(require,exports,module){
  	var common = require("common")
    var itemID = ""
    var itemDetailData = {}
    var selShop={
       init:function () {
         this.list()
       },
       list:function () {
         var _this = this;
   			common.loginAjax({
   						url:common.rootUrl+"/about_us/latestOne",
   						param:{},
   						type:"get",
   						success:function (e) {
   					if(e.codeId === 1){
   							 itemDetailData = e.resData
                 $("#J_itemview").html(itemDetailData.content)
   						}
   					}
   			})
      }
    }
   selShop.init()
})
