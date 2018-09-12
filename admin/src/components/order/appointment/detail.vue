<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>订单管理</BreadcrumbItem>
          <BreadcrumbItem to="/appointment">预约订单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>预约订单{{formItem.purchaseOrderNo}}详情</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <div class="pagelist">
          <div class="pagelist-hd">用户详情</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="用户名字:" prop="userName">
                    <p>{{formItem.userName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="用户手机号:" prop="phone">
                    <p>{{formItem.phone}}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="省份证号码:" prop="IDnumber">
                    <p>{{formItem.IDnumber}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="驾驶证:" prop="drivingLicence">
                    <p>{{formItem.drivingLicence}}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="创建时间:" label-position="left" prop="creatAt">
                    <p>{{formItem.creatAt}}</p>
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
                      <FormItem label="车辆品牌:" label-position="left" prop="brandName">
                        <p>{{formItem.brandName}}</p>
                      </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                      <FormItem label="车辆型号:" label-position="left" prop="modelName">
                          <p>{{formItem.modelName}}</p>
                      </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="sku属性:" label-position="left" prop="skuName">
                            <p>{{formItem.skuName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="车辆型号图片:" label-position="left" prop="pic">
                            <p>{{formItem.pic}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <div class="pagelist">
              <div class="pagelist-hd">订单状态</div>
              <div class="pagelist-bd">
                <Row>
                  <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                      <FormItem label="状态:" label-position="left" prop="status">
                          <p>{{formItem.status}}</p>
                      </FormItem>
                     </div>
                  </Col>
                </Row>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
              <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div style="text-align: center;" class="">
                      <Button type="primary"  @click="submit()">通知预约</Button> 
                    </div>
                </Col>
              </Row>
            </div>
          </div>
        </Form>

      </div>
      </div>

      <sms-model v-if="smsShow" :smsshow="smsShow" :userinfo="userinfo" @smsshow="smsshow"></sms-model>
  </div>
</template>

<script>
  import SmsModel from "../../pub/smsmodel"
export default {
  name: 'index',
  components: {
    SmsModel
  },
  created() {
    //do something after creating vue instance
      
  },
  data () {
    return {
      smsShow:false,
      formItem: {
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
    // this.list()
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
    list () {
      var listdata = {
        token:this.$webapi.get('token'),
        id:this.$route.query.id,
      }
      var _this =  this
      this.$api.get('/purchase_order/detail',listdata,reset => {
        if (reset.codeId === 1) {
          _this.formItem=reset.resData;
           _this.formItem.createdAt=this.$webapi.gettime('date',(_this.formItem.createdAt)/1000)
           _this.formItem.updatedAt=this.$webapi.gettime('date',(_this.formItem.updatedAt)/1000)
           _this.formItem.adminAuditedAt=this.$webapi.gettime('date',(_this.formItem.adminAuditedAt)/1000)
           _this.formItem.dealerAuditedAt=this.$webapi.gettime('date',(_this.formItem.dealerAuditedAt)/1000)
        } else {
          _this.$netcode.getApiCode(reset)
       }
      }) 
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
