define(function(require,exports,module){
	var common = require("common");
	var distpickerData=require("distpickerData");
	var distpicker=require("distpicker");
	var mapPath=require("mapPath");
	var $el = $(document)
	var lnglats = [];
    var remoteDataArr=[];
    var cityDatas=[];
		var map;
	var dealersearch={
		init:function () {
		  map = new AMap.Map("container", {
						resizeEnable: true,
						zoom: 16
				});
			this.disPicker()
		},
		MapInit:function(e){
		    //地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
		    // addMarker();
				map = new AMap.Map("container", {
							resizeEnable: true,
							zoom: 16
					});
		    //实例化信息窗体

		    var infoWindow = new AMap.InfoWindow({
		        isCustom: true,  //使用自定义窗体
		        // content: createInfoWindow(title, content.join("<br/>")),
		        offset: new AMap.Pixel(16, -45)
		    });
        if(this.lnglats.length<1){
				  return
		 	 }
		    for (var i = 0, marker; i < this.lnglats.length; i++) {
		    	if (this.remoteDataArr==null||this.remoteDataArr=='') {
		    		var title = "杭州店",
			        content = [];

				    content.push("地址:杭州黄龙");
				    content.push("电话:0000000");
				    content.push("经理:张三");
		    	}else{
		    		var title = this.remoteDataArr[i].name,
			        content = [];
				    content.push("地址:"+this.remoteDataArr[i].address);
				    content.push("电话:"+this.remoteDataArr[i].principalsTelephone);
				    content.push("经理:"+this.remoteDataArr[i].principalsName);
		    	}

				var marker = new AMap.Marker({
					position: this.lnglats[i],
					map: map
				});
				// marker.on('click', markerClick);
				marker.content=createInfoWindow(title, content.join("<br/>"));
				marker.on('click', markerClick);
				var obj = e || null
				if(obj!=null && e[0]==this.lnglats[i][0] &&  e[1]==this.lnglats[i][1]){
					marker.emit('click', {target: marker});
				}
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
		},//MapInit
		disPicker:function(){
			$("#ds-distpicker").distpicker('destroy');
			$('#ds-distpicker').distpicker();
			var provinceCode='',cityCode='',districtCode='',cityName='';
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
								$("#city_text").remove();
								_this.remoteDataArr = remoteData.resData.list;
								_this.lnglats=[];
								var p=document.createElement('p');
				        		p.className='city-text';
				        		p.id='city_text';
				        		p.innerHTML=cityName+'附近有'+remoteData.resData.totalCount+'个店';
				        		$('#ds-distpicker').append(p);
				        		$('#c_wrap').remove();
							    	var wrap='<div class="c-wrap" id="c_wrap"><p>离你最近的店</p></div>'
							    	$("#ds-container").append(wrap);
							      for (var i = 0; i < _this.remoteDataArr.length; i++) {
							    	// console.log(_this.remoteDataArr);
							    	// console.log(_this.remoteDataArr[i].longitude);
							    	// console.log(_this.lnglats);
							    	var ll=[];
							    	ll.push(_this.remoteDataArr[i].longitude)
							    	ll.push(_this.remoteDataArr[i].latitude)
							    	_this.lnglats.push(ll)
							   		var content='<div class="c-item" data-li="'+JSON.stringify(ll)+'"><p class="title">'+remoteData.resData.list[i].name+'</p><p class="distance">1km</p><p class="address">'+remoteData.resData.list[i].address+'</p></div>';
							   		$("#c_wrap").append(content);
										$el.find(".c-item").off("click").click('.c-item',function () {
												var datalist = $(this).data("li")
												    _this.MapInit(datalist);
										})
							    }
							    setTimeout(function () {
										_this.MapInit();
									},300)
							}else{
							  	common.showcodeId(remoteData.codeId,remoteData.codeDes)
							}
							return
						},
						//调用出错执行的函数
						error: function(){

						}
	        		})
	        	}
			})
		}//dispicker

	}
	dealersearch.init();
	dealersearch.disPicker();
})
