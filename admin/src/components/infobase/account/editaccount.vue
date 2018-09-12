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
                    <subcompany @subcompanyemit="subcompanyemit" :subCompanyId="formValidate.adminSubCompanyId"></subcompany>
                </FormItem>
                <FormItem label="部门:" prop="dep">
                      <department-conponent @departmentselect="departmentselect" :department="formValidate.departmentName"></department-conponent>
                </FormItem>
                <FormItem label="角色:" prop="role">
                    <role-conponent @roleselect="roleselect" :propRoleName="formValidate.roleName" ></role-conponent>
                </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import departmentConponent from '../../pub/departmentComponent.vue'
    import roleConponent from '../../pub/roleComponent.vue'
    import subcompany from '../../pub/subcompany.vue'
    export default {
        props:['editaccountshow','editaccountdta'],
        components: {
          departmentConponent,
          roleConponent,
          subcompany
        },
        created() {
          // console.log(this.editaccountdta)
          this.formValidate.id = this.editaccountdta.id
          this.formValidate.pwd = this.editaccountdta.password
          this.formValidate.name = this.editaccountdta.name
          this.formValidate.departmentName = this.editaccountdta.departmentName
          this.formValidate.roleName = this.editaccountdta.roleName
          this.formValidate.accountType = ''+ this.editaccountdta.accountType
          this.formValidate.adminSubCompanyId = this.editaccountdta.adminSubCompanyId
          this.title="修改"+this.editaccountdta.name+"内容"
        },
        data () {
            return {
                title:"",
                departmentvalue:"",
                passwordshow:true,
                formValidate:{
                    id:'',
                    pwd:'',
                    name:'',
                    adminRoleId:'',
                    adminDepartmentId:'',
                    departmentName:'',
                    roleName:'',
                    accountType:'1',
                    adminSubCompanyId:""
                },
                ruleValidate: {

                },
                eshow:false
            }
        },
        mounted(){
          this.eshow=this.editaccountshow
        },
        methods: {
          subcompanyemit (e) {
            this.formValidate.adminSubCompanyId = e
          },
          password01 () {
            this.passwordshow = !this.passwordshow
          },
          departmentselect (e) {
              this.formValidate.adminDepartmentId = e.id
              // console.log(e);
          },
          roleselect (e) {
              this.formValidate.adminRoleId = e.id
          },
          cancel () {
            this.remove();
            // this.$emit('editaccountcomponentdata',{editaccountshow:false})
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
                    }else{
                      _this.$netcode.getApiCode(reset)
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
                  password:this.formValidate.pwd,
                  adminRoleId:this.formValidate.adminRoleId,
                  adminDepartmentId:this.formValidate.adminDepartmentId,
                  accountType:this.formValidate.accountType
              }
              if(this.formValidate.accountType==2){
                  data.adminSubCompanyId = this.formValidate.adminSubCompanyId
              }
              this.$api.post("/admin_account/update", data, reset => {
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
