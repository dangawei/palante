<template>
   <div class="map">
     <div id="J-container"></div>
     <map-carinfo-component v-if="Fshow" :Fshow="Fshow" @emitFcarinfo="emitFcarinfo"></map-carinfo-component>
     <div class='button-group' style="background-color: #0d9bf2">
      <span @click="refresh('normal')">标准</span>
      <span @click="refresh('dark')">幻影黑</span>
      <span @click="refresh('light')">月光银</span>
      <span @click="refresh('fresh')">草色青</span>
      <span @click="refresh('grey')">雅士灰</span>
      <span @click="refresh('graffiti')">涂鸦</span>
      <span @click="refresh('whitesmoke')">远山黛</span>
      <span @click="refresh('macaron')">马卡龙</span>
      <span @click="refresh('blue')">靛青蓝</span>
      <span @click="refresh('darkblue')">极夜蓝</span>
      <span @click="refresh('wine')">酱籽</span>
    </div>
   </div>
</template>
<script>
import {vm} from '../../../js/infobase/vm.js'
import mapCarinfoComponent from "./mapcarinfo.vue"
var map;
var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
export default {
  props: {
    carlistdata:{
      default:{}
    },
    sideItem:{
      default:{
        vin:""
      }
    }
  },
  components: {
    mapCarinfoComponent
  },
  data() {
     return {
       vin:'',
       Fshow:false,
       mapData:{},
       newvin:""
     }
   },
   mounted() {
     //do something after mounting vue instance
     this.mapData = this.carlistdata
     this.map()
   },
   watch:{
     carlistdata:{
       handler(val,oldval){
         this.mapData = val
         this.position(this.newvin)
       },
       deep:true
     },
     sideItem:{
       handler(val,oldval){
         this.newvin = val.vin
         this.position(this.newvin)
       },
       deep:true
     }
   },
   methods: {
     refresh (e){
        map.setMapStyle('amap://styles/'+e);
     },
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
       this.position(this.newvin)
       window.mapview = function (e) {
          _this.list()
       }
     },
     position (item) {
       map.clearMap()
       var _this = this;
       var data = _this.online
       var newvin = item || ""
       for (var i = 0, marker; i <this.mapData.list.length ; i++) {
          var mapdata = this.mapData.list[i]
          var lng = mapdata.longitude/1000000
          var lat = mapdata.latitude/1000000
          var str = [parseFloat(lng),parseFloat(lat)]
          var content= '';
          if(mapdata.licencePlateNumber){
            content= '<div class ="carPlateNumber"><span>'+mapdata.licencePlateNumber+'</span></div>';
          }
           var marker = new AMap.Marker({
                   map: map,
                   position:str,
                   title:mapdata.vin,
                   icon: new AMap.Icon({
                       size: new AMap.Size(32, 32),  //图标大小
                       image: '../../../static/caricon.png',
                       imageOffset: new AMap.Pixel(0, 0),
                   }),
                   label: {
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    content: content
                 }
              })
             marker.vin = mapdata.vin
             var faultLevel = mapdata.hasWaring + "级，无效" || "正常"
             var modelName = mapdata.modelName || ""
             var licencePlateNumber = mapdata.licencePlateNumber || ""
             var Time = _this.$webapi.gettime("time",mapdata.createdAt/1000)
             var str = '<div>vin:<span>'+mapdata.vin+'</span>  <span>车牌:'+licencePlateNumber+'</span> <span>车辆型号:'+modelName+'</span></div>'
                 str += '<div><span>报警：'+faultLevel+'</span></div>  '
                 str += '<div><span>定位：GPS</span> <span>速度：'+mapdata.speed/10+'km/h</span></div>'
                 str += '<div><span>最近时间：'+Time+'</span></div>'
                 str +='<a href="javascript:void(0)" onclick="mapview()">详细信息</a>'
             marker.content = str;
             marker.on('click', _this.markerClick);
             if(mapdata.vin == newvin){
               marker.emit('click', {target: marker})
             }
             // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
         }
          map.setFitView();
          map.setLimitBounds( map.getLimitBounds())
          map.setZoomAndCenter(5, [110.005467, 35.507761]);
      },
      markerClick (e) {
       this.vin = e.target.vin
       infoWindow.setContent(e.target.content);
       infoWindow.open(map, e.target.getPosition());
     },
     list() {
       var _this = this;
       var data = {
          token: this.$webapi.get('token'),
          vin:this.vin
       }
       this.$api.get('/monitor/detail', data, reset => {
         if (reset.codeId === 1) {
             _this.Fshow = true
             vm.$emit("Fmapcarinfo",reset.resData)
             vm.$emit("Fmapcarinfolist",reset.resData)
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
  .button-group{
    position: absolute;
    bottom:0;
    right: 0;
    overflow: hidden;
    padding: 10px;
    background:none!important;
    span{
      padding: 8px 10px;
      border-radius: 2px;
      float: left;
      background: #fff;
      color: #333;
      cursor: pointer;
      margin-right: 5px;
    }
  }
</style>
