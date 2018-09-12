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
                <td class="tdBg" style="width: 13.3%">车辆状态</td>
                <td style="width: 20%">
                  <span v-if="data.carState==1">启动</span>
                  <span v-if="data.carState==2">熄火</span>
                  <span v-if="data.carState==3">启动</span>
                </td>
                <td class="tdBg" style="width: 13.3%">充电状态</td>
                <td style="width: 20%">
                  <span v-if="data.chargeState==1">停车充电</span>
                  <span v-if="data.chargeState==2">行驶充电</span>
                  <span v-if="data.chargeState==3">未充电</span>
                  <span v-if="data.chargeState==4">充电完成</span>
                </td>
                <td class="tdBg" style="width: 13.3%">终端编号</td>
                <td style="width: 20%">{{data.terminalNo}}</td>
              </tr>
              <tr>
                <td class="tdBg" style="width: 13.3%">锁车状态</td>
                <td style="width: 20%">
                  <span v-if="data.mcState==0">
                    <span v-if="data.monitorState==1">耗电</span>
                    <span v-if="data.monitorState==2">发电</span>
                    <span v-if="data.monitorState==3">关闭</span>
                    <span v-if="data.monitorState==4">准备</span>
                    <span v-if="data.monitorState==0">其他异常</span>
                  </span>
                  <span v-if="data.mcState==1">开锁</span>
                  <span v-if="data.mcState==2">关锁</span>
                </td>
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
  border: #fff 1px solid;
}
.table-bordered{
  border: #fff 1px solid;
}
.tdBg{
  background:none
}
</style>
