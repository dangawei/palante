<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >导航管理</BreadcrumbItem>
          <BreadcrumbItem>导航列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>导航列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
         <Form ref="subform" :model="subform" :rules="ruleCustom" :label-width="80">
             <Row>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="标题名称" >
                         <Input type="text" v-model="subform.title"></Input>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="开始时间" >
                       <DatePicker type="date" placeholder="开始时间" @on-change="startTime"></DatePicker>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="结束时间" >
                        <DatePicker type="date" placeholder="结束时间" @on-change="endTime"></DatePicker>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="状态" >
                       <Select v-model="subform.status" >
                           <Option value="" key="">全部</Option>
                           <Option value="1" :key="1">显示</Option>
                           <Option :value="-1" :key="-1">不显示</Option>
                       </Select>
                     </FormItem>
                 </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                   <div class="">
                     <FormItem style="margin-left: -70px;text-align:left">
                         <Button type="primary" @click="handleSubmit('subform')">查询</Button>
                         <!-- <Button type="ghost"   @click="handleReset('subform')" style="margin-left: 8px">重置</Button> -->
                     </FormItem>
                   </div>
                 </Col>
             </Row>
         </Form>
       </div>
        <!--操作按钮-->
       <div class="tableListOperator">
          <Button type="primary" @click="add()">添加</Button>
       </div>
      <Row>
         <Col span="24">
             <div class="">
                  <Table border :columns="columns1" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div></div>
    <subnav-component-add @addcomponentdata="addcomponentdata" @accountcomponentdata="accountcomponentdata" :addshow="addshow" v-if="addshow"></subnav-component-add>
    <subnav-component-edit @editcomponentdata="editcomponentdata" @accountcomponentdata="accountcomponentdata" :edititemdata="edititemdata" :editshow="editshow" v-if="editshow"></subnav-component-edit>
  </div>
</template>
<script>
    import Pages from '../../pub/page.vue'
    import subnavComponentAdd from "../subnav/addComponentshow.vue"
    import subnavComponentEdit from "../subnav/editComponentshow.vue"
    export default {
        data () {
            return {
                pageshow:false,
                addshow:false,
                editshow:false,
                subform:{
                  title:"",
                  startTime:"",
                  endTime:"",
                  status:""
                },
                ruleCustom:{
                    title: [
                        {trigger: 'blur' }
                    ],
                    startTime: [
                        {trigger: 'blur' }
                    ],
                    endTime: [
                        {trigger: 'blur' }
                    ],
                    status: [
                        {trigger: 'blur' }
                    ],
                },
                edititemdata:{},
                pageData:{
                    totalCount:1,
                    pageCurrent:1,
                    pagesize:10,
                },
                columns1: [
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '排序',
                        key: 'sort'
                    },
                    {
                        title: ' 地址',
                        key: 'url',
                        render:(h,params)=>{
                          return ('div',[
                            h('a',{
                              attrs:{
                                href:params.row.url
                              }
                            },params.row.url)
                          ])
                        }
                    },
                    {
                        title: '图标',
                        key: 'pic'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                          var str = ""
                          if(params.row.status==1){
                            str = "显示"
                          }else{
                            str = "不显示"
                          }
                          return h('div', [
                              h('span', str)
                            ])
                        },
                    },
                    {
                        title: '创建日期',
                        key: 'createdTime'
                    },
                    {
                        title: '修改日期',
                        key: 'updatedTime'
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
                                            this.edititem(params.row)
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        components: {
          subnavComponentAdd,
          subnavComponentEdit,
          Paging:Pages
        },
        created() {
          //do something after mounting vue instance

        },
        mounted(){
          this.list();
          console.log(this.$webapi.get('token'));
        },
        methods: {
            startTime (e){
               this.subform.startTime = e
            },
            endTime (e){
               this.subform.endTime = e
            },
            // 查询
            handleSubmit(){
                this.pageshow = false
                this.pageData.pageCurrent = 1
                this.list()
            },
            // handleReset (name) {
            //     this.$refs[name].resetFields()
            //     this.pageshow =  false
            // },
            add () {
              this.addshow = true
            },
            edititem (params) {
                this.editshow = true
                this.edititemdata = params
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editcomponentdata (e) {
              this.editshow = e.editshow
              this.list()
            },
            accountcomponentdata () {
               this.addshow = false
               this.editshow = false
            },
            addcomponentdata (e) {
              this.addshow = e.addshow
              this.list()
            },
            list () {
              let _this = this
              let data = {
                title:this.subform.title,
                pageNo:this.pageData.pageCurrent,
                pageSize:this.pageData.pagesize,
                startTime:this.subform.startTime,
                endTime:this.subform.endTime,
                status:this.subform.status,
                token:this.$webapi.get('token'),
              }
              this.$api.get('/navigation_bar/page',data,reset => {
                  if (reset.codeId === 1) {
                    let data = reset.resData
                    if(data.list.length>0){
                      data.list.forEach(function(item){
                        item.createdTime = _this.$webapi.gettime('time',item.createdAt/1000)
                        item.updatedTime = _this.$webapi.gettime('time',item.updatedAt/1000)
                      })
                     _this.data = data.list
                     _this.pageData.totalCount = data.totalCount
                     _this.pageshow =  true
                    }else{
                      _this.data =[]
                      _this.pageData.totalCount = 0
                      _this.pageData.pageCurrent = 1
                      _this.pageshow =  true
                    }
                  }else {
                    _this.$netcode.getApiCode(reset)
                 }
              })
            },
            remove (params) {
                let _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除【'+params.title+'】吗?</p>',
                    onOk: () => {
                        _this.delitem(params)
                    },
                    onCancel: () => {

                    }
                });
            },
            delitem (params) {
              let _this = this
              var data = {
                token:this.$webapi.get('token'),
                navigationBarId:params.id
              }
              this.$api.post("/navigation_bar/delete", data, reset => {
                if (reset.codeId === 1) {
                     _this.list()
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
