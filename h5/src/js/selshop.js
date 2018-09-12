define(function(require,exports,module){
	var common = require("common");
	var distpickerData=require("distpickerData");
	var distpicker=require("distpicker");
	var mapPath=require("mapPath");
	var lnglats = [[120.152509, 30.284932]];
    var remoteDataArr=[];
    var cityDatas=[];
    // 省code
    var provinceCode=0;
    var cityCode=0;
    var districtCode=0;
    var selShop={
    	init:function(){
    		// 地图初始化
    		// this.mapInit();
    		this.disPicker();
    		this.close();
    		this.clickShop();
    		provinceCode=$("#province").find("option:selected").attr("data-code");
    		cityCode=$("#city").find("option:selected").attr("data-code");
    		districtCode=$("#district").find("option:selected").attr("data-code");
				cityDatas.push(provinceCode)
				cityDatas.push(cityCode)
				cityDatas.push(districtCode)
    		this.GetStore();
    	},
    	//点击关闭
    	close:function () {
    	  	var $el = $(document)
    	  	$el.on('click','#J-shopclose',function () {
    	   		$("#J-shop").css({"display":"none"})
    	  	})
					$el.on('click','#J_sure_colse',function () {
						$("#J-shop").css({"display":"none"})
					})
    	  	// $("#J-shop").on("click",function(){
    	  	// 	$("#this").css({"display":"none"})
    	  	// })
    	  //初始化门店数据

    	},
    	// 点击确定传值
    	sureClick:function(){

    	},
    	// 地图
    	mapInit:function(ls,ind){
    		var _this=this;
    		var map = new AMap.Map("container", {
		        resizeEnable: true,
		        zoom:13
		    });
		    //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
		    // addMarker();

		    //实例化信息窗体

		    var infoWindow = new AMap.InfoWindow({
		        isCustom: true,  //使用自定义窗体
		        // content: createInfoWindow(title, content.join("<br/>")),
		        offset: new AMap.Pixel(16, -45)
		    });


				if (ls.length>1) {
				 for (var i = 0, marker; i < _this.lnglats.length; i++) {
					 var title = this.remoteDataArr[i].name,
						 content = [];
						 content.push("地址:"+this.remoteDataArr[i].address);
						 content.push("电话:"+this.remoteDataArr[i].principalsTelephone);
						 content.push("经理:"+this.remoteDataArr[i].principalsName);
				 var marker = new AMap.Marker({
					 position: lnglats[i],
					 map: map
				 });
				 // marker.on('click', markerClick);
				 marker.content=createInfoWindow(title, content.join("<br/>"));
				 marker.on('click', markerClick);
				 marker.emit('click', {target: marker});
			 }
			 }else{
				 var title = this.remoteDataArr[ind].name,
					 content = [];
					 content.push("地址:"+this.remoteDataArr[ind].address);
					 content.push("电话:"+this.remoteDataArr[ind].principalsTelephone);
					 content.push("经理:"+this.remoteDataArr[ind].principalsName);
			 var marker = new AMap.Marker({
				 position: lnglats[ind],
				 map: map
			 });
			 marker.content=createInfoWindow(title, content.join("<br/>"));
			 marker.on('click', markerClick);
			 marker.emit('click', {target: marker});
			 }

		 function markerClick(e) {
			 infoWindow.setContent(e.target.content);
			 infoWindow.open(map, e.target.getPosition());
		 }
		 map.setFitView();

			 //构建自定义信息窗体
			 function createInfoWindow(title, content) {
					 var info = document.createElement("div");
					 info.className = "info";

					 //可以通过下面的方式修改自定义窗体的宽高
					 //info.style.width = "400px";
					 // 定义顶部标题
					 var top = document.createElement("div");
					 var titleD = document.createElement("div");
					 var closeX = document.createElement("img");

					 top.className = "info-top";
					 titleD.innerHTML = title;
					 closeX.src = "http://webapi.amap.com/images/close2.gif";
					 closeX.onclick = closeInfoWindow;

					 top.appendChild(titleD);
					 top.appendChild(closeX);
					 info.appendChild(top);

					 // 定义中部内容
					 var middle = document.createElement("div");
					 middle.className = "info-middle";
					 middle.style.backgroundColor = 'white';
					 middle.innerHTML = content;
					 info.appendChild(middle);

					 // 定义底部内容
					 var bottom = document.createElement("div");
					 bottom.className = "info-bottom";
					 bottom.style.position = 'relative';
					 bottom.style.top = '0px';
					 bottom.style.margin = '0 auto';
					 var sharp = document.createElement("img");
					 sharp.src = "http://webapi.amap.com/images/sharp.png";
					 bottom.appendChild(sharp);
					 info.appendChild(bottom);
					 return info;
			 }
			 //关闭信息窗体
			 function closeInfoWindow() {
					 map.clearInfoWindow();
			 }

    	},
    	// 省市区
    	disPicker:function(){
			$("#sm_distpicker").distpicker('destroy');
			$('#sm_distpicker').distpicker();
			provinceCode='',cityCode='',districtCode='',cityName='';
			$("#province").change(function(){
				if ($("#province").val()!='' && $("#city").val()!=null) {
					cityDatas=[];
					provinceCode=$("#province").find("option:selected").attr("data-code")
					cityDatas.push(provinceCode);
				}
			});
	        $("#city").change(function(e){
	        	if ($("#city").val()!='' && $("#city").val()!=null) {
	        		cityDatas=[];
							cityCode=$("#city").find("option:selected").attr("data-code")
							cityName=$("#city").val();
	        		cityDatas.push(provinceCode);
	        		cityDatas.push(cityCode);
	        	}
	        });
	        var _this=this;
	        $("#district").change(function(e){
	        	if ($("#district").val()!='' && $("#district").val()!=null) {
	        		cityDatas=[];
					    districtCode=$("#district").find("option:selected").attr("data-code")
	        		cityDatas.push(provinceCode);
	        		cityDatas.push(cityCode);
	        		cityDatas.push(districtCode);
	        		_this.GetStore();
	        	}
			})
		},//dispicker
		// 获取门店
		GetStore:function(){
			var _this=this;
			$.ajax({
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				//提交数据的类型 POST GET
				type:"GET",
				//提交的网址
				url:common.rootUrl + "/dealer_storefront/page",
				//提交的数据
				data:{
						pageNo:1,
						pageSize:10000,
						provinceCode:provinceCode,
						cityCode:cityCode
					},
				//返回数据的格式
				datatype: 'json',   //"xml", "html", "script", "json", "jsonp", "text".
				//在请求之前调用的函数
				beforeSend:function(data){

				},
				//成功返回之后调用的函数
				success:function(remoteData){
					if(remoteData.codeId==1){
						$("#left").html();
						_this.remoteDataArr=remoteData.resData.list;
						_this.lnglats=[];
						var content="";
						_this.remoteDataArr.forEach(function(val,index){
							var ll=[];
					    	ll.push(val.longitude)
					    	ll.push(val.latitude)
					    	_this.lnglats.push(ll)
					    	if (index==(_this.remoteDataArr.length-1)) {
					    		content+='<div class="store-item selected" data-itemId="'+val.id+'" data-itemName="'+val.name+'" data-dealerId="'+val.dealerId+'"><div class="store-info"><p class="store-name"><span class="name">'+val.name+'</span></p><p class="store-address">'+val.address+'</p><p>电话：'+val.principalsTelephone+'</p></div></div>'
					    	}else{
					    		content+='<div class="store-item" data-itemId="'+val.id+'" data-itemName="'+val.name+'" data-dealerId="'+val.dealerId+'"><div class="store-info"><p class="store-name"><span class="name">'+val.name+'</span></p><p class="store-address">'+val.address+'</p><p>电话：'+val.principalsTelephone+'</p></div></div>'
					    	}
						})
						$("#left").html(content);
					    _this.mapInit(_this.lnglats);
					   	_this.clickShop();
					}else{
					  	common.showcodeId(remoteData.codeId,remoteData.codeDes)
					}
					return
				},
				//调用出错执行的函数
				error: function(){

				}
			})
		},
		clickShop:function(){
			var _this=this;
			var $el = $(document);
			$("#left .store-item").on("click",function(){
				var selLng=[];
				selLng.push(_this.lnglats[$(this).index()])
				_this.mapInit(selLng,$(this).index());
				$(this).addClass("selected").siblings().removeClass("selected");
			});
			$el.on("click","#sure_sel",function(){
				var itemid=$("#left .selected").attr("data-itemId");
				var itemname=$("#left .selected").attr("data-itemName");
				var dealerid=$("#left .selected").attr("data-dealerId");
				shopdata.itemid = itemid
				shopdata.itemname = itemname
			  shopdata.dealerid = dealerid
				$("#sel_shop").html(itemname).attr({
					"data-storeId":itemid,
					"data-code":cityDatas,
					"data-dealerId":dealerid
				});
				//cardetail.cardetail.rentalPrice();
				rentalPrice()  //全局调用获取价格
				$("#J-shop").css({"display":"none"});
			})
		}
    };
    selShop.init();
})
