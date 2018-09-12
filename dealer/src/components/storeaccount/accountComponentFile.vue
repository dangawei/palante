<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>完善信息</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="真实名字:" prop="realName">
                 <Input v-model="formValidate.realName" placeholder="请输入真实名字"></Input>
             </FormItem>
             <FormItem label="身份证:" prop="identityCard">
                 <Input v-model="formValidate.identityCard" placeholder="请输入真实名字"></Input>
             </FormItem>
             <FormItem label="生日:" prop="birthday">
                 <DatePicker type="date" v-model="formValidate.birthday"  placeholder="生日时间" @on-change="birthday"></DatePicker>
             </FormItem>
             <FormItem label="性别:" prop="sex" v-if="show">
               <Select v-model="formValidate.sex" >
                   <Option value="1">男</Option>
                   <Option value="2">女</Option>
              </Select>
             </FormItem>
             <FormItem label="手机号码:" prop="telephone">
                 <Input v-model="formValidate.telephone" placeholder="请输入手机号码"></Input>
             </FormItem>
             <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >保存</Button>
                <Button type="error" @click="handleReset('formValidate')" >取消</Button>
            </FormItem>
         </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import roleConponent from './getrole.vue'
    import storeConponent from './getstore.vue'
    export default {
        props:['fileaccountshow','fileaccountID'],
        components: {
          roleConponent,
          storeConponent
        },
        created() {
          this.eshow = this.fileaccountshow
          this.fileid = this.fileaccountID
          this.list()
        },
        data () {
            return {
                title:"",
                departmentvalue:"",
                fileid:"",
                show:false,
                formValidate: {
                    dealerAccountId:"",
                    realName:"",
                    telephone:"",
                    identityCard:"",
                    birthday:"",
                    sex:''
                },
                ruleValidate: {

                },
                eshow:false
            }
        },
        methods: {
          birthday (e) {
            this.formValidate.birthday = e
          },
          list () {
              let _this = this
              let data = {
                  token:this.$webapi.get('token'),
                  dealerAccountId:this.fileaccountID
              }
              this.$api.get('/dealer_account_information/getOneByDealerAccountId',data,reset => {
                  if (reset.codeId === 1) {
                      let data = reset.resData
                       _this.formValidate.dealerAccountId = data.dealerAccountId
                       _this.formValidate.realName = data.realName
                       _this.formValidate.telephone = data.telephone
                       _this.formValidate.identityCard = data.identityCard
                       _this.formValidate.birthday = _this.$webapi.gettime("dete",data.birthday/1000)
                       _this.formValidate.sex = "" + data.sex || 1
                       _this.show = true
                  }
                  else {
                      _this.$netcode.getApiCode(reset)
                  }
              })
          },
          roleselect (e) {
              this.formValidate.dealerRoleId = e.id
          },
          storeselect (e) {
              this.formValidate.dealerStorefrontId = e.id
          },
          cancel () {
             this.remove()

          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                     this.$emit('filestoreaccount',{editaccountshow:false})
                  },
                  onCancel: () => {
                     this.eshow = true
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
              // var url = "/dealer_account/update?token=" + this.$webapi.get('token') + "&id=" + this.formValidate.id+"&accountType=2"
              let datas={
                token:this.$webapi.get('token'),
                dealerAccountId:this.formValidate.dealerAccountId,
                realName:this.formValidate.realName,
                identityCard:this.formValidate.identityCard,
                birthday:this.formValidate.birthday,
                sex:parseInt(this.formValidate.sex),
                telephone:this.formValidate.telephone
              }
              this.$api.post("/dealer_account_information/update",datas, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('修改成功');
                    _this.$emit('filestoreaccount',{fileaccountshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
