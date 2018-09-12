<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >车辆分类</BreadcrumbItem>
          <BreadcrumbItem>车辆分类列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>车辆分类列表</h2>
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
                       <FormItem label="名称" prop="name">
                           <Input type="text" v-model="formCustom.name"></Input>
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
    <car-model-add v-if="addshow" :carModelshow="addshow" @addcarEimt="addcarEimt"></car-model-add>
    <car-model-edit v-if="editshow" :carModelshow="editshow" :carModelID="carModelID" @editcarEimt="editcarEimt"></car-model-edit>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import carModelAdd from './add.vue'
  import carModelEdit from './edit.vue'
  export default {
    components: {
        Paging:Pages,
        carModelAdd,
        carModelEdit
    },
    data () {
        return {
            enterprisedata:[],
            addshow:false,
            editshow:false,
            pageshow:false,
            carModelID:"",
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
                {
                    title: '编号',
                    key: 'id',
                    width:100,
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.id)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '名称',
                    key: 'enterpriseName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.categoryName)
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
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '创建时间',
                    key: 'brandName',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('time',(params.row.createdAt)/1000)
                      return h('div', [
                          h('span', str)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '修改人',
                    key: 'updatorName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.updatorName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '修改时间',
                    key: 'updated_at',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('time',(params.row.updatedAt)/1000)
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
                                         this.carModelID = params.row.id
                                         this.editshow = true
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
    mounted() {
      this.list()
    },
    methods: {
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            pageNo:this.pageData.pageCurrent,
            pageSize:this.pageData.pagesize,
            name:this.formCustom.name
        }
        this.$api.get('/car_model_category/page',data,reset => {
            if (reset.codeId === 1) {
                _this.objArr = reset.resData.list
                _this.pageData.totalCount = reset.resData.totalCount
                _this.pageshow =  true
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      add () {
          this.addshow = true
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要删除【'+params.categoryName+'】吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/car_model_category/delete?token=" + this.$webapi.get('token') + "&id=" + params.id;
                this.$api.post(url,null,reset => {
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
         this.pageshow = false
         this.list()
      },
      addcarEimt(e){
        this.addshow = e.show
        this.list()
      },
      editcarEimt (e) {
        this.editshow = e.show
        this.list()
      },
  }
}
</script>
