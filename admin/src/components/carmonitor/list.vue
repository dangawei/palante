<template>
    <Row>
      <Col style="width:320px;float:left;">
         <monitor-component-side :height="sideHeight"  @Emitside="Emitside"></monitor-component-side>
      </Col>
      <Col style="margin-left:320px;display:block;overflow:hidden;">
        <div class="montorBox">
            <total-component v-if="totalShow"></total-component>
            <carlist-component v-else></carlist-component>
        </div>
      </Col>
    </Row>
</template>
<script>
  import carComponent from './onlinecar'
  import indexUserComponent from "./indexUserComponent.vue"
  import historyComponent from './historytrack'
  import monitorComponentSide from "./monitorside.vue"
  import totalComponent from "./totalcomponent.vue"
  import carlistComponent from "./carlist.vue"
  import {vm} from '../../js/infobase/vm.js'
  var markers=[]
  var init;
  var geocoder;
  var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
  export default {
      components: {
        carComponent,
        historyComponent,
        indexUserComponent,
        monitorComponentSide,
        totalComponent,
        carlistComponent
      },
      data () {
          return {
             totalShow:true,
             sideHeight:0,
             Heightnum:0,
             selectshow:false,
             usershow:false,
             muneheight:"",
             widthnum:320,
             widthdata:{},
             widthdataright:{},
             Emitsidedata:{},
             show:false,
             openshow:"收起",
             montorshow01:false,
             montorshow02:false,
             dynamicdata:{},
             montornum:1,
             step:40,
             index:0,
             selectdisabled:false,
             openLock:"",
             openLocknum:"",
             settime:'',
             setdata:[],
             vin:'',
             montorstyle:{}
          }
      },
      watch:{
        Emitsidedata:{
            handler(curVal,oldVal){
              console.log(curVal,oldVal)      　　　
      　　  },
      　　  deep:true
          }
      },
      filters:{
          alltime (time) {
            var time = time/1000 || null
            var type = type || 'time'
            var time = time ? parseInt(time, 10) : null
            var result = ''
            if (time) {
              var tdate = new Date(time * 1000)
              var year = tdate.getFullYear()
              var month = tdate.getMonth() + 1
              var date = tdate.getDate()
              var hour = tdate.getHours()
              var minute = tdate.getMinutes()
              var second = tdate.getSeconds()
              month = month > 9 ? month : '0' + month
              date = date > 9 ? date : '0' + date
              hour = hour > 9 ? hour : '0' + hour
              minute = minute > 9 ? minute : '0' + minute
              second = second > 9 ? second : '0' + second
              result = [year, month, date].join('-')
              if (type == 'time') {
                  result += ' ' + [hour, minute, second].join(':')
              }
            }
            return result
          }
      },
      mounted() {
        //do something after mounting vue instance
        var _this = this
        vm.$on("Emitside", (e) => {
             _this.totalShow = false
            this.vin = e.vin
            _this.itemlist()
            _this.selectmap(e)
            _this.step = 40
            _this.show = true
            _this.openshow="收起"
            _this.montorshow = true

        });        
        this.Emitsidedata = this.mapname
        this.sideHeight = window.innerHeight-64
        this.montorstyle = {
          height:this.sideHeight +"px"
        }
      },
      methods: {
        Emitside (e) {
          vm.$emit("Emitside",e)
        },
        emitcomponent (){
          this.usershow = false
        },
        carclick () {
          this.itemlist()
        },
        openLocklist (e) {
           this.selectdisabled = true
           this.openLocknum = e
           this.post()
        },
        post () {
            var _this = this
            var data = {
                token:this.$webapi.get("token"),
                vin:this.vin,
                lock:this.openLocknum
            }
            this.$api.post("/monitor/car/lock", data, reset => {
              if (reset.codeId === 1) {
                  this.$Message.info("操作成功")
                  _this.selectdisabled = false
              }
              else {
                _this.$netcode.getApiCode(reset)
             }
           })
        },
       tabs(e) {
          map.clearMap()
          this.montornum = e
          this.settime = this.$webapi.gettime("date",(new Date().getTime())/1000)
         if(e==1){
           this.montorshow01 =true
           this.montorshow02 =false
           this.carclick()
         }else{
           this.montorshow01 =false
           this.montorshow02 =true
         }
          $("#J-container").html("")
       },
       map () {
        $("#J-container").html("")
         var _this = this
         window.mapview = function (e) {
           _this.usershow = true
           _this.itemlist()
           _this.step = 40
           _this.show = true
           _this.openshow="收起"
           _this.montorshow = true
         }
          window.map = new AMap.Map('J-container', {
            resizeEnable: true,
            zoom: 4
          })
          AMap.plugin(['AMap.ToolBar', 'AMap.Scale',"AMap.ToolBar","AMap.Geocoder"], function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Geocoder())
          })
       },
       getaddress () {
         var _this = this;
         var lng = this.dynamicdata.longitude
         var lat = this.dynamicdata.latitude
         var lnglatXY = [lng,lat];//地图上所标点的坐标
          AMap.service('AMap.Geocoder',function() {//回调函数
              geocoder = new AMap.Geocoder({
              });
              geocoder.getAddress(lnglatXY, function (status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                      //获得了有效的地址信息:
                      //即，result.regeocode.formattedAddress
                      _this.dynamicdata.address = result.regeocode.formattedAddress
                  } else {
                      //获取地址失败
                  }
              });
          })
       },
       // 显示所有的车辆在地图上
       showcarlist(item) {
        var _this = this
        map.clearMap()
        if(_this.setdata.length<1){
          return
        }
        var newvin = item || ""
        for (var i = 0, marker; i < this.setdata.length; i++) {
           var mapdata = _this.setdata[i]
           var lng = mapdata.longitude/1000000
           var lat = mapdata.latitude/1000000
           var str = [parseFloat(lng),parseFloat(lat)]
           var content= '<div class ="caricon"><span>'+mapdata.licencePlateNumber+'</span></div>';
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
           map.setLimitBounds('59.302407,3.938487;154.400064,64.504839');
         if(this.lver==1){
            map.setCity(mapdata01.cityName);
         }
       },
       markerClick (e) {
          this.vin = e.target.vin
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
       },
       //左侧菜单选择的车辆
       selectmap (e){
          this.usershow = true
          this.showcarlist(e.vin)
          map.setZoom(10);
          var lng = e.longitude/1000000
          var lat = e.latitude/1000000
          var str = [parseFloat(lng),parseFloat(lat)]
          map.setCenter(str)
       },
       open (){
         if(this.openshow=="展开"){
           this.openshow="收起"
           this.montorshow = true
         }else{
           this.openshow="展开"
           this.montorshow = false
         }
       },
       timelist () {
         var _this = this
         //init = window.setInterval(_this.tiemcode,1000)
       },
       tiemcode () {
         var str = this.step
          if(this.step==0){
              window.clearInterval(init)
              this.step = 40
              this.itemlist()
          }else {
            this.step = str -1
          }
       },
       itemlist () {
         let _this = this
         var data = {
             token:this.$webapi.get("token"),
             vin:this.vin
         }
         this.$api.get("/monitor/detail", data, reset => {
           if (reset.codeId === 1) {
                _this.Emitsidedata =  reset.resData
                if(_this.montornum==1){
                  _this.montorshow01 = true
                  _this.montorshow02 = false
                }else{
                  _this.montorshow01 = false
                  _this.montorshow02 = true
               }
               _this.getaddress()
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
  .amap-marker-label{
    border: none!important;
    background: none!important
  }
  .caricon{
    position:relative;
    i{
      background:url("http://ev.cgqc.cn:86/Content/Scripts/themes/icons/11/36.png");
      width: 32px;
      height: 32px;
      display: inline-block;
    }
    span{
      position: absolute;
      border: #f30 1px solid;
      color: #fff;
      display: inline-block;
      background: #f30;
      width: 60px;
      font-size: 12px;
    }
  }
  .positionselect{
    position: absolute;
    top:40px;
    right: 0
  }
  .montorbottm{
    bottom:0
  }
  #J-container{

  }
  .sideSystem{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 350px;
    z-index: 999;
    .montor-hd{
      width: 100%;
      overflow: hidden;
      display: flex;
      flex: 1;
      justify-content: space-between;
      height: 35px;
    }
    .montor-bd{
      height: 315px;
      background: #fff;
      box-shadow: rgba(0, 21, 41, 0.35) 2px 0px 6px;
      .tabmontorBox{
        height: 280px
      }
      .tabBottom{
        height: 35px;
        line-height: 35px;
        background: #f8f8f8;
        display: block;
        width: 100%;
        overflow: hidden;
        div{
          float: left;
          padding: 0 10px;
          color: #666
        }
      }
    }
  }
  .montor-tab{
    float: left;
    ul{
      li{
        float: left;
        width: 150px;
        height: 35px;
        line-height: 35px;
        border: #324357 1px solid;
        background: #324357;
        color: #fff;
        margin-right: 15px;
        cursor:pointer;
      }
      .ative{
        border: #ddd 1px solid;
        background: #fff;
        color: #999;
        border-bottom: none
      }
    }
  }
  .montor-dic{
    position: absolute;
    right: 0;
    height: 35px;
    line-height: 35px;
    background: #999;
    color: #fff;
    cursor: pointer;
    padding: 0 5px
  }
</style>
