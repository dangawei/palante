<template>
 <div class="">
    <div class="postionBox">
        <div class="postion-left">
          <div class="J-speed fl" id="J-speed"></div>
          <div class="J-motor fl" id="J-motor"></div>
          <div class="echarbox fl">
            <span @click="start" v-if="showbtn" class="mt20">
              <Button type="primary">开始播放</Button>
            </span>
            <span @click="end" class="mt20" v-else>
              <Button type="primary">停止播放</Button>
            </span>
            <div class="prog">
                <div class="progress-bar-1" :style="soc"></div>
                <span id="RemainingPower">{{showicon.soc}}</span>
            </div>
          </div>
          <div class="J-voltage fl echarbox" id="J-voltage"></div>
          <div class="J-current fl echarbox" id="J-current"></div>
        </div>
    </div>
 </div>
</template>
<script>
var marker;
var lineArr = [];
var pointList = []
var Interval
var itemindex = -1 //当前位置
import Pages from '../../pub/page.vue'
export default {
  name:"can",
  props: ['vin','outdata'],
  components: {
    paging:Pages
  },
  data() {
    return {
      showbtn:true,
      data:{},
      settime:'',
      vinNo:"",
      longdata:[],
      pageshow:false,
      // 分页
      pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:3,
      },     
      objArr:[],
      showicon:{
        motorspeed:0,
        speed:0,
        soc:0,
        voltage:0,
        current:0,
        monitorSpeed:0,
        monitorTemperature:0
      },
      soc:{}
    }
  },
  mounted() {
    this.vinNo = this.vin
    this.settime = this.outdata.startTime
    this.list()
    this.getlist()
    this.echars()
  },
  watch: {
    Emitsidedata:{
      handler(curVal,oldVal){
　　　   this.data = curVal
　　  },
　　  deep:true
      },
      outdata:{
        handler(curVal,oldVal){
          if(curVal!==""){
            this.settime = curVal.startTime
          }else{
            this.settime = oldVal.startTime
          }
          this.list()
          //this.getlist()
        },
       deep:true
      }
  },
  methods: {
    table (e) {
      this.showicon.motorspeed = e.id76/1000 || 0
      this.showicon.speed = e.id77 || 0
      this.echars()
    },
    end () {
      this.endRun()
      this.showbtn = true
    },
    start () {
      this.startRun()
      this.showbtn = false
    },
    echars () {
      let speed = this.$echarts.init(document.getElementById('J-speed'))
      let motorspeed = this.$echarts.init(document.getElementById('J-motor'))
      let voltage = this.$echarts.init(document.getElementById('J-voltage'))
      let current = this.$echarts.init(document.getElementById('J-current'))
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
                  data: [{ value: this.showicon.speed?this.showicon.speed/10:0 }]
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
                  data: [{ value:this.showicon.voltage?this.showicon.voltage/10:0 }]
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
                  data: [{ value: this.showicon.monitorSpeed?this.showicon.monitorSpeed/10:0}]
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
                  data: [{ value: this.showicon.current?this.showicon.current/1000:0 }]
              }
          ]
      };
      speed.setOption(option1, true);
      voltage.setOption(option3, true);
      motorspeed.setOption(option2, true);
      current.setOption(option4, true);
    },
    pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        //this.getlist()
    },
    getlist () {
      var _this = this
      var data = {
          token:this.$webapi.get("token"),
          pageNum:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          vin:this.vinNo
      }
      if(this.settime !== ""){
        data.startTime = this.settime+" 00:00:00",
        data.endTime = this.settime+" 23:59:59"
      }
      this.$api.get("/monitor/car/trail", data, reset => {
        if (reset.codeId === 1) {
            _this.objArr = reset.resData.data
            _this.pageData.totalCount = reset.resData.totalCount
            _this.pageshow = true
        }
        else {
          _this.$netcode.getApiCode(reset)
       }
     })
    },
    list() {
      var _this = this
      var data = {
          token:this.$webapi.get("token"),
          vin:this.vinNo
      }
      if(this.settime !== ""){
        data.startTime = this.settime+" 00:00:00",
        data.endTime = this.settime+" 23:59:59"
      }
      this.$api.get("/monitor/car/trail", data, reset => {
        if (reset.codeId === 1) {
           if(reset.resData==null){
             this.$Message.error("暂无数据")
             return
           }
            _this.data = reset.resData
            var resetdata = []
            reset.resData.forEach( (a) =>{
                var str = [a.longitude/1000000,a.latitude/1000000]
                    resetdata.push(str)
            })
            _this.longdata = resetdata
            $("#J-container").html("")
           _this.map()
        }
        else {
          _this.$netcode.getApiCode(reset)
       }
     })
   },
   map () {
     //这里可以传入后台的json数据，类似此格式
       pointList=this.longdata;
       lineArr = [];
       var a_mark;    //图标点
      window.map = new AMap.Map("J-container", {
        resizeEnable: true,
        center: pointList[0],
        zoom: 14
      });
      map.plugin(["AMap.ToolBar"],function(){
          //加载工具条
          var tool = new AMap.ToolBar();
          map.addControl(tool);
          });

      //地图图块加载完毕后执行函数
      function completeEventHandler(str){
        marker = new AMap.Marker({
            map:map,
            //draggable:true, //是否可拖动
            position:str,//基点位置
            icon:"../../static/28.png", //marker图标，直接传递地址url
            offset:new AMap.Pixel(-26,-13), //相对于基点的位置
            autoRotation:true
        });
        var lngX ;
        var latY ;
         for(var i = 0;i<pointList.length;i++){
            lineArr.push(pointList[i]);
         }
        //绘制轨迹
        var polyline = new AMap.Polyline({
            map:map,
            path:lineArr,
            strokeColor:"#f30",//线颜色
            strokeOpacity:0.8,//线透明度
            strokeWeight:2,//线宽
        });
        polyline.setMap(map);
      }
      completeEventHandler(pointList[0]);
   },
   endRun () {
     marker.stopMove();    //暂停轨迹回放
     this.clearitem()
   },
   startRun (){
     marker.moveAlong(lineArr,1000);     //开始轨迹回放
     this.timeitem()
   },
   timeitem () {
      Interval = setInterval(this.itemtime,1000)
   },
   clearitem () {
     clearInterval(Interval)
     itemindex = -1
   },
   itemtime () {
    itemindex = parseInt(itemindex) +1
    this.showicon.speed = this.data[itemindex].speed
    this.showicon.voltage = this.data[itemindex].voltage
    this.showicon.current = this.data[itemindex].current
    this.showicon.monitorSpeed = this.data[itemindex].monitorSpeed
    this.showicon.monitorTemperature = this.data[itemindex].monitorTemperature
    this.showicon.soc = this.data[itemindex].soc
    this.soc = {
      width:this.showicon.soc + "%"
    }
    this.echars()
   }
 }
}
</script>
<style lang="less" scoped>
   .postionBox{
     display: flex;
     flex-direction:row;
     height: 230px;
     justify-content: space-between;
     .postion-left{
       .J-speed,.J-motor,.echarbox{
         width: 250px;
         height: 220px;
       }
      }
     .postion-right{
       flex:1
     }
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
</style>
