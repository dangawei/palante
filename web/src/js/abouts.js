define(function(require,exports,module){
  	var common = require("common")
    var itemDetailData = {}
    var selShop={
       init:function () {
          itemID = common.getUrlParam("itemID") || ""
         this.list()
       },
       list:function () {
         var _this = this;
   			common.loginAjax({
   						url:common.rootUrl+"/about_us/latestOne",
   						type:"get",
   						success:function (e) {
   					if(e.codeId === 1){
   							 itemDetailData = e.resData
                 $("#J-company-bd").html(itemDetailData.content)
   						}
   					}
   			})
      }
    }
    selShop.init()
})
