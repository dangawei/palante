<template>
  <div class="">
    <Modal v-model="show" width="460" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>线下订单支付</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate"  :label-width="80">
              <FormItem label="金额:" prop="id">
                  <!-- <Input v-model="formValidate.tradeamount" placeholder="请输入金额"></Input> -->
                  {{formValidate.tradeamount}}
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
  name: "",
  props: {
    itemdata:{
      default:{}
    },
    payShow:{
      default:false
    }
  },
  data: () => ({
    show:false,
    formValidate:{
      order_id:"",
      tradeamount:"0"
    }
  }),
  mounted() {
    //do something after mounting vue instance
    this.formValidate.order_id = this.itemdata.id
    this.formValidate.tradeamount = this.itemdata.tradeAmount
    this.show = this.payShow
  },
  methods: {
    cancel () {
      this.hideShow()
    },
    hideShow () {
       this.$emit('outPlay',{show:false})
    },
    handleSubmit (name) {
      var _this = this
      if(parseFloat(this.tradeamount)<0){
         this.$Message.info("金额不能少于0")
         return
      }
      var listdata = {
          order_id:parseInt(this.formValidate.order_id),
          token:this.$webapi.get('token'),
          tradeamount:parseFloat(this.formValidate.tradeamount)
      }
      this.$api.post('/order_buyer/offline_pay',listdata,reset => {
          if (reset.codeId === 1) {
                _this.hideShow()
          } else {
              _this.$netcode.getApiCode(reset)
          }
      })
    },
    handleReset (name) {
      this.hideShow()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
