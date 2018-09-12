<template>
  <div class="">
    <Select v-model="value"  @on-change="carmodelselect(value)">
       <Option value="" key="">全部</Option>
       <Option v-for="item in alldata" :value="item.brandName" :key="item.brandName">{{ item.brandName }}</Option>
   </Select>
  </div>
</template>
<script>
export default {
  props:['brandname'],
  name: '',
  data () {
    return {
      value:"",
      alldata:[]
    }
  },
  created() {
    this.list()
  },
  mounted() {
    //do something after mounting vue instance   
    this.value = this.brandname
  },
  watch:{
      brandname:{
         handler:function (val, oldVal){
            console.log(val, oldVal)
         },
         deep: true
      }
  },
  methods: {
    list () {
      let _this = this
      var data = {
        token:this.$webapi.get("token"),
        enterpriseId:"",
        name:""
      }
      this.$api.get('/brand/findList',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
          }
      })
    },
    carmodelselect (option) {
      setTimeout(()=>{
        var data = {}
        this.alldata.forEach(function (list){
          if(list.brandName == option){
            data = list
          }
        })
        this.$emit('brandComponentData',data)
      },300)

    }
  }
}
</script>
