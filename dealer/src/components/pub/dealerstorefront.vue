<template>
  <div class="">
    <Select v-model="value" @on-change="carmodelselect(value)">
        <Option value="" >全部</Option>
        <Option v-for="item in alldata" :value="item.modelName" >{{item.modelName}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  props:['carModelName'],
  name: '',
  data () {
    return {
      value: "",
      alldata:[],
      carmodeldata:[]
    }
  }, 
  mounted(){
    this.list()
  },
  methods: {
    list () {
      let _this = this
      var data = {
        token:this.$webapi.get("token")
      }
      this.$api.get('/dealer_storefront/list',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
          }
      })
    }
  }
}
</script>
