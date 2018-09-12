<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >经销商管理</BreadcrumbItem>
          <BreadcrumbItem>经销商列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>经销商列表</h2>
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
                        <citycommon @areaEmit="areaEmit" :level="1"></citycommon>
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
                   <Col :xs="24" :sm="24" :md="12" :lg="6" v-if="accountType==1" >
                       <FormItem label="分公司名称" prop="status">
                            <subcompanycommon @subcompanyemit="subcompanyemit"></subcompanycommon>
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
  import subcompanycommon from "../pub/subcompany.vue"

  export default {
    components: {
        Paging:Pages,
        citycommon,
        subcompanycommon
    },
    data () {
        return {
            accountType:1,
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
                    title: '经销商名称',
                    key: 'name'
                },
                {
                    title: '采购编号',
                    key: 'abbreviation'
                },
                {
                    title: '分公司名称',
                    key: 'adminSubCompanyName'
                },
                {
                    title: '省市区',
                    key: '',
                    render: (h, params) => {
                      var str = params.row.provinceName + "-" + params.row.areaName + "-" + params.row.cityName
                      return h('div', [
                        h('span', str)
                    ])
                 }
                },
                {
                    title: '具体地址',
                    key: 'address'
                },
                {
                    title: '公司电话',
                    key: 'companyPhone'
                },
                {
                    title: '店实景照',
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
                    width:300,
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
                                          path:"/dealer/editdearle/"+params.row.id,
                                          query:{
                                            name:params.row.name
                                          }
                                        })
                                    }
                                }
                            }, '修改'),
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
                                       this.$router.push({path:"/dealer/editbank/"+params.row.id})
                                    }
                                }
                            }, '完善信息'),
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
                                          path:"/dealer/detail/"+params.row.id,
                                          query:{
                                            name:params.row.name
                                          }
                                        })
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                on: {
                                    click: () => {
                                      this.remove(params.row)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [
                {

                }
            ]
        }
    },
    mounted() {
      this.list()
      this.accountType = this.$webapi.get('accountType')
    },
    methods: {
      subcompanyemit (e) {
        this.formCustom.subCompanyId = e
      },
      areaEmit (e) {
        this.formCustom.provinceCode = ""+e[0].code
        this.formCustom.cityCode = ""+e[1].code
        this.formCustom.areaCode = ""+e[2].code
      },
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
          subCompanyId:this.formCustom.subCompanyId,
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
              content: '<p>确认【'+params.name+'】要删除吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (e) {
       let _this = this
       var url = "/dealer/delete?token=" + this.$webapi.get('token') + " &id=" + e.id
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
     }
    }
  }
</script>
