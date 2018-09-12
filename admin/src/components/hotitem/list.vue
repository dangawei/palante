<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >商品管理</BreadcrumbItem>
          <BreadcrumbItem>热门商品列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>热门商品列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm"></div>
        <!--操作按钮-->
       <div class="tableListOperator">
          <Button type="primary" @click="add()">添加</Button>
       </div>
      <Row>
         <Col span="24">
             <div class="">
                  <Table border :columns="columns1" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div>
    </div>
    <hotitem-component-add @hotitem="hotitem" :itemshow="itemshow" v-if="itemshow"></hotitem-component-add>
  </div>
</template>
<script>
    import Pages from '../pub/page.vue'
    import hotitemComponentAdd from './add.vue'
    export default {
        data () {
            return {
                pageshow:false,
                itemshow:false,
                subform:{
                  title:"",
                  startTime:"",
                  endTime:"",
                  status:""
                },
                ruleCustom:{
                    title: [
                        {trigger: 'blur' }
                    ],
                    startTime: [
                        {trigger: 'blur' }
                    ],
                    endTime: [
                        {trigger: 'blur' }
                    ],
                    status: [
                        {trigger: 'blur' }
                    ],
                },
                edititemdata:{},
                pageData:{
                    totalCount:1,
                    pageCurrent:1,
                    pagesize:10,
                },
                columns1: [
                    {
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: '车型',
                        key: 'modelName'
                    },
                    {
                        title: '车辆型号图片',
                        key: 'modelPic',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                  attrs: {
                                      src: params.row.modelPic
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
                        title: '保证金',
                        key: 'cashDeposit'
                    },
                    {
                        title: '指导价',
                        key: 'modelGuidePrice'
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
                        title: '修改日期',
                        key: 'updatedTime',
                        render: (h, params) => {
                          var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                          return h('div', [
                              h('span', str)
                        ])
                     }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:180,
                        render: (h, params)=> {
                            return h('div',[
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         // size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px',
                                //         color:'#fff'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.edititem(params.row)
                                //         }
                                //     }
                                // }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        // size: 'small'
                                        disabled:params.row.status==-1
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
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
                data: []
            }
        },
        components: {
          hotitemComponentAdd
        },
        created() {
          //do something after mounting vue instance

        },
        mounted(){
          this.list();
        },
        methods: {
            startTime (e){
               this.subform.startTime = e
            },
            endTime (e){
               this.subform.endTime = e
            },
            // 查询
            handleSubmit(){
                this.pageshow = false
                this.list()
            },
            // handleReset (name) {
            //     this.$refs[name].resetFields()
            //     this.pageshow =  false
            // },
            add () {
              this.itemshow = true
            },
            hotitem () {
              this.itemshow = false
              this.list()
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editcomponentdata (e) {
              this.editshow = e.editshow
              this.list()
            },
            accountcomponentdata () {
               this.addshow = false
               this.editshow = false
            },
            addcomponentdata (e) {
              this.addshow = e.addshow
              this.list()
            },
            list () {
              let _this = this
              let data = {
                token:this.$webapi.get('token'),
              }
              this.$api.get('/hot_recommended/list',data,reset => {
                  if (reset.codeId === 1) {
                    let data = reset.resData
                    if(data.length>0){
                     _this.data = data
                     _this.pageshow =  true
                    }else{
                      _this.data =[]
                      _this.pageshow =  true
                    }
                  }else {
                    _this.$netcode.getApiCode(reset)
                 }
              })
            },
            remove (params) {
                let _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除【'+params.name+'】吗?</p>',
                    onOk: () => {
                        _this.delitem(params)
                    },
                    onCancel: () => {

                    }
                });
            },
            delitem (params) {
              let _this = this
              var data = {
                token:this.$webapi.get('token'),
                itemId:parseInt(params.id)
              }
              this.$api.post("/hot_recommended/delete", data, reset => {
                if (reset.codeId === 1) {
                   _this.list()
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
