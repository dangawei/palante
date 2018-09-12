<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="编号:" prop="id" v-show="formValidate.typename!='banner'">
            <Input v-model="formValidate.id" placeholder="请输入部门编号"></Input>
        </FormItem>
        <FormItem label="部门名称:" prop="depname" v-show="formValidate.typename=='department'">
            <Input v-model="formValidate.depname" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem label="账号:" prop="account" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="密码:" prop="pwd" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="姓名:" prop="name" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机号:" prop="phone" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="部门:" prop="dep" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.dep" placeholder="请输入部门"></Input>
        </FormItem>
        <FormItem label="角色:" prop="role" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.role" placeholder="请输入角色"></Input>
        </FormItem>
         <FormItem label="标题:" prop="title" v-show="formValidate.typename=='announcement'">
            <Input v-model="formValidate.title" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="内容:" prop="centent" v-show="formValidate.typename=='announcement'">
            <Input type="textarea" :autosize="true" v-model="formValidate.centent" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem label="日期:" prop="date" v-show="formValidate.typename=='announcement'">
            <DatePicker v-model="formValidate.date" format="yyyy-MM-dd" type="date" placeholder="请输入日期"></DatePicker>
        </FormItem>
        <FormItem label="角色名称:" prop="rolename" v-show="formValidate.typename=='role'">
            <Input v-model="formValidate.rolename" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色备注:" prop="roledes" v-show="formValidate.typename=='role'">
            <Input v-model="formValidate.roledes" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="标题:" prop="bannertitle" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannertitle" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="排序:" prop="bannersort" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannersort" placeholder="请输入角色序号"></Input>
        </FormItem>
        <FormItem label="图片地址:" prop="bannerurl" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannerurl" placeholder="请输入角色图片地址"></Input>
        </FormItem>
        <FormItem label="创建时间:" prop="bannercreate" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannercreate" placeholder="请输入创建时间"></Input>
        </FormItem>
        <FormItem label="到期时间:" prop="bannerend" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannerend" placeholder="请输入到期时间"></Input>
        </FormItem>
        <FormItem>
           <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
       </FormItem>

    </Form>
</template>
<script>
    import {vm} from '../../js/infobase/vm.js'
    export default {
        data () {
            return {
                bool:false,
                formValidate: {
                    typename:this.typename,
                    id:'',
                    depname: '',
                    account:'',
                    pwd:'',
                    phone:'',
                    dep:'',
                    role:'',
                    title:'',
                    centent:'',
                    date:'',
                    name:'',
                    rolename:'',
                    roledes:'',
                    bannertitle:'',
                    bannersort:'',
                    bannaerurl:'',
                    bannercreate:'',
                    bannerend:'',
                },
                ruleValidate: {
                    id: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    depname: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    dep: [
                        { required: true, message: '请输入部门', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请输入角色', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    centent: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, message: '请输入日期', trigger: 'blur' }
                    ],
                    rolename: [
                        { required: true, message: '请输入日期', trigger: 'blur' }
                    ],
                    roledes: [
                        { required: true, message: '请输入日期', trigger: 'blur' }
                    ],
                    bannertitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    bannersort: [
                        { required: true, message: '请输入排序', trigger: 'blur' }
                    ],
                    bannerurl: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    bannercreate: [
                        { required: true, message: '请输入创建时间', trigger: 'blur' }
                    ],
                    bannerend: [
                        { required: true, message: '请输入结束时间', trigger: 'blur' }
                    ],
                }
            }
        },
        props: [
            'typename'
        ],
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.$emit("forms",this.formValidate);
                        // var url="/admin_account/add";
                        // let _this=this;
                        // this.$api.post(url,null,reset=>{
                        //     console.log(reset);
                        // })
                        this.$Message.success('Success!');
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                console.log(this.formValidate.bool);
                vm.$emit("bool",this.formValidate.bool)
            }
        }
    }
</script>
