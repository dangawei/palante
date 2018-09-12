define(function(require,exports,module){
	var common = require("common");
	// 品牌数据
	brandDatas=[];
	// 型号数据
	modelDatas=[];
	// 型号分类数据
	categoryDatas=[];
	// 商品数据
	goodsDatas=[];
	// 分页数据
	pageDatas={
        totalCount:1,
        pageNo:1,
        pageSize:12,
        totalPage:12
	};
	// 详情类型
	var itemtype=1;
	// url解析
	var re = /([^&=]+)=?([^&]*)/g,
		decodeRE = /\+/g,
		decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };
	// 解析的路径数据
	var pathDatas={};
	//  复制解析路径
	var CopypathDatas={};
	/* itemType的值:
		1:租赁
		2:购买
		3:预购
	*/
	var urlDatas={
		brandId:common.getUrlParam("brandId") || "",
		carModelId:common.getUrlParam("carModelId") || "",
		carModelCategoryId:common.getUrlParam("carModelCategoryId") || "",
		itemType:common.getUrlParam("itemType") || 1,
		modelSeating:common.getUrlParam("modelSeating") || "",
		sort:common.getUrlParam("sort") || "",
		itemId:common.getUrlParam("itemId") || "",
		name:common.getUrlParam("name") || ""
	}
	var rentcar={
		//url参数
		url:function () {
           	//var str ='+"&carModelId="+urlDatas.carModelId
		    var str = "?brandId="+urlDatas.brandId;
			if(urlDatas.carModelId){
				 str +="&carModelId="+urlDatas.carModelId
			}
			if(urlDatas.carModelCategoryId){
				 str +="&carModelCategoryId="+urlDatas.carModelCategoryId
			}
			if(urlDatas.itemType){
				 str +="&itemType="+urlDatas.itemType
			}
			if(urlDatas.modelSeating){
				 str +="&modelSeating="+urlDatas.modelSeating
			}
			if(urlDatas.itemId){
				 str +="&itemId="+urlDatas.itemId
			}
			window.location.href = str

		},
		init:function(){
			var _this=this;
			// this.pathDatas=JSON.parse(JSON.stringify(common.getUrlParam(window.location.href)));
			// this.CopypathDatas=JSON.parse(JSON.stringify(this.pathDatas));
			_this.clickEvent();
			// 获取品牌
			_this.GetBrand();
		    _this.getmodel();
		    _this.GetModelCategory();
		    // 获取商品
		    _this.GetCommodity();
		    _this.GetItemType();
		},
		//获取品牌
		GetBrand:function(){
			var _this=this;
			$.ajax({
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				//提交数据的类型 POST GET
				type:"GET",
				//提交的网址
				url:common.rootUrl + "/brand/findList",
				//提交的数据
				data:'',
				//返回数据的格式
				datatype: 'json',   //"xml", "html", "script", "json", "jsonp", "text".
				//在请求之前调用的函数
				beforeSend:function(data){

				},
				//成功返回之后调用的函数
				success:function(remoteData){
					if(remoteData.codeId==1){
						_this.brandDatas=remoteData.resData;
						if (urlDatas.brandId) {
							var selUlData = '<li><a class="no-id" data-brandid="">不限</a></li>';
							for (var i = 0; i < 5; i++) {
								if (urlDatas.brandId==_this.brandDatas[i].id) {
									selUlData+='<li><a data-brandid="'+_this.brandDatas[i].id+'" class="selecttype">'+_this.brandDatas[i].brandName+'</a></li>'
								}else{
									selUlData+='<li><a data-brandid="'+_this.brandDatas[i].id+'">'+_this.brandDatas[i].brandName+'</a></li>'
								}
							}
						}else{
							var selUlData = '<li><a class="selecttype no-id" data-brandid="">不限</a></li>';
							// selUlData+='<li><a data-brandid="'+_this.brandDatas[i].id+'">'+_this.brandDatas[i].brandName+'</a></li>'
							for (var i = 0; i < 5; i++) {
								selUlData+='<li><a data-brandid="'+_this.brandDatas[i].id+'">'+_this.brandDatas[i].brandName+'</a></li>'
							}
						}
						_this.brandDatas.forEach(function(val,index){
							var content='<li><a data-brandid="'+val.id+'">'+val.brandName+'</a></li>';
							$("#drap_ul").append(content);
						})
						setTimeout(function(){
							$("#sel_ul").html(selUlData);
							_this.changeBrandName();
						},10)
					}else{
					  	common.showcodeId(remoteData.codeId,remoteData.codeDes)
					}
					return
				},
				//调用出错执行的函数
				error: function(){

				}
    		});

		},
		clickEvent:function(){
			var _this=this;
			$("#drap_down").on("click",function(val){
				$("#sel_display").toggle();
			});
		},
		// 品牌点击事件
		changeBrandName:function(){
			var _this=this;
			$("#sel_ul a").on("click",function(val){
				urlDatas.brandId=$(this).attr("data-brandid");
				urlDatas.carModelId='';
				_this.url();

			})
		},
		// 获取型号
		getmodel:function(){
			var _this=this;
			common.loginAjax({
		        url:common.rootUrl+"/car_model/list",
		        param:{
		        	brandId:urlDatas.brandId
		        },
		        type:"get",
		        success:function (e) {
		          	if(e.codeId == 1){
		          		this.carModelDatas=e.resData;
		          		var self=this;
		          		if (urlDatas.brandId) {
			          		if (urlDatas.carModelId) {
								var content = '<li><a class="no-id" data-modelid="">不限</a></li>';
								this.carModelDatas.forEach(function(val){
									if (urlDatas.carModelId==val.id) {
				          				content+='<li><a class="selecttype">'+val.modelName+'</a></li>';
				          			}else{
				          				content+='<li><a data-modelid="'+val.id+'">'+val.modelName+'</a></li>';
				          			}
								})
							}else{
								var content = '<li><a class="selecttype no-id" data-modelid="">不限</a></li>'
								this.carModelDatas.forEach(function(val){
				          			content+='<li><a data-modelid="'+val.id+'">'+val.modelName+'</a></li>';
								})
							}
		          		}else{
		          			if (urlDatas.carModelId) {
		          				var content = '<li><a class="no-id" data-modelid="">不限</a></li>';

		          			}else{
		          				var content = '<li><a class="selecttype no-id" data-modelid="">不限</a></li>'
		          			}
		          			for (var i = 0; i < 5; i++) {
		          				if (urlDatas.carModelId==this.carModelDatas[i].id) {
			          				content+='<li><a class="selecttype">'+this.carModelDatas[i].modelName+'</a></li>';
			          			}else{
			          				content+='<li><a data-modelid="'+this.carModelDatas[i].id+'">'+this.carModelDatas[i].modelName+'</a></li>';
			          			}
		          			}
		          		}
						$("#sel_ul_model").html(content);
						_this.modelChange();
		          	}
		        }
		    });
		},
		// 型号事件
		modelChange:function(){
			var _this=this;
			$("#sel_ul_model a").on("click",function(val){
				urlDatas.carModelId=$(this).attr("data-modelid");
				_this.url();

			})
		},
		// 获取型号分类
		GetModelCategory:function(){
			var _this=this;
			// 获取分类
    		common.loginAjax({
		        url:common.rootUrl+"/car_model_category/list",
		        param:"",
		        type:"get",
		        success:function (e) {
		          	if(e.codeId == 1){
		          		this.categoryDatas=e.resData;
		          		var self=this;
		          		if (urlDatas.carModelCategoryId) {
							var content = '<li><a class="no-id" data-carModelCategoryId="">不限</a></li>';

						}else{
							var content = '<li><a class="selecttype no-id" data-carModelCategoryId="">不限</a></li>'
						}
						this.categoryDatas.forEach(function(val,index){
							if (urlDatas.carModelCategoryId==val.id) {
		          				content+='<li><a data-carModelCategoryId="'+val.id+'" class="selecttype">'+val.categoryName+'</a></li>';
		          			}else{
		          				content+='<li><a data-carModelCategoryId="'+val.id+'">'+val.categoryName+'</a></li>';
		          			}
						})
						$("#sel_ul_category").html(content);
						_this.categoryChange();
		          	}
		        }
		    });
		},
		// 型号分类事件
		categoryChange:function(){
			var _this=this;
			$("#sel_ul_category a").on("click",function(val){
				urlDatas.carModelCategoryId=$(this).attr("data-carModelCategoryId");
				_this.url();

			})
		},
		// 获取租车购车商品
		GetCommodity:function(){
			var _this=this;
			if (urlDatas.itemType==2) {
				urlDatas.itemType=1
			}else if (urlDatas.itemType==3) {
				urlDatas.itemType=2;
			}
			var itemIndex=common.getUrlParam("itemType") || 2;
			common.loginAjax({
		        url:common.rootUrl+"/item/page",
		        param:{
		        	pageNo:pageDatas.pageNo,
		        	pageSize:pageDatas.pageSize,
		           	// brandId:urlDatas.brandId,
	           	carModelId:urlDatas.carModelId,
	           	carModelCategoryId:urlDatas.carModelCategoryId,
	           	itemType:urlDatas.itemType || 1,
	           	sort:urlDatas.sort || 1,
							name:urlDatas.name
		        },
		        type:"get",
		        success:function (e) {
		    if(e.codeId == 1){
					_this.goodsDatas=e.resData.list;
					pageDatas.totalCount=e.resData.totalCount
					pageDatas.totalPage=e.resData.totalPage;
					_this.page();
					var content='';
					if (common.getUrlParam("itemType")) {
						$("#item_type a").each(function(val){
							console.log($(this).attr("data-itemtype"));
							if (common.getUrlParam("itemType")==$(this).attr("data-itemtype")) {
								$(this).addClass("active");
								$(this).parent().siblings().children().removeClass("active");
							}
						})
					}else{
						$("#rent_car").addClass("active");
						$("#rent_car").parent().siblings().children().removeClass("active");
					}
					_this.goodsDatas.forEach(function(val){
						content += '<li><a title="'+val.name+'" class="cardetail" data-goodsid="'+val.id+'" data-href="?carModelID='+val.carModelId+'&itemID='+val.id+'&itemType='+itemIndex+'"><div class="item-li"><img src="'+val.modelPic+'"></div><h2 class="t">'+val.name+'</h2></a></li>';
					})
					$("#sel_ul_goods").html(content);
					$("#sel_ul_goods a").on("click",function(){
						$("#sel_ul_model a").removeClass("selecttype");
						$(this).addClass("selecttype");
					})
					_this.open();
		          }
		          //_this.bannerhtml()
		        }
		    })
		},
		// 租赁购类型点击事件
		GetItemType:function(){
			var _this=this;
			$("#item_type a").on("click",function(val){
				urlDatas.itemType=$(this).attr("data-itemtype");
				_this.url();
			});
			// 点击排序
			$("#a_sort").on("click",function(){
				if ($(this).attr("data-sort")==1) {
					$(this).attr("data-sort","2");
					$(this).html("从高到低排序")
					urlDatas.sort=2
					_this.GetCommodity();
				}else{
					$(this).attr("data-sort","1");
					$(this).html("从低到高排序")
					urlDatas.sort=1
					_this.GetCommodity();
				}

			})

		},
		page:function(){
			var _this=this;
			$('.M-box11').pagination({
			    mode: 'fixed',
			    pageCount:pageDatas.totalPage,
			    callback: function (api) {
			        pageDatas.pageNo=api.getCurrent();
			        _this.GetCommodity()
			    }
			});
		},
		// 点击进入详情页
		open:function(){
			$("#sel_ul_goods a").on("click",function(){
				window.location.href="/item/cardview.html"+$(this).attr("data-href");
			})
		}
	}
	rentcar.init();
})
