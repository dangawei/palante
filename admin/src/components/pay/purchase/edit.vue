<template>
  <div class="">
    <Modal v-model="editshow" width="460" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改收款记录</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="采购单号:" prop="purchaseOrderNo"  required>
                <div class="textleft">{{formValidate.purchaseOrderNo}}</div>
             </FormItem>
             <FormItem label="剩余应收:" >
                <div class="textleft"> {{formValidate.payment_amount01-formValidate.payment_amount}}</div>
             </FormItem>
              <FormItem label="收款金额:" prop="payment_amount"  required>
                 <Input v-model="formValidate.payment_amount" ></Input>
              </FormItem>
              <FormItem label="收款单号:" prop="receipt_number" required>
                 <Input v-model="formValidate.receipt_number" ></Input>
              </FormItem>
              <FormItem label="收款图片:" required>
                 <Uploadimg @uploadComponent="uploadComponent" :Uploadimg="formValidate.receipt_url" v-if="picshow"></Uploadimg>
              </FormItem>
              <FormItem label="收款日期:" prop="pay_date" required>
                <DatePicker type="date" placeholder="收款日期" style="width: 100%" v-model="formValidate.pay_date" @on-change="startTime"></DatePicker>
              </FormItem>
              <FormItem label="备注:" >
                 <Input v-model="formValidate.remark"type="textarea" :rows="4" placeholder="备注" />
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="save('formValidate')">保存</Button>
                  <Button type="error"   @click="handleReset()" style="margin-left: 8px">取消</Button>
              </FormItem>
        </Form>
       </div>
       <div slot="footer">
       </div>
    </Modal>
  </div>
</template>
<script>
import Uploadimg from "../../pub/Uploadimg"
export default {
   components: {
     Uploadimg
   },
   props:{
     editshow:{
       default:true
     },
     editdata:{
       default:{}
     }
   },
    data() {
        return {
            picshow:false,
            formValidate:{
              id:'',
              purchaseOrderNo:"",
              purchase_order_id:"",
              payment_amount:"",
              payment_amount01:"",
              receipt_number:"",
              receipt_url:"",
              pay_date:"",
              remark:""
            },
            ruleValidate: {
                payment_amount: [
                  { required: true, message: '请输入支付金额', trigger: 'blur' }
                ],
                receipt_number: [
                  { required: true, message: '请输入收款单号', trigger: 'blur' },
                ]
             }
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.formValidate.id = this.editdata.id
      this.formValidate.purchaseOrderNo = this.editdata.purchaseOrderNo
      this.formValidate.payment_amount01 = parseFloat(this.editdata.unpaidAmount)+parseFloat(this.editdata.paymentAmount)
      this.formValidate.payment_amount = this.editdata.paymentAmount
      this.formValidate.receipt_number = this.editdata.receiptNumber
      this.formValidate.receipt_url = this.editdata.receiptUrl
      this.formValidate.pay_date = this.$webapi.gettime("time",this.editdata.payDate/1000)
      this.formValidate.remark = this.editdata.remark
      this.picshow = true
    },
    methods: {
      startTime (e){
        this.formValidate.pay_date = e
      },
      uploadComponent (e) {
        this.formValidate.receipt_url = e[0]
      },
      cancel () {
        this.addskushow = false
        this.export()
      },
      handleReset () {
        this.export()
      },
      export () {
        this.$emit("editpay")
      },
      save(){
        let _this = this
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
            id:this.formValidate.id,
            payment_amount:this.formValidate.payment_amount,
            receipt_number:this.formValidate.receipt_number,
            receipt_url:this.formValidate.receipt_url,
            pay_date:this.formValidate.pay_date,
            remark:this.formValidate.remark
        }
        this.$api.post("/purchase_order_pay/update",data, reset => {
          if (reset.codeId === 1) {
               this.$Message.info("成功")
               _this.export()
          }else {
            _this.$netcode.getApiCode(reset)
          }
        })
      }
    }
  }
</script>
