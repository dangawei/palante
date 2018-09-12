<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem>线下支付列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>线下支付列表</h2>
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
                    <FormItem label="订单状态">
                      <Select v-model="formCustom.status" >
                          <Option value="" >全部</Option>
                          <Option value="1" >新建</Option>
                          <Option value="2" >无效</Option>
                          <Option value="3" >有效</Option>
                      </Select>
                    </FormItem>
                  </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="订单号" prop="order_no">
                        <Input v-model="formCustom.order_no" placeholder="订单号"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="门店名称" prop="order_no">
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
            pageshow:true,
            appointmentiddata:[

            ],
            value2:'',
            formCustom:{
              appointmentOrderNo:'',
              createdAt:'',
              telephone:"",
              order_no:"",
              storefrontId:"",
              status:""
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
                        str = "新建";
                        break;
                      case 2:
                        str = "无效";
                        break;
                      case 3:
                        str = "有效";
                        break;
                    }
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
                {
                  title: '理由',
                  key: 'cancelReason',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.adminConfirmOpinion)
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
                                        path:"/order/outline/view/"+params.row.orderBuyerId+"/" + params.row.status+"/"+ params.row.id
                                      })
                                    }
                                }
                            }, '详情')
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
      storeEmit (e){
        this.formCustom.storefrontId = e.id || ""
      },
      dearleEmitComponent (e){
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
          storefrontId:this.formCustom.storefrontId,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime
        }
        var _this =  this
        this.$api.get('/order_buyer/offline_page',listdata,reset => {
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
