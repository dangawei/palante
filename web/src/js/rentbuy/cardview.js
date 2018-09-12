window.shopdata = {
	itemid:"",
	itemname:"",
	dealerid:""
}
define(function(require,exports,module){
	var common = require("common");
	var carModelID = common.getUrlParam("carModelID")
	var itemID = common.getUrlParam("itemID") || ''
 	var itemType = common.getUrlParam("itemType") || 2
  var $el = $(document)
	var itemindexnum = 0; //排序的位置
	// 商品详情数据信息
	var itemDetailData={};
	// 商品图片
	var itemImgDatas=[];
  var itemnum = 1;
	var selectsku = [] //选中sku
	var skuID = "" //选中的sku
	var skudata = [] // sku属性
  var skulistdata=[] //sku生成的
	var seldatas = []
	var guidedata = {}
	var carconfigdata = []
	var modelconfigurationvalue = []
	var seledDatas={
		token:common.cookie("token") || '',
		dealer_storefront_id:'',
		item_id:itemID,
		car_sku_id:'',
		quantity:'',
		order_type:'',
		duration:'',
		pick_up_date:'',
		remark:'',
		price:'',
		itemType:itemType,
		seldatas:[]
	}
	var zuchedata = [] //租车时间
	var cardview = {
    init:function() {
      this.tab()
			this.skulist()
			this.itemnum()
			this.ceartedsku()
			this.itemviewhtml()
			this.itemimglist()
			if(itemType==2){
				this.zucheTime()
			}
			this.paybuy()
			this.guidePrice()
			this.carModellist()
			this.modelconfigurationvalue()
    },
    tab:function() {
			var _this = this;
			$("#sel_shop").on("click",function(){
				if(itemType==2){
						if(seledDatas.duration==undefined || seledDatas.duration=="" || seledDatas.duration==null){
							 common.showTip("租车时间没有选择")
							 return
						}
				}
				if(seledDatas.car_sku_id == undefined || seledDatas.car_sku_id == "" || seledDatas.car_sku_id==null){
					common.showTip("商品型号没有选择好")
					return
				}
				$("#J-shop").css("display","block");
			})
      $el.on("click",".J_SizeList li",function() {
        $(this).addClass("c").siblings().removeClass("c")
      })
      $el.on("click",".J_StyleList li",function() {
        $(this).addClass("c").siblings().removeClass("c")
      })
			$el.on("click",".J-buybtn",function() {
				if(shopdata.itemid==""){
					 common.showTip("门店没有选择")
					 return
				}
				 _this.createOrderQuery()
			})
			$el.on("click",".sku-list li",function() {
				var index = $(this).data("index")
				selectsku[index] = $(this).data("id")
				if($(this).hasClass("c")){
					  selectsku[index] = ""
					  $(this).removeClass("c")
				}else {
					$(this).addClass("c").siblings().removeClass("c")
				}
				if($(this).data("img")){
					  seledDatas.pic= $(this).data("img");
						$("#J_itemmaskimg").find("img").attr("src",$(this).data("img"))
				}
				if($(".sku-list .c").length ==skudata.length){
					_this.matchsku()
				}
				_this.rentalPrice()
      })
			$el.on("click",".J-buybtn",function () {
      	  if($(".sku-list .c").length ==skudata.length){
 				}else {
 					common.showTip("商品型号还没有好")
 					return
 				}
      })
			$el.on("click",".J-yubtn",function () {

      })
			$el.on("click",".item-prev",function () {
					if(itemindexnum>0){
						 	itemindexnum = itemindexnum - 1
							$("#J-itemsortimg").find("ul").css({"margin-left":"-"+itemindexnum*76+"px"})
					}
			})
			$el.on("click",".item-next",function () {
					if(itemImgDatas.length-6>itemindexnum){
						 	itemindexnum = itemindexnum + 1
							$("#J-itemsortimg").find("ul").css({"margin-left":"-"+itemindexnum*76+"px"})
					}
			})
			$el.on("click",".d-bottom a",function () {
				 $(this).addClass("bgc").siblings().removeClass("bgc")
				 $(".d-bottom-info >div").hide()
				 $(".d-bottom-info >div").eq($(this).index()).show()
			})
    },
		//获取指导价
		guidePrice:function () {
			common.loginAjax({
						url:common.rootUrl+"/car_model/getOne",
						param:{
							id:carModelID
						},
						type:"get",
						success:function (e) {
					  if(e.codeId === 1){
							guidedata = e.resData
							if(itemType==2){
								 $("#J-itemprice").html("￥"+guidedata.guidePrice+"元")
							}else if(itemType==1){
								 $("#J-itemprice").html("￥"+guidedata.guidePrice+"元")
							}
						}
					}
			})
		},
		//租车时间
		zucheTime:function () {
			var _this = this;
			common.loginAjax({
						url:common.rootUrl+"/user_rental_duration/list",
						param:{
						},
						type:"get",
						success:function (e) {
					if(e.codeId === 1){
							 zuchedata = e.resData
							 var str = '<dl class=""><dt>租赁期限</dt><dd><ol class="J_timeList time-list clearfix">'
							 zuchedata.forEach(function (a) {
								 str += '<li data-num="'+a.duration+'">'+a.name+'</li>'
							 })
							 str +='</ol></dd></dl>'
							 $("#J-zucheTime").html(str)
							 $el.on("click",".J_timeList li",function (b) {
									seledDatas.duration = $(this).data("num")
									$(this).addClass("c").siblings().removeClass("c")
									_this.rentalPrice()
							 })
						}
					}
			})
		},
	  matchsku:function() {
			var _this = this
	  	 var strsku = ""
				for(var i = 0 ; i<selectsku.length;i++){
					if(i==selectsku.length-1){
							strsku +=selectsku[i]
					}else{
						strsku +=selectsku[i]+";"
					}
				}
				var idx = 0
				skulistdata.forEach(function(a) {
					 if(a.skuIdCombination == strsku){
						 seledDatas.car_sku_id = a.id
						 idx = 1
					 }
				})
			  if(idx==1){
			 	 	_this.paybuy()
				}else {
					_this.nopaybuy()
				}
	  },
		//立即购买
		paybuy:function () {
			var str = ""
			if(itemType==2){
				str = '<a href="javascript:void(0)" class="paybtn buy-btn J-buybtn">租赁车辆</a>'
			}else if(itemType==3){
				str = '<a href="javascript:void(0)" class="paybtn buy-btn J-buybtn">预购车辆</a>'
			}else {
				str = '<a href="javascript:void(0)" class="paybtn buy-btn J-buybtn">购买车辆</a>'
			}
			// str += '<a href="javascript:void(0)" class="paybtn buy-btn J-yubtn ml10">预约车辆</a>'
			$(".J-itembtn").html(str)
		  $(".J-showsku").html("")
		},
		nopaybuy:function () {
			if(itemType!=3){
				var str = '<a href="javascript:void(0)" class="paybtn buy-btn no-btn">暂无购买</a>'
				$(".J-itembtn").html(str)
				$(".J-showsku").html("商品属性没有配对上")
			}
		},
		//商品详情数据
		itemviewhtml:function () {
			var _this = this;
			common.loginAjax({
						url:common.rootUrl+"/item/getOne",
						param:{
							id:itemID
						},
						type:"get",
						success:function (e) {
					if(e.codeId === 1){
							 itemDetailData = e.resData
							 	seledDatas.subscription = itemDetailData.subscription || ""
								seledDatas.cashDeposit = itemDetailData.cashDeposit || ""
							 $(".item-title h1").html(" "+itemDetailData.brandName+" "+" "+itemDetailData.modelName+" "+itemDetailData.name)
							 $("#intro_info").html(itemDetailData.prop)
							 $("#J-itembrief").html(itemDetailData.brief)
							 if(itemType==3){
								 	$("#J-itemprice").html("￥"+itemDetailData.subscription+"元")
							 }
							 if(itemType==1){
								 	$("#J-itemprice").html("￥"+itemDetailData.cashDeposit+"元")
							 }
						}
					}
			})
		},
		//商品详情数据
		itemimglist:function () {
			var _this = this;
			common.loginAjax({
						url:common.rootUrl+"/item_image/list/by_itemId",
						param:{
							itemId:itemID
						},
						type:"get",
						success:function (e) {
					if(e.codeId === 1){
							 itemImgDatas = e.resData
							 _this.itemimghtml()
							 $("#J_itemmaskimg").find("img").attr("src",itemImgDatas[0].url)
						}
					}
			})
		},
		itemimghtml:function () {
				var str = ""
				if(itemImgDatas.length>0){
					itemImgDatas.forEach(function (a) {
						str += '<li style="background:url('+a.url+') center center no-repeat;background-size:60px 60px;" data-img="'+a.url+'"></li>'
					})
					var itemwidth = 0
					if(itemImgDatas.length*66>500){
						itemwidth = itemImgDatas.length*66
					}else{
						itemwidth = 500
					}
					$("#J-itemsortimg ul").html(str)
					$("#J-itemsortimg ul").css({width:+"px"})
					$el.on("click","#J-itemsortimg ul li",function () {
						 $(this).addClass("c").siblings().removeClass("c")
						 $("#J_itemmaskimg").find("img").attr("src",$(this).data("img"))
					})
				}
		},
		//商品sku
		skulist:function () {
			var _this = this;
			common.loginAjax({
						url:common.rootUrl+"/sku_meta_property/getByModelId",
						param:{
							modelId:carModelID
						},
						type:"get",
						success:function (e) {
					if(e.codeId === 1){
							 skudata = e.resData
							 _this.skulisthtml()
					  }
				  }
		  })
		},
		skulisthtml:function() {
				var str = ""
				skudata.forEach(function (a,index) {
					 if(a.valueDoList!=null && a.valueDoList.length>0){
						 str +='<dl class="">'
						 str +='<dt>'+a.name+'</dt>'
						 str +='<dd>'
						 if(a.name=="颜色"){
							 str+='<ol class="color-list clearfix sku-list">'
							 a.valueDoList.forEach(function(b) {
								 str+='<li class="img" data-id="'+a.id+':'+b.id+'" data-index="'+index+'" data-img="'+b.url+'"><img src="'+b.url+'"><b></b></li>'
							})
							str+='</ol>'
						 }else{
							 str+='<ol class="clearfix sku-list">'
							a.valueDoList.forEach(function(b) {
								str+='<li data-id="'+a.id+':'+b.id+'" data-index="'+index+'">'+b.value+'</li>'
						 })
						 str+='</ol>'
						 }
					 }
					 str +='</dd>'
					 str +='</dl>'
				})
				$("#J-itemsku").html(str)
		},
		//生成sku
		ceartedsku:function () {
			common.loginAjax({
						url:common.rootUrl+"/car_sku/list/by_carModelId",
						param:{
							carModelId:carModelID,
						},
						type:"get",
						success:function (e) {
							// console.log(e);
						if(e.codeId === 1){
							skulistdata = e.resData
					  }
					}
			 })
		},
    //数量
    itemnum:function() {
        var itemnum = $el.find(".J_itemnum");
        var num = $el.find(".J_itemnum").val()
        $el.find(".itemnum-min").click(function () {
           if(parseInt(num)>1){
             num = parseInt($el.find(".J_itemnum").val()) -1
             $el.find(".J_itemnum").val(num)
						 seledDatas.quantity = num
           }else if(parseInt(num)==1){
             common.showTip("数量不能再少了")
           }
        })
				$el.find(".itemnum-plus").click(function () {
					num = parseInt($el.find(".J_itemnum").val()) +1
					$el.find(".J_itemnum").val(num)
					seledDatas.quantity = num
        })
        $el.find(".J_itemnum").blur(function () {
					num = $(this).val()
					seledDatas.quantity = num
				})
				seledDatas.quantity = num
    },
		// 获取价格
		rentalPrice:function(){
			var _this = this;
			if ($("#sel_shop").attr("data-storeid")) {
				seledDatas.dealer_storefront_id=$(document).find($("#sel_shop")).attr("data-storeid")
				seledDatas.cashDeposit=itemDetailData.cashDeposit
				if (common.getUrlParam("itemType")==2) {
					if (seledDatas.car_sku_id&&seledDatas.quantity&&seledDatas.duration){
						var cityCode=$("#sel_shop").attr("data-code");
						var arr=cityCode.split(",");
						common.loginAjax({
									url:common.rootUrl+"/user_rental_price/list",
									param:{
										carSkuId:seledDatas.car_sku_id,
										provinceCode:arr[0],
										cityCode:arr[1],
										duration:seledDatas.duration
									},
									type:"get",
									success:function (e) {
								if(e.codeId === 1){
										var price=e.resData;
										$("#J-itemprice").text('￥'+price[0].price+"元")
									  seledDatas.price=price[0].price
										cardview.paybuy()
							  }else if(e.codeId==-9){
 										var price = "";
										$("#J-itemprice").html("暂无价格")
 									  seledDatas.price = price.price
										cardview.nopaybuy()
 							  }
						  }
					 })
					}
				}else if(common.getUrlParam("itemType")==1 || common.getUrlParam("itemType")==3){
					if (seledDatas.car_sku_id&&seledDatas.quantity){
						var dealerId=$("#sel_shop").attr("data-dealerId");
						// var arr=cityCode.split(",");
						common.loginAjax({
									url:common.rootUrl+"/user_purchase_price/getByCarSkuIdAndDealerId",
									param:{
										carSkuId:seledDatas.car_sku_id,
										dealerId:dealerId
									},
									type:"get",
									success:function (e) {
									if(e.codeId === 1){
									 	 seledDatas.price = e.resData.price
										 if(itemType==1){
											 	$("#J-itemprice").html('￥'+seledDatas.price+"元")
										 }
										 cardview.paybuy()
									  }else if(e.codeId==-9){
											if(itemType==1){
 											 	$("#J-itemprice").html("暂无价格")
 										 }
										  cardview.nopaybuy()
										}
								  }
				     })
				  }
				}
			}
		},
		//车辆型号对应参数
		carModellist () {
			var _this = this
			common.loginAjax({
						url:common.rootUrl+"/model_configuration_property/getAllList",
						param:{
						},
						type:"get",
						success:function (e) {
						if(e.codeId === 1){
							carconfigdata = e.resData
							var str = '<ul>	<li><div class="">型号</div>	</li>'
									carconfigdata.forEach(function (item) {
									 	str += '<li><div class="">'+item.name+'</div>'
										item.secondList.forEach(function (itemlist) {
											str+='<p title="'+itemlist.name+'">'+itemlist.name+'</p>'
										})
										str+='</li>'
									})
									str+='</ul>'
									$("#J-cardmodle").html(str)
							_this.modelconfigurationvalue()
					  }
				  }
			 })
		},
		modelconfigurationvalue () {
			var _this = this
			common.loginAjax({
						url:common.rootUrl+"/model_configuration_value/getByCarModelId",
						param:{
							carModelId:common.getUrlParam("carModelID")
						},
						type:"get",
						success:function (e) {
						if(e.codeId === 1){
							var str = e.resData
						      modelconfigurationvaluedata = _this.returnvalue(str)
							_this.modelconfightml()
					  }
				  }
			 })
		},
		modelconfightml () {
			 var str = ''
			  modelconfigurationvaluedata.forEach(function (item) {
				 str+='<div class="w280 fl carconfiglist"><ul><li><div class="">'+item.name+'</div></li>'
				 item.valueDoList.forEach(function (itemlist) {
					 str += '<li><div class=""></div>'
					 itemlist.valueDoList.forEach(function (itemlists) {
						 str+='<p title="'+itemlists.value+'">'+itemlists.value+'</p>'
					 })
					 str+='</li>'
				 })
				 str+=' </ul></div>'
			 })
		   $("#J-cardmodlelist").html(str)
		},
		//批量处理对应车辆参数值
		returnvalue (str) {
			var _this = this;
			var reset = [];
			str.forEach(function (a) {
					var newitem = {
						name:a.name,
						id:a.id,
						carModelId:a.carModelId,
						carModelName:a.carModelName,
						valueDoList:[]
					}
					if(a.valueDoList.length>0){
							newitem.show = 1
					}else {
							newitem.show = 0
					}
					newitem.valueDoList = _this.itemvalue(a)
					reset.push(newitem)
			})
			return reset
		},
		itemvalue (item) {
			var reset = []
			var _this = this
			 carconfigdata.forEach(function (a) {
					var newitem = {
						 name:a.name,
						 id:a.id,
						 valueDoList:[]
					}
					if(a.secondList.length>0){
						a.secondList.forEach(function (b) {
							var newstr = {
									propertyId:b.id,
									value:""
							}
							item.valueDoList.forEach(function (c) {
									if(b.id == c.modelConfigurationPropertyId){
										newstr.value = c.value
									}
							})
							newitem.valueDoList.push(newstr)
						})
					}
					reset.push(newitem)
			 })
			 return reset
		},
		// 下单请求
		createOrderQuery:function(){
			var _this=this;
			if ($("#sel_shop").attr("data-storeid")) {
				seledDatas.dealer_storefront_id=$("#sel_shop").attr("data-storeid")
			}else{
				common.showTip("请选择你想要的商品信息!")
				return
			}
			if (seledDatas.car_sku_id&&seledDatas.quantity){
				if (common.cookie("token")) {
					seledDatas.item_id=common.getUrlParam("itemID");
					seledDatas.itemName = itemDetailData.name;
					seledDatas.token=common.cookie("token");
					seledDatas.cashDeposit = itemDetailData.cashDeposit
					//存储到session里,给与确认订单使用
					var data = {
						type:"",
						data:{
							seledDatas:seledDatas
						}
					}
					common.setStorage(data)
					window.location.href="/order/order.html"
					common.getStorage(data,"session")
				}else{
					common.showlogin();
				}
			}else{
				common.showTip("请选择你想要的商品信息!")
				return
			}
		}
  }
  cardview.init()
	window.rentalPrice = cardview.rentalPrice
})
