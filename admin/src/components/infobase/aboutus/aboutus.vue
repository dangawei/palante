<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>关于我们</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>关于我们列表</h2>
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
                                <FormItem label="标题" prop="name">
                                    <Input type="text" v-model="formCustom.name"></Input>
                                </FormItem>
                            </Col><Col :xs="24" :sm="24" :md="8" :lg="6">
                                <FormItem label="状态" prop="status">
                                    <Select v-model="formCustom.status" @on-change="changesel(formCustom.status)">
                                        <Option :value="1" :key="1">正常</Option>
                                        <Option :value="-1" :key="-1">不正常</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12" style="text-align:left">
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
                                <Button type="primary" @click="addmodal"> <Icon type="ios-plus-empty"></Icon>添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>

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
    // import AboutusComponentAdd from './addaboutus.vue'
    import AboutusComponentEdit from './editaboutus.vue'
    import {vm} from '../../../js/infobase/vm.js'
    export default {
        data () {
            return {
                pageshow:false,
                addaboutusshow: false,
                editaboutusshow:false,
                typename:'Aboutus',
                idchange:'',
                namechange:'',
                self: this,
                formCustom: {
                    name: '',
                    status:1,
                },
                ruleCustom: {
                    name: [
                        {trigger: 'blur' }
                    ]
                },

                modals:{
                    modalBool: false,
                    successText:""
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
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.title)
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
                    // {
                    //     title: '创建者',
                    //     key: 'creatorName',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('span', params.row.creatorName)
                    //         ]);
                    //     },
                    //     className:'ivu-table-column-center'
                    // },
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
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let d="";
                            if (params.row.status==1) {
                                d="正常"
                            }else{
                                d="不正常"
                            }
                            return h('div', [
                                h('span', d)
                            ]);
                        },
                        className:'ivu-table-column-center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:250,
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
                                            this.handleDetail(params.row)
                                        }
                                    }
                                }, '详情'),
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
            Modals:Modals,
            Paging:Pages,
            // AboutusComponentAdd:AboutusComponentAdd,
            // AboutusComponentEdit:AboutusComponentEdit
        },
        mounted(){
            this.list();
        },
        created(){
            // vm.$on("addmodal",(datas)=>{
            //     this.list();
            //     this.addaboutusshow=datas;
            // });
        },
        methods: {
            addmodal(){
                this.$router.push("/aboutus/addaboutus")
            },
            handleRender (val) {
                this.$router.push({path:"/aboutus/editaboutus/"+val.id})
            },
            handleDetail(e){
                this.$router.push({
                    path:"/aboutus/detail/"+e.id,
                    query:{
                        title:e.title
                    }
                })
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editaboutuscomponentdata(e){
                this.editaboutusshow = e.editaboutusshow;
                this.list();
            },
            list () {
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    pageNo:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    title:this.formCustom.name,
                    status:this.formCustom.status,
                }
                this.$api.get('/about_us/getPage',data,reset => {
                    if (reset.codeId === 1) {
                        var data = reset.resData
                        if(data.list.length>0){
                          _this.objArr = data.list
                          _this.pageData.totalCount = data.totalCount
                        }else{
                          _this.objArr=[]
                          _this.pageData.pageCurrent = 1
                          _this.pageData.totalCount = 0
                        }
                        _this.pageshow =  true
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认【'+e.title+'】删除吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/about_us/delete",data,reset => {
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
                this.pageData.pageCurrent = 1
                this.pageshow = false;
                this.list()
            },
            changesel(val){
                // if (val=="正常") {
                //     this.formCustom.status=1
                // }else{
                //     this.formCustom.status=-1
                // }
                this.formCustom.status=val
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
