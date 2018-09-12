<template>
  <div class="">
    <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>编辑</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="分类:" prop="value">
               <Select v-model="formValidate.parentId">
                   <Option value="0">父级</Option>
                   <Option v-for="item in configuration" :value="item.id">{{item.name}}</Option>
               </Select>
             </FormItem>
              <FormItem label="名称:" prop="value">
                  <Input v-model="formValidate.value"></Input>
              </FormItem>
              <FormItem label="排序:" prop="sequence">
                  <Input v-model="formValidate.sequence"></Input>
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
    props: ['editshow','editName','editID','editduration',"parentIdNum","sequence"],
    mounted() {     
      //do something after mounting vue instance
      this.formValidate.value = this.editName
      this.formValidate.sequence = this.sequence
      this.formValidate.id = this.editID
      this.show = this.editshow
      if(this.parentIdNum!=0){
        this.formValidate.parentId = this.parentIdNum
      }
      this.configurationlist()
    },
    data() {
        return {
            show:false,
            formValidate:{
                id:"",
                value:"",
                parentId:'0'
            },
            configuration:[],
            ruleValidate: {
                value: [
                  { required: true, message: '名称没有填写', trigger: 'blur' }
                ]
             },
            addcarshow:true
        }
    },
    methods: {
        configurationlist () {
          let _this = this
          var data = {
              token:this.$webapi.get("token"),
              name:"",
              parentId:0
          }
          this.$api.get("/model_configuration_property/list", data, reset => {
            if (reset.codeId === 1) {
              _this.configuration = reset.resData
            }
          })
        },
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
              name:this.formValidate.value,
              id:this.formValidate.id,
              parentId:this.formValidate.parentId,
              sequence:this.formValidate.sequence
          }
          this.$api.post("/model_configuration_property/update", data, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('保存成功')
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
