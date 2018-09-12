<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >经销商管理</BreadcrumbItem>
          <BreadcrumbItem>门店列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>门店列表</h2>
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
                       <FormItem label="经销商名称" prop="name">
                          <dearle-component @dearleEmitComponent="dearleEmitComponent"></dearle-component>
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
  import Pages from '../../pub/page.vue'
  import dearleComponent from '../../pub/dearleComponent.vue'
  export default {
    components: {
        Paging:Pages,
        dearleComponent
    },
    data () {
        return {
            accountType:1,
            addshow:true,
            editshow:false,
            pageshow:false,
            formCustom:{
              name:"",
              dealerId:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '门店名称',
                    key: 'name'
                },
                {
                    title: '经销商',
                    key: 'dealerName'
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
                    title: '区',
                    key: 'areaName'
                },
                {
                    title: '公司地址',
                    key: 'address'
                },
                {
                    title: '门店负责人',
                    key: 'principalsName'
                },
                {
                    title: '门店电话',
                    key: 'principalsTelephone'
                },
                {
                    title: '图片地址',
                    key: 'img',
                    render: (h, params) => {
                      return h('div', [
                          h('img', {
                              attrs: {
                                  src: params.row.pic
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                          })
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
                    key: 'creatorName'
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
                    title: '修改创建人',
                    key: 'updatorName'
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     width:150,
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
                //                         this.$router.push({
                //                           path:"/dealer/detail/"+params.row.id,
                //                           query:{
                //                             name:params.row.name
                //                           }
                //                         })
                //                     }
                //                 }
                //             }, '详情'),
                //         ]);
                //     }
                // }
            ],
            data: []
        }
    },
    mounted() {
      this.list()
      this.accountType = this.$webapi.get('accountType')
    },
    methods: {
      dearleEmitComponent (e) {
        this.formCustom.dealerId = e
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          name:this.formCustom.name,
          dealerId:this.formCustom.dealerId,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/dealer_storefront/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          } else {
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
