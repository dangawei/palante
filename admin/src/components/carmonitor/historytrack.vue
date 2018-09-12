<template>
  <div>
    <div class="system-hd">
      <Tabs type="card" @on-click="selecttab">
          <TabPane label="历史CAN信息">
            <can-component :vin="vinNo" :outdata="outdata" v-if="tab1"></can-component>
          </TabPane>
          <TabPane label="车辆轨迹展示">
            <postion-component :vin="vinNo" :outdata="outdata" v-if="tab2"></postion-component>
           </TabPane>
          <!-- <TabPane label="历史报警信息">
            <fault-component :vin="vinNo" :outdata="outdata" v-if="tab3"></fault-component>
          </TabPane> -->        
          <!-- <TabPane label="车辆基本信息">
            <div class="" v-if="tab3">
              {{Emitsidedata}}
            </div>
          </TabPane>
          <TabPane label="操作记录">
            <div class=""  v-if="tab4">
               {{Emitsidedata}}
            </div>
          </TabPane> -->
      </Tabs>
      <div class="carshow-hd">
         <ul>
           <li :class="{ative:tabnum==1}" @click="tab(1)">今天</li>
           <li :class="{ative:tabnum==2}" @click="tab(2)">昨天</li>
           <li :class="{ative:tabnum==3}" @click="tab(3)">前天</li>
           <li :class="{ative:tabnum==4}" >
              <span @click="tab(4)">自定义</span>
              <div class="api" v-if="timeshow">
                  <div class="">
                     <DatePicker type="date" placeholder="自定义时间" value="Poptiptime" @on-change="Poptip"></DatePicker>
                  </div>
                 <div class="" style="text-align:left;margin-top:5px">
                   <span @click="save()">
                     <Button type="primary" size="small">确认</Button>
                   </span>
                 </div>
              </div>

           </li>
         </ul>
      </div>
    </div>
  </div>
</template>
<script>
import realtimeComponent from './outline/realtime'
import canComponent from './outline/can.vue'
import faultComponent from './outline/fault.vue'
import postionComponent from './outline/postion.vue'
export default {
  props: ['vin','settime'],
  name:"historytrack",
  components: {
    realtimeComponent,
    canComponent,
    faultComponent,
    postionComponent
  },
  data() {
    return {
      show:false,
      data:{},
      tab1:false,
      tab2:false,
      tab3:false,
      tab4:false,
      tab5:false,
      tabnum:1,
      Poptiptime:"",
      timeshow:false,
      outdata:{},
      vinNo:""
    }
  },
  watch:{
    vin:{
      handler(curVal,oldVal){
　　　   this.vinNo = curVal
　　  },
　　  deep:true
    }
  },
  mounted() {
     this.vinNo = this.vin
     this.startTime = this.$webapi.gettime("date",(new Date().getTime())/1000)
     this.outdata = {
       startTime:this.$webapi.gettime("date",(new Date().getTime())/1000),
       count:new Date().getTime()
     }
     this.show = true
     this.tab1 = true
  },
  methods: {
    Poptip (e) {
      this.Poptiptime = e
    },
    save () {
      this.outdata = {
        startTime:this.Poptiptime,
        count:new Date().getTime()
      }
      this.timeshow = false
      this.Poptiptime = ''
  },
  tab (e) {
    this.tabnum = e
    if(this.tabnum==1){
        this.outdata = {
          startTime:this.$webapi.gettime("date",(new Date().getTime())/1000),
          count:new Date().getTime()
        }
    }
    if(this.tabnum==2){
        this.outdata = {
          startTime:this.$webapi.gettime("date",(new Date().getTime()-24*3600*1000)/1000),
          count:new Date().getTime()
        }
    }
    if(this.tabnum==3){
      this.outdata = {
        startTime:this.$webapi.gettime("date",(new Date().getTime()-24*3600*1000*2)/1000),
        count:new Date().getTime()
      }
   }
   if(this.tabnum==4){
      this.timeshow = true
   }
  },
  selecttab (e) {
     var Num = e +1
     for(var i = 1 ;i<5;i++){
       this['tab' + i] = false
     }
     this['tab' + Num] = true
     this.tab(this.tabnum)
    }
  }
}
</script>
<style lang="less" scoped>
  .system-hd{
    height: 280px;
    padding-top: 10px;
    // overflow:hidden;
  }
  .api{
    position: absolute;
    width: 200px;
    height: 100px;
    background: #fff;
    top: -110px;
    left: -140px;
    padding: 10px;
    border-radius: 2px;
  }
  .carshow-hd{
    text-align: right;
    height: 35px;
    float:right;
    width: 400px;
    position: absolute;
    top: 40px;
    right: 0;
    line-height: 40px;
    ul{
      float:right;
      li{
        float:left;
        padding: 0 15px;
        cursor: pointer;
        line-height: 35px;
        height: 35px;
        position:relative;
      }
      li.ative{
        background: #00b5ab;
        color: #fff;
        border-radius: 2px
      }
    }
  }
  .ivu-tabs{
    overflow: inherit!important;
  }
</style>
