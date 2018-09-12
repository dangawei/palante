<template>
  <div>
      <div class="pageHeader">
          <div class="pageBread">
              <Breadcrumb>
                  <BreadcrumbItem to="/">首页</BreadcrumbItem>
                  <BreadcrumbItem to="/dealer/list/">会员管理</BreadcrumbItem>
                  <BreadcrumbItem>认证驾驶证</BreadcrumbItem>
              </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                  <h2>认证驾驶证</h2>
              </div>
          </div>
      </div>
      <div class="page-view allm20">
          <div class="page-view-body">
              <Form ref="formItem" :model="formItem"  :label-width="100">
                  <div class="pagelist">
                      <div class="pagelist-hd">基本信息</div>
                      <div class="pagelist-bd">
                          <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="状态" prop="name">
                                    <span v-if="formItem.identityCardApproveStatus==0">
                                        待审核
                                    </span>
                                </FormItem>
                            </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="姓名" prop="name">
                                       {{formItem.realName}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="手机号码" prop="abbreviation">
                                    {{formItem.telephone}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="生日" prop="abbreviation">
                                    {{formItem.birthday}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="年龄" >
                                    {{formItem.age}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="具体地址" >
                                    {{formItem.provinceName}}{{formItem.cityName}}{{formItem.areaName}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="24" :lg="24">
                                  <FormItem label="身份证号码" prop="companyPhone">
                                      {{formItem.identityCard}}
                                  </FormItem>
                              </Col>
                              <Col :xs="24" :sm="24" :md="12" :lg="24">
                                <Row>
                                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                                      <FormItem label="身份证正反面">
                                        <div class="">
                                          <span class="fl">
                                              <img :src="formItem.identityCardUpUrl" alt="" width="300" height="300">
                                          </span>
                                          <span class="fl">
                                              <img :src="formItem.identityCardDownUrl" alt="" width="300" height="300">
                                          </span>
                                        </div>
                                      </FormItem>
                                    </Col>
                                </Row>
                              </Col>
                          </Row>
                      </div>
                      <div class="page-divider page-divider-horizontal "></div>
                  </div>
                  <FormItem>
                      <Button type="primary" @click="handleSubmit('formItem')" size="large">身份认证通过</Button>
                      <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px" size="large">取消</Button>
                  </FormItem>
              </Form>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    data () {
        return {
            formItem:{
              name:"",
              status:1,
              registerType:'',
              userType:"",
            },
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      list () {
        var listdata = {
          userAccountId:this.$route.params.id,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.post('/user_information/getOneByUserAccountId',listdata,reset => {
          if (reset.codeId === 1) {
             _this.formItem = reset.resData
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      handleSubmit (name) {
          this.post()
      },
      handleReset () {
          this.$router.push({path:"/member/card/"})
      },
      post () {
        var listdata = {
          userAccountId:this.formItem.userAccountId,
          identityCardApproveStatus:1,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.post('/user_information/updateIdentityCardApproveStatus',listdata,reset => {
          if (reset.codeId === 1) {
              this.$router.push({path:"/member/card/"})
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
        })
      }
    }
  }
</script>
