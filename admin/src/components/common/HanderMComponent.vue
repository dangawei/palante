<template>
   <div id="J_Headernav">
      <div class="">
          <span class="headerTxt"><i class="logo"></i>超威运营 . 车联网智能平台</span>
      </div>
      <div class="">
         <ul class='headernav'>
           <li class="headernavlist">
             <Dropdown trigger="hover" @on-click='doMore'>
                  <a href="javascript:void(0)" class="system-header"><span class="mr10"><Avatar icon="stats-bars" /></span>车辆监控管理</a>
                  <DropdownMenu slot="list">
                      <DropdownItem name='index'>监控统计</DropdownItem>
                      <DropdownItem name='list'>监控列表</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
           </li>
           <li class="headernavlist">
             <Dropdown trigger="hover" @on-click='doMore'>
                  <a href="javascript:void(0)" class="system-header"><span class="mr10"><Avatar icon="stats-bars" /></span>第三方监控</a>
                  <DropdownMenu slot="list">
                      <DropdownItem name='bochuang'>博创联动</DropdownItem>
                      <DropdownItem name='jmev'>江铃平台</DropdownItem>
                      <DropdownItem name='cgqc'>成功集团</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
           </li>
           <li class="headernavlist">
             <Dropdown trigger="hover" @on-click='doMore'>
                  <a href="javascript:void(0)" class="system-header"><span class="mr10"><Avatar icon="person" /></span>{{items.name}}</a>
                  <DropdownMenu slot="list">
                      <DropdownItem name='loginout'>退出</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
           </li>
         </ul>
      </div>
   </div>
</template>

<script>
export default {
  props:{
    sorshow:{
      default:0
    }
  },
  name: 'Header',
  data () {
    return {
      items:{
        name:this.$webapi.get('username')
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
  },
  methods: {
     tabs(){
        this.$emit('headerdata')
     },
     doMore:function (name){
        if(name=="loginout"){
          this.loginout()
        }
        else if(name=="bochuang"){
           window.open("http://qas.umlxny.com/index.html")
        }
        else if(name=="jmev"){
           window.open("http://117.21.76.138:8088/CarinfoMonitor1/index.html")
        }
        else if(name=="cgqc"){
           window.open("http://ev.cgqc.cn:86/")
        }else if(name == "index"){
          window.location.href="/monitorindex/index/"
        }else if(name == "list"){
          window.location.href="/carmonitor/list/"
        }
     },
     loginout:function (){
             let _this = this
             let data = {
                 token: this.$webapi.get('token')
             }
             this.$api.post('/admin_account/login_out', data, reset => {
               if (reset.codeId === 1) {
                 _this.$webapi.save('token',"")
                 _this.$router.push({path:"/login"})
               }
               else {
                   _this.$netcode.getApiCode(reset)
               }
         })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #J_Headernav{
    display: flex;
    flex-direction:row;
    width: 100%;
    flex: 1;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    background: #263a4e;
    justify-content:space-between;
    height: 64px;
    position: relative;
    z-index: 10
  }
  .headerTxt{
    line-height: 60px;
    height: 60px;
    color: #fff;
    font-size: 20px;
    .logo{
      background: url(../../assets/mlogo.png);
      background-size: 40px 40px;
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin:0 10px
    }
  }
  .system-header{
    line-height: 64px;
    height: 64px;
    display: block;
    padding: 0 15px;
    color: #666
  }
  .system-header:hover{
    background: #f8f8f8
  }
  .headernav{
    .headernavlist{
      display: inline-block;
    }
  }
  .mune-tab{
    line-height: 60px;
    padding: 0 10px;
    cursor:pointer;
    font-size: 18px;
  }
</style>
