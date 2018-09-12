<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>会员管理</BreadcrumbItem>
          <BreadcrumbItem to="/member/driver">认证驾驶证</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>认证驾驶证</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
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

  export default {
    components: {
        Paging:Pages
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            editdata:'',
            pageshow:false,
            formCustom:{
              name:"",
              status:1,
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
                    title: '用户名称',
                    key: 'realName'
                },
                {
                    title: '手机号码',
                    key: 'telephone',
                },
                {
                    title: '驾驶证',
                    key: 'driverLicense',
                },
                {
                    title: '驾驶证过期时间',
                    key: 'identityCardMaturity',
                    render: (h, params) => {
                      var str = this.$webapi.gettime("",params.row.driverLicenseUrl/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '驾驶证图片',
                    key: 'img',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                              attrs: {
                                  src: params.row.driverLicenseUrl
                              },
                              style: {
                                  width: '60px',
                                  height: '60px'
                              }
                            })
                        ]);
                    },
                    className: 'ivu-table-column-center'
                },
                {
                    title: '状态',
                    key: 'identityCardApproveStatus',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.driverLicenseApproveStatus=="0"){
                        str = "待审核"
                      }else{
                        str = "无效"
                      }
                      return h('div', [
                          h('span',str)
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
                                        this.$router.push({path:"/member/itemdriverview/"+params.row.userAccountId})
                                    }
                                }
                            }, '详情')
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
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          driverLicenseApproveStatus:0,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/user_information/page',listdata,reset => {
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
