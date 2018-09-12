<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >Banner管理</BreadcrumbItem>
          <BreadcrumbItem>查询列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>查询列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
         <Form ref="subfrom" :model="subfrom" :label-width="80">
             <Row>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <FormItem label="标题:" >
                         <Input type="text" v-model="subfrom.title"></Input>
                     </FormItem>
                 </Col>
                  <Col :xs="24" :sm="24" :md="12" :lg="6">
                    <FormItem label="创建时间:">
                      <Row>
                          <Col span="11">
                              <FormItem >
                                  <DatePicker type="date"  @on-change="startTime" placeholder="开始时间" v-model="subfrom.startTime"></DatePicker>
                              </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                              <FormItem>
                                <DatePicker type="date" @on-change="endTime" format="yyyy-MM-dd"  placeholder="结束时间" v-model="subfrom.endTime"></DatePicker>
                              </FormItem>
                          </Col>
                      </Row>
                  </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="12" :lg="6">
                    <FormItem label="到期时间:">
                      <Row>
                          <Col span="11">
                              <FormItem >
                                  <DatePicker type="date"  @on-change="startExpire" placeholder="开始时间" v-model="subfrom.startExpire"></DatePicker>
                              </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                              <FormItem>
                                <DatePicker type="date" @on-change="endExpire"  placeholder="结束时间" v-model="subfrom.endExpire"></DatePicker>
                              </FormItem>
                          </Col>
                      </Row>
                  </FormItem>
                  </Col>
                  <!-- <Col :xs="24" :sm="24" :md="12" :lg="6">
                      <FormItem label="状态:" >
                        <Select v-model="subfrom.status" style="text-align: left;">
                           <Option value="" key="">全部</Option>
                           <Option :value="1" key="1">有效</Option>
                           <Option :value="-1" key="-1">无效</Option>
                       </Select>
                      </FormItem>
                  </Col> -->
                  <Col :xs="24" :sm="24" :md="12" :lg="6">
                      <FormItem label="显示终端:" >
                        <Select v-model="subfrom.useType" style="text-align: left;">
                           <Option value="" key="">全部</Option>
                           <Option :value="1" >WEB</Option>
                           <Option :value="2">APP</Option>
                       </Select>
                      </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="12" :lg="6">
                      <FormItem label="显示位置:" >
                          <adv-component @EmitAdv="EmitAdv"></adv-component>
                      </FormItem>
                  </Col>
                 <Col :xs="24" :sm="24" :md="12" :lg="6">
                   <div class="">
                     <FormItem style="margin-left: -70px;text-align:left">
                         <Button type="primary" @click="handleSubmit('subfrom')">查询</Button>
                         <!-- <Button type="ghost"   @click="handleReset('subfrom')" style="margin-left: 8px">重置</Button> -->
                     </FormItem>
                   </div>
                 </Col>
             </Row>
         </Form>
       </div>
        <!--操作按钮-->
       <div class="tableListOperator">
          <Button type="primary" size="large" @click="add()">添加</Button>
       </div>
      <Row>
         <Col span="24">
             <div class="">
                  <Table :columns="columns1" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div>
  </div>
  </div>
</template>
<script>
    import Pages from '../../pub/page.vue'
    import advComponent from "../../pub/advcommon.vue"
    export default {
        components:{
            Paging:Pages,
            advComponent
        },
        data () {
            return {
                pageshow:false,
                subfrom:{
                    title:"",
                    startTime:"",
                    endTime:"",
                    startExpire:"",
                    endExpire:"",
                    status:''
                },
                 pageshow:false,
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
                        title: '图片地址',
                        key: 'img',
                        render: (h, params) => {
                          return h('div', [
                              h('img', {
                                  attrs: {
                                      src: params.row.img
                                  },
                                  style: {
                                      width: '40px',
                                      height: '40px'
                                  }
                              })
                        ])
                     }
                    },
                    {
                        title: '链接',
                        key: 'url'
                    },
                    {
                        title: '显示终端',
                        key: 'createdAt',
                        render: (h, params) => {
                          var str = ""
                          if(params.row.useType ==1){
                            str="WEB"
                          }else {
                            str="APP"
                          }
                          return h('div', [
                              h('span', str)
                        ])
                     }
                    },
                    {
                        title: '显示位置',
                        key: 'locationDescribe',
                        render: (h, params) => {
                          return h('div', [
                              h('span', params.row.locationDescribe)
                        ])
                     }
                    },
                    {
                        title: '状态显示',
                        key: 'locationId',
                        render: (h, params) => {
                          var str = ""
                          if(params.row.status == -1){
                             str = "无效"
                          }else {
                            str = "有效"
                          }
                          return h('div', [
                              h('span',str)
                        ])
                     }
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt'
                    },
                    {
                        title: '修改时间',
                        key: 'updatedAt'
                    },
                    {
                        title: '到期时间',
                        key: 'expireAt'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:"",
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.$router.push({path:"/banner/editlist/"+params.row.title+"/"+params.row.id})
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'default'
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
        mounted () {
            this.list()
        },
        methods: {
            EmitAdv (e) {
              this.subfrom.locationId = e || ""
            },
            pageComponentDate (e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            list () {
              var data = {
                  title:this.subfrom.title,
                  startTime:this.subfrom.startTime,
                  endTime:this.subfrom.endTime,
                  startExpire:this.subfrom.startExpire,
                  endExpire:this.subfrom.endExpire,
                  status:1,
                  token:this.$webapi.get('token'),
                  pageNo:this.pageData.pageCurrent,
                  pageSize:this.pageData.pagesize,
                  useType:this.subfrom.useType,
                  locationId:this.subfrom.locationId
              }
              let _this = this
              this.$api.get("/advertising/page", data, reset => {
                if (reset.codeId === 1) {
                    let data = reset.resData.list
                     data.forEach(function(item){
                       item.createdAt = _this.$webapi.gettime('time',item.createdAt/1000)
                       item.expireAt = item.expireAt
                       item.updatedAt = _this.$webapi.gettime('time',item.updatedAt/1000)

                     })
                    this.data = data
                    _this.pageData.totalCount = reset.resData.totalCount
                    _this.pageshow =  true
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            remove (params) {
                // this.$api.post(url,params)
                // .then((data)=>{
                //     if (data.data) {}
                //     this.modals.modalBool=true;
                //     this.modals.modalText="新增成功!";
                // })
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>广告删除后,就不能再启用了，确定要删除？</p>',
                    onOk: () => {
                         this.itemdel(params)
                    },
                    onCancel: () => {

                    }
                });

            },
            itemdel (params) {
              let _this = this;
              var url = "/advertising/delete?token=" + this.$webapi.get('token') + " &advertisingId=" + params.id
              this.$api.post(url, null, reset => {
                if (reset.codeId === 1) {
                    this.list()
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            add () {
                this.$router.push({path:"/banner/addlist"})
            },
            handleSubmit (name) {
               this.pageshow =false
               this.pageData.pageCurrent = 1
               this.list()
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            startTime (e) {
              this.subfrom.startTime = e
            },
            endTime (e) {
              this.subfrom.endTime = e
            },
            startExpire (e) {
              this.subfrom.startExpire = e
            },
            endExpire (e) {
              this.subfrom.endExpire = e
            }
        }
    }
</script>
