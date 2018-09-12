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
         <Tabs value="a1">
             <!-- <TabPane label="整车数据" name="a1">
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
             </TabPane> -->
             <TabPane label="驱动电机数据" name="a1">
               <div class="m10 table_box">
                 <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电机控制器温度(℃)</td>
                        <td style="width: 20%">{{data.monitorControlTemperature-40}}</td>
                        <td class="tdBg" style="width: 13.3%">驱动电机序号</td>
                        <td style="width: 20%">{{data.monitorSerilNo}}</td>
                        <td class="tdBg" style="width: 13.3%">电机控制器电流(A)</td>
                        <td style="width: 20%">{{(data.monitorCurrent/10)-1000}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电机控制器电压(V)</td>
                        <td style="width: 20%">{{data.monitorControlVoltage}}</td>
                        <td class="tdBg" style="width: 13.3%">电机转速(r/min)</td>
                        <td style="width: 20%">{{data.monitorSpeed/10}}</td>
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
                        <td style="width: 20%">{{data.monitorTemperature-40}}</td>
                        <td class="tdBg" style="width: 13.3%">电机转矩(N*m)</td>
                        <td style="width: 20%">{{data.monitorTorque}}</td>
                      </tr>
                    </tbody>
                 </table>
               </div>
             </TabPane>
             <TabPane label="车辆数据">
               <div class="m10 table_box">
                 <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">车辆状态</td>
                        <td style="width: 20%">
                          <span v-if="data.carState==1">启动</span>
                          <span v-if="data.carState==2">熄火</span>
                          <span v-if="data.carState==3">其他状态</span>
                        </td>
                        <td class="tdBg" style="width: 13.3%">充电状态</td>
                        <td style="width: 20%">
                          <span v-if="data.chargeState==0">无效</span>
                          <span v-if="data.chargeState==1">停车充电</span>
                          <span v-if="data.chargeState==2">行驶充电</span>
                          <span v-if="data.chargeState==3">未充电</span>
                          <span v-if="data.chargeState==4">充电完成</span>
                        </td>
                        <td class="tdBg" style="width: 13.3%">运行模式</td>
                        <td style="width: 20%">
                          <div class="mon-mileage" v-if="data.runModel==0">无效</div>
                          <div class="mon-mileage" v-if="data.runModel==1">纯电</div>
                          <div class="mon-mileage" v-if="data.runModel==2">混动</div>
                          <div class="mon-mileage" v-if="data.runModel==3">燃油</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">车速</td>
                        <td style="width: 20%">
                          {{data.speed/10}}
                        </td>
                        <td class="tdBg" style="width: 13.3%">总里程(km)</td>
                        <td style="width: 20%">{{data.distance/10}}公里</td>
                        <td class="tdBg" style="width: 13.3%">DC-DC状态</td>
                        <td style="width: 20%">
                          <div class="montxt" v-if="data.dcState==1">工作</div>
                          <div class="montxt" v-if="data.dcState==2">断开</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">挡位</td>
                        <td style="width: 20%">{{data.gear}}</td>
                        <td class="tdBg" style="width: 13.3%">绝缘电阻(KΩ)</td>
                        <td style="width: 20%"><div class="montxt">{{data.resistance}}KΩ</div></td>
                        <td class="tdBg" style="width: 13.3%">地理位置</td>
                        <td style="width: 20%">{{data.latitude/1000000}}  {{data.longitude/1000000}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">加速踏板行程值</td>
                        <td style="width: 20%">

                        </td>
                        <td class="tdBg" style="width: 13.3%">制动踏板状态</td>
                        <td style="width: 20%">
                          <div class="montxt" v-if="data.dcState==1">工作</div>
                          <div class="montxt" v-if="data.dcState==2">断开</div>
                        </td>
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
                      <tr>
                        <td class="tdBg" style="width: 13.3%">最高报警等级</td>
                        <td style="width: 20%">{{data.maxFaultLevel}}</td>
                      </tr>

                    </tbody>
                 </table>
               </div>
             </TabPane>
             <TabPane label="电池数据">
               <div class="m10 table_box">
                 <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电池组编号</td>
                        <td style="width: 20%">null</td>
                        <td class="tdBg" style="width: 13.3%">电池单体电压最高值(V)</td>
                        <td style="width: 20%">{{data.peak03/1000}}</td>
                        <td class="tdBg" style="width: 13.3%">最高温度值(℃)</td>
                        <td style="width: 20%">{{data.peak09-40}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电池组总电压（V）</td>
                        <td style="width: 20%">{{data.peak12-40}}</td>
                        <td class="tdBg" style="width: 13.3%">最高电压电池单体代号</td>
                        <td style="width: 20%">{{data.peak02}}</td>
                        <td class="tdBg" style="width: 13.3%">最高温度探针序号</td>
                        <td style="width: 20%">{{data.peak08}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电池组总电流(A)</td>
                        <td style="width: 20%">{{parseInt(data.current/10)-1000}}</td>
                        <td class="tdBg" style="width: 13.3%">电池组最低单体电压（V）</td>
                        <td style="width: 20%">{{data.peak06/1000}}</td>
                        <td class="tdBg" style="width: 13.3%">电池组最低温度（℃）</td>
                        <td style="width: 20%">{{data.peak12-40}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电池组SOC（%）</td>
                        <td style="width: 20%">{{data.soc}}</td>
                        <td class="tdBg" style="width: 13.3%">最低电压电池单体代号</td>
                        <td style="width: 20%">{{data.peak05}}</td>
                        <td class="tdBg" style="width: 13.3%">最低温度探针序号</td>
                        <td style="width: 20%">{{data.peak11}}</td>
                      </tr>
                      <tr>
                        <td class="tdBg" style="width: 13.3%">电池组状态</td>
                        <td style="width: 20%">null</td>
                        <td class="tdBg" style="width: 13.3%">单体电池总数</td>
                        <td style="width: 20%">{{data.batteryCount}}</td>
                        <td class="tdBg" style="width: 13.3%">可充电储能温度探针个数</td>
                        <td style="width: 20%">{{data.tempCount}}</td>
                      </tr>
                    </tbody>
                 </table>
               </div>
             </TabPane>
             <TabPane label="单体数据">
               <div class="m10 table_box">
                  <ul class="Voltage">
                    <li v-for="(item,index) in monomerVoltage">【{{index+1}}】 {{item}}</li>
                  </ul>
               </div>
             </TabPane>
            <TabPane label="温度数据">
              <div class="m10 table_box">
                <ul class="Voltage">
                  <li v-for="(item,index) in monomerCurrent">【{{index+1}}】 {{item}}</li>
                </ul>
              </div>
            </TabPane>
             <!--  <TabPane label="电池包电压">电池包电压</TabPane> -->
         </Tabs>
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
         infotabshow:1,
         monomerVoltage:[],
         monomerCurrent:[]
       }
    },
    mounted() {
      //do something after mounting vue instance
      this.data = this.caritem
      this.list()

    },
    watch:{
      caritem:{
        handler (val,oldval) {
           this.data = val
           this.chart()
           this.list()
        },
        deep:true
      }
    },
    methods: {
      list() {
          var resetVoltage = []
          var resetCurrent = []
          var Voltage = this.data.monomerVoltage.split(":")
              for(var i = 0 ; i<Voltage.length-1;i++){
                resetVoltage.push(Voltage[i])
              }
          var Current = this.data.monomerCurrent.split(":")
              for(var i = 0 ; i<Current.length-1;i++){
                resetCurrent.push(Current[i])
              }
          this.monomerVoltage = resetVoltage
          this.monomerCurrent = resetCurrent
      }
    }
  }
</script>
<style lang="less" scoped>
 .table_box{
   height: 190px;
   overflow: auto;
 }
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
  color:#fff
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
.Voltage{
  li{
    float: left;
    width: 100px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
}
</style>
