<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >仓库管理</BreadcrumbItem>
          <BreadcrumbItem to="/warehouse/list/">仓库列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>仓库列表</h2>
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
                       <FormItem label="名称" prop="warehouse_name">
                           <Input type="text" v-model="formCustom.warehouse_name"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="分公司">
                          <Input type="text" v-model="formCustom.subcompany"></Input>
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
       <!-- <div class="tableListOperator">
          <Button type="primary"  @click="add()" >添加</Button>
       </div> -->
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
  import addComponent from './add.vue'
  import editComponent from './edit.vue'
  export default {
    components: {
        Paging:Pages,
        editComponent,
        addComponent
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:false,
            formCustom:{
              subcompany:"",
              warehouse_name:"",
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '仓库名称',
                    key: 'name'
                },
                {
                    title: '分公司',
                    key: 'subcompanyName'
                },
                {
                    title: '省',
                    key: 'provinceName'
                },
                {
                    title: '市',
                    key: 'cityName'
                },
                {
                    title: '地址',
                    key: 'address'
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
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     width:180,
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'default'
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.editdata = params.row
                //                         this.editshow = true
                //                     }
                //                 }
                //             }, '修改')
                //         ]);
                //     }
                // }
            ],
            data: [],
            editdata:{}
        }
    },
    mounted() {
      var accountType = this.$webapi.get("accountType") || 1
      if(accountType==1){
        this.list()
      }else {
         this.$router.push({path:"/subcompanyhouse/list/"})
      }
    },
    methods: {

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
          subcompany:this.formCustom.subcompany,
          warehouse_name:this.formCustom.warehouse_name,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/warehouse/page',listdata,reset => {
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
