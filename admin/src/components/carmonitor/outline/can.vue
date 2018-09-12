<template>
  <div class="canshow">
       <div class="carshow-bd" style="margin:-10px  10px 0 10px">
           <div class="">
              <Table :columns="columns1" :data="data1"></Table>
           </div>
            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
       </div>
  </div>
</template>
<script>
import Pages from '../../pub/page.vue'
import {vm} from '../../../js/infobase/vm.js'
export default {
  name:"can",
  props: ['vin',"outdata"],
  components:{
    paging:Pages
  },
  data() {
    return {
      data1:[],
      onlinedata:{},
      soc:{},
      tabnum:1,
      pageshow:true,
      columns1:[
        {
            title: 'VIN码',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.vin)
              ]);
            },
            className:'ivu-table-column-center'
        },
        // {
        //     title: '终端号',
        //     key: 'id',
        //     render: (h, params) => {
        //       return h('div', [
        //           h('span', params.row.vin)
        //       ]);
        //     },
        //     className:'ivu-table-column-center'
        // },
        {
            title: 'GPS时间',
            key: 'id',
            render: (h, params) => {
              var str= this.$webapi.gettime('time', (params.row.createdAt) / 1000)
              return h('div', [
                  h('span', str)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '车牌',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.licencePlateNumber)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '电机转速(rpm)',
            key: 'id',
            render: (h, params) => {
              var str = 0
              if(params.row.monitorSpeed){
                str = params.row.monitorSpeed
              }
              return h('div', [
                  h('span', str)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '电流(A)',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.current)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '电压(V)',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.voltage)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '速度',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.speed)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '总里程',
            key: 'id',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.distance/100)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '经度',
            key: 'longitude',
            render: (h, params) => {
              var str = params.row.longitude
              return h('div', [
                h('span', str)
            ])
            },
            className:'ivu-table-column-center'
        },
        {
            title: '纬度',
            key: 'latitude',
            render: (h, params) => {
              var str = params.row.latitude
              return h('div', [
                h('span', str)
            ])
            },
            className:'ivu-table-column-center'
        }
      ],
      pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:3,
      },
      vinNo:"",
      settime:''
    }
  },
  mounted() {
    this.vinNo = this.vin
    this.settime = this.outdata.startTime || this.$webapi.gettime("date",(new Date().getTime())/1000)
    //this.list()
  },
  watch: {
    vin:{
      handler(curVal,oldVal){
        this.vinNo = curVal
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
         if(curVal!==oldVal&&oldVal!==""){
            this.pageData.pageCurrent =1
            this.list()
         }
　　  },
　　  deep:true
    }
  },
  methods: {
    pageComponentDate (e) {
      this.pageData.pagesize = e.pagesize
      this.pageData.pageCurrent = e.pageCurrent
      this.list()
    },
    list() {
      var _this = this
      var data = {
          token:this.$webapi.get("token"),
          pageNum:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          vin:this.vinNo,
          startTime:this.settime+" 00:00:00",
          endTime:this.settime+" 23:59:59"
      }
      this.$api.get("/monitor/detail/page", data, reset => {
        if (reset.codeId === 1) {
          _this.data1 = reset.resData.list
          _this.pageData.totalCount = reset.resData.totalPage
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
  .ivu-picker-panel-body{
    color: #999!important
  }
  .canshow{
    position:relative;
    .carshow-bd{
      overflow: hidden;
      height: 240px;
    }
  }
</style>
