<template>
  <div class="carinfo-item">
    <div class="M-item-box carDashboard mt10">
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
       <div class="M-item-bd">
          <div id="J-total"></div>
       </div>
    </div>
    <div class="M-item-box carDashboardinfo mt10">
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
       <div class="M-item-bd">
         <div class="J_cardata" id="J-cardata">
            <div class="J_cardata-hd">
                <!-- <div class="cardata-hd-dic">
                  总行驶里程(km): <span>{{onlinedata.distance/10}}</span>
                </div> -->
                <div class="cardata-hd-status">
                  <span class="car-open"   @click="caropen(1)" :class="{caropenative:carplaytype==1}">开始播放</span>
                  <span class="car-close"  @click="caropen(3)" :class="{carcloseative:carplaytype==3}">暂停</span>
                  <span class="car-open"   @click="caropen(4)" :class="{caropenative:carplaytype==4}">继续播放</span>
                  <span class="car-close"  @click="caropen(2)" :class="{carcloseative:carplaytype==2}">停止</span>
                </div>
            </div>
            <div class="J_cardata-bd">
                <div class="cardata-bd-item mt20">
                    <div class="cardata-bd-item-label">行驶里程(km)</div>
                    <div class="cardata-bd-item-info">
                      <div class="ZD-plan mt10 ZD-plan-blue">
                          <div class="ZD-plan-show" :style="distance"></div>
                      </div>
                      <div class="cardata-bd-itemNum">
                        {{onlinedata.alldistance?onlinedata.alldistance/10:0}}
                      </div>
                    </div>
                </div>
                <div class="cardata-bd-item mt20">
                    <div class="cardata-bd-item-label">剩余电量(%)</div>
                    <div class="cardata-bd-item-info">
                      <div class="ZD-plan mt10 ZD-plan-gree" >
                          <div class="ZD-plan-show" :style="soc"></div>
                      </div>
                      <div class="cardata-bd-itemNum">
                          {{onlinedata.soc?onlinedata.soc:0}}
                      </div>
                    </div>
                </div>
                <div class="cardata-bd-item mt20">
                    <div class="cardata-bd-item-label">电池温度()</div>
                    <div class="cardata-bd-item-info">
                      <div class="ZD-plan mt10 ZD-plan-red" >
                          <div class="ZD-plan-show" :style="monitorControlTemperature"></div>
                      </div>
                      <div class="cardata-bd-itemNum">
                          {{onlinedata.peak09?onlinedata.peak09-40:0}}
                      </div>
                    </div>
                </div>
            </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import {vm} from '../../../js/infobase/vm.js'
  export default {
    props: ['caritem'],
    data() {
       return {
          carplaytype:0,
          onlinedata:{},
          monitorControlTemperature:{},
          soc:{},
          distance:{}
       }
     },
     mounted() {
       //do something after mounting vue instance
       this.onlinedata = this.caritem
       this.list()
       this.chart()
       this.distance = {
         width:"0%"
       }
       this.monitorControlTemperature = {
         width:"0%"
       }
       this.soc = {
         width:"0%"
       }
     },
     watch:{
       caritem:{
         handler (val,oldval) {
            this.onlinedata = val
            var width = 0
            var soc = 0
            var distance = 0
            if(val.alldistance!=null || val.alldistance!=undefined){
              width = ""+parseInt(((val.distance)/(val.alldistance)))+ "%"
            }else{
              width =  "0%"
            }
            if(val.peak09!=null || val.peak09>40){
              width = ""+(this.onlinedata.peak09 -40 )+ "%"
            }else{
              width =  "0%"
            }
            if(val.soc!=null || val.soc!=undefined){
                soc = ("" + this.onlinedata.soc )+ "%"
            }else{
              soc =  "0%"
            }
            this.monitorControlTemperature = {
              width:width
            }
            this.soc = {
              width:soc
            }
            this.chart()
         },
         deep:true
       }
     },
     methods: {
       chart () {
         var option = {
              series : [
                  {
                      name:'速度',
                      type:'gauge',
                      min:0,
                      max:220,
                      splitNumber:11,
                      radius: '90%',
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                              width: 3,
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisLabel: {            // 坐标轴小标记
                          textStyle: {       // 属性lineStyle控制线条样式
                              fontWeight: 'bolder',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length :15,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      splitLine: {           // 分隔线
                          length :25,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              width:3,
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      pointer: {           // 分隔线
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5
                      },
                      title : {
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              fontSize: 20,
                              fontStyle: 'italic',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      detail : {
                          backgroundColor: 'rgba(30,144,255,0.8)',
                          borderWidth: 1,
                          borderColor: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5,
                          offsetCenter: [0, '50%'],       // x, y，单位px
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              color: '#fff'
                          }
                      },
                      data:[{value: 40, name: 'km/h'}]
                  },
                  {
                      name:'电压',
                      type:'gauge',
                      center : ['25%', '55%'],    // 默认全局居中
                      radius : '70%',
                      min:0,
                      max:800,
                      endAngle:45,
                      splitNumber:8,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                              width: 2,
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisLabel: {            // 坐标轴小标记
                          textStyle: {       // 属性lineStyle控制线条样式
                              fontWeight: 'bolder',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length :12,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      splitLine: {           // 分隔线
                          length :20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              width:3,
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      pointer: {
                          width:5,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5
                      },
                      title : {
                          offsetCenter: [0, '-30%'],       // x, y，单位px
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              fontStyle: 'italic',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      detail : {
                          //backgroundColor: 'rgba(30,144,255,0.8)',
                         // borderWidth: 1,
                          borderColor: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5,
                          width: 80,
                          height:30,
                          offsetCenter: [25, '20%'],       // x, y，单位px
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              color: '#fff'
                          }
                      },
                      data:[{value: 1.5, name: 'V'}]
                  },
                  {
                      name:'电流',
                      type:'gauge',
                      center : ['75%', '50%'],    // 默认全局居中
                      radius : '70%',
                      min:-1000,
                      max:1000,
                      endAngle:-45,
                      splitNumber:8,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                              width: 2,
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisLabel: {            // 坐标轴小标记
                          textStyle: {       // 属性lineStyle控制线条样式
                              fontWeight: 'bolder',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length :12,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      splitLine: {           // 分隔线
                          length :20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              width:3,
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      pointer: {
                          width:5,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5
                      },
                      title : {
                          offsetCenter: [0, '-30%'],       // x, y，单位px
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              fontStyle: 'italic',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      detail : {
                          //backgroundColor: 'rgba(30,144,255,0.8)',
                         // borderWidth: 1,
                          borderColor: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5,
                          width: 80,
                          height:30,
                          offsetCenter: [25, '20%'],       // x, y，单位px
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: 'bolder',
                              color: '#fff'
                          }
                      },
                      data:[{value: 0.5, name: 'A'}]
                  },
                  {
                      name:'电机温度',
                      type:'gauge',
                      center : ['0', '0'],    // 默认全局居中
                      radius : '0%',
                      min:0,
                      max:2,
                      startAngle:315,
                      endAngle:225,
                      splitNumber:2,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                              width: 2,
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          show: false
                      },
                      axisLabel: {
                          textStyle: {       // 属性lineStyle控制线条样式
                              fontWeight: 'bolder',
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          },
                          formatter:function(v){
                              switch (v + '') {
                                  case '0' : return 'H';
                                  case '1' : return 'Temperature';
                                  case '2' : return 'C';
                              }
                          }
                      },
                      splitLine: {           // 分隔线
                          length :15,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              width:3,
                              color: '#fff',
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 10
                          }
                      },
                      pointer: {
                          width:2,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 5
                      },
                      title : {
                          show: false
                      },
                      detail : {
                          show: false
                      },
                      data:[{value: 0.5, name: 'Temperature'}]
                  }
              ]
          };
            let Jtotal = this.$echarts.init(document.getElementById('J-total'))
            var current = this.onlinedata.current || 10000
            var speed = this.onlinedata.speed || 0
            var monitorControlTemperature = this.onlinedata.monitorControlTemperature || 0
            var voltage = this.onlinedata.voltage || 0
            option.series[0].data[0].value = speed/10;
            option.series[1].data[0].value = voltage/10;
            option.series[2].data[0].value = ((current/10)-1000).toFixed(1);
            option.series[3].data[0].value = monitorControlTemperature/100;
            Jtotal.setOption(option, true);
       },
       caropen (e) {
          this.carplaytype = e
          vm.$emit("outmapplay",e)
          vm.$emit("ploymapplay",e)
       },
       caropenpost (e) {
         var _this = this
         var data = {
           token:this.$webapi.get("token"),
           vin:this.onlinedata.vin,
           lock:parseInt(e)
         }
         this.$api.post('/monitor/detail', data, reset => {
           if (reset.codeId === 1) {
              this.$Message.info("成功")
           }
           else {
               _this.$netcode.getApiCode(reset)
           }
         })
       },
       list() {

       }
     }
  }
</script>
<style lang="less">
  .carinfo-item{
    display: flex;
    flex:1;
    flex-direction: row;
    .carDashboard{
      flex:1
    }
    .carDashboardinfo{
      flex:1;
      margin-left: 20px
    }
  }
  #J-total{
    flex:1;
  }
  .J_cardata{
    flex:1;
    display: flex;
    flex-direction: column;
    .J_cardata-hd{
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
      display: flex;
      margin: 15px 30px;
      .cardata-hd-dic{
        color: #5388FF;
        font-size: 16px;
        text-align: left;
        span{
          font-weight: bold;
          font-size: 20px;
        }
      }
      .cardata-hd-status{
        text-align:right;
        span{
          float:left;
          min-width: 100px;
          height: 40px;
          text-align:center;
          line-height: 40px;
          border-radius: 20px;
          cursor: pointer;
        }
        .car-open{
          border: #0bc502 1px solid;
          color: #0bc502
        }
        .car-open:hover,.caropenative{
          border: #0bc502 1px solid;
          background: #0bc502;
          color: #fff
        }
        .car-close{
          border: #f30 1px solid;
          color: #f30
        }
        .car-close:hover,.carcloseative{
          border: #f30 1px solid;
          background: #f30;
          color: #fff
        }
      }

    }
    .J_cardata-bd{
      flex:1;
      display: flex;
      flex-direction: column;
      margin: 0 30px;
      .cardata-bd-item{
        display: flex;
        flex-direction: row;
        .cardata-bd-item-label{
          font-size: 16px;
          color: #fff;
          width: 120px;
        }
        .cardata-bd-item-info{
          flex: 1;
          margin: 0 20px;
          display: flex;
          flex-direction: row;
          .cardata-bd-itemNum{
            width: 100px;
            margin: 0 15px;
          }
        }
      }
    }
  }
</style>
