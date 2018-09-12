<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号:" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="密码:" prop="pwd">
            <div class="" v-if="passwordshow">
                <Input type="password" v-model="formValidate.pwd" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
            </div>
            <div class="" v-else>
                <Input v-model="formValidate.pwd" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
            </div>
        </FormItem>
        <FormItem label="账号类型:">
          <Select v-model="formValidate.accountType">
              <Option value="1">总公司</Option>
              <Option value="2">分公司</Option>
          </Select>
        </FormItem>
        <FormItem label="分公司:" v-if="formValidate.accountType==2">
            <subcompany @subcompanyemit="subcompanyemit"></subcompany>
        </FormItem>
        <FormItem label="姓名:" prop="realName">
            <Input v-model="formValidate.realName" placeholder="请输入真实姓名"></Input>
        </FormItem>
        <FormItem label="手机:" prop="telephone">
            <Input v-model="formValidate.telephone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="部门:" required>
          <department-conponent @departmentselect="departmentselect" :department="departmentvalue" v-if="show"></department-conponent>
        </FormItem>
        <FormItem label="角色:" required>
            <role-conponent @roleselect="roleselect" v-if="show"></role-conponent>
        </FormItem>
        <FormItem>
           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >确定</Button>
          <Button type="error" @click="handleReset('formValidate')">取消</Button>
       </FormItem>

    </Form>
</template>
<script>
    import {vm} from '../../../js/infobase/vm.js'
    import departmentConponent from '../../pub/departmentComponent.vue'
    import roleConponent from '../../pub/roleComponent.vue'
    import subcompany from '../../pub/subcompany.vue'
    export default {
        components: {
          departmentConponent,
          roleConponent,
          subcompany
        },
        mounted() {
          //do something after mounting vue instance
          this.show = true
        },
        data () {
          const validateTel = (rule, value, callback) => {
               var reg = this.$Validate.gettel()
               if (!reg.test(value)) {
                   callback(new Error('手机格式不对'))
               } else {
                   callback()
               }
           };
            return {
                show:false,
                passwordshow:true,
                departmentvalue:"",
                formValidate: {
                    bool:false,
                    pwd:'',
                    name:'',
                    dep:'',
                    role:'',
                    realName:'',
                    telephone:'',
                    accountType:'1',
                    adminSubCompanyId:""
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '账号长度5-20位', trigger: 'blur' }
                    ],

                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '密码长度5-20位', trigger: 'blur' }
                    ],

                    dep: [
                        { required: true, message: '请输入部门id', trigger: '' }
                    ],
                    role: [
                        { required: true, message: '请输入角色id', trigger: '' }
                    ],
                    realName: [
                        { required: true, message: '请输入真实姓名', trigger: '' }
                    ],
                    telephone: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            subcompanyemit (e) {
              this.formValidate.adminSubCompanyId = e
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
            remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    vm.$emit("addmodal",this.formValidate.bool)
                  },
                  onCancel: () => {
                     this.ashow = true
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
                        this.post()
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields()
                // this.formValidate.name = ""
                // vm.$emit("addmodal",this.formValidate.bool)
                this.remove()
            },
            post () {
              let _this = this;
              var data = {
                  token:this.$webapi.get('token'),
                  loginName:this.formValidate.name,
                  password:this.formValidate.pwd,
                  adminRoleId:this.formValidate.role,
                  adminDepartmentId:this.formValidate.dep,
                  realName:this.formValidate.realName,
                  telephone:this.formValidate.telephone,
                  accountType:this.formValidate.accountType   
              }
              if(this.formValidate.accountType==2){
                  data.adminSubCompanyId = this.formValidate.adminSubCompanyId
              }
              this.$api.post("/admin_account/add", data, reset => {
                if (reset.codeId === 1) {
                    vm.$emit("addmodal",this.formValidate.bool)
                    _this.formValidate.departmentvalue = ""
                    _this.formValidate.role = ""
                }else {
                  _this.$netcode.getApiCode(reset)
                }
              })
            }
        }
    }
</script>
