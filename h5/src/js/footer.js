define(function(require, exports, module) {
  var common = require("common")
  var footer = {
    init:function () {
       var _this = this;
        _this.fixed()
    },
    fixed:function () {
        $("#J_fixed_nav li").hover(function () {
          $(this).addClass("ative").siblings().removeClass("ative")
        })
    }
  }
  footer.init()
})
