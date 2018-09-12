define(function(require, exports, module) {
  var common = require("common")
  var sidedata = []
  var sidelistdata = []
  var classifyName = common.getUrlParam("helpID") || ""
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
      var str = '<li><a href="/help/list.html">全部</a></li>'
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
        url:common.rootUrl+"/common_problem/page",
        param:{
          token:common.cookie("token"),
          pageNo:1,
          classifyId:classifyName,
          pageSize:10,
          status:1
        },
        type:"get",
        success:function (e) {
          sidelistdata = e.resData.list
          page.totalpage = e.resData.totalCount
          _this.centerhtml()
          _this.page()
        }
      })
    },
    centerhtml:function () {
      var _this = this
      var str = ""
      sidelistdata.forEach(function (a) {
        str += '<li data-id="'+a.title+'"><a href="/help/view.html?helpID='+a.id+'">'+a.title+'</a></li>'
      })
      $("#J-help-conter").html(str)
    },
    page:function () {
      var _this = this;
      var laypage = layui.laypage
      laypage.render({
        elem: 'J-page'
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
    }
  }
  help.init()
})
