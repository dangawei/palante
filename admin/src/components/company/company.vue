<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >供应商管理</BreadcrumbItem>
          <BreadcrumbItem>供应商列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>供应商列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
         <Form ref="formCustom" :model="formCustom"  :label-width="80">
             <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="供应商名称" prop="name">
                         <Input type="text" v-model="formCustom.name"></Input>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                   <FormItem label="省市区" prop="status">
                      <citycommon @areaEmit="areaEmit" :level="1"></citycommon>
                   </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="开始时间" >
                       <DatePicker type="date" placeholder="开始时间" @on-change="startTime"></DatePicker>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="6">
                     <FormItem label="结束时间" >
                        <DatePicker type="date" placeholder="结束时间" @on-change="endTime"></DatePicker>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                   <div class="">
                     <FormItem style="margin-left: -70px;text-align:left">
                         <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                         <!-- <Button type="ghost"   @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
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
                  <i-table border :content="self" :columns="columnsdata" :data="objArr"></i-table>
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
  import citycommon from "../pub/iviewarea.vue"
  import Bus from "../../js/Bus.js"
  export default {
    components: {
        Paging:Pages,
        citycommon
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            self:this,
            realname:'',
            formCustom:{
              name:"",
              provinceCode:"",
              cityCode:"",
              areaCode:"",
              startTime:"",
              endTime:""
            },
            uleCustom: {
                companyName: [
                    {trigger: 'blur' }
                ]
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '供应商名称',
                    key: 'name',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.name)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '联系人',
                    key: 'contactName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.contactName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '联系人手机号',
                    key: 'contactTelephone',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.contactTelephone)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '供应商地址',
                    key: 'address',
                    render: (h, params) => {
                      let e=params.row.provinceName+params.row.cityName+params.row.areaName+params.row.address
                      return h('div', [
                          h('span', e)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '营业执照号',
                    key: 'businessLicenseNo',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.businessLicenseNo)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '营业执照图片',
                    key: 'businessLicense',
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
                    ])
                 }
                },

                {
                    title: '公司图片',
                    key: 'pic',
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
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                      let d="";
                      if (params.row.status==1) {
                          d="正常"
                      }else{
                          d="不正常"
                      }
                      return h('div', [
                          h('span', d)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:160,
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
                                        this.handleRender(params.row)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                on: {
                                    click: () => {
                                       this.remove(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            objArr: []
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      startTime (e){
         this.formCustom.startTime = e
      },
      endTime (e){
         this.formCustom.endTime = e
      },
      areaEmit (e) {
        this.formCustom.provinceCode = e[0].code
        this.formCustom.cityCode = e[1].code
        this.formCustom.areaCode = e[2].code
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            name:this.formCustom.name,
            provinceCode:this.formCustom.provinceCode,
            cityCode:this.formCustom.cityCode,
            areaCode:this.formCustom.areaCode,
            startTime:this.formCustom.startTime,
            endTime:this.formCustom.endTime,
            pageNo:_this.pageData.pageCurrent,
            pageSize:_this.pageData.pagesize,
        }
        this.$api.get('/enterprise/getPage',data,reset => {
            if (reset.codeId === 1) {
                let data = reset.resData
                _this.objArr = data.list
                _this.pageData.totalCount = data.totalCount
                _this.pageshow =  true
            }else if(reset.codeId === -9){
              _this.objArr = []
              _this.pageData.totalCount = 0
              _this.pageshow =  true
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      getName(e){
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            adminAccountId:e
        }
        this.$api.get('/admin_account_information/getOneByAdminAccountId',data,reset => {
            if (reset.codeId === 1) {
                let data = reset.resData
                _this.realname=data.realName;
            }else {
                // _this.$netcode.getApiCode(reset)
            }
        })
      },
      add () {
          this.$router.push({path:"/company/addcompany"})
      },
      handleRender (val) {
          this.$router.push({
            name:'EditCompany',
            params:val
          })
      },
      remove (e) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+e.row.name+'】要删除吗?</p>',
              onOk: () => {
                  let _this = this;
                  let url="/enterprise/delete?token=" + this.$webapi.get('token') + "&id=" + e.row.id;
                  this.$api.post(url,null,reset => {
                      if (reset.codeId === 1) {
                          _this.list()
                          _this.$Message.info('修改成功');
                          _this.pageshow =  false;
                      }else {
                          _this.$netcode.getApiCode(reset)
                      }
                  })
              },
              onCancel: () => {

              }
          });

      },
     handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                 this.pageData.pageCurrent = 1
                 this.pageshow = false
                 this.list()
            } else {
                this.$Message.error('Fail!')
            }
        })
    }
  }
}
</script>
