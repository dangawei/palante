<template>
    <div id="department">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem >基础信息</BreadcrumbItem>
              <BreadcrumbItem>角色管理</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>角色管理</h2>
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
                         <FormItem label="角色名称" >
                             <!-- <Input type="text" v-model="formCustom.name"></Input> -->
                             <Select v-model="formCustom.name">
                               <Option value="">全部</Option>
                               <Option v-for="item in roledatas" :value=item.name>{{item.name}}</Option>
                             </Select>
                         </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="8" :lg="6">
                       <div class="">
                         <FormItem style="margin-left: -70px;text-align:left">
                             <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                             <!-- <Button type="ghost"   @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
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
                   <i-table border :content="self" :columns="columns7" :data="data"></i-table>
               </Col>
           </Row>
           <Row justify="center">
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </Col>
           </Row>
           <role-component-add @addrolecomponentdata="addrolecomponentdata" :addroleshow="addroleshow" v-if="addroleshow"></role-component-add>
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
                name: '',
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
            // 角色数据
            roledatas:[],

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
                  title: '创建人',
                  key: 'creatorName',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.creatorName)
                    ])
                  }
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
                    title: '修改人',
                    key: 'updatorName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.updatorName)
                    ])
                 }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '操作',
                    key: 'action',
                    width:230,
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
                                      this.remove(params.row);
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
      this.getrole()
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
        addrolecomponentdata (e) {
          console.log(e);
            this.addroleshow = e
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
            name:this.formCustom.name,
            pageNo:_this.pageData.pageCurrent,
            pageSize:_this.pageData.pagesize
          }
          this.$api.get('/dealer_role/page',data,reset => {
              if (reset.codeId === 1) {
                let data = reset.resData
                 _this.data = data.list
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
                content: '<p>确认删除【'+e.name+'】吗?</p>',
                onOk: () => {
                    // this.$Message.info('Clicked ok');
                    this.itemdel(e)
                },
                onCancel: () => {

                }
            });

        },
        itemdel (params) {
          let _this = this
          
          var data={
            token:this.$webapi.get('token'),
            id:params.id
          }
          this.$api.post("/dealer_role/delete", data, reset => {
            if (reset.codeId === 1) {
              _this.$Message.success("删除成功!");
              _this.list();
            }else {
              _this.$netcode.getApiCode(reset)
            }
          })
       },
        handleSubmit (name) {
            // this.$refs[name].validate((valid) => {
            //     if (valid) {
            //         this.list()
            //     }
            // })
            this.list()
        },
        getrole(){
          var _this=this
          var data={
            token:this.$webapi.get('token'),
          }
          this.$api.get("/dealer_role/list",data,reset=>{
            if (reset.codeId===1) {
              _this.roledatas=reset.resData;
            }
          })
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
