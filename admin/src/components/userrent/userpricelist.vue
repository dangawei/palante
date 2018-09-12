<template>
	<div id="aboutus" style="width:100%">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/car">车辆管理</BreadcrumbItem>
          <BreadcrumbItem :to="'/userskulist/'+this.$route.params.modelId">sku属性列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>{{skutitle}}用户租车价格列表</h2>
          </div>
      </div>
    </div>

    <div class="page-component-view">
      <div class="page-component-bd">
        <div class="tableListOperator">
          <!-- <Button type="primary"  @click="AddAreaPrice()">添加</Button> -->
        </div>

      	<Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
						<div class="" style="text-align:left;margin-bottom:20px">
							<span>批量定价:</span>
							<Select v-model="subform.duration" style="width: 200px">
							   <Option value="">全部</Option>
								 <Option v-for="item in zucheTimedata" :value="item.duration">{{ item.name }}</Option>
						 </Select>
						 <Input v-model="subform.price" placeholder="输入金额" style="width: 300px"></Input>
						 <span @click="allprice">
							 <Button type="success">批量定价</Button>
						 </span>
						</div>
            <div>
               <div class="tabitembox">
								 <div class="tabitem">区域</div>
								 <div class="tabitem">租车时间(单位:月)</div>
								 <div class="tabitem">价格(单位:元)</div>
               </div>
            </div>
						<div>
                <div class="itemlist" v-for="(item,index) in areaPriceListDatas">
                		<div class="itemhd" @click="openclick(item,index)">
											<div>{{item.cityName}}</div>
											<div style="padding-right:20px">
													<span v-if="!item.show" ><Button type="ghost">展开</Button></span>
													<span v-else ><Button type="ghost">收起</Button></span>
											</div>
                		</div>
										<div class="itembd" v-if="item.show" v-for="itemlist in item.userRentalPriceDoList">
											 <div class="tabitem"></div>
											 <div class="tabitem">{{itemlist.durationname}}</div>
											 <div class="tabitem">
												 <Input v-model="itemlist.price" @on-change="price(itemlist)"></Input>
										   </div>
										</div>
                </div>
            </div>
          </Col>
        </Row>
        <Row style="text-align:center">
          <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center;margin-top:15px">
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="ghost" @click="handleRet()">返回</Button>
          </Col>
        </Row>
      </div>
    </div>

    <!-- <edit-user-price-component v-if="editUserPriceComponentShow" :editUserPriceComponentShow="editUserPriceComponentShow" :editUserPriceComponentData="editUserPriceComponentData" @editUserPriceComponent="editUserPriceComponent"></edit-user-price-component> -->
    <!-- <user-rent-duration :duration='6'></user-rent-duration> -->
  </div>
</template>
<script>
  export default {
    data(){
      return{
        // 用户租车价格sku属性title
        skutitle:'',
        // 区域价格列表数据
        areaPriceListDatas:[],
        zucheTimedata:[],
				data:[{name:"杭州",list:[{name:"一个月",num:"6",price:""},{name:"三个月",num:"6",price:""}],show:true},{name:"嘉兴",list:[{name:"一个月",num:"6",price:""}],show:false}],
        // 修改区域价格开关
        editUserPriceComponentShow:false,
        editUserPriceComponentData:'',
        // 车辆分页数据
        pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:10,
        },
				newdata:[], // 最后提交数据
				subform:{
					duration:"",
					price:""
				}
      }
    },
    mounted(){
			var _this = this
      this.skutitle=this.$route.query.sku
			let listdata={
				token:this.$webapi.get('token')
			}
			this.$api.get('/user_rental_duration/list',listdata,reset=>{
				if (reset.codeId===1) {
					_this.zucheTimedata = reset.resData
			 	  _this.list()
				}
			})
    },
    methods:{
			allprice () {
         var _this = this;
				 var str = this.subform
				 if(str.duration == ""){
					 this.$Message.warning('批量租车时间没有选择!');
					 return
				 }
				 if(str.price == ""){
					 this.$Message.warning('批量价格没有填写!');
					 return
				 }
				 if(_this.areaPriceListDatas.length<1){
					 return
				 }
				 _this.areaPriceListDatas.forEach(function (a) {
					  if(a.userRentalPriceDoList.length>0){
							a.userRentalPriceDoList.forEach(function (b) {
							  if(str.duration == b.duration){
									b.price =  str.price
									 _this.price(b)
								}
							})
						}
				 })
			},
			//判断是否存在
			price(a){
					if(this.newdata.length>0){
						var idx = 0
						this.newdata.forEach(function (b) {
								if(b.carSkuId == a.carSkuId && b.provinceCode == a.provinceCode && b.cityCode == a.cityCode && b.duration == a.duration){
								   idx = 1
									 b.price = a.price
								}
						})
						if(idx == 0){
						 this.newdata.push(a)
						}
					}else {
						this.newdata.push(a)
					}
			},
			openclick (item,index) {
				var show = !item.show
				this.$nextTick(function () {
					this.areaPriceListDatas[index].show = show
				})
			},
      list(){
        let listdata={
          token:this.$webapi.get('token'),
          carSkuId:this.$route.params.id
        };
        let _this=this;
        this.$api.get('/open_city/user_rental_price/byCarSkuId',listdata,reset=>{
          if (reset.codeId===1) {
            var str =reset.resData;
                str.forEach(function (item) {
									  console.log(111)
							      item.show = false
										if(item.userRentalPriceDoList.length>0){
											var list = []
											for(var i=0;i<_this.zucheTimedata.length;i++){
												var idx = -1
												for(var k =0;k<item.userRentalPriceDoList.length;k++){
													if(_this.zucheTimedata[i].duration == item.userRentalPriceDoList[k].duration){
														  item.userRentalPriceDoList[k].durationname = _this.zucheTimedata[i].name
													    idx = k
													}
												}
												if(idx == -1){
													var itemlist = {
															carSkuId:item.carSkuId,
															provinceCode:item.provinceCode,
															cityCode:item.cityCode,
															duration:_this.zucheTimedata[i].duration,
															price:"",
														  durationname:_this.zucheTimedata[i].name,
													}
													list.push(itemlist)
												}else {
													list.push(item.userRentalPriceDoList[idx])
												}
											}
											item.userRentalPriceDoList = list
										}else {
										  var list = []
											_this.zucheTimedata.forEach(function (zucheitem) {
												var itemlist = {
													carSkuId:item.carSkuId,
													provinceCode:item.provinceCode,
													cityCode:item.cityCode,
													duration:zucheitem.duration,
													price:"",
												  durationname:zucheitem.name,
												}
												list.push(itemlist)
											})
											item.userRentalPriceDoList = list
										}
					    	})
						_this.areaPriceListDatas = str
			  	}
        })
      },
      // 增加区域价格操作
      AddAreaPrice(){
        this.$router.push({
          path:'/userpricelist/adduserprice/'+this.$route.params.modelId+'/'+this.$route.params.id,
          query:{
            sku:this.$route.query.sku
          }
        })
      },
      // 修改操作
      EditUserPrice(e){
        this.editUserPriceComponentShow=true;
        this.editUserPriceComponentData=e;
      },
      // 修改区域返回处理
      editUserPriceComponent(e){
        this.editUserPriceComponentShow=e
        this.list();
      },
      // 删除操作
      DeleteUserPrice(e){
        let _this = this
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确认要删除【'+e.skuCodeCombination+e.provinceName+e.cityName+'持续时间'+e.duration+'】个月的区域价格吗?</p>',
            onOk: () => {
                let _this = this;
								var data = {
										token:this.$webapi.get('token'),
										id: e.id
								}
                // console.log(url);
                this.$api.post("/user_rental_price/delete", data, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('删除成功!');
                        _this.list();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            onCancel: () => {

            }
        });

      },
      pageComponentDate(e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      // 添加保存
      handleSubmit(){
        this.areadatas=[]
        let _this = this;
        this.newdata.forEach((val,index)=>{
          _this.areadatas.push({
            carSkuId:parseFloat(_this.$route.params.id),
            provinceCode:parseFloat(val.provinceCode),
            cityCode:parseFloat(val.cityCode),
            duration:parseFloat(val.duration),
            price:parseFloat(val.price),
          })
        })
        var data = {
            token:this.$webapi.get('token'),
            data:JSON.stringify(this.areadatas)
        }
        this.$api.post("/user_rental_price/addList", data, reset => {
            if (reset.codeId === 1) {
              _this.$Message.success('保存成功!');
              _this.$router.back(-1)
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      handleRet(){
        this.$router.back(-1);
      }
    }
  }
</script>
<style lang="less">
	.tabitembox{
		float: left;
		width: 100%;
		display: flex;
		border: #ddd 1px solid;
		.tabitem{
			float: left;
			background: #f8f8f8;
			line-height: 40px;
			height: 40px;
			flex: 4;
		  text-indent: 2em;
		  padding: 0 10px;
		}
		.tabitem:nth-child(1){
			flex:1;
			text-align: left;
			text-indent: 2em
		}
	}
	.itemlist{
		float:left;
		width: 100%;
		border: #ddd 1px solid;
    border-top:none;
		.itemhd{
			border-bottom: #eee 1px solid;
			height: 50px;
			line-height: 50px;
			text-align: left;
			text-indent: 2em;
			display: flex;
			cursor: pointer;
			div{
				flex:1
			}
			div:last-child{
				text-align:right;
			}
		}
		.itembd{
			float:left;
			width: 100%;
			display: flex;
			padding: 5px 0;
			.tabitem{
				flex: 4;
				padding: 0 10px;
			}
			.tabitem:nth-child(1){
				flex:1
			}
		}
	}
</style>
