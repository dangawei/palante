<template>
    <div class="M-layout">
      <div class="M-layout-top">
          <header-component></header-component>
      </div>
      <div class="M-layout-center">
        <transition name="fade">
          <router-view/></router-view>
        </transition>
      </div>
    </div>
</template>
<script>
import headerComponent from "../components/common/Mheadercomponent"
export default {
   components: {
     headerComponent
   },
   data() {
      return {
      }
    }
  }
</script>
<style lang="less">
  @import "../css/M.less";
  body{
    background: #0A142A!important
  }
  .M-layout{
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    color: #fff;
    width: 100%;
    height:100vh;
  }
  .M-layout-top{
    height: 110px
  }
  .M-layout-center{
    display: flex;
    flex:1;
    flex-direction: row;
    width: 100%
  }
</style>
