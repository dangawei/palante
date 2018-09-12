<template>
	<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/member/list/">会员列表</BreadcrumbItem>
                <BreadcrumbItem>用户企业信息详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>用户企业信息详情</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" label-position="left">
                <div class="pagelist">
                    <div class="pagelist-hd">企业信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="公司名称:" prop="realName">
                                    <p>{{formItem.name}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="营业执照编号:" prop="sex">
                                    <p>{{formItem.businessLicenseNo}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="地址:" prop="birthday">
                                    <p>{{formItem.provinceName}}{{formItem.cityName}}{{formItem.cityName}}{{formItem.address}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="联系人:" prop="age">
                                    <p>{{formItem.contactName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="联系电话:" prop="pca">
                                    <p>{{formItem.contactTelephone}}</p>
                                </FormItem>
                            </Col>
                        </Row>
											  <Row>
													<Col :xs="24" :sm="24" :md="24" :lg="24">
															<FormItem label="公司简介:" prop="identityCardDownUrl" >
																 {{formItem.brief}}
															</FormItem>
													</Col>
													<Col :xs="24" :sm="24" :md="12" :lg="12">
																<FormItem label="营业执照图片:" prop="identityCardUpUrl" >
																		<img :src="formItem.businessLicense" alt="" width="150">
																</FormItem>
														</Col>
														<Col :xs="24" :sm="24" :md="12" :lg="12">
																<FormItem label="公司图片:" prop="identityCardDownUrl" >
																		<img :src="formItem.pic" alt="" width="150">
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
				this.$api.get("/user_enterprise/get_by_accountId",datas,reset=>{
					if (reset.codeId===1) {
						this.formItem=reset.resData
					}
				})
			}
		}
	}
</script>
