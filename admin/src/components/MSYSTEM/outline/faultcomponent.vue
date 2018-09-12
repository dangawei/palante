<template>
  <div class="carinfo-item">
    <div class="M-item-box CANinfo mt10">
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
       <div class="M-item-bd ZD-tab">
            <div class="FaultListBox">
              <div class="FaultList">
                <table class="table table-bordered">
                   <thead>
                     <tr>
                       <th>VIN</th>
                       <th>经度</th>
                       <th>纬度</th>
                       <th>报警等级</th>
                       <th>类型</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr v-for="item in data.faultList">
                       <td class="">{{item.vin}}</td>
                       <td class="">{{item.longitude/1000000}}</td>
                       <td class="">{{item.latitude/1000000}}</td>
                       <td class="">{{item.faultLevel}}</td>
                       <td class="">{{item.desc}}</td>
                     </tr>
                   </tbody>
                </table>
              </div>
              <div class="Faultphoto" >
                <div id="J-Faultphoto">
                </div>
                <div class="Faultphoto-list">
                    <div class="Faultphoto-item">
                        <div class="Faultphoto-item-title">
                          <i class="F1"></i>{{data.countF1}}
                        </div>
                        <div class="Faultphoto-item-type">
                            一级报警
                        </div>
                    </div>
                    <div class="Faultphoto-item">
                        <div class="Faultphoto-item-title">
                          <i class="F2"></i>{{data.countF2}}
                        </div>
                        <div class="Faultphoto-item-type">
                            二级报警
                        </div>
                    </div>
                    <div class="Faultphoto-item">
                        <div class="Faultphoto-item-title">
                          <i class="F3"></i>{{data.countF3}}
                        </div>
                        <div class="Faultphoto-item-type">
                            三级报警
                        </div>
                    </div>
                </div>
              </div>
            </div>
       </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      caritem:{
        default:{}
      }
    },
    data() {
       return {
         data:{}
       }
    },
    mounted() {
      //do something after mounting vue instance
      this.data = this.caritem
      this.chart()
    },
    watch:{
      caritem:{
        handler (val,oldval) {
           this.data = val
           this.chart()
        },
        deep:true
      }
    },
    methods: {
      chart () {
       var option = {
            color:['#4ED8DA','#e06950','#d23342'],
            series: [
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:this.data.countF1,name:"一级报警"},
                        {value:this.data.countF2,name:"二级报警"},
                        {value:this.data.countF3,name:"三级报警"}
                    ]
                }
            ]
        };
        let Jtotal = this.$echarts.init(document.getElementById('J-Faultphoto'))
        Jtotal.setOption(option, true);
      },
      list() {

      }
    }
  }
</script>
<style lang="less" scoped>
 .CANinfo{
  flex: 1;
 }
 .carinfo-item{
   flex: 1;
   display: flex;
   flex-direction:column;
   .M-item-bd{
     margin: 20px;
   }
 }
 .FaultListBox{
   display: flex;
   flex:1;
   flex-direction: row;
   .FaultList{
     flex: 1;
     overflow: auto;
     .table{
        width: 100%;
        margin-bottom: 20px;
        border-collapse: collapse;
        border-spacing: 0;
     }
     .table thead tr th{
       padding: 0 8px;
       background: #1B212F!important;
       color: #fff;
       font-weight: normal;
       height: 48px;
       line-height: 48px
     }
     .table tbody tr td{
       padding: 0 8px;
       color: #fff;
       font-weight: normal;
       height: 48px;
       line-height: 48px
     }
     .table tbody tr >td{
       border: none!important;
     }
     // .table-bordered{
     //   border: #18284a 1px solid;
     // }
    .table tbody tr:nth-child(2n){
      background: #1B212F
    }
   }
   .Faultphoto{
     width: 600px;
     display: flex;
     flex-direction: row;
     margin-right: 50px;
     #J-Faultphoto{
       flex: 1;
       display: flex;
     }
     .Faultphoto-list{
       width: 120px;
       margin-top: 30px;
       .Faultphoto-item{
         display: block;
         overflow: hidden;
         padding-left:20px;
         border-bottom: #222b3f 1px solid;
         padding-bottom: 15px;
         text-align: left;
         position:relative;
         .Faultphoto-item-title{
           font-size: 22px;
           color: #fff;
           height: 40px;
           line-height: 40px;
           i{
             width: 10px;
             height: 10px;
             position: absolute;
             border-radius: 50%;
             top: 15px;
             left:0;
           }
           .F1{
             background:#4ED8DA;
           }
           .F2{
             background:#e06950;
           }
           .F3{
             background:#d23342;
           }
         }
         .Faultphoto-item-type{
           color: #999;
         }
       }
     }
   }
 }
</style>
