<template>
  <div class="">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>基础信息</BreadcrumbItem>
                <BreadcrumbItem to="/dealerRole">经销商角色管理</BreadcrumbItem>
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
              <div class="resourcelist" style="margin-left:20px;margin-bottom:10px" v-for="(itemrole,index) in item.dealerResourcesDoList">
                 <div class="resourcelist-hd" style="margin-bottom:10px" >
                  <span @click="second(itemrole,item,index)"><Checkbox v-model="itemrole.checkedshow" size="large"></Checkbox></span>{{itemrole.name}}
                 </div>
                 <div class="resourcelist-bd" style="margin-left:30px;margin-bottom:5px" v-if="itemrole.dealerResourcesDoList.length>0" >
                     <div  v-for="itemrolelist in itemrole.dealerResourcesDoList">
                        <span @click="three(itemrolelist,index,itemindex)"><Checkbox v-model="itemrolelist.checkedshow" size="large"></Checkbox>{{itemrolelist.name}}</span>
                     </div>
                 </div>
              </div>
          </div>
       </div>
   </div>
   <div>
      <div class="" @click="save()">
          <Button type="success" size="large">保存</Button>
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
        itemdata:[]
    }
  },
  methods:{
    first (item,index) {
      let show =  item.checkedshow = !item.checkedshow
      item.dealerResourcesDoList.forEach(function (list) {
          list.checkedshow = show
          if(list.dealerResourcesDoList.length>0){
             list.dealerResourcesDoList.forEach(function (itemlist) {
               itemlist.checkedshow = show
             })
          }
      })
    },
    second (itemrole,item,index) {
      let show =  itemrole.checkedshow = !itemrole.checkedshow
      if(itemrole.dealerResourcesDoList.length>0){
         itemrole.dealerResourcesDoList.forEach(function (itemlist) {
           itemlist.checkedshow = show
         })
      }
      //判断上一级
      let num = 0
      item.dealerResourcesDoList.forEach(function (itemlist) {
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
        this.itemdata[itemindex].dealerResourcesDoList[index].dealerResourcesDoList.forEach(function (itemlist) {
            if(itemlist.checkedshow){
                 num = num + 1
            }
        })
        if(num>0){
            this.itemdata[itemindex].checkedshow = true
            this.itemdata[itemindex].dealerResourcesDoList[index].checkedshow = true
        }else if(num == 0){
          let strnum = 0
           this.itemdata[itemindex].dealerResourcesDoList[index].checkedshow = false
           this.itemdata[itemindex].dealerResourcesDoList.forEach(function (itemlist) {
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
      var url = "/dealer_role/getResourceByRoleId?token=" + this.$webapi.get('token') + " &roleId=" + this.subfrom.roleId
      this.$api.get(url, null, reset => {
        console.log(1111)
        if (reset.codeId === 1) {
            var data = reset.resData
            data.forEach(function(itemlist){
              if(itemlist.checked==1){
                itemlist.checkedshow = true
              }else{
                itemlist.checkedshow = false
              }
              if(itemlist.dealerResourcesDoList.length>0){
                itemlist.dealerResourcesDoList.forEach(function (item) {
                  if(item.checked==1){
                    item.checkedshow = true
                  }else{
                    item.checkedshow = false
                  }
                  if(item.dealerResourcesDoList.length>0){
                    item.dealerResourcesDoList.forEach(function (enditem) {
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
           if(itemlist.dealerResourcesDoList.length>0){
             itemlist.dealerResourcesDoList.forEach(function (item) {
               if(item.checkedshow){
                  var itemdata = {
                      roleId:parseInt(_this.$route.params.id),
                      resourcesId:item.id
                  }
                  data.roleResources.push(itemdata)
                  if(item.dealerResourcesDoList.length>0){
                    item.dealerResourcesDoList.forEach(function (itemthree) {
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
        // var url = "/dealer_role/editor?token=" + this.$webapi.get('token') + " &data=" + JSON.stringify(data)
        var datas={
          token:this.$webapi.get('token'),
          data:JSON.stringify(data)
        }
        this.$api.post("/dealer_role/editor", datas, reset => {
          if (reset.codeId === 1) {
             _this.$router.push({path:"/dealerRole"})
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
