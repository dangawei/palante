<template>
  <div class="">
    <Select v-model="valuedata" filterable @on-change="carmodelselect(valuedata)">
       <Option value="" key="">{{valuename}}</Option>
       <Option v-for="item in alldata" :value="item.id" :key="item.brandName">{{ item.brandName }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  props:['brandname'],
  name: '',
  data () {
    return {
      valuedata: '',
      valuename:'',
      alldata:[],
      carmodeldata:[]
    }
  },
  created() {
    console.log(this.brandname)
    this.list()
  },
  mounted(){

    this.valuename=this.brandname
    console.log(this.brandname);
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
      var data = {}
       this.alldata.forEach(function (list){
         if(list.id == option){
           data = list
        }
       })
      this.$emit('brandComponentData',data)
    }
  }
}
</script>
