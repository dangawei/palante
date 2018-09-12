<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>会员管理</BreadcrumbItem>
          <BreadcrumbItem to="/user/company">企业用户认证</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>会员企业列表</h2>
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
                       <FormItem label="状态" >
                         <Select v-model="formCustom.status">
                             <Option value="">全部</Option>
                             <Option value="-1">未提交资料</Option>
                             <Option value="0">待认证</Option>
                             <Option value="1">已认证</Option>
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
    </div>
  </div>
  <auit-component v-if="auitshow" :auitshow="auitshow" :auitdata="auitdata" @editCarcomponent="editCarcomponent"></auit-component>
  </div>
</template>
<script>
  import auitComponent from './auit.vue'
  import Pages from '../../pub/page.vue'
  export default {
    components: {
        Paging:Pages,
        auitComponent
    },
    data () {
        return {
            auitshow:false,
            editdata:'',
            pageshow:false,
            auitdata:{},
            formCustom:{
              name:"",
              status:"0",
              registerType:'',
              userType:"",
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '企业名称',
                    key: 'name'
                },
                {
                    title: '企业图片',
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
                        ]);
                    },
                    className: 'ivu-table-column-center'
                },
                {
                    title: '状态',
                    key: 'img',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.status=="-1"){
                        str = "未提交资料"
                      }else if(params.row.status=="0"){
                        str = "待认证"
                      }else{
                        str = "已认证"
                      }
                      return h('div', [
                          h('span',str)
                    ])
                 }
                },
                {
                    title: '营业执照号',
                    key: 'businessLicenseNo'
                },
                {
                    title: '营业执照图片',
                    key: 'img',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                              attrs: {
                                  src: params.row.businessLicense
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                            })
                        ]);
                    },
                    className: 'ivu-table-column-center'
                },
                {
                    title: '省市区',
                    key: 'address',
                    render: (h, params) => {
                      var str = params.row.provinceName +"-" + params.row.cityName+"-"+ params.row.areaName
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '地址',
                    key: 'address',
                    render: (h, params) => {
                      var str = params.row.address
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '联系人',
                    key: 'contactName'
                },
                {
                    title: '联系人电话',
                    key: 'contactTelephone'
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
                    width:280,
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
                                       this.$router.push({path:"/user/ivew/"+params.row.userAccountId})
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default',
                                    disabled:params.row.status==1
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.auitdata = params.row
                                      this.auitshow = true
                                    }
                                }
                            }, '认证')
                        ]);
                    }
                }
            ],
            data: []
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      areaEmit (e) {

      },
      editCarcomponent (e){
        this.auitshow = false
        this.list()
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          name:this.formCustom.name,
          status:this.formCustom.status,
          registerType:this.formCustom.registerType,
          userType:this.formCustom.userType,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/user_enterprise/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }else if(reset.codeId === -9){
            _this.data = []
            _this.pageData.totalCount = 0
            _this.pageshow = true
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      add () {
        this.addshow=true;
      },
      addshows(e){
        this.addshow=e
        this.list();
      },
      editshows(e){
        this.editshow=e
        this.list();
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要删除【'+params.name+'】吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
       let _this = this
       var url = "/user/delete?token=" + this.$webapi.get('token') + "&userId="+params.id
       this.$api.post(url, null, reset => {
         if (reset.codeId === 1) {
            _this.$Message.success("删除成功!")
            _this.list()
         }else {
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
