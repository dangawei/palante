<template>
    <div>
      <Modal v-model="carshow" width="450" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>审核信息</span>
         </p>
         <div style="text-align:center">
             <Form  :model="formValidate"  :label-width="80">
                 <FormItem label="企业名称:">
                     <p style="text-align:left">{{formValidate.name}}</p>
                 </FormItem>
                  <FormItem>
                      <Button type="primary" @click="handleSubmit('formValidate')">认证通过</Button>
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
    	props:['auitshow','auitdata'],
       mounted() {
          //do something after mounting vue instance
           this.formValidate.name = this.auitdata.name
           this.formValidate.id = this.auitdata.userAccountId
           this.carshow = this.auitshow
        },
        data () {
          return {
              carshow:false,
              formValidate:{
                  name:"",
                  carId:"",
                  batterNumber:'',
                  motorNumber:'',
                  licencePlateNumber:""
              }
          }
        },
        methods: {
          cancel () {
              this.remove()
          },
        	handleSubmit () {
          	 this.post()
         	},
          handleReset () {
              this.remove();
          },
          remove () {
             this.carshow = false
             this.$emit("editCarcomponent",false)
          },
          post () {
            let _this = this
            var data = {
                userAccountId:this.formValidate.id,
                token:this.$webapi.get("token"),
                status:1
            }
            this.$api.post("/user_enterprise/approve", data, reset => {
              if (reset.codeId === 1) {
                  _this.$Message.success('认证成功')
                  _this.remove()
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
           }
        }
    }
</script>
