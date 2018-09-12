<template>
  <div class="">
     <Button type="primary" :disabled="this.data.length<1 && saveshow">提交出库单</Button>
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
