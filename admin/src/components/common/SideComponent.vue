<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i>{{title}}后台管理</div>
        <Scroll :height='muneheight'>
            <Menu  theme="light" width="auto" :open-names="['1']" :theme="theme2"  @on-select="changeMenu" accordion>
                  <div class="">
                    <Submenu :name="index" v-for="(item,index) in items" v-if="item.isShow!=-1" >
                        <template slot="title">
                            <span v-if="item.icon"><Icon :type="item.icon"></Icon></span>
                            <span v-else><Icon type="ios-navigate"></Icon></span>
                            {{item.name}}
                        </template>
                          <MenuItem :name="(index)+'-'+(itemlistindex)" v-for="(itemlist,itemlistindex) in item.adminResourcesDoList" v-if="itemlist.isShow!=-1">
                             {{itemlist.name}} {{itemlist.isshow}}
                          </MenuItem>
                    </Submenu>
               </div>
           </Menu>
       </Scroll>
   </div>
</template>
<script>
export default {
  name: 'SideMenu',
  props:["height"],
  data () {
    return {
       items:[],
       title:"",
       muneheight:"",
       theme2:'dark'
    }
  },
  //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
  beforeCreate () {
    let _this = this
    let data = {
      token:this.$webapi.get('token')
    }
    this.$api.get('/admin_role/getByToken',data,reset => {
        if (reset.codeId === 1) {
            var data = reset.resData
            _this.items = data
            _this.items.sort(_this.compare('resourcesOrder'))
            _this.items.forEach(function (a){
              if(a.adminResourcesDoList.length>0){
                a.adminResourcesDoList.sort(_this.compare('resourcesOrder'))
              }
            })
        }else {
          _this.$netcode.getApiCode(reset)
       }
    })
  },
  mounted() {
    //do something after mounting vue instance
    this.muneheight = this.height || 0
    this.userType()

  },
  methods: {
    userType () {
      var userType =this.$webapi.get('accountType')
          if(userType==1){
            this.title = "总公司"
          }
          if(userType==2){
            this.title = "分公司"
          }
    },
    compare (property) {
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return  value1 - value2  ;
      }
    },
    changeMenu (e) {
      var muneindex = e.split("-")[0]
      var itemindex = e.split("-")[1]
      this.$router.push({path:this.items[muneindex].adminResourcesDoList[itemindex].path})
       //window.location.href = this.items[muneindex].adminResourcesDoList[itemindex].path
    }
  },
  watch:{
     height:function (e) {
       this.muneheight = this.height
     }
  }
}
</script>

<style>
.SideMenuComponent .subitemest{
  color: #fff
}
.mermber-logo{
  height: 64px;
  position: relative;
  line-height: 64px;
  /* padding-left: 24px; */
  -webkit-transition: all .3s;
  transition: all .3s;
  background: #002140;
  overflow: hidden;
  color: #fff;
  text-align: left;
  font-size: 18px;
}
.mermber-logo i{
  display: inline-block;
  background:url(../../assets/logo.png);
  background-repeat: no-repeat;
  background-size: 35px;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top:10px;
  float:left;
  margin-right: 10px;
}
.ivu-scroll-container{
    overflow-y:auto!important
}
.ivu-menu-dark{
   background: #001529!important
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #000c17!important;
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background: #001529!important
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background: #001529!important
}
</style>
