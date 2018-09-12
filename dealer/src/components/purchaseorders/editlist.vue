<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/purchaseorder">采购单管理</BreadcrumbItem>
          <BreadcrumbItem>修改采购单</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>修改{{purchaseOrderNo}}采购单</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
      <div class="tableListForm">
        <Form ref="formItem" :model="formItem">
        <div class="pagelist">
        <div class="pagelist-hd" style="text-align: left;">操作详情</div>
          <div class="pagelist-bd">

            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="创建人:" prop="creatorName">
                  <p style="text-align: left;">{{formItem.creatorName}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="创建时间:" prop="createdAt">
                  <p style="text-align: left;">{{formItem.createdAt}}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="修改人:" prop="updatorName">
                  <p style="text-align: left;">{{formItem.updatorName}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="修改时间:" prop="updatedAt">
                  <p style="text-align: left;">{{formItem.updatedAt}}</p>
                </FormItem>
              </Col>
            </Row>

           </div>
          </div>
          </Form>
          <div class="page-divider page-divider-horizontal "></div>
        </div>
        <!-- <Form :label-width="76" label-position="left">
          <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="修改门店:"prop="shopvalue">
                  <Select v-model="shopvalue" @on-change=changeshop(shopvalue) filterable>
                    <Option v-for="cell in shopdata" :value="cell.id">{{ cell.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
          </Row>
        </Form> -->
        <div>
          <Form ref="shopinfo" :model="shopinfo" :label-width="76" label-position="left">

            <Row>
               <Col :xs="24" :sm="24" :md="12" :lg="12">
                   <div class="">
                        <FormItem label="收货地址:">
                            <p style="text-align: left;">{{shippingAddress}}</p>
                        </FormItem>
                   </div>
               </Col>
            </Row>

             <!--操作按钮-->
            <div class="page-divider page-divider-horizontal "></div>
            <div class="tableListOperator">
              <p style="text-align: left;"><strong>总计(万元):{{totalprice}}</strong></p>
            </div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="">
                  <i-table border :columns="columnsdata" :data="parchseData"></i-table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="" style="margin-top: 15px">
                  <Button type="primary"  @click="goback()">返回</Button>
                  <Button type="primary"  @click="save()">保存</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <edit-component v-if="editlistshow" :editlistshow="editlistshow" :editlistdata="editlistdata" :purchaseOrderId="purchaseOrderId" :dealerId="dealerId" @editlistshows="editlistshows"></edit-component>

    </div></div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import EditComponent from "./editcomponent.vue"
  import vm from '../../js/infobase/vm.js'
  export default {
    components: {
        Paging:Pages,
        EditComponent:EditComponent
    },
    data () {
        return {
            // 总价格
            totalprice:0,
            purchaseOrderNo:'',
            // 采购单的数据
            parchseData:[],
            // 后台传送数据
            detail:[],
            // detail数据
            detailData:{
              // car_model_id:'',
              // car_sku_id:'',
              // purchase_quantity:''
            },
            // 选择门店的值
            shopvalue:'',
            shopdata:[],
            // 门店信息
            shopinfo:{

            },
            // 门店地址
            shippingAddress:'',
            editdata:{},
            purchaseOrderId:'',
            // 门店名字
            shopName:'',
            // 采购单信息
            formItem:{},

            addshow:false,
            editlistshow:false,
            pageshow:false,
            editlistdata:{},
            dealerId:0,
            columnsdata: [
                {
                    title: '车辆型号',
                    key: 'carModel',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.carModel)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: 'sku属性',
                    key: 'carSku',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.carSku)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '采购数量',
                    key: 'purchaseQuantity',
                    render: (h, params) => {
                      return h('div', [
                        h('Input',{
                          props:{
                            placeholder:'请输入数量',
                            value:params.row.purchaseQuantity
                          },
                          on:{
                            'on-blur':(e)=>{
                              params.row.purchaseQuantity=e.target.value;
                              this.parchseData[params.index].purchaseQuantity = e.target.value
                              this.areaPriceListDatas[params.index]=params.row;
                            }
                          }
                        })
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '单价(万元)',
                    key: 'unitPrice',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.unitPrice)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                  title: '总价(万元)',
                  key: 'total',
                  render: (h, params) => {
                    return h('div', [
                        h('span', (params.row.unitPrice*params.row.purchaseQuantity).toFixed(2))
                    ]);
                  },
                  className:'ivu-table-column-center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:250,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.handleRemove(params.row);
                                      // params.row.purchaseQuantity=120
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            editlistdatas: [

            ],
            addressCode:{

            }
          }
    },
    created(){
      this.purchaseOrderId=this.$route.query.id
      this.list()
    },
    mounted() {
      // console.log(this.purchaseOrderId);
      this.getshop();
    },
    methods: {
      save () {
        var _this = this;
        var reset = {
          token:this.$webapi.get("token"),
          id:parseInt(this.$route.query.id),
          shippingAddress:this.shippingAddress,
          detail:[]
        }
        this.parchseData.forEach((e) =>{
          var str = {
              id:parseInt(e.id),
              car_model_id:parseInt(e.carModelId),
              car_sku_id:parseInt(e.carSkuId),
              purchase_quantity:parseInt(e.purchaseQuantity)
          }
          reset.detail.push(str)
        })
        reset.detail = JSON.stringify(reset.detail)
        this.$api.post('/purchase_order/update',reset,reset => {
          // console.log(reset.codeId);
          if (reset.codeId === 1) {
             this.$router.push({path:"/purchaseorder"})
          } else {
            _this.$netcode.getApiCode(reset)
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
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认要修改收货地址吗?</p>',
          onOk: () => {
            this.getshopOne(val);
          },
          onCancel: () => {

          }
      });

      },
      //删除采购单明细
      handleRemove(e){
        var _this = this
        this.$Modal.confirm({
          title:'提示',
          content:'<p>确认要删除【'+e.carSku+'】的采购吗?',
          onOk:()=>{
            let datas={
              token:this.$webapi.get("token"),
              id:e.id
            }
            this.$api.post("/purchase_order/delete_detail",datas,reset=>{
              if (reset.codeId===1) {
                this.$Message.success("删除成功!")
                _this.list()
              }else{
                _this.$netcode.getApiCode(reset)
              }
            })
          }
        })
      },
      // 获取门店详情
      getshopOne(e){
        let data={
          token:this.$webapi.get("token"),
          id:e,
        };
        let _this=this;
        this.$api.get('/dealer_storefront/getOne',data,reset=>{
          // console.log(reset.codeId);
          if (reset.codeId === 1) {
            _this.shopinfo=reset.resData;
            _this.shippingAddress=_this.shopinfo.provinceName+_this.shopinfo.cityName+_this.shopinfo.areaName+_this.shopinfo.address;
            // 修改收货地址
            // var url = "/purchase_order/update?token=" + _this.$webapi.get('token') + "&id="+_this.purchaseOrderId+"&shippingAddress="+_this.shippingAddress;
            //   _this.$api.post(url, null, reset => {
            //     if (reset.codeId === 1) {
            //       // _this.$Message.success("收货地址修改成功!");
            //     }else {
            //       _this.$netcode.getApiCode(reset)
            //     }
            //   })
          } else {
            _this.$netcode.getApiCode(reset)
          }
        })
      },
      editlistdata(e){
        this.editlistdatas.push(e);
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          id:this.$route.query.id,
        }
        var _this =  this
        this.$api.get('/purchase_order/detail',listdata,reset => {
          if (reset.codeId === 1) {
            _this.formItem=reset.resData
            _this.formItem.createdAt=this.$webapi.gettime('date',(_this.formItem.createdAt)/1000)
            _this.formItem.updatedAt=this.$webapi.gettime('date',(_this.formItem.updatedAt)/1000)
            _this.shippingAddress=reset.resData.shippingAddress
            _this.parchseData=reset.resData.purchaseOrderDetailVOList;
            _this.purchaseOrderNo=reset.resData.purchaseOrderNo
            _this.totalprice=reset.resData.totalPrice
            _this.dealerId=reset.resData.dealerId
          } else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      handleRe (val) {
          this.editlistdata=val;
          this.editlistshow=true;
      },
      // 接收编辑的数据
      editlistshows(e){
        this.editlistshow=e.editshow;
        // this.parchseData[e.editdata._index]=e.editdata
        this.list();
      },

      goback(){
        this.$router.push("/purchaseorder")
      }
    }
  }
</script>
