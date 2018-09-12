<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="编号:" prop="id">
            <Input v-model="formValidate.id" placeholder="请输入部门编号"></Input>
        </FormItem>
        <FormItem label="账号:" prop="account">
            <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="姓名:" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="密码:" prop="pwd">
            <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="手机号:" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="部门:" prop="dep">
            <Input v-model="formValidate.dep" placeholder="请输入部门id"></Input>
        </FormItem>
        <FormItem label="角色:" prop="role">
            <Input v-model="formValidate.role" placeholder="请输入角色id"></Input>
        </FormItem>
        <FormItem>
           <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
       </FormItem>

    </Form>
</template>
<script>
    import {vm} from '../../../js/infobase/vm.js'
    export default {
        data () {
            return {    
                formValidate: {
                    bool:false,
                    id:'',
                    account:'',
                    pwd:'',
                    name:'',
                    phone:'',
                    dep:'',
                    role:'',
                },
                ruleValidate: {
                    
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    
                    dep: [
                        { required: true, message: '请输入部门id', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请输入角色id', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.$emit("addmodal",this.formValidate.bool);
                        
                        this.post();
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                vm.$emit("addmodal",this.formValidate.bool)
            },
            post () {
                let _this = this;
                
                let datas={
                    token:this.$webapi.get('token'),
                    loginName:this.formValidate.name,
                    password:this.formValidate.pwd,
                    adminRoleId:this.formValidate.role,
                    adminDepartmentId:this.formValidate.dep
                }
              this.$api.post("/admin_account/add", datas, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('Success!');
                    vm.$emit("addmodal",this.formValidate.bool)
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
