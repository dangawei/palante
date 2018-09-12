<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >售后管理</BreadcrumbItem>
          <BreadcrumbItem >还车列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>还车列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="还车类型">
                       <Select v-model="formCustom.returnType" >
                         <Option value="" >全部</Option>
                         <Option value="1" >正常还车</Option>
                         <Option value="2" >非正常还车</Option>
                      </Select>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="换车单号">
                          <Input type="text" v-model="formCustom.listingNo"></Input>
                     </FormItem>
                  </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="门店">
                       <storefrontname @storeEmit="storeEmit"></storefrontname>
                     </FormItem>
                  </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="状态">
                         <Select v-model="formCustom.status" >
                            <Option value="" >全部</Option>
                            <Option value="1">待审核</Option>
                            <Option value="2">审核通过</Option>
                            <Option value="3">审核不通过</Option>
                         </Select>
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
       <div class="tableListOperator">
          <Button type="primary"  @click="add()">添加还车单</Button>
       </div>
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <Table border :columns="columnsdata" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div>
  </div>
  <add-end-car v-if="addshow"></add-end-car>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import storefrontname from '../pub/storefrontname.vue'
  import addEndCar from './addEndCar.vue'
  export default {
    components: {
        Paging:Pages,
        storefrontname,
        addEndCar
    },
    data () {
        return {
            addshow:false,
            pageshow:false,
            formCustom:{
              dealerStorefrontId:"",
              returnType:"",
              listingNo:"",
              status:""
            },
            data:[],
            cardata:{},
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '还车单号',
                    key: 'listingNo'
                },
                {
                    title: '门店',
                    key: 'dealerStorefrontName'
                },
                {
                    title: '还车类型',
                    key: 'returnType',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.returnType==1){
                          str = "正常还车"
                      }
                      if(params.row.returnType==2){
                          str = "非正常还车"
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
                    title: '创建人',
                    key: 'createdAt',
                    render: (h, params) => {
                      var str = params.row.creatorName
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
               },
               {
                   title: '修改人',
                   key: 'updatorName',
                   render: (h, params) => {
                     var str =  params.row.updatorName
                     return h('div', [
                         h('span', str)
                   ])
                }
              },
              {
                  title: '状态',
                  key: 'status',
                  render: (h, params) => {
                    var str = ""
                    if(params.row.status==1){
                        str = "待审核"
                    }
                    if(params.row.status==2){
                        str = "审核通过"
                    }
                    if(params.row.status==3){
                        str = "审核不通过"
                    }
                    return h('div', [
                        h('span', str)
                  ])
               }
              },
               {
                   title: '操作',
                   key: 'action',
                   align: 'center',
                   width:180,
                   render: (h, params) => {
                       return h('div', [
                           h('Button', {
                               props: {
                                   type: 'primary',
                                   size: 'default',
                                   disabled:params.row.status!=1
                               },
                               style: {
                                   marginRight: '5px'
                               },
                               on: {
                                   click: () => {
                                       this.$router.push({path:"/car/view/"+params.row.id})
                                   }
                               }
                           }, '审核'),
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
                                       this.$router.push({path:"/car/view/"+params.row.id})
                                   }
                               }
                           }, '详情'),
                       ]);
                   }
               }
            ],
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      storeEmit (e){
         this.formCustom.dealerStorefrontId = e.id
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      list () {
        var listdata = {
          dealerStorefrontId:this.formCustom.dealerStorefrontId,
          returnType:this.formCustom.returnType,
          listingNo:this.formCustom.listingNo,
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/return_car_listing/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }else if(reset.codeId === -9){
            _this.data = []
            _this.pageData.pageCurrent = 1
            _this.pageData.totalCount = 0
            _this.pageshow = true
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
     add () {
        this.$router.push({path:"/car/add/"})
     },
     handleSubmit (name) {
       this.pageshow = false
       this.pageData.pageCurrent = 1
       this.list()
    }
   }
 }
</script>
