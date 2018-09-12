define(function(require, exports, module) {
  var common = require("common")
  var problemclassify = {}
  var list = {
    init:function () {
      this.list()
    },
    list:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/common_problem_classify/page",
        param:{
          pageNo:1,
          pageSize:"1000",
          status:"1"
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             problemclassify = e.resData.list
             _this.classifyhtml()
          }
        }
      })
    },
    classifyhtml:function () {
      var str = "<ul>"
          problemclassify.forEach(function (a) {
            str+='<li><a href="javascript:void(0)">'+a+'</a></li>'
          })
      $("#J_problemside").html(str)
    }
  }
  list.init()
})
