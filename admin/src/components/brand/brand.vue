<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >供应商管理</BreadcrumbItem>
          <BreadcrumbItem>品牌列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>品牌列表</h2>
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
                       <FormItem label="供应商名称" prop="enterpriseId">
                           <Select v-model="val" @on-change=changeval(val)>
                                <Option value="" key="">全部</Option>
                                <Option v-for="item in enterprisedata" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="8" :lg="6">
                       <FormItem label="品牌名称" prop="brandName">
                           <Input type="text" v-model="formCustom.brandName"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="8" :lg="6">
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
          <Button type="primary"  @click="add()">添加</Button>
       </div>
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <i-table border :content="self" :columns="columnsdata" :data="objArr"></i-table>
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
  import Pages from '../pub/page.vue'
  export default {
    components: {
        Paging:Pages,
    },
    data () {
        return {
            enterprisedata:[],
            addshow:true,
            editshow:false,
            pageshow:false,
            getenterprisedata:[],
            self:this,
            val:'',
            formCustom:{
              enterpriseId:'',
              brandName:"",

            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                // {
                //     title: '品牌编号',
                //     key: 'id',
                //     render: (h, params) => {
                //       return h('div', [
                //           h('span', params.row.id)
                //       ]);
                //     },
                //     className:'ivu-table-column-center'
                // },
                {
                    title: '品牌名称',
                    key: 'brandName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.brandName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '供应商名字',
                    key: 'enterpriseName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.enterpriseName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '品牌图片',
                    key: 'icon',
                    render: (h, params) => {
                      return h('div', [
                          h('img', {
                              attrs: {
                                  src: params.row.icon
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
                    title: '官网地址',
                    key: 'url',
                    render: (h, params) => {
                      return h('div', [
                        h('a', {
                          attrs:{
                            href:params.row.url
                          }
                        },params.row.url)
                      ])
                    }
                },
                // {
                //     title: '创建人',
                //     key: 'createdName',
                //     render: (h, params) => {
                //       return h('div', [
                //           h('span', params.row.createdName)
                //     ])
                //  }
                // },
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
                    align: 'center',
                    width:160,
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
                                        this.handleRender(params.row)
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
            objArr:[],
        }
    },
    created(){
      this.enterprise();
    },
    mounted() {
      setTimeout(()=>{
        this.list()
      },300)

    },
    methods: {
      enterprise(){
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
          }
          this.$api.get('/enterprise/findList',data,reset => {
              if (reset.codeId === 1) {
                  let data = reset.resData
                   _this.enterprisedata=data;

              }else {
                  _this.$netcode.getApiCode(reset)
              }
          })
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        let _this = this

        let data = {
            token:this.$webapi.get('token'),
            pageNo:_this.pageData.pageCurrent,
            pageSize:_this.pageData.pagesize,
            enterpriseId:this.formCustom.enterpriseId,
            name:this.formCustom.brandName,
        }
        this.$api.get('/brand/getPage',data,reset => {
            if (reset.codeId === 1) {
                let data = reset.resData.list

                data.forEach((obj,index)=>{
                  _this.enterprisedata.forEach((item,i)=>{
                    if (obj.enterpriseId==item.id) {
                      obj.enterpriseName=item.name
                    }
                  })
                })
                _this.objArr = data;

                _this.pageData.totalCount = reset.resData.totalCount
                _this.pageshow =  true
            }
            else if(reset.codeId === -9){
              _this.objArr = [];
              _this.pageData.totalCount = 0
              _this.pageData.pageCurrent = 1
              _this.pageshow =  true
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      add () {
          this.$router.push({path:"/brand/addbrand"})
      },
      handleRender (val) {
          this.$router.push({
            path:"/brand/editbrand/"+val.enterpriseId+"/"+val.id,
            query:{
              enterprisename:val.enterpriseName,
              brandname:val.brandName
            }
          })
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.brandName+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                var data = {
                  token:this.$webapi.get('token'),
                  id:params.id
                }
                this.$api.post("/brand/delete",data,reset => {
                    if (reset.codeId === 1) {
                        _this.list();
                        _this.$Message.info('删除成功');
                        _this.pageshow =  true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
                _this.Message.success("删除成功");
              },
              onCancel: () => {

              }
          });

      },
      handleSubmit (name) {
         this.pageData.pageCurrent = 1
         this.pageshow = false
         this.list()
      },
      changeval(value){
          this.formCustom.enterpriseId=value;
      },
  }
}
</script>
