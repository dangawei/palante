<template>
  <div>
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
                   </div>
                 </li>
               </ul>
            </div>
            <div class="carmodel-bdlist">
              <div class="" :style="carmodelbdlist">
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

                     </li>
                   </ul>
                </div>
              </div>
            </div>
         </div>
         <div @click="saveitem()"  class="mt20">
           <Button type="success" style="width:80%" size="large">保存</Button>
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
        carmodelbdlist:{}
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
                    if(str.length>4){
                      _this.carmodelbdlist ={
                        "width":str.length*280+"px"
                      }
                    }else {
                      _this.carmodelbdlist ={
                        "width":"auto"
                      }
                    }
                    var returnitem = _this.returnvalue(str)
                    _this.carconfigvaluedata = returnitem
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
         this.carconfigvaluedata.forEach(function (a) {
              if(a.valueDoList.length>0){
                  a.valueDoList.forEach(function (b) {
                    if(b.valueDoList.length>0){
                      b.valueDoList.forEach(function (c) {
                        console.log(c)
                         var itemlist = {
                           id:c.itemid,
                           modelTypeId:c.modelTypeId,
                           propertyId:c.propertyId,
                           value:c.value || ""
                         }
                         newitem.data.push(itemlist)
                      })
                    }
                  })
              }
         })
        newitem.data = JSON.stringify(newitem.data)
        this.$api.post('/model_configuration_value/saveList',newitem,reset => {
            if (reset.codeId === 1) {
               this.$Message.info("保存成功")
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
      .carmodel-bdlist{
        display: block;
        margin-left: 280px;
        overflow: auto;
      }
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
