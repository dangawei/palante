<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem to="/presell">预售订单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
        <div class="page-detail-hd">
          <h2>预售订单{{formItem.rentOrderNo}}详情</h2>
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
                <FormItem label="订单金额：" prop="userName">
                  <p>{{formItem.totalPrice}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="实付金额：" prop="tradeAmount">
                  <p>{{formItem.tradeAmount}}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="订单状态：" prop="phone">
                  <p v-if="formItem.status==1">待支付</p>
                  <p v-if="formItem.status==2">待发货</p>
                  <p v-if="formItem.status==3">待取货</p>
                  <p v-if="formItem.status==4">已取货</p>
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
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="支付方式：" >
                  <p v-if="formItem.paidType==1">支付宝</p>
                  <p v-if="formItem.paidType==2">微信</p>
                  <p v-if="formItem.paidType==3">线下</p>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="page-divider page-divider-horizontal "></div>
        </div>
        <div class="pagelist">
          <div class="pagelist-hd">用户信息</div>
          <div class="pagelist-bd">
            <Row v-if="formItem.userType==1">
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
            <Row v-if="formItem.userType==2">
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="企业名称:" prop="userName">
                  <p>{{formItem.enterpriseName}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="联系人:" prop="phone">
                  <p>{{formItem.contactName}}</p>
                </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem label="联系人电话:" prop="phone">
                  <p>{{formItem.contactTelephone}}</p>
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
                      <p>{{formItem.dealerStorefrontName}}</p>
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
                <span><Button type="primary"  @click="handelBack()">返回</Button></span>
                <!-- <span><Button type="primary"  @click="ticar()"  v-if="formItem.status==2">提车</Button></span> -->
                <span ><Button type="primary" @click="outline()" v-if="formItem.status==1 ">确认线下付款</Button></span>
               </div>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  </div>
  <car-common v-if="smsShow" :addshow = "smsShow" @addcarcomponent="addcarcomponent" :detailData="formItem"></car-common>
   <orderpay-component v-if="payShow" :payShow="payShow" :itemdata = "itemdata" @outPlay="outPlay"></orderpay-component>
  </div>
</template>

<script>
import carCommon from "../../pub/carcommon.vue"
import orderpayComponent from "../../pub/offlinePay"
export default {
  name: 'index',
  components: {
    carCommon,
    orderpayComponent
  },
  created() {
    //do something after creating vue instance

  },
  data () {
    return {
      smsShow:false,
      payShow:false,
      itemdata:{},
      formItem: {
        rentOrderNo:"租车单号147",
        userName:"小党",
        phone:13275132132
      },
      detailData:[],
      ruleValidate: {

      },
      // 用户信息
      userinfo:{
        userName:String,
        phone:Number,

      },
      carlist:[],
      // 监听采购单状态
      status:'',
      // 审核不通过弹窗
      nopassmodel:false,
      // 审核不通过理由
      opinion:'',

    }
  },
  mounted(){
    this.status=this.$route.query.status
    this.list()
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
    // 短信提醒
    submit () {
      this.userinfo.userName=this.formItem.userName;
      this.userinfo.phone=this.formItem.phone;
      this.smsShow=true;
    },
    smsshow(e){
      this.smsShow=e
    },
    outPlay () {
      this.payShow = false
      this.list()
    },
    outline (){
      this.itemdata = this.formItem
      this.payShow = true
    },
    list () {
        var listdata = {
            order_id:this.$route.query.id,
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
    },
    addcarcomponent (e) {
      this.smsShow = false
      this.carlist = e
      this.ticarpost()
    },
    ticar () {
      this.smsShow = true
    },
    ticarpost () {
      var listdata = {
          order_id:this.$route.query.id,
          token:this.$webapi.get('token'),
          carList:[]
      }
      if(this.carlist.length<1){
        this.$Message.error("车辆没有选择")
        return
      }
      this.carlist.forEach(function (a) {
        var str = {
          id:parseInt(a.id)
        }
        listdata.carList.push(str)
      })
      listdata.carList = JSON.stringify(listdata.carList)
      var _this =  this
      this.$api.post('/order_buyer/deliver',listdata,reset => {
          if (reset.codeId === 1) {
               this.$router.push({path:"/presell/"})
          } else {
              _this.$netcode.getApiCode(reset)
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
