<template>
    <div>
      <Modal v-model="addroleshow" width="360" @on-cancel="cancel">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="formValidate.name" placeholder="角色名称"></Input>
              </FormItem>
              <FormItem label="备注">
                  <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="备注名称"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
                  <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
        props: ['addroleshow'],
        data () {
            return {
              title:"添加新角色",
              formValidate:{
                  name: '',
                  remark:""
              },
              ruleValidate: {
                  name: [
                      { required: true, message: '新角色名称没有填写', trigger: 'blur' }
                  ],
             }
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
                    this.$emit('addrolecomponentdata',{addroleshow:false})
                  },
                  onCancel: () => {
                     this.addroleshow = true
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
            post () {
              let _this = this;
              var data = {
                token:this.$webapi.get('token'),
                name:this.formValidate.name,
                remark:this.formValidate.remark
              }
              this.$api.post("/dealer_role/add", data, reset => {
                if (reset.codeId === 1) {
                  var data = {
                    addroleshow:false
                  }
                   _this.$emit('addrolecomponentdata',data)
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
