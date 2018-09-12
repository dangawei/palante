<style scoped lang="less">
</style>
<template>
  <Select v-model="dearvalue" @on-change="advcommon(dearvalue)">
      <Option value="" >全部</Option>
      <Option v-for="item in dearalldata" :value="item.id">{{ item.name }}</Option>
  </Select>
   </div>
</template>

<script>
export default {
    name: 'warehouse',
    props: ['warehouseID'],
    data() {
        return {
          dearvalue:'',
          dearalldata:[]
        }
    },
    created() {
      //do something after creating vue instance
      this.list()
    },
    mounted() {
      //do something after mounting vue instance
      if(this.warehouseID){
          this.dearvalue = parseInt(this.warehouseID)
      }      
    },
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token')
          }
          this.$api.get('/warehouse/list',data,reset => {
              if (reset.codeId === 1) {
                 _this.dearalldata = reset.resData
              }
          })
      },
      advcommon (option) {
        this.$emit('wareemitcomponent',option)
      }
    }
}

</script>
