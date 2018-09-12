<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >入库单</BreadcrumbItem>
          <BreadcrumbItem >入库单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>入库单列表</h2>
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
                       <FormItem label="采购单编号" prop="purchaseOrderNo">
                           <Input type="text" v-model="formCustom.purchaseOrderNo"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="入库单编号" prop="stockInNo">
                           <Input type="text" v-model="formCustom.stockInNo"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="公司名（车辆厂商）">
                          <Input type="text" v-model="formCustom.companyName"></Input>
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
          <Button type="primary"  @click="add()">新建入库单</Button>
          <Button type="error" @click="exportfile()">下载导入模板</Button>
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
  import addComponent from './add.vue'
  import editComponent from './edit.vue'
  export default {
    components: {
        Paging:Pages,
        editComponent,
        addComponent,
        warehouseComponent
    },
    data () {
        return {
            accountType:1,
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              subcompany:"",
              purchaseOrderNo:"",
              warehouseId:"",
              stockInNo:"",
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
                    title: '入库单',
                    key: 'stockInNo'
                },
                {
                    title: '分公司',
                    key: 'companyName'
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
                    title: '采购单号',
                    key: 'purchaseOrderNo'
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
                    title: '入库时间',
                    key: 'stockInDate',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.stockInDate)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '创建人',
                    key: 'creatorName',
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
                    title: '修改人',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
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
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'default',
                            //         disabled:disabled
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.editdata = params.row
                            //             this.editshow = true
                            //         }
                            //     }
                            // }, '修改'),
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
                                       this.$router.push({path:"/stockin/view/"+params.row.id+"/"+params.row.status})
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
          purchaseOrderNo:this.formCustom.purchaseOrderNo,
          warehouseId:this.formCustom.warehouseId,
          stockInNo:this.formCustom.stockInNo,
          companyName:this.formCustom.companyName,
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/warehouse_stockin/page',listdata,reset => {
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
       this.addshow = true
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
