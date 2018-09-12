<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>广告管理</BreadcrumbItem>
          <BreadcrumbItem to="/member/list">广告列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>广告列表</h2>
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
                       <FormItem label="标题" prop="name">
                           <Input type="text" v-model="formCustom.name"></Input>
                       </FormItem>
                   </Col>
                    <Col :xs="24" :sm="24" :md="12" :lg="6">
                    <FormItem label="状态" >
                      <Select v-model="formCustom.status" >
                         <Option value="" key="">全部</Option>
                         <Option :value="1" :key="1">有效</Option>
                         <Option :value="-1" :key="-1">无效</Option>
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
    </div></div>
    <add-member-component v-if="addshow" :addshow="addshow" @addshow="addshows"></add-member-component>
    <edit-member-component v-if="editshow" :editshow="editshow" :editdata="editdata" @editshow="editshows"></edit-member-component>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import AddMemberComponent from "./addcomponent.vue"
  import EditMemberComponent from "./editcomponent.vue"
   // import carComponent from "../pub/carmodel.vue"
  export default {
    components: {
        Paging:Pages,
        AddMemberComponent,
        EditMemberComponent
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            editdata:'',
            pageshow:false,
            formCustom:{
              name:"",
              status:"",
              startTime:'',
              endTime:"",
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '标题',
                    key: 'title',

                },
                {
                  title: '图片',
                  key: 'img',
                  render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: params.row.img
                            },
                            style: {
                                width: '40px',
                                height: '40px'
                            }
                        })
                    ])
                  },
                  className: 'ivu-table-column-center'
                },
                {
                    title: '地址',
                    key: 'url',
                    render: (h, params) => {
                    return h('div', [
                        h('a', {
                            attrs: {
                                href: params.row.url
                            },

                        },"查看地址")
                    ])
                  },
                  className: 'ivu-table-column-center'
                },
                {
                    title: '到期时间',
                    key: 'expireAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.expireAt)/1000)
                      return h('div', [
                          h('span', str)
                      ])
                    }
                },

                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.status=="1"){
                        str = "有效"
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
            data: [
            ]
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

      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          title:this.formCustom.name,
          status:this.formCustom.status,
          endTime:this.formCustom.endTime,
          startTime:this.formCustom.startTime,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/advertising/page',listdata,reset => {
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
              content: '<p>确认要删除【'+params.title+'】吗?</p>',
              onOk: () => {
                _this.itemdel(params)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
       let _this = this
       var data = {
          token:this.$webapi.get('token'),
          advertisingId:params.id
       }
       this.$api.post("/advertising/delete", data, reset => {
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
