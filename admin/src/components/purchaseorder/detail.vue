<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/purchaseorder">采购单列表</BreadcrumbItem>
          <BreadcrumbItem>采购单详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>采购单{{formItem.purchaseOrderNo}}详情</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">

      <div class="page-view-body">
        <div class="page-detail">
          <div class="page-detail-hd" style="text-align: left;">
             <!-- <router-link to="/purchaseorder/auditdetail"><Button type="primary">返回采购单审核列表</Button></router-link> -->
          </div>
        </div>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <div class="pagelist">
          <div class="pagelist-hd">操作详情</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="创建人:" label-position="left" prop="creatorName">
                    <p>{{formItem.creatorName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="创建时间:" label-position="left" prop="createdAt">
                    <p>{{formItem.createdAt/1000 | ordertime}}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="修改人:" label-position="left" prop="updatorName">
                    <p>{{formItem.updatorName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="修改时间:" label-position="left" prop="updatedAt">
                    <p>{{formItem.updatedAt/1000 | ordertime}}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="审核人:" label-position="left" prop="adminAuditorName">
                    <p>{{formItem.adminAuditorName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="审核时间:" label-position="left" prop="adminAuditedAt">
                    <p>{{formItem.adminAuditedAt/1000 | ordertime}}</p>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="审核意见:" label-position="left" prop="adminAuditOpinion">
                    <p>{{formItem.adminAuditOpinion}}</p>
                  </FormItem>
                </Col>
              </Row>

             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
            <div class="pagelist-hd">经销商信息</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商名字:" label-position="left" prop="dealerName">
                            <p>{{formItem.dealerName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="收货地址:" label-position="left" prop="shippingAddress">
                            <p>{{formItem.shippingAddress}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商审核人:" label-position="left" prop="dealerAuditorName">
                            <p>{{formItem.dealerAuditorName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商审核时间:" label-position="left" prop="dealerAuditedAt">
                            <p>{{formItem.dealerAuditedAt/1000 | ordertime}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                  <div style="text-align: center;">
                    <Button type="primary"  @click="addpay()" v-if="accountType==1 && formItem.paidStatus!=3">添加收款记录</Button>
                    <!-- <Button type="primary"  @click="passaduit()" v-if="accountType==2 && formItem.status==3">审核通过</Button>
                    <Button type="error"  @click="nopassaduit()" v-if="accountType==2 && formItem.status==3">审核不通过</Button> -->
                    <Button type="primary"  @click="handelBack()">返回</Button>
                  </div>
                  <div class="mt20 textleft"  v-if="accountType==2">
                    <Alert type="error">
                       审核功能:添加了收款凭证，审核功能才可以操作
                    </Alert>
                  </div>
              </Col>
            </Row>
            <Row>
              <div class="pagelist-hd">采购信息</div>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="" :style="tabsstyle">
                  <Tabs value="name1">
                        <TabPane label="采购列表" name="name1">
                          <div class="">
                            <i-table border :columns="columnsdata" :data="formItem.purchaseOrderDetailVOList"></i-table>
                          </div>
                        </TabPane>
                        <TabPane label="收款列表" name="name2">
                          <div class="">
                            <i-table border :columns="columnPaysdata" :data="formItem.purchaseOrderPayDoList"></i-table>
                          </div>
                      </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
            <div class="page-divider page-divider-horizontal "></div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <p style="text-align:right;"><strong>总计:</strong>{{formItem.totalPrice}}</p>
              </Col>
            </Row>
          </div>

        </Form>

        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>驳回理由</span>
            </p>
            <div style="text-align:center">

                <Input type="textarea" v-model="rejectcontent" placeholder="请输入驳回理由"></Input>
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="del">确定</Button>
            </div>
        </Modal>
      </div>
      </div>
      <add-pay-component v-if="addpayshow" :addpayshow="addpayshow" :addpaydata="formItem"  @emitaddpay="emitaddpay"></add-pay-component>
  </div>
</template>
<script>
import addPayComponent from "../pub/addpaycomponent"
export default {
  name: 'index',
  components: {
     addPayComponent
  },
  created() {
    //do something after creating vue instance
  },
  filters: {
    ordertime: function (time) {
      var type = type || 'date'
      var time = time ? parseInt(time, 10) : null
      var result = ''
      if (time) {
        var tdate = new Date(time * 1000)
        var year = tdate.getFullYear()
        var month = tdate.getMonth() + 1
        var date = tdate.getDate()
        var hour = tdate.getHours()
        var minute = tdate.getMinutes()
        var second = tdate.getSeconds()
        month = month > 9 ? month : '0' + month
        date = date > 9 ? date : '0' + date
        hour = hour > 9 ? hour : '0' + hour
        minute = minute > 9 ? minute : '0' + minute
        second = second > 9 ? second : '0' + second
        result = [year, month, date].join('-')
        if (type == 'time') {
            result += ' ' + [hour, minute, second].join(':')
        }
      }
      return result
  }
},
  data () {
    return {
      accountType:1,
      tabsstyle:{},
      modal2:false,
      pageshow:false,
      addpayshow:false,
      showpass:false,
      formItem: {},
      detailData:[],
      rejectcontent:'',
      ruleValidate: {

      },
      columnsdata: [
        {
            title: '车辆型号',
            key: 'carModel',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.carModel)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: 'sku属性',
            key: 'carSku',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.carSku)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '采购数量',
            key: 'purchaseQuantity',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.purchaseQuantity)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
          title: '交货数量',
          key: 'deliveryQuantity',
          render: (h, params) => {
            return h('div', [
                h('span', params.row.deliveryQuantity)
            ]);
          },
          className:'ivu-table-column-center'
        },
        {
            title: '单价(元)',
            key: 'unitPrice',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.unitPrice)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
          title: '总价(元)',
          key: 'total',
          render: (h, params) => {

            return h('div', [
                h('span', params.row.totalPrice)
            ]);
          },
          className:'ivu-table-column-center'
        },
      ],
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
  mounted(){
    this.accountType = this.$webapi.get("accountType") || 1
    this.tabsstyle = {
      width:window.innerWidth-380+"px"
    }
    this.list()
  },
  methods: {
    pass () {
      let _this = this
      var url = "/purchase_order/audit_pass?token=" + this.$webapi.get('token') + "&id="+this.$route.query.id
      this.$api.post(url, null, reset => {
        if (reset.codeId === 1) {
          _this.$Message.success("审核通过!");
          $this.$router.push("/purchaseorder");
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
    },
    addpay () {
      this.addpayshow = true
    },
    emitaddpay (e) {
      this.addpayshow = false
      this.list()
    },
    nopass () {
      this. modal2=true;

    },
    del(){
      this.modal2=false;
      let _this = this
      var url = "/purchase_order/audit_not_pass?token=" + this.$webapi.get('token') + "&id="+this.$route.query.id+"adminAuditOpinion="+this.rejectcontent
      this.$api.post(url, null, reset => {
        if (reset.codeId === 1) {
          _this.$Message.success("审核不通过!");
          $this.$router.push("/purchaseorder");
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
    },
    list () {
      var listdata = {
        token:this.$webapi.get('token'),
        id:this.$route.query.id,
      }
      var _this =  this
      this.$api.get('/purchase_order/detail',listdata,reset => {
        if (reset.codeId === 1) {
          _this.formItem = reset.resData;
          switch(_this.formItem.status)
          {
            case 1:
              this.showpass = true;
              break;
            case 2:
              this.showpass = true;
              break;
            case 3:
              this.showpass = false;
              break;
            case 4:
              this.showpass = false;
              break;
            case 5:
              this.showpass = false;
              break;
            case 6:
              this.showpass = false;
              break;
            case 7:
              this.showpass = false;
              break;
          }
        } else {
          _this.$netcode.getApiCode(reset)
       }
      })
    },
    handelBack(){
      this.$router.back(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
