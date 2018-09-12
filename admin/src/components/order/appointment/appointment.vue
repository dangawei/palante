<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem>预约订单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>预约订单列表</h2>
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
                     <FormItem label="经销商">
                          <dearleComponent @dearleEmitComponent="dearleEmitComponent"></dearleComponent>
                     </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="状态">
                        <Select v-model="formCustom.status">
                           <Option value="">全部</Option>
                           <Option value="-1">取消预约</Option>
                           <Option value="1">提交订单</Option>
                           <Option value="2">通知试车</Option>
                           <Option value="3">完成试驾</Option>
                       </Select>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="开始时间" style="text-align:left">
                        <DatePicker type="date" format="yyyy-MM-dd" placeholder="开始时间" v-model="formCustom.startTime" @on-change="startTime"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="结束时间"  style="text-align:left">
                        <div class="fl">
                          <DatePicker type="date" format="yyyy-MM-dd" placeholder="结束时间" v-model="formCustom.endTime" @on-change="endTime"></DatePicker>
                        </div>
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
    </div>
  </div>
  </div>
</template>
<script>
  import Pages from '../../pub/page.vue'
  import dearleComponent from '../../pub/dearleComponent.vue'
  export default {
    components: {
        Paging:Pages,
        dearleComponent
    },
    data () {
        return {
            addshow:false,
            pageshow:false,
            appointmentiddata:[],
            value2:'',
            itemnew:{
              id:"",
              time:""
            },
            formCustom:{
              startTime:"",
              endTime:"",
              status:"",
              dealerId:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '用户名称',
                    key: 'userName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.userName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '用户电话',
                    key: 'userName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.userPhone)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '车辆型号',
                    key: 'phone',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.carModelName)
                    ])
                 }
                },
                // {
                //     title: '车辆sku',
                //     key: 'brandName',
                //     render: (h, params) => {
                //       return h('div', [
                //           h('span', params.row.skuCodeCombination)
                //     ])
                //  }
                // },
                {
                    title: '4S店',
                    key: 'modelName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.dealerStorefrontName)
                    ])
                 }
                },
                {
                    title: '状态',
                    key: 'modelName',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.status == -1){
                        str = "取消预约"
                      }
                      if(params.row.status == 1){
                        str = "提交订单"
                      }
                      if(params.row.status == 2){
                        str = "通知试车"
                      }
                      if(params.row.status == 3){
                        str = "完成试驾"
                      }
                      return h('div', [
                          h('span', str)
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
                    title: '预约时间',
                    key: 'appointmentTime',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.appointmentTime)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '通知试驾时间',
                    key: 'informTime',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.informTime)/1000)
                        return h('div', [
                            h('span', str)
                    ])
                 }
                },
                {
                    title: '完成试驾时间',
                    key: 'drivingTime',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.drivingTime)/1000)
                        return h('div', [
                            h('span', str)
                    ])
                 }
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     width:350,
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'default',
                //                     disabled:params.row.status!==1
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                       this.passshow(params)
                //                     }
                //                 }
                //             }, '通知试车'),
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'default',
                //                     disabled:params.row.status==3
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                       this.$Modal.confirm({
                //                           title: '提示',
                //                           content: '<p>确定是【'+params.row.userName+'】完成试车了吗</p>',
                //                           onOk: () => {
                //                               let _this = this;
                //                               var data = {
                //                                   token:this.$webapi.get('token'),
                //                                   id:params.row.id
                //                               }
                //                               this.$api.post("/appointment_driving/finish",data,reset => {
                //                                   if (reset.codeId === 1) {
                //                                       _this.list()
                //                                       _this.$Message.info('完成试车')
                //                                   }else {
                //                                       _this.$netcode.getApiCode(reset)
                //                                   }
                //                               })
                //                           },
                //                           onCancel: () => {
                //
                //                           }
                //                       })
                //                     }
                //                 }
                //             }, '完成试车'),
                //         ]);
                //     }
                // }
            ],
            data: [],
        }
    },

    mounted() {
      this.list()
    },
    methods: {
      dearleEmitComponent (e) {
          this.formCustom.dealerId = e
      },
      appointment (e) {
      },
      passshow (e) {
        this.itemnew.id = e.row.id
        this.itemnew.time = this.$webapi.gettime('date',(e.row.appointmentTime)/1000)
        this.addshow = true
      },
      startTime (e) {
         this.formCustom.startTime = e
      },
      endTime (e) {
         this.formCustom.endTime = e
      },
      appointmentemit (e) {
        this.addshow = false
        this.list()
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
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime,
          dealerId:this.formCustom.dealerId
        }
        var _this =  this
        this.$api.get('/appointment_driving/getPage',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }else if (reset.codeId === -9) {
            _this.data = []
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
