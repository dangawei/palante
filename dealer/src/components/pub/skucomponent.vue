<template>
  <div class="">
    <Select v-model="carvalue" @on-change="skucode()">
        <Option value="" >全部</Option>
        <Option v-for="item in skudata" :value="item.id" >{{item.skuCodeCombination}}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'skucomponent',
  props: {
      modelId:{
        default:""
      },
      skuId:{
        default:''
      }
  },
  data () {
    return {
         carMId:'',
         carvalue:'',
         skudata:[]
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.carMId = this.modelId
    this.carvalue = this.skuId
    this.list()
  },
  watch:{
      modelId:{
        handler(curVal,oldVal){
            this.skudata = []
            this.carvalue = ""
            this.carMId = curVal
            this.list()
        },
       deep:true
      }
  },
  methods: {
      skucode () {
        this.$emit('skucomponentemit',this.carvalue)
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            carModelId:this.carMId
        }
        this.$api.get('/car_sku/list',data,reset => {
            if (reset.codeId === 1) {
                var data = reset.resData
                _this.skudata = data
            }
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
