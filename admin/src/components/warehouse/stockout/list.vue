<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >出库单</BreadcrumbItem>
          <BreadcrumbItem >出库单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>出库单列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="仓库" prop="purchaseOrderNo">
                          <warehouse-component @wareemitcomponent="wareemitcomponent"></warehouse-component>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="经销商名称" prop="dealerId">
                           <dearle-component @dearleEmitComponent="dearleComponent"></dearle-component>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="出库单编号" prop="stockOutNo">
                           <Input type="text" v-model="formCustom.stockOutNo"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="状态">
                         <Select v-model="formCustom.status" >
                            <Option value="" >全部</Option>
                            <Option value="1" >待审核</Option>
                            <Option value="2" >审核通过</Option>
                            <Option value="3" >审核不通过</Option>
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
       <div class="tableListOperator" v-if="accountType==2">
          <Button type="primary"  @click="add()">新建出库单</Button>
          <!-- <Button type="error" @click="exportfile()">下载导入模版</Button> -->
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
  <add-component :addshow="addshow" @emitcomponent="emitcomponent" v-if="addshow"></add-component>
  <edit-component :editshow="editshow" @emitcomponent="emitcomponent" v-if="editshow" :editdata="editdata"></edit-component>
  </div>
</template>
<script>
  import Pages from '../../pub/page.vue'
  import warehouseComponent from '../../pub/warehouse.vue'
  import dearleComponent from '../../pub/dearleComponent.vue'
  import addComponent from './add.vue'
  import editComponent from './edit.vue'
  export default {
    components: {
        Paging:Pages,
        editComponent,
        addComponent,
        warehouseComponent,
        dearleComponent
    },
    data () {
        return {
            accountType:1,
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              dealerId:"",
              warehouseId:"",
              stockOutNo:"",
              companyName:"",
              status:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '出库单',
                    key: 'stockOutNo'
                },
                {
                    title: '经销商',
                    key: 'dealerName'
                },
                {
                    title: '仓库',
                    key: 'warehouseName'
                },
                {
                    title: '数量',
                    key: 'quantity'
                },
                {
                    title: '出库类型',
                    key: 'stockOutType',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.stockOutType==1){
                          str = "出库经销商"
                      }
                      if(params.row.stockOutType==2){
                          str = "出库售出或用于出租"
                      }
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '地址',
                    key: 'address'
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
                    title: '审核时间',
                    key: 'auditedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.auditedAt)/1000)
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
                    title: '审核意见',
                    key: 'auditOpinion',
                    render: (h, params) => {
                      return h('div', [
                        h('span', params.row.auditOpinion)
                    ])
                 }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:180,
                    render: (h, params) => {
                        var disabled = false
                        if(params.row.status!==1){
                            disabled = true
                        }
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
                                       this.$router.push({path:"/stockout/view/"+params.row.id+"/"+params.row.status})
                                    }
                                }
                            }, '详情')
                        ]);
                    }
                }
            ],
            data: [],
            editdata:{}
        }
    },
    mounted() {
      this.accountType = this.$webapi.get("accountType") || 1
      this.list()
    },
    methods: {
      exportfile () {
         window.location.href = "/static/stockincar.xlsx"
      },
      dearleComponent (e) {
        console.log(e)
        this.formCustom.dealerId = e
      },
      wareemitcomponent (e) {
        this.formCustom.warehouseId = e
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      emitcomponent (){
        this.addshow = false,
        this.edithshow = false
        this.list()
      },
      list () {
        var listdata = {
          warehouseId:this.formCustom.warehouseId,
          stockOutNo:this.formCustom.stockOutNo,
          dealerId:this.formCustom.dealerId,
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/warehouse_stockout/page',listdata,reset => {
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
        this.$router.push({path:"/stockout/add"})
     },
     handleSubmit (name) {
       this.pageshow = false
       this.pageData.pageCurrent = 1
       this.list()
    },
    handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
     },
     brandComponentData (e) {
       this.formCustom.brandId = e.id
     },
     carmodelselect (e) {
        this.formCustom.carModelId = e.id
     }
    }
  }
</script>
