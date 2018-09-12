<style scoped lang="less">
</style>

<template>

<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/dealer/list/">经销商列表</BreadcrumbItem>
                <BreadcrumbItem>修改经销商信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>修改经销商信息</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="经销商名称" prop="name">
                                    <Input v-model="formItem.name" placeholder="经销商名称"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="经销商简称" prop="abbreviation">
                                    <Input v-model="formItem.abbreviation" placeholder="经销商简称"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="公司电话" prop="companyPhone">
                                    <Input v-model="formItem.companyPhone" placeholder="公司电话"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="24">
                              <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="6">
                                    <FormItem label="分公司名称" required>
                                        <subcompany @subcompanyemit="subcompanyemit" v-if="subshow" :subCompanyId="formItem.adminSubCompanyId"></subcompany>
                                    </FormItem>
                                  </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="24">
                                <FormItem label="上传店实景照" required>
                                     <Upload @uploadComponent="uploadComponent" :Uploadimg="formItem.icon" v-if="Uploadshow"></Upload>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="8">
                                      <FormItem label="联系人" prop="contactName" >
                                          <Input v-model="formItem.contactName" placeholder="联系人"></Input>
                                      </FormItem>
                                  </Col>
                                </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="联系人电话" prop="contactTelephone" >
                                    <Input v-model="formItem.contactTelephone" placeholder="联系人电话" ></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="24"></Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="选择城市" required>
                                    <citycommon @areaEmit="endcommoncity" :areaData="areaData"></citycommon>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="具体地址" prop="address">
                                    <Input v-model="formItem.address" autocomplete="no" type="textarea" :rows="4" placeholder="具体地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">保存完成</Button>
                    <Button type="primary" @click="handleContinue('formItem')" size="large">保存,继续修改</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>

</template>

<script>
import subcompany from '../pub/subcompany.vue'
import citycommon from "../pub/iviewarea.vue"
import Upload from "../pub/Uploadimg.vue"
export default {
    name: 'index',
    components: {
        citycommon,
        Upload,
        subcompany
    },
    props: ['propdearledata'],
    created() {
      //do something after creating vue instance
        this.list()
    },
    mounted() {
      //do something after mounting vue instance
    },
    data() {
      const validateMobile = (rule, value, callback) => {
              var myreg=this.$Validate.gettel()
              if (!myreg.test(value)) {
                  callback(new Error('手机号码格式不对'));
              } else {
                  callback();
              }
       }
        return {
            formItem: {

            },
            subshow:false,
            btnNum:0,
            // 源数据
            sourceData:{},
            Uploadshow:false,
            areaData:[],
            ruleValidate: {
                abbreviation: [{
                    required: true,
                    message: '经销商简称没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '经销商简称没有填写',
                    trigger: 'blur'
                }],
                companyPhone: [{
                    required: true,
                    message: '公司电话没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '公司电话没有填写',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '经销商名称没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '经销商名称没有填写',
                    trigger: 'blur'
                }],
                contactName: [{
                    required: true,
                    message: '联系人没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '联系人长度不能超过20字符',
                    trigger: 'blur'
                }],
                contactTelephone: [{
                    required: true,
                    message: '联系电话没有填写',
                    trigger: 'blur'
                },
                {validator: validateMobile, trigger: 'blur'}
              ],
                address: [{
                    required: true,
                    message: '地址没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 5,
                    message: '地址最小不能5个字符',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        subcompanyemit (e){
            this.formItem.adminSubCompanyId = e
        },
        uploadComponent (e){
            this.formItem.icon = e[0];
        },
        endcommoncity(e) {
            this.formItem.provinceCode = e[0].code
            this.formItem.cityCode = e[1].code
            this.formItem.areaCode = e[2].code
        },
        handleSubmit(name) {
            this.btnNum=1;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.post()
                }
            })
        },
        handleContinue(name) {
            this.btnNum=2
            this.post()
        },
        list(){
            var listdata = {
                name:this.$route.query.name,
                token:this.$webapi.get('token'),
            }
            var _this =  this
            this.$api.get('/dealer/getList',listdata,reset => {
                if (reset.codeId === 1) {
                    var data = reset.resData[0]
                    _this.formItem = data
                    _this.areaData.push(reset.resData[0].provinceCode)
                    _this.areaData.push(reset.resData[0].cityCode)
                    _this.areaData.push(reset.resData[0].areaCode)
                    _this.Uploadshow=true
                    _this.sourceData=JSON.parse(JSON.stringify(reset.resData[0]))
                    _this.subshow =true
                } else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
     post () {
       var _this =  this
        var datas={
            token:this.$webapi.get('token'),
            id:parseInt(this.$route.params.id),
            provinceCode:this.formItem.provinceCode,
            cityCode:this.formItem.cityCode,
            areaCode:this.formItem.areaCode
        }
        if(this.formItem.adminSubCompanyId!=this.sourceData.adminSubCompanyId){
          // url += "&abbreviation="+this.formItem.abbreviation
          datas.subCompanyId=parseInt(this.formItem.adminSubCompanyId)
        }
        if(this.formItem.abbreviation!=this.sourceData.abbreviation){
          // url += "&abbreviation="+this.formItem.abbreviation
          datas.abbreviation=this.formItem.abbreviation
        }
        if(this.formItem.icon!=this.sourceData.icon){
          // url += "&icon="+this.formItem.icon
          datas.icon=this.formItem.icon
        }
        if(this.formItem.name!=this.sourceData.name){
          // url += "&name="+this.formItem.name
          datas.name=this.formItem.name
        }
        if(this.formItem.companyPhone!=this.sourceData.companyPhone){
          // url += "&companyPhone="+this.formItem.companyPhone
          datas.companyPhone=this.formItem.companyPhone
        }
        if(this.formItem.contactTelephone!=this.sourceData.contactTelephone){
          // url += "&contactTelephone="+this.formItem.contactTelephone
          datas.contactTelephone=this.formItem.contactTelephone
        }
        if(this.formItem.contactName!=this.sourceData.contactName){
            // url += "&contactName="+this.formItem.contactName
            datas.contactName=this.formItem.contactName
        }
        if(this.formItem.address!=this.sourceData.address){
            // url += "&address="+this.formItem.address
            datas.address=this.formItem.address
        }
        if(this.formItem.adminSubCompanyId=="" || this.formItem.adminSubCompanyId==undefined || this.formItem.adminSubCompanyId==null){
          this.$Message.info("分公司选择没有")
           return
        }
        if(this.formItem.icon=="" || this.formItem.icon==undefined || this.formItem.icon==null){
          this.$Message.info("店招没有上传")
           return
        }
       this.$api.post("/dealer/update",datas,reset => {
         if (reset.codeId === 1) {
            if (this.btnNum==1) {
                _this.$router.push({path:"/dealer/list"})
            }
            if (this.btnNum==2) {
                this.$router.push({path:"/dealer/editbank/"+this.$route.params.id})
            }
         } else {
           _this.$netcode.getApiCode(reset)
        }
       })
     }
    }
}

</script>
