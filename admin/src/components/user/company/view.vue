<template>
	<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/user/company">企业用户认证</BreadcrumbItem>
                <BreadcrumbItem>企业信息详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>企业信息详情</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" label-position="left">
                <div class="pagelist">
                    <div class="pagelist-hd">企业信息详情</div>
                    <div class="pagelist-bd">
                        <Row>
                          <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="企业名称:" prop="realName">
                                   <p>{{formItem.name}}</p>
                                </FormItem>
                            </Col>
                          <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="认证状态:" prop="realName">
                                   <span v-if="formItem.status==-1">未提交资料</span>
                                   <span v-if="formItem.status==0">待认证</span>
                                   <span v-if="formItem.status==1">已认证</span>
                                </FormItem>
                            </Col>
                           <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="省市区:" prop="pca">
                                    <p>{{formItem.provinceName}}{{formItem.cityName}}{{formItem.areaName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="具体地址:" prop="address">
                                    <p>{{formItem.address}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="联系人:" >
                                    <p>{{formItem.contactName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="联系电话:" prop="contactTelephone">
                                    <p>{{formItem.contactTelephone}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="营业执照:">
                                    <p>{{formItem.businessLicenseNo}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="营业执照图片:" prop="businessLicense" >
                                    <img :src="formItem.businessLicense" alt="" width="150">
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="营业执照图片:" prop="pic" >
                                    <img :src="formItem.pic" alt="" width="150">
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                    <FormItem>
                      <p style="text-align:center" v-if="formItem.status==0 && itemshow">
                        <Button type="primary" @click="handleSubmit()" size="large">认证通过</Button>
                      </p>
                    </FormItem>
                </div>
            </Form>
        </div>
    </div>
</div>
</template>
<script>
  import auitComponent from './auit.vue'
	import citycommon from "../../pub/iviewarea.vue"
  import Upload from "../../pub/Uploadimg.vue"
	export default{
		components: {
	        citycommon,
	        Upload,
          auitComponent
	    },
	    created(){
	    	this.list()
	    },
		data(){
			return {
        auitshow:false,
				itemshow:false,
				formItem: {},
			}
		},

		methods:{
      handleSubmit (e) {
        let _this = this
        var data = {
            userAccountId:this.$route.params.id,
            token:this.$webapi.get("token"),
            status:1
        }
        this.$api.post("/user_enterprise/approve", data, reset => {
          if (reset.codeId === 1) {
              _this.$Message.success('认证成功')
              _this.$router.push({path:"/user/company"})
          }else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      editCarcomponent (e){
        this.auitshow = false
        this.$router.push({path:"/user/company"})
      },
			list(){
				var _this = this;
				let datas={
					token:this.$webapi.get('token'),
					userAccountId:this.$route.params.id
				}
				this.$api.get("/user_enterprise/get_by_accountId",datas,reset=>{
					if (reset.codeId===1) {
						_this.formItem = reset.resData
						_this.formItem.driverLicenseMaturity=this.$webapi.gettime('date',(reset.resData.driverLicenseMaturity)/1000)
						_this.itemshow = true
					}
				})
			}
		}
	}
</script>
