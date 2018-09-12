<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/company">供应商列表</BreadcrumbItem>
                <BreadcrumbItem>添加供应商信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加供应商信息</h2>
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
                                     <Upload @uploadComponent="companylogo" ></Upload>
                                     <div class="mt10">
                                        <Alert type="warning" show-icon>图片不能超过2M</Alert>
                                     </div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="采购联系人" prop="contact">
                                    <Input v-model="formItem.contact" placeholder="采购联系人"></Input>
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
                                     <Upload @uploadComponent="uploadComponentpic"></Upload>
                                     <div class="mt10">
                                        <Alert type="warning" show-icon>图片不能超过2M</Alert>
                                     </div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="营业执照编号" prop="businessLicenseNo">
                                    <Input  v-model="formItem.businessLicenseNo" placeholder="营业执照编号"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="企业营业执照" required>
                                     <Upload @uploadComponent="uploadComponentbusinessLicense" ></Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="省市区" required>
                                    <citycommon @areaEmit="areaEmit"></citycommon>
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
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">添加</Button>
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
            ruleValidate: {
                name: [{
                    required: true,
                    message: '公司名称没有填写',
                    trigger: 'blur'
                }],
                contact: [{
                    required: true,
                    message: '采购联系人没有填写',
                    trigger: 'blur'
                }],
                brief: [{
                    required: true,
                    message: '公司介绍没有填写',
                    trigger: 'blur'
                }],
                businessLicenseNo:[{
                  required: true,
                  message: '营业执照编号没有填写',
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
    methods:{
      companylogo (e) {
        this.formItem.icon = e[0]
      },
      uploadComponentpic (e) {
         this.formItem.pic = e[0]
      },
      uploadComponentbusinessLicense (e){
        this.formItem.businessLicense = e[0]
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
                  if (this.formItem.provinceCode&&this.formItem.cityCode) {
                    this.post()
                  }else{
                    this.$Message.error("没有选择省市!")
                  }
                }
            })
        },
        post () {
        let _this = this;
            var data = {
              token:this.$webapi.get('token'),
              name:this.formItem.name,
              contactName:this.formItem.contact,
              contactTelephone:this.formItem.contactTelephone,
              provinceCode:this.formItem.provinceCode,
              cityCode:this.formItem.cityCode,
              areaCode:this.formItem.areaCode,
              provinceName:this.formItem.provinceName,
              cityName:this.formItem.cityName,
              areaName:this.formItem.areaName,
              address:this.formItem.address,
              pic:this.formItem.pic,
              businessLicense:this.formItem.businessLicense,
              brief:this.formItem.brief,
              icon:this.formItem.icon,
              businessLicenseNo:this.formItem.businessLicenseNo
            }
            this.$api.post("/enterprise/save", data, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('添加成功!');
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
