<template>
  <div class="M-style-select M-S-item" :class="{mative:areaDatas.length>0}">
    <div class="M-S-hd">
        <span class="M-S-left"></span>
        <span class="M-S-right"></span>
    </div>
    <div class="M-S-bd">
       <al-cascader v-model="areaDatas" :level="level" @on-change="areaComponent" :disabled="ciytshow==0" placeholder="选择省份"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      level:{
        type: Number,
        default:0
      },
      areaData:{
        type: Array,
        default:[]
      },
      ciytshow:{
        default:1
      }
    },
    data() {
       return {
         areaDatas:[],
         level:'',
         kong:""
       }
     },
   methods: {
     areaComponent () {
         this.areaEmit()
     },
     areaEmit () {
       if(this.areaDatas.length>0){
         this.$emit("areaEmit",this.areaDatas)
       }else{
         var str = [{code:"",name:""}]
         this.$emit("areaEmit",str)
       }
     }
   }
  }
</script>
