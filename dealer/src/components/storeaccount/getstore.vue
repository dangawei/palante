<template>
  <div class="">
    <Select v-model="value3"  @on-change = "departmentselect">
         <Option v-for="item in alldata" :value="item.name" :key="item.name">{{ item.name }}</Option>
   </Select>
  </div>
</template>
<script>
export default {
  props: ['StoreName'],
  name: '',
  data () {
    return {
      value3: "",
      alldata:[],
      departmentdata:[]
    }
  },
  created() {
    //do something after creating vue instance
    this.list()
  },
  mounted() {
    //do something after mounting vue instance
      this.value3 = this.StoreName
  },
  methods: {
    list () {
      let data={
        token:this.$webapi.get('token')
      }
      let _this = this
      this.$api.get('/dealer_storefront/list',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
          }
      })
    },
    departmentselect (option) {    
      var data = {}
      this.alldata.forEach(function (item) {
          if(item.name == option){
            data = item
          }
      })
      this.$emit('storeselect',data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
