<template>
  <div class="M-layout-center">
      <div class="M-layout-C-L">
         <div class="M-item-box carsearch">
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
                <div class="M-item-select">
                    <div class="mt10">
                      <div class="M-style-select M-S-item">
                        <div class="M-S-hd">
                            <span class="M-S-left"></span>
                            <span class="M-S-right"></span>
                        </div>
                        <div class="M-S-bd">
                            <div class="M-S-fl fl">
                              <Select v-model="model" placeholder="选择车型" style="width:100px;float:left" >
                                  <Option value="1">vin</Option>
                                  <Option value="2">身份证</Option>
                                  <Option value="3">车牌</Option>
                              </Select>
                            </div>
                            <div class="M-S-fr">
                                <input class="input-txt zdinput" v-model="itemvalue" @blur="selectitem" />
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="M-item-list">
                      <ul>
                         <li><carmodel-component @Emitexportcomponent="Emitcarmodelcomponent"></carmodel-component></li>
                         <li><dearle-component @Emitexportcomponent="dearleexportComponent"></dearle-component></li>
                         <li><subcompany-component @Emitexportcomponent="subcompanyexportComponent"></subcompany-component></li>
                         <li><carcity-component @areaEmit="areaEmit"></carcity-component></li>
                         <li><carstatus-component @Emitexportcomponent="carstatusexportComponent"></carstatus-component></li>
                         <li><mcstatus-component @EmitMc="mcstatusexport"></mcstatus-component></li>
                         <li><faultLevel-component @faultLevelexportcomponent="faultLevelexportcomponent"></faultLevel-component></li>
                      </ul>
                    </div>
                    <div class="mt10">
                      <div class="M-style-select M-S-item pointer"  @click="searchBtn">
                        <div class="M-S-hd">
                            <span class="M-S-left"></span>
                            <span class="M-S-right"></span>
                        </div>
                        <div class="M-S-bd M-S-btn">
                            搜索
                        </div>
                      </div>
                    </div>
                </div>
                <div class="M-item-carlist">
                  <div class="car-item-title">
                      <div :class="{ative:tabshow==0}" @click="tab(0)">全部({{carlistdata.totalNum}})<i></i></div><div :class="{ative:tabshow==1}" @click="tab(1)">在线({{carlistdata.onLineNum}})<i></i></div><div :class="{ative:tabshow==2}" @click="tab(2)">离线({{carlistdata.outLineNum}})<i></i></div>
                  </div>
                  <div class="all-item-select">
                      <i @click="allclick" :class="{ative:allshow}"></i>全部车辆
                  </div>
                  <div class="all-car-list">
                    <div class="caritem" v-for="item in carlistdata.list" :class="{ative:item.show}" @click="caritemlist(item)">
                       <div class="caritem-S">
                          <i></i>
                       </div>
                       <div class="caritem-vin">
                          <p class="caritem-l">{{item.licencePlateNumber}}</p>
                          <p class="caritem-vinlist">{{item.vin}}</p>
                       </div>
                       <div class="caritem-yesonline">
                         <span class="onlinecolor" v-if="item.onLine==1">在线</span>
                         <span v-if="item.onLine==2">离线</span>
                       </div>
                    </div>
                  </div>
                </div>
                <div class="M-item-export">
                   <div class="" @click="carexport">
                     <div class="M-style-select M-S-item">
                       <div class="M-S-hd">
                           <span class="M-S-left"></span>
                           <span class="M-S-right"></span>
                       </div>
                       <div class="M-S-bd M-S-btn mcolor">
                           批量导出当前数据
                       </div>
                     </div>
                   </div>
                   <div class="M-style-exportlist">
                     <span @click="opencar(1)">
                       <div class="M-style-select M-S-item">
                         <div class="M-S-hd">
                             <span class="M-S-left"></span>
                             <span class="M-S-right"></span>
                         </div>
                         <div class="M-S-bd M-S-btn mcolor">
                             批量开锁
                         </div>
                       </div>
                     </span>
                     <span @click="opencar(2)">
                       <div class="M-style-select M-S-item">
                         <div class="M-S-hd">
                             <span class="M-S-left"></span>
                             <span class="M-S-right"></span>
                         </div>
                         <div class="M-S-bd M-S-btn mcolor">
                             批量关锁
                         </div>
                       </div>
                     </span>
                   </div>
                </div>
            </div>
         </div>
      </div>
      <div class="M-layout-C-C">
        <div class="M-item-box M-C-Map">
           <div class="M-item-style">
               <!-- <div class="M-map-top-top"></div> -->
               <div class="M-map-top-left"></div>
               <div class="M-map-top-right"></div>
               <div class="M-map-left-left"></div>
               <div class="M-item-left-bottom w3 h200 M-item-icon01"></div>
               <div class="M-item-left-bottom w100 h3 M-item-icon01"></div>
               <div class="M-item-bottom-right w3 h150 M-item-icon01"></div>
               <div class="M-item-bottom-right w15 h3 M-item-icon01"></div>
           </div>
           <div class="M-item-bd">
              <online-mapcomponent v-if="mapshow && showType!==2" :carlistdata="carlistdata" :sideItem="sideItem"></online-mapcomponent>
              <outline-mapcomponent v-if="mapshow && showType==2" :caritem="caritem"></outline-mapcomponent>
           </div>
        </div>
        <div class="M-item-nooutmoule" v-if="nooutmouleshow">
            <onLine-component v-if="showType==1" :caritem="caritem"></onLine-component>
            <outLine-component v-if="showType==2" :caritem="caritem"></outLine-component>
        </div>
        <div class="M-item-fixed" v-if="kong">
            <span v-if="nooutmouleshow" @click="open(false)" class="lastcar">隐藏</span>
            <span v-else="" @click="open(true)" class="fristcar">展示</span>
        </div>
      </div>
  </div>
</template>
<script>
import dearleComponent from "../pub/car-search.vue"
import carmodelComponent from "../pub/carmodel.vue"
import subcompanyComponent from "../pub/companycomponent.vue"
import mcstatusComponent from "../pub/mcstatus.vue"
import faultLevelComponent from "../pub/faultLevel.vue"
import carstatusComponent from "../pub/carstatus.vue"
import carcityComponent from "../pub/carcity.vue"
import onlineMapcomponent from "../pub/onlinemap.vue"
import outlineMapcomponent from "../pub/outlinemap.vue"
import onLineComponent from "../online/list.vue"
import outLineComponent from "../outline/list.vue"
import {vm} from '../../../js/infobase/vm.js'
var setTtemTime;
export default {
   components: {
     mcstatusComponent,
     faultLevelComponent,
     dearleComponent,
     carmodelComponent,
     subcompanyComponent,
     carstatusComponent,
     onlineMapcomponent,
     onLineComponent,
     outLineComponent,
     outlineMapcomponent,
     carcityComponent
   },
   data() {
      return {
        kong:false,
        mapshow:false,
        tabshow:0,
        allshow:false,
        nooutmouleshow:false,
        showType:0, // 1是实时在线，2是轨迹
        setTtemnum:0,
        setmaxTtemnum:15,
        selectItemdata:[], //选择的车辆缓存
        carlistdata:{
          list:[]
        },
        caritemvin:'',
        caritem:{},
        sideItem:{},
        model:'1',
        itemvalue:"",
        subform:{
          provinceCode:"",
          carModelId:"",
          dealerId:"",
          licencePlateNumber:"",
          idCard:"",
          vin:"",
          adminSubcompanyId:"",
          carStatus:"",
          onLine:"",
          mcState:"",
          faultLevel:""
        }
      }
    },
    mounted() {
      //do something after mounting vue instance
      //地图点击车辆，带回来的数据
      vm.$on("Fmapcarinfolist", (e) => {
          this.caritemvin = e.vin
          this.nooutmouleshow = true
          this.carview()
      });
      vm.$on("onlineTimeType", (e) => {
          this.showType = e
      });
      this.list()
    },
    watch:{
      caritem:{
        kong (val,oldval) {
             if(val){
                this.kong = val
             }
        },
        deep:true
      }
    },
    methods: {
      open(e){
        this.nooutmouleshow = e
      },
      tab(e){
        this.tabshow = e
        this.list()
      },
      carview () {
        var _this = this;
        var data = {
            token: this.$webapi.get('token'),
            vin:this.caritemvin
        }
        this.$api.get('/monitor/detail', data, reset => {
          if (reset.codeId === 1) {
              _this.caritem = reset.resData
              if(_this.showType==0){
                _this.showType = 1
              }
            _this.kong = JSON.stringify(_this.caritem) != "{}"
          }
          else {
              _this.$netcode.getApiCode(reset)
          }
        })
      },
      selectitem () {
        this.subform.vin = ""
        this.subform.idCard = ""
        this.subform.licencePlateNumber = ""
      },
      allclick () {
        var _this = this
        this.allshow = !this.allshow
        this.selectItemdata = []
        this.sideItem = {}
        if(this.allshow==true){
          this.carlistdata.list.forEach(function (a) {
            a.show = true
            _this.selectItemdata.push(a.vin)
          })
        }else{
          this.carlistdata.list.forEach(function (a) {
            a.show = false
          })
        }
      },
      mcstatusexport (e) {
        this.subform.mcState = e
      },
      faultLevelexportcomponent (e) {
        this.subform.faultLevel = e
      },
      caritemlist (item){
        item.show = !item.show
        if(item.show){
          this.sideItem = item
          if(this.selectItemdata.length>0){
            var idx = 0
             this.selectItemdata.forEach(function (a){
               if(a == item.vin){
                  idx = 1
               }
             })
             if(idx == 0){
               this.selectItemdata.push(item.vin)
             }
          }else{
            this.selectItemdata.push(item.vin)
          }
        }else{
          if(this.selectItemdata.length>0){
            var idx = -1
             this.selectItemdata.forEach(function (a,index){
               if(a== item.vin){
                  idx = index
               }
             })
            if(idx>=0){
              this.selectItemdata.splice(idx,1)
            }
          }
        }
      },
      searchBtn() {
        this.list()
      },
      list(){
        let _this = this
        this.subform.vin = ""
        this.subform.idCard = ""
        this.subform.licencePlateNumber = ""
        let data = {
            token: this.$webapi.get('token')
        }
        if(this.subform.licencePlateNumber!=""){
          data.licencePlateNumber = this.subform.licencePlateNumber
        }
        if(this.subform.vin!=""){
          data.vin = this.subform.vin
        }
        if(this.subform.carStatus!=""){
          data.carStatus = this.subform.carStatus
        }
        if(this.subform.adminSubcompanyId!=""){
          data.adminSubcompanyId = this.subform.adminSubcompanyId
        }
        if(this.subform.idCard!=""){
          data.idCard = this.subform.idCard
        }
        if(this.subform.carModelId!=""){
          data.carModelId = this.subform.carModelId
        }
        if(this.subform.provinceCode!=""){
          data.provinceCode = this.subform.provinceCode
        }
        if(this.subform.dealerId!=""){
          data.dealerId = this.subform.dealerId
        }
        if(this.subform.mcState!=""){
          data.mcState = this.subform.mcState
        }
        if(this.subform.faultLevel!=""){
          data.faultLevel = this.subform.faultLevel
        }
        if(this.model==1 && this.itemvalue!="" ){
           data.vin = this.itemvalue
        }
        if(this.model==2 && this.itemvalue!=""){
          data.idCard = this.itemvalue
        }
        if(this.model==3 && this.itemvalue!=""){
          data.licencePlateNumber = this.itemvalue
        }
        if(this.tabshow!=0){
            data.onLine = this.tabshow
        }
        this.$api.get('/monitor/base/list', data, reset => {
          if (reset.codeId === 1) {
              vm.$emit("EmitMapside",reset.resData)
              var data = reset.resData
              data.list.forEach(function (a) {
                a.show = false
                if(_this.selectItemdata.length>0){
                  var idx = 0
                  _this.selectItemdata.forEach(function (b) {
                      if(a.vin == b){
                        idx = 1
                      }
                  })
                  if(idx == 1){
                    a.show = true
                  }
                }
              })
              _this.carlistdata = data
              _this.mapshow = true
              _this.setTtemnum = 0
              _this.startTime()
          }
          else {
              _this.$netcode.getApiCode(reset)
          }
        })
      },
      startTime () {
        var _this = this;
        clearInterval(setTtemTime)
        setTtemTime = setInterval(_this.itemtime,1000)
      },
      itemtime(){
        var num = parseInt(this.setTtemnum)+1
            if(num>=30){
                clearInterval(setTtemTime)
                this.list()
            }
        // if(num>=parseInt(this.setmaxTtemnum)){
        //   clearInterval(setTtemTime)
        //   this.list()
        // }
       this.setTtemnum = num

      },
      carexport () {
        var _this = this
        var data ={
          token:this.$webapi.get('token'),
          vins:[]
        }
        this.carlistdata.list.forEach(function (a) {
          if(a.show == true){
            data.vins.push(a.vin)
          }
        })
        if(data.vins.length<1){
           this.$Message.info("车辆没有选择")
           return
        }
        data.vins = JSON.stringify(data.vins)
        this.$api.get('/monitor/detail/export', data, reset => {
          if (reset) {
            if(reset.codeId==undefined || reset.codeId==null){               
              window.location.href = _this.$webapicommon+"/monitor/detail/export?token="+_this.$webapi.get('token')+"&vins="+data.vins
            }else{
              _this.$netcode.getApiCode(reset)
            }
          }
          else {
              _this.$netcode.getApiCode(reset)
          }
        })
      },
      Emitcarmodelcomponent(e) {
        if(e==null){
          this.subform.carModelId = ""
        }else{
          this.subform.carModelId = e.id
        }
      },
      dearleexportComponent (e) {
        if(e==null){
          this.subform.dealerId = ""
        }else{
          this.subform.dealerId = e.id
        }
      },
      areaEmit (e) {
        this.subform.provinceCode = e[0].code
      },
      subcompanyexportComponent (e) {
        if(e==null){
          this.subform.adminSubcompanyId = ""
        }else{
          this.subform.adminSubcompanyId = e.id
        }
      },
      carstatusexportComponent (e) {
        this.subform.carStatus = e
      },
      opencar (e){
        var _this = this;
        var str = ""
        if(e==1){
          str = "批量开锁"
        }else{
          str = "批量关锁"
        }
        this.$Modal.confirm({
          title:str,
          content:"确认要"+str+"?",
          onOk () {
            _this.opencarlist(e)
          }
        })
      },
      opencarlist (e) {
        var _this = this;
        var data = []
        this.carlistdata.list.forEach(function (a) {
          if(a.show == true){
            data.push(a.vin)
          }
        })
        if(data.length>0){
          var data ={
            token:this.$webapi.get('token'),
            vin:[],
            lock:parseInt(e)
          }
          data.vin = JSON.stringify(this.selectItemdata)
          this.$api.get('/monitor/car/lock', data, reset => {
            if (reset) {
                _this.$Message.info("操作成功")
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
          })
        }else{
          this.$Message.info("车辆没有选择")
          return
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .onlinecolor{
    color:#16965b!important
  }
  .mcolor{
    color: #00FFC7
  }
  .M-item-export{
    margin:20px;
  }
  .M-style-exportlist{
    span{
      float:left;
      width: 50%
    }
  }
  .M-layout-C-L{
    width:400px;
    flex:none!important;
    .carsearch{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .M-item-carlist{
        flex:1;
        display: flex;
        flex-direction: column;
        .car-item-title{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 50px;
          border-bottom: #18284a 1px solid;
          align-items: center;
          margin: 0 20px;
          div{
            flex: 1;
            color: #94a5cb;
            font-size: 16px;
            position:relative;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
          }
          .ative{
             color:#5388ff;
             i{
               position: absolute;
               width: 100%;
               height: 1px;
               background: #5388ff;
               left:0;
               bottom:0;
             }
          }
        }
        .all-item-select{
          height: 60px;
          line-height: 60px;
          border-bottom: #18284a 1px solid;
          text-align: left;
          margin: 0 20px;
          position:relative;
          padding-left: 30px;
          font-size: 16px;
          color: #fff;
          i{
            position: absolute;
            width: 25px;
            height: 25px;
            background: url("../../../assets/M_allicon.png") no-repeat;
            left:0;
            top:17px;
            cursor: pointer;
          }
          .ative{
            background-position: -25px 0;
          }
        }
        .all-car-list{
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          margin: 0 20px;
          .caritem{
            height:70px;
            padding: 10px 0;
            border-bottom: #18284a 1px solid;
            position:relative;
            .caritem-S{
              position: relative;
              width: 30px;
              i{
                position: absolute;
                width: 25px;
                height: 25px;
                background: url("../../../assets/M_allicon.png") no-repeat;
                left:0;
                top:0px;
                cursor: pointer;
              }
            }
            .caritem-vin{
              margin: 0 30px;
              text-align: left;
              .caritem-l{
                color: #fff;
                font-size: 16px;
                height: 25px;
                line-height: 25px;
              }
              .caritem-vinlist{
                color: #f8f8f8
              }
            }
            .caritem-yesonline{
              width: 50px;
              height: 70px;
              line-height: 50px;
              position: absolute;
              top:0;
              right: 0;
              span{
                color: #60697e
              }
            }
          }
          .ative{
            .caritem-S{
              i{
                background-position: -25px 0;
              }
            }
          }
        }
      }
    }
    .M-item-list{
      display: block;
      ul{
        li{
          float:left;
          width: 50%;
          margin-top: 5px;
        }
      }
    }
    .M-item-select{
      display:flex;
      flex-direction: column;
      margin: 0 20px;
    }
    .M-S-btn{
      line-height: 40px;
    }
  }
  .M-layout-C-C{
    display: flex;
    flex:1;
    flex-direction: column;
    margin-left: 10px;
    position: relative;
    .M-C-Map{
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .M-item-nooutmoule{
      height: 350px;
    }
  }
  .zdinput{
    height: 38px;
    line-height: 38px;
    width: 100%
  }
  .M-S-fl{
    float: left;
    width: 100px;
  }
  .M-S-fr{
    display: block;
    margin-left: 100px;
  }
  .M-item-fixed{
    span{
      position: absolute;
      width: 100px;
      color: #fff;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
    span.lastcar{
      left:250px;
      z-index: 1000;
      border: #f30 1px solid;
      background: #f30;
      bottom:300px;
    }
    span.fristcar{
      left:10px;
      z-index: 1000;
      border: #f30 1px solid;
      background: #f30;
      bottom:10px;
    }
  }
</style>
