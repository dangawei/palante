<template>
<div class="">
  <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
     <p slot="header">
         <Icon type="information-circled"></Icon>
         <span>审核管理</span>
     </p>
     <div style="text-align:center;overflow: hidden;">
         <Form  :model="formValidate"  :label-width="80">
             <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <div class="">
                   <FormItem label="审核状态:" prop="purchase_order_no" >
                     <Select v-model="formValidate.value" @on-change="select()">
                        <Option v-for="item in ItemselectData" :value="item.value">{{item.name}}</Option>
                    </Select>
                   </FormItem>
                 </div>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24" v-if="formValidate.reasonshow">
                 <div class="">
                   <FormItem label="审核不通过理由:" prop="dealer_name">
                       <Input v-model="formValidate.reasonbeank" type="textarea" :rows="4" placeholder="审核不通过理由" />
                   </FormItem>
                 </div>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <div class="mt10">
                   <FormItem>
                       <Button type="primary" @click="handleSave()">确认</Button>
                       <Button type="primary" @click="handleClose()">取消</Button>
                   </FormItem>
                 </div>
               </Col>
             </Row>
         </Form>
     </div>
     <div slot="footer">
     </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'index',
  props:{
      itemdata:{
        default:function () {
          return [{value:"",name:"全部"},{value:"1",name:"审核通过"},{value:"2",name:"审核不通过",reasonshow:true}]
        }
      },
      reasonShow:{
        default:false,
      }
  },
  components: {
  },
  data () {
    return {
      show:false,
      ItemselectData:[],
      formValidate:{
        value:"",
        reasonshow:false,
        reasonbeank:""
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.show = this.reasonShow
    this.ItemselectData  = this.itemdata
  },
  watch:{
    reasonShow:{
      handler (val,oldval){
          this.show = val
      },
      deep:true
    }
  },
  methods: {
    select() {
        var _this = this
        this.itemdata.forEach(function (a) {
          if(a.value == _this.formValidate.value){
              _this.formValidate.reasonshow = a.reasonshow
          }
        })
    },
    cancel () {
      this.remove ()
    },
    remove (){
      this.show = false
      this.$emit("reasonEmitCompont",this.formValidate)
    },
    handleClose (){
      this.remove ()
    },
    handleSave () {
      if(this.formValidate.value == ""){
        this.$Message.info("审核状态没有选择")
        return
      }
      this.remove ()
    }
  }
}
</script>
