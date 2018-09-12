<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem>售卖订单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>售卖订单列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
         <Form ref="formCustom" :model="formCustom" :label-width="80">
             <Row>
                 <Col :xs="24" :sm="24" :md="6" :lg="6">
                    <FormItem label="联系电话" prop="appointmentOrderNo">
                      <Input v-model="formCustom.telephone" placeholder="联系电话"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                     <FormItem label="订单状态">
                       <Select v-model="formCustom.status" >
                           <Option value="" >全部</Option>
                           <Option value="1" >待支付</Option>
                           <Option value="2" >待发货</Option>
                           <Option value="3" >已提车</Option>
                           <Option value="4" >用户确认提车</Option>
                           <Option value="5" >取消订单</Option>
                           <Option value="6" >订单关闭</Option>
                           <Option value="7" >失效</Option>
                           <Option value="8" >退货</Option>
                       </Select>
                     </FormItem>
                   </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                    <FormItem label="订单号" prop="orderno">
                      <Input v-model="formCustom.orderno" placeholder="订单号"></Input>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6" v-if="accountType==1">
                    <FormItem label="门店名称" >
                        <add-store-component @storeEmit="storeEmit"></add-store-component>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                    <FormItem label="开始时间" prop="startTime">
                      <DatePicker type="date" placeholder="开始时间" format="yyyy-MM-dd" v-model="formCustom.startTime" @on-change="startTime"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                    <FormItem label="结束时间" prop="endTime">
                       <DatePicker type="date" placeholder="结束时间" format="yyyy-MM-dd" v-model="formCustom.endTime" @on-change="endTime"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                    <div class="">
                      <FormItem style="margin-left: -70px;text-align:left">
                         <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                          <Button type="error" @click="exportOrder()">导出订单</Button>
                     </FormItem>
                   </div>
                 </Col>
             </Row>
         </Form>
       </div>
        <!--操作按钮-->
       <div class="tableListOperator">

       </div>
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <i-table border :columns="columnsdata" :data="data"></i-table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div></div>
  </div>
</template>
<script>
  import Pages from '../../pub/page.vue'
  import addStoreComponent from '../../pub/storefrontname.vue'
  export default {
    components: {
        Paging:Pages,
        addStoreComponent
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            accountType:1,
            appointmentiddata:[

            ],
            value2:'',
            formCustom:{
              appointmentOrderNo:'',
              createdAt:'',
              telephone:"",
              orderno:"",
              status:"",
              storefrontname:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '订单单号',
                    width:150,
                    key: 'serialNumber',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.serialNumber)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                // {
                //     title: '图片地址',
                //     key: 'carSkuPicUrl',
                //     render: (h, params) => {
                //       return h('div', [
                //           h('img', {
                //               attrs: {
                //                   src: params.row.carSkuPicUrl
                //               },
                //               style: {
                //                   width: '40px',
                //                   height: '40px'
                //               }
                //           })
                //     ])
                //  }
                // },
                {
                    title: '商品名称',
                    key: 'itemName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.itemName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '商品型号',
                    key: 'carModelName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.carModelName)
                    ])
                 }
                },
                {
                    title: '商品sku',
                    key: 'carSkuValue',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.carSkuValue)
                    ])
                 }
                },
                {
                    title: '4S店',
                    key: 'dealerStorefrontName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.dealerStorefrontName)
                    ])
                 }
                },
                {
                    title: '数量',
                    key: 'quantity',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.quantity)
                    ])
                 }
                },
                {
                    title: '单价(元)',
                    key: 'unitPrice',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.unitPrice)
                    ])
                 }
                },
                {
                    title: '订单金额(元)',
                    key: 'orderAmount',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.orderAmount)
                    ])
                 }
                },
                {
                    title: '实付金额(元)',
                    key: 'tradeAmount',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.tradeAmount)
                    ])
                 }
                },
                {
                  title: '创建时间',
                  key: 'createdAt',
                  render: (h, params) => {
                    var str = this.$webapi.gettime('time',(params.row.createdAt)/1000)
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
                {
                  title: '订单状态',
                  key: 'status',
                  render: (h, params) => {
                    var str = ""
                    switch(params.row.status)
                    {
                      case 1:
                        str = "待支付";
                        break;
                      case 2:
                        str = "待发货";
                        break;
                      case 3:
                        str = "已提车";
                        break;
                      case 4:
                          str = "用户确认提车";
                          break;
                      case 5:
                          str = "取消订单";
                          break;
                      case 6:
                          str = "订单关闭";
                          break;
                      case 7:
                          str = "失效";
                          break;
                      case 8:
                          str = "退货";
                          break;
                    }
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
                {
                  title: '备注',
                  key: 'cancelReason',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.cancelReason)
                    ])
                  }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:200,
                    render: (h, params) => {
                        return h('div', [

                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.$router.push({
                                        path:"/sell/detail",
                                        query:{
                                          id:params.row.id,
                                          status:params.row.status
                                        }
                                      })
                                    }
                                }
                            }, '详情'),
                        ]);
                    }
                }
            ],
            data: [],
        }
    },

    mounted() {
       this.orderAmountlist()
       this.accountType = this.$webapi.get('accountType')
    },
    methods: {
      exportOrder () {
        var str = this.$webapi.get("accountType") || 1
        var url = "/order_buyer/dealer_order_export"
        if(str==1){
            url = "/order_buyer/dealer_order_export"
        }else {
           url = "/order_buyer/storefront_order_export"
        }
        var listdata = {
            token:this.$webapi.get('token'),
            status:this.formCustom.status,
            pageNo:this.pageData.pageCurrent,
            pageSize:5000,
            order_type:1,
            telephone:this.formCustom.telephone,
            dealer_storefront_name:this.formCustom.storefrontname,
            order_no:this.formCustom.orderno,
            startTime:this.formCustom.startTime,
            endTime:this.formCustom.endTime
        }
        var _this = this;
        this.$api.get(url,listdata,reset => {
          if (reset) {
            if(reset.codeId==undefined || reset.codeId==null){
               window.location.href = this.$webapi.getobjurl(this.$webapicommon+url,listdata)
            }else{
              _this.$netcode.getApiCode(reset)
            }
          }
          else {
              _this.$netcode.getApiCode(reset)
          }
        })
      },
      storeEmit (e){
        this.formCustom.storefrontname = e.name || ""
      },
      startTime (e) {
        this.formCustom.startTime = e
      },
      endTime (e) {
        this.formCustom.endTime = e
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.orderAmountlist()
      },
      orderAmountlist () {
          var str = this.$webapi.get("accountType") || 1
          if(str==1){
              this.list()
          }else {
             this.shoplist()
          }
      },
      shoplist () {
        var listdata = {
          token:this.$webapi.get('token'),
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          order_type:1,
          telephone:this.formCustom.telephone,
          dealer_storefront_name:this.formCustom.storefrontname,
          order_no:this.formCustom.orderno,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime
        }
        var _this =  this
        this.$api.get('/order_buyer/storefront_order_page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.buyiddata=[];
            _this.data.forEach((val,index,arr)=>{
              _this.buyiddata.push(val.purchaseOrderNo)
            })
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }
          else if(reset.codeId === -9){
            _this.data=[]
            _this.buyiddata=[];
            _this.pageData.totalCount = 0
            _this.pageshow = true
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          order_type:1,
          telephone:this.formCustom.telephone,
          dealer_storefront_name:this.formCustom.storefrontname,
          order_no:this.formCustom.orderno,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime
        }
        var _this =  this
        this.$api.get('/order_buyer/dealer_order_page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.buyiddata=[];
            _this.data.forEach((val,index,arr)=>{
              _this.buyiddata.push(val.purchaseOrderNo)
            })
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }
          else if(reset.codeId === -9){
            _this.data=[]
            _this.buyiddata=[];
            _this.pageData.totalCount = 0
            _this.pageshow = true
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      handleSubmit (name) {
        this.pageshow = false
        this.pageData.pageCurrent = 1
         this.list()
      },
    }
  }
</script>
