<template>
  <div>
      <div class="pageHeader">
          <div class="pageBread">
              <Breadcrumb>
                  <BreadcrumbItem to="/">首页</BreadcrumbItem>
                  <BreadcrumbItem>财务管理</BreadcrumbItem>
                  <BreadcrumbItem>采购单号列表明细</BreadcrumbItem>
              </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                  <h2>采购单号列表明细</h2>
              </div>
          </div>
      </div>
      <div class="page-view allm20">
          <div class="page-view-body">
              <Form ref="formItem" :model="formItem"  :label-width="100">
                  <div class="pagelist">
                      <div class="pagelist-hd">明细列表</div>
                      <div class="pagelist-bd">
                          <i-table border :columns="columnPaysdata" :data="data"></i-table>
                      </div>
                      <div class="page-divider page-divider-horizontal "></div>
                  </div>
              </Form>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    data () {
        return {
            data:[],
            columnPaysdata: [
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
                    title: '支付金额(元)',
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
                  title: '凭证上传时间',
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
                }
            ]
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      list () {
        var listdata = {
          purchase_order_id:this.$route.params.id,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.post('/purchase_order_pay/list',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      }
    }
  }
</script>
