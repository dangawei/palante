<template>
  <div class="warpbox">
      <div class="loginbox" >
         <div class="loginbox-hd">
         </div>
         <div class="loginbox-bd">
            <div class="login-item">
              <Input v-model="mobile" placeholder="用户名" size="large" style="margin-bottom:10px"></Input>
            </div>
            <div class="login-item">
              <div class="" v-if="passwordshow">
                  <Input type="password" v-model="password" placeholder="请输入密码"  size="large" icon="eye-disabled"  @on-click="password01()"></Input>
              </div>
              <div class="" v-else>
                  <Input v-model="password" placeholder="请输入密码" icon="eye"  size="large" @on-click="password01()"></Input>
              </div>
                <!-- <Input v-model="password" type="password" placeholder="admin/password" size="large" style="margin-bottom:10px"></Input> -->
            </div>
            <div class="loginBtn">
              <span @click="login(1)"><Button type="primary" size="large" :disabled='this.mobile=="" || this.password==""' long>进入管理平台</Button></span>
              <span @click="login(2)"><Button type="primary" size="large" :disabled='this.mobile=="" || this.password==""' long>进入监控平台</Button></span>
            </div>
         </div>
      </div>
      <div class='showbikeinfo'>
     </div>
  </div>
</template>

<script>
let axios = require('axios')
export default {
  name: 'login',
  data () {
    return {
      passwordshow:true,
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
    password01 () {
      this.passwordshow = !this.passwordshow
    },
    login (e) {
      var url = "/admin_account/login?loginName=" + this.mobile + " &password=" + this.password
      let _this = this
      this.$api.get(url, null, reset => {
        if (reset.codeId === 1) {
            let data = reset.resData
            _this.$webapi.save('token',data.token)
            _this.$webapi.save('username',data.name)
            _this.$webapi.save('status',data.status)
            _this.$webapi.save('accountType',data.accountType)
            _this.$webapi.save('adminSubCompanyId',data.adminSubCompanyId)
            if(e==1){
              _this.$router.push({path:'/index/'})
            }else if(e==2) {
              _this.$router.push({path:'/M/index/'})
            }
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
    .loginBtn{
      display:flex;
      flex-direction: row;
      width: 100%;
      margin-top: 20px;
      span{
        flex:1;
        padding: 0 5px;
      }
    }
    .warpbox{
      width: 100%;
      height: 100vh;
      background: url("../assets/bg.jpg") center center;
      display: flex;
      flex: 1;
      justify-content:center;
      align-items: center;
    }
    .loginbox{
       border-radius:2px;
       width: 400px;
       background: -webkit-linear-gradient(left,rgba(0, 149, 192, 1),rgba(26, 46, 125, 1))!important;
       border: #4d5c66 1px solid;
       border-radius: 15px;
      .loginbox-hd{
        text-align: left;
        background: url("../assets/login-hd.png") center center no-repeat;
        height: 80px;
        border-radius: 15px 15px 0 0;
        h2{
          font-size: 20px;
          font-weight: normal;
        }
      }
      .loginbox-bd{
        padding: 30px;
        .login-item{
          margin-bottom: 20px;
        }
      }
    }
</style>
