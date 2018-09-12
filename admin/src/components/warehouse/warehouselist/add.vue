<template>
  <div class="">
    <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加仓库</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称:" prop="name">
                  <Input v-model="formValidate.name"></Input>
              </FormItem>
              <FormItem label="城市:" required prop="value">
                  <citycommon @areaEmit="areaEmit"></citycommon>
              </FormItem>
              <FormItem label="地址:" prop="address">
                  <Input v-model="formValidate.address"></Input>
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
import citycommon from "../../pub/iviewarea.vue"
export default {
    props: ['addshow'],
    components: {
      citycommon
    },
    mounted() {
      //do something after mounting vue instance
      this.show = this.addshow
    },
    data() {
        return {
            show:false,
            formValidate:{
                name:"",
                address:"",
                province_code:"",
                city_code:"",
                area_code:""
            },
            ruleValidate: {
                name: [
                  { required: true, message: '名称没有填写', trigger: 'blur' }
                ],
                address: [
                  { required: true, message: '地址没有填写', trigger: 'blur' }
                ]
             },
          addcarshow:true
        }
    },
    methods: {
       areaEmit (e) {
          this.formValidate.province_code = e[0].code
          this.formValidate.city_code= e[1].code
          //this.formValidate.area_code= e[2].code
       },
       cancel () {this.$emit("emitcomponent",false)},
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
           })},
       handleReset (name) {
           this.$refs[name].resetFields();
       },
       post() {
          let _this = this
          if(this.formValidate.province_code==""){
            this.$Message.info("城市没有选择")
            return
          }
          if(this.formValidate.city_code==""){
            this.$Message.info("城市没有选择")
            return
          }
          var data = {
              token:this.$webapi.get("token"),
              name:this.formValidate.name,
              province_code:this.formValidate.province_code,
              city_code:this.formValidate.city_code,
              address:this.formValidate.address,
          }
          var url = "/warehouse/save?"+ this.$QS.stringify(data)
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
