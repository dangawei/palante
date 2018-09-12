define(function(require, exports, module) {
  var common = require("common")
  var sidedata = []
  var sidelistdata = []
  var classifyName = ""
  var page = {
     pageNo:1,
     pageSize:15,
     totalpage:0
  }
  var help = {
    init:function () {
        var _this = this
            _this.list()
            _this.center()
    },
    list:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/common_problem_classify/page",
        param:{
          token:common.cookie("token"),
          pageNo:1,
          pageSize:100,
          status:1
        },
        type:"get",
        success:function (e) {
          sidedata = e.resData.list
          _this.listhtml()
        }
      })
    },
    listhtml:function () {
      var _this = this
      var str = ""
      sidedata.forEach(function (a) {
        str += '<li data-id="'+a.classifyName+'"><a href="/help/list.html?helpID='+a.id+'">'+a.classifyName+'</a></li>'
      })
      $("#J-menunav").html(str)
      $("#J-menunav").click(function () {
        classifyName = $(this).data("id")
        _this.center()
      })
    },
    center:function (){
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/common_problem/detail",
        param:{
          token:common.cookie("token"),
          commonProblemId:common.getUrlParam("helpID")
        },
        type:"get",
        success:function (e) {
          sidelistdata = e.resData
          $(".help-content-hd").html(e.resData.title)
          $("#J-helpview").html(e.resData.content)
        }
      })
    }
  }
  help.init()
})
