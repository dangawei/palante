<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >商品管理</BreadcrumbItem>
          <BreadcrumbItem to="/item/list">商品列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>商品列表</h2>
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
                       <FormItem label="名称" prop="name">
                           <Input type="text" v-model="formCustom.name"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="车型">
                          <car-component @carmodelselect="carmodelselect"></car-component>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="品牌">
                          <brand-component @brandComponentData="brandComponentData"></brand-component>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="状态" prop="itemStatus">
                         <Select v-model="formCustom.itemStatus">
                             <Option value="" key="">全部</Option>
                             <Option value="1" key="1">等待审核</Option>
                             <Option value="2" key="2">审核不通过</Option>
                             <Option value="3" key="3">审核通过</Option>
                             <Option value="4" key="4">上架</Option>
                             <Option value="5" key="5">下架</Option>
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
          <Button type="primary"  @click="add()">添加</Button>
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
    </div></div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import citycommon from "../pub/iviewarea.vue"
  import brandComponent from "../pub/brandComponent.vue"
   import carComponent from "../pub/carmodel.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon,
        brandComponent,
        carComponent
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            formCustom:{
              name:"",
              companyPhone:"",
              contactName:"",
              provinceCode:"",
              cityCode:"",
              areaCode:"",
              status:"1",
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '车辆型号',
                    key: 'modelName'
                },
                {
                    title: '商品简介',
                    key: 'brief'
                },
                {
                    title: '商品状态',
                    key: 'companyPhone',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.itemType=="1"){
                          str="租售"
                      }else{
                        str="预售"
                      }
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '保证金',
                    key: 'cashDeposit'
                },
                {
                    title: '订金',
                    key: 'subscription'
                },
                {
                    title: '商品显示',
                    key: 'img',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.status=="1"){
                        str = "有效"
                      }else{
                        str = "无效"
                      }
                      return h('div', [
                          h('span',str)
                    ])
                 }
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                      var str = this.$netcode.getItem(params.row.itemStatus)
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
                        var str = false
                        if(params.row.itemStatus==4 || params.row.itemStatus==3){
                          str = true
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
                                        this.$router.push({path:"/item/view/"+params.row.id})
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default',
                                    disabled:str
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({path:"/item/edititemlist/"+params.row.id})
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            data: [
                {
                  name: '',
                  receiptContactTelephone: '',
                  receiptContactName:'',
                  receiptContactName:'',
                  payee:"",
                  bankCard:"",
                  depositBank:"",
                  registrationumber:"",
                  enterprisename:"杭州右边数字科技有限公司",
                  address:"",
                  contactname:"",
                  icon:"",
                  provinceCode:"",
                  cityCode:"",
                  areaCode:""
                }
            ]
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      areaEmit (e) {

      },
      endcommoncity (e) {
        this.formCustom.provinceCode = e.provinceCode[0].value,
        this.formCustom.cityCode = e.cityCode[0].value,
        this.formCustom.areaCode = e.areaCode[0].value
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          name:this.formCustom.name,
          itemStatus:this.formCustom.itemStatus,
          brandId:this.formCustom.brandId,
          carModelId:this.formCustom.carModelId,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/item/page',listdata,reset => {
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
          this.$router.push({path:"/item/add"})
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
