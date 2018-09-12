<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        
        <FormItem label="资源名称:" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入部门名称" @input="namechange"></Input>
        </FormItem>
        <FormItem label="资源路径:" prop="src">
            <Input v-model="formValidate.src" placeholder="请输入资源路径" @input="srcchange"></Input>
        </FormItem>
    </Form>
</template>
<script>
    import {vm} from '../../js/infobase/vm.js'
    export default {
        data () {
            return {
                formValidate: {
                    src:'',
                    name: '',
                },
                ruleValidate: {
                    src: [
                        { required: true, message: '请输入资源路径', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入资源名称', trigger: 'blur' }
                    ],
                }
            }
        },
        // props: [
        //     'name'
        // ],
        methods: {
            idchange:()=>{
                vm.$emit("srcvalue",this.formValidate.src)
            },
            namechange:()=>{
                vm.$emit("namevalue",this.formValidate.name)
            }
        }
    }
</script>
