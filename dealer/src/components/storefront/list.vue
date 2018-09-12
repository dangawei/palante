<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >门店管理</BreadcrumbItem>
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
           <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <Row>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <FormItem label="门店名称" prop="name">
                <Input type="text" v-model="formCustom.name"></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <FormItem label="省市区" prop="status">
                <citycommon @areaEmit="areaEmit" :level="level"></citycommon>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <FormItem >
                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                <!-- <Button type="ghost"   @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
              </FormItem>
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
                    <!-- <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging> -->
                  </div>
             </div>
         </Col>
      </Row>
      <Row style="text-align:center">
        <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
        </Col>
      </Row>
    </div></div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import citycommon from "../pub/iviewarea.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon
    },
    data () {
        return {
          level:2,
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
          // 分页
          pageData:{
              //分页数
              arrPageSize:[5,10,15,20],
              //分页大小
              pagesize:10,
              //总分页数
              pageCount:1,
              //当前页面
              pageCurrent:1,
              //总数
              totalCount:20
          },
          columnsdata: [
              {
                  title: '门店名称',
                  key: 'name'
              },
              {
                  title: '联系人姓名',
                  key: 'principalsName'
              },
              {
                  title: '联系人电话',
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
                  title: '具体地址',
                  key: 'address'
              },
              {
                  title: '经度',
                  key: 'longitude'
              },
              {
                  title: '纬度',
                  key: 'latitude'
              },
              {
                  title: '创建人',
                  key: 'creatorName',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.creatorName)
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
                                    this.$router.push({path:"/storefront/edit/"+params.row.name+"/"+params.row.id+"/"})
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
                                    this.remove(params.row);
                                  }
                              }
                          }, '删除')
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
      list () {
        var listdata = {
          name:this.formCustom.name,
          provinceCode:this.formCustom.provinceCode,
          cityCode:this.formCustom.cityCode,
          areaCode:this.formCustom.areaCode,
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
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      areaEmit(e) {
        // console.log(e);
          this.formCustom.provinceCode = e[0].code
          this.formCustom.cityCode = e[1].code
          this.formCustom.areaCode = e[2].code
      },
      add () {
          this.$router.push({path:"/storefront/add"})
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
       // var url = "/dealer_storefront/delete?token=" + this.$webapi.get('token') + " &id=" + e.id
       var datas={
        token:this.$webapi.get('token'),
        id:e.id
       }
       this.$api.post("/dealer_storefront/delete",datas, reset => {
         if (reset.codeId === 1) {
            _this.$emit('rolecomponentdata',{addroleshow:false})
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
