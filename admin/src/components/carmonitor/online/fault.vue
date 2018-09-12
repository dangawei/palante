<template>
      <div class="faultbox">
          <div class="faultbox-hd">
            <Table border :columns="columnsdata" :data="faultlist"></Table>
            <!-- <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging> -->
          </div>
          <div class="faultbox-bd">
            <div class="">一级报警{{faultdata.countF1}}次</div>
            <div class="">二级报警{{faultdata.countF2}}次</div>
            <div class="">三级报警{{faultdata.countF3}}次</div>
          </div>
      </div>
</template>
<script>
import Pages from '../../pub/page.vue'
export default {
  name:"fault",
  props: ['Emitsidedata'],
  components: {
    Paging:Pages,
  },
  data() {
    return {
      data:{},
      faultdata:{},
      faultlist:[],
      pageshow:false,
      pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:1,
      },
      columnsdata: [
          {
              title: 'vin',
              key: 'vin'
          },
          {
              title: '时间',
              key: 'createdAt',
              render: (h, params) => {
                var str = this.$webapi.gettime('time', (params.row.createdAt) / 1000)
                 return h('div', [
                     h('span', str)
                 ]);
              },
          },
          {
              title: '经度',
              key: 'longitude',
              render: (h, params) => {
                var str = params.row.longitude / 1000000
                 return h('div', [
                     h('span', str)
                 ]);
              },
          },
          {
              title: '纬度',
              key: 'latitude',
              render: (h, params) => {
                var str = params.row.latitude / 1000000
                 return h('div', [
                     h('span', str)
                 ]);
              },
          },
          {
              title: '报警等级',
              key: 'faultLevel'
          },
          {
              title: '类型',
              key: 'desc'
          }
      ],
    }
  },
  mounted() {
    this.data = this.Emitsidedata

    //this.list()
  },
  watch: {
    Emitsidedata:{
      handler(curVal,oldVal){
　　　   this.data = curVal
         this.list()
　　  },
　　  deep:true
    }
  },
  methods: {
    pageComponentDate (e){
      this.pageData.pageCurrent = e.pageCurrent
      this.list()
    },
    list () {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            vin:this.data.vin
        }
        this.$api.get("/monitor/detail", data, reset => {
          if (reset.codeId === 1) {
              _this.faultdata = reset.resData
              _this.faultlist = reset.resData.faultList
              _this.pageshow = true
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
  .faultbox{
    display: flex;
    width: 100%;
    height: 220px;
    flex: 1;
    flex-direction:column;
    .faultbox-hd{
      flex: 1;
      overflow-y: auto;
      height: 190px;
      margin:0 20px;
    }
    .faultbox-bd{
      display: flex;
      justify-content: space-between;
      height: 30px;
      div{
        width: 33.33%;
        height: 30px;
        line-height: 30px
      }
      div:nth-child(1){
        background: #74bf10;
        color: #fff
      }
      div:nth-child(2){
        background: #efc637;
        color: #fff
      }
      div:nth-child(3){
        background: #d23342;
        color: #fff
      }
    }
  }
</style>
