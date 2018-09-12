<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/dealer/list/">经销商列表</BreadcrumbItem>
          <BreadcrumbItem>完善经销商信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>完善经销商信息</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
        <div class="pagelist">
             <div class="pagelist-hd">企业信息</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="企业名称" prop="enterpriseName">
                     <Input v-model="formItem.enterpriseName" placeholder="企业名称"></Input>
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="组织代码号" prop="registrationUmber">
                     <Input v-model="formItem.registrationUmber" placeholder="组织代码号"></Input>
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="12" :lg="24">
                 <FormItem label="营业执照" prop="businessLicenceUrl" required>
                    <Upload @uploadComponent="uploadComponent" :uploadsizenum="uploadsizenum"></Upload>
                 </FormItem>
               </Col>
               </Row>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
            <div class="pagelist-hd">银行信息</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="6" :lg="12">
                  <FormItem label="开户行" prop="depositBank">
                      <Input v-model="formItem.depositBank" placeholder="开户行"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="12">
                  <FormItem label="银行卡号" prop="bankCard" required>
                      <Input v-model="formItem.bankCard" placeholder="银行卡号"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="12">
                  <FormItem label="收款方" prop="payee">
                      <Input v-model="formItem.payee" placeholder="收款方"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="12">
                  <FormItem label="联系人" prop="receiptContactName">
                      <Input v-model="formItem.receiptContactName" placeholder="联系人"></Input>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="12">
                  <FormItem label="联系人电话" prop="receiptContactTelephone">
                      <Input v-model="formItem.receiptContactTelephone" placeholder="手机号码"></Input>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
         </div>
         <FormItem>
           <Button type="primary" @click="handleSubmit('formItem')" size="large">添加</Button>
           <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px" size="large">取消</Button>
       </FormItem>
      </Form>
      </div>
      </div>
  </div>
</template>

<script>
import Upload from "../pub/Uploadimg.vue"
export default {
  name: 'index',
  components: {
    Upload
  },
  created() {
    //do something after creating vue instance
    //this.list()
  },
  data () {
    const validateTel = (rule, value, callback) => {
         var reg = this.$Validate.gettel()
         if (!reg.test(value)) {
             callback(new Error('手机格式不对'))
         } else {
             callback()
         }
     };
    return {
        uploadsizenum:1,
        formItem: {
            name: '',
            receiptContactTelephone: '',
            receiptContactName:'',
            receiptContactName:'',
            payee:"",
            bankCard:"",
            depositBank:"",
            registrationUmber:"",
            enterpriseName:"",
            address:"",
            contactname:"",
            icon:"",
            provinceCode:"",
            cityCode:"",
            areaCode:""
    },
    ruleValidate: {
        enterpriseName: [
            { required: true, message: '企业名称没有填写', trigger: 'blur' },
            { type: 'string', max:2,max: 20, message: '经销商名称没有填写', trigger: 'blur' }
        ],
        registrationUmber: [
            { required: true, message: '组织代码号没有填写', trigger: 'blur' },
            { type: 'string', max:10,max: 30, message: '组织代码号没有填写', trigger: 'blur' }
        ],
        contactname: [
            { required: true, message: '联系人没有填写',  trigger: 'blur' },
            { type: 'string', max: 20, message: '联系人长度不能超过20字符', trigger: 'blur' }
        ],
        provinceCode: [
            { required: true, message: '基本信息-省没有选择',  trigger: 'change' }
        ],
        cityCode: [
            { required: true, message: '基本信息-市区没有选择',  trigger: 'change' }
        ],
        areaCode: [
            { required: true, message: '基本信息-区/县没有选择',  trigger: 'change' }
        ],
        address: [
            { required: true, message: '地址没有填写',  trigger: 'blur' },
            { type: 'string', min: 20, message: '地址最小不能2个字符', trigger: 'blur' }
        ],
        enterprisename: [
            { required: true, message: '企业名称没有填写',  trigger: 'blur' },
            { type: 'string', message: '企业名称没有填写', trigger: 'blur' }
        ],
        registrationumber: [
            { required: true, message: '组织代码号没有填写',  trigger: 'blur' },
            { type: 'string', message: '组织代码号没有填写', trigger: 'blur' }
        ],
        depositBank: [
            { required: true, message: '开户行没有填写',  trigger: 'blur' },
            { type: 'string', message: '开户行没有填写', trigger: 'blur' }
        ],
        bankCard: [
            { required: true, message: '银行卡12-25个字符',  trigger: 'blur' },
            { type: 'string',min:12, max: 25,message: '银行卡12-25个字符', trigger: 'blur' }
        ],
        payee: [
            { required: true, message: '银行信息-收款方没有填写',  trigger: 'blur' },
            { type: 'string',message: '银行信息-收款方没有填写', trigger: 'blur' }
        ],
        receiptContactTelephone: [
            { validator: validateTel, trigger: 'blur' }
        ],
        receiptContactName: [
            { required: true, message: '银行信息-联系人没有填写',  trigger: 'blur' },
            { type: 'string', message: '联系人长度不能超过20字符', trigger: 'blur' }
        ]
       }
    }
  },
  methods: {
    handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                   this.post()
              }
          })
      },
      uploadComponent (e){
          this.formItem.businessLicenceUrl = e[0]
      },
      handleReset (name) {
        this.$router.push({path:"/dealer/list"})
     },
     list () {
       var listdata = {
         dealerId:this.$route.params.id,
         token:this.$webapi.get('token'),
       }
       var _this =  this
       this.$api.get('/dealer_information/getOneByDealerId',listdata,reset => {
         if (reset.codeId === 1) {
             _this.$router.push({path:"/dealer/editbank/"+this.$route.params.id})
         }
       })
     },
     post () {
        let _this = this
        var url = "/dealer_information/save?token="+this.$webapi.get('token')+"&dealerId="+this.$route.params.id
          if(this.formItem.receiptContactTelephone){
             url+="&receiptContactTelephone="+this.formItem.receiptContactTelephone
          }
          if(this.formItem.receiptContactName){
             url+="&receiptContactName="+this.formItem.receiptContactName
          }
          if(this.formItem.payee){
             url+="&payee="+this.formItem.payee
          }
          if(this.formItem.bankCard){
             url+="&bankCard="+this.formItem.bankCard
          }
          if(this.formItem.depositBank){
             url+="&depositBank="+this.formItem.depositBank
          }

          if(this.formItem.registrationUmber){
             url+="&registrationUmber="+this.formItem.registrationUmber
          }
          if(this.formItem.enterpriseName){
             url+="&enterpriseName="+this.formItem.enterpriseName
          }
          if(this.formItem.businessLicenceUrl){
             url+="&businessLicenceUrl="+this.formItem.businessLicenceUrl
          }else{
            this.$Message.info("营业执照没有上传")
            return
          }

       this.$api.post(url,null,reset => {
         if (reset.codeId === 1) {
            _this.$router.push({path:"/dealer/list"})
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
