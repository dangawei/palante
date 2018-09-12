<template>
  <div class="M-style-select M-S-item" :class="{mative:model!==kong}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
      <Select v-model="model" placeholder="选择车型" @on-change="selectitem">
          <Option  value="">全部</Option>
          <Option v-for="item in data" :value="item.id">{{ item.modelName}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
       return {
         data:[],
         model:"",
         newitemdata:{},
         kong:""
       }
     },
     mounted() {
       //do something after mounting vue instance
       this.list()
     },
     methods: {
       list() {
         let _this = this
         let data = {
             token: this.$webapi.get('token')
         }
         this.$api.get('/car_model/list', data, reset => {
           if (reset.codeId === 1) {
               _this.data = reset.resData
           }
        })
      },
      selectitem () {
        var _this = this;
        if(this.model){
          this.data.forEach(function (a) {
            if(a.id==_this.model){
              _this.newitemdata = a
            }
          })
         this.$emit('Emitexportcomponent',this.newitemdata)
       }else{
         this.$emit('Emitexportcomponent',null)
       }
      }
     }
  }
</script>
