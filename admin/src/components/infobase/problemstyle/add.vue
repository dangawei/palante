<template>
  <div class="">
  <Modal v-model="addshow" width="360" @on-cancel="cancel">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加常见问题分类</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类名称" prop="classifyName">
                <Input v-model="formValidate.classifyName" placeholder="分类名称"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
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
    export default {
        props:{
          carModelshow:{
            default:false
          }
        },
        data () {
            return {
                addshow:false,
                formValidate: {
                     classifyName:''
                },
                ruleValidate: {
                    classifyName: [
                        { required: true, message: '分类名称没有填写', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
          this.addshow = this.carModelshow
          console.log(this.carModelshow)
        },
        methods: {
            cancel () {
               this.remove()
            },
            remove (item) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      this.$emit('cardataEimt',{addshow:false})
                    },
                    onCancel: () => {
                       this.addshow = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
                    }
                })
            },
            handleReset (name) {
               this.remove()
            },
            post(){
                let _this = this;
                var data = {
                  token:this.$webapi.get('token'),
                  classifyName:this.formValidate.classifyName
                }
                this.$api.post("/common_problem_classify/add", data, reset => {
                if (reset.codeId === 1) {
                     _this.$emit('cardataEimt',{addshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
                }
              })
            }
        }
    }
</script>
