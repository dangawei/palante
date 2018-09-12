<template>
  <div class="">
   <Modal v-model="addshow" width="360" @on-cancel="cancel">
      <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>添加车辆分类</span>
      </p>
      <div style="text-align:center">
          <Form ref="formCustom" :model="formCustom"  :rules="ruleValidate" :label-width="80" :mask-closable="false">
              <Row>
                  <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem label="名称" prop="name">
                          <Input type="text" v-model="formCustom.name"></Input>
                      </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                      <FormItem style="margin-left: -70px;text-align:left">
                          <Button type="primary" @click="handleSubmit('formCustom')">添加</Button>
                          <Button type="error" @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
                      </FormItem>
                    </div>
                  </Col>
              </Row>
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
            formCustom:{
              name:''
            },
            ruleValidate:{
              name:[{
                  required: true,
                  message: '名称没有填写',
                  trigger: 'blur'
              }],
            }
        }
    },
    mounted() {
      this.addshow = this.carModelshow
    },
    methods: {
      cancel () {
         this.remove()
      },
      handleReset () {
         this.remove()
      },
      remove (params) {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确认要关闭吗?</p>',
            onOk: () => {
              this.$emit('addcarEimt',{show:false})
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
      post(value){
        let _this = this;
        var url = "/car_model_category/save?token=" + this.$webapi.get('token') + "&name=" + this.formCustom.name
        this.$api.post(url, null, reset => {
          if (reset.codeId === 1) {
              _this.$emit('addcarEimt',{show:false})
          }else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
  }
}
</script>
