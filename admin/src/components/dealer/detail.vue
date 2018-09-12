<style scoped lang="less">
</style>

<template>

<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/dealer/list/">经销商列表</BreadcrumbItem>
                <BreadcrumbItem>经销商信息详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>经销商信息详情</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="经销商简称:" prop="name">
                                    <!-- <Input v-model="formItem.name" placeholder="经销商名称"></Input> -->
                                    <p>{{formItem.name}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="经销商采购编号:" prop="abbreviation">
                                    <!-- <Input v-model="formItem.abbreviation" placeholder="经销商简称"></Input> -->
                                    <p>{{formItem.abbreviation}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="公司电话:" prop="companyPhone">
                                    <!-- <Input v-model="formItem.companyPhone" placeholder="公司电话"></Input> -->
                                    <p>{{formItem.companyPhone}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="24">
                                <FormItem label="上传店实景照:">
                                     <!-- <Upload :Uploadimg="formItem.icon" v-if="Uploadshow"></Upload> -->
                                     <img :src="formItem.icon" alt="" width="150" height="150">
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="8">
                                      <FormItem label="联系人:" prop="contactName" >
                                          <!-- <Input v-model="formItem.contactName" placeholder="联系人"></Input> -->
                                          <p>{{formItem.contactName}}</p>
                                      </FormItem>
                                  </Col>
                                </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="联系人电话:" prop="contactTelephone" >
                                    <!-- <Input v-model="formItem.contactTelephone" placeholder="联系人电话" ></Input> -->
                                    <p>{{formItem.contactTelephone}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="24"></Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="选择城市" required>
                                    <citycommon :areaData="areaData" :ciytshow="0"></citycommon>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="具体地址" prop="address">
                                    <!-- <Input v-model="formItem.address" type="textarea" :rows="4" placeholder="具体地址"></Input> -->
                                    <p>{{formItem.address}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
            </Form>
            <Form ref="formItems" :model="formItems" :label-width="100">
                <div class="pagelist">
                     <div class="pagelist-hd">企业信息</div>
                     <div class="pagelist-bd">
                       <Row>
                       <Col :xs="24" :sm="24" :md="24" :lg="24">
                         <FormItem label="企业名称:" prop="enterpriseName">
                             <!-- <Input v-model="formItems.enterpriseName" placeholder="企业名称"></Input> -->
                             <p>{{formItems.enterpriseName}}</p>
                         </FormItem>
                       </Col>
                       <Col :xs="24" :sm="24" :md="24" :lg="24">
                         <FormItem label="组织代码号:" prop="registrationUmber">
                             <!-- <Input v-model="formItems.registrationUmber" placeholder="组织代码号"></Input> -->
                             <p>{{formItems.registrationUmber}}</p>
                         </FormItem>
                       </Col>
                       <Col :xs="24" :sm="24" :md="24" :lg="24">
                         <FormItem label="营业执照:" prop="businessLicenceUrl">
                            <!-- <Upload :Uploadimg="formItems.businessLicenceUrl" v-if="Uploadshow"></Upload> -->
                            <img :src="formItems.businessLicenceUrl" alt="" width="150" height="150">
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
                            <FormItem label="开户行:" prop="depositBank">
                                <!-- <Input v-model="formItems.depositBank" placeholder="开户行"></Input> -->
                                <p>{{formItems.depositBank}}</p>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                          <FormItem label="银行卡号:" prop="bankCard">
                              <!-- <Input v-model="formItems.bankCard" placeholder="银行卡号"></Input> -->
                              <p>{{formItems.bankCard}}</p>
                          </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                          <FormItem label="收款方:" prop="payee">
                              <!-- <Input v-model="formItems.payee" placeholder="收款方"></Input> -->
                              <p>{{formItems.payee}}</p>
                          </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                          <FormItem label="联系人:" prop="receiptContactName">
                              <!-- <Input v-model="formItems.receiptContactName" placeholder="联系人"></Input> -->
                              <p>{{formItems.receiptContactName}}</p>
                          </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                          <FormItem label="联系人电话:" prop="receiptContactTelephone">
                              <!-- <Input v-model="formItems.receiptContactTelephone" placeholder="手机号码"></Input> -->
                              <p>{{formItems.receiptContactTelephone}}</p>
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                 </div>
            </Form>
        </div>
    </div>
</div>

</template>
<script>
    import citycommon from "../pub/iviewarea.vue"
    import Upload from "../pub/Uploadimg.vue"
export default{
    components: {
        citycommon,
        Upload
    },
    created() {
      //do something after creating vue instance
        this.list()
    },
    mounted(){
        this.lists()
    },
    data(){
        return {
            formItem: {

            },
            formItems: {
                bankCard: '',
                depositBank: '',
                payee:'',
                receiptContactName:'',
                receiptContactTelephone:"",
                enterpriseName:"",
                registrationUmber:"",
                businessLicenceUrl:""
            },
            UploadshowTow:false,
            Uploadshow:false,
            areaData:[],
        }
    },
    methods:{
        list(){
            var listdata = {
                name:this.$route.query.name,
                token:this.$webapi.get('token'),
            }
            var _this =  this
            this.$api.get('/dealer/getList',listdata,reset => {
                if (reset.codeId === 1) {
                    _this.formItem = reset.resData[0]
                    _this.areaData.push(reset.resData[0].provinceCode)
                    _this.areaData.push(reset.resData[0].cityCode)
                    _this.areaData.push(reset.resData[0].areaCode)
                    _this.Uploadshow=true
                } else {
                  //  _this.$netcode.getApiCode(reset)
                }
            })
        },
        lists () {
            var listdata = {
                dealerId:this.$route.params.id,
                token:this.$webapi.get('token'),
            }
            var _this =  this
            this.$api.get('/dealer_information/getOneByDealerId',listdata,reset => {
                if (reset.codeId === 1) {
                    _this.formItems.bankCard = reset.resData.bankCard
                    _this.formItems.depositBank = reset.resData.depositBank
                    _this.formItems.payee = reset.resData.payee
                    _this.formItems.receiptContactName = reset.resData.receiptContactName
                    _this.formItems.receiptContactTelephone = reset.resData.receiptContactTelephone
                    _this.formItems.enterpriseName = reset.resData.enterpriseName
                    _this.formItems.registrationUmber = reset.resData.registrationUmber
                    _this.formItems.businessLicenceUrl = reset.resData.businessLicenceUrl
                    _this.UploadshowTow = true
                } else {
                  //  _this.$netcode.getApiCode(reset)
                }
            })
        },
    }
}

</script>
