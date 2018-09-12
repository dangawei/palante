<template>
  <div class="">
    <Tabs type="card" :value="value" closable @on-tab-remove="handleTabRemove">
      <TabPane :label="item.name" :name="item.name" v-for="(item,index) in skudata">
        <div class="itemskubox">
          <div class="itemsku" v-for="skuname in item.valueDoList">
                 <div class="" v-if="item.name=='颜色'">
                   <div class="" style="height:58px;text-align: center;" v-if="skuname.url">
                       <img :src="skuname.url" alt="" height="58" width="58">
                   </div>
                 </div>
                <Tag type="dot" closable color="#f8f8f8"  @on-close="remove(skuname)" :class="{skuitemative:skuname.ativeshow}">{{skuname.value}}</Tag>
          </div>
        </div>
        <div class="mt10 mb10">
            <span @click="chlidsku(item)"><Button type="primary">添加{{item.name}}</Button></span>
        </div>
        <div class="" v-for="itemin in itemlist" v-if="itemin.propertyName == item.name" >
            <Row>
              <Col>
                <div class="addcolorbox">
                    <div class="addcolor" v-for="(input,index) in itemin.list">
                      <div class="" v-if="input.propertyName =='颜色'">
                          <Upload @uploadComponent="uploadComponent" :model="2" :skuindex="index" :Uploadimg="input.pic"></Upload>
                      </div>
                      <Input v-model="input.value" :placeholder="item.name" icon="ios-close-outline" @on-click="del(index,itemin)"  style="width: 100px;margin-bottom:10px;margin-right:10px;"></Input>
                    </div>
                </div>
                <div class="" class="mt10" v-if="itemin.list.length>0">
                    <span  @click="save(itemin,item)"><Button type="primary">保存</Button></span>
                    <span  @click="close(itemin)"><Button type="primary">取消</Button></span>
                </div>
              </Col>
            </Row>
        </div>
      </TabPane>
     <Button type="primary" @click="handleTabsAdd"  slot="extra">增加分类</Button>
   </Tabs>
   <sku-component v-if="addskushow" :addskushow="addskushow" @skuComponentData="skuComponentData"></sku-component>
  </div>
</template>
<script>
import SkuComponent from "./addsku.vue"
import Upload from "../pub/Uploadimg.vue"
export default {
  components: {
    SkuComponent,
    Upload
   },
    mounted() {
    },
    data() {
        return {
          addskushow:false,
            value:"",
            skudata:[],
            itemlist:[]
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.getskulist()
    //  this.carModelview()
    },
    methods: {
      uploadComponent (e) {
          var _this = this
          this.itemlist.forEach(function (item,index) {
              if(item.propertyName == "颜色"){
                 _this.itemlist[index].list[e.skuindex].url = e.items[0]
              }
          })
      },
      handleTabRemove (e){
        var _this = this
         this.skudata.forEach(function (a) {
            if(a.name == e){
              _this.removesku(a)
            }
         })
      },
      handleTabsAdd () {
        this.addskushow =  true
      },
      del (index,itemin) {
        itemin.list.splice(index,1)
      },
      save (itemin,item) {
        var _this = this
        if(itemin.list.length<1){
            return
        }
        var idx = 0
        itemin.list.forEach(function (item) {
            if(item.value == "" ){
                if(item.propertyName == "颜色"){
                     if(item.url == ""){
                        idx = 1
                     }
                }
                 idx = 1
            }
        })
        if(idx==1){
            this.$Message.warning("添加sku属性和名称必填")
            return
         }       
        var data = {
              token:this.$webapi.get("token"),
              propertyId:item.id,
              data:JSON.stringify(itemin.list)
        }
        this.$api.post("/sku_meta_property_value/addList", data, reset => {
          if (reset.codeId === 1) {
             itemin.list = []
             _this.getskulist01()
          }else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      skuComponentData (e) {
          this.addskushow=e
          this.getskulist()
      },
      close (itemin) {
        itemin.list = []
      },
      chlidsku (e) {
         this.itemlist.forEach(function (item) {
               var newitemchlid = {
                      value:"",
                      url:"",
                      sequence:"",
                      propertyName:e.name
               }
              if(item.propertyName == e.name){
                 item.list.push(newitemchlid)
              }
         })
      },
      getskulist () {
        //获取车辆型号的一级二级sku分类
        let _this = this
        _this.itemlist = []
        let data = {
            token:this.$webapi.get('token'),
            modelId:this.$route.params.id
        }
        this.$api.get('/sku_meta_property/getByModelId',data,reset => {
            if (reset.codeId === 1) {
                var str = reset.resData
                this.value = str[0].name
                str.forEach(function (itemlist) {
                 if(itemlist.valueDoList.length>0){
                    itemlist.valueDoList.forEach(function (e) {
                       e.ativeshow = false
                    })
                 }
               })
               str.forEach(function (itemlist) {
                   var newitem = {
                      propertyName:itemlist.name,
                      list:[]
                   }
                  _this.itemlist.push(newitem)
                })
               _this.skudata = str
            }
        })
      },
      getskulist01 () {
        //获取车辆型号的一级二级sku分类
        let _this = this
        _this.itemlist = []
        let data = {
            token:this.$webapi.get('token'),
            modelId:this.$route.params.id
        }
        this.$api.get('/sku_meta_property/getByModelId',data,reset => {
            if (reset.codeId === 1) {
                var str = reset.resData
                this.value = str[0].name
                str.forEach(function (itemlist) {
                 if(itemlist.valueDoList.length>0){
                    itemlist.valueDoList.forEach(function (e) {
                       e.ativeshow = false
                    })
                 }
               })
               str.forEach(function (itemlist) {
                   var newitem = {
                      propertyName:itemlist.name,
                      list:[]
                   }
                  _this.itemlist.push(newitem)
                })
               _this.skudata = str
               _this.exportdata()
            }else{
              _this.itemlist = []
              _this.exportdata()
            }
        })
      },
      exportdata () {
        this.$emit('skucomponentTick',{addskushow:false})
        this.addskushow = false
      },
      removesku(a) {
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认删除【'+a.name+'】吗?</p>',
              onOk: () => {
                  this.delsku(a)
              },
              onCancel: () => {

              }
          })
      },
      delsku (a) {
        var _this = this
        var url ="/sku_meta_property/delete?token="+this.$webapi.get("token")+"&id="+a.id
        this.$api.post(url, null, reset => {
          if (reset.codeId === 1) {
             console.log(111)
             _this.getskulist01()
          }else {
            _this.getskulist01()
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      remove(e) {
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认删除【'+e.value+'】吗?</p>',
              onOk: () => {
                    this.deltag(e)
              },
              onCancel: () => {

              }
          });

      },
      deltag (e) {
          var _this = this
          var url ="/sku_meta_property_value/delete?token="+this.$webapi.get("token")+"&id="+e.id
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
               console.log(111)
              _this.getskulist01()
            }else {
              _this.getskulist01()
              _this.$netcode.getApiCode(reset)
           }
          })
      }
    }
  }
</script>
<style lang="less">
  .itemskubox,.addcolorbox{
    float: left;
    width: 100%;
  }
  .itemsku,.addcolor{
    float: left;
    margin-right:10px;
  }
</style>
