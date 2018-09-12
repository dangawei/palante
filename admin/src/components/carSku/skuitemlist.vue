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
              <Alert type="error">
                <p class="textalignleft">提交保存其中一块分类内容其他版块的未保存的内容会清除掉</p>
                <p class="textalignleft">图片上传尺寸:1200*800</p>
              </Alert>
              <div class="pagelist-hd">车辆配置信息</div>
              <div class="pagelist-bd">
                  <div class="skulist" v-for="(item,itemindex) in skudata" v-if="item.name =='颜色'">
                      <div class="skulist-hd fl">
                            {{item.name}}:
                            <span class="fr" @click="skulistdel(item)">
                                 <Button type="error">删除</Button>
                            </span>
                      </div>
                      <div class="skulist-bd fl">
                          <div v-for="(list,index) in item.valueDoList" class="fl mb10">
                            <div class="" v-if="list.id">
                              <Upload @uploadComponent="uploadComponent" :Uploadimg="list.url" :skuindex="index" :model="10"></Upload>
                              <span :class="{ative:list.id}" >
                                   {{list.value}}
                                   <em class="skudel" @click="del(list)">
                                      <Icon type="ios-close-outline" size="24"></Icon>
                                   </em>
                               </span>
                            </div>
                            <div v-else class="newitem fl mb10">
                              <div class="">
                                  <Upload @uploadComponent="uploadComponent" :skuindex="index"  :model="10"></Upload>
                                  <Input v-model="list.value" size="large" placeholder="" style="width:60px"></Input>
                                  <em class="skudel" @click="kongdel(itemindex,index)">
                                     <Icon type="ios-close-outline" size="24"></Icon>
                                  </em>
                              </div>
                            </div>
                          </div>
                          <div class="" style="float:left;width:100%">
                            <span class="addsavesku" @click="skusave(item)" v-if="item.valueDoList.length>0">保存</span>
                            <span class="addsku" @click="addsku(item)">+</span>
                          </div>
                      </div>
                  </div>
                  <div class="skulist" v-for="(item,itemindex) in skudata" v-if="item.name !=='颜色'">
                      <div class="skulist-hd fl">
                            {{item.name}}:
                            <span class="fr" @click="skulistdel(item)">
                                 <Button type="error">删除</Button>
                            </span>
                      </div>
                      <div class="skulist-bd fl">
                          <span v-for="(list,index) in item.valueDoList" :class="{ative:list.id}">
                            <em v-if="list.id">
                              {{list.value}}
                              <em class="skudel" @click="del(list)">
                                 <Icon type="ios-close-outline" size="24"></Icon>
                              </em>
                             </em>
                               <em v-else class="newitem">
                                <div class="" v-if="item.name=='颜色'">
                                    <Upload @uploadComponent="uploadComponent" :skuindex="index" :model="10"></Upload>
                                </div>
                                <div class="" v-else>
                                    <Input v-model="list.value" size="large" placeholder="" style="width:60px"></Input>
                                    <em class="skudel" @click="kongdel(itemindex,index)">
                                       <Icon type="ios-close-outline" size="24"></Icon>
                                    </em>
                                </div>
                              </em>
                            </span>
                           <div class="" style="float:left;width:100%">
                            <span class="addsavesku" @click="skusave(item)" v-if="item.valueDoList.length>0">保存</span>
                            <span class="addsku" @click="addsku(item)">+</span>
                          </div>
                      </div>
                  </div>
                  <div class="">
                    <div class="">
                        <span v-for="item in newitemsku" class="mr10">
                              <Input v-model="item.name" size="large" placeholder="" style="width:60px"></Input>
                        </span>
                    </div>
                    <div class="mt10">
                         <span v-if="newitemsku.length>0" @click="saveitem()">
                              <Button type="primary">保存</Button>
                         </span>
                         <span @click="addskulist()">
                            <Button type="primary">添加车辆配置分类</Button>
                         </span>
                    </div>
                  </div>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
          <div class="pagelist">
              <div class="pagelist-hd">生成车辆配置</div>
              <div class="pagelist-bd">
                <Form :model="skudata" :label-width="100">
                  <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                      <FormItem>
                          <ul class="itemcarskubox">
                             <li v-for="(item,skuindex) in getnewskuitem">
                               <div class="itemcarimg">
                                   <img :src="item.pic" alt="" width="58">
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
              <div class="">
                 <Button type="primary" @click="savesku()">保存</Button>
                 <Button type="ghost" @click="cancel()">取消</Button>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<style lang="less">
  .colorupfile{
    p{
      text-align:center
    }
  }
  .skulist{
    float: left;
    width: 100%;
    position:relative;
    .skulist-hd{
      float: left;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: #ddd 1px solid;
      margin-bottom:10px;
    }
    .skulist-bd{
      float:left;
      width: 100%;
      .ative{
          border:#f30 1px solid;
          padding: 0 15px;
          background: url("../../assets/ture.png") bottom right no-repeat;
      }
      .addsavesku{
        background: #00b5ab;
        border: #00b5ab 1px solid;
        color: #fff;
        width: 70px;
      }
      .addsku{
         border:#999 1px solid;
         width: 70px;
         text-align: center;
      }
      span{
        height: 42px;
        line-height: 40px;
        text-align:center;
        display:inline-block;
        overflow: hidden;
        border-radius: 2px;
        cursor: pointer;
        margin-bottom: 15px;
        position:relative;
        margin-right: 20px;
        .skudel{
          line-height: 46px;
          height: 42px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
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
      newitemsku:[], //新建sku子分类的
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
    kongdel (itemindex,index){
        this.skudata[itemindex].valueDoList.splice(index,1)
    },
    //添加sku属性值
    addskulist () {
      var newitem = {
        name:"",
        sequence:""
      }
      this.newitemsku.push(newitem)
    },
    saveitem () {
      let _this = this
      var data = {
        token:this.$webapi.get('token'),
        modelId:this.$route.params.id,
        data:JSON.stringify(this.newitemsku)
      }
      this.$api.post('/sku_meta_property/addList',data,reset => {
          if (reset.codeId === 1) {
              _this.newitemsku=[]
              _this.getskulist01()

          }else{
            _this.$netcode.getApiCode(reset)
          }
      })
    },
    addsku (list) {
      var data = {
          value:"",
          url:"",
          sequence:1,
          newitemid:1
      }
      list.valueDoList.push(data)
    },
    //批量保存子属性
    skusave (list) {
       console.log(111)
      var idindex = 0;
      var itemindex = 0;
      this.skudata.forEach(function (a,index) {
          if(list.name == a.name){
            itemindex = index;
            list.valueDoList.forEach(function (a) {
              if(a.id ==null || a.id==undefined){
                idindex = 1
              }
            })
          }
      })
      if(idindex==0){
        return
      }
      var newitem = {
          token:this.$webapi.get('token'),
          propertyId:list.id,
          data:[]
      }
      var imgindex = 0
      if(list.name == '颜色') {
        list.valueDoList.forEach(function (a) {
          if(a.url == ""){
             imgindex = 1
          }
        })
      }
      if(imgindex !== 0){
         this.$Message.info('颜色下图片没有上传完成')
         return
      }
      var idx = 0
      list.valueDoList.forEach(function (a) {
         if(a.newitemid){
            if(a.value!==""){
                var str = {
                  value:a.value,
                  url:a.url,
                  sequence:1
                }
                newitem.data.push(str)
            }else {
              idx = 1
              return
            }
         }
      })
      if(idx == 0) {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>你提交版块是【'+list.name+'】下内容,其他版块的未保存的内容会清除掉</p>',
            onOk: () => {
              this.skusavepost(newitem,itemindex)
            },
            onCancel: () => {
            }
        })
      }
    },
    skusavepost (newitem,itemindex) {
      let _this = this
      newitem.data = JSON.stringify(newitem.data)
      this.$api.post('/sku_meta_property_value/addList',newitem,reset => {
          if (reset.codeId === 1) {
              _this.getskulist01(itemindex)
          }else{
            _this.$netcode.getApiCode(reset)
          }
      })
    },
    switchchange (item) {
      var _this = this
        _this.getnewskuitem.forEach(function (e) {
           if(e.skuIdCombination == item.skuIdCombination){
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
    getskulist01 (itemindex) {
      var itemnum = itemindex || 0
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
                   if(itemlist.valueDoList!==null && itemlist.valueDoList !==undefined){
                     if(itemlist.valueDoList.length>0){
                        itemlist.valueDoList.forEach(function (e) {
                           e.ativeshow = true
                        })
                     }
                   }else {
                     itemlist.valueDoList = []
                   }
            })
            _this.skudata = str
            _this.carskulist()
            _this.createsku()
           //  //更新自己部分内容
           //  if(itemnum==0){
           //
           // }else{
           //    _this.skudata[itemnum] =  str[itemnum]
           // }
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
               if(itemlist.valueDoList!==null && itemlist.valueDoList !==undefined){
                 if(itemlist.valueDoList.length>0){
                    itemlist.valueDoList.forEach(function (e) {
                       e.ativeshow = true
                    })
                 }
               }else {
                 itemlist.valueDoList = []
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
            _this.tempgetdata  = []
            _this.getnewskuitem = []
        }else{
           _this.getnewskuitem = str
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
      var _this = this
       //判断模式，有两种模式0是一个 1.正好两个，2.是大于两个模式
       var num = 0
        _this.skudata.forEach(function (a) {
           if(a.valueDoList.length>0){
              num++
           }
        })
       if(num==1){
          var  str = _this.onecreatsku()
           _this.getnewskuitem = str
       }
       else if (num==2) {
        var str =  _this.twocreatsku()
         _this.getnewskuitem = str
       }else if(num>2) {
         var str = _this.descartes3()
          _this.getnewskuitem = str
       }
       _this.imgupfile()
       _this.clientShow()
    },
    clientShow () {
      var _this = this
      var reset = []
      var data = _this.getnewskuitem
      if(_this.tempgetdata.length<1){
        return
      }
      _this.getnewskuitem.forEach(function (item) {
          var newitem = item
          var index= 0
        _this.tempgetdata.forEach(function (a) {
          if(item.skuIdCombination == a.skuIdCombination){
                index = 1
                newitem = item
               newitem.clientShow = a.clientShow
          }
        })
        reset.push(newitem)
      })
     _this.getnewskuitem = reset
    },
    //sku 对比
    skuforlog () {
        var _this = this;
        if(_this.tempgetdata.length>0){
          _this.tempgetdata.forEach(function (a) {
             _this.TempSkuitem.forEach(function (b) {
                 if(a.skuIdCombination == b.skuIdCombination){
                    b.id = a.id
                 }
             })
          })
        }
        _this.getnewskuitem =  _this.TempSkuitem
    },
    onecreatsku () {
      var _this = this
      var reset = []
       for(var i=0;i<_this.skudata.length;i++){
            for(var k=0;k<_this.skudata[i].valueDoList.length;k++){
              var str = {
                skuCodeCombination:_this.skudata[i].valueDoList[k].value,
                skuIdCombination:_this.skudata[i].id+":"+_this.skudata[i].valueDoList[k].id,
                clientShow:1
              }
              reset.push(str)
            }
        }
       return reset
    },
    twocreatsku () {
      var _this = this
      var reset = []
      if(_this.skudata[0].valueDoList.length>0 && _this.skudata[1].valueDoList.length>0){
        for(var i = 0;i<_this.skudata[0].valueDoList.length;i++){
           var inxitem1 = _this.skudata[0].valueDoList[i]
           for (var k = 0;k<_this.skudata[1].valueDoList.length;k++){
             var inxitem2 = _this.skudata[1].valueDoList[k]
             var str = {
               skuCodeCombination:inxitem1.value + "-"+inxitem2.value,
               skuIdCombination:inxitem1.skuMetaPropertyId+":"+inxitem1.id + ";"+inxitem2.skuMetaPropertyId+":"+inxitem2.id,
               clientShow:1
             }
             reset.push(str)
           }
        }
      }
      return reset
    },
    descartes3 () {
      var _this = this
      var result = [];
      // 为了便于观察，采用这种顺序
      result = _this.twocreatsku();
      for (var i = 2; i < _this.skudata.length; i++) {
          var arrOfList = _this.skudata[i].valueDoList;
          if(arrOfList.length>0){
            result = _this.descartes2DAnd1D(result, arrOfList);
          }
      }
      return result
    },
    descartes2DAnd1D (arr1D,arr2D) {
      // 返回结果，是一个二维数组
      var result = []
      for (var i = 0; i < arr2D.length; i++) {
          var arrOf2D = arr2D[i];
          for (var j = 0; j < arr1D.length; j++) {
              var item1D = arr1D[j]
              var str = {
                skuCodeCombination:item1D.skuCodeCombination + "-"+arrOf2D.value,
                skuIdCombination:item1D.skuIdCombination+";"+arrOf2D.skuMetaPropertyId+":"+arrOf2D.id,
                clientShow:1
              }
              result.push(str)
          }
      }
      return result
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
    //保存之前，要跟第一次获取的数据对比一下
    savesku () {
        let _this = this
        //对接数据分类的
        var data = {
             idx:0,
             title:""
        }
        _this.skudata.forEach(function (a) {
          if(a.valueDoList.length<1){
            data.idx = 1
            data.title = a.name
          }
        })
        if(data.idx == 1){
          this.$Message.error(data.title+"分类下没有值")
           return
        }
        var newitem = []
        //这新生成的数据跟服务端的数据对比一下，有的，ID赋给新数据的
        if(_this.getnewskuitem.length>0){
          for(var i = 0 ; i<_this.getnewskuitem.length;i++){
            var a = _this.getnewskuitem[i]
            var str = {
              pic:a.pic,
              skuCodeCombination:a.skuCodeCombination,
              skuIdCombination:a.skuIdCombination,
              clientShow:a.clientShow,
              status:1
            }
            str.carModelId = parseInt(_this.$route.params.id)
            for(var j=0;j<_this.tempgetdata.length;j++){
              var b = _this.tempgetdata[j]
              if(a.skuIdCombination == b.skuIdCombination){
                str.id = b.id
              }
            }
            newitem.push(str)
          }
        }
      if(newitem.length<1){
        return
      }
      var reset = newitem
      for(var j=0;j<_this.tempgetdata.length;j++){
        var b = _this.tempgetdata[j]
        var idx = 0
        var str = {
          id:b.id,
          pic:b.pic,
          skuCodeCombination:b.skuCodeCombination,
          skuIdCombination:b.skuIdCombination,
          status:-1
        }
        str.carModelId = parseInt(_this.$route.params.id)
        for(var i=0;i<newitem.length;i++){
          var a = newitem[i]
          if(a.skuIdCombination == b.skuIdCombination){
            idx=1
          }
        }
        if(idx==0){
          reset.push(str)
        }
      }
      newitem = reset
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
    uploadComponent (e) {
      var _this = this
        this.skudata.forEach(function (a) {
            if(a.name == "颜色"){
                a.valueDoList[e.skuindex].url = e.items[0]
                _this.imgupfile()
            }
        })
    },
    imgupfile () {
      var _this = this;
      var list = []
      this.skudata.forEach(function (a) {
          if(a.name == "颜色"){
            list = a.valueDoList
          }
      })
      list.forEach(function (a) {
        _this.getnewskuitem.forEach(function (b) {
            if(b.skuIdCombination.indexOf(a.id) !== -1){
                b.pic = a.url
            }
        })
      })
    },
    del (item) {
      let _this = this
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确认【'+item.value+'】要删除吗?</p>',
          onOk: () => {
            let _this = this;
            let url="/sku_meta_property_value/delete?token=" + this.$webapi.get('token') + "&id=" + item.id;
            this.$api.post(url,null,reset => {
                if (reset.codeId === 1) {
                    _this.$Message.info('删除成功')
                    _this.getskulist01()
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
            _this.Message.success("删除成功");
          },
          onCancel: () => {

          }
      })
    },
    skulistdel (item) {
      let _this = this
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确认【'+item.name+'】要删除吗?</p>',
          onOk: () => {
            let _this = this;
            let url="/sku_meta_property/delete?token=" + this.$webapi.get('token') + "&id=" + item.id;
            this.$api.post(url,null,reset => {
                if (reset.codeId === 1) {
                    _this.$Message.info('删除成功')
                    _this.getskulist01()
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
            _this.Message.success("删除成功");
          },
          onCancel: () => {

          }
      })
    },
    cancel(){
      this.$router.back(-1);
    }
  }
}
</script>
