<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/total/order/">统计</BreadcrumbItem>
          <BreadcrumbItem >订单统计详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>订单统计详情</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="12" :lg="8">
                      <FormItem label="开始时间" >
                        <DatePicker type="date" v-model="formCustom.startTime" placeholder="开始时间" @on-change="startTime"></DatePicker>
                        <DatePicker type="date" v-model="formCustom.endTime" placeholder="结束时间" @on-change="endTime"></DatePicker>
                      </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="订单类型" >
                         <Select v-model="formCustom.order_type">
                             <Option  value="" >全部</Option>
                             <Option  value="1">售卖</Option>
                             <Option  value="2">租车</Option>
                             <Option  value="3">预售</Option>
                         </Select>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="门店名称" >
                          <storefrontname @storeEmit="storeEmit" :shopID="formCustom.dealer_storefront_id"></storefrontname>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <div class="">
                       <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit()">查询</Button>
                       </FormItem>
                     </div>
                   </Col>
               </Row>
           </Form>
       </div>
        <!--操作按钮-->
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <Table border :columns="columnsdata" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div>
  </div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import storefrontname from '../pub/storefrontname.vue'
  export default {
    components: {
        Paging:Pages,
        storefrontname,
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              order_type:"",
              dealer_storefront_id:"",
              startTime:"",
              endTime:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '门店名称',
                    key: 'orderStorefrontName'
                },
                {
                    title: '订单数量',
                    key: 'orderQuantity'
                },
                {
                    title: '订单车数量',
                    key: 'orderCarQuantity'
                },
                {
                    title: '订单金额',
                    key: 'tradeAmount'
                },
                {
                    title: '下单时间',
                    key: 'paidAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.orderDate)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '订单类型',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = ""
                          if(params.row.orderType==1){
                              str = '售卖'
                          }
                          if(params.row.orderType==2){
                              str = '租用'
                          }
                          if(params.row.orderType==3){
                              str = '预售'
                          }
                      return h('div', [
                          h('span', str)
                    ])
                 }
               }
            ],
            data: [],
            editdata:{}
        }
    },
    mounted() {
       this.list()
    },
    methods: {
      handleSubmit () {
        this.pageData.pageCurrent = 1
        this.list()
      },
      list () {
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
          order_type:this.formCustom.order_type,
          dealer_storefront_id:this.formCustom.dealer_storefront_id,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize
        }
        this.$api.get('/order_statistics/day',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
          }else if(reset.codeId === -9){
            _this.data = []
            _this.pageData.totalCount = 0
          }
        })
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.list()
      },
      startTime (e) {
        this.formCustom.startTime = e
      },
      endTime (e) {
        this.formCustom.endTime = e
      },
      storeEmit (e) {
        this.formCustom.dealer_storefront_id = e.id
      }
    }
  }
</script>
