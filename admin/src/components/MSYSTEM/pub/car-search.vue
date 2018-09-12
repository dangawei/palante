<template>
  <div class="M-style-select M-S-item" :class="{mative:model!==kong}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
      <Select v-model="model" placeholder="选择经销商" @on-change="selectitem">
          <Option value="">全部</Option>
          <Option v-for="item in data" :value="item.id">{{ item.name }}</Option>
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
         this.$api.get('/dealer/getList', data, reset => {
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
