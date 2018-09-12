define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var faultProblemId = common.getUrlParam("faultProblemId") || ""
  var status = common.getUrlParam("status") || ""
  var faultdata
  var page = {
     pageNo:1,
     pageSize:15,
     totalpage:0
  }
  var list = {
    init:function () {
      if(status==3){
        $(".SNS-info").addClass("none")
      }
      this.list()
      this.page()
      this.click()
    },
    click:function () {
      var _this = this;
      var $el = $(document)
        $el.on("click",'.J-SNS-sockt',function () {
          _this.fault()
        })
    },
    fault:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/fault_problem_reply/save",
        param:{
          token:common.cookie("token"),
          faultProblemId:parseInt(faultProblemId),
          reply:$('.J-SNS-centent').val()
        },
        type:"post",
        success:function (e) {
          if(e.codeId == 1){
            _this.list()
            common.showTip(e.codeDes)
          }else{
            common.showcodeId(e.codeId,e.codeDes)
          }
        }
      })
    },
    list:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/fault_problem_reply/list",
        param:{
          token:common.cookie("token"),
          faultProblemId:faultProblemId
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
            faultdata = e.resData
              _this.listhtml()
          }
        }
      })
    },
    listhtml:function () {
      if(faultdata.length<1){
         return
      }
      var str = ''
      faultdata.forEach(function (a) {
        var time =common.disposeTime(a.createdAt/1000,'time')
        if(a.replyFlag==2){
            str +='<div class="SNS-list SNS-list-left">'
            str +='<div class="SNS-list-hd">【自己】'+time+'</div>'
        }else{
            str +='<div class="SNS-list SNS-list-right">'
            str +='<div class="SNS-list-hd">【客服】'+time+'</div>'
        }
        str +='<div class="SNS-list-bd">'+a.reply+'</div>'
        str +='</div>'
      })
      $(".J-SNS-list").html(str)
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
    }
  }
  list.init()
})
