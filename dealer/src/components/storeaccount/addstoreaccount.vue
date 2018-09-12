<template>
   <div class="">
     <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加门店帐号</span>
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
                 <role-conponent @roleselect="roleselect"></role-conponent>
             </FormItem>
             <FormItem label="门店:" required>
                 <store-conponent @storeselect="storeselect"></store-conponent>
             </FormItem>
             <FormItem label="真实名字:" prop="realName">
                 <Input v-model="formValidate.realName" placeholder="请输入真实名字"></Input>
             </FormItem>
             <FormItem label="手机号码:" prop="telephone">
                 <Input v-model="formValidate.telephone" placeholder="请输入手机号码"></Input>
             </FormItem>
             
             <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >添加</Button>
                <Button type="error" @click="handleReset('formValidate')" >取消</Button>
            </FormItem>
         </Form>
       </div>
       <div slot="footer"></div>
     </Modal>
   </div>
</template>
<script>
    import roleConponent from './getrole.vue'
    import storeConponent from './getstore.vue'
    export default {
        props:{
          dearleaddcountshow:{
            default:false
          }
        },
        components: {
          roleConponent,
          storeConponent
        },
        data () {
            return {
                departmentvalue:"",
                show:false,
                passwordshow:true,
                formValidate: {
                    bool:false,
                    password:'',
                    loginName:'',
                    dealerRoleId:'',
                    dealerStorefrontId:'',
                    accountType:2,
                    realName:"",
                    telephone:""
                },
                ruleValidate: {
                    loginName: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '账号长度5-20位', trigger: 'blur' }
                    ],
                    realName: [
                        { required: true, message: '请输入真实名字', trigger: 'blur' },
                        { type: 'string', min: 2, max:20, message: '真实名字长度2-20位', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { type: 'string', min:11,max:11, message: '手机号码长度11位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度5-20位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
           this.show = this.dearleaddcountshow
        },
        methods: {
            password01 () {
               this.passwordshow = !this.passwordshow
            },
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
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.show = false
                      _this.$emit('addstoreaccount',{addshow:false})
                    },
                    onCancel: () => {
                       _this.show = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.formValidate.dealerStorefrontId==""){
                            this.$Message.error('门店没有选择')
                            return
                        }
                        if(this.formValidate.dealerRoleId==""){
                            this.$Message.error('角色没有选择')
                            return
                        }
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
              let _this = this;
                // var url = "?token=" + this.$webapi.get('token')
                var data = {
                  token:this.$webapi.get('token'),
                  password:this.formValidate.password,
                  loginName:this.formValidate.loginName,
                  dealerStorefrontId:this.formValidate.dealerStorefrontId,
                  dealerRoleId:parseInt(this.formValidate.dealerRoleId),
                  realName:this.formValidate.realName,
                  telephone:this.formValidate.telephone,
                  accountType:this.formValidate.accountType
                }
              this.$api.post("/dealer_account/add", data, reset => {
                if (reset.codeId === 1) {
                    _this.$Message.success('添加成功');
                    _this.$emit('addstoreaccount',{addshow:false})
                }else {
                   _this.$netcode.getApiCode(reset)
                }
              })
            }
        }
    }
</script>
