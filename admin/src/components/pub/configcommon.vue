<style scoped lang="less">
</style>
<template>
  <Select v-model="dearvalue" @on-change="dearleSelect(dearvalue)">
      <Option value="" key="">全部</Option>
      <Option v-for="item in dearalldata" :value="item.id" :key="item.id">{{ item.name }}</Option>
  </Select>
   </div>
</template>

<script>
export default {
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
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
              status:1
          }
          this.$api.get('/dealer/getList',data,reset => {
              if (reset.codeId === 1) {
                 _this.dearalldata = reset.resData
              }
          })
      },
      dearleSelect (option) {
        this.$emit('dearleEmitComponent',option)
      }
    }
}

</script>
