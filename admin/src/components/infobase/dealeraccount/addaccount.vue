<template>
   <div class="">
     <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加经销商帐号</span>
       </p>
       <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <FormItem label="经销商:" requery required>
             <div class="">
                 <dearle-component @dearleEmitComponent="dearleEmitComponent"></dearle-component>
             </div>
           </FormItem>
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
             <FormItem label="真实名字:" prop="realName">
                 <Input v-model="formValidate.realName" placeholder="请输入真实名字"></Input>
             </FormItem>
             <FormItem label="手机号码:" prop="telephone">
                 <Input v-model="formValidate.telephone" placeholder="请输入手机号码"></Input>
             </FormItem>
             <FormItem label="角色:" required>
                 <role-conponent @roleselect="roleselect"></role-conponent>
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
    import roleConponent from '../../pub/roledearleComponent.vue'
    import dearleComponent from '../../pub/dearleComponent.vue'
    export default {
        props:{
          dearleaddcountshow:{
            default:false
          }
        },
        components: {
          roleConponent,
          dearleComponent
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
                    dealerId:'',
                    dealerRoleId:'',
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
            dearleEmitComponent (e) {
                this.formValidate.dealerId = e
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
                      _this.$emit('dealerEmitdata',{addshow:false})
                    },
                    onCancel: () => {
                       _this.show = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.formValidate.dep==""){
                            this.$Message.error('部门没有选择')
                            return
                        }
                        if(this.formValidate.role==""){
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
                var url = "?token=" + this.$webapi.get('token')
                var data = {
                  token:this.$webapi.get('token'),
                  password:this.formValidate.password,
                  loginName:this.formValidate.loginName,
                  dealerId:this.formValidate.dealerId,
                  dealerRoleId:parseInt(this.formValidate.dealerRoleId),
                  realName:this.formValidate.realName,
                  telephone:this.formValidate.telephone,
                  dealerStorefrontId:this.formValidate.dealerStorefrontId
                }
              this.$api.post("/dealer_account/add", data, reset => {
                if (reset.codeId === 1) {
                    _this.$Message.success('添加成功');
                    _this.$emit('dealerEmitdata',{addshow:false})
                    _this.$router.push({path:"/dealerAccount"})
                }else {
                   _this.$netcode.getApiCode(reset)
                   _this.show = true
                }
              })
            }
        }
    }
</script>
