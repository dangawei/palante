<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加会员</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem label="用户名" prop="name">
              <Input v-model="adddatas.name" placeholder="请填写姓名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <div class="" v-if="passwordshow">
                  <Input type="password" v-model="adddatas.password" placeholder="请输入密码" icon="eye-disabled"  @on-click="password01()"></Input>
              </div>
              <div class="" v-else>
                  <Input v-model="adddatas.password" placeholder="请输入密码" icon="eye" @on-click="password01()"></Input>
              </div>
            </FormItem>
            <FormItem label="用户类型" >
              <Select v-model="adddatas.userType">
                <Option value="1" key="1">个人</Option>
                <Option value="2" key="2">企业</Option>
              </Select>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
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
        props:['addshow'],
        data () {
            return {
              passwordshow:false,
              adddatas:{
                name:'',
                phone:'',
                password:'',
                userType:''
              },
              ashow:false,
              ruleValidate: {
                name:[{
                  required: true,
                  message: '姓名没有填写',
                  trigger: 'focus'
                }],
                phone:[{
                  required: true,
                  message: '手机号没有填写',
                  trigger: 'blur'
                }],
                password:[{
                  required: true,
                  message: '密码没有填写',
                  trigger: 'blur'
                }],
              }
            }
        },
        created(){
          this.ashow=this.addshow
        },
        mounted(){
          // this.getCarModel();
        },
        methods: {
          password01 () {
            this.passwordshow = !this.passwordshow
          },
          cancel () {
            this.remove();
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
          handleSubmit(){
            this.remove();
          },
          remove (item) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('addshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
            });
          },
          post() {
            let _this = this;
            var data = {
              token:this.$webapi.get('token'),
              loginAccount:this.adddatas.name,
              password:this.adddatas.password,
              userType:this.adddatas.userType
            }
            this.$api.post("/user/save", data, reset => {
              if (reset.codeId === 1) {
                _this.$emit('addshow',false)
                _this.$Message.success("添加成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
