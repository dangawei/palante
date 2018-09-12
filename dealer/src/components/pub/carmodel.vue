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
  created() {
    this.list()
  },
  mounted(){
      this.value = this.carModelName
  },
  methods: {
    list () {
      let _this = this
      var data = {
        token:this.$webapi.get("token"),
        brandId:"",
        modelName:""
      }
      this.$api.get('/car_model/list',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
              let data  = reset.resData
              _this.carmodeldata = []
              data.forEach(function (list) {
                  _this.carmodeldata.push(list.modelName)
              })
          }
      })
    },
    carmodelselect (option) {
      var data = {}
      this.alldata.forEach((item)=> {
          if(item.modelName == option){
            data = item
          }
      })
      this.$emit('carmodelselect',data)
    },
    filterMethod (value, option) {
       return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    }
  }
}
</script>
