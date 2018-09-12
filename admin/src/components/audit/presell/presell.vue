<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>审核管理</BreadcrumbItem>
          <BreadcrumbItem>预售订单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>预售订单列表</h2>
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
                      <FormItem label="账号" prop="appointmentOrderNo">
                        <Input v-model="formCustom.telephone" placeholder="账号"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="订单号" prop="order_no">
                        <Input v-model="formCustom.order_no" placeholder="订单号"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="订单状态" prop="order_no">
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
                      <FormItem label="经销商名称" prop="order_no">
                          <dearleComponent @dearleEmitComponent="dearleEmitComponent" :objAny="1"></dearleComponent>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="分公司名称" prop="order_no">
                            <subComponent @subcompanyemit="subcompanyemit"></subComponent>
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
  import dearleComponent from '../../pub/dearleComponent.vue'
  import subComponent from "../../pub/subcompany.vue"
  export default {
    components: {
        Paging:Pages,
        dearleComponent,
        subComponent
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:true,
            appointmentiddata:[

            ],
            value2:'',
            formCustom:{
              appointmentOrderNo:'',
              createdAt:'',
              telephone:"",
              order_no:"",
              dealer_name:"",
              status:"",
              adminSubcompanyId:""
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
                {
                    title: '图片地址',
                    key: 'carSkuPicUrl',
                    render: (h, params) => {
                      return h('div', [
                          h('img', {
                              attrs: {
                                  src: params.row.carSkuPicUrl
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                          })
                    ])
                 }
                },
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
                  title: '经销商名称',
                  key: 'dealerName',
                  render: (h, params) => {
                    return h('div', [
                      h('span', params.row.dealerName)
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
                    title: '定金(元)',
                    key: 'unitPrice',
                    render: (h, params) => {
                      return h('div', [
                          h('span', (params.row.orderAmount/params.row.quantity).toFixed(2))
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
                    var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
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
                                        path:"/presell/detail",
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
      this.list()
    },
    methods: {
      subcompanyemit (e) {
        this.formCustom.adminSubcompanyId = e
      },
      exportOrder () {
        var listdata = {
            token:this.$webapi.get('token'),
            status:this.formCustom.status,
            pageNo:1,
            pageSize:5000,
            order_no:this.formCustom.order_no,
            dealer_name:this.formCustom.dealer_name,
            startTime:this.formCustom.startTime,
            adminSubcompanyId:this.formCustom.adminSubcompanyId,
            endTime:this.formCustom.endTime,
            order_type:3,
            telephone:this.formCustom.telephone
        }
        var _this = this;
        this.$api.get('/order_buyer/page_export',listdata,reset => {
          if (reset) {
            if(reset.codeId==undefined || reset.codeId==null){
                window.location.href = this.$webapi.getobjurl(this.$webapicommon+"/order_buyer/page_export",listdata)
            }else{
              _this.$netcode.getApiCode(reset)
            }
          }
          else {
              _this.$netcode.getApiCode(reset)
          }
        })
      },
      dearleEmitComponent (e) {
        this.formCustom.dealer_name = e.name
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
          this.list()
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          order_no:this.formCustom.order_no,
          dealer_name:this.formCustom.dealer_name,
          adminSubcompanyId:this.formCustom.adminSubcompanyId,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime,
          order_type:3,
          telephone:this.formCustom.telephone
        }
        var _this =  this
        this.$api.get('/order_buyer/page',listdata,reset => {
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
            _this.data = []
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
