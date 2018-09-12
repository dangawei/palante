<template>
    <div id="account">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >基础信息</BreadcrumbItem>
                    <BreadcrumbItem>app版本</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>app版本</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="6">
                                <FormItem label="APP类型">
                                  <Select v-model="formCustom.type">
                                      <Option value="" key="">全部</Option>
                                      <Option value="1" key="1">商城APP</Option>
                                      <Option value="2" key="2">维护APP</Option>
                                  </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12" style="text-align:left">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>

                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                 <!--操作按钮-->
                <div class="tableListOperator">
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div >
                                <Button type="primary" @click="addmodal=true"> <Icon type="ios-plus-empty"></Icon>添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <i-table border :content="self" :columns="columns7" :data="objArr"></i-table>
                        </div>
                    </Col>

                </Row>
                <Row style="text-align:center">
                    <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
                        <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                    </Col>
                </Row>
            </div>
        </div>
        <app-component-add v-if="addmodal" :dearleaddcountshow="addmodal" @Emitdata="Emitdata"></app-component-add>
        <app-component-edit @Emitdata="Emitdata" :editaccountshow="editmodal" v-if="editmodal" :editAPPdata="editAPPdata" ></app-component-edit>
    </div>
</template>
<script>
    import Pages from '../../pub/page.vue'
    import appComponentAdd from './addapp.vue'
    import appComponentEdit from './editapp.vue'
    export default {
        data () {
            return {
                passwordaccount:{},
                accountcomponentshow:false,
                addmodal: false,
                editmodal: false,
                editaccountshow:false,
                pageshow:false,
                self: this,
                editAPPdata:{},
                formCustom: {
                    type: '',
                },
                 ruleCustom: {
                    name: [
                        {trigger: 'blur' }
                    ]
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
                // modals:{
                //     modalBool: false,
                //     successText:""
                // },
                columns7: [
                    {
                        title: '版本',
                        key: 'version',
                    },
                    {
                        title: '升级类型',
                        key: 'appType',
                        render: (h, params) => {
                         //1.手机商城app,2.维护app
                          var str = ""
                            if(params.row.appType == 1){
                                str = "商城APP"
                            }
                            if(params.row.appType == 2){
                                str = "维护APP"
                            }
                            return h('div', [
                                h('span', str)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '下载地址',
                        key: 'url'
                    },
                    {
                        title: 'md5',
                        key: 'md5'
                    },
                    {
                        title: '升级描述',
                        key: 'versionDescribe'
                    },
                    {
                        title: '升级类型',
                        key: 'bugType',
                        render: (h, params) => {
                         //1选择升级,2强制升级
                          var str = ""
                            if(params.row.bugType == 1){
                                str = "选择升级"
                            }
                            if(params.row.bugType == 2){
                                str = "强制升级"
                            }
                            return h('div', [
                                h('span', str)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '创建者',
                        key: 'creatorName',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.creatorName)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '创建时间',
                        key: 'name',
                        render: (h, params) => {
                          var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                          return h('div', [
                              h('span', str)
                        ])
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '修改者',
                        key: 'updatorName',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.updatorName)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '修改时间',
                        key: 'name',
                        render: (h, params) => {
                          var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                          return h('div', [
                              h('span', str)
                        ])
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:280,
                        render: (h, params)=> {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRender(params.row);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
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
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                objArr:[],
            }
        },
        components:{
            Paging:Pages,
            appComponentAdd,
            appComponentEdit
        },
        mounted(){
            this.list();
        },
        methods: {
            cancel () {
                this.removes()
            },
            Emitdata (e) {
              this.addmodal = false
              this.editmodal = false
              this.list()
            },
            password (item) {
                this.accountcomponentshow = true
            },
            handleRender (val) {
                this.editmodal = true
                this.editAPPdata = val

            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editaccountcomponentdata(e){
                this.editaccountshow = e.editaccountshow;
                this.list();
            },
            list () {
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    pageNo:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    type:_this.formCustom.type
                }
                this.$api.get('/mobile_app_version/page',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        _this.objArr = data.list
                        _this.pageData.totalCount = data.totalCount
                        _this.pageshow =  true
                    }else if(reset.codeId === -9){
                        _this.pageData.pageCurrent = 1
                        _this.objArr = []
                        _this.pageData.totalCount = 0
                        _this.pageshow =  true
                    }else{
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            removes () {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.addmodal=false
                  },
                  onCancel: () => {
                     this.addmodal=true
                  }
              })
            },
            remove (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除'+e.version+'吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/mobile_app_version/delete",data,reset => {
                            if (reset.codeId === 1) {
                                _this.list()
                                _this.$Message.info('删除成功')
                                _this.pageshow =  true
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
              this.pageshow =  false
              this.pageData.pageCurrent  = 1
              this.list()
            }
        }
    }
</script>
<style scoped>
   .base-info{
        font-size: 18px;
        text-align: left;
        padding-top: 15px;
        margin-bottom: 26px;
        padding-left: 30px;
        padding-bottom: 15px;
        background-color: #fff;
   }
   .base-color{
        color: #8c8c8c;
   }
    h3{
        font-size: 26px;
        text-align: left;
    }
    .dep-updata{
        text-align: left;
        padding-left: 30px;
        margin-bottom: 15px;
    }
    .content-bottom{
        width: 100%;
    }
    .ivu-form-item-content{
        text-align: left;
    }
</style>
