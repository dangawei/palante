<template>
    <div id="department" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>部门管理</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>部门管理</h2>
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
                                <FormItem label="部门名称" prop="name">
                                    <department-component @departmentselect="departmentselect" :department="formCustom.name"></department-component>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="6">
                                <FormItem label="部门编号" prop="name">
                                    <Input v-model="formCustom.departmentNo" placeholder="请输入部门编号"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="6" style="text-align:left">
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
                                <Button type="primary" @click="addmodal=true"> <Icon type="ios-plus-empty"></Icon> 添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    v-model="addmodal"
                    title="添加部门"
                    @on-cancel="cancel"
                    :mask-closable="false"
                    >
                    <department-component-add></department-component-add>
                    <div slot="footer">
                    </div>
                </Modal>

                <department-component-edit @editdepartmentcomponentdata="editdepartmentcomponentdata" :editdepartmentshow="editdepartmentshow" :editdepartmentdata="editdepartmentdata" v-if="editdepartmentshow"></department-component-edit>
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
    </div>

</template>
<script>
    import Modals from '../../pub/modal'
    import Pages from '../../pub/page.vue'
    import DepartmentComponentAdd from './adddepartment.vue'
    import DepartmentComponentEdit from './editdepartment.vue'
    import DepertmentComponent from '../../pub/departmentComponent.vue'
    import {vm} from '../../../js/infobase/vm.js'
    export default {
        data () {
            return {
                pageshow:false,
                addmodal: false,
                typename:'department',
                departmentvalue:'',
                self: this,
                editdepartmentdata:{},
                editdepartmentshow:false,
                formCustom: {
                    departmentNo:'',
                    name: ''
                },
                ruleCustom: {
                    departmentNo: [
                        {trigger: 'blur' }
                    ],
                    name: [
                        {trigger: 'blur' }
                    ]
                },
                // 分页
                pageData:{
                    totalCount:1,
                    //
                    pageCurrent:1,

                    pagesize:10,
                },
                modals:{
                    modalBool: false,
                    successText:""
                },

                columns7: [                   
                    {
                        title: '部门编号',
                        key: 'departmentNo',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.departmentNo)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '部门名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.name)
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
                        key: 'creatorAt',
                        render: (h, params) => {
                            var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                            return h('div', [
                                h('span',str)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        render: (h, params) => {
                            var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                            return h('div', [
                                h('span', str)
                            ]);
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
                                        // size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleRender(params.row)

                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        // size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#fff'
                                    },
                                    on: {
                                        click: () => {
                                            this.removes(params.row)

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
            Modals:Modals,
            Paging:Pages,
            DepartmentComponentAdd:DepartmentComponentAdd,
            DepartmentComponentEdit:DepartmentComponentEdit,
            departmentComponent:DepertmentComponent
        },
        mounted(){
            // this.$api.get('http://localhost:8080/static/json/data.json')
            // var num=0;
            this.list();
        },
        created(){
            vm.$on("addmodal",(datas)=>{
                this.list();
                this.addmodal=datas;
            });
        },
        methods: {
            cancel () {
                this.remove()
            },
            departmentselect (e) {
                this.formCustom.name = e.name;
            },
            handleRender (val) {
                this.editdepartmentdata=val;
                this.editdepartmentshow=true;
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editdepartmentcomponentdata(e){
                this.editdepartmentshow = e.editdepartmentshow;
                this.list();
            },
            list () {
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    pageNo:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    name:this.formCustom.name,
                    departmentNo:this.formCustom.departmentNo,
                }
                this.$api.get('/admin_department/getPage',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        _this.objArr = data.list
                        _this.pageData.totalCount = data.totalCount
                        _this.pageshow =  true
                    }
                    else if(reset.codeId === -9){
                      _this.objArr = []
                      _this.pageData.totalCount = 0
                      _this.pageData.pageCurrent = 1
                      _this.pageshow =  true
                    }
                    else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove () {
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
            removes (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除'+e.name+'吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/admin_department/delete",data,reset => {
                            if (reset.codeId === 1) {
                                _this.pageshow =  false
                                _this.list()
                                _this.$Message.success('删除成功')
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
                this.pageData.pageCurrent = 1
                this.pageshow =  false
                this.list()
            },
            handleReset (name) {
                this.formCustom.name=''
                this.formCustom.departmentNo=''
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
</style>
