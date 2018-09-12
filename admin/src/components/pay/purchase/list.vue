<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>财务管理</BreadcrumbItem>
          <BreadcrumbItem>采购单收款列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>采购单收款列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                   <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="采购单号" prop="purchase_order_no">
                        <Input v-model="formCustom.purchase_order_no" placeholder="采购单号"></Input>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6" v-if="accountType==1">
                      <FormItem label="分公司" prop="order_no">
                          <subcompanyComponent @subcompanyemit="subcompanyemit"></subcompanyComponent>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <FormItem label="经销商名称" prop="order_no">
                          <dearleComponent @dearleEmitComponent="dearleEmitComponent" :adminSubCompanyId="formCustom.sub_company_id"></dearleComponent>
                      </FormItem>
                    </Col>
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
    </div>
  </div>
  <edit-pay-component v-if="editshow" :editshow="editshow" :editdata="editdata" @editpay="editpay"></edit-pay-component>
  </div>
</template>
<script>
  import Pages from '../../pub/page.vue'
  import dearleComponent from '../../pub/dearleComponent.vue'
  import subcompanyComponent from '../../pub/subcompany.vue'
  import editPayComponent from './edit.vue'
  export default {
    components: {
        Paging:Pages,
        dearleComponent,
        editPayComponent,
        subcompanyComponent
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:true,
            accountType:1,
            appointmentiddata:[

            ],
            value2:'',
            formCustom:{
              sub_company_id:'',
              appointmentOrderNo:'',
              createdAt:'',
              telephone:"",
              order_no:""
            },
            editdata:{},
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '采购单单号',
                    width:150,
                    key: 'purchaseOrderNo',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.purchaseOrderNo)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '收款单号',
                    key: 'receiptNumber',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.receiptNumber)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '收款凭证',
                    key: 'receiptUrl',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                              attrs: {
                                  src: params.row.receiptUrl
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                            })
                        ]);
                    },
                    className: 'ivu-table-column-center'
                },
                {
                    title: '收款金额(元)',
                    key: 'paymentAmount',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.paymentAmount)
                    ])
                 }
                },
                {
                    title: '余款(元)',
                    key: 'unpaidAmount',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.unpaidAmount)
                    ])
                 }
                },
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
                  title: '收款日期',
                  key: 'pickUpDate',
                  render: (h, params) => {
                    var str = this.$webapi.gettime('date',(params.row.payDate)/1000)
                    return h('div', [
                        h('span', str)
                    ])
                  }
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
                    var str = this.$webapi.gettime('time',(params.row.createdAt)/1000)
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
                  title: '更新时间',
                  key: 'updatedAt',
                  render: (h, params) => {
                    var str = this.$webapi.gettime('time',(params.row.updatedAt)/1000)
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
                        str = "有效";
                        break;
                      case 2:
                        str = "无效";
                        break;
                    }
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
                {
                  title: '备注',
                  key: 'remark',                
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.remark)
                    ])
                  }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:200,
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
                                       this.editdata = params.row
                                       this.editshow = true
                                    }
                                }
                            }, '修改'),
                        ]);
                    }
                }
            ],
            data: [],
        }
    },
    mounted() {
      this.accountType = this.$webapi.get("accountType")
      this.list()
    },
    methods: {
      subcompanyemit (e) {
        this.formCustom.sub_company_id = e
      },
      editpay (){
        this.editshow = false
        this.list()
      },
      startTime (e) {
        this.formCustom.startTime = e
      },
      endTime (e) {
        this.formCustom.endTime = e
      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      dearleEmitComponent (e) {
          this.formCustom.dealer_id = e
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          purchase_order_no:this.formCustom.purchase_order_no,
          dealer_id:this.formCustom.dealer_id,
          sub_company_id:this.formCustom.sub_company_id
        }
        var _this =  this
        this.$api.get('/purchase_order_pay/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.buyiddata=[];
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
    }
  }
</script>
