<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>        
          <BreadcrumbItem>分公司列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>分公司列表</h2>
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
                      <FormItem label="公司名称">
                        <Input v-model="formCustom.name" placeholder="公司名称"></Input>
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
            <Button type="primary" size="large" @click="addsub()">添加</Button>
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
  import Pages from '../pub/page.vue'
  import citycommon from "../pub/citycommon.vue"
  import subcompanyComponentAdd from "./add.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon,
        subcompanyComponentAdd
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            subcompanyshow:false,
            formCustom:{
              name:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '公司名称',
                    key: 'companyName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.companyName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '负责人',
                    key: 'principalsName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.principalsName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '负责人电话',
                    key: 'principalsTelephone',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.principalsTelephone)
                    ])
                 }
                },
                {
                    title: '省',
                    key: 'provinceName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.provinceName)
                    ])
                 }
                },
                {
                    title: '市',
                    key: 'cityName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.cityName)
                    ])
                 }
                },
                {
                    title: '区',
                    key: 'areaName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.areaName)
                    ])
                 }
                },
                {
                    title: '地址',
                    key: 'address',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.address)
                    ])
                 }
                },
                {
                    title: '经度',
                    key: 'longitude',
                    render: (h, params) => {
                      var str = params.row.longitude?params.row.longitude:""
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '纬度',
                    key: 'longitude',
                    render: (h, params) => {
                      var str = params.row.latitude?params.row.latitude:""
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },{
                    title: '创建人',
                    key: 'creatorName',
                    render: (h, params) => {
                      var str = params.row.creatorName
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
                    title: '修改人',
                    key: 'updatorName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.updatorName)
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
                    width:250,
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
                                      this.$router.push({
                                        path:"/subcompany/edit/"+params.row.id
                                      })
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.remove(params.row)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data: [
            ],
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.companyName+'】要删除吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (e) {
       let _this = this
       var url = "/admin_subcompany/delete?token=" + this.$webapi.get('token') + " &id=" + e.id
       this.$api.post(url, null, reset => {
         if (reset.codeId === 1) {
            _this.$Message.success("删除成功!")
            _this.list()
         }else {
           _this.$netcode.getApiCode(reset)
        }
       })
     },
      addsub () {
         this.$router.push({path:"/subcompany/add"})
      },
      getbuyiddata(){

      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          name:this.formCustom.name
        }
        var _this =  this
        this.$api.get('/admin_subcompany/getPage',listdata,reset => {
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
    handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
     }
    }
  }
</script>
