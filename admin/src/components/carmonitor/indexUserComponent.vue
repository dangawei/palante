<style scoped lang="less">
 .indexUserbox{
   position: absolute;
   bottom: 0;
   left: 0;
   min-height: 300px;
   background: #fff;
   max-width: 502px;
   z-index: 9999;
   background-color: rgb(241, 246, 255);
   border: 1px solid rgb(153, 187, 232);
   border-radius: 5px;
   padding:10px 0;
   ul{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     li{
       float: left;
       width: 250px;
       label{
         float: left;
         width: 80px;
         text-align:right;
         height: 35px;
         line-height: 35px;
       }
       .txtcar{
         float: left;
       }
     }
   }
 }
</style>
<template>
  <div class="indexUserbox" :style="style">
    <ul>
      <li><label>vin:</label><div class="txtcar"><Input v-model="cardata.vin" placeholder="vin"></Input></div></li>
      <li><label>车牌号码:</label><div class="txtcar"><Input v-model="cardata.licencePlateNumber" placeholder="车牌号码"></Input></div></li>
      <li><label>SIM:</label><div class="txtcar"><Input v-model="cardata.simNo" placeholder="SIM"></Input></div></li>
      <li><label>车辆型号:</label><div class="txtcar"><Input v-model="cardata.modelName" placeholder="车辆品牌"></Input></div></li>
      <li><label>经销商:</label><div class="txtcar"><Input v-model="cardata.dealerName" placeholder="经销商"></Input></div></li>      
      <li><label>车辆配置:</label><div class="txtcar"><Input v-model="cardata.skuValue" placeholder="车辆颜色"></Input></div></li>
      <li><label>电机编号:</label><div class="txtcar"><Input v-model="cardata.monitorNo" placeholder="电机编号"></Input></div></li>
      <li><label>生产日期:</label><div class="txtcar"><Input v-model="cardata.factoryDate" placeholder="生产日期"></Input></div></li>
      <li><label>电控编号:</label><div class="txtcar"><Input v-model="cardata.controlNo" placeholder="电控编号"></Input></div></li>
      <li><label>车主姓名:</label><div class="txtcar"><Input v-model="cardata.carUserName" placeholder="车主姓名"></Input></div></li>
      <li><label>电池编号:</label><div class="txtcar"><Input v-model="cardata.batteryNo" placeholder="电池编号"></Input></div></li>
      <li><label>联系电话:</label><div class="txtcar"><Input v-model="cardata.carUserMobile" placeholder="联系电话"></Input></div></li>
      <!-- <li><label>回传编号:</label><div class="txtcar"><Input v-model="unell" placeholder="回传编号"></Input></div></li>
      <li><label>身份证号:</label><div class="txtcar"><Input v-model="unell" placeholder="身份证号"></Input></div></li>
      <li><label>终端类型:</label><div class="txtcar"><Input v-model="unell" placeholder="终端类型"></Input></div></li>
      <li><label>回传Iccid:</label><div class="txtcar"><Input v-model="unell" placeholder="回传Iccid"></Input></div></li> -->
      <li><label>终端编号:</label><div class="txtcar"><Input v-model="cardata.terminalNo" placeholder="终端编号"></Input></div></li>
      <!-- <li><label>设备卡号:</label><div class="txtcar"><Input v-model="unell" placeholder="设备卡号"></Input></div></li> -->
    </ul>
    <div class="">
      <span @click="outbutton"><Button type="error">退出</Button></span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      vin:{
        default:''
      },
      bottom:{
        default:0
      },
      Emitsidedata:{
        default:{}
      }
    },
    name: 'indexUserComponent',
    data() {
        return {
           unell:"--",
           carvin:"",
           style:{},
           cardata:{}
        }
    },
    mounted() {
      //do something after mounting vue instance
       this.cardata = this.Emitsidedata
       this.style = {
         bottom:this.bottom+"px"
       }
       //this.list()
    },
    methods: {
      outbutton () {
        this.$emit("emitcomponent")
      },
      // list () {
      //     let _this = this
      //     let data = {
      //         token:this.$webapi.get('token'),
      //         vin:this.carvin
      //     }
      //     this.$api.get('/monitor/detail',data,reset => {
      //         if (reset.codeId === 1) {
      //            _this.cardata = reset.resData
      //         }
      //     })
      // },
    },
    watch:{
        Emitsidedata:{
          handler(curVal,oldVal){
            if(curVal){
               this.cardata = curVal
            }　　　
    　　  },
    　　  deep:true
        }
    },
}

</script>
