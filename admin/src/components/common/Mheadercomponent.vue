<template>
    <div class="M-header-top">
        <div class="M-header-left">
          <a href="/index/">管理后台</a>
          <a href="/M/index/">监控首页</a>
          <a href="/M/list/">监控列表</a>
        </div>
        <div class="M-header-center"></div>
        <div class="M-header-right">
             <div class="">
                <span></span>
               {{userName}}
             </div>
        </div>
    </div>
</template>
<script>
export default {
   components: {},
   data() {
      return {
        userName:''
      }
    },
    mounted() {
      //do something after mounting vue instance
      this.userName = this.$webapi.get("username")
    }
  }
</script>
<style lang="less">
.M-header-top{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  width: 100%;
}
.M-header-center{
  width: 800px;
  background:url("../../assets/header-logo.png") top center no-repeat;
  // background-size: 600px auto;
  height: 110px;
}
.M-header-left{
  flex: 1;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
  a{
    font-size: 18px;
    color: #fff;
    padding-top: 20px;
  }
}
.M-header-right{
  flex: 1;
  color: #fff;
  text-align:right;
  div{
    padding-right: 30px;
  }
  .header-icon{
    vertical-align: middle;
    display: inline-block;
  }
  span{
    background: url("../../assets/usericon.png") center center no-repeat;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    display: inline-block;
    margin: 15px;
  }
}
</style>
