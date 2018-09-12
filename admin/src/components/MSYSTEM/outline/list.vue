<template>
  <div class="FB-line">
     <div class="FB-line-hd">
        <div class="FB-line-nav mt10">
           <span @click="onlineTimeType(1)">实时在线</span>
           <span @click="onlineTimeType(2)" class="ative onlinebtn">历史轨迹</span>
        </div>
        <div class="FB-line-info">
         <div class="mt10" style="margin-top:15px;margin-right:10px;">
           <span><DatePicker type="datetime" placeholder="开始时间" style="width: 150px" @on-change="startTime"></DatePicker></span>
           <span><DatePicker type="datetime" placeholder="结束时间" style="width: 150px" @on-change="endTime"></DatePicker></span>
           <span @click="selectTime()"><Button type="error">查询</Button></span>
         </div>
         <!-- <div class="FB-info-list mt10">
           <span @click="infotab(1)" :class="{ative:infotabshow==1}">实时信息</span>
           <span @click="infotab(2)" :class="{ative:infotabshow==2}">CAN信息</span>
           <span @click="infotab(3)" :class="{ative:infotabshow==3}">报警信息</span>
           <span @click="infotab(4)" :class="{ative:infotabshow==4}">车辆基本信息</span>
         </div> -->
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
var outlinedata;
  export default {
    components: {
      onlineinfoComponent,
      canlistComponent,
      carinfoComponent,
      faultComponent
    },
    data() {
       return {
         infotabshow:1,
         caritem:{},
         emitmapdata:[],
         dataindex:0,
         startTimeval:"",
         endTimeval:"",
         alldistance:0
       }
     },
     mounted() {
       //do something after mounting vue instance
       vm.$on("outmapdata",(e)=>{
         if(e.length>0){
            this.alldistance = e[e.length-1].distance - e[0].distance
            var item = e[0]
                item.alldistance = this.alldistance
            this.caritem = item
            this.emitmapdata = e
         }
       })
       vm.$on("outmapplay",(e)=>{
          this.timetype(e)
       })
     },
     methods: {
       onlineTimeType (e){
         vm.$emit("onlineTimeType",e)
       },
       timetype (e) {
          if(e==1){
            this.start()
          }else if(e==2){
            this.stop()
          }else if(e==3){
            this.startstop()
          }
       },
       start () {
          outlinedata = setInterval(this.startitem,1000)
       },
       startitem () {
         var num  = parseInt(this.dataindex) + 1
         var itemtemp = this.emitmapdata[num]
             itemtemp.alldistance = this.alldistance
         this.caritem = itemtemp
         this.dataindex  = num
       },
       stop () {
         this.dataindex = 0
         clearInterval(outlinedata)
       },
       startstop () {
         clearInterval(outlinedata)
       },
       startTime (e){
         this.startTimeval = e
       },
       endTime (e) {
          this.endTimeval = e
       },
       selectTime (){
         vm.$emit("startTimeType",{
           startTimeval:this.startTimeval,
           endTimeval:this.endTimeval
         })
       }
     }
  }
</script>
<style lang="less">
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
      .ative,span:hover{
        background: #00bd93;
        color: #fff
      }
    }
    .FB-line-info{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .FB-info-list{
        border: #5388ff 1px solid;
        overflow: hidden;
        margin-right: 20px;
        .ative{
          background: #5388ff;
          color: #fff
        }
        span{
          height: 38px;
          line-height: 38px;
          padding: 0 10px;
          border-right: #5388ff 1px solid;
          float: left;
          color: #7b859b;
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
