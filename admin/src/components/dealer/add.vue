<style scoped lang="less">



</style>

<template>

<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/dealer/list/">经销商列表</BreadcrumbItem>
                <BreadcrumbItem>添加经销商</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加经销商</h2>
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
                                <FormItem label="经销商简称" prop="name">
                                    <Input v-model="formItem.name" autocomplete="no" placeholder="经销商简称"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="经销商采购编号" prop="abbreviation">
                                    <Input v-model="formItem.abbreviation" placeholder="经销商采购编号"></Input>
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
                                        <subcompany @subcompanyemit="subcompanyemit"></subcompany>
                                    </FormItem>
                                  </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="24">
                                <FormItem label="上传店实景照" required>
                                     <Upload @uploadComponent="uploadComponent"></Upload>
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
                                <FormItem label="省市区" required>
                                    <citycommon @areaEmit="areaEmit"></citycommon>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="具体地址" prop="address">
                                    <Input v-model="formItem.address" type="textarea" autocomplete="no" :rows="4" placeholder="具体地址"></Input>
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
    data() {
      const validateMobile = (rule, value, callback) => {
              var myreg= this.$Validate.gettel()
              if (!myreg.test(value)) {
                  callback(new Error('手机号码格式不对'));
              } else {
                  callback();
              }
       }
        return {
            formItem: {
                companyPhone:"",
                abbreviation:"",
                name: '',
                contactTelephone: "",
                enterprisename: "",
                address: "",
                contactName: "",
                icon: "",
                provinceCode: "",
                cityCode: "",
                areaCode: "",
                subCompanyId:""
            },
            ruleValidate: {
                abbreviation: [{
                    required: true,
                    message: '经销商采购编号没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '经销商采购编号没有填写',
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
                    message: '经销商简称没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '经销商简称最多20个字符',
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
        subcompanyemit(e){
          this.formItem.subCompanyId = e
        },
        uploadComponent (e){
            this.formItem.icon = e[0];
        },
        areaEmit(e) {
            this.formItem.provinceCode = e[0].code
            this.formItem.cityCode = e[1].code
            this.formItem.areaCode = e[2].code
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  if (this.formItem.provinceCode&&this.formItem.cityCode) {
                    this.post()
                  }else{
                    this.$Message.error("没有选择省市!")
                  }
                }
            })
        },
      handleReset(name) {
          this.$router.push("/dealer/list");
      },
     post () {
       var _this =  this
       var data = {
          token:this.$webapi.get('token'),
          abbreviation:this.formItem.abbreviation,
          icon:this.formItem.icon,
          name:this.formItem.name,
          contactTelephone:this.formItem.contactTelephone,
          companyPhone:this.formItem.companyPhone,
          contactName:this.formItem.contactName,
          provinceCode:this.formItem.provinceCode,
          cityCode:this.formItem.cityCode,
          areaCode:this.formItem.areaCode,
          address:this.formItem.address,
          subCompanyId:this.formItem.subCompanyId
       }
       if(this.formItem.subCompanyId==""){
         this.$Message.info("分公司选择没有")
          return
       }
       if(this.formItem.icon==""){
         this.$Message.info("店招没有上传")
          return
       }

       this.$api.post("/dealer/save",data,reset => {
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
