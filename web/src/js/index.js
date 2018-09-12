define(function(require, exports, module) {
  var common = require("common")
  var bannerdata=[];
  var hotitemdata=[]
  var index = {
    init:function () {
       var _this = this;
        _this.banner()
        _this.hotitem()
        setTimeout(function () {
          var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination01',
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev',
              paginationClickable: true,
              autoplay: 2000,
          });
          var swiper = new Swiper('.swiper-container01', {
            pagination: '.swiper-pagination02',
            slidesPerView: 3,
            nextButton: '.swiper-button-next01',
            prevButton: '.swiper-button-prev01',
            paginationClickable: true,
            spaceBetween: 30,
            autoplay: 3000
        });
        },500)
    },
    banner:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/advertising/page",
        param:{
          pageNo:1,
          pageSize:"1000",
          status:"1",
          useType:1,
          locationId:1,
          startExpire:common.disposeTime((new Date().getTime())/1000),
          endExpire:"2099-12-30"
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
             bannerdata = e.resData.list
             _this.bannerhtml()
          }
        }
      })
    },
    bannerhtml:function () {
        var str = "";
        bannerdata.forEach(function (a) {
          str += '<div class="swiper-slide"><a href="'+a.url+'" style="background:url('+a.img+') center no-repeat"></a></div>'
        })
        $("#J_bannerbox").html(str)
    },
    hotitem:function () {
      var _this = this;
      common.loginAjax({
        url:common.rootUrl+"/hot_recommended/list",
        param:{
        },
        type:"get",
        success:function (e) {
          if(e.codeId == 1){
            hotitemdata = e.resData
            _this.hotitemhtml()
          }
        }
      })
    },
    hotitemhtml:function () {
      var str = ""
      hotitemdata.forEach(function (a) {
        console.log(a.carModelId)
        str += '<div class="swiper-slide">'+
        '<a href="/item/cardview.html?carModelID='+a.carModelId+'&itemID='+a.id+'"><div class=""><img src="'+a.modelPic+'" alt=""  height="342"></div><div class="car_index_title"><h2>'+a.modelName+'</h2><p>'+a.name+'</p></div><div class="car_price">指导价:'+a.modelGuidePrice+'元</div></a>'+
        '</div>'
       })
      $("#J_hotItem").html(str)
    }
  }
  index.init()
})
