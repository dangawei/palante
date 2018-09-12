<template>
   <div class="map">
     <div id="J-container"></div>
     <!-- <map-carinfo-component v-if="Fshow" :Fshow="Fshow" @emitFcarinfo="emitFcarinfo"></map-carinfo-component> -->
   </div>
</template>
<script>
import {vm} from '../../../js/infobase/vm.js'
var map;
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
var maptime;
var marker, lineArr = [];
var passedPolyline = {}
export default {
  props: ['caritem'],
  data() {
     return {
       vin:'',
       Fshow:false,
       data:{},
       mapData:[],
       startTime:"",
       endTime:""
     }
   },
   mounted() {
     //do something after mounting vue instance
     this.data = this.caritem
     this.map()
     this.list()
     this.startTime = this.$webapi.gettime("date",new Date().getTime()/1000) + "00:00:00"
     this.endTime = this.$webapi.gettime("date",new Date().getTime()/1000) + "23:59:59"
     vm.$on("ploymapplay",(e)=>{
         if(e==1){
           this.start()
         }
         if(e==2){
           this.stop()
         }
         if(e==3){
           this.pause()
         }
         if(e==4){
           this.resume()
         }
     })
     vm.$on("startTimeType",(e)=>{
         this.startTime = e.startTimeval
         this.endTime = e.endTimeval
         this.list()
     })
   },
   beforeDestroy () {
     vm.$off('startTimeType')
   },
   methods: {
     emitFcarinfo (e) {
       this.Fshow = false
     },
     map () {
       var _this = this;
       map = new AMap.Map('J-container', {
           resizeEnable: true,
           zoom: 5,
           mapStyle: 'amap://styles/normal'
        })
     },
     driving01(){
       var _this = this;
       if(_this.mapData.length>0){
         marker = new AMap.Marker({
              map: map,
              position:[_this.mapData[0].longitude/1000000,_this.mapData[0].latitude/1000000],
              icon: "https://webapi.amap.com/images/car.png",
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true
          });
          lineArr =[]
          for (var i = 1; i < _this.mapData.length; i++) {
              if(i%3==0){
                var item = _this.mapData[i]
                if(item.longitude!=null || item.longitude!=undefined || item.latitude!=null || item.latitude !=undefined){
                    var lngX = item.longitude/1000000
                    var latY = item.latitude/1000000
                    lineArr.push(new AMap.LngLat(lngX, latY));
                }
              }
          }
          // 绘制轨迹
          var polyline = new AMap.Polyline({
              map: map,
              path: lineArr,
              strokeColor: "#00A",  //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 3,      //线宽
              // strokeStyle: "solid"  //线样式
          });
          var passedPolyline = new AMap.Polyline({
              map: map,
              // path: lineArr,
              strokeColor: "#00bd93",  //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 3,      //线宽
              // strokeStyle: "solid"  //线样式
          });
          marker.on('moving',function(e){
              passedPolyline.setPath(e.passedPath);
          })
          map.setFitView();
       }
     },
     start () {
       marker.moveAlong(lineArr,1000);
     },
     pause () {
       marker.pauseMove();
     },
     resume () {
       marker.resumeMove();
     },
     stop () {
       marker.stopMove();
     },
     driving () {
       var _this = this;
           AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
          if (!PathSimplifier.supportCanvas) {
              alert('当前环境不支持 Canvas！');
              return;
          }

          var pathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              //autoSetFitView:false,
              map: map, //所属的地图实例
              getPath: function(pathData, pathIndex) {
                  return pathData.path;
              },
              getHoverTitle: function(pathData, pathIndex, pointIndex) {
                  if (pointIndex >= 0) {
                      //point
                      return pathData.path[pointIndex];
                  }
              },
              renderOptions: {
                  renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
              }
          });

          window.pathSimplifierIns = pathSimplifierIns;

          //设置数据
          pathSimplifierIns.setData([{
              name: '',
              path: _this.mapData

             }]);
          //对第一条线路（即索引 0）创建一个巡航器
          var navg1 = pathSimplifierIns.createPathNavigator(0, {
              loop: true, //循环播放
              speed: 1000000 //巡航速度，单位千米/小时
          });
      });
     },
     list() {
       var _this = this;
       var data = {
          token:this.$webapi.get('token'),
          vin:this.data.vin,
          startTime:this.startTime,
          endTime:this.endTime,
       }
       this.$api.get('/monitor/car/trail', data, reset => {
         if (reset.codeId === 1) {
            map.clearMap()
           // var data =  []
           // reset.resData.forEach(function (a){
           //   var str = [a.longitude/1000000,a.latitude/1000000]
           //   data.push(str)
           // })
           _this.mapData = reset.resData
           setTimeout(function () {
             _this.driving01()
             vm.$emit("outmapdata",reset.resData)
           },300)
         }
         else {
             _this.$netcode.getApiCode(reset)
         }
       })
     }
   }
}
</script>
<style lang="less">
  .map{
    flex: 1;
    display: flex;
    position:relative;
  }
  #J-container{
    flex:1
  }
  .amap-info-contentContainer{
    color: #666
  }
</style>
