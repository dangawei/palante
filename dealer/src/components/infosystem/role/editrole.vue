<template>
    <div>
      <Modal v-model="editroleshow" width="360" @on-cancel="cancel">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span> {{this.show}}
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="formValidate.name" placeholder="角色名称"></Input>
              </FormItem>
              <FormItem label="备注">
                  <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="备注名称"></Input>
              </FormItem>
              <!-- <FormItem label="状态" >
                <Select v-model="formValidate.status">
                   <Option :value="1" key="1">正常</Option>
                   <Option :value="-1" key="-1">删除</Option>
               </Select>
              </FormItem> -->
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
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
        props:['editroleshow','editroledta'],
        created() {
         this.formValidate.name = this.editroledta.name
         this.formValidate.id = this.editroledta.id
         this.formValidate.remark = this.editroledta.remark
         this.formValidate.status = this.editroledta.status
        },
        data () {
            return {
              title:"修改内容",
              formValidate:{
                  id:"",
                  name: '',
                  remark:"",
                  status:1
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
            this.remove();
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
                this.remove();
            },
            remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editrolecomponentdata',{editroleshow:false})
                  },
                  onCancel: () => {
                     this.editroleshow = true
                  }
              });
            },
            post () {
              let _this = this;
              // var url = "/dealer_role/update?token=" + this.$webapi.get('token') + " &name=" + this.formValidate.name + "&remark="+this.formValidate.remark +"&id="+this.formValidate.id
              let datas={
                token:this.$webapi.get('token'),
                name:this.formValidate.name,
                remark:this.formValidate.remark,
                id:this.formValidate.id
              }
              this.$api.post("/dealer_role/update",datas, reset => {
                if (reset.codeId === 1) {
                   _this.$emit('editrolecomponentdata',{editroleshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
