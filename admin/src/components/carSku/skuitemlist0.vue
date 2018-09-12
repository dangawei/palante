<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >车辆管理</BreadcrumbItem>
          <BreadcrumbItem to="/car">车辆型号列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>SKU属性设置</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
          <div class="pagelist">
              <div class="pagelist-hd">车辆基本信息</div>
              <div class="pagelist-bd">
                <Form :model="formItem" :label-width="100">
                  <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem label="车辆品牌">
                          <span>{{formItem.brandname}}</span>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem label="车辆型号">
                          <span>{{formItem.modelName}}</span>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
          <div class="pagelist">
              <div class="pagelist-hd">SKU属性信息</div>
              <div class="pagelist-bd">
                <sku-component-addskuitem @skucomponentTick="skucomponentTick"></sku-component-addskuitem>
                <!-- <Form :model="skudata" :label-width="100">
                  <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24" v-for="item in skudata">
                      <FormItem :label="item.name">
                         <span class="skuitem" v-for="skuname in item.valueDoList" @click="itemshow(skuname)" :class="{skuitemative:skuname.ativeshow}">{{skuname.value}}</span>
                         <span class="skuitem" @click="chlidsku(item)"><Icon type="plus-round"></Icon>添加</span>
                      </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem label="">
                          <span class="" @click="addsave()">
                              <Button type="primary">添加分类</Button>
                          </span>
                      </FormItem>
                    </Col>
                  </Row>
                </Form> -->
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
          <div class="pagelist">
              <div class="pagelist-hd">生成SKU</div>
              <div class="pagelist-bd">
                <Form :model="skudata" :label-width="100">
                  <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem>
                          <ul class="itemcarskubox">
                             <li v-for="(item,skuindex) in getnewskuitem">
                               <div class="itemcarimg">
                                   <img :src="item.url" alt="" width="58">
                               </div>
                               <div class="itemcartitle">
                                 {{item.skuCodeCombination}}
                               </div>
                                <div class="fr">
                                   <i-switch v-model="item.clientShow==1" @on-change="switchchange(item)">
                                     <span slot="open">展示</span>
                                     <span slot="close">不展示</span>
                                   </i-switch>
                                </div>
                             </li>
                          </ul>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
          <div class="pagelist">
              <div class="" @click="savesku()">
                 <Button type="primary">保存</Button>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<style lang="less">
  .itemcarsku{
    display: inline-block;
    text-align:center;
    margin-right:10px;
  }
  .skuitem{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    border: #ddd 1px solid;
    background: #fff;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 2px;
    margin-right:10px;
  }
  .skuitemative{
    border: #f30 1px solid;
    color: #f30;
  }
  .itemcarskubox{
    li{
      float: left;
      width: 100%;
      padding: 10px 0;
      border-bottom: #ddd 1px solid;
      .itemcarimg{
        float: left;
        margin-right: 20px;
      }
      .itemcartitle{
        float: left
      }
    }
  }
</style>
<script>
import SkuComponent from "./addsku.vue"
import SkuComponentParent from "./add.vue"
import SkuComponentAddskuitem from "./addskuitem.vue"
import Upload from "../pub/Uploadimg.vue"
export default {
  components: {
    SkuComponent,
    SkuComponentParent,
    SkuComponentAddskuitem,
    Upload
  },
  data() {
    return {
      skuID:'',
      skuName:"",
      addskushow:false,
      addskuparentshow:false,
      formItem:{
      },
      skudata:[],
      getnewskuitem:[],
      newSkuitem:[],
      TempSkuitem:[],
      tempgetdata:[],
      skuitempush:[]
    }
  },
  created(){

  },
  mounted() {
    //do something after mounting vue instance
    this.carModelview()
    this.getskulist()
  },
  methods: {
    switchchange (item) {
        this.getnewskuitem.forEach(function (e) {
           if(e.id == item.id){
             if(item.clientShow==1){
               e.clientShow = 2
             }else{
               e.clientShow = 1
             }
           }
        })
    },
    carModelview () {
      //获取车型基本信息
      let _this = this
      let data = {
          token:this.$webapi.get('token'),
          id:this.$route.params.id
      }
      this.$api.get('/car_model/getOne',data,reset => {
          if (reset.codeId === 1) {
              _this.formItem = reset.resData
              _this.formItem.brandname=_this.$route.query.brand
          }
      })
    },
    skucomponentTick (e) {
      var _this = this
       this.getskulist01()
    },
    getskulist01 () {
      //获取车辆型号的一级二级sku分类
      let _this = this
      let data = {
          token:this.$webapi.get('token'),
          modelId:this.$route.params.id
      }
      this.$api.get('/sku_meta_property/getByModelId',data,reset => {
          if (reset.codeId === 1) {
              var str = reset.resData
              str.forEach(function (itemlist) {
               if(itemlist.valueDoList.length>0){
                  itemlist.valueDoList.forEach(function (e) {
                     e.ativeshow = true
                  })
               }
             })
             _this.skudata = str
             _this.carskulist()
             setTimeout(function () {
                _this.savesku()
             },300)
          }else{
            setTimeout(function () {
               _this.savesku()
            },300)
          }
      })
    },
    getskulist () {
      //获取车辆型号的一级二级sku分类
      let _this = this
      let data = {
          token:this.$webapi.get('token'),
          modelId:this.$route.params.id
      }
      this.$api.get('/sku_meta_property/getByModelId',data,reset => {
          if (reset.codeId === 1) {
              var str = reset.resData
              str.forEach(function (itemlist) {
               if(itemlist.valueDoList.length>0){
                  itemlist.valueDoList.forEach(function (e) {
                     e.ativeshow = true
                  })
               }
             })
             _this.skudata = str
             _this.carskulist()
          }
      })
    },
    carskulist () {
      //获取生成好的sku
      let _this = this
      _this.getnewskuitem = []
      let data = {
          token:this.$webapi.get('token'),
          carModelId:this.$route.params.id
      }
      this.$api.get('/car_sku/list',data,reset => {
        var newitem = [] //先获取过来的skuid 和缓存的sku 对比一下，是否有相同的
        var str = []
        if(reset.resData!=null){
            str = reset.resData
        }
        //如果获取过来的没有值，缓存里面有值的，就是缓存里面值，如果没有的，就是空
        if(str.length<1){
           _this.getnewskuitem = []

        }else{
           _this.tempgetdata = str
        }
       _this.createsku()
      })
    },
    skuComponentData01 (e){
        this.addskushow = false
        this.getskulist()
        this.carlist()
    },
    chlidsku (item) {
      this.skuID = item.id
      this.skuName = item.name
      this.addskuparentshow = true
    },
    skucomponent (e){
      this.addskuparentshow = false
      this.getskulist()
    },
    //图片
    skuimg () {
         var _this = this;
          _this.skudata.forEach(function (item) {
              if(item.name=="颜色"){
                    if(item.valueDoList.length>0){
                        item.valueDoList.forEach(function (a) {
                            _this.TempSkuitem.forEach(function (b){
                                if(b.skuIdCombination.indexOf(a.id)>-1){
                                    b.url = a.url
                                }
                            })
                        })
                    }
              }
          })
          this.getnewskuitem = this.TempSkuitem
          this.TempSkuitem = []
    },
    createsku () {
       //判断模式，有两种模式0是一个 1.正好两个，2.是大于两个模式
        var _this = this
        if(_this.skudata.length==1){
          for(var i=0;i<_this.skudata.length;i++){
              for(var k=0;k<_this.skudata[i].valueDoList.length;k++){
                var str = {
                  skuCodeCombination:_this.skudata[i].valueDoList[k].value,
                  skuIdCombination:_this.skudata[i].id+":"+_this.skudata[i].valueDoList[k].id,
                  clientShow:1
                }
                _this.joinSku(str)
              }
          }
          _this.TempSkuitem.forEach(function (a) {
             _this.tempgetdata.forEach(function (b) {
                 if(a.skuIdCombination == b.skuIdCombination){
                     a.clientShow = b.clientShow
                     a.id = b.id
                     if(b.url){
                        a.url = b.url
                     }
                 }
             })
          })
          _this.skuimg()
        }else if(_this.skudata.length>1) {
          for(var i=0;i<_this.skudata.length;i++){
              for(var k=0;k<_this.skudata[i].valueDoList.length;k++){
                _this.creatsendsku(i,_this.skudata[i].valueDoList[k])
              }
          }
          _this.TempSkuitem.forEach(function (a) {
             _this.tempgetdata.forEach(function (b) {
                 if(a.skuIdCombination == b.skuIdCombination){
                    a.clientShow = b.clientShow
                     a.id = b.id
                     if(b.url){
                        a.url = b.url
                     }
                 }
             })
          })
          _this.skuimg()
        }
    },
    creatsendsku (index,item) {
      var _this = this
      var num = index + 1
      for(var k=num;k<_this.skudata.length;k++){
        if(_this.skudata[k].valueDoList.length>0){
          _this.skudata[k].valueDoList.forEach(function (itemlist) {
            var str = {
                skuCodeCombination:item.value + "-"+itemlist.value,
                skuIdCombination:item.skuMetaPropertyId+":"+item.id + ";"+itemlist.skuMetaPropertyId+":"+itemlist.id,
                clientShow:1
            }
            if(_this.skudata.length>2){
               _this.creatdayusendsku(k,str)
            }else{
                _this.joinSku(str)
            }
          })
        }
      }
    },
    creatdayusendsku (index,item) {
      var _this = this
      var itemlist = item
      for(var k=index+1;k<_this.skudata.length;k++){
          var valueDoList = _this.skudata[k].valueDoList
          if(valueDoList.length>0){
            valueDoList.forEach(function (a) {
              var newitemlist = {
                  skuCodeCombination:itemlist.skuCodeCombination +"-"+a.value,
                  skuIdCombination: itemlist.skuIdCombination + ";"+a.skuMetaPropertyId+":"+a.id,
                  clientShow:1
              }
              _this.joinSku(newitemlist)
            })
          }
      }
    },
    joinSku (str) {
      var _this = this
      var newitem = this.getnewskuitem
      //所有生成的sku 保存之前，都要先筛选一边，是否有重复的
      var idx = 0
      if(newitem.length>0){
        newitem.forEach(function (item) {
           if(item.skuCodeCombination==str.skuCodeCombination){
               idx = 1
               _this.TempSkuitem.push(item)
           }
        })
        if(idx == 0){
            _this.TempSkuitem.push(str)
        }
      }else{
          _this.TempSkuitem.push(str)
      }
      console.log(_this.TempSkuitem)
    },
    skufor (i) {
      var _this = this
       _this.TempSkuitem = _this.getnewskuitem
       _this.newSkuitem[i].valueDoList.forEach(function (a) {
          _this.getnewskuitem.forEach(function(b){
            var str = {
              skuCodeCombination:b.skuCodeCombination+"-"+a.value,
              skuIdCombination:b.skuIdCombination+";"+a.skuMetaPropertyId+":"+a.id,
              clientShow:1
            }
            _this.TempSkuitem.push(str)
          })
       })
       _this.getnewskuitem = _this.TempSkuitem
       _this.TempSkuitem = [] // 缓存用完了，就释放缓存
    },
    savesku () {
        let _this = this
        var newitem = []
        if(_this.getnewskuitem.length>0){
          _this.getnewskuitem.forEach(function (a) {
              if(a.id == undefined){
                var str = {
                    carModelId:parseInt(_this.$route.params.id),
                    url:a.url,
                    skuCodeCombination:a.skuCodeCombination,
                    skuIdCombination:a.skuIdCombination,
                    clientShow:a.clientShow
                }
                newitem.push(str)
              }else{
                var str = {
                    id:a.id,
                    carModelId:parseInt(_this.$route.params.id),
                    url:a.url,
                    skuCodeCombination:a.skuCodeCombination,
                    skuIdCombination:a.skuIdCombination,
                    clientShow:a.clientShow
                }
                newitem.push(str)
              }
          })
        }
      if(newitem.length<1){
        return
      }
      var data = {
          token:this.$webapi.get("token"),
          data:JSON.stringify(newitem)
      }
      this.$api.post("/car_sku/addList", data, reset => {
        if (reset.codeId === 1) {
           this.$router.push({path:"/car"})
        }else {
          _this.$netcode.getApiCode(reset)
       }
      })
    },
    uploadComponentpic (e) {
        this.getnewskuitem[e.skuindex].pic =  e.items[0]
    }
  }
}
</script>
