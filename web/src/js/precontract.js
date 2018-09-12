define(function(require, exports, module) {
  var common = require("common")
  var city = require("city")
  var bannerdata=[];
  var cardlist = []
  var cardskulist = []
  var shoplist = []
  var formdata = {
     cardID:"",
     cardskuID:""
  }
  var shopdata = {
      provinceCode:"",
      cityCode:"",
      areaCode:""
  }
  var openlistdata=[]
  var $el = $(document)
  var index = {
    init:function () {
       var _this = this;
        _this.cardlist()
        _this.shoplist()
        // _this.getprovince()
        _this.openlist()
       $el.on("click","#J_cardBtn",function () {
          _this.post()
       })
       $el.on("click","#J_closeBtn",function () {
           $el.find("#J_opencitybox").addClass("none")
       })
       $el.on("click","#J_citylist li",function () {
         $(this).addClass("ative").siblings().removeClass("ative")
         shopdata.provinceCode = $(this).data("provincecode")
         shopdata.cityCode = $(this).data("citycode")
         $el.find("#J_modelcar").removeClass("none")
         _this.shoplist()
       })
       var laydate = layui.laydate;
       //常规用法
       laydate.render({
         elem: '#test1'
         ,type: 'datetime'
       });

    },
    openlist:function () {
        var _this = this
        var $el = $(document)
        common.loginAjax({
          url:common.rootUrl+"/open_city/list",
          param:{
          },
          type:"get",
          success:function (e) {
            if(e.codeId == 1){
               openlistdata = e.resData
               _this.openlisthtml()
            }
          }
        })
    },
    openlisthtml:function () {
      var str = ""
       openlistdata.forEach(function (a) {
          str +='<li data-provinceCode='+a.provinceCode+' data-cityCode='+a.cityCode+'><a href="javascript:void(0)">'+a.cityName+'</a></li>'
       })
       $("#J_citylist").html(str)
    },
    cardlist:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/item/list",
        param:{
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             cardlist = e.resData
             _this.bannerhtml()
          }
        }
      })
    },
    bannerhtml:function () {
       var _this = this;
        var str = "";
        cardlist.forEach(function (a) {
          str += '<li data-id='+a.carModelId+'><div class="cardmodel"><p class="cardimg" style="background:url('+a.modelPic+') center no-repeat;background-size: 240px auto;"></p><p>'+a.modelName+'</p></div></li>'
        })
        $("#J_card_model").html(str)
        $el.on("click",'#J_card_model li',function () {
          $(this).addClass("ative").siblings().removeClass("ative");
          formdata.cardID = $(this).data('id')
          _this.cardskuid(formdata.cardID)
          $el.find("#J_opencitybox").removeClass("none")
        })
    },
    cardskuid:function (id) {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/car_sku/list/by_carModelId",
        param:{
          carModelId:id
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             cardskulist = e.resData
             _this.skuhtml()
          }
        }
      })
    },
    skuhtml:function () {
        var str = ""
        cardskulist.forEach(function (a) {
          str += '<li data-id='+a.id+'><div class="cardmodel"><p style="background:url('+a.pic+') center no-repeat;background-size: 240px auto;"></p><p>'+a.skuCodeCombination+'</p></div></li>'
        })
        $("#J_cardsku_model").html(str)
        $el.on("click",'#J_cardsku_model li',function () {
          $(this).addClass("ative").siblings().removeClass("ative");
           formdata.cardskuID = $(this).data('id')
        })
    },
    shoplist:function (data) {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/dealer_storefront/list",
        param:{
          provinceCode:shopdata.provinceCode,
          cityCode:shopdata.cityCode,
          areaCode:shopdata.areaCode,
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             shoplistdata = e.resData
             _this.shoplisthtml()
          }
        }
      })
    },
    shoplisthtml:function () {
      var str = '<select class="pc-select">'
          str += '<option value="">全部</option>'
      shoplistdata.forEach(function (a) {
        str += '<option value='+a.id+'>'+a.name+'</option>'
      })
      str += "</select>"
      $("#J_shoplist").html(str)
      $el.on("click",'#J_cardsku_model li',function () {
        $(this).addClass("ative").siblings().removeClass("ative");
        formdata.cardskuID = $(this).data('id')
      })
    },
    getprovince:function () {
      var _this = this;
       var str = '<select class="pc-select">'
        var data = city.getprovince()
        data.forEach(function (a) {
          str += '<option value="'+a.value+'">'+a.label+'</option>'
        })
        str += "</select>"
       $("#J_province").html(str)
       $("#J_province select").change(function () {
         shopdata.provinceCode = $(this).val()
         _this.citylist($(this).val())
       })
    },
    citylist:function (code) {
      var _this = this;
      var data = city.getcity(code)
      var str = '<select class="pc-select">'
      data.forEach(function (a) {
        str += '<option value="'+a.value+'">'+a.label+'</option>'
      })
      str += "</select>"
      $("#J_city_box").html(str)
      $("#J_city_box select").change(function () {
        shopdata.cityCode = $(this).val()
        _this.shoplist()
      })
    },
    post:function () {
      var _this = this;
      if(!$("#J_shoplist select").val()){
         common.showTip("门店还没有选择")
         return
      }
      if(!formdata.cardID){
         common.showTip("车辆型号还没有选择")
         return
      }
      if($("#J_username").val()==""){
         common.showTip("姓名没有填写")
         return
      }
      var reg = common.verification("tel")
      if(!reg.test($("#J_telphone").val())){
         common.showTip("手机格式不对")
         return
      }
      if($("#test1").val()==""){
         common.showTip("预约时间没有选择")
         return
      }
      common.loginAjax({
        url:common.rootUrl+"/appointment_driving/save",
        param:{
          token:common.cookie("token"),
          dealerStorefrontId:$("#J_shoplist select").val(),
          carModelId:formdata.cardID,
          userName:$("#J_username").val(),
          userPhone:$("#J_telphone").val(),
          appointmentTime:$("#test1").val(),
        },
        type:"post",
        success:function (e) {
          if(e.codeId == 1){
             common.showTip("提交成功")
             window.location.href = window.location.href
          }else if(e.codeId == -99){
              var option = {
                yes:function () {
                  _this.post()
                }
              }
              common.showlogin(option)
          }else {
              common.showcodeId(e.codeId,e.codeDes)
          }
        }
      })
    }
  }
  index.init()
})
