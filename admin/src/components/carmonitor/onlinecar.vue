<template>
  <div>
    <div class="system-hd">
      <Tabs type="card" @on-click="selecttab">
          <TabPane label="实时信息">
            <realtime-component :Emitsidedata="data" v-if="tab1"></realtime-component>
          </TabPane>
          <TabPane label="CAN信息">
           <can-component :Emitsidedata="data" v-if="tab2"></can-component>
          </TabPane>
          <TabPane label="报警信息">
            <fault-component :Emitsidedata="data" v-if="tab3"></fault-component>
          </TabPane>
          <TabPane label="车辆基本信息">
            <carinfo-component :Emitsidedata="data" v-if="tab4"></carinfo-component>
          </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import realtimeComponent from './online/realtime'
import canComponent from './online/can.vue'
import faultComponent from './online/fault.vue'
import carinfoComponent from './online/carinfo.vue'
export default {
  props: ['dynamicdata'],
  name:"onlinecar",
  components: {
    realtimeComponent,
    canComponent,
    faultComponent,
    carinfoComponent
  },
  data() {
    return {
      show:false,
      data:{},
      tab1:false,
      tab2:false,
      tab3:false,
      tab4:false,
      tab5:false
    }
  },
  watch:{
    dynamicdata:{
      handler(curVal,oldVal){
　　　   this.data = curVal
　　  },
　　  deep:true
    }
  },
  mounted() {
     this.data = this.dynamicdata
     this.tab1 = true
  },
  methods: {
    emit () {
       this.$emit("carclick","")
    },
    selecttab (e) {
       this.data.time = new Date().getTime()
       var Num = e +1
       for(var i = 1 ;i<5;i++){
         this['tab' + i] = false
       }
       this['tab' + Num] = true
       this.emit()
    }
  }
}
</script>
<style lang="less" scoped>
  .system-hd{
    height: 280px;
    padding-top: 10px;
    overflow:hidden;
  }
</style>
