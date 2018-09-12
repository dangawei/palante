<template>
    <div>
      <Modal v-model="editshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span> {{this.show}}
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="标题" prop="title">
                  <Input v-model="formValidate.title" placeholder="标题"></Input>
              </FormItem>
              <FormItem label="排序" prop="sort">
                  <Input v-model="formValidate.sort" placeholder="排序"></Input>
              </FormItem>
              <FormItem label="链接地址">
                    <Input v-model="formValidate.url" placeholder="链接地址"></Input>
              </FormItem>
              <FormItem label="图标">
                  <Input v-model="formValidate.pic" placeholder="图标"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error" @click="handleReset()" style="margin-left: 8px">取消</Button>
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
        props: ['editshow',"edititemdata"],
        created() {
          this.eshow=this.editshow
          this.formValidate.title = this.edititemdata.title
          this.formValidate.id = this.edititemdata.id
          this.formValidate.url = this.edititemdata.url
          this.formValidate.pic = this.edititemdata.pic
          this.formValidate.parentId = this.edititemdata.parentId
          this.formValidate.sort = this.edititemdata.sort
          this.olddata = this.edititemdata
        },
        data () {
            return {
              title:"编辑导航菜单",
              formValidate:{
                  title: '',
                  url:"",
                  pic:"",
                  sort:"0"
              },
              olddata:{},
              ruleValidate: {
                  title: [
                      { required: true, message: '标题没有填写', trigger: 'blur' }
                  ],
             },
             eshow:false
            }
        },
        methods: {
          visiblechange (){
              this.close()
          },
          cancel () {
              this.close()
          },
          close (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('accountcomponentdata',{addshow:false,editshow:false})
                  },
                  onCancel: () => {
                     this.editshow = true
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
               this.close()
            },
            post () {
              let _this = this;
              var data = {
                token:this.$webapi.get('token'),
                navigationBarId:this.formValidate.id,
                parentId:this.formValidate.parentId,
                sort:this.formValidate.sort || 0
              }
              if(this.formValidate.title!==this.olddata.title){
                 data.title = this.formValidate.title
              }
              if(this.formValidate.url!==this.olddata.url){
                 data.url = this.formValidate.url
              }
              if(this.formValidate.pic!==this.olddata.pic){
                 data.pic = this.formValidate.pic
              }
              if(this.formValidate.navigationBarId!==this.olddata.navigationBarId){
                 data.navigationBarId = this.formValidate.navigationBarId
              }
              this.$api.post("/navigation_bar/update", data, reset => {
                if (reset.codeId === 1) {
                   _this.$emit('editcomponentdata',{editshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
