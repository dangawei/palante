<template>
  <div class="">
   <Modal v-model="eshow" width="360" @on-cancel="cancel">
     <p slot="header">
         <Icon type="information-circled"></Icon>
         <span>重置密码</span>
     </p>
     <div style="text-align:center">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <FormItem label="账号:">
              <div class="" style="text-align:left">
                 {{formValidate.name}}
              </div>
           </FormItem>
           <FormItem label="密码:" prop="pwd">
               <div class="" v-if="passwordshow">
                   <Input type="password" v-model="formValidate.pwd" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
               </div>
               <div class="" v-else>
                   <Input v-model="formValidate.pwd" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
               </div>
           </FormItem>
           <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >确定</Button>
                <Button type="ghost" @click="handleReset('formValidate')">取消</Button>
          </FormItem>
       </Form>
     </div>
    <div slot="footer">
    </div>
    </Modal>
  </div>
</template>
<script>
    export default {
        props: {
            accountcomponent: {
              default:false
            },
            editaccountdta: {
               default:{}
            }
        },
        mounted() {
          //do something after mounting vue instance
          this.eshow = this.accountcomponent
          this.formValidate = this.editaccountdta
        },
        data () {
            return {
                eshow:false,
                passwordshow:true,
                formValidate: {
                    pwd:"",
                    name:""
                },
                ruleValidate: {
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度5-20位', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            cancel () {
               this.remove()
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.eshow = false
                      _this.$emit('dealerEmitdata',{addshow:false})
                    },
                    onCancel: () => {
                       _this.eshow = true
                    }
                });
            },
            password01 () {
               this.passwordshow = !this.passwordshow
            },
            departmentselect (e) {
                this.departmentvalue = e.name
                this.formValidate.dep = e.id
            },
            roleselect (e) {
                this.formValidate.role = e.id
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset () {
              this.remove()
            },
            post () {
              let _this = this;
              var data = {
                token:this.$webapi.get('token'),
                id:this.formValidate.id,
                password:this.formValidate.pwd
              }
              this.$api.post("/admin_account/update", data, reset => {
                if (reset.codeId === 1) {
                     _this.eshow = false
                     _this.$emit('dealerEmitdata',{addshow:false})
                     _this.$router.push({path:"/account"})
                }else {
                  _this.$netcode.getApiCode(reset)
                }
              })
            }
        }
    }
</script>
