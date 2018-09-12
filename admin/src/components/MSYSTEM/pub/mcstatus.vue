<template>
  <div class="M-style-select M-S-item" :class="{mative:model!==kong}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
      <Select v-model="model" placeholder="车锁状态" @on-change="selectitem">
          <Option value="">全部</Option>
          <Option value="1">开锁</Option>
          <Option value="2">锁车</Option>
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
     },
     methods: {
      selectitem () {
        this.$emit('EmitMc',this.model)
      }
     }
  }
</script>
