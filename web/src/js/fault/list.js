define(function(require, exports, module) {
  var $el = $(document)
  var common = require("common")
  var faultdata
  var page = {
     pageNo:1,
     pageSize:15,
     totalpage:0
  }
  var list = {
    init:function () {
      var _this = this
      var $el = $(document)
      this.list()
      this.page()
      $el.on("click","#J_searchBtn",function () {
        _this.list()
      })
    },
    list:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/fault_problem/page",
        param:{
          token:common.cookie("token"),
          pageNo:page.pageNo,
          pageSize:page.pageSize,
          vin:$("#J-select-vin").val(),
          solveStatus:$("#J-zucheorder select").val()
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
            faultdata = e.resData
              _this.listhtml()
              page.totalpage = faultdata.totalCount
          }
        }
      })
    },
    listhtml:function () {
      var _this = this;       
      var str = ''
      faultdata.list.forEach(function (a) {
        var createdAt = common.disposeTime(a.createdAt/1000)
        var solveStartTime = common.disposeTime(a.solveStartTime/1000)
        var solveFinishTime = common.disposeTime(a.solveFinishTime/1000)
        var solveStatus = ""
        if(a.solveStatus==1){
          solveStatus= "待解决"
        }
        if(a.solveStatus==2){
          solveStatus= "解决中"
        }
        if(a.solveStatus==3){
          solveStatus= "已解决"
        }
        str +='<tr>'
        str +='<td>'+a.vin+'</td>'
        str +='<td>'+a.mobileNo+'</td>'
        str +='<td>'+a.faultContent+'</td>'
        str +='<td>'+solveStatus+'</td>'
        str +='<td>'+createdAt+'</td>'
        str +='<td>'+solveStartTime+'</td>'
        str +='<td>'+solveFinishTime+'</td>'
        str +='<td>'
        if(a.solveStatus==2){
          str+='<a href="javascript:void(0)" class="btn btn-gree J_jiejue mr10"  data-id="'+a.id+'">解决</a>'
        }
        str +='<a href="/member/fault/view.html?faultProblemId='+a.id+'&status='+a.solveStatus+'" class="btn btn-gree"  data-id="'+a.id+'">回复内容</a>'
        str +='</td>'
        str +='</tr>'
      })
      $("#J_tbody").html(str)
      $el.on("click",".J_jiejue",function () {
          var VINID = $(this).data("id")
          _this.post(VINID)
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
    post:function (VINID) {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/fault_problem/solve",
        param:{
          token:common.cookie("token"),
          id:parseInt(VINID)
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
  list.init()
})
