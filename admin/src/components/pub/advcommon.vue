<style scoped lang="less">
</style>
<template>
  <Select v-model="dearvalue" @on-change="advcommon(dearvalue)" :disabled="advshow==0">
      <Option value="" key="">全部</Option>
      <Option v-for="item in dearalldata" :value="item.id" :key="item.id">{{ item.locationDescribe }}</Option>
  </Select>
   </div>
</template>

<script>
export default {
    props: {
      advID:{
        default:''
      },
      advshow:{
        default:1
      }
    },
    name: 'index',
    data() {
        return {
          dearvalue:"",
          dearalldata:[]
        }
    },
    created() {
      //do something after creating vue instance
      this.list()
    },
    mounted() {
      //do something after mounting vue instance
      this.dearvalue = this.advID
    },
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
              status:1,
              pageNo:1,
              pageSize:"10000"
          }
          this.$api.get('/advertisingLocation/page',data,reset => {
              if (reset.codeId === 1) {
                 _this.dearalldata = reset.resData.list
              }
          })
      },
      advcommon (option) {
        this.$emit('EmitAdv',option)
      }
    }
}

</script>
