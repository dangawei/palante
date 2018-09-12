<template>
  <div>
   <div class="realtimebox">
      <div class="realtime-left">
        <ul class="montlist">
          <li><label>总里程</label><div class="montxt">
          <div class="mon-mileage"><span>{{data.distance/100}}公里</span></div></div></li>
          <li><label>剩余电量</label><div class="montxt">
            <div class="prog" v-if="data.chargeState!==2">
                <div class="progress-bar-1" :style="soc"></div>
                <span id="RemainingPower">{{data.soc}}</span>
            </div>
            <div class="prog" v-else>
                <div class="progress-bar-1 progressbar" :class="{progressbar:data.chargeState==2}"></div>
                <span id="RemainingPower">{{data.soc}}</span>
            </div>
          </div></li>
          <li><label>电机温度</label><div class="montxt">
            <div class="temlp">
              <div class=" progress-bar-2" :style="monitorTemperature"></div>
              <div class="temlp-bg"></div>
              <span id="Temperature">{{data.monitorTemperature}}</span>
            </div>
          </div></li>
          <li><label>档位信息</label><div class="montxt"><span class="stall" id="gear">{{data.gear}}</span></div></li>
          <li><label>车辆状态</label><div class="montxt">
              <span v-if="data.carState==1">启动</span>
              <span v-if="data.carState==2">熄火</span>
              <span v-if="data.carState==3">其他状态</span>
          </div></li>
        </ul>
      </div>
      <div class="realtime-center">
          <div class="" id="J-speed"></div>
          <!-- <div class="" id="J-voltage"></div>
          <div class="" id="J-motorspeed"></div>
          <div class="" id="J-current"></div> -->
      </div>
      <div class="realtime-right">
        <ul class="montlist">
          <li class=""><label>运行模式</label><div class="montxt">
          <div class="mon-mileage" v-if="data.runModel==1">纯电</div>
          <div class="mon-mileage" v-if="data.runModel==2">混动</div>
          <div class="mon-mileage" v-if="data.runModel==3">燃油</div>
        </div></li>
          <li class=""><label>DC-DC状态</label>
            <div class="montxt" v-if="data.dcState==1">工作</div>
            <div class="montxt" v-if="data.dcState==2">断开</div>
          </li>
          <li><label>充电状态</label><div class="montxt">
              <span v-if="data.chargeState==1">停车充电</span>
              <span v-if="data.chargeState==2">行驶充电</span>
              <span v-if="data.chargeState==3">未充电</span>
              <span v-if="data.chargeState==4">充电完成</span>
           </div></li>
          <li class=""><label>绝缘电阻</label><div class="montxt">{{data.resistance}}KΩ</div></li>
        </ul>
      </div>
   </div>
  </div>
</template>
<script>
export default {
  name:"realtime",
  props: ['Emitsidedata'],
  data() {
    return {
      data:{},
      onlinedata:{},
      soc:{},
      monitorTemperature:{}
    }
  },
  mounted() {
     this.data = this.Emitsidedata
     this.seepnum = this.Emitsidedata.soc
     var str = {
       width:this.seepnum+"%"
     }
     this.soc = str
     var monitorTemperature = {
       width:this.data.monitorTemperature+"%"
     }
     this.monitorTemperature = monitorTemperature
     this.photo()
     if(this.data.chargeState){

     }
  },
  watch:{
    Emitsidedata:{
      handler(curVal,oldVal){　

　　  },
　　  deep:true
     }
  },
  methods: {
    list() {
      let _this = this
      var data = {
          token:this.$webapi.get("token"),
          vin:this.Emitsidedata.vin
      }
      this.$api.get("/monitor/detail", data, reset => {
        if (reset.codeId === 1) {
            _this.data =  reset.resData
            var str = {
              width:reset.resData.soc+"%"
            }
            _this.soc = str
            _this.photo()
        }
     })
    },
    photo () {
      let _this = this
      let speed = this.$echarts.init(document.getElementById('J-speed'))
      // let voltage = this.$echarts.init(document.getElementById('J-voltage'))
      // let motorspeed = this.$echarts.init(document.getElementById('J-motorspeed'))
      // let current = this.$echarts.init(document.getElementById('J-current'))
      var alloption = {
          tooltip : {
              formatter: "{a} <br/>{c} {b}"
          },         
          series : [
              {
                  name: '速度',
                  type: 'gauge',
                  z: 1,
                  min: 0,
                  max: 200,
                  splitNumber: 5,
                  radius: '90%',
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          width: 5
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length: 15,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  splitLine: {           // 分隔线
                      length: 2,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      backgroundColor: 'auto',
                      borderRadius: 2,
                      color: '#eee',
                      padding: 3,
                      textShadowBlur: 2,
                      textShadowOffsetX: 1,
                      textShadowOffsetY: 1,
                      textShadowColor: '#222'
                  },
                  title : {
                      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      fontSize: 20,
                      fontStyle: 'italic'
                  },
                  detail : {
                      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      formatter: function (value) {
                          value = (value + '').split('.');
                          value.length < 2 && (value.push('00'));
                          return ('00' + value[0]).slice(-2)
                              + '.' + (value[1] + '00').slice(0, 2);
                      },
                      fontWeight: 'bolder',
                      borderRadius: 2,
                      backgroundColor: '#444',
                      borderColor: '#aaa',
                      shadowBlur: 5,
                      shadowColor: '#333',
                      shadowOffsetX: 0,
                      shadowOffsetY: 3,
                      borderWidth: 2,
                      textBorderColor: '#000',
                      textBorderWidth: 2,
                      textShadowBlur: 2,
                      textShadowColor: '#fff',
                      textShadowOffsetX: 0,
                      textShadowOffsetY: 0,
                      fontFamily: 'Arial',
                      width: 100,
                      color: '#eee',
                      rich: {}
                  },
                  data:[{value: 40, name: 'km/h'}]
              },
              {
                  name: '转速',
                  type: 'gauge',
                  center: ['20%', '55%'],    // 默认全局居中
                  radius: '75%',
                  min:0,
                  max:7,
                  endAngle:45,
                  splitNumber:7,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          width:5
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length:2,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  splitLine: {           // 分隔线
                      length:10,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:2
                  },
                  title: {
                      offsetCenter: [0, '-30%'],       // x, y，单位px
                  },
                  detail: {
                      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder'
                  },
                  data:[{value: 1.5, name: 'x1000 r/min'}]
              },
              {
                  name: '电量',
                  type: 'gauge',
                  center: ['77%', '50%'],    // 默认全局居中
                  radius: '55%',
                  min: 0,
                  max: 100,
                  startAngle: 135,
                  endAngle: 45,
                  splitNumber: 2,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          width: 5
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 5,
                      length: 10,        // 属性length控制线长
                      lineStyle: {        // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      formatter:function(v){
                          switch (v + '') {
                              case '0' : return '0';
                              case '50' : return '50';
                              case '100' : return '100';
                          }
                      }
                  },
                  splitLine: {           // 分隔线
                      length: 15,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:5
                  },
                  title : {
                      show: false
                  },
                  detail : {
                      show: false
                  },
                  data:[{value: 0.5, name: 'gas'}]
              },
              {
                  name: '温度',
                  type: 'gauge',
                  center : ['77%', '50%'],    // 默认全局居中
                  radius : '25%',
                  min: 0,
                  max: 100,
                  startAngle: 315,
                  endAngle: 225,
                  splitNumber: 2,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          width: 2
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      show: false
                  },
                  axisLabel: {
                      formatter:function(v){
                          switch (v + '') {
                              case '0' : return 'H';
                              case '50' : return 'Water';
                              case '100' : return 'C';
                          }
                      }
                  },
                  splitLine: {           // 分隔线
                      length: 15,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:5
                  },
                  title: {
                      show: false
                  },
                  detail: {
                      show: false
                  },
                  data:[{value: 0.5, name: 'gas'}]
              }
          ]
        };
        alloption.series[0].data[0].value = _this.data.speed;
        alloption.series[1].data[0].value = _this.monitorSpeed?_this.monitorSpeed:0
        alloption.series[2].data[0].value = _this.data.soc
        alloption.series[3].data[0].value = _this.data.monitorTemperature
        speed.setOption(alloption,true);
      var option1 = {
          title: {
              text: "车速",
              textStyle: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  color: '#333'
              },
              x: "center",
              y: 'bottom'
          },
          tooltip: {
              formatter: "{a} : {c}km/h"
          },
          series: [
              {
                  name: '车速',
                  type: 'gauge',
                  min:0,
                  max:200,
                  radius: "90%",
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                          width: 5
                      }
                  },
                  detail: {
                      formatter: '{value}km/h',
                      textStyle: {
                          fontSize: 14,
                      },
                      offsetCenter: [0, '70%']
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 10,   // 每份split细分多少段
                      length :8,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      show: true,
                      distance: 2
                  },
                  splitLine: {           // 分隔线
                      show: true,        // 默认显示，属性show控制显示与否
                      length :10,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:3
                  },
                  data: [{ value: this.data.speed?this.data.speed/10:0 }]
              }
          ]
      };
      var option2 = {
          title: {
              text: "电压",
              textStyle: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  color: '#333'
              },
              x: "center",
              y: 'bottom'
          },
          tooltip: {
              formatter: "{a} : {c}km/h"
          },
          series: [
              {
                  name: '电压',
                  type: 'gauge',
                  min:0,
                  max:1000,
                  radius: "90%",
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                          width: 5
                      }
                  },
                  detail: {
                      formatter: '{value}V',
                      textStyle: {
                          fontSize: 14,
                      },
                      offsetCenter: [0, '70%']
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 10,   // 每份split细分多少段
                      length :8,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      show: true,
                      distance: 2
                  },
                  splitLine: {           // 分隔线
                      show: true,        // 默认显示，属性show控制显示与否
                      length :10,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:3
                  },
                  data: [{ value: this.data.voltage?this.data.voltage/10:0 }]
              }
          ]
      };
      var option3 = {
          title: {
              text: "电机转速",
              textStyle: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  color: '#333'
              },
              x: "center",
              y: 'bottom'
          },
          tooltip: {
              formatter: "{a} : {c}r/min"
          },
          series: [
              {
                  name: '电机转速',
                  type: 'gauge',
                  min:0,
                  max:65531,
                  radius: "90%",
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                          width: 5
                      }
                  },
                  detail: {
                      formatter: '{value}r/min',
                      textStyle: {
                          fontSize: 14,
                      },
                      offsetCenter: [0, '70%']
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 10,   // 每份split细分多少段
                      length :8,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      show: true,
                      distance: 2
                  },
                  splitLine: {           // 分隔线
                      show: true,        // 默认显示，属性show控制显示与否
                      length :10,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:3
                  },
                  data: [{ value: this.data.monitorSpeed?this.data.monitorSpeed/10:0}]
              }
          ]
      };
      var option4 = {
          title: {
              text: "电流",
              textStyle: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  color: '#333'
              },
              x: "center",
              y: 'bottom'
          },
          tooltip: {
              formatter: "{a} : {c}km/h"
          },
          series: [
              {
                  name: '电流',
                  type: 'gauge',
                  min:-1000,
                  max:1000,
                  radius: "90%",
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
                          width: 5
                      }
                  },
                  detail: {
                      formatter: '{value}A',
                      textStyle: {
                          fontSize: 14,
                      },
                      offsetCenter: [0, '70%']
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 10,   // 每份split细分多少段
                      length :8,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto'
                      }
                  },
                  axisLabel: {
                      show: true,
                      distance: 2
                  },
                  splitLine: {           // 分隔线
                      show: true,        // 默认显示，属性show控制显示与否
                      length :10,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          color: 'auto'
                      }
                  },
                  pointer: {
                      width:3
                  },
                  data: [{ value: this.data.current?this.data.current/1000:0 }]
              }
          ]
      };
      //speed.setOption(option1, true);
      // voltage.setOption(option2, true);
      // motorspeed.setOption(option3, true);
      // current.setOption(option4, true);
    }
  }
}
</script>
<style lang="less">
.progressbar{
  animation:mymove 2s infinite;
  -webkit-animation:mymove 2s infinite; /* Safari 和 Chrome */
}
.realtimebox{
  position:relative;
  .realtime-left{
    float: left;
    width: 220px;
    height: 220px
  }
  .realtime-center{
    display: block;
    margin: 0 220px;
    height: 220px;
  }
  .realtime-center>div{
    float:left;
    width: 500px;
    height: 220px;
  }
  .realtime-right{
    float:right;
    width: 220px;
    height: 220px;
    margin-top: -220px;
  }
}
.montlist{
  li{
    height: 27px;
    margin-top: 15px;
    line-height: 27px;
    overflow: hidden;
    label{
      float: left;
      width: 80px;
    }
    .montxt{
      display: block;
      margin-left: 80px;
      text-align: left;
      .mon-mileage{
        text-align:left
      }
      .prog{
        width: 75px;
        height: 23px;
        float: left;
        display: block;
        border: 1px solid #333;
        position: relative;
        margin-right: 5px;
        .progress-bar-1{
          position: absolute;
          left: 0px;
          top: 2px;
          height: 17px;
          background: #2196f3;
          width: 100%;
        }
        #RemainingPower{
          position: absolute;
          right: -40px;
          top: -5px;
        }
      }
      .prog:before{
        width: 6px;
        height: 10px;
        right: -6px;
        top: 5px;
        background: #fff;
        position: absolute;
        border: 1px solid #333;
        content: '';
      }
      .temlp{
        width: 80px;
        height: 26px;
        float: left;
        display: block;
        position: relative;
        margin-right: 5px;
        .progress-bar-2 {
          position: absolute;
          left: 0px;
          top: 0px;
          height: 26px;
          background: #ff4500;
          width: 100%;
        }
        .temlp-bg {
          position: absolute;
          width: 80px;
          height: 26px;
          left: 0;
          top: 0;
          background: url(../../../assets/temp-bg.png) no-repeat;
          z-index: 9;
        }
        #Temperature {
          position: absolute;
          right: -35px;
          top: -2px;
        }
      }
    }
  }
}
@keyframes mymove{
  0%{width:0%;}
  100%{width:100%;}
}
</style>
