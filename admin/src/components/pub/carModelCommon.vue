<template>
  <Select v-model="value" @on-change="departmentselect(value)">
      <Option v-for="item in alldata" :value="item.categoryName" :key="item.categoryName">{{item.categoryName}}</Option>
  </Select>
</template>
<script>
export default {
    props: [
        'carModelName'
    ],
    data() {
        return {
            value:"",
            alldata:[]
        }
    },
    created(){
      this.list()
    },
    mounted() {
      //do something after mounting vue instance
      this.value = this.carModelName
    },
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
              name:""
          }
          this.$api.get('/car_model_category/list',data,reset => {
              if (reset.codeId === 1) {
                  _this.alldata = reset.resData
              }else {
                  _this.$netcode.getApiCode(reset)
              }
          })
      },
      departmentselect (option) {
        setTimeout(()=>{
          var data = {}
          this.alldata.forEach(function (item) {
              if(item.categoryName == option){
                data = item
              }
          })
          this.$emit('carModelselect',data)
        },300)
      }
    }
}

</script>
