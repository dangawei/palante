<!--
  经销商列表组件，返回出来一个对象的
-->
<style scoped lang="less">
</style>
<template>
  <Select v-model="dearvalue" @on-change="dearleSelect(dearvalue)" placeholder="选择经销商">
      <Option value="" key="">全部</Option>
      <Option v-for="item in dearalldata" :value="item.id" :key="item.id">{{ item.name }}</Option>
  </Select>
   </div>
</template>

<script>
export default {
    props:{
      adminSubCompanyId:{
        default:""
      },
      dealerId:{
        default:''
      }
    },
    name: 'index',
    data() {
        return {
          dearvalue:"",
          subCompanyId:"",
          dearalldata:[]
        }
    },
    created() {
      //do something after creating vue instance
      if(this.$webapi.get("adminSubCompanyId") == "undefined" || this.$webapi.get("adminSubCompanyId") =="null"){
          this.subCompanyId = ""
      }else{
          this.subCompanyId = this.$webapi.get("adminSubCompanyId")
      }
      this.list()
    },
    mounted() {
      //do something after mounting vue instance       
      this.dearvalue = this.dealerId
    },
    watch:{
      adminSubCompanyId:{
         handler:function (val,oldval){
            if(val || val==""){
              this.subCompanyId = val
              this.list()
            }
         },
         deep:true
      }
    },
    methods: {
      list () {
          let _this = this
          let data = {
              token:this.$webapi.get('token'),
              status:1,
              subCompanyId:this.subCompanyId,
              dealer_name:""
          }
          this.$api.get('/dealer/getList',data,reset => {
              if (reset.codeId === 1) {
                 _this.dearalldata = reset.resData
              }
          })
      },
      dearleSelect (option) {
        var data = {}
        this.dearalldata.forEach(function (a){
            if(a.id == option){
               data = a
            }
        })
        this.$emit('dearleEmitComponent',data)
      }
    }
}

</script>
