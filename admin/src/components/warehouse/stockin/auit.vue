<template>
  <div class="">
    <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加sku子属性</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="审核状态:" prop="status">
                <Select v-model="formValidate.status" style="width:200px">
                     <Option value="2">审核通过</Option>
                     <Option value="3">审核不通过</Option>
                </Select>
              </FormItem>
              <FormItem label="审核理由:" prop="value" v-if="formValidate.status==3">
                 <Input v-model="formValidate.auditOpinion" type="textarea" :rows="4" placeholder="审核不通过理由"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error"   @click="handleReset()" style="margin-left: 8px">取消</Button>
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
               status:'2',
               auditOpinion:""
            },
            ruleValidate: {
                status: [
                  { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ]
             },
            addcarshow:true
        }
    },
    methods: {
        cancel () {
          this.show = false
          this.$emit('emitcomponent',"")
        },
        handleSubmit (name) {
           this.$refs[name].validate((valid) => {
               if (valid) {
                  this.exportdata()
               }
           })
       },
       handleReset () {
          this.cancel()
      },
      exportdata () {
          this.show = false
          this.$emit('emitcomponent',this.formValidate)
      }
    }
  }
</script>
