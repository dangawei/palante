<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >库存管理</BreadcrumbItem>
          <BreadcrumbItem >库存列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>库存列表</h2>
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
                          <warehouse-component @wareemitcomponent="wareemitcomponent" :warehouseID="formCustom.warehouseId" v-if="show"></warehouse-component>
                       </FormItem>
                   </Col>
                   <!-- <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="车辆型号" >
                         <car-model @carmodelselect="carmodelselect01"></car-model>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="车辆sku" prop="stockInNo">
                          <sku-model @skucomponentemit="skucomponentemit" :modelId="formCustom.modelId"></sku-model>
                       </FormItem>
                   </Col> -->
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <div class="">
                       <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                           <Button type="error" @click="back()">返回</Button>
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
  import warehouseComponent from '../../pub/warehouse.vue'
  import carModel from '../../pub/carmodel.vue'
  import skuModel from '../../pub/skucomponent.vue'
  export default {
    components: {
        Paging:Pages,
        warehouseComponent,
        carModel,
        skuModel
    },
    data () {
        return {
            show:false,
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              modelId:"",
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
                    title: '车辆型号',
                    key: 'modelName'
                },
                {
                    title: '属性值',
                    key: 'skuValue'
                },
                {
                    title: '品牌',
                    key: 'brandName'
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
                                     var warehouseId = ""
                                     if(params.row.warehouseId){
                                       warehouseId = params.row.warehouseId
                                     }
                                      this.$router.push({path:"/storage/view/"+params.row.skuId+"/"+params.row.modelName+"/"+params.row.skuValue+"/"+warehouseId})
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
      this.formCustom.modelId = this.$route.params.modelId
      this.formCustom.skuId = this.$route.params.skuId
      this.formCustom.warehouseId = this.$route.params.warehouseId
      this.show = true
      this.list()
    },
    methods: {
      back () {
        this.$router.push({path:"/storage/list/"})
      },
      exportfile () {
         window.location.href = "/static/stockincar.xlsx"
      },
      skucomponentemit (e){
         this.formCustom.skuId = e
      },
      carmodelselect01 (e) {
         this.formCustom.modelId = e.id
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
          modelId:this.formCustom.modelId,
          skuId:this.formCustom.skuId,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/warehouse_storage/warehouse',listdata,reset => {
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
