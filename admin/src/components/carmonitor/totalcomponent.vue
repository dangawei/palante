<template>
  <div class="total-bar-box" :style="totalbar">
     <div class="total-hd">
          <div class="tatal-chiness" id="J_chinamap"></div>
          <div class="total-car"></div>
     </div>
     <div class="total-bd">
       <div class="total-list" id="J_totalline"></div>
       <div class="total-list" id="J_FaultState"></div>
     </div>
  </div>
</template>
<script>
export default {
  name:"can",
  props: [],
  components:{
  },
  data() {
    return {
      cardata:{},
      totalbar:{},
      percent:100
    }
  },
  mounted() {
     this.list()
     this.totalbar = {
       height:window.innerHeight-64+"px"
     }
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
      let Jtotal = this.$echarts.init(document.getElementById('J_totalline'))
      let FaultState = this.$echarts.init(document.getElementById('J_FaultState'))
      var option = {
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              series: [
                  {
                      name:'',
                      type:'pie',
                      selectedMode: 'single',
                      radius: [0, '35%'],
                      label: {
                          normal: {
                              position: 'inner'
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          {value:this.cardata.moveNum, name:'行驶',selected:true},
                          {value:this.cardata.onLineNum, name:'在线'},
                          {value:this.cardata.outLineNum, name:'离线'},
                          {value:this.cardata.stopNum, name:'停车'},
                      ]
                  },
                  {
                      name:'',
                      type:'pie',
                      radius: ['40%', '55%'],
                      label: {
                          normal: {
                              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                              backgroundColor: '#eee',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                  a: {
                                      color: '#999',
                                      lineHeight: 22,
                                      align: 'center'
                                  },
                                  // abg: {
                                  //     backgroundColor: '#333',
                                  //     width: '100%',
                                  //     align: 'right',
                                  //     height: 22,
                                  //     borderRadius: [4, 4, 0, 0]
                                  // },
                                  hr: {
                                      borderColor: '#aaa',
                                      width: '100%',
                                      borderWidth: 0.5,
                                      height: 0
                                  },
                                  b: {
                                      fontSize: 16,
                                      lineHeight: 33
                                  },
                                  per: {
                                      color: '#eee',
                                      backgroundColor: '#334455',
                                      padding: [2, 4],
                                      borderRadius: 2
                                  }
                              }
                          }
                      },
                      data:[
                        {value:this.cardata.moveNum, name:'行驶'},
                        {value:this.cardata.onLineNum, name:'在线'},
                        {value:this.cardata.outLineNum, name:'离线'},
                        {value:this.cardata.stopNum, name:'停车'},
                      ]
                  }
              ]
          };
      var option1 = {
                 title: {
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
                color:['#74bf10', '#efc637','#d23342'],
                series : [
                    {
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '55%'],
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
<style lang="less">
  .total-bar-box{
     display: flex;
     flex-direction:column;
  }
  .total-hd{
    display: flex;
    flex:1;
    flex-direction: row;
  }
  .tatal-chiness{
    flex: 1
  }
  .total-list{
    float: left;
    width: 50%;
    height: 350px;
  }
  .total-list:last-child{
    border-left: #ccc 1px solid
  }
</style>
