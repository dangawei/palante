<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>开放城市</BreadcrumbItem>
          <BreadcrumbItem>开放城市列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>开放城市列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
      <div class="tableListForm">
        <Form ref="formCustom" :model="formCustom" :label-width="80">
          <Row>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <FormItem label="省份:" prop="name">
                <area-component :level="0" @areaEmit="areaEmit"></area-component>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <FormItem label="城市" prop="name">
                <area-component :level="level" @areaEmit="areaEmit"></area-component>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
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
    <add-member-component v-if="addshow" :addshow="addshow" @addshow="addshows"></add-member-component>
    <edit-member-component v-if="editshow" :editshow="editshow" :editdata="editdata" @editshow="editshows"></edit-member-component>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import AddMemberComponent from "./addopencity.vue"
  import EditMemberComponent from "./editopencity.vue"
  import areaComponent from "../pub/iviewarea.vue"
  export default {
    components: {
        Paging:Pages,
        AddMemberComponent,
        EditMemberComponent,
        areaComponent:areaComponent,
    },
    data () {
      return {
          level:1,
          addshow:false,
          editshow:false,
          editdata:'',
          pageshow:false,
          formCustom:{
            provinceCode:'',
            cityCode:''
          },
          pageData:{
              totalCount:1,
              pageCurrent:1,
              pagesize:10,
          },
          columnsdata: [
              {
                  title: '省份',
                  key: 'provinceName'
              },
              {
                  title: '城市',
                  key: 'cityName'
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
                  width:220,
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
                                      this.editshow=true;
                                      this.editdata=params.row;
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
      areaEmit (e) {
        this.formCustom.provinceCode = e[0].code
        this.formCustom.cityCode = e[1].code
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
          provinceCode:this.formCustom.provinceCode,
          cityCode:this.formCustom.cityCode,
        }
        var _this =  this
        this.$api.get('/open_city/page',listdata,reset => {
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
              content: '<p>确认要删除【'+params.provinceName+params.cityName+'】吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
       let _this = this
       var url = "/open_city/delete?token=" + this.$webapi.get('token') + "&id="+params.id
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
