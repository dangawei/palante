<template>
   <div id="J_Headernav">
      <div class="">
          <span @click="tabs" class="mune-tab"><Icon type="android-menu"></Icon></span>
      </div>
      <div class="">
         <ul class='headernav'>
           <li>
             <Dropdown trigger="hover"  @on-click='doMore'>
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
  name: 'Header',
  data () {
    return {
      items:{
        name:this.$webapi.get('username')
      }
    }
  },
  methods: {
     tabs(){
         this.$emit('headerdata')
     },
     doMore (name) {
       if(name=="loginout"){
         this.loginout()
       }
     },
     loginout:function (){
           let _this = this
           let data = {
               token: this.$webapi.get('token')
           }
           this.$api.post('/dealer_account/login_out', data, reset => {
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
    background: #fff;
    justify-content:space-between;
    height: 64px;
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
