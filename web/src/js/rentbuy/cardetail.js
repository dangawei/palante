define(function(require,exports,module){
	var common = require("common");
	var selshop=require("selshop");
	// 商品详情数据信息
	var itemDetailData={};
	// 商品图片
	var itemImgDatas=[];
	// sku属性数据
	var skuDatas=[];
	// sku属性组合数据
	var skugroup="";
	// sku属性组合id
	var skuId;
	var skudata = []
	/* itemType的值:
		1:购买
		2:租赁
		3:预购
	*/
	// 选择数据
	var seledDatas={
		token:common.cookie("token") || '',
		dealer_storefront_id:'',
		item_id:common.getUrlParam("itemId") || '',
		car_sku_id:'',
		quantity:'',
		order_type:'',
		duration:'',
		pick_up_date:'',
		remark:'',
		price:'',
		itemType:common.getUrlParam("itemType") || '',
		seldatas:[]
	};
	var cardetail={
		init:function(){
			var _this=this;
			// 获取商品详情信息数据
			this.infoDetail();
			// 获取商品详情图片
			this.itemImg();
			// 详情信息创建html
			this.infoDetailCreate();
			this.GetSku();
			var goodsNUm=1;
			seledDatas.quantity=$("#goods_value").val()
			// 数量的加减
			$("#num_reduce").on("click",function(){
				if (goodsNUm<=1) {
					$(this).css({
						"pointer-events": "none",
						"color":"#999"
					});
					goodsNUm=1;
				}else{
					goodsNUm--;
					$("#goods_value").val(goodsNUm);
				}
				seledDatas.quantity=$("#goods_value").val()
			});
			$("#num_add").on("click",function(){
				$("#num_reduce").css({
					"color":"#000",
					"pointer-events": "auto",
				});
				goodsNUm++;
				$("#goods_value").val(goodsNUm);
				seledDatas.quantity=$("#goods_value").val();
			})
			$("#sel_shop").on("click",function(){
				$("#J-shop").css("display","block");
			})
			this.GetParam();
			setTimeout(function(){
				_this.infoClick();
			},300)
			// 获取租车事件
			this.rentDuration();
			// _this.createOrder();
			$(".disabled").click(function (event) {
         event.preventDefault();
      })
		},
		// 获取商品详情数据信息
		infoDetail:function(){
			var _this=this;
			common.loginAjax({
				url:common.rootUrl+"/item/getOne",
				param:{
		        	id:common.getUrlParam("itemId")
		        },
		        type:"get",
		        success:function(e){
		        	if (e.codeId===1) {
		        		itemDetailData=e.resData;
		        		$("#J-itemdetailtitle").text(itemDetailData.name)
		        		$("#dt_deposit").text('￥'+itemDetailData.cashDeposit+"元");
		        		$("#intro_info").html(itemDetailData.prop);
		        	}
		        }
			})
		},
		// 获取商品图片
		itemImg:function(){
			var _this=this;
			common.loginAjax({
		        url:common.rootUrl+"/item_image/list/by_itemId",
		        param:{
		        	itemId:common.getUrlParam("itemId")
		        },
		        type:"get",
		        success:function (e) {
		          if(e.codeId == 1){
					_this.itemImgDatas=e.resData;
					var content='';
					var contentGig='';
					_this.itemImgDatas.forEach(function(val,index){
						// console.log($(this).index());
						if (index==0) {
							content+='<li class="js-hover onimg" data-role="thumb" data-hover="'+val.id+'" data-click=""><span class="green-border"></span><img src="'+val.url+'"></li>';
							contentGig+='<li class="js-bigpic" data-role="img" data-index="'+val.id+'" style="display: list-item;"><img data-src="'+val.url+'" data-gzlog="tracking_type=click&amp;eventid=0220050000099001" src="'+val.url+'"></li>';
						}else{
							content+='<li class="js-hover" data-role="thumb" data-hover="'+val.id+'" data-click=""><span class="green-border"></span><img src="'+val.url+'"></li>';
							contentGig+='<li class="js-bigpic" data-role="img" data-index="'+val.id+'" style="display: none;"><img data-src="'+val.url+'" data-gzlog="tracking_type=click&amp;eventid=0220050000099001" src="'+val.url+'"></li>';
						}
				  	})
	          }
	          $("#dt_small_img").html(content);
	          $("#dt_img_big").html(contentGig);
	          _this.smallImgClick();
	        }
		    })
		},
		// 图片点击事件
		smallImgClick:function(){
			var _this=this;
			var imgNum=Math.ceil(_this.itemImgDatas.length/5);
			$("[data-role='tabImgGroup'] li").on({
				mouseenter:function(val){
					// console.log($(this).index());
					$(this).addClass("onimg");
					$(this).siblings().removeClass("onimg");
					$("[data-index='"+$(this).attr("data-hover")+"']").css("display","list-item").siblings().css("display","none");
				}
			});
			var numLeft=0;
			// 限流
			var aniBool=true;
			$("#a_left").on("click",function(){
				if (aniBool) {
					aniBool=false;
					if (numLeft>0) {
						numLeft--;
						$("#smallimg_box ul").css("margin-left",numLeft*(-450))
					}else{
						numLeft=0;
					}
					aniBool=true;
				}
			});
			$("#a_right").on("click",function(){
				if (aniBool) {
					aniBool=false;
					numLeft++;
					if (numLeft<imgNum) {
						$("#smallimg_box ul").css("margin-left",numLeft*(-450))
					}else{
						numLeft=imgNum-1;
					}
					aniBool=true;
				}
			});
		},
		// 获取sku属性
		GetSku:function(){
			var _this=this;
			common.loginAjax({
		        url:common.rootUrl+"/sku_meta_property/getByModelId",
		        param:{
		        	modelId:common.getUrlParam("carModelId")
		        },
		        type:"get",
		        success:function (e) {
					if(e.codeId === 1){
							_this.skuDatas=e.resData;
							_this.GetSkuhtml()
				   }
		     }
		  })
		},
		GetSkuhtml:function () {
			var _this = this;
			$("#item_sku").html("");
			var content='';
			_this.skuDatas.forEach(function(val){
				var skuItem = val.valueDoList;
				var Li='';
				if (skuItem.length>0 && skuItem!=null && skuItem!=undefined) {
					skuItem.forEach(function(obj){
						Li+='<li data-sku-group='+val.id+':'+obj.id+' data-proname='+val.name+'>'+obj.value+'</li>'
				 	});
					content='<dl><dt>'+val.name+'</dt><dd><ol class="J_SizeList size-list seled-parent">'+Li+'</ol></dd></dl>';
					$("#item_sku").append(content);
				}
			})
			_this.skuSel();
		},
		// 详情信息创建html
		infoDetailCreate:function(){
			var modelinfo='<span id="J-itemdetailtitle"></span>'
			$("#h2").html(modelinfo);
			/* itemType的值:
				1:购买
				2:租赁
				3:预购
			*/
			if (common.getUrlParam("itemType")==1) {
				$("#dt_rmb").text('￥'+0+"元");
				$("#rent_duration_parent").css("display","none")
				$("#buy_carBtn").css("display","block").siblings().css("display","none")
			}else if (common.getUrlParam("itemType")==2) {
				$("#dt_pricermb").css("display","none")
				// $("#dt_deposit").text('￥'+itemDetailData.cashDeposit+"元")
				$("#cash_deposit").css("display","block");
				$("#rent_duration_parent").css("display","block")
				$("#rent_carBtn").css("display","block").siblings().css("display","none")
			}else{
				$("#dt_pricermb").css("display","none")
				$("#rent_duration_parent").css("display","none")
				$("#prerent_carBtn").css("display","block").siblings().css("display","none")
				$("#prebuy_carBtn").css("display","block").siblings().css("display","none")
			}
		},
		// 获取参数信息
		GetParam:function(){
			$("#intro_info_btn").on("click",function(){
				$(this).addClass("bgc").parent().siblings().children().removeClass("bgc");
				$("#intro_info").css("display","block")
				$("#config_param").css("display","none")
			});
			$("#config_param_btn").on("click",function(){
				$(this).addClass("bgc").parent().siblings().children().removeClass("bgc");
				$("#config_param").css("display","block");
				$("#intro_info").css("display","none")
			})
		},
		// 所有信息点击事件
		infoClick:function(){
			var _this=this;
			// $("ol li").on("click",function(){
			// 	$(this).css("border-color","#6F86D6").addClass('seled');
			// 	$(this).siblings().css("border-color","#ddd").removeClass('seled');
			// });
			$("#sel_shop").on("click",function(){
				$("#shop").css("display","block");
			});
			$("#rent_carBtn").on("click",function(){
				_this.createOrderRent()
			});
			$("#buy_carBtn").on("click",function(){
				_this.createOrderBuy()
			});
			$("#prebuy_carBtn").on("click",function(){
				_this.createOrderPre()
			})
		},
		// sku点击事件
		skuSel:function(){
			var _this=this;
			$("#item_sku li").on("click",function(){
				$(this).css("border-color","#6F86D6").addClass('seled');
				$(this).siblings().css("border-color","#ddd").removeClass('seled');
				var i=1
				seledDatas.seldatas=[];
				$("#item_sku").find("li.seled").each(function(index){
					var self=this;
					seledDatas.seldatas.push({
						skuMetaPropertyName:$(self).attr("data-proname"),
						value:$(self).text()
					})
					if (index==0) {
						_this.skugroup=$(self).attr("data-sku-group")
					}else{
						_this.skugroup+=";"+$(self).attr("data-sku-group")
					}
				})
				// seledDatas.car_sku_id=$(this).attr("data-sku")
				if(skudata.length>0){
					skudata.forEach(function(val){
						if (val.skuIdCombination==_this.skugroup) {
							seledDatas.car_sku_id=val.id;
							seledDatas.pic=val.pic;
							rentalPrice();
						}
					})
				}else{
					common.loginAjax({
								url:common.rootUrl+"/car_sku/list/by_carModelId",
								param:{
									carModelId:common.getUrlParam("carModelId")
								},
								type:"get",
								success:function (e) {
							if(e.codeId === 1){
								skudata = e.resData;
								skudata.forEach(function(val){
									if (val.skuIdCombination==_this.skugroup) {
										seledDatas.car_sku_id=val.id;
										seledDatas.pic=val.pic;
										rentalPrice();
									}
								})
							}
						}
					})
				}
			})
		},
		// 租车时间点击
		rentDuration:function(){
			var _this=this;
			$("#rent_duration li").on("click",function(){
				$(this).css("border-color","#6F86D6").addClass('seled');
				$(this).siblings().css("border-color","#ddd").removeClass('seled');
				seledDatas.duration=$(this).attr("data-duration")
			})
		},
		// 获取价格
		rentalPrice:function(){
			var _this=this;
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
									$("#dt_rmb").text('￥'+price[0].price+"元")
									$("#dt_pricermb").css("display","block")
									seledDatas.price=price[0].price
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
					        	// console.log(e);
								if(e.codeId === 1){
									var price=e.resData;
									$("#dt_rmb").text('￥'+price.price+"元")
									$("#dt_pricermb").css("display","block")
								  	seledDatas.price=price.price
							    	}
					        }
					    })
					}
				}

			}
		},
		// 租车下单
		createOrderRent:function(){
			var _this=this;
			if ($("#sel_shop").attr("data-storeid")) {
				seledDatas.dealer_storefront_id=$("#sel_shop").attr("data-storeid")
			}else{
				common.showTip("请选择门店")
				return
			}
			if (seledDatas.car_sku_id&&seledDatas.quantity&&seledDatas.duration){
				if (common.cookie("token")) {
					seledDatas.item_id=common.getUrlParam("itemId");
					seledDatas.token=common.cookie("token");
					seledDatas.cashDeposit=common.cookie("token");
					seledDatas.itemName=$("#J-itemdetailtitle").text();
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
				}else{
					common.showlogin();
				}
			}else{
				common.showTip("请选择完整你想要的商品信息!")
				// alert("请选择你想要的商品信息!")
			}

		},
		// 购买订单
		createOrderBuy:function(){
			this.createOrderQuery();
		},
		createOrderPre:function(){
			this.createOrderQuery();
		},
		// 下单请求
		createOrderQuery:function(){
			var _this=this;
			if ($("#sel_shop").attr("data-storeid")) {
				seledDatas.dealer_storefront_id=$("#sel_shop").attr("data-storeid")
			}else{
				common.showTip("请选择取货门店!")
				return
			}
			if (seledDatas.car_sku_id&&seledDatas.quantity){
				if (common.cookie("token")) {
					seledDatas.item_id=common.getUrlParam("itemId");
					seledDatas.itemName=$("#J-itemdetailtitle").text();
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
				common.showTip("请选择完整你想要的商品信息!")
				return
			}
		}
	}
	cardetail.init();
	window.rentalPrice = cardetail.rentalPrice
})
