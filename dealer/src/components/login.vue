<template>
  <div class="warpbox">
      <div class="loginbox" >
         <div class="loginbox-hd">
         </div>
         <div class="loginbox-bd">
            <div class="login-item">
              <Input v-model="mobile" placeholder="user" size="large" style="margin-bottom:10px"></Input>
            </div>
            <div class="login-item">
                <Input v-model="password" type="password" placeholder="password" size="large" style="margin-bottom:10px"></Input>
            </div>
            <div class="" @click="login()">
              <Button type="primary" size="large" :disabled='this.mobile=="" || this.password==""' long>登录</Button>
            </div>
         </div>
      </div>
      <div class='showbikeinfo'>
     </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      mobile: "",
      password: "",
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.enter()
  },
  methods: {
    enter () {
      var _this = this;
      document.onkeydown = function(e) {
          e = e || window.event;
          if(e.keyCode == 13) {
              if(_this.$route.path=="/login"){
                _this.login()
              }
              return false
          }
      }
    },
    login () {
      var url = "/dealer_account/login?loginName=" + this.mobile + " &password=" + this.password
      let _this = this
      this.$api.get(url, null, reset => {
        if (reset.codeId === 1) {
            let data = reset.resData
              _this.$webapi.save('token',data.token)
              _this.$webapi.save('username',data.name)
              _this.$webapi.save('status',data.status)
              _this.$webapi.save('accountType',data.accountType)
              _this.$router.push({path:'/'})
          }else {
             _this.$netcode.getApiCode(reset)
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .warpbox{
      width: 100%;
      height: 100vh;
      background: url("../assets/bg.jpg") center center;
      background-size: 100% 100%;
      display: flex;
      flex: 1;
      justify-content:center;
      align-items: center;
    }
    .loginbox{
       border-radius:2px;
       width: 300px;
      .loginbox-hd{
        padding: 10px;
        text-align: left;
        h2{
          font-size: 20px;
          font-weight: normal;
        }
      }
      .loginbox-bd{
        padding: 10px;
        .login-item{
          margin-bottom: 20px;
        }
      }
    }
</style>
