<template>
  <div class="M-layout-center">
      <div class="M-layout-C-L">
         <div class="M-item-box caronline">
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
            <div class="M-item-hd">
                <div class="">车辆状态  </div>
                <div class="more"></div>
            </div>
            <div class="M-item-bd">
              <div class="caronline-hd">
                <ul>
                 <li>车牌号</li>
                 <li>VIN码</li>
                 <li>状态</li>
                </ul>
              </div>
              <div class="caronline-bd">
                <ul>
                  <li v-for="item in online">
                    <div>{{item.licencePlateNumber}}</div>
                    <div>{{item.vin}}</div>
                    <div>
                      <span v-if="item.onLine==1" class="online">在线</span>
                      <span v-if="item.onLine==2">离线</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
         </div>
         <div class="M-item-box carele mt10">
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
            <div class="M-item-hd">
                <div class="">充电状态(辆)</div>
            </div>
            <div class="M-item-bd">
                <div class="car_chong" v-show="cartotalshow">
                  <ul>
                    <li><label><span>停车充电</span><span class="mfcolor">{{statedata.chargeStatusList[0].num}}</span></label><div class="dian_jidua"><div class="car_inline" :style="stopnum"></div></div></li>
                    <li><label><span>行驶充电</span><span class="mfcolor">{{statedata.chargeStatusList[1].num}}</span></label><div class="dian_jidua"><div class="car_inline" :style="moveScale"></div></div></li>
                    <li><label><span>未充电</span><span class="mfcolor">{{statedata.chargeStatusList[2].num}}</span></label><div class="dian_jidua"><div class="car_noseecss" :style="nomove"></div></div></li>
                    <li><label><span>充电完成</span><span class="mfcolor">{{statedata.chargeStatusList[3].num}}</span></label><div class="dian_jidua"><div class="car_seecss" :style="seeceenum"></div></div></li>
                  </ul>
                </div>
            </div>
         </div>
      </div>
      <div class="M-layout-C-C">
        <div class="M-item-box M-C-Map">
           <div class="M-item-style">
               <div class="M-map-top-top"></div>
               <div class="M-map-top-left"></div>
               <div class="M-map-top-right"></div>
               <div class="M-map-left-left"></div>
               <div class="M-item-left-bottom w3 h200 M-item-icon01"></div>
               <div class="M-item-left-bottom w100 h3 M-item-icon01"></div>
               <div class="M-item-bottom-right w3 h150 M-item-icon01"></div>
               <div class="M-item-bottom-right w15 h3 M-item-icon01"></div>
           </div>
           <div class="M-item-bd">
              <div id="J-container" class="map" ></div>
           </div>
        </div>
        <div class="M-C-B mt10">
          <div class="M-item-box carODO">
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
             <div class="M-item-hd">
                 <div class="">节排二氧化碳
                   <Tooltip placement="top">
                       <Icon type="ios-information-outline"></Icon>
                       <div slot="content">
                           <p>8L/100公里</p>
                           <p><i>1L=2361g</i></p>
                       </div>
                   </Tooltip>
                 </div>
             </div>
             <div class="M-item-bd">
                 <div class="CO2-box">
                   <div class="CO2">
                     <div class="">
                       <p>总车辆</p>
                       <p>{{totalDistance.totalNum}}</p>
                     </div>
                     <div class="">
                       <p>总行驶里程</p>
                       <p>{{totalDistance.totalDistance01}}</p>
                     </div>
                     <div class="">
                       <p>二氧化碳(g)</p>
                       <p>{{(totalDistance.totalDistance01*0.08*2.361).toFixed(2)}}</p>
                     </div>
                   </div>
                   <div class="CO2-photo" id="J-co2photo">

                   </div>
                 </div>
             </div>
          </div>
          <div class="M-item-box carTatal">
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
             <div class="M-item-hd">
                 <div class="">车辆报警</div>
             </div>
             <div class="M-item-bd">
                <div class="car-police">
                  <div class="car-P-item">
                     <div class="car-P-item-title mcolor mt10">
                        一级报警
                     </div>
                     <div class="car-P-item-photo mt15">
                       <i-Circle :percent="carFaultState.f1Scale" :size="circleSize" stroke-color="#2ba7b8" trail-color="#77559f" :trail-width="width" :stroke-width="width">
                           <span class="demo-Circle-inner">
                           </span>
                       </i-Circle>
                     </div>
                     <div class="car-P-item-parms f20">
                       {{carFaultState.f1}}
                     </div>
                  </div>
                  <div class="car-P-item">
                    <div class="car-P-item-title mcolor mt10">
                      二级报警
                    </div>
                    <div class="car-P-item-photo mt15">
                      <i-Circle :percent="carFaultState.f2Scale" :size="circleSize"  stroke-color="#ca8622" trail-color="#77559f" :trail-width="width" :stroke-width="width">
                          <span class="demo-Circle-inner">
                          </span>
                      </i-Circle>
                    </div>
                    <div class="car-P-item-parms f20">
                       {{carFaultState.f2}}
                    </div>
                  </div>
                  <div class="car-P-item">
                    <div class="car-P-item-title mcolor mt10">
                       三级报警
                    </div>
                    <div class="car-P-item-photo mt15">
                      <i-Circle :percent="carFaultState.f3Scale" :size="circleSize" stroke-color="#c23531" trail-color="#77559f" :trail-width="width" :stroke-width="width">
                          <span class="demo-Circle-inner">
                          </span>
                      </i-Circle>
                    </div>
                    <div class="car-P-item-parms f20">
                      {{carFaultState.f3}}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div class="M-layout-C-R">
        <div class="M-item-box carODO">
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
           <div class="M-item-hd">
               <div class="mcolor">总行驶里程</div>
           </div>
           <div class="M-item-bd">
               <div class="carODO_dic mfcolor">
                  {{totalDistance.totalDistance}}
               </div>
               <div class="carODO_num">
                  <span>车辆总数 <span class="f24 ml10 mfcolor">{{totalDistance.totalNum}}</span></span> <span> 平均行驶（km） <span class="f24 ml10 mfcolor">9999</span></span>
               </div>
           </div>
        </div>
        <div class="M-item-box carTotal mt10">
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
           <div class="M-item-hd">
               <div class="">车辆统计</div>
               <div class="more"></div>
           </div>
           <div class="M-item-bd">
             <div class="carTotal-hd">
               <ul>
                <li>车辆属性</li>
                <li>数量</li>
               </ul>
             </div>
             <div class="carTotal-bd">
               <ul>
                 <li>
                   <div>总车辆</div>
                   <div>{{statedata.totalNum}}</div>
                 </li>
                 <li>
                   <div>在线车辆</div>
                   <div>{{statedata.onLineNum}}</div>
                 </li>
                 <li>
                   <div>行驶车辆</div>
                   <div>{{statedata.moveNum}}</div>
                 </li>
                 <li>
                   <div>离线车辆</div>
                   <div>{{statedata.outLineNum}}</div>
                 </li>
                 <li>
                   <div>停车车辆</div>
                   <div>{{statedata.stopNum}}</div>
                 </li>
               </ul>
             </div>
             <div class="car_line"></div>
             <div class="carTotal-fd mt20" id="J_peitotal"></div>
           </div>
        </div>
      </div>
  </div>
</template>
<script>
var map;
export default {
   components: {
   },
   data() {
      return {
        online:[],
        percent:10,
        width:7,
        circleSize:100,
        statedata:{},
        cartotalshow:false,
        totalDistance:{
          totalDistance01:0,
          totalDistance:0,
          totalNum:""
        },
        distance7data:[],
        carFaultState:{
          fNum: 29,
          f1: 0,
          f2: 0,
          f3: 0,
          f1Scale:0,
          f2Scale:0,
          f3Scale:0
        },
        stopnum:{},
        moveScale:{},
        nomove:{},
        seeceenum:{}
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.list()
      this.Circle()
      this.map()
      this.co2photo()
      this.state()
      this.distance()
    },
    methods: {
      //最近7最近7天公里数
      distance(){
        let _this = this
        let data = {
            token: this.$webapi.get('token')
        }
        this.$api.get('/monitor/distance', data, reset => {
          if (reset.codeId === 1) {
              _this.distance7data = reset.resData
          }
       })
      },
      Circle () {
         //setInterval(this.time,300)
      },
      state () {
        let _this = this
        let data = {
            token: this.$webapi.get('token')
        }
        this.$api.get('/monitor/car/state', data, reset => {
          if (reset.codeId === 1) {
              var data = reset.resData
              _this.statedata = data
              _this.stopnum = {
                width:((data.chargeStatusList[0].num/data.totalNum)*100).toFixed(2)+"%"
              }
              _this.moveScale = {
                width:((data.chargeStatusList[1].num/data.totalNum)*100).toFixed(2)+"%"
              }
              _this.nomove = {
                width:((data.chargeStatusList[2].num/data.totalNum)*100).toFixed(2)+"%"
              }
              _this.seeceenum = {
                width:((data.chargeStatusList[3].num/data.totalNum)*100).toFixed(2)+"%"
              }
             _this.cartotalshow = true
             _this.pietotal()
          }
       })
      },
      pietotal () {
          var option = {
              calculable : true,
              toolbox:{
                showTitle:false
              },
              tooltip:{
                  show:true,
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                top:"3%",
                containLabel: false
              },
              series : [
                  {
                      name:'',
                      type:'pie',
                      radius : [60, 150],
                      center : ['55%', '50%'],
                      roseType : 'area',
                      data:[
                          {value:this.statedata.onLineNum, name:'在线车辆'},
                          {value:this.statedata.moveNum, name:'行驶车辆'},
                          {value:this.statedata.outLineNum, name:'离线车辆'},
                          {value:this.statedata.stopNum, name:'停车车辆'}
                      ]
                  }
              ]
          };
          let Jpeitotal = this.$echarts.init(document.getElementById('J_peitotal'))
              Jpeitotal.setOption(option, true);
      },
      co2photo () {
        var option = {
            toolbox:{
              showTitle:false
            },
            tooltip:{
                show:true
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',
              top:"3%",
              containLabel: false
            },
            xAxis: {
                show : false,
                type: 'category',
                splitLine:{show: false},//去除网格线
                boundaryGap: false,
                data: ['1', '2', '3','4' ]
            },
            yAxis: {
                show : false,
                type: 'value',
                splitLine:{show: false},//去除网格线
                axisTick: {
                     show: false
                }
            },
            series: [{
                data: [820,5000, 13200,8000,9000,,30000],
                type: 'line',
                smooth:true,
                areaStyle: {},
                itemStyle:{
                  color:{
                    type: 'linear',
                     x: 0,
                     y: 0,
                     x2: 1,
                     y2: 0,
                     colorStops: [{
                         offset: 0, color: '#0dac86' // 0% 处的颜色
                     }, {
                         offset: 1, color: '#1fabc0' // 100% 处的颜色
                     }],
                     globalCoord: false // 缺省为 false
                  },
                  borderWidth:5,
                  borderColor:"#ffffff"
                },
                lineStyle:{
                  color:{
                    type: 'linear',
                     x: 0,
                     y: 0,
                     x2: 0,
                     y2: 1,
                     colorStops: [{
                         offset: 0, color: '#25cdd9' // 0% 处的颜色
                     }, {
                         offset: 1, color: '#0ed198' // 100% 处的颜色
                     }],
                     globalCoord: false // 缺省为 false
                  },
                  borderWidth:5,
                  borderColor:"#ffffff"
                }
            }]
        };
        let Jco2photo = this.$echarts.init(document.getElementById('J-co2photo'))
            Jco2photo.setOption(option, true);
      },
      time () {
        if(this.percent>100){
           this.percent = 0
        }else{
            var str =  this.percent + Math.ceil(Math.random()*10)
            this.percent = parseInt(str)
        }
      },
      map () {
        map = new AMap.Map('J-container', {
            resizeEnable: true,
            zoom: 4,
            mapStyle: 'amap://styles/darkblue'
          })
      },
      position (item) {
        var _this = this;
        var data = _this.online
        var newvin = item || ""
        for (var i = 0, marker; i <data.length ; i++) {
           var mapdata = data[i]
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
                        image: '../../../static/caricon.png',
                        imageOffset: new AMap.Pixel(0, 0),
                    }),
                  //   label: {
                  //    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                  //    content: content
                  // }
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
           map.setZoom(4)
           setTimeout(function () {
              map.setCenter(["112.502285,36.47957"])
           },300)
           map.setLimitBounds( map.getLimitBounds())
          map.setZoomAndCenter(4, ["116.205467, 39.907761"]);
      },
      list() {
        let _this = this
        let data = {
            token: this.$webapi.get('token')
        }
        this.$api.get('/monitor/base/list', data, reset => {
          if (reset.codeId === 1) {
               var data = reset.resData
              _this.online = data.list
              var str = parseInt(data.f1)+parseInt(data.f2)+parseInt(data.f3)
              _this.carFaultState.fNum = str
              _this.carFaultState.f1 = parseInt(data.f1)
              _this.carFaultState.f2 = parseInt(data.f2)
              _this.carFaultState.f3 = parseInt(data.f3)
              _this.carFaultState.f1Scale = parseInt((data.f1/str)*100)
              _this.carFaultState.f2Scale = parseInt((data.f2/str)*100)
              _this.carFaultState.f3Scale = parseInt((data.f3/str)*100)
              var num = _this.$webapi.getdisnum12(data.totalDistance)
              _this.totalDistance.totalDistance01 = data.totalDistance
              _this.totalDistance.totalDistance = num
              _this.totalDistance.totalNum = data.totalNum
              setTimeout(function () {
                 _this.position()
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
  .mfcolor{
    color: #d3e1ff
  }
  .car_line{
    width: 100%;
    height: 1px;
    overflow:hidden;
    background: #0e2456
  }
  body{
    background: #0A142A
  }
  .mcolor{
    color: #90a0c6
  }
  .M-layout{
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    color: #fff;
    width: 100%;
    height:1280px
  }
  .M-layout-top{
    height: 160px
  }
  .M-layout-center{
    display: flex;
    flex:1;
    flex-direction: row;
    width: 100%
  }
  .M-layout-C-L{
    flex:1;
    display: flex;
    flex-direction: column;
    .caronline{
       flex:1;
      .caronline-hd{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: #0e2456 1px solid;
        border-top: #0e2456 1px solid;
        display: flex;;
        flex-direction: row;
        margin-top: 10px;
        ul{
          flex: 1;
          display: flex;;
          flex-direction: row;
          width: 100%;
          li{
            flex:1;
            color: #3363cb
          }
        }
      }
      .caronline-bd{
        flex:1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-bottom: 10px;
        ul{
          flex: 1;
          display: -webkit-box;
          flex-direction: column;
          width: 100%;
          li{
            color: #3363cb;
            display: flex;
            flex-direction:row;
            line-height: 40px;
            height: 40px;
            border-bottom: #0e2456 1px solid;
            color: #94a4ca;
            div{
              flex:1;
            }
          }
        }
      }
    }
    .carele{
      height:300px;
    }
  }
  .M-layout-C-C{
     display: flex;
     flex-direction: column;
     flex:2;
     margin:0 10px;
     .M-C-Map{
       flex:1
     }
     .M-C-B{
       display: flex;;
       flex-direction: row;
       height: 300px;
       .M-item-box:last-child{
         margin-left: 10px;
       }
     }
  }
  .M-layout-C-R{
    flex:1;
    display: flex;
    flex-direction: column;
    .carODO{
      height:200px;
    }
    .carTatal{
      flex:1
    }
  }
  .M-item-box{
    width: 100%;
    box-shadow: inset -1px 1px 14px 6px #0e275d;
    position:relative;
    display: flex;
    flex-direction:column;
    .M-item-hd{
      height: 60px;
      color: #94a5cb;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      line-height: 50px;
      padding-left: 15px;
      font-size: 18px;
      .more{
        background:url("../../assets/M_icon.png") no-repeat;
        height:60px;
        width: 157px;
        background-position: 0 -85px;
      }
    }
    .M-item-bd{
      flex:1;
      display: flex;
      flex-direction: column;
    }
    .M-item-icon{
      position: absolute;
      background: #2e65df
    }
    .M-item-icon01{
      position: absolute;
      background: #6997ff;
    }
    .M-map-top-top{
      position: absolute;
      left:0;
      top:0;
      background: url("../../assets/map_jiao.png") no-repeat;
      width: 75px;
      height: 75px;
    }
    .M-map-top-left{
      position: absolute;
      left:0;
      top:75px;
      background: url("../../assets/m_left.png") no-repeat;
      width: 7px;
      height: 192px;
    }
    .M-map-top-right{
      position: absolute;
      right:0;
      top:0;
      background: url("../../assets/M_top.png") no-repeat;
      width: 248px;
      height:7px;
    }
    .M-item-top-left{
      left:0;
      top:0px;
    }
    .M-item-left-bottom{
      left:0;
      bottom:0px;
    }
    .M-item-top-right{
      right:0;
      top:0px;
    }
    .M-item-bottom-right{
      right:0;
      bottom:0px;
    }
  }
  .M-item-style{
    z-index: 1000;
    .w100{
      width: 100%
    }
    .h200{
      height: 200px;
    }
    .h150{
      height: 150px;
    }
    .w15{
      width:15px;
    }
    .h3{
      height: 3px;
    }
    .h15{
      height: 15px;
    }
    .w3{
      width: 3px
    }
  }

  .car_chong{
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 10px;
    ul{
      flex: 1;
      li{
        height: 35px;
        line-height: 35px;
        text-align: left;
        margin-bottom: 10px;
        overflow: hidden;
        label{
          width: 200px;
          text-align: center;
          float: left;
          font-size: 16px;
          color: #94a4ca;
          span{
            display:inline-block;
            width: 100px;
            overflow: hidden;
          }
        }
        .dian_jidua{
          display: block;
          margin-left: 210px;
          position:relative;
          margin-right: 20px;
          div{
            position: absolute;
            left:0px;
            top:10px;
            height: 20px;
            line-height: 20px;
            width: 100%;
            margin-bottom: 20px;
            border-radius: 10px 10px;
          }
          .car_inline{
            background: linear-gradient(0deg,rgba(0,164,234,1),rgba(38,222,255,1));
            background: -webkit-linear-gradient(0deg,rgba(0,164,234,1),rgba(38,222,255,1));
          }
          .car_seecss{
            background: linear-gradient(0deg,rgba(98,176,137,1),rgba(144,254,206,1));
            background: -webkit-linear-gradient(0deg,rgba(98,176,137,1),rgba(144,254,206,1));
          }
          .car_noseecss{
            background: linear-gradient(0deg,rgba(92,173,181,1),rgba(134,246,254,1));
            background: -webkit-linear-gradient(0deg,rgba(92,173,181,1),rgba(134,246,254,1));
          }
        }
      }
    }
  }
  .carODO_dic{
    font-size: 50px;
    align-items: center;
    justify-content: center;

  }
  .carODO_num{
    display: flex;;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px 35px;
    color: #94a4ca;
    span{
      vertical-align: middle;
    }
  }
  .car-police{
    flex:1;
    display: flex;
    flex-direction:row;
    margin: 0 10px;
    .car-P-item{
      flex:1;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .car-P-item-title{
         padding: 10px 0;
         font-size: 16px;
      }
      .car-P-item-photo{
         flex:1
      }
      .car-P-item-parms{
         height:30px;
         text-align:center;
      }
    }
  }
  .demo-Circle-inner{
    background: url("../../assets/f_curicon.png") no-repeat;
    width: 54px;
    height: 54px;
    position: absolute;;
    top: 50%;
    left: 50%;
    margin-top: -27px;
    margin-left: -27px;
  }
  #J-container{
    margin:5px;
    flex:1
  }
  .CO2-box{
    display: flex;
    flex: 1;
    flex-direction: column;
    .CO2{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin:20px 30px 0 30px;
      div{
        font-size: 16px;
        p:first-child{
          color:#94a4ca;
          padding-bottom: 10px;
        }
      }
    }
    .CO2-photo{
      flex:1;
    }
  }
  .carTotal{
     flex: 1;
     .carTotal-hd{
       width: 100%;
       height: 40px;
       line-height: 40px;
       border-bottom: #0e2456 1px solid;
       border-top: #0e2456 1px solid;
       display: flex;;
       flex-direction: row;
       margin-top: 10px;
       ul{
         flex: 1;
         display: flex;;
         flex-direction: row;
         width: 100%;
         li{
           flex:1;
           color: #3363cb
         }
       }
     }
     .carTotal-bd{
       display: flex;
       flex-direction: column;
       overflow: hidden;
       margin-bottom: 10px;
       ul{
         flex: 1;
         display: -webkit-box;
         flex-direction: column;
         width: 100%;
         li{
           color: #3363cb;
           display: flex;
           flex-direction:row;
           line-height: 45px;
           height: 45px;
           color: #94a4ca;
           div{
             flex:1;
           }
         }
       }
     }
     .carTotal-fd {
       flex:1
     }
  }
</style>
