<template>
    <div>
      <Modal v-model="editaccountshow" width="360" @on-cancel="cancel">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="编号:" prop="id">
                    <Input v-model="formValidate.id" placeholder="请输入部门编号"></Input>
                </FormItem>
                <FormItem label="账号:" prop="account">
                    <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码:" prop="pwd">
                    <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="姓名:" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="手机号:" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="部门:" prop="dep">
                    <Input v-model="formValidate.dep" placeholder="请输入部门"></Input>
                </FormItem>
                <FormItem label="角色:" prop="role">
                    <Input v-model="formValidate.role" placeholder="请输入角色"></Input>
                </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
        props:['editaccountshow','editaccountdta'],
        created() {
          console.log(this.editaccountdta);
          this.formValidate.account = this.editaccountdta.salt;
          this.formValidate.id = this.editaccountdta.id;
          this.formValidate.pwd = this.editaccountdta.password;
          this.formValidate.name = this.editaccountdta.name;
          this.formValidateadminRoleId = this.editaccountdta.adminRoleId;
          this.formValidate.admingDepartmentId = this.editaccountdta.admingDepartmentId;
          this.title="修改"+this.editaccountdta.name+"内容";
        },
        data () {
            return {
                title:"",
                formValidate:{
                        id:'',
                        account:'',
                        pwd:'',
                        name:'',
                        adminRoleId:'',
                        admingDepartmentId:'',
                },
                ruleValidate: {

                    id: [
                        { required: true, message: '请输入id', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入登录名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
          cancel () {
            this.$emit('editaccountcomponentdata',{editaccountshow:false})
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            post () {
              let _this = this;
              // var url = "/admin_account/update?token=" + this.$webapi.get('token') + "&id=" + this.formValidate.id + "&loginName="+this.formValidate.name+ "&password="+this.formValidate.pwd+ "&adminRoleId="+this.formValidate.adminRoleId+ "&admingDepartmentId="+this.formValidate.admingDepartmentId;
              let datas={
                token:this.$webapi.get('token'),
                id:this.formValidate.id,
                loginName:this.formValidate.name,
                password:this.formValidate.pwd,
                adminRoleId:this.formValidate.adminRoleId,
                admingDepartmentId:this.formValidate.admingDepartmentId
              }
              this.$api.post("/admin_account/update", datas, reset => {
                if (reset.codeId === 1) {
                   _this.$emit('editaccountcomponentdata',{editaccountshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
