
<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >统计</BreadcrumbItem>
          <BreadcrumbItem >分公司每日订单</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>分公司每日订单</h2>
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
                       <FormItem label="分公司名称" v-if="show">
                          <subcompany-component @subcompanyemit="storeEmit" :subCompanyId="formCustom.subCompanyId"></subcompany-component>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
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
  import Pages from '../../pub/page.vue'
  import subcompanyComponent from '../../pub/subcompany.vue'
  export default {
    components: {
        Paging:Pages,
        subcompanyComponent,
    },
    data () {
        return {
            show:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              order_type:"",
              subCompanyId:'',
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
                    title: '名称',
                    key: 'subcompanyName'
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
                    title: '支付时间',
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
      this.formCustom.startTime = this.$route.query.startTime || ""
      this.formCustom.endTime = this.$route.query.endTime || ""
      if(this.$route.query.order_type){
          this.formCustom.order_type =''+this.$route.query.order_type
      }
      if(this.$route.query.subcompanyId){
          this.formCustom.subCompanyId = parseInt(this.$route.query.subcompanyId)
      }
      if(this.$route.query.order_type==0){
        this.formCustom.order_type = ''
      }
      this.show = true
      this.list()
    },
    methods: {
      list () {
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
          order_type:this.formCustom.order_type,
          admin_subcompany_id:this.formCustom.subCompanyId,
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize
        }
        this.$api.get('/order_statistics/subcompany_day',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
          }else if(reset.codeId === -9){
            _this.data = []
            _this.pageData.totalCount = 0
          }
        })
      },
      handleSubmit (){
        this.pageData.pageCurrent = 1
        this.list()
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
        this.formCustom.subCompanyId = e
      }
    }
  }
</script>
