<template>
    <div>
      <Modal v-model="sshow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>通知预约</span>
        </p>
        <div style="text-align: left;">
          <Form ref="adddatas" :model="adddatas" :label-width="80" label-position="left">
            <FormItem label="通知时间" >
              <DatePicker type="date" placeholder="通知时间" @on-change="informTime"></DatePicker>
            </FormItem>
            <FormItem label="手机号" prop="phone">
              <p>{{adddatas.phone}}</p>
            </FormItem>
            <FormItem label="短信内容" prop="centent">
              
              <Input type="textarea" v-model="adddatas.centent" placeholder="短信内容" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">通知</Button>
              <Button type="primary" @click="cancel('adddatas')" size="large">取消</Button>
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
        props:['smsshow','userinfo'],
        data () {
          return {
            // 模态框展示
            sshow:false,
            adddatas:{
              informTime:'',
              phone:'',
              content:''
            },
          }   
        },
        created(){
          this.sshow=this.smsshow
          this.adddatas.phone=this.userinfo.phone
        },
        mounted(){
          
        },
        methods: {
          // 时间变化
          informTime(e){
            this.adddatas.informTime = e
            console.log(this.adddatas.informTime)
          },
          
          cancel () {
            this.$emit('smsshow',false)
            this.adddatas={}
          },
          handleSave(name) {
            let _this = this
            this.$refs[name].validate((valid) => {
              if(valid){
                // if ((_this.adddatas.car_sku_id!=null&&_this.adddatas.car_sku_id!='')&&(_this.adddatas.car_model_id!=null&&_this.adddatas.car_model_id!='')&&(_this.adddatas.purchase_quantity!=null&&_this.adddatas.purchase_quantity!='')&&(_this.adddatas.address_price!=null&&_this.adddatas.address_price!='')){
                //   console.log(_this.adddatas);
                //   _this.$emit('addlistshow',{addshow:false,parchase:_this.adddatas})
                //   _this.$Message.Success('成功')
                // }else{
                //   _this.$Message.error('填写不完整!')
                // }
                _this.$Message.success('成功')
                _this.$emit('smsshow',false)

              }else{
                _this.$Message.error('失败!')
              }
            })
          },
        }
    }
</script>
