<template>
 <div class="">
    <div class="faulttime" id="J-carmonitor">

    </div>
 </div>
</template>
<script>
export default {
  name:"can",
  props: ['vin','outdata'],
  data() {
    return {
      data:{},
      settime:'',
      vinNo:""
    }
  },
  mounted() {
    this.vinNo = this.vin
    this.settime = this.outdata.startTime
    this.list()
  },
  watch: {
    Emitsidedata:{
      handler(curVal,oldVal){
　　　   this.data = curVal
　　  },
　　  deep:true
      },
      outdata:{
        handler(curVal,oldVal){
          if(curVal!==""){
            this.settime = curVal.startTime
          }else{
            this.settime = oldVal.startTime
          }
          this.list()
        },
       deep:true
      }
  },
  methods: {
    list() {
      var _this = this
      var data = {
          token:this.$webapi.get("token"),
          pageNum:1,
          pageSize:1,
          vin:this.vinNo
      }
      if(this.settime !== ""){
        data.startTime = this.settime+" 00:00:00",
        data.endTime = this.settime+" 23:59:59"
      }
      this.$api.get("/command/car/fault/list", data, reset => {
        if (reset.codeId === 1) {
            var str = []
            str.push(reset.resData.count1?reset.resData.count1:0)
            str.push(reset.resData.count2?reset.resData.count2:0)
            str.push(reset.resData.count3?reset.resData.count3:0)
            _this.data = str
            _this.echarts()
        }
        else {
          _this.$netcode.getApiCode(reset)
       }
     })
   },
   echarts () {
     let speed = this.$echarts.init(document.getElementById('J-carmonitor'))
     var option = {
         title: {
           text: '报警次数',
           textStyle:{
             color:'#333',
             fontWeight: 100,
             fontSize:14
           }
         },
         color: ['#3398DB'],
         tooltip : {
             trigger: 'axis',
             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
             }
         },
         grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
         },
         xAxis : [
             {
                 type : 'category',
                 data : ['一级报警', '二级报警', '三级报警', ],
                 name:"报警类型",
                 axisTick: {
                     alignWithLabel: true
                 }
             }
         ],
         yAxis : [
             {
                 type : 'value'
             }
         ],
         series : [
             {
                 name:'报警次数',
                 type:'bar',
                 barWidth: '60%',
                 data:this.data
             }
         ]}
     speed.setOption(option, true)
   }
  }
}
</script>
<style lang="less" scoped>
   .faulttime{
     height: 220px;
     width: 100%
   }
</style>
