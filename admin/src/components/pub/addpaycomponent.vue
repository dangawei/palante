<template>
  <div class="">
    <Modal v-model="addskushow" width="460" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加收款记录</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="采购单号:" prop="purchaseOrderNo" required>
                <div class="textleft">{{formValidate.purchaseOrderNo}}</div>
             </FormItem>
             <FormItem label="剩余应收:" >
                <div class="textleft"> {{formValidate.payment_amount01}}</div>
             </FormItem>
              <FormItem label="收款金额:" required >
                 <Input v-model="formValidate.payment_amount" ></Input>
              </FormItem>
              <FormItem label="收款单号:" prop="receipt_number">
                 <Input v-model="formValidate.receipt_number" ></Input>
              </FormItem>
              <FormItem label="收款图片:" required >
                 <Uploadimg @uploadComponent="uploadComponent"></Uploadimg>
              </FormItem>
              <FormItem label="收款日期:" prop="pay_date" required>
                <DatePicker type="date" placeholder="收款日期" style="width: 100%" v-model="formValidate.pay_date" @on-change="startTime"></DatePicker>
              </FormItem>
              <FormItem label="备注:" >
                 <Input v-model="formValidate.remark"type="textarea" :rows="4" placeholder="备注" />
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="save('formValidate')">保存</Button>
                  <Button type="ghost"   @click="handleReset()" style="margin-left: 8px">取消</Button>
              </FormItem>
        </Form>
       </div>
       <div slot="footer">
       </div>
    </Modal>
  </div>
</template>
<script>
import Uploadimg from "../pub/Uploadimg"
export default {
   components: {
     Uploadimg
   },
   props:{
     addskushow:{
       default:true
     },
     addpaydata:{
       default:{}
     }
   },
    data() {
        return {
            formValidate:{
              totalamount:"",
              purchaseOrderNo:"",
              purchase_order_id:"",
              payment_amount01:"",
              payment_amount:"",
              receipt_number:"",
              receipt_url:"",
              pay_date:"",
              remark:""
            },
            ruleValidate: {
                payment_amount: [
                  { required: true, message: '请输入收款金额', trigger: 'blur' },
                ],
                receipt_number: [
                  { required: true, message: '请输入收款单号', trigger: 'blur' },
                ]
             }
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.formValidate.purchase_order_id = this.addpaydata.id
      this.formValidate.purchaseOrderNo = this.addpaydata.purchaseOrderNo
      if(this.addpaydata.purchaseOrderPayDoList.length>0){
        this.formValidate.payment_amount01 = this.addpaydata.purchaseOrderPayDoList[this.addpaydata.purchaseOrderPayDoList.length-1].unpaidAmount
        this.formValidate.payment_amount = this.addpaydata.purchaseOrderPayDoList[this.addpaydata.purchaseOrderPayDoList.length-1].unpaidAmount
      }else{
        this.formValidate.payment_amount01 = this.addpaydata.totalPrice
        this.formValidate.payment_amount = this.addpaydata.totalPrice
      }
    },
    methods: {
      uploadComponent (e) {
        this.formValidate.receipt_url = e[0]
      },
      handleReset () {
         this.cancel()
      },
      cancel () {
        this.addskushow = false
        this.$emit("emitaddpay")
      },
      startTime (e){
        this.formValidate.pay_date = e
      },
      save(name){
        let _this = this
        this.$refs[name].validate((valid) => {
            if (valid) {
              if(_this.formValidate.payment_amount==""){
                this.$Message.info("收款金额没有填写")
                return
              }
              if(_this.formValidate.pay_date==""){
                this.$Message.info("收款日期没有选择")
                return
              }
              if(_this.formValidate.receipt_url==""){
                this.$Message.info("收款凭证没有上传")
                return
              }
              var data = {
                  token:this.$webapi.get('token'),
                  purchase_order_id:_this.formValidate.purchase_order_id,
                  payment_amount:parseFloat(_this.formValidate.payment_amount).toFixed(2),
                  receipt_number:_this.formValidate.receipt_number,
                  receipt_url:_this.formValidate.receipt_url,
                  pay_date:_this.formValidate.pay_date,
                  remark:_this.formValidate.remark
              }
              this.$api.post("/purchase_order_pay/add",data, reset => {
                if (reset.codeId === 1) {
                     _this.$Message.info("成功")
                     _this.cancel()
                }else {
                   _this.$netcode.getApiCode(reset)
                }
              })
            }
        })
      }
    }
  }
</script>
