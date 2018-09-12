<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>采购单管理</BreadcrumbItem>
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
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="8" :lg="8">
                      <FormItem label="采购单号" prop="purchaseOrderNo">
                        <Input v-model="formCustom.purchaseOrderNo" placeholder="采购单号"></Input>
                        <!-- <AutoComplete
                            v-model="value2"
                            placeholder="请输入采购单号"
                            >
                            <Option v-for="item in buyiddata" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete> -->
                       </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                       <FormItem label="经销商名称" prop="purchaseOrderNo">
                          <dearle-component @dearleEmitComponent="dearleEmitComponent" :objAny="1"></dearle-component>
                        </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="8" :lg="8">
                        <FormItem label="支付状态">
                            <Select v-model="formCustom.paid_status" >
                                <Option value="" >全部</Option>
                                <Option value="1" >未支付</Option>
                                <Option value="2" >部分支付</Option>
                                <Option value="3" >全部支付</Option>
                            </Select>
                        </FormItem>
                      </Col>
                      <Col :xs="24" :sm="24" :md="8" :lg="8">
                         <FormItem label="采购单状态">
                           <Select v-model="formCustom.status">
                               <Option value="" >全部</Option>
                               <!-- <Option value="1" >待提交</Option>
                               <Option value="2" >待审核</Option>
                               <Option value="3" >待平台审核</Option>
                               <Option value="4" >审核不通过</Option> -->
                               <Option value="5" >待发货</Option>
                               <Option value="6" >平台审核未通过</Option>
                               <Option value="7" >采购完成</Option>
                           </Select>
                          </FormItem>
                       </Col>
                    <!-- <Col :xs="24" :sm="24" :md="8" :lg="8">
                       <FormItem label="创建日期" prop="createdAt">
                           <DatePicker type="date" placeholder="请选择创建时间"></DatePicker>
                       </FormItem>
                    </Col> -->
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
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
  import dearleComponent from "../pub/dearleComponent.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon,
        dearleComponent
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,

            // 下拉选择查询的采购单数据
            buyiddata:[],
            value2:'',
            formCustom:{
              purchaseOrderNo:'',
              createdAt:'',
              status:'',
              paid_status:"",
              dealer_name:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '采购单号',
                    key: 'purchaseOrderNo',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.purchaseOrderNo)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '总计费用',
                    key: 'totalPrice',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.totalPrice)
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
                // {
                //     title: '修改人',
                //     key: 'updatorName',
                //     render: (h, params) => {
                //       var str = this.$webapi.gettime('date',(params.row.updatorName)/1000)
                //       return h('div', [
                //           h('span', str)
                //     ])
                //  }
                // },
                // {
                //     title: '修改时间',
                //     key: 'updatedAt',
                //     render: (h, params) => {
                //       var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                //       return h('div', [
                //           h('span', str)
                //     ])
                //  }
                // },
                {
                    title: '支付状态',
                    key: 'paidStatus',
                    render: (h, params) => {
                      var str = ""
                      switch(params.row.paidStatus)
                      {
                        case 1:
                          str = "未支付";
                          break;
                        case 2:
                          str = "部分支付";
                          break;
                        case 3:
                          str = "全部支付";
                          break;
                      }
                      return h('div', [
                          h('span', str)
                      ])
                   }
                },
                {
                  title: '状态',
                  key: 'status',
                  render: (h, params) => {
                    var str = ""
                    switch(params.row.status)
                    {
                      case 1:
                        str = "待提交";
                        break;
                      case 2:
                        str = "待审核";
                        break;
                      case 3:
                        str = "待平台审核";
                        break;
                      case 4:
                        str = "审核不通过";
                        break;
                      case 5:
                        str = "待发货";
                        break;
                      case 6:
                        str = "平台审核未通过";
                        break;
                      case 7:
                        str = "采购完成";
                        break;
                    }
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
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
                                      this.$router.push({
                                        path:"/purchaseorder/detail",
                                        query:{
                                          id:params.row.id,
                                        }
                                      })
                                    }
                                }
                            }, '详情'),
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
                                      this.$router.push({
                                        path:"/pay/purchase/view/"+params.row.id,
                                      })
                                    }
                                }
                            }, '收款明细'),
                        ]);
                    }
                }
            ],
            data: [
            ],

        }
    },
    // beforeRouteEnte(to,from,next){
    //   next(em=>{
    //     console.log(vm.data);
    //     em.data.forEach((val,index,arr)=>{
    //       em.buyiddata.push(val.purchaseOrderNo);
    //     })

    //   })
    // },
    mounted() {
      this.list()
    },
    methods: {
      dearleEmitComponent (e) {
        console.log(e)
        this.formCustom.dealer_name = e.name
      },
      getbuyiddata(){

      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          purchase_order_no:this.formCustom.purchaseOrderNo,
          dealer_name:this.formCustom.dealer_name,
          paid_status:this.formCustom.paid_status
        }
        var _this =  this
        this.$api.get('/purchase_order/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
            _this.data.forEach((val,index,arr)=>{
              _this.buyiddata.push(val.purchaseOrderNo)
            })
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          } else {
            _this.$netcode.getApiCode(reset)
         }
        })
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
