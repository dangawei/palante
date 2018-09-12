 <style scoped lang="less">
 .carphoto{
   height: 300px;
 }
 .total_card{
   margin: 10px
 }
 .cartotal{
   height: 60px;
   background:#00b5ab;
   text-align:center;
   line-height: 60px;
   font-size: 24px;
   margin:10px;
   a{
     color: #fff;
   }
 }
</style>
<template>
  <div>
    <div class="cartotal">
        <a href="/carmonitor/list/">进入监控</a>
    </div>
    <div class="total_card">
      <Card>
          <div class="zd_cardbody">
            <div class="card_hd">
               <div class="">车辆统计</div>
               <div class="">
                 <Tooltip content="车辆统计" placement="top">
                    <Icon type="ios-information-outline" size="20"></Icon>
                </Tooltip>
               </div>
            </div>
            <div class="card_bd">
              <div class="carphoto" id="J-total">

              </div>
            </div>
          </div>
      </Card>
    </div>
    <div class="total_card">
      <Card>
          <div class="zd_cardbody">
            <div class="card_hd">
               <div class="">报警统计</div>
               <div class="">
                 <Tooltip content="报警统计" placement="top">
                    <Icon type="ios-information-outline" size="20"></Icon>
                </Tooltip>
               </div>
            </div>
            <div class="card_bd">
              <div class="carphoto" id="J-FaultState">

              </div>
            </div>
          </div>
      </Card>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
    props: {
      vin:{
        default:''
      }
    },
    components: {
      countTo
    },
    name: 'indexUserComponent',
    data() {
        return {
           cardata:{},
           percent:100
        }
    },
    mounted() {
      //do something after mounting vue instance
       this.list()
    },
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token')
          }
          this.$api.get('/monitor/car/state',data,reset => {
              if (reset.codeId === 1) {
                 _this.cardata = reset.resData
                 _this.map()
              }else if(reset.codeId === -99){
                this.$router.push({path:"/login"})
              }
          })
      },
      map () {
        let Jtotal = this.$echarts.init(document.getElementById('J-total'))
        let FaultState = this.$echarts.init(document.getElementById('J-FaultState'))
        var option = {
              title: {
                  text: "车辆统计",
                  textStyle: {
                      fontSize: 14,
                      fontWeight: 'bolder',
                      color: '#333'
                  },
                  x:'center'
              },
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             series : [
                 {
                     type: 'pie',
                     radius : '55%',
                     center: ['50%', '60%'],
                     data:[
                         {value:this.cardata.moveNum, name:'行驶'},
                         {value:this.cardata.onLineNum, name:'在线'},
                         {value:this.cardata.outLineNum, name:'离线'},
                         {value:this.cardata.stopNum, name:'停车'},
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]};
             var option1 = {
                   title: {
                       text: "车辆统计",
                       textStyle: {
                           fontSize: 14,
                           fontWeight: 'bolder',
                           color: '#333'
                       },
                       x:'center'
                   },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  series : [
                      {
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data:[
                              {value:this.cardata.carFaultStateVO.f1Num, name:'报警等级1'},
                              {value:this.cardata.carFaultStateVO.f2Num, name:'报警等级2'},
                              {value:this.cardata.carFaultStateVO.f3Num, name:'报警等级3'},
                          ],
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]};
             FaultState.setOption(option1, true);
             Jtotal.setOption(option, true);
        }
    }
}

</script>
