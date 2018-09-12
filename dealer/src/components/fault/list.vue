<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>售后管理</BreadcrumbItem>
          <BreadcrumbItem>报障列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>报障列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="门店名称" prop="name">
                          <storefrontname @storeEmit="storeEmit"></storefrontname>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="vin" prop="contactName">
                           <Input type="text" v-model="formCustom.vin"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="手机号" prop="mobileNo">
                           <Input type="text" v-model="formCustom.mobileNo"></Input>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                       <FormItem label="故障状态" prop="status">
                         <Select v-model="formCustom.solveStatus">
                             <Option value="" key="">全部</Option>
                             <Option value="1">待解决</Option>
                             <Option value="2">解决中</Option>
                             <Option value="3">已解决</Option>
                         </Select>
                       </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <div class="">
                       <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                           <!--  -->
                       </FormItem>
                     </div>
                   </Col>
               </Row>
           </Form>
       </div>
        <!--操作按钮-->
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <Table :columns="columnsdata" :data="data"></Table>
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
  import storefrontname from '../pub/storefrontname.vue'
  export default {
    components: {
        Paging:Pages,
        storefrontname
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            formCustom:{
              dealerStorefrontId:"",
              vin:"",
              solveStatus:'',
              mobileNo:'',
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: 'vin',
                    key: 'vin'
                },
                {
                    title: '手机号码',
                    key: 'mobileNo'
                },
                {
                    title: '保障内容',
                    key: 'faultContent'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                      var str = ""
                      if(params.row.solveStatus == 1){
                       str = "待解决"
                      }else if(params.row.solveStatus == 2) {
                        str = "解决中"
                      }else if(params.row.solveStatus == 3) {
                         str = "已解决"
                      }
                      return h('div', [
                          h('span', str)
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
                    title: '开始解决时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.solveStartTime)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '完成解决时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.solveFinishTime)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '操作',
                    key: 'action',
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
                                      this.$router.push({path:"/fault/view/",query:{
                                        faultId:params.row.id,
                                        status:params.row.solveStatus,
                                        vin:params.row.vin
                                      }})
                                    }
                                }
                            }, '详情'),

                        ]);
                    }
                }
            ],
            data: []
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
        var listdata = {
          dealerStorefrontId:this.formCustom.dealerStorefrontId,
          vin:this.formCustom.vin,
          solveStatus:this.formCustom.solveStatus,
          mobileNo:this.formCustom.mobileNo,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/fault_problem/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }else{
            _this.data = []
            _this.pageData.totalCount = 0
          }
        })
      },
     handleSubmit (name) {
        this.list()
    },
    storeEmit (e) {
      this.formCustom.dealerStorefrontId = e.id
    }
   }
 }
</script>
