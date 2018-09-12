<template>
  <div class="F-mapcarinfo-box" v-if="Fmapcarinfoshow">
     <ul>
     <li><label>vin:</label><div class="mapcar-txt">{{cardata.vin}}</div></li>
     <li><label>车牌号码:</label><div class="mapcar-txt">{{cardata.licencePlateNumber}}</Input></div></li>
     <li><label>SIM:</label><div class="mapcar-txt">{{cardata.simNo}}</div></li>
     <li><label>车辆型号:</label><div class="mapcar-txt">{{cardata.modelName}}</div></li>
     <li><label>经销商:</label><div class="mapcar-txt">{{cardata.dealerName}}</div></li>
     <li><label>车辆配置:</label><div class="mapcar-txt">{{cardata.skuValue}}</div></li>
     <li><label>电机编号:</label><div class="mapcar-txt">{{cardata.monitorNo}}</div></li>
     <!-- <li><label>生产日期:</label><div class="mapcar-txt">{{cardata.factoryDate}}</div></li> -->
     <!-- <li><label>电控编号:</label><div class="mapcar-txt">{{cardata.controlNo}}</div></li> -->
     <li><label>车主姓名:</label><div class="mapcar-txt">{{cardata.carUserName}}</div></li>
     <li><label>电池编号:</label><div class="mapcar-txt">{{cardata.batteryNo}}</div></li>
     <li><label>联系电话:</label><div class="mapcar-txt">{{cardata.carUserMobile}}</div></li>
     <!-- <li><label>回传编号:</label><div class="txtcar"><Input v-model="unell" placeholder="回传编号"></Input></div></li>
     <li><label>身份证号:</label><div class="txtcar"><Input v-model="unell" placeholder="身份证号"></Input></div></li>
     <li><label>终端类型:</label><div class="txtcar"><Input v-model="unell" placeholder="终端类型"></Input></div></li>
     <li><label>回传Iccid:</label><div class="txtcar"><Input v-model="unell" placeholder="回传Iccid"></Input></div></li> -->
     <li><label>终端编号:</label><div class="mapcar-txt">{{cardata.terminalNo}}</div></li>
     <!-- <li><label>设备卡号:</label><div class="txtcar"><Input v-model="unell" placeholder="设备卡号"></Input></div></li> -->
     </ul>
     <div class="">
       <span @click="outbutton"><Button type="error">退出</Button></span>
     </div>
  </div>
</template>
<script>
import {vm} from '../../../js/infobase/vm.js'
export default {
  props:{
    Fshow:false,
  },
  data() {
     return {
       Fmapcarinfoshow:false,
       vin:'',
       cardata:{}
     }
   },
   mounted() {
     //do something after mounting vue instance
     vm.$on("Fmapcarinfo", (e) => {
        this.cardata = e
        this.Fmapcarinfoshow = true
     });
   },
   methods: {
     outbutton () {
       this.Fmapcarinfoshow = false
     }
   }
}
</script>
<style lang="less">
  .F-mapcarinfo-box{
    position: absolute;
    width: 600px;
    height: 300px;
    bottom:0;
    left:0;
    border: #18284a 1px solid;
    background: rgba(0, 0, 0, 0.7);
    padding-top: 20px;
    ul{
      float: left;
      width: 100%;
      li{
        float: left;
        width: 50%;
        margin-bottom: 10px;
        color: #94a5cb;
        label{
          float: left;
          width: 100px;
          text-align: right;
        }
        .mapcar-txt{
          float: left;
        }
      }
    }
  }
</style>
