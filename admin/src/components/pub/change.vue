<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="编号:" prop="id" v-show="!formValidate.typename=='banner'">
            <Input v-model="formValidate.id" placeholder="请输入编号" @input="idchange"></Input>
        </FormItem>
        <FormItem label="部门名称:" prop="depname" v-show="formValidate.typename=='department'">
            <Input v-model="formValidate.depname" placeholder="请输入部门名称" @input="namechange"></Input>
        </FormItem>
        <FormItem label="备注:" prop="des" v-show="formValidate.des">
            <Input v-model="formValidate.des" placeholder="请输入备注" @input="deschange"></Input>
        </FormItem>
        <FormItem label="路径:" prop="src" v-show="formValidate.src">
            <Input v-model="formValidate.src" placeholder="请输入路径" @input="srcchange"></Input>
        </FormItem>
        <FormItem label="账号:" prop="account" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.account" placeholder="请输入账号" @input="accountchange"></Input>
        </FormItem>
        <FormItem label="密码:" prop="pwd" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.pwd" placeholder="请输入密码" @input="pwdchange"></Input>
        </FormItem>
        <FormItem label="姓名:" prop="name" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.name" placeholder="请输入姓名" @input="phonechange"></Input>
        </FormItem>
        <FormItem label="手机号:" prop="phone" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.phone" placeholder="请输入手机号" @input="phonechange"></Input>
        </FormItem>
        <FormItem label="部门:" prop="dep" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.dep" placeholder="请输入部门" @input="depchange"></Input>
        </FormItem>
        <FormItem label="角色:" prop="role" v-show="formValidate.typename=='account'">
            <Input v-model="formValidate.role" placeholder="请输入角色" @input="rolechange"></Input>
        </FormItem>
        <FormItem label="标题:" prop="title" v-show="formValidate.typename=='announcement'">
            <Input v-model="formValidate.title" placeholder="请输入标题" @input="titlechange"></Input>
        </FormItem>
        <FormItem label="内容:" prop="centent" v-show="formValidate.typename=='announcement'">
            <Input type="textarea" :autosize="true" v-model="formValidate.centent" placeholder="请输入内容" @input="cententchange"></Input>
        </FormItem>
        <FormItem label="日期:" prop="date" v-show="formValidate.typename=='announcement'">
            <DatePicker v-model="formValidate.date" format="yyyy-MM-dd" type="date" placeholder="请输入日期" @on-change="datechange"></DatePicker>
        </FormItem>
         <FormItem label="角色名称:" prop="rolename" v-show="formValidate.typename=='role'">
            <Input v-model="formValidate.rolename" placeholder="请输入角色名称" @input="rolenamechange"></Input>
        </FormItem>
        <FormItem label="角色备注:" prop="roledes" v-show="formValidate.typename=='role'">
            <Input v-model="formValidate.roledes" placeholder="请输入角色名称" @input="roledeschange"></Input>
        </FormItem>
        <FormItem label="标题:" prop="bannertitle" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannertitle" placeholder="请输入标题" @input="bannertitlechange"></Input>
        </FormItem>
        <FormItem label="排序:" prop="bannersort" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannersort" placeholder="请输入角色序号" @input="bannersortchange"></Input>
        </FormItem>
        <FormItem label="图片地址:" prop="bannerurl" v-show="formValidate.typename=='banner'">
            <Input v-model="formValidate.bannerurl" placeholder="请输入角色图片地址" @input="bannerurlchange"></Input>
        </FormItem>
        <FormItem label="创建时间:" prop="bannercreate" v-show="formValidate.typename=='banner'">
            <DatePicker v-model="formValidate.bannercreate" format="yyyy-MM-dd" type="date" placeholder="请输入创建时间" @on-change="bannercreatechange"></DatePicker>
        </FormItem>
        <FormItem label="到期时间:" prop="bannerend" v-show="formValidate.typename=='banner'">
            <DatePicker v-model="formValidate.bannerend" format="yyyy-MM-dd" type="date" placeholder="请输入到期时间" @on-change="bannerendchange"></DatePicker>
        </FormItem>
    </Form>
</template>
<script>
    import {vm} from '../../js/infobase/vm.js'
    export default {
        data () {
            return {
                formValidate: {
                    typename:this.typename,
                    id:this.id,
                    depname:this.depname,
                    name:this.name,
                    des:this.des,
                    src:this.src,
                    account:this.account,
                    pwd:this.pwd,
                    phone:this.phone,
                    dep:this.dep,
                    role:this.role,
                    title:this.title,
                    centent:this.centent,
                    date:this.date,
                    rolename:this.rolename,
                    roledes:this.roledes,
                    bannertitle:this.bannertitle,
                    bannersort:this.bannersort,
                    bannerurl:this.bannerurl,
                    bannercreate:this.bannercreate,
                    bannerend:this.bannerend,
                },
                ruleValidate: {
                    id: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    depname: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    des: [
                        { required: true, message: '请输入备注', trigger: 'blur' }
                    ],
                    src: [
                        { required: true, message: '请输入路径', trigger: 'blur' }
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
                        { required: true, message: '请输入职位', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
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
                    navtypes: [
                        { required: true, message: '请输入导航分类', trigger: 'blur' }
                    ],
                    navtitle: [
                        { required: true, message: '请输入结束', trigger: 'blur' }
                    ],
                    navurl: [
                        { required: true, message: '请输入结束时间', trigger: 'blur' }
                    ],
                    navsort: [
                        { required: true, message: '请输入结束时间', trigger: 'blur' }
                    ],
                    display: [
                        { required: true, message: '请输入结束时间', trigger: 'blur' }
                    ],
                }
            }
        },
        props: [
            'typename','id','depname','name','des','src','account','pwd','phone','dep','role','title','centent','date','rolename','roledes','bannertitle','bannersort','bannerurl','bannercreate','bannerend','navtypes','navtitle','navurl','navsort','display',
        ],
        methods: {
            idchange:()=>{
                vm.$emit("idvalue",this.formValidate.id)
            },
            namechange:()=>{
                vm.$emit("namevalue",this.formValidate.depname)
            },
            namechange:()=>{
                vm.$emit("namevalue",this.formValidate.name)
            },
            deschange:()=>{
                vm.$emit("desvalue",this.formValidate.des)
            },
            srcchange:()=>{
                vm.$emit("srcvalue",this.formValidate.src)
            },
            accountchange:()=>{
                vm.$emit("account",this.formValidate.account)
            },
            pwdchange:()=>{
                vm.$emit("pwd",this.formValidate.pwd)
            },
            phonechange:()=>{
                vm.$emit("phone",this.formValidate.phone)
            },
            depchange:()=>{
                vm.$emit("dep",this.formValidate.dep)
            },
            rolechange:()=>{
                vm.$emit("role",this.formValidate.role)
            },
            titlechange:()=>{
                vm.$emit("title",this.formValidate.title)
            },
            contentchange:()=>{
                vm.$emit("content",this.formValidate.content)
            },
            datechange:()=>{
                vm.$emit("date",this.formValidate.date)
            },
            rolenamechange:()=>{
                vm.$emit("rolename",this.formValidate.rolename)
            },
            roledeschange:()=>{
                vm.$emit("roledes",this.formValidate.roledes)
            },
        }
    }
</script>
