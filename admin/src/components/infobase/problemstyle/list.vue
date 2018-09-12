<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>常见问题分类</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>分类列表</h2>
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
                                <FormItem label="标题">
                                    <Input type="text" v-model="formCustom.classifyName"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="6">
                                <FormItem label="状态" >
                                  <Select v-model="formCustom.status" >
                                     <Option value="" key="">全部</Option>
                                     <Option :value="1" :key="1">显示</Option>
                                     <Option :value="-1" :key="-1">不显示</Option>
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
                                <Button type="primary" @click="addmodal"> <Icon type="ios-plus-empty"></Icon> 添加</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <i-table border :columns="columns7" :data="objArr"></i-table>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <add-problem-component v-if="addprobleshow" :carModelshow="addprobleshow"  @cardataEimt="cardataEimt"></add-problem-component>
        <edit-problem-component v-if="editprobleshow" :carModelshow="editprobleshow"  @cardataEimt="cardataEimt" :problemitemdata="problemitemdata"></edit-problem-component>
    </div>
</template>
<script>
    import addProblemComponent from "./add.vue"
    import editProblemComponent from "./edit.vue"
    export default {
        components: {
          addProblemComponent,
          editProblemComponent
        },
        data () {
            return {
                addprobleshow: false,
                editprobleshow: false,
                problemitemdata:{},
                formCustom: {
                    id: '',
                    classifyName: '',
                    status:""
                },
                pageData:{
                   totalCount:1,
                   pageCurrent:1,
                   pagesize:10,
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
                                h('span', params.row.classifyName)
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
                                            this.problemitemdata = params.row
                                            this.editprobleshow = true
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
        mounted(){
            this.list();
        },
        methods: {
           cardataEimt (e) {
              this.addprobleshow = false
              this.editprobleshow = false
              this.list()
           },
           addmodal () {
              this.addprobleshow = true
           },
           list () {
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    pageNo:this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize,
                    classifyName:this.formCustom.classifyName,
                    status:this.formCustom.status
                }
                this.$api.get('/common_problem_classify/page',data,reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        _this.objArr = data
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove (e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除【'+e.classifyName+'】吗?</p>',
                    onOk: () => {
                        let _this = this;
                        let url="/common_problem_classify/delete?token=" + this.$webapi.get('token') + "&id=" + parseInt(e.id)
                        this.$api.post(url,null,reset => {
                            if (reset.codeId === 1) {
                                _this.list();
                                _this.pageshow =  true
                                _this.$Message.info('删除成功');
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
