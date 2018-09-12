<template>
    <div class="faultbox">
      <table class="table table-bordered">
         <tbody>
           <tr>
             <td class="tdBg" style="width: 13.3%">车牌号</td>
             <td style="width: 20%">{{data.licencePlateNumber}}</td>
             <td class="tdBg" style="width: 13.3%">VIN码</td>
             <td style="width: 20%">{{data.vin}}</td>
             <td class="tdBg" style="width: 13.3%">SIM卡号</td>
             <td style="width: 20%">{{data.simNo}}</td>
           </tr>
           <tr>
             <td class="tdBg" style="width: 13.3%">状态</td>
             <td style="width: 20%">
               <span v-if="data.status==1">在线</span>
               <span v-if="data.status==2">离线</span>
             </td>
             <td class="tdBg" style="width: 13.3%">终端编号</td>
             <td style="width: 20%">{{data.terminalNo}}</td>
           </tr>
         </tbody>
      </table>
    </div>
</template>
<script>
import Pages from '../../pub/page.vue'
export default {
  name:"fault",
  props: ['Emitsidedata'],
  components: {
    Paging:Pages,
  },
  data() {
    return {
      data:{},
      faultdata:{},
    }
  },
  mounted() {
    this.data = this.Emitsidedata
    //this.list()
  },
  watch: {
    Emitsidedata:{
      handler(curVal,oldVal){
　　　   this.data = curVal
         this.list()
　　  },
　　  deep:true
    }
  },
  methods: {
    pageComponentDate (e){
      this.pageData.pageCurrent = e
      this.list()
    },
    list () {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            vin:this.data.vin
        }
        this.$api.get("/monitor/detail", data, reset => {
          if (reset.codeId === 1) {
              _this.faultdata = reset.resData
          }
          else {
            _this.$netcode.getApiCode(reset)
         }
       })
    }
  }
}
</script>
<style lang="less">
.table{
   width: 100%;
   margin-bottom: 20px;
   border-collapse: collapse;
   border-spacing: 0;
}
.table tbody tr td{
  padding: 8px
}
.table tbody tr >td{
  border: #ddd 1px solid;
}
.table-bordered{
  border: #ddd 1px solid;
}
.tdBg{
  background: #f3f3f3
}
</style>
