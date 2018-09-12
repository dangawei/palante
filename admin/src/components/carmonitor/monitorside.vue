<!--
speed代表速度，除以10表示 km/h
hasWaring=0表示无故障，1,2,3代表3个等级故障
-->
<template>
   <div class="sidebox" :style="muneheightshow">
     <div class="car-search" style="padding:10px;">
        <Input v-model="subform.vin" :placeholder="subform.inputname"></Input>
        <div class="mt5">
          <Select v-model="subform.carselectstatus">
             <Option value="1">vin</Option>
             <Option value="2">车牌号</Option>
             <Option value="3">身份证</Option>
          </Select>
        </div>
        <div class="mt5">
           <car-model @carmodelselect="carmodelselect"></car-model>
        </div>
        <div class="mt5" v-if="accountType!==2">
           <adminSubCompanyId-component @subcompanyemit="subcompanyemit"></adminSubCompanyId-component>
        </div>
        <div class="mt5">
           <dearle-component @dearleEmitComponent="dearleEmitComponent" :adminSubCompanyId="subform.adminSubCompanyId"></dearle-component>
        </div>
        <div class="mt5">
          <Select placeholder="车辆状态" v-model="subform.assigned">
             <Option value="">全部</Option>
             <Option value="1">在线停车</Option>
             <Option value="2">在线行驶</Option>
             <Option value="3">离线设备</Option>
             <Option value="4">库存设备</Option>
             <Option value="5">到期设备</Option>
             <Option value="6">拆除报警</Option>
             <Option value="7">断电报警</Option>
             <Option value="8">超速报警</Option>
             <Option value="9">区域报警</Option>
             <Option value="10">充电状态</Option>
             <Option value="11">其它状态</Option>
          </Select>
        </div>
        <div class="mt10" @click="search()">
           <Button type="success" style="width:100%">搜索</Button>
        </div>
        <div class="mt10">
          <span @click="selectdata">
            <Button type="success">数据导出</Button>
          </span>
          <span @click="openlock">
            <Button type="success">批量开锁</Button>
          </span>
          <span @click="closelock">
            <Button type="success">批量关锁</Button>
          </span>
        </div>
     </div>
     <div class="monitortab">
        <span @click="tab(0)"  :class="{ative:subform.onLine==0}">全部:{{adddata.totalNum}}</span>
        <span @click="tab(1)" :class="{ative:subform.onLine==1}">在线:{{adddata.onLineNum}}</span>
        <span @click="tab(2)" :class="{ative:subform.onLine==2}">离线:{{adddata.outLineNum}}</span>
     </div>
     <div class="carlist">
       <div class="carlist-hd" @click="checkoutclick">
           <i :class="{cur:allselectshow}"></i>
           <span>全部车辆 {{adddata.countAll}}</span>
       </div>
        <div class="caritem" :class={aitve:item.ashow} v-for="item in cardata">
          <i :class="{cur:item.show}" @click="munesideclick(item)"></i>
          <div class="caritemvin"  @click="muneside(item)">
            {{item.licencePlateNumber}}({{item.vin}})
          </div>
          <div class="">
              <span class="icon onlineicon" v-if="item.onLine==1"></span>
              <span class="icon iconwrite"  v-if="item.onLine==2"></span>
          </div>
        </div>
     </div>
     <!-- <div class="sidepage">
        <span class="totalpage">共{{pageData.totalCount}}条 每页展示:{{pageData.pageSize}}条</span>
        <Page
        :current="pageData.pageCurrent"
        :page-size="pageData.pageSize"
        :total="pageData.totalCount"
        simple
        show-total
        @on-change="change"
        @on-page-size-change="sizechange"
        ></Page>
        <span class="gray mt10">输入页码回车切换</span>
     </div> -->
   </div>
</template>
<script>
import dearleComponent from '../pub/dearleComponent.vue'
import adminSubCompanyIdComponent from '../pub/subcompany.vue'
import carModel from '../pub/carmodel.vue'
import {vm} from '../../js/infobase/vm.js'
export default {
   props:["height"],
   components: {
     dearleComponent,
     carModel,
     adminSubCompanyIdComponent
   },
   data() {
        return {
            muneheight:"",
            muneheightshow:{},
            cardata:[],
            adddata:{},
            allselectshow:false,
            accountType:'',
            subform:{
              vin:"",
              carselectstatus:'1',
              carselectstatusname:"vin",
              inputname:"",
              onLine:"",
              dealerId:'',
              idCard:"",
              licencePlateNumber:"",
              carModelId:"",
              adminSubCompanyId:"",
              carStatus:""
            },
            countAllshow:false,
            countOnLineshow:false,
            outLineshow:false,
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pageSize:100,
            }
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.accountType = this.$webapi.get("accountType")
      if(this.$webapi.get("accountType")==2){
        this.subform.adminSubCompanyId = this.$webapi.get("adminSubCompanyId")
      }
      this.list()
      this.subform.inputname = "搜索"+this.subform.carselectstatusname
      this.muneheight = this.height || 0
      this.muneheightshow = {
        "height":this.muneheight+"px",
      }
    },
    watch:{
        "subform.carselectstatus":{
          handler(curVal,oldVal){
              if(curVal){
                if(curVal==1){
                  this.subform.carselectstatus = curVal
                  this.subform.carselectstatusname = "vin"
                }
                if(curVal==2){
                  this.subform.carselectstatus = curVal
                  this.subform.carselectstatusname = "车牌号"
                }
                if(curVal==3){
                  this.subform.carselectstatus = curVal
                  this.subform.carselectstatusname = "身份证"
                }
                this.subform.inputname = "搜索"+this.subform.carselectstatusname
              }
　　　　　 },
　　　　  deep:true
        },
        height:{
          handler(curVal,oldVal){
            this.muneheightshow = {
              "height":curVal+"px",
               "overflow-y":"auto"
            }
　　　　　 },
　　　　  deep:true
        },
    },
    methods: {
      selectdata (){
        var _this = this
        var reset = []
        this.cardata.forEach(function (a) {
           if(a.show){
              reset.push(a.vin)
           }
        })
        if(reset.length>0){
          var data = {
              token:this.$webapi.get("token"),
              vins:JSON.stringify(reset)
          }
          this.$api.get("/monitor/detail/export", data, reset => {
            if (reset) {
              window.location.href = this.$webapicommon + "/monitor/detail/export?token=" + this.$webapi.get("token") + "&vins="+ data.vins
             }
            else {
              _this.$netcode.getApiCode(reset)
           }
         })
        }
      },
      openlock () {
        var _this = this
        var reset = []
        this.cardata.forEach(function (a) {
           if(a.show){
              reset.push(a.vin)
           }
        })
        if(reset.length>0){
          this.$Modal.confirm({
             render: (h) => {
               var str = "确定要批量开锁吗"
                return h('div', [
                    h('span', str)
                ]);
             },
            onOk:function () {
              var data = {
                  token:this.$webapi.get("token"),
                  vin:JSON.stringify(reset),
                  lock:1
              }
              this.$api.post("/monitor/car/lock", data, reset => {
                if (reset.codeId === 1) {
                    _this.$netcode.getApiCode(reset)
                }
                else {
                  _this.$netcode.getApiCode(reset)
               }
             })
            }
         })
       }else{
         this.$Message.info("车辆没有选择")
       }
      },
      closelock () {

          var _this = this
          var reset = []
          this.cardata.forEach(function (a) {
             if(a.show){
                reset.push(a.vin)
             }
          })
          if(reset.length>0){
            this.$Modal.confirm({
               render: (h) => {
                 var str = "确定要批量开锁吗"
                  return h('div', [
                      h('span', str)
                  ]);
               },
              onOk:function () {
                var data = {
                    token:this.$webapi.get("token"),
                    vin:JSON.stringify(reset),
                    lock:2
                }
                this.$api.post("/monitor/car/lock", data, reset => {
                  if (reset.codeId === 1) {
                      _this.$netcode.getApiCode(reset)
                  }
                  else {
                    _this.$netcode.getApiCode(reset)
                 }
               })
              }
           })
         }else{
           this.$Message.info("车辆没有选择")
         }
      },
      subcompanyemit (e) {
        this.subform.adminSubCompanyId = e
        this.subform.dealerId = ''
      },
      checkoutclick () {
        var _this = this;
        this.allselectshow = !this.allselectshow
        this.cardata.forEach(function (a) {
          a.show = _this.allselectshow
        })
      },
      tab (e) {
        this.allselectshow = false
        if(e==0) {
          this.subform.onLine = ""
        }
        if(e==1) {
          this.subform.onLine = 1
        }
        if(e==2) {
          this.subform.onLine = 2
        }
        this.list()
      },
      carmodelselect (e) {
          this.subform.carModelId = e.id
      },
      munesideclick (e){
          e.show = !e.show
          if(!e.show){
              this.allselectshow = false
          }
      },
      muneside (e) {
        this.cardata.forEach(function (a) {
           a.ashow = false
        })
        e.ashow = !e.ashow
        this.$emit("Emitside",e)
      },
      search () {
         this.pageData.pageCurrent = 1
         this.list()
      },
      change(e) {
         this.pageData.pageCurrent = e
         this.list()
      },
      sizechange (e) {
        this.pageData.pageCurrent = e
        this.list()
      },
      dearleEmitComponent (e) {
        this.subform.dealerId = e
      },
      list() {
          var licencePlateNumber = ""
          var idCard = ""
          var vin = ""
          if(this.subform.carselectstatus==2){
              licencePlateNumber = this.subform.vin
          }
          if(this.subform.carselectstatus==3){
              idCard = this.subform.vin
          }
          if(this.subform.carselectstatus==1){
              vin = this.subform.vin
          }
          let _this = this
          var data = {
              token:this.$webapi.get("token"),
              carModelId:this.subform.carModelId,
              dealerId:this.subform.dealerId,
              licencePlateNumber:licencePlateNumber,
              idCard:idCard,
              adminSubcompanyId:this.subform.adminSubCompanyId,
              carStatus:this.subform.carStatus,
              onLine:this.subform.onLine,
              vin:vin
           }
          this.$api.get("/monitor/base/list", data, reset => {
            if (reset.codeId === 1) {
                var str = reset.resData.list
                 str.forEach(function (a) {
                   a.show = false
                   a.ashow = false
                 })
                _this.cardata = str
                _this.adddata = reset.resData
                vm.$emit("mapdata",str)
            }
            else {
              _this.$netcode.getApiCode(reset)
           }
         })
      },
      exportdata () {
        this.show = false
        this.$emit('emitcomponent',false)
      }
    }
  }
</script>
<style lang="less">
  .sidebox{
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .carlist-hd{
    padding: 10px 0;
    text-align:left;
    margin: 0 10px;
     i{
       width: 23px;
       height: 23px;
       overflow:hidden;
       background:url("../../assets/green.png") no-repeat;
       display: inline-block;
       vertical-align: middle;
       cursor: pointer;
     }
     i.cur{
        background-position: -48px 0
     }
     span{
       display: inline-block;
     }
  }
  .monitortab{
    display: flex;
    justify-content:space-between;
    padding: 15px 0;
    margin: 10px 0;
    overflow: hidden;
    span{
      padding: 0 5px;
      cursor: pointer;
    }
  }
  .sidepage{
    background: #fff;
    .totalpage{
      height: 45px;
      line-height: 45px;
      display: block;
    }
    .gray{
      display: block;
    }
  }
  .carlist{
    flex: 1;
    flex-direction: column;
    overflow: auto;
    .aitve{
       background: #e7f8f4;
    }
    .caritemvin{
      padding-left: 23px;
      word-break: break-all;
    }
    .caritem{
       color: #666;
       margin: 0 10px;
       height: 45px;
       line-height: 45px;
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-pack: justify;
       -ms-flex-pack: justify;
       justify-content: space-between;
       cursor: pointer;
       border-bottom: #f5f5f5 1px solid;
       position:relative;
       overflow:hidden;
       //border-top: #051e36 1px solid;
       i{
         position: absolute;
         top:12px;
         left:0;
         width: 23px;
         height: 23px;
         overflow:hidden;
         background:url("../../assets/green.png") no-repeat;
         display: inline-block;
         vertical-align: middle;
         cursor: pointer;
       }
       i.cur{
          background-position: -48px 0
       }
      .icon{
        width: 45px;
        height: 45px;
        background: #fff;
        overflow: hidden;
        float: left;
      }
      .onlineicon{
        background: url("../../assets/onlinecar.png") center no-repeat;
        background-size: 20px;
      }
      .iconwrite{
        background: url("../../assets/car.png") center no-repeat;
        background-size: 20px;
      }
    }
  }
</style>
