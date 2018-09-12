<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem label="用户名" prop="loginAccount">
              <!-- <Input v-model="adddatas.loginAccount" placeholder="请填写姓名"></Input> -->
              <p style="text-align: left;">{{adddatas.loginAccount}}</p>
            </FormItem>
            
            <FormItem label="密码" prop="password">
              <Input v-model="adddatas.password" placeholder="请填写性别"></Input>
            </FormItem>
            
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">修改</Button>
              <Button type="error" @click="handleSubmit('adddatas')" size="large">取消</Button>
            </FormItem>
          </Form>
        </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
  import {vm} from '../../js/infobase/vm.js'
    export default {
        props:['editshow','editdata'],
        data () {
            return {
              adddatas:{
                id:'',
                loginAccount:'',
                
                password:'',
                
              },
              ashow:false,
              ruleValidate: {
                
              }
            }
        },
        created(){
          this.ashow=this.editshow
          this.adddatas.id=this.editdata.id
          this.adddatas.loginAccount=this.editdata.loginAccount
          this.adddatas.password=this.editdata.password
          
          
        },
        mounted(){
          
          // this.getCarModel();
        },
        methods: {
          cancel () {
            this.remove()
            // _this.$emit('editshow',false)
          },
          handleSave(name) {
            let _this = this
            this.$refs[name].validate((valid) => {
              if(valid){

                _this.post();
              }else{
                _this.$Message.error('失败!')
              }
            })
          },
          remove (item) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('editshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
            });
          },
          handleSubmit(name){
            this.remove();
          },
          post () {
            let _this = this;
            var url = "/user/update?token=" + this.$webapi.get('token')+"&id="+this.adddatas.id;
            
            if (this.adddatas.password!=this.editdata.password) {
              url+="&password=" + this.adddatas.password
            }
            this.$api.post(url, null, reset => {
              if (reset.codeId === 1) {
                _this.$emit('editshow',false)
                _this.$Message.success("修改成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
