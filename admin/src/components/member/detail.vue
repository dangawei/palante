<template>
	<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/member/list/">会员列表</BreadcrumbItem>
                <BreadcrumbItem>用户个人信息详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>用户个人信息详情</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" label-position="left">
                <div class="pagelist">
                    <div class="pagelist-hd">个人信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="真实姓名:" prop="realName">
                                    <p>{{formItem.realName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="性别:" prop="sex">
                                    <p v-if="formItem.sex==1">男</p>
																		<p v-if="formItem.sex==2">女</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="生日:" prop="birthday">

                                    <p>{{formItem.birthday}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="年龄:" prop="age">
                                    <p>{{formItem.age}}</p>
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
                                <FormItem label="联系电话:" prop="telephone">
                                    <p>{{formItem.telephone}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="身份证号:">
                                    <p>{{formItem.identityCard}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="身份证正面图片:" prop="identityCardUpUrl" >
                                    <img :src="formItem.identityCardUpUrl" alt="" width="150">
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="身份证背面图片:" prop="identityCardDownUrl" >
                                    <img :src="formItem.identityCardDownUrl" alt="" width="150">
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="驾照号:" prop="driverLicense" >
                                    <p>{{formItem.driverLicense}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="驾照到期时间:" prop="driverLicenseMaturity" >
                                    <p>{{formItem.driverLicenseMaturity}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="驾照图片:" prop="driverLicenseUrl" >
                                    <img :src="formItem.driverLicenseUrl" alt="" width="150">
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
                <!-- <div class="pagelist">
				<div class="pagelist-hd">操作信息</div>
					<div class="pagelist-bd">
					<Row>
						<Col :xs="24" :sm="24" :md="24" :lg="24">
						 <FormItem label="审批时间:" prop="identityCardApproveStatus">

						    <p>{{formItems.identityCardApproveStatus}}</p>
						 </FormItem>
						</Col>
						<Col :xs="24" :sm="24" :md="24" :lg="24">
							<FormItem label="审批状态:" prop="registrationUmber">
							    <p>{{formItems.registrationUmber}}</p>
							</FormItem>
						</Col>
					</Row>
					</div>
					<div class="page-divider page-divider-horizontal "></div>
				</div> -->
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
	    created(){
	    	this.list()
	    },
		data(){
			return {
				formItem: {},
			}
		},

		methods:{
			list(){
				let datas={
					token:this.$webapi.get('token'),
					userAccountId:this.$route.params.id
				}
				this.$api.post("/user_information/getOneByUserAccountId",datas,reset=>{
					if (reset.codeId===1) {
						this.formItem=reset.resData
						this.formItem.driverLicenseMaturity=this.$webapi.gettime('date',(reset.resData.driverLicenseMaturity)/1000)
						console.log(this.formItem)
					}
				})
			}
		}
	}
</script>
