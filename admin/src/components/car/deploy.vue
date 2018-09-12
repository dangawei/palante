<template>
<div class="">
  <div class="pageHeader">
      <div class="pageBread">
          <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>车辆管理</BreadcrumbItem>
              <BreadcrumbItem to="/car">车辆型号</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>车辆配置【{{name}}】</h2>
          </div>
      </div>
  </div>
  <div class="page-component-view">
    <div class="page-view allm20">
        <div class="page-view-body" id="J-pageviewbody">
          <div class="" :style="deploywidth">
            <Tabs value="name1" @on-click="tabs">
               <TabPane label="车辆型号属性" :name="name1">
                 <div class="tabbox">
                    <carmodel-component v-if="modelname==name1"></carmodel-component>
                 </div>
               </TabPane>
               <!-- <TabPane label="配置属性" name="name2">
                 <div class="tabbox">
                   <configuration-component v-if="modelname==name2"></configuration-component>
                 </div>
               </TabPane> -->
               <TabPane label="车辆型号配置值设置" :name="name3">
                 <div class="tabbox">
                   <configurationvalue-component v-if="modelname==name3"></configurationvalue-component>
                 </div>
               </TabPane>
            </Tabs>
          </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import carmodelComponent from "./carmodel/list.vue"
import configurationComponent from "./carconfiguration/list.vue"
import configurationvalueComponent from "./carconfigurationvalue/list.vue"
export default {
    components: {
      carmodelComponent,
      configurationComponent,
      configurationvalueComponent
    },
    created() {
      //do something after creating vue instance
    },
    data() {
        return {
           show:true,
           deploywidth:{},
           name:"",
           modelname:'name1',
           name1:'name1',
           name2:'name2',
           name3:'name3'
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.deploywidth = {
        width:document.getElementById("J-pageviewbody").offsetWidth-64+"px"
      }
      this.show = true
      this.name = this.$route.params.title
    },
    methods: {
      tabs (e) {
        this.modelname = e
      }
    }
}
</script>
<style lang="less" scoped>
.tabbox{
  width: 100%
}
</style>
