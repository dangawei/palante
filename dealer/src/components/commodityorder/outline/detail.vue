<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem to="/order/outline">线下支付列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
        <div class="page-detail-hd">
          <h2>{{formItem.rentOrderNo}}详情</h2>
        </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <div class="pagelist">
          <div class="pagelist-hd">订单信息</div>
          <div class="pagelist-bd">
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="创建时间：" prop="userName">
                  <p>{{formItem.createdAt/1000 | ordertime }}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单号：" prop="userName">
                  <p>{{formItem.serialNumber}}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单类型：">
                   <p v-if="formItem.orderType==1">购买</p>
                   <p v-if="formItem.orderType==2">租赁</p>
                   <p v-if="formItem.orderType==3">预售</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单金额：" prop="userName">
                  <p>{{formItem.totalPrice}}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单状态：" prop="phone">
                  <p v-if="formItem.status==1">待支付</p>
                  <p v-if="formItem.status==2">待发货</p>
                  <p v-if="formItem.status==3">已提车</p>
                  <p v-if="formItem.status==4">用户确认提车</p>
                  <p v-if="formItem.status==5">取消</p>
                  <p v-if="formItem.status==6">订单关闭</p>
                  <p v-if="formItem.status==7">失效</p>
                  <p v-if="formItem.status==8">退货</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="付款时间：" prop="userName">
                  <p>{{formItem.paidAt/1000 | ordertime}}</p>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="page-divider page-divider-horizontal "></div>
        </div>
        <div class="pagelist">
          <div class="pagelist-hd">用户信息</div>
          <div class="pagelist-bd">
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="用户名字:" prop="userName">
                  <p>{{formItem.userName}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="用户手机号:" prop="phone">
                  <p>{{formItem.telephone}}</p>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="page-divider page-divider-horizontal "></div>
        </div>
        <div class="pagelist">
          <div class="pagelist-hd">车辆信息</div>
          <div class="pagelist-bd">
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                    <FormItem label="车辆名称：" label-position="left" prop="brandName">
                      <p>{{formItem.itemName}}</p>
                    </FormItem>
                 </div>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                    <FormItem label="车辆型号：" label-position="left" prop="modelName">
                        <p>{{formItem.carModelName}}</p>
                    </FormItem>
                 </div>
              </Col>
            </Row>
            <Row>
               <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                      <FormItem label="车辆图片：" label-position="left" prop="skuName">
                          <p><img :src="formItem.carSkuPicUrl" width="100" height="100" /></p>
                      </FormItem>
                 </div>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                      <FormItem label="配置：" label-position="left" >
                          <p>{{formItem.carSkuValue}}</p>
                      </FormItem>
                 </div>
              </Col>
            </Row>
            <Row>
               <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                      <FormItem label="车辆数量：" label-position="left" prop="skuName">
                          <p>{{formItem.quantity}}</p>
                      </FormItem>
                 </div>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                      <FormItem label="商品单价：" label-position="left" >
                          <p>{{formItem.unitPrice}}</p>
                      </FormItem>
                 </div>
              </Col>
            </Row>
            <Row v-if="formItem.orderType==1">
               <Col :xs="24" :sm="24" :md="8" :lg="8">
                 <div class="">
                      <FormItem label="保证金" label-position="left" prop="skuName">
                          <p>{{formItem.foregift}}</p>
                      </FormItem>
                 </div>
              </Col>
            </Row>
          </div>
          <div class="page-divider page-divider-horizontal "></div>
          <div class="pagelist">
            <div class="pagelist-hd">门店信息</div>
            <div class="pagelist-bd">
              <!-- <div class="pagelist-hd" style="font-weight: 500;">基本信息</div> -->
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <div class="">
                    <FormItem label="门店名称：" label-position="left" prop="dealer">
                      <p>{{formItem.dealerName}}</p>
                    </FormItem>
                  </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                      <FormItem label="公司电话：" label-position="left" prop="phone">
                          <p>{{formItem.principalsTelephone}}</p>
                      </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="地址：" label-position="left" prop="address">
                            <p>{{formItem.dealerStorefrontAddress}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="联系人：" label-position="left" prop="principalsName">
                            <p>{{formItem.principalsName}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>

            </div>
            <div class="page-divider page-divider-horizontal "></div>
          </div>
          <Row style="text-align:center;">
            <Col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="">
                <Button type="primary"  @click="handelBack()">返回</Button>
                <span ><Button type="primary" @click="outlinelist()" v-if="formItem.status==1 && formItem.paidType==3">确认线下付款</Button></span>
               </div>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  </div>
  <!-- <sms-model v-if="smsShow" :smsshow="smsShow" :userinfo="userinfo" @smsshow="smsshow"></sms-model> -->
  <orderpay-component v-if="payShow" :payShow="payShow" :itemdata = "itemdata" @outPlay="outPlay"></orderpay-component>
  </div>
</template>

<script>
import orderpayComponent from "../../pub/offlinePay"
export default {
  name: 'index',
  components: {
    // SmsModel
    orderpayComponent
  },
  data () {
    return {
      payShow:false,
      smsShow:false,
      orderID:"",
      reasonShow:false,
      formItem: {},
      detailData:[],
      ruleValidate: {

      },
      // 用户信息
      userinfo:{
        userName:String,
        phone:Number,

      },
      // 监听采购单状态
      status:'',
      // 审核不通过弹窗
      nopassmodel:false,
      // 审核不通过理由
      opinion:'',

    }
  },
  mounted(){
    this.list()
    this.status  = this.$route.params.status
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
  methods: {
    outPlay () {
      this.payShow = false
    },
    outlinelist (){
      this.itemdata = this.formItem
      this.payShow = true
    },
    // 短信提醒
    submit () {
      this.userinfo.userName=this.formItem.userName;
      this.userinfo.phone=this.formItem.phone;
      this.smsShow=true;
    },
    reasonEmitCompont (e){
      this.reasonShow = false
      if(e.value==2){
        this.invalid(e)
      }else if(e.value==1){
        this.valid(e)
      }
    },
    invalid (e) {
      var data = {
            token:this.$webapi.get('token'),
            id:parseInt(this.$route.params.outLineID),
            adminConfirmOpinion:e.reasonbeank
      }
      this.$api.post('/order_offline_pay/confirm_invalid',data,reset => {
          if (reset.codeId === 1) {
              window.location.href = "/order/outline"
          } else {
              _this.$netcode.getApiCode(reset)
          }
      })
    },
    valid (e) {
      var data = {
            token:this.$webapi.get('token'),
            id:parseInt(this.$route.params.outLineID)
      }
      this.$api.post('/order_offline_pay/confirm_valid',data,reset => {
          if (reset.codeId === 1) {
              window.location.href = "/order/outline"
          } else {
              _this.$netcode.getApiCode(reset)
          }
      })
    },
    pay (){
      this.reasonShow = true
    },
    smsshow(e){
      this.smsShow=e
    },
    list () {
        var listdata = {
            order_id:this.$route.params.id,
            token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/order_buyer/details',listdata,reset => {
            if (reset.codeId === 1) {
                _this.formItem= reset.resData
            } else {
                _this.$netcode.getApiCode(reset)
            }
        })
    },
    handelBack(){
      this.$router.back(-1);
    },
    orderstatus (e){
      return this.$webapi.getorderstatus(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
