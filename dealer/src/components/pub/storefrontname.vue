<template>
      <div class="">
        <Select v-model="model1" @on-change="store">
            <Option  value="" key="">全部</Option>
            <Option v-for="item in storelist" :value="item.id">{{ item.name }}</Option>
        </Select>
      </div>
</template>
<script>
    export default {
        props:{
          shopID:{
            default:""
          }
        },
        data () {
            return {
                model1:'',
                storelist:[]
            }
        },
        watch:{
          shopID:{
            handler:function (val,oldval) {
              if(val){
                this.model1 = parseInt(val)
              }
            },
            deep:true
          }
        },
        mounted() {
          //do something after mounting vue instance
          this.list()
        },
        methods: {
            list () {
              var _this =  this
              var listdata = {
                token:this.$webapi.get('token'),
              }
              this.$api.get('/dealer_storefront/list',listdata,reset => {
                if (reset.codeId === 1) {
                   _this.storelist = reset.resData
                }
              })
            },
          store () {
            var data = {}
            var _this = this;
            this.storelist.forEach(function (a) {
              if(a.id == _this.model1){
                data = a
              }
            })
            this.$emit("storeEmit",data)
          }
        }
    }
</script>
