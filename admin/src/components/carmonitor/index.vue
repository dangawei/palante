<template>
  <div class="monitor">
    <Row>
        <Col :xs="24" :sm="24" :md="6" :lg="6">
          <div class="container-side">
              <side-component></side-component>
          </div>
        </Col>
        <Col :xs="24" :sm="24" :md="18" :lg="18">
          <div class="container-main">
            <div class="J-container" id='J-container' :style="container"></div>
            <index-user-component :vin="vin" v-if="usershow" @emitcomponent="emitcomponent"></index-user-component>
          </div>
        </Col>
     </Row>
  </div>
</template>
<script>
  import indexUserComponent from "./indexUserComponent.vue"
  import sideComponent from "./sideComponent.vue"
  var map
  var infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)})
  export default {
    components: {
      indexUserComponent,
      sideComponent
    },
    data () {
      return {
        vin:"",
        usershow:false,
        cardata:{},
        container:{}
      }
    },
    mounted() {
      //do something after mounting vue instance
       this.map()
       this.list()
       this.container ={
         height:window.innerHeight-74+"px"
       }
       window.onresize = function (){
         this.container ={
           height:window.innerHeight-74+"px"
         }
      }
    },
    methods: {
      emitcomponent () {
        this.usershow = false
      },
      list() {
        var _this = this;
        var data = {
          token:this.$webapi.get("token")
        }
        this.$api.get("/monitor/base/list",data, reset => {
          if (reset.codeId === 1) {
            _this.cardata = reset.resData.list
            _this.marker()
          }else if(reset.codeId === -99){
            this.$router.push({path:"/login"})
          }
       })
     },
     marker () {
       var _this = this
       map.clearMap()
       window.view = function (e) {
         _this.usershow = true
       }
       for (var i = 0, marker; i < _this.cardata.length; i++) {
          var mapdata = _this.cardata[i]
          var lng = mapdata.longitude/1000000
          var lat = mapdata.latitude/1000000
          var str = [parseFloat(lng),parseFloat(lat)]
          var content= "<div class ='caricon'><span>浙E91K67</span></div>";
           var marker = new AMap.Marker({
                   map: map,
                   position:str,
                   title:mapdata.vin,
                   icon: new AMap.Icon({
                       size: new AMap.Size(32, 32),  //图标大小
                       image: '../../static/36.png',
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
         }
          map.setFitView();
          map.setZoom(4)
    },
    map () {
      var _this = this
       map = new AMap.Map('J-container', {
         resizeEnable: true,
         zoom: 4
       })
     },
     markerClick (e) {
        this.vin = e.target.vin
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
     }
   }
}
</script>
<style lang="less" scoped>
  .monitor{
    width: 100%;
    height: 100%;
  }
  .container-main{
    height: 100vh;
    display: block;
    .J-container{
        width: 100%;
        height: 100%
     }
  }
  // .containerbox{
  //   width: 100%;
  //   height: 100%;
  //   flex: 1;
  //   display: flex;
  //   flex-direction: row;
  //   .container-main{
  //     flex:1;
  //     position:relative;
  //   }
  //   .container-side{
  //     width: 300px;
  //     -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
  //     box-shadow: 0 1px 4px rgba(0,21,41,.08);
  //     overflow: auto;
  //     z-index: 9999;
  //     position:relative;
  //   }
  //   .J-container{
  //     display: flex;
  //     flex: 1;
  //     height: 100%
  //   }
  // }
</style>
