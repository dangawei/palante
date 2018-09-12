<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/company">供应商列表</BreadcrumbItem>
                <BreadcrumbItem>修改供应商信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>修改供应商信息</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="供应商名称" prop="name">
                                    <Input v-model="formItem.name" placeholder="供应商名称"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="企业LOGO" required>
                                     <Upload @uploadComponent="companylogo"  :Uploadimg="formItem.icon" v-if="Uploadshow"></Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="采购联系人" prop="contactName">
                                    <Input v-model="formItem.contactName" placeholder="采购联系人"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="联系人手机号" prop="contactTelephone">
                                    <Input v-model="formItem.contactTelephone" placeholder="联系人手机号" ></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="公司营业执照号" prop="businessLicense">
                                    <Input v-model="formItem.businessLicense" placeholder="公司营业执照号" ></Input>
                                </FormItem>
                            </Col>
                        </Row> -->
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="公司介绍" prop="brief">
                                    <Input type="textarea" v-model="formItem.brief" placeholder="公司介绍"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="公司图片" required>
                                     <Upload :Uploadimg="formItem.pic" @uploadComponent="companypic"  v-if="Uploadshow"></Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                              <FormItem label="营业执照编号" prop="businessLicenseNo">
                                  <Input v-model="formItem.businessLicenseNo" placeholder="营业执照编号"></Input>
                              </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="企业营业执照" required>
                                      <Upload :Uploadimg="formItem.businessLicense" @uploadComponent="companybusinessLicense" v-if="Uploadshow"></Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="省市区" required>
                                    <citycommon @areaEmit="areaEmit" :areaData="provincedata" v-if="cityshow"></citycommon>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="具体地址" prop="address">
                                    <Input v-model="formItem.address" placeholder="具体地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                   <div class="page-divider page-divider-horizontal "></div>
                </div>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">保存</Button>
                    <Button type="ghost" @click="handleReset('formItem')" size="large">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>
<script>
import citycommon from "../pub/iviewarea.vue"
import Upload from "../pub/Uploadimg.vue"
export default {
    components: {
        citycommon,
        Upload
    },
    data(){
        const validatePhone = (rule, value, callback) => {
              var myreg=this.$Validate.gettel()
              if (!myreg.test(value)) {
                  callback(new Error('手机号码格式不对'));
              } else {
                  callback();
              }
       }
        return{
            formItem: {
                id:"",
                name: '',
                contact:'',
                icon:"",
                pic: "",
                brief:"",
                contactTelephone: "",
                contactName: "",
                address: "",
                businessLicense:'',
                provinceCode: "",
                cityCode: "",
                areaCode: "",
                provinceName: "",
                cityName: "",
                areaName: "",
                businessLicenseNo:""
            },
            cityshow:false,
            Uploadshow:false,
            provincedata:[],
            ruleValidate: {
                name: [{
                    required: true,
                    message: '公司名称没有填写',
                    trigger: 'blur'
                }],
                contactName: [{
                    required: true,
                    message: '采购联系人没有填写',
                    trigger: 'blur'
                }],
                brief: [{
                    required: true,
                    message: '公司介绍没有填写',
                    trigger: 'blur'
                }],
                contactTelephone: [{
                    required: true,
                    message: '联系电话没有填写',
                    trigger: 'blur'
                },{
                    validator: validatePhone, trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '地址没有填写',
                    trigger: 'blur'
                }],
                businessLicense: [{
                    required: true,
                    message: '营业执照号没有填写',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.list()
    },
    methods:{
        list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
              id:this.$route.params.id
          }
          this.$api.get('/enterprise/getOne',data,reset => {
              if (reset.codeId === 1) {
                  let data = reset.resData
                   _this.formItem.id = data.id
                   _this.formItem.name = data.name
                   _this.formItem.contact = data.contact
                   _this.formItem.pic = data.pic
                   _this.formItem.icon = data.icon
                   _this.formItem.brief = data.brief
                   _this.formItem.contactTelephone = data.contactTelephone
                   _this.formItem.contactName = data.contactName
                   _this.formItem.address = data.address
                   _this.formItem.businessLicense = data.businessLicense
                   _this.formItem.provinceCode = data.provinceCode
                   _this.formItem.cityCode = data.cityCode
                   _this.formItem.areaCode = data.areaCode
                   _this.formItem.provinceName = data.provinceName
                   _this.formItem.cityName = data.cityName
                   _this.formItem.areaName = data.areaName
                   _this.formItem.businessLicenseNo = data.businessLicenseNo
                   this.provincedata = [data.provinceCode,data.cityCode,data.areaCode]
                   this.Uploadshow = true
                   this.cityshow = true
              }
              else {
                  _this.$netcode.getApiCode(reset)
              }
          })
        },
        areaEmit(e) {
          this.formItem.provinceCode = e[0].code
          this.formItem.cityCode = e[1].code
          this.formItem.areaCode = e[2].code
          this.formItem.provinceName = e[0].name
          this.formItem.cityName = e[1].name
          this.formItem.areaName = e[2].name
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.post();
                    // this.$router.push('/addbrand');
                }
            })
        },
        companylogo (e) {
            this.formItem.icon = e[0]
        },
        companypic (e) {
            this.formItem.pic = e[0]
        },
        companybusinessLicense (e) {
            this.formItem.businessLicense = e[0]
        },
        post () {
            let _this = this;
            var data = {
               token:this.$webapi.get('token'),
               icon:this.formItem.icon,
               name:this.formItem.name,
               contactName:this.formItem.contactName,
               contactTelephone:this.formItem.contactTelephone,
               provinceCode:this.formItem.provinceCode,
               cityCode:this.formItem.cityCode,
               areaCode:this.formItem.areaCode,
               provinceName:this.formItem.provinceName,
               cityName:this.formItem.cityName,
               areaName:this.formItem.areaName,
               address:this.formItem.address,
               id:this.formItem.id,
               brief:this.formItem.brief,
               businessLicense:this.formItem.businessLicense,
               businessLicenseNo:this.formItem.businessLicenseNo,
               pic:this.formItem.pic
            }
            this.$api.post("/enterprise/update", data, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('修改成功!');
                    this.$router.push('/company');
                }else {
                  _this.$netcode.getApiCode(reset)
                }
            })
        },
      handleReset(name) {
          this.$router.back(-1);
      },
    }
}
</script>
