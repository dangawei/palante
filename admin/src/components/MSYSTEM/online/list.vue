<template>
   <div class="FB-line">
      <div class="FB-line-hd">
         <div class="FB-line-nav mt10">
            <span @click="onlineTimeType(1)" class="ative onlinebtn">实时在线</span>
            <span @click="onlineTimeType(2)">历史轨迹</span>
         </div>
         <div class="FB-line-info">
          <div class="FB-info-list mt10">
            <span @click="infotab(1)" :class="{ative:infotabshow==1}">实时信息</span>
            <span @click="infotab(2)" :class="{ative:infotabshow==2}">CAN信息</span>
            <span @click="infotab(3)" :class="{ative:infotabshow==3}">报警信息</span>
            <span @click="infotab(4)" :class="{ative:infotabshow==4}">车辆基本信息</span>
          </div>
         </div>
      </div>
      <div class="FB-line-bd">
         <onlineinfo-component v-if="infotabshow==1" :caritem="caritem"></onlineinfo-component>
         <canlist-component v-if="infotabshow==2" :caritem="caritem"></canlist-component>
         <fault-component v-if="infotabshow==3" :caritem="caritem"></fault-component>
         <carinfo-component v-if="infotabshow==4" :caritem="caritem"></carinfo-component>
      </div>
   </div>
</template>
<script>
import onlineinfoComponent from "./onlineinfo.vue"
import canlistComponent from "./canconponent.vue"
import carinfoComponent from "./carinfo.vue"
import faultComponent from "./faultcomponent.vue"
import {vm} from '../../../js/infobase/vm.js'
export default {
  props: {
    caritem:{
      default:{}
    }
  },
  components: {
    onlineinfoComponent,
    canlistComponent,
    carinfoComponent,
    faultComponent
  },
  data() {
     return {
       infotabshow:1
     }
   },
   mounted() {
     //do something after mounting vue instance
   },
   methods: {
     onlineTimeType (e) {
       vm.$emit("onlineTimeType",e)
     },
     infotab(e) {
       this.infotabshow = e
     }
   }
}
</script>
<style lang="less" scoped>
.FB-line{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .FB-line-hd{
    flex-direction: row;
    display: flex;
    .FB-line-nav{
      flex: 1;
      text-align: left;
      span{
        padding: 0 20px;
        color: #5388ff;
        font-size: 16px;
        line-height: 38px;
        height: 38px;
        float: left;
        position: relative;
        border: #00bd93 1px solid;
        border-radius:17px;
        margin-right: 20px;
        cursor: pointer;
        color: #00bd93;
      }
      .ative{
        background: #00bd93;
        color: #fff
      }
    }
    .FB-line-info{
      .FB-info-list{
        border: #00bd93 1px solid;
        overflow: hidden;
        margin-right: 20px;
        color: #00bd93;
        .ative{
          background: #00bd93;
          color: #fff
        }
        span{
          height: 38px;
          line-height: 38px;
          padding: 0 10px;
          border-right: #00bd93 1px solid;
          float: left;
          color: #00bd93;
          cursor: pointer;
          font-size: 14px;
        }
        span:last-child{
          border-right:none;
        }
      }
    }
  }
  .FB-line-bd{
    flex: 1;
    display: flex;
    flex-direction: column;
    .caronline{
      flex: 1;
    }
  }
}
</style>
