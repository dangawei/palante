<template>
  <div>
    <Tabs value="a1">
        <TabPane label="整车数据" name="a1">
          <div class="m10">
            <table class="table table-bordered">
               <tbody>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">制动踏板状态(%)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">充电次数(次)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">DC-DC状态</td>
                   <td style="width: 20%">
                     <div class="montxt" v-if="data.dcState==1">工作</div>
                     <div class="montxt" v-if="data.dcState==2">断开</div>
                   </td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">档位制动力状态</td>
                   <td style="width: 20%"><div class="montxt"><span class="stall" id="gear">{{data.gear}}</span></div></td>
                   <td class="tdBg" style="width: 13.3%">绝缘电阻(KΩ)</td>
                   <td style="width: 20%"><div class="montxt">{{data.resistance}}KΩ</div></td>
                   <td class="tdBg" style="width: 13.3%">锁车使能状态</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">动力蓄电池编码</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">充电状态</td>
                   <td style="width: 20%">
                     <span v-if="data.chargeState==1">停车充电</span>
                     <span v-if="data.chargeState==2">行驶充电</span>
                     <span v-if="data.chargeState==3">未充电</span>
                     <span v-if="data.chargeState==4">充电完成</span>
                   </td>
                   <td class="tdBg" style="width: 13.3%">总里程(km)</td>
                   <td style="width: 20%">{{data.distance/100}}公里</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">锁车状态</td>
                   <td style="width: 20%">--</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane label="驱动电机数据">
          <div class="m10">
            <table class="table table-bordered">
               <tbody>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">电机控制器温度(℃)</td>
                   <td style="width: 20%">{{data.monitorControlTemperature}}</td>
                   <td class="tdBg" style="width: 13.3%">驱动电机序号</td>
                   <td style="width: 20%">{{data.monitorSerilNo}}</td>
                   <td class="tdBg" style="width: 13.3%">电机控制器电流(A)</td>
                   <td style="width: 20%">{{data.monitorCurrent}}</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">电机控制器电压(V)</td>
                   <td style="width: 20%">{{data.monitorCurrent}}</td>
                   <td class="tdBg" style="width: 13.3%">电机转速(r/min)</td>
                   <td style="width: 20%">{{data.monitorSpeed/1000}}</td>
                   <td class="tdBg" style="width: 13.3%">驱动电机状态</td>
                   <td style="width: 20%">
                     <span v-if="data.monitorState==1">耗电</span>
                     <span v-if="data.monitorState==2">发电</span>
                     <span v-if="data.monitorState==3">关闭</span>
                     <span v-if="data.monitorState==4">准备</span>
                     <span v-if="data.monitorState==0">其他异常</span>
                   </td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">电机温度(℃)</td>
                   <td style="width: 20%">{{data.monitorTemperature}}</td>
                   <td class="tdBg" style="width: 13.3%">电机转矩(N*m)</td>
                   <td style="width: 20%">{{data.monitorTorque}}</td>
                   <td class="tdBg" style="width: 13.3%">驱动电机个数(个)</td>
                   <td style="width: 20%">--</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane label="车辆位置数据">
          <div class="m10">
            <table class="table table-bordered">
               <tbody>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">纬度</td>
                   <td style="width: 20%">{{data.latitude}}</td>
                   <td class="tdBg" style="width: 13.3%">定位状态</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">经度</td>
                   <td style="width: 20%">{{data.longitude}}</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane label="极值数据">
          <div class="m10">
            <table class="table table-bordered">
               <tbody>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">电池单体电压最高值(V)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最高温度值(℃)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最低温度值(℃)</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">最高温度子系统号</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最高温度探针序号</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最高电压电池单体代号</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">最高电压电池子系统号</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">电池单体电压最低值(V)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最低温度子系统号</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">最低温度探针序号</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最低电压电池单体代号</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最低电压电池子系统号</td>
                   <td style="width: 20%">--</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane label="报警数据">
          <div class="m10">
            <table class="table table-bordered">
               <tbody>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">报警列表</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">驱动电机故障代码列表</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">发动机故障列表</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">通用报警标志</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">最高报警等级</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">驱动电机故障总数(个)</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">可充电储能装置故障总数(个)</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">可充电储能装置故障代码列表	</td>
                   <td style="width: 20%">--</td>
                   <td class="tdBg" style="width: 13.3%">发动机故障总数(个)</td>
                   <td style="width: 20%">--</td>
                 </tr>
                 <tr>
                   <td class="tdBg" style="width: 13.3%">其他故障总数(个)</td>
                   <td style="width: 20%">--</td>
                 </tr>
               </tbody>
            </table>
          </div>
        </TabPane>
        <!-- <TabPane label="电池包温度">电池包温度</TabPane>
        <TabPane label="电池包电压">电池包电压</TabPane> -->
    </Tabs>
  </div>
</template>
<script>
export default {
  name:"can",
  props: ['Emitsidedata'],
  data() {
    return {
      data:{},
      onlinedata:{},
      soc:{}
    }
  },
  mounted() {
    this.data = this.Emitsidedata
  },
  methods: {
    list () {
      let _this = this
      var data = {
          token:this.$webapi.get("token"),
          vin:this.Emitsidedata.vin
      }
      this.$api.get("/monitor/detail", data, reset => {
        if (reset.codeId === 1) {
            _this.data =  reset.resData
        }
     })
    }
  },
  watch: {
    Emitsidedata:{
      handler(curVal,oldVal){
　　　    this.data = curVal
　　  },
　　  deep:true
    }
  }
}
</script>
<style lang="less" scoped>
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
