<style scoped>
body{
    background: #495060;
}
.layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.web-shell{
    width: 100%;
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
}
.web-shell-hd{
    width: 100%;
    height: 60;
}
.web-shell-bd{
    flex:1;
    overflow-y:auto;
}
.mermber-logo{
  float:left;
  color:#fff;
  font-size:20px;
}
.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
<template>
    <div class="layout">
      <Layout>
        <Row>
            <Col :style="widthdata">
              <Side-menu :height="sideHeight" v-if="sideshow"></Side-menu>
            </Col>
            <Col :style="widthdataright" >
              <div class="web-shell">
                <div class="web-shell-hd">
                 <header-component @headerdata="headerdata"></header-component>
                </div>
                <div class="web-shell-bd">
                  <Content v-show="show">
                      <transition name="fade">
                        <router-view/></router-view>
                     </transition>
                  </Content>
                </div>
              </div>
            </Col>
        </Row>
      </Layout>
    </div>
</template>
<script>
  import SideMenu from '../components/common/SideComponent'
  import HeaderComponent from '../components/common/HanderComponent'
  export default {
    name: 'index',
    components: {
      HeaderComponent:HeaderComponent,
      SideMenu:SideMenu
    },
    data () {
      return {
        sideshow:false,
        show:true,
        sideHeight:0,
        muneheight:100,
        widthnum:240,
        widthdata:{},
        widthdataright:{}
      }
  },
  created() {
    //do something after creating vue instance
    this.widthdata = {
      width:this.widthnum+"px",
      float:"left",
      background:"#001529",
      "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
      "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
       position: "relative",
       "z-index":100,
       overflow:"hidden"
    }
    this.widthdataright = {
      display:"block",
      "margin-left":this.widthnum+"px",
    }
  },
  mounted() {
    //do something after mounting vue instance
      this.sideHeight = window.innerHeight-64
      this.widthdata = {
        width:this.widthnum+"px",
        float:"left",
        background:"#001529",
        "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
        "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
         position: "relative",
         "z-index":100,
          overflow:"hidden"
      }
      this.widthdataright = {
        display:"block",
        "margin-left":this.widthnum+"px",
      }
      this.watchwidth()
      this.sideshow = true
  },
  watch:{
    widthnum:function (a,c){
      this.widthdata = {
        width:this.widthnum+"px",
        float:"left",
        background:"#001529",
        "box-shadow":"2px 0 6px rgba(0,21,41,.35)",
        "webkit-box-shadow":"2px 0 6px rgba(0,21,41,.35)",
         position: "relative",
         "z-index":100,
          overflow:"hidden"
      }
      this.widthdataright = {
        display:"block",
        "margin-left":this.widthnum+"px",
         width:(document.body.offsetWidth)-this.widthnum+"px"
      }
    }
  },
  methods: {
    headerdata() {
       if(this.widthnum==240){
         this.widthnum=0
       }else{
         this.widthnum=240
       }
    },
    watchwidth () {
      var _this = this
      window.onresize = function () {
        _this.sideHeight = window.innerHeight-64
        if(document.body.offsetWidth<780){
          _this.widthnum = 0
        }else if(document.body.offsetWidth>780){
          _this.widthnum = 240
        }
      }
    }
  }
}
</script>
