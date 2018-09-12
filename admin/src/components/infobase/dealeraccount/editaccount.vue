<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="账号:" prop="name">
                    <div class="textleft">
                       {{formValidate.name}}
                    </div>
                </FormItem>
                <FormItem label="密码:" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="角色:" prop="role">
                    <role-conponent @roleselect="roleselect" :roleConponentName="formValidate.dealerRoleName"></role-conponent>
                </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error" @click="handleReset()" style="margin-left: 8px">取消</Button>
              </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import roleConponent from '../../pub/roledearleComponent.vue'
    export default {
        props:['editaccountshow','editaccountdta'],
        components: {
          roleConponent
        },
        created() {
          this.eshow=this.editaccountshow
          this.formValidate.id = this.editaccountdta.id
          this.formValidate.password = this.editaccountdta.password
          this.formValidate.name = this.editaccountdta.name
          this.formValidate.realName = this.editaccountdta.dealerName
          this.formValidate.telephone = this.editaccountdta.telephone
          this.formValidate.adminRoleId = this.editaccountdta.adminRoleId
          this.formValidate.dealerRoleName = this.editaccountdta.dealerRoleName
          this.formValidate.admingDepartmentId = this.editaccountdta.admingDepartmentId
          this.title="修改"+this.editaccountdta.name+"内容"
        },
        data () {
            return {
                title:"",
                departmentvalue:"",
                formValidate:{
                    id:"",
                    password:'',
                    loginName:'',
                    dealerId:'',
                    dealerRoleId:'',
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
              var data = {
                  token:this.$webapi.get('token'),
                  id:this.formValidate.id,
                  accountType:1,
                  password:this.formValidate.password,
                  dealerRoleId:this.formValidate.dealerRoleId
              }
              this.$api.post("/dealer_account/update", data, reset => {
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
