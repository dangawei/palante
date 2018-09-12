<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >导航管理</BreadcrumbItem>
          <BreadcrumbItem>导航列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>导航列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="经销商名称" prop="name">
                           <Input type="text" v-model="formCustom.name"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="联系人姓名" prop="contactName">
                           <Input type="text" v-model="formCustom.contactName"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="省市区" prop="status">
                       <Row>
                           <Col span="7">
                             <Select v-model="formCustom.provinceCode">
                                <Option value="" key="">全部</Option>
                                <Option value="1" key="1">有效</Option>
                                <Option value="-1" key="-1">无效</Option>
                            </Select>
                          </Col>
                           <Col span="2">-</Col>
                           <Col span="7">
                             <Select v-model="formCustom.cityCode">
                                 <Option value="" key="">全部</Option>
                                 <Option value="1" key="1">有效</Option>
                                 <Option value="-1" key="-1">无效</Option>
                             </Select>
                           </Col>
                           <Col span="1">-</Col>
                           <Col span="7">
                             <Select v-model="formCustom.areaCode">
                                 <Option value="" key="">全部</Option>
                                 <Option value="1" key="1">有效</Option>
                                 <Option value="-1" key="-1">无效</Option>
                             </Select>
                           </Col>
                       </Row>
                     </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="公司电话" prop="companyPhone">
                           <Input type="text" v-model="formCustom.companyPhone"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="状态" prop="status">
                         <Select v-model="formCustom.status">
                             <Option value="" key="">全部</Option>
                             <Option value="1" key="1">有效</Option>
                             <Option value="-1" key="-1">无效</Option>
                         </Select>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <div class="">
                       <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                           <!--  -->
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
                  <Table :columns="columnsdata" :data="data"></Table>
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
  export default {
    components: {
        Paging:Pages
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
              status:"",
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '经销商名称',
                    key: 'name'
                },
                {
                    title: '公司地址',
                    key: 'address'
                },
                {
                    title: '公司电话',
                    key: 'companyPhone'
                },
                {
                    title: '图片地址',
                    key: 'img',
                    render: (h, params) => {
                      return h('div', [
                          h('img', {
                              attrs: {
                                  src: params.row.icon
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
                    title: '联系人',
                    key: 'contactName'
                },
                {
                    title: '联系电话',
                    key: 'contactTelephone'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.status == 1){
                       str = "有效"
                      }else {
                        str = "无效"
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

                                    }
                                }
                            }, '修改'),
                            
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
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          name:this.formCustom.name,
          companyPhone:this.formCustom.companyPhone,
          contactName:this.formCustom.contactName,
          provinceCode:this.formCustom.provinceCode,
          cityCode:this.formCustom.cityCode,
          areaCode:this.formCustom.areaCode,
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/dealer/getPage',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          } else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      add () {
          this.$router.push({path:"/dealer/addlist"})
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.row.name+'】要删除吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
       let _this = this
       // var url = "/admin_role/add?token=" + this.$webapi.get('token') + " &name=" + this.formValidate.name + "&remark="+this.formValidate.remark
       let datas={
          token:this.$webapi.get('token'),
          name:this.formValidate.name,
          remark:this.formValidate.remark
       }
       this.$api.post("/admin_role/add", datas, reset => {
         if (reset.codeId === 1) {
            _this.$emit('rolecomponentdata',{addroleshow:false})
         }else {
           _this.$netcode.getApiCode(reset)
        }
       })
     },
     handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                 this.list()
            } else {
                this.$Message.error('Fail!')
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
     }
    }
  }
</script>
