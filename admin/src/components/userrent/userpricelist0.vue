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
            <div>
              <i-table border :columns="columns" :data="areaPriceListDatas">

              </i-table>
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
  import EditUserPriceComponent from './edituserpricecomponent'
  import UserRentDuration from '../pub/userrentduration.vue'
  import SameCityRent from './samecityrent.vue'
  import Pages from '../pub/page.vue'
  export default {
    components:{
      EditUserPriceComponent:EditUserPriceComponent,
      Paging: Pages,
      UserRentDuration: UserRentDuration,
      SameCityRent: SameCityRent,
    },
    data(){
      return{
        // 用户租车价格sku属性title
        skutitle:'',
        // 区域价格列表数据
        areaPriceListDatas:[],
        zucheTimedata:[],
        // 修改区域价格开关
        editUserPriceComponentShow:false,
        editUserPriceComponentData:'',
        // 车辆分页数据
        pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:10,
        },
        pageshow:false,

        // 修改后的数据
        editdatas:[],
        // 表格列的配置描述
        columns:[
          {
            type: 'expand',
            title: '展开',
            width: 62,
            render: (h, params) => {
                var samedata=params.row.userRentalPriceDoList.concat();
                if (samedata.length==params.row.userRentalPriceDoList.length) {
                  samedata.splice(0,1)
                }
                return h(SameCityRent, {
                    props: {
                      datas: samedata
                    },
                    on:{
                      'samecityrentprice':(e)=>{
                        console.log(e)
                        var status=0;
                        var isEdit=false;
                        if (this.editdatas.length==0) {
                          this.editdatas.push(e)
                        }else{
                          this.editdatas.forEach((val,index)=>{
                            if (val.codeid==e.codeid) {
                              this.editdatas[index]=e;
                              status=1
                              isEdit=true;
                            }else{
                              status=2
                            }
                          })
                          if (status==2&&isEdit==false) {
                            this.editdatas.push(e)
                          }
                        }
                        console.log(this.editdatas);
                      }

                    }
                })
            }
          },
          {
            title: '区域',
            key: 'skuCodeCombination',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.provinceName+params.row.cityName)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '持续时间(单位:月)',
            key: 'duration',
            render: (h, params) => {
              return h('div', [
                h(UserRentDuration,{
                  props:{
                    'duration':params.row.userRentalPriceDoList[0].duration
                  },
                  on:{
                    'durations':(e)=>{
                      params.row.userRentalPriceDoList[0].duration=e.dur;
                      var status=0;
                      var isEdit=false;
                      if (this.editdatas.length==0) {
                          this.editdatas.push(params.row.userRentalPriceDoList[0])
                      }else{
                        this.editdatas.forEach((val,index)=>{
                          if (val.codeid==params.row.userRentalPriceDoList[0].codeid) {
                            this.editdatas[index]=params.row.userRentalPriceDoList[0]
                            // 修改
                            status=1;
                            isEdit=true;
                          }else{
                            // 新增
                            status=2
                          }
                        })
                        if (status==2&&isEdit==false) {
                          this.editdatas.push(params.row.userRentalPriceDoList[0])
                        }
                      }
                      console.log(this.editdatas);
                    }
                  }
                })
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '价格(万元)',
            key: 'price',
            render: (h, params) => {
              return h('div', [
                h('Input',{
                  props:{
                    placeholder:'请输入价格',
                    value:params.row.userRentalPriceDoList[0].price
                  },
                  on:{
                    'on-change':(e)=>{
                      params.row.userRentalPriceDoList[0].price=e.target.value;
                      var status=0;
                      var isEdit=false;
                      if (this.editdatas.length==0) {

                        this.editdatas.push(params.row.userRentalPriceDoList[0])
                      }else{
                        this.editdatas.forEach((val,index)=>{
                          if (val.codeid==params.row.userRentalPriceDoList[0].codeid) {
                            this.editdatas[index]=params.row.userRentalPriceDoList[0]
                            status=1;
                            isEdit=true;
                          }else{
                            status=2
                          }
                        })
                        if (status==2&&isEdit==false) {
                          this.editdatas.push(params.row.userRentalPriceDoList[0])
                        }
                      }
                      console.log(this.editdatas);
                    }
                  }
                })
              ]);
            },
            className: 'ivu-table-column-center'
          }
        ],
      }
    },
    mounted(){		
      this.skutitle=this.$route.query.sku;
			this.list();
    },
    methods:{
      list(){
        let listdata={
          token:this.$webapi.get('token'),
          carSkuId:this.$route.params.id
        };
        let _this=this;
        this.$api.get('/open_city/user_rental_price/byCarSkuId',listdata,reset=>{
          if (reset.codeId===1) {
            _this.areaPriceListDatas=reset.resData;
            _this.areaPriceListDatas.forEach((val,index)=>{

              if (val.userRentalPriceDoList.length<4) {
                // 为每个数组添加唯一标识符
                val.userRentalPriceDoList.forEach((obj,j)=>{
                  obj.codeid=String(index)+String(j)
                })
                var rentduration={
                  provinceCode: val.provinceCode,
                  cityCode: val.cityCode,
                  provinceName: val.provinceName,
                  cityName: val.cityName,
                  duration:null,
                  price:0
                }
                for (var i = val.userRentalPriceDoList.length; i < 4; i++) {
                  rentduration.codeid=String(index)+String(i)+String(i)

                  val.userRentalPriceDoList.push(JSON.parse(JSON.stringify(rentduration)))
                }
              }else{
                val.userRentalPriceDoList.forEach((obj,j)=>{
                  obj.codeid=String(index)+String(j)
                })
              }
            })
            console.log(_this.areaPriceListDatas)
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
        this.editdatas.forEach((val,index)=>{
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
              // window.location.reload();
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
