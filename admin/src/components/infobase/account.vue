<template>
    <div id="department" style="width:100%">
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

        <div class="page-view allm20">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <Row>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="编号" prop="number">
                            <Input type="text" v-model="formCustom.number"></Input>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="账号" prop="account">
                            <Input type="text" v-model="formCustom.account"></Input>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="姓名" prop="name">
                            <Input type="text" v-model="formCustom.name"></Input>
                        </FormItem>
                    </Col>
                    <Col :xs="18" :sm="18" :md="6" :lg="6">
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="dep-updata">
                        <Button type="primary" @click="modal1=true"> 十 新建</Button>
                    </div>
                </Col>
            </Row>
            <Modal
                v-model="modal1"
                title="新建"
                >
                <up-data :typename="typename"></up-data>
                <div slot="footer" style="display:none">
                </div>
            </Modal>

            <modals :modalbool="modals"></modals>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <i-table border :content="self" :columns="columns7" :data="objArr"></i-table>
                </Col>
            </Row>
            <Row justify="center">
                <Col :xs="24" :sm="24" :md="16" :lg="16">
                    <paging></paging>
                </Col>
            </Row>
        </div>
    </div>

</template>
<script>
    import Modals from '../pub/modal'
    import Pages from '../pub/page.vue'
    import upData from '../pub/updata.vue'
    import Change from '../pub/change.vue'
    import {vm} from '../../js/infobase/vm.js'
    export default {
        data () {
            return {
                modal1: false,
                typename:'account',
                idchange:'',
                namechange:'',
                accountchange:'',
                pwdchange:'',
                phonechange:'13175132526',
                depchange:'会员部',
                rolechange:'经理',
                self: this,
                formCustom: {
                    number: '',
                    name: '',
                    account:'',
                },
                ruleCustom: {
                    number: [
                        {trigger: 'blur' }
                    ],
                    name: [
                        {trigger: 'blur' }
                    ],
                    account: [
                        {trigger: 'blur' }
                    ]
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
                                h('strong', params.row.id)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '账号',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.account)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '密码',
                        key: 'pwd',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.pwd)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.phone)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '部门',
                        key: 'dep',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.dep)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '角色',
                        key: 'role',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.role)
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
                                            this.handleRender(params.index)

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
                                            this.remove(params.index)

                                        }
                                    }
                                }, '注销/启用'),
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        id: 501,
                        name: '技术部',
                        account:'201',
                        pwd:'111',
                        phone:'13175132526',
                        dep:'会员部',
                        role:'经理',
                    },
                    {
                        id: 502,
                        name: '运营部',
                        account:'201',
                        pwd:'111',
                        phone:'13175132526',
                        dep:'会员部',
                        role:'经理',
                    },
                    {
                        id: 503,
                        name: '运营部',
                        account:'201',
                        pwd:'111',
                        phone:'13175132526',
                        dep:'会员部',
                        role:'经理',
                    },
                    {
                        id: 504,
                        name: '运营部',
                        account:'201',
                        pwd:'111',
                        phone:'13175132526',
                        dep:'会员部',
                        role:'经理',
                    },
                    {
                        id: 505,
                        name: '运营部',
                        account:'201',
                        pwd:'111',
                        phone:'13175132526',
                        dep:'会员部',
                        role:'经理',
                    },
                ],
                objArr:[],
            }
        },
        components:{
            Modals:Modals,
            Paging:Pages,
            upData:upData,
        },
        mounted(){
            // this.$api.get('http://localhost:8080/static/json/data.json')
            // var num=0;
            for (var i=0; i < this.data6.length;i++) {
                if (i<=4) {
                    this.objArr.push(this.data6[i]);
                }

            }
        },
        created(){
            vm.$on("bool",(datas)=>{
                return this.modal1=datas;
            });
            vm.$on("data-s",(data)=>{
                this.objArr=[];
                this.objArr=data;
            });
            vm.$on("forms",(datas)=>{
                // console.log(datas);
            });
        },
        computed(){

        },
        methods: {
            handleRender (index) {
                this.$Modal.confirm({
                    title:"修改",
                    render: (h) => {
                        return h('div',[
                            h(Change,{
                                props:{
                                    typename:'account',
                                    id:this.objArr[index].id,
                                    account:this.objArr[index].account,
                                    pwd:this.objArr[index].pwd,
                                    name:this.objArr[index].name,
                                    phone:this.objArr[index].phone,
                                    dep:this.objArr[index].dep,
                                    role:this.objArr[index].role,

                                },
                                on:{
                                    idvalue:(val)=>{
                                        this.idchange=val;
                                    },
                                    namevalue:(val)=>{
                                        this.namechange=val;
                                    },
                                    accountvalue:(val)=>{
                                        console.log(val);
                                        this.accountchange=val;
                                    },
                                    pwdvalue:(val)=>{
                                        console.log(val);
                                        this.pwdchange=val;
                                    },
                                    phonevalue:(val)=>{
                                        console.log(val);
                                        this.phonechange=val;
                                    },
                                    depvalue:(val)=>{
                                        console.log(val);
                                        this.depchange=val;
                                    },
                                    rolevalue:(val)=>{
                                        console.log(val);
                                        this.rolechange=val;
                                    },
                                }
                            }) ,
                        ])
                    }
                })
            },

            remove (index) {
                // this.$api.post(url,params)
                // .then((data)=>{
                //     if (data.data) {}
                //     this.modals.modalBool=true;
                //     this.modals.modalText="新增成功!";
                // })
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要注销或者启用吗?</p>',
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        this.objArr.splice(index, 1);
                    },
                    onCancel: () => {

                    }
                });

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // var params={
                        //     number:this.formCustom.number,
                        //     name:this.formCustom.name
                        // };
                        // for(var i=0;i<this.objArr.length;i++){
                        //     // console.log(this.objArr[i].id);
                        //     if (this.objArr[i].id==this.formCustom.number) {
                        //         this.objArr=[];
                        //         this.objArr.push(this.objArr[i]);

                        //     }else{

                        //     }
                        // }


                        // this.$api.post(url,params)
                        // .then((data)=>{
                        //     if (data.data) {}
                        //     this.modals.modalBool=true;
                        //     this.modals.modalText="新增成功!";
                        // })

                    } else {
                        // this.modals.modalBool=true;
                        // this.modals.modalText="没找到结果!";
                    }
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
    .ivu-modal-confirm-footer{
        display: none;
    }
    .ivu-modal-footer{
        display: none;
    }
</style>
