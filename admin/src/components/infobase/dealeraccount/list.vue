<template>
    <div id="account">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >基础信息</BreadcrumbItem>
                    <BreadcrumbItem>经销商帐号</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>经销商帐号</h2>
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
                                <FormItem label="账号" prop="name">
                                    <Input type="text" v-model="formCustom.name"></Input>
                                </FormItem>
                            </Col>

                            <Col :xs="24" :sm="24" :md="8" :lg="6" style="text-align:left">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                    <!-- <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
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
                                <Button type="primary" @click="add"> <Icon type="ios-plus-empty"></Icon>添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <account-component-add v-if="addaccountshow" :dearleaddcountshow="addaccountshow" @dealerEmitdata="dealerEmitdata"></account-component-add>
                <account-component-edit @editaccountcomponentdata="editaccountcomponentdata" :editaccountshow="editaccountshow" :editaccountdta="editaccountdta" v-if="editaccountshow"></account-component-edit>
                <!-- <modals :modalbool="modals"></modals> -->
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
    </div>
</template>
<script>
    import Pages from '../../pub/page.vue'
    import accountComponentAdd from './addaccount.vue'
    import accountComponentEdit from './editaccount.vue'
    export default {
        data () {
            return {
                addaccountshow: false,
                editmodal: false,
                editaccountshow:false,
                pageshow:false,
                self: this,
                formCustom: {
                    name: '',
                },
                 ruleCustom: {
                    name: [
                        {trigger: 'blur' }
                    ],

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
                        title: 'ID',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '账号',
                        key: 'salt',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '经销商',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.dealerName)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色',
                        key: 'roleName',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.dealerRoleName)
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
                        width:180,
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
                                }, '注销'),
                            ]);
                        }
                    }
                ],
                objArr:[],
            }
        },
        components:{
            Paging:Pages,
            accountComponentAdd,
            accountComponentEdit
        },
        mounted(){
            this.list();
        },
        methods: {
            add () {
               this.addaccountshow = true
            },
            dealerEmitdata (e) {
               this.addaccountshow = false
               this.list()
            },
            handleRender (val) {
                this.editaccountdta = val;
                this.editaccountshow=true;
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
                    name:_this.formCustom.name
                }
                this.$api.get('/dealer_account/getPage',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        if(data.list.length>0){
                          _this.objArr = data.list
                          _this.pageData.totalCount = data.totalCount
                        }else{
                          _this.objArr=[]
                          _this.pageData.pageCurrent = 1
                          _this.pageData.totalCount = 0
                        }
                        _this.pageshow =  true
                    }
                    else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认注销【'+e.name+'】吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/dealer_account/delete",data,reset => {
                            if (reset.codeId === 1) {
                                _this.list();
                                _this.$Message.info('注销成功');
                                _this.pageshow =  true;
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
                    this.pageshow = false
                    this.pageData.pageCurrent = 1
                    this.list()
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.pageshow = false
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
