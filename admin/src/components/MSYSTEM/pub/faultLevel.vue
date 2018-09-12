<template>
  <div class="M-style-select M-S-item" :class="{mative:model!==kong}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
      <Select v-model="model" placeholder="报警等级" @on-change="selectitem">
          <Option value="">全部</Option>
          <Option value="1">一级</Option>
          <Option value="2">二级</Option>
          <Option value="3">三级</Option>
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
        this.$emit('faultLevelexportcomponent',this.model)
      }
     }
  }
</script>
