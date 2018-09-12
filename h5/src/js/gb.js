define(function(require, exports, module) {
  var common = require("common")
  var navdata=[]
  var gb = {
      init:function () {
        var _this = this;
            _this.city()
            _this.nav()
            _this.token()
      },
      nav:function () {
        var _this = this;
        common.loginAjax({
          url:common.rootUrl+"/navigation_bar/page",
          param:{
            pageNo:1,
            pageSize:"1000",
            status:"1"
          },
          type:"get",
          success:function (e) {
            if(e.codeId == 1){
               navdata = e.resData.list;
               _this.navhtml()
            }
          }
        })
      },
      navhtml:function () {
          var str = ""
          navdata.forEach(function (a) {
              var url =  a.url || ""
              str+='<li><a href="'+url+'">'+a.title+'</a></li>'
          })
          $("#J_nav_list").html(str)
      },
      city:function () {
        var $el = $(document);
        var str = '<div class="citylist"><a href="#">杭州</a><a href="#">杭州</a><a href="#">杭州</a><a href="#">杭州</a>  <a href="#">杭州</a><a href="#">杭州</a><a href="#">杭州</a><a href="#">杭州</a><a href="#">杭州</a></div>'+
        '<div class="citycode"><p><img src="../img/vx-code.png" alt=""></p><p>扫描二维码下载启城app</p></div>'
         $el.on("click","#J_citybox .citylist a",function () {
            $("#J_citybox").html("")
         })
         $el.on("click","#J_cityshow",function () {
           if($("#J_citybox").find(".citylist").length>0){
             $("#J_citybox").html("")
           }else{
             $("#J_citybox").html(str)
           }
         })
      },
      token:function () {
          var _this = this;
          var token = common.cookie("token")
          var userName = common.cookie("username")
          var str = ""
          if(token){
             str = '<a href="/member/order/zucheorder.html">【'+userName+'】</a><a href="javascript:void(0)"id="J-loginout">退出</a>'
          }else{
            str = '<a href="/login/">登录</a>'
          }
          $("#J-login").html(str)
          $("#J-loginout").click(function () {
            _this.loginout()
          })
      },
      loginout:function () {
        common.loginAjax({
          url:common.rootUrl+"/user/logout",
          param:{
            token:common.cookie("token")
          },
          type:"post",
          success:function (e) {
            var options = {
              path:"/"
            }
            common.cookie("token","",options)
            common.cookie("username","",options)
            window.location.href="/"
          }
        })
      }
  }
  gb.init()
})
