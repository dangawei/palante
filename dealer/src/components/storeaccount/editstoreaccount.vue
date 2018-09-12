<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="账号:" prop="loginName">
                 <Input v-model="formValidate.loginName" placeholder="请输入账号"></Input>
             </FormItem>
             <FormItem label="密码:" prop="password">
               <div class="" v-if="passwordshow">
                   <Input type="password" v-model="formValidate.password" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
               </div>
               <div class="" v-else>
                   <Input v-model="formValidate.password" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
               </div>
             </FormItem>
             <FormItem label="角色:" required>
                 <role-conponent @roleselect="roleselect" :roleConponentName="formValidate.dealerRoleName"></role-conponent>
             </FormItem>
             <FormItem label="门店:" required>
                 <store-conponent @storeselect="storeselect" :StoreName="formValidate.dealerStorefrontName"></store-conponent>
             </FormItem>
             <!-- <FormItem label="真实名字:" prop="realName">
                 <Input v-model="formValidate.realName" placeholder="请输入真实名字"></Input>
             </FormItem>
             <FormItem label="手机号码:" prop="telephone">
                 <Input v-model="formValidate.telephone" placeholder="请输入手机号码"></Input>
             </FormItem> -->
             <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >保存</Button>
                <Button type="error" @click="handleReset('formValidate')" >取消</Button>
            </FormItem>
         </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import roleConponent from './getrole.vue'
    import storeConponent from './getstore.vue'
    export default {
        props:['editaccountshow','editaccountdta'],
        components: {
          roleConponent,
          storeConponent
        },
        created() {
          this.eshow=this.editaccountshow
          this.formValidate.id = this.editaccountdta.id
          this.formValidate.password = this.editaccountdta.password
          this.formValidate.loginName = this.editaccountdta.name
          this.formValidate.realName = this.editaccountdta.realName
          this.formValidate.telephone = this.editaccountdta.telephone
          this.formValidate.dealerRoleId = this.editaccountdta.dealerRoleId
          this.formValidate.dealerRoleName = this.editaccountdta.dealerRoleName
          this.formValidate.dealerStorefrontId = this.editaccountdta.dealerStorefrontId
          this.formValidate.dealerStorefrontName = this.editaccountdta.dealerStorefrontName
          this.title="修改"+this.editaccountdta.name+"内容"
        },
        data () {
            return {
                title:"",
                departmentvalue:"",
                formValidate: {
                    bool:false,
                    id:'',
                    password:'',
                    loginName:'',
                    dealerRoleId:'',
                    dealerRoleName:'',
                    dealerStorefrontId:'',
                    dealerStorefrontName:'',
                    accountType:2,
                    realName:"",
                    telephone:""
                },
                ruleValidate: {

                },
                eshow:false
            }
        },
        methods: {
          roleselect (e) {
              this.formValidate.dealerRoleId = e.id
          },
          storeselect (e) {
              this.formValidate.dealerStorefrontId = e.id
          },
          cancel () {
             this.remove()

          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                     this.$emit('editaccountcomponentdata',{editaccountshow:false})
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
               this.remove()

            },
            post () {
              let _this = this;
              // var url = "/dealer_account/update?token=" + this.$webapi.get('token') + "&id=" + this.formValidate.id+"&accountType=2"
              let datas={
                token:this.$webapi.get('token'),
                id:this.formValidate.id,
                accountType:2
              }
              if(this.formValidate.loginName!=this.editaccountdta.name){
                // url+= "&password="+this.formValidate.password
                datas.loginName=this.formValidate.loginName
              }
              if(this.formValidate.password!=this.editaccountdta.password){
                // url+= "&password="+this.formValidate.password
                datas.password=this.formValidate.password
              }
              if(this.formValidate.dealerRoleId!=this.editaccountdta.dealerRoleId){
                // url+= "&dealerRoleId="+this.formValidate.dealerRoleId
                datas.dealerRoleId=this.formValidate.dealerRoleId
              }
              if(this.formValidate.dealerStorefrontId!=this.editaccountdta.dealerStorefrontId){
                // url+= "&dealerStorefrontId="+this.formValidate.dealerStorefrontId
                datas.dealerStorefrontId=this.formValidate.dealerStorefrontId
              }
              this.$api.post("/dealer_account/update",datas, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('修改成功');
                    _this.$emit('editaccountcomponentdata',{editaccountshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
