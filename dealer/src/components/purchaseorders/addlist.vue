<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/purchaseorder">采购单管理</BreadcrumbItem>
          <BreadcrumbItem>添加采购单</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>添加采购单</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
      <div class="tableListForm">
        <Form :label-width="76" label-position="left">
          <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="选择门店:"prop="shopvalue">
                  <Select v-model="shopvalue" @on-change=changeshop(shopvalue) filterable>
                    <Option v-for="cell in shopdata" :value="cell.id">{{ cell.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
          </Row>
        </Form>
        <div v-if="shopinfoshow">
          <Form ref="shopinfo" :model="shopinfo" :label-width="76" label-position="left">
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                 <div class="">
                      <FormItem label="门店:" prop="name">
                          <p style="text-align: left;">{{shopinfo.name}}</p>
                      </FormItem>
                 </div>
              </Col>
            </Row>
             <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12">
                 <div class="">
                      <FormItem label="负责人:" prop="principalsName">
                          <p style="text-align: left;">{{shopinfo.principalsName}}</p>
                      </FormItem>
                 </div>
              </Col>
            </Row>
            <Row>
               <Col :xs="24" :sm="24" :md="12" :lg="12">
                   <div class="">
                        <FormItem label="收货地址:">
                            <p style="text-align: left;">{{shopinfo.provinceName}}{{shopinfo.cityName}}{{shopinfo.areaName}}{{shopinfo.address}}</p>
                        </FormItem>
                   </div>
               </Col>
            </Row>
            <Row>
               <Col :xs="24" :sm="24" :md="12" :lg="12">
                   <div class="">
                        <FormItem label="电话:" prop="principalsTelephone">
                            <p style="text-align: left;">{{shopinfo.principalsTelephone}}</p>
                        </FormItem>
                   </div>
               </Col>
            </Row>
          </Form>
        </div>
      </div>

      <div v-show="shopchangeshow">
        <div class="tableListOperator addorider">
            <p style="text-align: left;"><strong>总计(万元):{{totalprice}}</strong></p>
          <!-- <Button type="primary"  @click="add()">添加车辆型号</Button> -->
        </div>
        <Row>
           <Col :xs="24" :sm="24" :md="24" :lg="24">
               <div class="">
                    <i-table border :columns="columnsdata" :data="parchseData"></i-table>
                    <div class="mt20">
                      <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </div>
               </div>
           </Col>

        </Row>
        <div class="page-divider page-divider-horizontal "></div>

        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="">
              <Button type="primary"  @click="save()">保存</Button>
              <!-- <Button type="primary"  @click="submit()">提交</Button> -->
            </div>
          </Col>
        </Row>

      </div>
        <!--操作按钮-->
      <!-- <add-list-component v-if="addshow" :addshow="addshow" @addlistshow="addlistshow" :addressdata="addressdata"></add-list-component> -->
      <!-- <card-common></card-common> -->
    </div></div>
  </div>
</template>
<script>
  import CardCommon from '../pub/cardcommon.vue'
  import Pages from "../pub/page.vue"
  import CarModelComponent from "./carmodelcomponent.vue"
  import SkuIdComponent from "./skuidcomponent.vue"
  import {vm} from '../../js/infobase/vm.js'
  export default {
    components: {
        Paging:Pages,
        // AddListComponent:AddListComponent,
        // CarModelComponent,
        SkuIdComponent,
        CardCommon
    },
    data () {
        return {
            // 采购单总价钱
            totalprice:0,
            // 门店信息
            shopinfo:{

            },
            carModelData:[],
            shopinfoshow:false,
            shopchangeshow:false,
            shopdata:[],
            // 选择门店的值
            shopvalue:'',
            // 门店地址
            shippingAddress:'',
            // 采购单的数据
            parchseData:[
              {
                car_model_id:0,
                car_model_name:'',
                car_sku_id:0,
                car_sku_skuCodeCombination:'',
                address_price_id:0,
                address_price:0,
                purchase_quantity:0,
                car_sku_listdata:[],
                total:0,
                disBool:true,
                nullBool:true
              },
            ],

            // 后台传送数据
            detail:[],
            // detail数据
            detailData:{
              // car_model_id:'',
              // car_sku_id:'',
              // purchase_quantity:''
            },
            addressdata:{},
            // 车辆型号id
            carmodelid:0,
            // skuid
            skuid:0,

            pageshow:false,
            editlistdata:'',

            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },

            columnsdata:[
              {
                title: '车辆型号',
                key: 'car_model_name',
                render: (h, params) => {
                  var _this = this
                  return h('Select', {
                      props:{
                          value:params.row.car_model_id,
                      },
                      on: {
                          'on-change':(event) => {
                            this.carModelData.forEach(function (item) {
                                if(event==item.id){
                                  params.row.car_model_id = item.id
                                  params.row.car_model_name = item.modelName
                                  _this.parchseData[params.index].car_model_id = item.id
                                  _this.parchseData[params.index].car_model_name = item.modelName
                                  setTimeout(function () {
                                     _this.car_skulist(item,params.index)
                                  },300)
                                }
                            })
                          }
                      },
                  },
                  this.carModelData.map(function(type){
                      return h('Option', {
                          props: {value: type.id}
                      }, type.modelName);
                   })
                  );
                },
                className: 'ivu-table-column-center'
              },
              {
                title: 'sku属性',
                key: 'car_sku_skuCodeCombination',
                render: (h, params) => {
                      var _this = this
                      return h('Select', {
                          props:{
                              value:params.row.car_sku_id,
                          },
                          on: {
                              'on-change':(event) => {
                                this.parchseData[params.index].car_sku_listdata.forEach(function(item){
                                    if(item.id == event){
                                      params.row.car_sku_id = item.id
                                      params.row.car_sku_skuCodeCombination = item.skuCodeCombination
                                      _this.parchseData[params.index].car_sku_id = item.id
                                      _this.parchseData[params.index].car_sku_skuCodeCombination = item.skuCodeCombination
                                      _this.parchseData[params.index].disBool = false
                                      setTimeout(function () {
                                         _this.getAddressPrice(item.id,params.index,item.skuCodeCombination)
                                      },300)
                                      setTimeout(function () {
                                        if (params.row.address_price!=0) {
                                          _this.parchseData[params.index].total=params.row.address_price*params.row.purchase_quantity
                                        }
                                      },400)
                                    }
                                })
                              }
                          },
                      },
                      this.parchseData[params.index].car_sku_listdata.map(function(type){
                          return h('Option', {
                              props: {value: type.id}
                          }, type.skuCodeCombination);
                       })
                      );
                  },
              },
              {
                title: '地域价格(万元)',
                key: 'address_price',
                render: (h, params) => {
                  return h('div', [
                    h('Input',{
                      props:{
                        disabled:'disabled',
                        value:params.row.address_price
                      },
                      on:{

                      }
                    })
                  ])
                },
                className: 'ivu-table-column-center'
              },
              {
                title: '数量',
                key: 'purchase_quantity',
                render: (h, params) => {
                  return h('div', [
                    h('Input',{
                      props:{
                        placeholder:'请输入数量',
                        value:params.row.purchase_quantity,
                        disabled:params.row.address_price==0
                      },
                      on:{
                        'on-blur':(e)=>{
                          params.row.purchase_quantity=e.target.value;
                          // this.parchseData[params.index].purchase_quantity=e.target.value
                          if(e.target.value<1){
                            this.$Message.info("数量不能少1")
                            return
                          }
                          this.parchseData[params.index]=params.row;
                          if (params.row.address_price!=0) {
                            this.parchseData[params.index].total=params.row.address_price*params.row.purchase_quantity
                            this.parchseData[params.index].nullBool=false
                            if (parseInt(e.target.value)>0) {
                              if(this.parchseData[0].nullBool){//判断是不是修改,true是修改
                                 this.parchseData[params.index].nullBool=false
                                 this.alltotalprice()
                              }else{
                                this.add();
                                this.alltotalprice()
                              }
                            }

                          }
                        }
                      }
                    })
                  ]);
                },
                className: 'ivu-table-column-center'
              },
              {
                title: '总计(万元)',
                key: 'total',
                render: (h, params) => {
                    let totalPrice=this.$webapi.toDecimal2(params.row.total)
                    return h('div', [
                      h('Input',{
                        props:{
                          disabled:'disabled',
                          value:totalPrice
                        },
                        on:{
                          // 'on-change':(e)=>{
                          //   console.log(e);
                          //   var _this=this
                          //   this.parchseData.forEach((obj,index)=>{
                          //     _this.totalprice+=obj.total
                          //   })
                          // }
                        }
                      })
                    ]);
                },
                className: 'ivu-table-column-center'
              },
              {
                title: '操作',
                key: 'action',
                align: 'center',
                width: 180,
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'error',
                        // size: 'small'
                      },
                      style: {
                          marginRight: '5px',
                          color: '#fff'
                      },
                      on: {
                        click: () => {
                          this.remove(params.row)
                        }
                      }
                    },'删除')
                  ])
                }
              }
            ],

          }
    },
    mounted() {
      this.getshop();
    },
    watch:{
      //接收addlistcomponent组件的参数

    },
    methods: {
      alltotalprice () {
        setTimeout(()=>{
          var _this=this
          _this.totalprice=0
          _this.parchseData.forEach((obj,index)=>{
            _this.totalprice += obj.total
          })
          _this.totalprice = _this.totalprice.toFixed(3)
        },300)
      },
      car_skulist (item,index) {
        var _this = this;
        let data={
          token:this.$webapi.get('token'),
          carModelId:item.id
        };
        this.$api.get('/car_sku/list',data,reset=>{
          if (reset.codeId===1) {
              _this.parchseData[index].car_sku_listdata = reset.resData
          }else if(reset.codeId===-9){
            _this.parchseData[index].car_sku_listdata = []
          }
        })
      },
      // 获得区域价格
      getAddressPrice(e,index,skuCodeCombination){
        let data={
          token:this.$webapi.get('token'),
          carSkuId:e,
          provinceCode:this.shopinfo.provinceCode,
          cityCode:this.shopinfo.cityCode
        };
        let _this=this;
        this.$api.get('/car_purchase_price/list',data,reset=>{
          if (reset.codeId===1) {
            _this.parchseData[index].address_price_id = reset.resData[0].id
            _this.parchseData[index].address_price = reset.resData[0].price
            _this.parchseData[index].purchase_quantity =  _this.parchseData[index].purchase_quantity
            _this.parchseData[index].total = (_this.parchseData[index].purchase_quantity*reset.resData[0].price).toFixed(2)
          } else {
            _this.parchseData[index].address_price_id = ""
            _this.parchseData[index].address_price = 0
            _this.parchseData[index].total = 0
            if(reset.codeId== -9){
              this.$Message.info("【"+skuCodeCombination+"】当前门店城市价格没有设置")
            }else{
              _this.$netcode.getApiCode(reset)
            }
          }
        })
      },
      // 获取门店
      getshop(){
        let data={
          token:this.$webapi.get("token")
        };
        let _this=this;
        this.$api.get('/dealer_storefront/list',data,reset => {
          // console.log(reset.codeId);
          if (reset.codeId === 1) {
            _this.shopdata=reset.resData;
          } else {
            _this.$netcode.getApiCode(reset)
          }
        })
      },
      // 选择门店
      changeshop(val){
        this.getshopOne(val);
      },
      // 获取门店详情
      getshopOne(e){
        var _this = this
        let data={
          token:this.$webapi.get("token"),
          id:e,
        }
        this.$api.get('/dealer_storefront/getOne',data,reset=>{
          // console.log(reset.codeId);
          if (reset.codeId === 1) {
            _this.getcar()
            _this.shopinfo=reset.resData;
            _this.shopinfoshow=true;
            this.addressdata=this.shopinfo;
           _this.shippingAddress = _this.shopinfo.provinceName + _this.shopinfo.cityName+_this.shopinfo.address
          } else {
            _this.$netcode.getApiCode(reset)
          }
        })
      },
      getcar () {
        // 获取车辆型号
        var _this = this
        let data={
          token:this.$webapi.get('token')
        };
        this.$api.get('/car_model/list',data,reset=>{
          if (reset.codeId===1) {
            _this.shopchangeshow=true;
            _this.carModelData=reset.resData;
          } else {
            _this.$netcode.getApiCode(reset)
          }
        })
      },
      addlistshow(e){
        if (e.parchase) {
          this.parchseData.push(e.parchase);
        }

        // console.log(this.parchseData)
        this.addshow=e.addshow;
        // console.log(e.parchase);
      },
      // 保存采购单
      save(){
        // console.log(this.shippingAddress)
        // console.log(this.parchseData)
        this.detail=[];
        if (this.parchseData.length==0) {
          this.$Message.error("数据内容填写不完整!")
        }else{
          if (this.parchseData[0].purchase_quantity==0) {
            // this.parchseData.splice(0,1);
            for (var i = 1; i < this.parchseData.length; i++) {
              this.detailData={car_model_id:this.parchseData[i].car_model_id,car_sku_id:this.parchseData[i].car_sku_id,purchase_quantity:this.$webapi.toDecimal2(this.parchseData[i].purchase_quantity)}
               this.detail.push(this.detailData)
            }
          }else{
            for (var i = 0; i < this.parchseData.length; i++) {
              this.detailData={car_model_id:this.parchseData[i].car_model_id,car_sku_id:this.parchseData[i].car_sku_id,purchase_quantity:this.$webapi.toDecimal2(this.parchseData[i].purchase_quantity)}
               this.detail.push(this.detailData)
            }
          }

          let _this = this
          // var url = "/purchase_order/add?token=" + this.$webapi.get('token') + "&shippingAddress=" + this.shippingAddress + "&detail="+ JSON.stringify(this.detail)
          console.log(JSON.stringify(this.detail))
          var data = {
                token:this.$webapi.get('token'),
                shippingAddress:this.shippingAddress,
                detail:JSON.stringify(this.detail)
          }
          this.$api.post("/purchase_order/add", data, reset => {
            if (reset.codeId === 1) {
              _this.$Message.success("保存成功");
              _this.$router.push("/purchaseorder")
            }else {
              _this.$netcode.getApiCode(reset)
            }
          })
        }
      },

      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
      },
      add(){
        var data = {
          car_model_id:0,
          car_model_name:'',
          car_sku_id:0,
          car_sku_skuCodeCombination:'',
          address_price_id:0,
          address_price:0,
          purchase_quantity:0,
          car_sku_listdata:[],
          total:0,
          disBool:true,
          nullBool:true
        }
        this.parchseData.unshift(data)
        // if (this.parchseData.length!=0){
        //   if (this.parchseData[this.parchseData.length-1].total!=0) {
        //     this.parchseData.unshift(data)
        //   }else{
        //     this.$Message.error("内容填写不完整!")
        //   }
        // }else{

        // }
      },
      handleRe (val) {
          this.editlistdata=val;
          this.editlistshow=true;
      },

      editlistshows(e){
        this.editlistshow=e.editshow;
      },

      remove (params) {
        // console.log(this.parchseData);
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要删除吗?</p>',
              onOk: () => {
                // _this.itemdel(params)
                // console.log(this.parchseData);
                // console.log(params);
                this.parchseData.splice(params._index,1)
                _this.$Message.info('删除成功');
              },
              onCancel: () => {

              }
          });

      },
    }
  }
</script>
<style scoped>
  .addorider{
    display: block;
    margin-top: 15px;
  }
  .ivu-form .ivu-form-item-label{
    text-align: left;
  }
</style>
