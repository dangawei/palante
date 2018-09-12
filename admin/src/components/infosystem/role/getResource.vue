<template>
  <div class="">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>基础信息</BreadcrumbItem>
                <BreadcrumbItem to="/role">角色管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>权限设置</h2>
            </div>
        </div>
    </div>
    <div class="getResourceAll">
       <div class="resourcelist" v-for="(item,itemindex) in itemdata" style="margin-bottom:20px">
          <div class="resourcelist-hd" style="margin-bottom:10px">
             <span @click="first(item,itemindex)"><Checkbox v-model="item.checkedshow" size="large"></Checkbox></span>{{item.name}}
          </div>
          <div class="resourcelist-bd">
              <div class="resourcelist" style="margin-left:20px;margin-bottom:10px" v-for="(itemrole,index) in item.adminResourcesDoList">
                 <div class="resourcelist-hd" style="margin-bottom:10px" >
                  <span @click="second(itemrole,item,index)"><Checkbox v-model="itemrole.checkedshow" size="large"></Checkbox></span>{{itemrole.name}}
                 </div>
                 <div class="resourcelist-bd" style="margin-left:30px;margin-bottom:5px" v-if="itemrole.adminResourcesDoList.length>0" >
                     <div  v-for="itemrolelist in itemrole.adminResourcesDoList">
                        <span @click="three(itemrolelist,index,itemindex)"><Checkbox v-model="itemrolelist.checkedshow" size="large"></Checkbox>{{itemrolelist.name}}</span>
                     </div>
                 </div>
              </div>
          </div>
       </div>
   </div>
   <div>
      <div class="" >
        <span @click="save()" >
          <Button type="success" size="large">保存</Button>
        </span>
      </div>
   </div>
  </div>
</template>
<script>
export default {
  name: 'Ressource',
  created() {
    //do something after creating vue instance
    this.subfrom.roleId = this.$route.params.id
    this.list()
  },
  data () {
    return {
        subfrom:{
            roleId:""
        },
        itemdata:[],
        newitemdata:{
          roleResources:[]
        }
    }
  },
  methods:{
    first (item,index) {
      let show =  item.checkedshow = !item.checkedshow
      item.adminResourcesDoList.forEach(function (list) {
          list.checkedshow = show
          if(list.adminResourcesDoList.length>0){
             list.adminResourcesDoList.forEach(function (itemlist) {
               itemlist.checkedshow = show
             })
          }
      })
    },
    second (itemrole,item,index) {
      let show =  itemrole.checkedshow = !itemrole.checkedshow
      if(itemrole.adminResourcesDoList.length>0){
         itemrole.adminResourcesDoList.forEach(function (itemlist) {
           itemlist.checkedshow = show
         })
      }
      //判断上一级
      let num = 0
      item.adminResourcesDoList.forEach(function (itemlist) {
          if(itemlist.checkedshow){
             num = num + 1
          }
      })
      if(num>0){
          item.checkedshow = true
      }else if(num == 0){
         item.checkedshow = false
      }
    },
    three (itemrolelist,index,itemindex) {
        let show =  itemrolelist.checkedshow = !itemrolelist.checkedshow
        let num = 0
        this.itemdata[itemindex].adminResourcesDoList[index].adminResourcesDoList.forEach(function (itemlist) {
            if(itemlist.checkedshow){
                 num = num + 1
            }
        })
        if(num>0){
            this.itemdata[itemindex].checkedshow = true
            this.itemdata[itemindex].adminResourcesDoList[index].checkedshow = true
        }else if(num == 0){
          let strnum = 0
           this.itemdata[itemindex].adminResourcesDoList[index].checkedshow = false
           this.itemdata[itemindex].adminResourcesDoList.forEach(function (itemlist) {
               if(itemlist.checkedshow){
                  strnum = strnum + 1
               }
           })
           if(num == 0){
             this.itemdata[itemindex].checkedshow  = false
           }
        }
    },
    list () {
      let _this = this;
      var url = "/admin_role/getResourceByRoleId?token=" + this.$webapi.get('token') + " &roleId=" + this.subfrom.roleId
      this.$api.get(url, null, reset => {
        if (reset.codeId === 1) {
            let data = reset.resData
            data.forEach(function(itemlist){
              if(itemlist.checked==1){
                itemlist.checkedshow = true
              }else{
                itemlist.checkedshow = false
              }
              if(itemlist.adminResourcesDoList.length>0){
                itemlist.adminResourcesDoList.forEach(function (item) {
                  if(item.checked==1){
                    item.checkedshow = true
                  }else{
                    item.checkedshow = false
                  }
                  if(item.adminResourcesDoList.length>0){
                    item.adminResourcesDoList.forEach(function (enditem) {
                      if(enditem.checked==1){
                        enditem.checkedshow = true
                      }else{
                        enditem.checkedshow = false
                      }
                    })
                  }
                })
              }
            })
            _this.itemdata = data
        }else {
          _this.$netcode.getApiCode(reset)
       }
      })
    },
    save () {
      let _this = this
      var data = {
          roleResources:[]
      }
      // {roleResources:[{roleId:28,resourcesId:1},{roleId:28,resourcesId:2}]}
        this.itemdata.forEach(function (itemlist) {
           if(itemlist.checkedshow){
              var itemdata = {
                  roleId:parseInt(_this.$route.params.id),
                  resourcesId:itemlist.id
              }
              data.roleResources.push(itemdata)
           }
           if(itemlist.adminResourcesDoList.length>0){
             itemlist.adminResourcesDoList.forEach(function (item) {
               if(item.checkedshow){
                  var itemdata = {
                      roleId:parseInt(_this.$route.params.id),
                      resourcesId:item.id
                  }
                  data.roleResources.push(itemdata)
                  if(item.adminResourcesDoList.length>0){
                    item.adminResourcesDoList.forEach(function (itemthree) {
                      if(itemthree.checkedshow){
                         var itemdata = {
                             roleId:parseInt(_this.$route.params.id),
                             resourcesId:itemthree.id
                         }
                         data.roleResources.push(itemdata)
                      }
                   })
                  }
                }
             })
           }
        })
        this.newitemdata = data
        if(data.roleResources.length<1){
            this.$Message.error('资源信息至少选择一个才能保存')
        }else{
            this.saveemit()
        }
    },
    saveemit () {
      var _this = this
      // var url = "/admin_role/editor?token=" + this.$webapi.get('token') + " &data=" + JSON.stringify(this.newitemdata)
      var datas={
        token:this.$webapi.get('token'),
        data:JSON.stringify(this.newitemdata)
      }
      this.$api.post("/admin_role/editor", datas, reset => {
        if (reset.codeId === 1) {
           _this.$router.push({path:"/role"})
        }else {
          _this.$netcode.getApiCode(reset)
       }
      })
    }
  }
}
</script>

<style>
  .getResourceAll{
    padding: 10px;
  }
  .resourcelist{
    text-align: left
  }
</style>
