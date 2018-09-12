<template>
  <div class="">
    <Modal v-model="show" width="360">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加sku子属性</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="父级属性:" >
                  <Input v-model="formValidate.skuName" disabled></Input>
              </FormItem>
              <FormItem label="SKU属性:" prop="value" >
                 <Input v-model="formValidate.value" ></Input>
              </FormItem>
              <FormItem label="排序字段:">
                 <Input v-model="formValidate.sequence" ></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
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
    props: ['editskushow','skuName','skuID','editSkuName',"editSkuID"],
    mounted() {
      //do something after mounting vue instance
      this.formValidate.skuName = this.skuName
      this.formValidate.skuID = this.skuID
      this.show = this.editskushow
      this.formValidate.value = this.editSkuName
      this.formValidate.editSkuID = this.editSkuID
    },
    data() {
        return {
            show:false,
            formValidate:{
                editSkuID:"",
                skuID:"",
                skuName:"",
                propertyId:"",
                value:"",
                sequence:""
            },
            ruleValidate: {
                value: [
                  { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ]
             },
            addcarshow:true
        }
    },
    methods: {
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
              value:this.formValidate.value,
              propertyId:this.formValidate.skuID,
              id:this.formValidate.editSkuID,
              sequence:this.formValidate.sequence
          }
          var url = "/sku_meta_property_value/update?"+ this.$QS.stringify(data)
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('修改成功')
                _this.exportdata()
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
      },
      exportdata () {
          this.show = false
          this.$emit('skucomponent',false)
      }
    }
  }
</script>
