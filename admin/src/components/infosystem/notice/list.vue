<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>公告列表</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>公告列表</h2>
              </div>
          </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <FormItem label="标题" prop="title">
                                    <Input type="text" v-model="formCustom.title"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <FormItem label="开始时间" >
                                  <DatePicker type="date" placeholder="结束时间" @on-change="startTime"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <FormItem label="结束时间" >
                                   <DatePicker type="date" placeholder="结束时间" @on-change="endTime"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <FormItem label="状态" >
                                  <Select v-model="formCustom.status" >
                                     <Option value="" key="">全部</Option>
                                     <Option :value="1" :key="1">显示</Option>
                                     <Option :value="-1" :key="-1">不显示</Option>
                                  </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6" style="text-align:left">
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
                                <Button type="primary" @click="addmodal"> <Icon type="ios-plus-empty"></Icon> 添加</Button>
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
    </div>

</template>
<script>
    import Modals from '../../pub/modal'
    import Pages from '../../pub/page.vue'
    import datepickerComponent from '../../pub/datepickerComponent.vue'
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
                    id: '',
                    title: '',
                    startTime:"",
                    endTime:"",
                    status:""
                },
                ruleCustom: {
                    name: [
                        {trigger: 'blur' }
                    ]
                },
                pageData:{
                   totalCount:1,
                   pageCurrent:1,
                   pagesize:10,
               },
                modals:{
                    modalBool: false,
                    successText:""
                },
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
                        width:80,
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
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let d="";
                            if (params.row.status==1) {
                                d="显示"
                            }else{
                                d="不显示"
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
                                            this.handleRender(params.row)
                                        }
                                    }
                                }, '修改'),
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
                                }, '不显示'),
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
            datepickerComponent
        },
        mounted(){
            this.list()
        },
        methods: {
            startTime (e){
               this.formCustom.startTime = e
            },
            endTime (e){
               this.formCustom.endTime = e
            },
            addmodal(){
                this.$router.push("/notice/addnotice")
            },
            handleRender (val) {
                this.$router.push({
                    path:"/notice/editnotice/"+val.id,
                    query:{
                        title:val.title
                    }
                })
            },
            handleDetail(e){
                this.$router.push({
                    path:"/notice/detail/"+e.id,
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
                    pageNo:this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize,
                    title:this.formCustom.title,
                    startTime:this.formCustom.startTime,
                    endTime:this.formCustom.endTime,
                    status:this.formCustom.status
                }
                this.$api.get('/announcement/page',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
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
                    content: '<p>确认'+e.title+'不显示吗?</p>',
                    onOk: () => {
                        console.log(e);
                        let _this = this;
                        let url="/announcement/delete?token=" + this.$webapi.get('token') + "&announcementId=" + e.id
                        this.$api.post(url,null,reset => {
                            if (reset.codeId === 1) {
                                _this.list()
                                _this.$Message.info('成功')
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
              this.pageshow = false
              this.pageData.pageCurrent = 1
              this.list()
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
</style>
