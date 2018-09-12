<template>
  <div class="M-style-select M-S-item" :class="{mative:model!==kong}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
      <Select v-model="model" placeholder="车辆状态" @on-change="selectitem">
          <Option value="">全部</Option>
          <Option value="1">在线停车</Option>
          <Option value="2">在线行驶</Option>
          <Option value="3">离线设备</Option>
          <Option value="4">库存设备</Option>
          <Option value="5">到期设备</Option>
          <Option value="6">拆除报警</Option>
          <Option value="7">断电报警</Option>
          <Option value="8">超速报警</Option>
          <Option value="9">区域报警</Option>
          <Option value="10">充电状态</Option>           
          <Option value="11">其它状态</Option>
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
        this.$emit('Emitexportcomponent',this.model)
      }
     }
  }
</script>
