<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >采购单管理</BreadcrumbItem>
          <BreadcrumbItem>采购单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>采购单列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
               <Row>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="采购单号" prop="buyid">
                        <Select v-model="formCustom.buyid" @on-change=changemodel(formCustom.buyid) filterable>
                          <Option v-for="cell in buyiddata" :value="cell.value">{{ cell.value }}</Option>
                        </Select>
                         
                       </FormItem>
                    </Col>
                    <!-- <Col :xs="24" :sm="24" :md="6" :lg="6">
                       <FormItem label="采购日期" prop="buydate">
                           <DatePicker type="date" placeholder="请选择采购时间"></DatePicker>
                       </FormItem>
                    </Col> -->
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <div class="">
                        <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                           <Button type="ghost"   @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                       </FormItem>
                     </div>
                   </Col>
               </Row>
           </Form>
       </div>
        <!--操作按钮-->
      <div class="tableListOperator">
        <!-- <Button type="primary"  @click="add()">添加</Button> -->
      </div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <div class="">
            <i-table border :columns="columnsdata" :data="data"></i-table>
            <div class="mt20">
              <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
            </div>
          </div>
        </Col>
      </Row>
    </div></div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import citycommon from "../pub/citycommon.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon
    },
    data () {
        return {
          addshow:true,
          editshow:false,
          pageshow:false,
          buydata:[],
          modeldata:[],
          buyiddata:[],
          formCustom:{
            buyid:'',
            modelid:'',
            buydate:'',
          },
          pageData:{
              totalCount:1,
              pageCurrent:1,
              pagesize:10,
          },
            columnsdata: [
                {
                    title: '采购单号',
                    key: 'buyid',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.buyid)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '采购日期',
                    key: 'buydate',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.buydate)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '总计费用',
                    key: 'buytotal',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.buytotal)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '创建人',
                    key: 'createdName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.createdName)
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
                    key: 'updatedName',
                    render: (h, params) => {
                     
                      return h('div', [
                          h('span', params.row.updatedName)
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
                // {
                //   title: '状态',
                //   key: 'status',
                //   render: (h, params) => {
                //     var str = ""
                //     if(params.row.status == 1){
                //       str = "审核中"
                //     }else if (params.row.status==2){
                //       str = "审核通过"
                //     }else{
                //       str="保存中"
                //     }
                //     return h('div', [
                //         h('span', str)
                //     ])
                //   }
                // },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:250,
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
                                   this.$router.push({path:"/purchaseorder/detail"})
                                }
                            }
                        }, '详情'),
                      ]);
                    }
                }
            ],
            data: [
                {
                  buyid: '123465',
                  buymodel: 'model',
                  buyprice: '15',
                  buydate: '2018-05-09',
                  createdAt: 1525401810000,
                  creatorId: '',
                  updatedAt: 1525914415000,
                  updatorId: '',
                  status:0,
                },
                {
                  buyid: '8654',
                  buymodel: 'model',
                  buyprice: '15',
                  buydate: '2018-05-09',
                  createdAt: 1525401810000,
                  creatorId: '',
                  updatedAt: 1525914415000,
                  updatorId: '',
                  status:1,
                },
                {
                  buyid: '987654',
                  buymodel: 'model',
                  buyprice: '15',
                  buydate: '2018-05-09',
                  createdAt: 1525401810000,
                  creatorId: '',
                  updatedAt: 1525914415000,
                  updatorId: '',
                  status:2,
                }
            ],
            buyiddata:[
              {
                id:1,
                value:123465
              },
              {
                id:2,
                value:8654
              }
            ],
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
        this.buydata=[
            {
                id:1,
                value: 'New York',
            },
            {
                id:2,
                value: 'London',
            },
        ],
        this.modeldata=[
            {
                id:1,
                value: "上海+15",
            },
            {
                id:2,
                value: "杭州+10",
            },
        ]
        
      },
      
      handleSubmit (name) {
        this.pageshow = false
        this.pageData.pageCurrent = 1
        this.list()
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
      }
    }
  }
</script>
