<template>
  <div class="">
    <Select v-model="value3"  @on-change = "departmentselect">
         <Option v-for="item in alldata" :value="item.name" :key="item.name">{{ item.name }}</Option>
   </Select>
  </div>
</template>
<script>
export default {
  props: ['roleConponentName'],
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
      this.value3 = this.roleConponentName
  },
  methods: {
    list () {
      let data={
        token:this.$webapi.get('token'),
        pageNo:1,
        pageSize:50
      }
      let _this = this
      this.$api.get('/dealer_role/page',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData.list
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
      this.$emit('roleselect',data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
