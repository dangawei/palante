<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >车辆管理</BreadcrumbItem>
          <BreadcrumbItem >车辆列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>车辆列表</h2>
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
                     <FormItem label="vin码" prop="vin">
                          <Input type="text" v-model="formCustom.vin"></Input>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="车牌" prop="licencePlateNumber">
                          <Input type="text" v-model="formCustom.licencePlateNumber"></Input>
                     </FormItem>
                 </Col>
                   <Col :xs="24" :sm="24" :md="8" :lg="6">
                      <FormItem label="车辆型号" prop="value" >
                        <car-model @carmodelselect="carmodelselect01"></car-model>
                      </FormItem>
                    </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                      <FormItem label="sku">
                         <sku-model @skucomponentemit="skucomponentemit" :modelId="formCustom.modelId"></sku-model>
                      </FormItem>
                  </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="动态状态">
                         <Select v-model="formCustom.dynamicStatus" >
                            <Option value="" >全部</Option>
                            <Option value="1" >待提</Option>
                            <Option value="2" >开车</Option>
                            <Option value="3" >停车</Option>
                            <Option value="4" >充电</Option>
                            <Option value="5" >维修</Option>
                         </Select>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="静态状态">
                         <Select v-model="formCustom.staticStatus" >
                            <Option value="" >全部</Option>
                            <Option value="1" >入库</Option>
                            <Option value="2" >出库</Option>
                            <Option value="3" >出库经销商</Option>
                            <Option value="4" >分配门店</Option>
                            <Option value="5" >门店售出</Option>
                            <Option value="6" >门店租出</Option>
                            <Option value="7" >报废</Option>
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
          <!-- <Button type="primary"  @click="add()">新建出库单</Button> -->
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
  <edit-carcomponent v-if="editshow" :editshow="editshow" :cardata="cardata" @editCarcomponent="editCarcomponent01"></edit-carcomponent>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import carModel from '../pub/carmodel.vue'
  import skuModel from '../pub/skucomponent.vue'
  import editCarcomponent from '../pub/carcomponent.vue'
  export default {
    components: {
        Paging:Pages,
        carModel,
        skuModel,
        editCarcomponent
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              skuId:"",
              carModelId:"",
              dealerId:"",
              warehouseId:"",
              stockOutNo:"",
              companyName:"",
              status:"",
              licencePlateNumber:"",
              modelId:"",
              dynamicStatus:"",
              staticStatus:""
            },
            cardata:{},
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
                    title: '车辆属性',
                    key: 'skuValue'
                },
                {
                    title: '车辆vin',
                    key: 'vin'
                },
                {
                    title: '车牌',
                    key: 'licencePlateNumber'
                },
                {
                    title: '电池',
                    key: 'batterNumber'
                },
                {
                    title: '电机',
                    key: 'motorNumber'
                },
                {
                    title: '终端号',
                    key: 'terminalNumber'
                },
                {
                    title: '分公司',
                    key: 'companyName'
                },
                {
                    title: '状态',
                    key: 'staticStatus',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.staticStatus==1){
                          str = "入库"
                      }
                      if(params.row.staticStatus==2){
                          str = "出库,直销售出"
                      }
                      if(params.row.staticStatus==3){
                          str = "出库经销商"
                      }
                      if(params.row.staticStatus==4){
                          str = "待售"
                      }
                      if(params.row.staticStatus==5){
                          str = "门店售出"
                      }
                      if(params.row.staticStatus==6){
                          str = "门店租出"
                      }
                      if(params.row.staticStatus==7){
                          str = "报废"
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
                   title: '操作',
                   key: 'action',
                   align: 'center',
                   width:180,
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
                                       this.cardata = params.row
                                       this.editshow = true
                                   }
                               }
                           }, '修改'),
                       ]);
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
      exportfile () {
         window.location.href = "/static/stockincar.xlsx"
      },
      editCarcomponent01 (e) {
        this.editshow = false
        this.list()
      },
      dearleComponent (e) {
        this.formCustom.warehouseId = e
      },
      wareemitcomponent (e) {
        this.formCustom.dealerId = e
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
      skucomponentemit (e){
         this.formCustom.skuId = e
      },
      carmodelselect01 (e) {
         this.formCustom.modelId = e.id
      },
      list () {
        var listdata = {
          vin:this.formCustom.vin,
          dynamicStatus:this.formCustom.dynamicStatus,
          staticStatus:this.formCustom.staticStatus,
          modelId:this.formCustom.modelId,
          licencePlateNumber:this.formCustom.licencePlateNumber,
          skuId:this.formCustom.skuId,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/car/page',listdata,reset => {
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
     }
    }
  }
</script>
