<template>
    <div id="account">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >基础信息</BreadcrumbItem>
                    <BreadcrumbItem>账号管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>账号管理</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="4">
                                <FormItem label="账号">
                                    <Input type="text" v-model="formCustom.name"></Input>
                                </FormItem>
                            </Col>

                            <Col :xs="24" :sm="24" :md="12" :lg="12" style="text-align:left">
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                    <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
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
                                <Button type="primary" @click="addmodal=true"> <Icon type="ios-plus-empty"></Icon> 新建</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    v-model="addmodal"
                    title="新建"
                    >
                    <account-component-add></account-component-add>
                    <div slot="footer" style="display:none">
                    </div>
                </Modal>

                <account-component-edit @editaccountcomponentdata="editaccountcomponentdata" :editaccountshow="editaccountshow" :editaccountdta="editaccountdta" v-if="editaccountshow"></account-component-edit>
                <modals :modalbool="modals"></modals>
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
        <account-component-add @addaccountcomponentdata="addaccountcomponentdata" :addaccountshow="addaccountshow" v-if="addaccountshow"></account-component-add>
        <account-component-edit @editaccountcomponentdata="editaccountcomponentdata" :editaccountshow="editaccountshow" v-if="addaccountshow" :editaccountdata="editaccountdata"></account-component-edit>
    </div>
</template>
<script>
    import Pages from '../../pub/page.vue'
    import accountComponentAdd from './addaccount.vue'
    import accountComponentEdit from './editaccount.vue'
    export default {
        data () {
            return {
                addmodal: false,
                editmodal: false,
                editaccountshow:false,
                pageshow:false,
                formCustom: {
                    name: '',
                },
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[5,10,15,20],
                    //分页大小
                    pagesize:5,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:20
                },
                modals:{
                    modalBool: false,
                    successText:""
                },
                columns7: [
                    {
                        title: '编号',
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
                                h('span', params.row.salt)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '密码',
                        key: 'password',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.password)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '部门id',
                        key: 'adminDepartmentId',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.adminDepartmentId)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色id',
                        key: 'adminRoleId',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.adminRoleId)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
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
                                        size: 'small'
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
                                }, '注销/启用'),
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
            console.log(this.$webapi.get('token'));
        },
        created(){
            vm.$on("addmodal",(datas)=>{
                this.list();
                this.addmodal=datas;
            });
        },

        methods: {
            handleRender (val) {
                this.editaccountdta=val;
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
                        console.log(data);
                        _this.objArr = data.list
                        _this.pageData.totalCount = data.totalCount
                        _this.pageshow =  true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除'+e.name+'吗?</p>',
                    onOk: () => {
                        let _this = this;
                        // let url="/admin_account/update?token=" + this.$webapi.get('token') + "&id=" + e.id+"&status=-1";
                        let datas={
                            token:this.$webapi.get('token'),
                            id:e.id,
                            status:-1
                        }
                        this.$api.post("/admin_account/update",datas,reset => {
                            if (reset.codeId === 1) {
                                _this.list();
                                _this.$Message.info('删除成功');
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
                    let _this = this
                    let data = {
                        token:this.$webapi.get('token'),

                        name:this.formCustom.name,
                        pageNo:_this.pageData.pageCurrent,
                        pageSize:_this.pageData.pagesize,
                    }
                    this.$api.get('/admin_account/getPage',data,reset => {
                        if (reset.codeId === 1) {
                            let data = reset.resData
                            console.log(data.list);
                            _this.objArr = data.list
                            _this.pageData.totalCount = data.totalCount
                            _this.pageshow =  true
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
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
