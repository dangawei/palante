<template>
  <div class="">
    <Modal v-model="addskushow" width="360" @on-cancel="cancel">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加SKU属性</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="SKU属性:" prop="name" >
                 <Input v-model="formValidate.name" ></Input>
              </FormItem>
              <FormItem label="排序:" >
                 <Input v-model="formValidate.sequence" ></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="ghost"   @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
   props: ['addskushow'],
    data() {
        return {
            formValidate:{
               modelId:"",
                name:"",
                sequence:""
            },
            ruleValidate: {
                name: [
                  { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ]
             }
        }
    },
    methods: {
        downFun () {
          alert(1)
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
           this.$emit('skuComponentData',false)
       },
      cancel () {
          this.$emit('skuComponentData',false)
      },
      post() {
          let _this = this
          var data = {
              token:this.$webapi.get("token"),
              name:this.formValidate.name,
              modelId:this.$route.params.id,
              sequence:this.formValidate.sequence
          }
          var url = "/sku_meta_property/save?"+ this.$QS.stringify(data)
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('添加成功')
                this.$emit('skuComponentData',false)
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
      }
    }
  }
</script>
