<template>
  <div class="carinfo-item">
    <div class="M-item-box CANinfo mt10">
       <div class="M-item-style">
           <div class="M-item-top-left w15 h3 M-item-icon"></div>
           <div class="M-item-top-left w3 h15 M-item-icon"></div>
           <div class="M-item-left-bottom w3 h15 M-item-icon"></div>
           <div class="M-item-left-bottom w15 h3 M-item-icon"></div>
           <div class="M-item-top-right w15 h3 M-item-icon"></div>
           <div class="M-item-top-right w3 h15 M-item-icon"></div>
           <div class="M-item-bottom-right w3 h15 M-item-icon"></div>
           <div class="M-item-bottom-right w15 h3 M-item-icon"></div>
       </div>
       <div class="M-item-bd ZD-tab">
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
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      caritem:{
        default:{}
      }
    },
    data() {
       return {
         data:{},
         infotabshow:1
       }
    },
    mounted() {
      //do something after mounting vue instance
      this.data = this.caritem
    },
    watch:{
      caritem:{
        handler (val,oldval) {
           this.data = val
           this.chart()
        },
        deep:true
      }
    }
  }
</script>
<style lang="less" scoped>
 .CANinfo{
  flex: 1;
 }
 .carinfo-item{
   flex: 1;
   display: flex;
   flex-direction:column;
   .M-item-bd{
     margin: 20px;
   }
 }
.table{
   width: 100%;
   margin-bottom: 20px;
   border-collapse: collapse;
   border-spacing: 0;
}
.table tbody tr td{
  padding: 8px;
  color: #f8f8f8
}
.table tbody tr >td{
  border: #18284a 1px solid;
}
.table-bordered{
  border: #18284a 1px solid;
}
.tdBg{
  background: #18284a
}
</style>
