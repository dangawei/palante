<template>
  <div>
      <div class="" style="text-align:left">
        <Alert type="warning" show-icon>
             操作注意
            <span slot="desc">
              每一个添加或者保存成功后,会清除其他版块的值，建议一块一块添加或者保存
            </span>
        </Alert>
      </div>
      <div class="carmodelbox">
         <!-- <div class="carmodel-hd">
           <ul>
             <li v-for="item in carModeldata" @click="tabs(item)">{{item.name}}</li>
           </ul>
         </div> -->
         <div class="carmodel-bd">
            <div class="w280 fl carconfiglist">
               <ul>
                 <li>
                   <div class="">型号</div>
                 </li>
                 <li v-for = "item in carconfigdata">
                   <div class="">{{item.name}}</div>
                   <p v-for="itemlist in item.secondList" :title="itemlist.name">{{itemlist.name}}</p>
                 </li>
                 <li>
                   <div class="">
                      操作
                   </div>
                 </li>
               </ul>
            </div>
            <div class="w280 fl carconfiglist" v-for="item in carconfigvaluedata">
               <ul>
                 <li>
                   <div class="">{{item.name}}</div>
                 </li>
                 <li v-for="itemList in item.valueDoList">
                   <div class=""></div>
                   <p v-for="itemlists in itemList.valueDoList">
                     <Input v-model="itemlists.value" placeholder="" style="margin:0 10px; width:180px"></Input>
                   </p>
                 </li>
                 <li>
                   <div @click="additem(item)" v-if="item.show == 0">
                     <Button type="success" style="width:90%">添加{{item.name}}</Button>
                   </div>
                   <div @click="saveitem(item)" v-else>
                     <Button type="success" style="width:90%">保存{{item.name}}</Button>
                   </div>
                 </li>
               </ul>
            </div>
         </div>
      </div>
  </div>
</template>
<script>
export default {
    data () {
      return {
        listdata:[],
        formCustom:{
          name:"",
          carModelId:""
        },
        pageshow:false,
        addshow:false,
        editName:"",
        editID:"",
        editshow:false,
        columnsdata:[],
        carModeldata:[],
        carconfigvaluedata:[],
        carconfigdata:{},
        modelTypeId:"",
      }
    },
    mounted() {
      this.list()
    },
    methods: {
      tabs (a) {
         this.modelTypeId = a.id
         this.listconfigvalue()
      },
      //或者车辆型号的配置
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            name:"",
            carModelId:this.$route.params.id
        }
        this.$api.get('/model_type/list',data,reset => {
            if (reset.codeId === 1) {
                var str  = reset.resData
                str.forEach(function (a) {
                  a.show = false
                })
                _this.carModeldata = str
                _this.listconfig()
            }
            else if(reset.codeId === -9){
              _this.carModeldata = []
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      listconfig() {
        let _this = this
        let data = {
            token:this.$webapi.get('token')
        }
        this.$api.get('/model_configuration_property/getAllList',data,reset => {
            if (reset.codeId === 1) {
                _this.carconfigdata = reset.resData
                _this.listconfigvalue()
            }
            else if(reset.codeId === -9){
              _this.carconfigdata = []
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      listconfigvalue () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            carModelId:this.$route.params.id
        }
        this.$api.get('/model_configuration_value/getByCarModelId',data,reset => {
            if (reset.codeId === 1) {
                var str  = reset.resData
                if(str.length>0){
                    var returnitem = _this.returnvalue(str)
                    _this.carconfigvaluedata = returnitem
                    console.log(_this.carconfigvaluedata)
                }
            }
            else if(reset.codeId === -9){
               _this.carconfigvaluedata = []
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      //批量处理对应车辆参数值
      returnvalue (str) {
        var _this = this;
        var reset = [];
        str.forEach(function (a) {
            var newitem = {
              name:a.name,
              id:a.id,
              carModelId:a.carModelId,
              carModelName:a.carModelName,
              valueDoList:[]
            }
            if(a.valueDoList.length>0){
                newitem.show = 1
            }else {
                newitem.show = 0
            }
            newitem.valueDoList = _this.itemvalue(a)
            reset.push(newitem)
        })
        return reset
      },
      itemvalue (item) {         
        var reset = []
        var _this = this
         _this.carconfigdata.forEach(function (a) {
            var newitem = {
               name:a.name,
               id:a.id,
               valueDoList:[]
            }
            if(a.secondList.length>0){
              a.secondList.forEach(function (b) {
                var newstr = {
                    propertyId:b.id,
                    value:""
                }
                var idx = 0
                item.valueDoList.forEach(function (c) {
                    if(b.id == c.modelConfigurationPropertyId){
                        newstr.itemid = c.id
                        newstr.modelConfigurationPropertyId = c.modelConfigurationPropertyId
                        newstr.modelTypeId = c.modelTypeId
                        newstr.value = c.value
                        idx = 1
                    }
                })
                if(idx == 0){
                  newstr.modelConfigurationPropertyId = b.id
                  newstr.modelTypeId = item.id
                }
                newitem.valueDoList.push(newstr)
              })
            }
            reset.push(newitem)
         })
         return reset
      },
      saveitem (item) {
        var _this = this
        var newitem = {
          token:this.$webapi.get('token'),
          data:[]
        }
        item.valueDoList.forEach(function (a) {
            a.valueDoList.forEach(function (b) {
                var str = {
                   id:b.itemid,
                   value:b.value,
                   modelConfigurationPropertyId:b.modelConfigurationPropertyId,
                   modelTypeId:b.modelTypeId
                }
                newitem.data.push(str)
            })
        })
        newitem.data = JSON.stringify(newitem.data)
        this.$api.post('/model_configuration_value/updateList',newitem,reset => {
            if (reset.codeId === 1) {
               this.$Message.info("保存成功")
               _this.list()
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      additem (item) {
        var _this = this
        var newitem = {
          token:this.$webapi.get('token'),
          modelTypeId:item.id,
          data:[]
        }
        item.valueDoList.forEach(function (a) {
            a.valueDoList.forEach(function (b) {
                newitem.data.push(b)
            })
        })
        newitem.data = JSON.stringify(newitem.data)
        this.$api.post('/model_configuration_value/saveList',newitem,reset => {
            if (reset.codeId === 1) {
               this.$Message.info("添加成功")
               _this.list()
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      }
    }
}
</script>
<style lang="less" scoped>
  .carmodelbox{
    overflow: hidden;
    // .carmodel-hd{
    //   float: left;
    //   width: 300px;
    //   background: #f5f5f5;
    //   border: #ddd 1px solid;
    //   border-right:none;
    //   ul{
    //     li{
    //       height: 60px;
    //       line-height: 60px;
    //       text-align:center;
    //       color: #666;
    //       cursor: pointer;
    //       border-bottom: #f5f5f5 1px solid;
    //     }
    //     li:last-child{
    //       border-bottom: none
    //     }
    //     li.ative{
    //       background: #fff
    //     }
    //     li:hover{
    //       background:#fff
    //     }
    //   }
    // }
    .carmodel-bd{
      display: block;
      // margin-left: 300px;
      border: #ddd 1px solid;
      min-height: 500px;
      overflow: hidden;
      max-height: 600px;
      overflow-y: auto;
      .carconfiglist{
        border-right: #ddd 1px solid;
        ul{
          li>div{
              width: 100%;
              height: 40px;
              line-height: 40px;
              background: #f5f5f5;
              overflow: hidden;
          }
          li p{
            width: 100%;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
