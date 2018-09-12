<style scoped="" lang="less">
  .itemBox{
       overflow: hidden;
      .itemList{
        width: 300px;
        border: #ebebeb 1px solid;
        background: #fff;
        float: left;
        margin-right: 20px;
        overflow: hidden;
        ul{
          width: 320px;
          overflow-y: auto;
          height: 400px;
          li{
            width: 100%;
            height: 45px;
            line-height: 45px;
            text-align: left;
            text-indent: 2em;
            border-bottom: #f8f8f8 1px solid;
            cursor: pointer;
          }
          li:chlid-last{
            border-bottom:none;
          }
        }
      }
  }
  .ative{
    color: #06c
  }
</style>
<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>商品管理</BreadcrumbItem>
                <BreadcrumbItem>发布商品</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>发布商品</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <div class="itemBox">
                <div class="itemList">
                    <ul>
                       <li v-for="item in branddata" @click="itemlist(item)" :class="{ative:item.show}">{{item.brandName}}</li>
                    </ul>
                </div>
                <div class="itemList" v-if="cardModeldata.length>0">
                  <ul>
                     <li v-for="item in cardModeldata" @click="cardModelTick(item)" :class="{ative:item.show}">{{item.modelName}}</li>
                  </ul>
                </div>
            </div>
            <div class="">
                  <span @click="additem()">
                     <Button type="primary" :disabled="newitem.brandId=='' || newitem.cardModelId==''">发布商品</Button>
                  </span>
                  <!-- <area-component :areaData="areaData" @areaEmit="areaEmit"></area-component> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import areaComponent from "../pub/iviewarea.vue"
export default {
  components: {
    areaComponent
  },
    data() {
        return {
            newitem:{
              brandId:"",
              brandName:"",
              cardModelId:"",
              cardModelName:""
            },
            areaData:['130000', '130700', '130730'],
            branddata:[],
            cardModeldata:[]
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.brandlist()
    },
    methods:{
      brandlist () {
        let _this = this
        let data = {
            token:this.$webapi.get('token')
        }
        this.$api.get('/brand/findList',data,reset => {
            if (reset.codeId === 1) {
                _this.branddata = reset.resData
            }
        })
      },
      itemlist (e) {
        this.branddata.forEach(function (a) {
           a.show = false
        })
        e.show = true
        this.newitem.brandId = e.id
        this.newitem.brandName = e.brandName
        this.cardModel(e)
      },
      cardModel(e){
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            brandId:e.id
        }
        this.$api.get('/car_model/list',data,reset => {
            if (reset.codeId === 1) {
                _this.cardModeldata = reset.resData
                _this.cardModeldata.forEach(function (a) {
                   a.show = false
                })
            }
        })
      },
      cardModelTick (e) {
        this.cardModeldata.forEach(function (a) {
           a.show = false
        })
        e.show = true
        this.newitem.cardModelId = e.id
        this.newitem.modelName = e.modelName
      },
      additem () {
          this.$router.push({path:"/item/additemlist/"+this.newitem.cardModelId+"/"+this.newitem.modelName+"/"+this.newitem.brandId+"/"+this.newitem.brandName})
      },
      areaEmit (e) {
         this.areaData = e
      }
    }
}
</script>
