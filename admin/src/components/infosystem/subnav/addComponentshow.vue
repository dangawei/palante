<template>
    <div>
      <Modal v-model="addshow" width="360" @on-cancel="cancel" @on-visible-change="visiblechange" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span> {{this.show}}
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="标题" prop="title">
                   <subnav-addcomponent @componentnav="componentnav"></subnav-addcomponent>
             </FormItem>
              <FormItem label="标题" prop="title">
                  <Input v-model="formValidate.title" placeholder="标题"></Input>
              </FormItem>
              <FormItem label="排序" prop="sort">
                  <Input v-model="formValidate.sort" placeholder="排序"></Input>
              </FormItem>
              <FormItem label="链接地址">
                    <Input v-model="formValidate.url" placeholder="链接地址"></Input>
              </FormItem>
              <FormItem label="图标地址">
                  <Input v-model="formValidate.pic" placeholder="图标"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
                  <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import subnavAddcomponent from "../../pub/commonnav.vue"
    export default {
        props: ['addshow'],
        components: {
          subnavAddcomponent
        },
        data () {
            return {
              title:"添加导航菜单",
              formValidate:{
                  parentId:0,
                  title: '',
                  url:"",
                  pic:"",
                  sort:"0"
              },
              ruleValidate: {
                  title: [
                      { required: true, message: '标题没有填写', trigger: 'blur' }
                  ],
             }
            }
        },
        methods: {
          componentnav (e) {
            this.formValidate.parentId = e
          },
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
            handleReset (name) {
                this.close()
            },
            post () {
              let _this = this;
              var data = {
                token:this.$webapi.get('token'),
                parentId:this.formValidate.parentId || 0,
                title:this.formValidate.title,
                sort:this.formValidate.sort,
              }
              if(this.formValidate.url){
                data.url = this.formValidate.url
              }
              if(this.formValidate.pic){
                data.pic = this.formValidate.pic
              }
              this.$api.post("/navigation_bar/add", data, reset => {
                if (reset.codeId === 1) {
                   _this.$emit('addcomponentdata',{addshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
