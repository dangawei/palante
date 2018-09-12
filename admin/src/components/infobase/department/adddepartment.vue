<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="编号:" prop="id">
            <Input v-model="formValidate.id" placeholder="请输入部门编号"></Input>
        </FormItem>
        <FormItem label="部门名称:" prop="depname">
            <Input v-model="formValidate.depname" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem>

           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
           <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
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
                    depname:''
                },
                ruleValidate: {
                    id: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    depname: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(name)
                    } else {
                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
                this.remove();
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
            post(name){
                let _this = this;
                    var data = {
                        token:this.$webapi.get('token'),
                        departmentNo:this.formValidate.id,
                        name:this.formValidate.depname
                    }
                    this.$api.post("/admin_department/save", data, reset => {
                    if (reset.codeId === 1) {
                         _this.$Message.success("添加成功")
                        vm.$emit("addmodal",this.formValidate.bool)
                        _this.$refs[name].resetFields();
                    }else {
                      _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
