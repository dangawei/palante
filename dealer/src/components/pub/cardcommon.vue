<template>
  <div>
    <Input style="width:280px">
      <div class="" slot="prepend" style="width:300px;float:left">
        <Select v-model="value" placeholder="请选择车型"  style="width:150px;float:left" @on-change="carmodeldata">
          <Option v-for="item in itemdata" :value="item.id" :key="item.id">{{ item.modelName }}</Option>
        </Select>
        <Select v-model="carskuvalue" placeholder="请选择SKU" style="width:150px;float:left" v-if="skucard.length>0" @on-change="skuCodeCombination">
          <Option v-for="item in skucard" :value="item.id" :key="item.id ">{{ item.skuCodeCombination}}</Option>
        </Select>
      </div>
   </Input>
      <!-- <Input v-model="carvalue" placeholder="" icon="arrow-down-b" @on-focus="htmtl">
        <div v-if="show">
          <div class="" style="width:50%;float:left">
            <Select v-model="value" style="width:100%;float:left" @on-change="carmodeldata">
              <Option v-for="item in itemdata" :value="item.id" :key="item.id">{{ item.modelName }}</Option>
            </Select>
          </div>
          <div class="" style="width:50%;float:left">
            <Select v-model="carskuvalue" style="width:100%;float:left" v-if="skucard.length>0" @on-change="skuCodeCombination">
              <Option v-for="item in skucard" :value="item.id" :key="item.id ">{{ item.skuCodeCombination}}</Option>
            </Select>
          </div>
        </div>
      </Input> -->
  </div>
</template>
<script>
export default {
    data () {
      return {
        value:"",
        show:false,
        itemdata:[],
        skucard:[],
        carvalue:"",
        carskuvalue:""
       }
    },
    mounted() {
      //do something after mounting vue instance
      this.carmodel()
    },
    methods: {
      inputblur() {
        this.show = !this.show
      },
      htmtl () {
        this.show = !this.show
      },
      carmodeldata () {
         this.carsku(this.value)
      },
      skuCodeCombination () {
        var data = []
        for(var i =0 ;i < this.itemdata.length;i++){
          if(this.value == this.itemdata[i].id){
              data.push(this.itemdata[i])
          }
        }
        for(var i =0 ;i < this.skucard.length;i++){
          if(this.value == this.skucard[i].id){
              data.push(this.skucard[i])
          }
        }
        this.carvalue = data[0].modelName+"/"+data[1].skuCodeCombination
        console.log(data)
        this.$emit('cardcommon',data)
        this.show = false
      },
      carmodel() {
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
        }
        this.$api.get('/car_model/list',listdata,reset => {
          if (reset.codeId === 1) {
             _this.itemdata = reset.resData
             console.log(_this.itemdata)
          }
        })
      },
      carsku (a){
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
          carModelId:a
        }
        this.$api.get('/car_sku/list',listdata,reset => {
          if (reset.codeId === 1) {
              _this.skucard = reset.resData
          }else if(reset.codeId === -9){
              _this.skucard = []
          }
        })
      }
    }
  }
</script>
