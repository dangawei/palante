<template>
    <div id="department">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>总管理角色</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>总管理角色</h2>
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
                         <FormItem label="角色名称" >
                             <Input type="text" v-model="formCustom.name"></Input>
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
             <Row>
                 <Col :xs="24" :sm="24" :md="24" :lg="24">
                     <div>
                         <Button type="primary" @click="addrole()"> <Icon type="android-add"></Icon> 添加</Button>
                     </div>
                 </Col>
             </Row>
           </div>
           <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <i-table border  :columns="columns7" :data="data" class="table"></i-table>
               </Col>
           </Row>
           <Row justify="center">
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </Col>
           </Row>
           <role-component-add @rolecomponentdata="rolecomponentdata" :addroleshow="addroleshow" v-if="addroleshow"></role-component-add>
           <role-component-edit @editrolecomponentdata="editrolecomponentdata" :editroleshow="editroleshow" :editroledta="editroledta" v-if="editroleshow"></role-component-edit>
        </div>
        </div>
    </div>
</template>
<script>
  import Pages from '../../pub/page.vue'
  import roleComponentEdit from '../role/editrole.vue'
  import roleComponentAdd from '../role/addrole.vue'
  export default {
    data () {
        return {
            pageshow:false,
            addroleshow:false,
            editroleshow:false,
            editroledta:{},
            self:this,
            formCustom: {
                number: '',
                name: '',
                des:'',
            },
            ruleCustom: {
                number: [
                    {trigger: 'blur' }
                ],
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
                    title: '角色编号',
                    key: 'id',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.id)
                        ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '角色名称',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.name)
                        ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '角色备注',
                    key: 'des',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.remark)
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
                                    // size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color:'#fff'
                                },
                                on: {
                                    click: () => {
                                        this.editrole(params)
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
                                       this.$router.push({path:"/getResource/"+params.row.id})
                                    }
                                }
                            }, '权限'),
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
            data: []
        }
    },
    components:{
        roleComponentEdit,
        roleComponentAdd,
        Paging:Pages
    },
    mounted () {
      //do something after creating vue instance
      this.list()
    },
    methods: {
        addrole () {
          this.addroleshow = true
        },
        editrole (e) {
            this.editroledta = e.row
            this.editroleshow = true
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        rolecomponentdata (e) {
            this.addroleshow = e.addroleshow
            this.list()
        },
        editrolecomponentdata (e) {
            this.editroleshow = e.editroleshow
            this.list()
        },
        list () {
          let _this = this
          let data = {
            token:this.$webapi.get('token'),
            pageNo:_this.pageData.pageCurrent,
            pageSize:_this.pageData.pagesize,
            name:_this.formCustom.name
          }
          this.$api.get('/admin_role/page',data,reset => {
              if (reset.codeId === 1) {
                let data = reset.resData
                 _this.data = data.list
                 _this.pageData.totalCount = data.totalCount
                 _this.pageshow =  true
              }
              else if (reset.codeId === -9) {
                _this.data = []
                _this.pageData.totalCount = 0
                _this.pageshow =  true
              }
              else {
                _this.$netcode.getApiCode(reset)
             }
          })
        },
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要【'+item.name+'】删除吗?</p>',
                onOk: () => {
                   this.del(item)
                },
                onCancel: () => {

                }
            });
        },
        del (item){
          let _this = this;
          var data = {
              token:this.$webapi.get('token'),
              id:item.id
          }
          this.$api.post("/admin_role/delete", data, reset => {
            if (reset.codeId === 1) {
                this.list()
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
        },
        handleSubmit (name) {
           this.pageshow = false
           this.list()
        },
        handleReset (name) {
            this.$refs[name].resetFields()
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
</style>
