<template>
  <div class="">
    <Modal v-model="show" width="460" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>{{itemdata.vin}}导出数据</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :label-width="80">
             <FormItem label="开始时间:" prop="purchaseOrderNo"  required>
                 <DatePicker type="datetime" placeholder="开始时间" @on-change="startTime" ></DatePicker>
             </FormItem>
             <FormItem label="结束时间:" >
                <DatePicker type="datetime" placeholder="结束时间" @on-change="endTime"></DatePicker>
             </FormItem>
              <FormItem>
                  <Button type="primary" @click="save()">下载数据</Button>
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
  export default {
    props:{
      itemexportshow:{
        default:false
      },
      itemdata:{
        default:{}
      }
    },
    data () {
      return {
          show:true,
          formValidate:{
            startTime:"",
            endTime:"",
          }
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.show = this.itemexportshow
    },
    methods: {
      startTime (e) {
        this.formValidate.startTime =e
      },
      endTime (e) {
        this.formValidate.endTime =e
      },
      cancel () {
        this.hideshow()
      },
      hideshow () {
        this.show = false
        this.$emit("exportdata",false)
      },
      handleReset () {
        this.hideshow()
      },
      save() {
        if(this.formValidate.startTime==""){
          this.$Message.info("开始时间没有选择")
          return
        }
        if(this.formValidate.endTime==""){
          this.$Message.info("结束时间没有选择")
          return
        }
        var _this = this
        var data = {
          token:this.$webapi.get("token"),
          vins:[],
          startTime:this.formValidate.startTime,
          endTime:this.formValidate.endTime
        }
        data.vins.push(this.itemdata.vin)
        data.vins = JSON.stringify(data.vins)
        this.$api.get('/monitor/detail/export', data, reset => {
          if (reset) {
            if(reset.codeId==undefined || reset.codeId==null){
              window.location.href = _this.$webapicommon+"/monitor/detail/export?token="+_this.$webapi.get('token')+"&vins="+data.vins+"&startTime="+data.startTime + "&endTime="+data.endTime
              _this.hideshow()
            }else{
              _this.$netcode.getApiCode(reset)
            }
          }
          else {
            _this.$netcode.getApiCode(reset)
          }
        })
      }
    }
  }
</script>
