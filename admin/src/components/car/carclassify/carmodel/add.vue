<template>
  <div class="">
    <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加车辆属性</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称:" prop="name">
                  <Input v-model="formValidate.name"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
                  <Button type="ghost"   @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
    props: ['addshow'],
    mounted() {
      //do something after mounting vue instance
      this.show = this.addshow
    },
    data() {
        return {
            show:false,
            formValidate:{
                name:""
            },
            ruleValidate: {
                name: [
                  { required: true, message: '名称没有填写', trigger: 'blur' }
                ]
             },
            addcarshow:true
        }
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
                    this.$emit("emitcomponent",false)
                },
                onCancel: () => {
                   this.show = true
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
           this.$refs[name].resetFields();
       },
      post() {
          let _this = this
          var data = {
              token:this.$webapi.get("token"),
              name:this.formValidate.name
          }
          var url = "/car_model_property/save?"+ this.$QS.stringify(data)
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('添加成功')
                _this.exportdata()
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
      },
      exportdata () {
          this.show = false
          this.$emit('emitcomponent',false)
      }
    }
  }
</script>
