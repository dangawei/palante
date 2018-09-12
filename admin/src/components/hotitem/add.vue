<template>
    <div class="">
      <div id="J_hotitem" v-show="show">
           <div class="hotitem-info">
              <div class="hotitem-hd">
                  <h2>添加热门商品</h2>
              </div>
              <div class="hotitem-bd">
                    <div class="J_brand">
                        <a @click="branditem({})">全部</a>
                        <a v-for="brandlist in brand" @click="branditem(brandlist)">{{brandlist.brandName}}</a>
                    </div>
                    <div class="J_itemdata">
                        <ul>
                          <li v-for="item in itemlist" @click="additem(item)">
                            <div class="itemimg">
                                <img :src="item.modelPic" alt="" width="50" height="50">
                            </div>
                            <div class="itemname">
                              {{item.modelName}}-{{item.name}}
                            </div>
                          </li>
                        </ul>
                    </div>
              </div>
              <div class="J_hotitem_btn">
                  <Button type="primary" @click="add">添加</Button>
                  <Button type="error" @click="error">取消</Button>
              </div>
           </div>
      </div>
    </div>
</template>
<style lang="less">
 #J_hotitem{
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
   background: rgba(0,0,0,.5);
   z-index:999;
   .hotitem-info{
     position: absolute;
     width: 600px;
     left: 50%;
     margin-left: -300px;
     top: 200px;
     background: #fff;
     border-radius: 2px;
     .hotitem-hd{
       h2{
         border-bottom: #ddd 1px solid;
         padding: 15px;
         text-align: left;
       }
     }
     .hotitem-bd{
       height: 400px;
     }
     .J_brand{
       float: left;
       width: 200px;
       border-right: #ddd 1px solid;
       height: 400px;
       overflow-y: auto;
       a{
         float: left;
         width: 100%;
         height: 40px;
         line-height: 40px;
         border-bottom: #ddd 1px solid;
         color: #333
       }
     }
     .J_itemdata{
       float: left;
       width: 380px;
       padding: 0 10px;
       height: 400px;
       overflow-y: auto;
       ul{
         li{
           float: left;
           border-bottom: #ddd 1px solid;
           height: 60px;
           width: 100%;
           padding: 5px 0;
           cursor: pointer;
           .itemimg{
             float: left;
             height: 50px;
             overflow: hidden;
             margin-right: 10px;
           }
           .itemname{
             float: left
           }
         }
         li:hover{
           background: #eee
         }
       }
     }
     .J_hotitem_btn{
       padding: 10px 0;
       margin-top: 10px;
     }
   }
 }
</style>
<script>
    export default {
        props:{
          itemshow:{
            default:true
          }
        },
        name:"add",
        mounted() {
          this.show = this.itemshow
          this.brandlist()
          this.itemalllist()
        },
        data () {
            return {
                show:false,
                passwordshow:true,
                departmentvalue:"",
                brand:[],
                itemlist:[],
                formdata:{},
                itemformdata:{
                  brandId:""
                }
            }
        },
        methods: {
           branditem (item) {
            this.itemformdata.brandId = item.id || ""
            this.itemalllist()
           },
           additem (item) {
             this.formdata = item
           },
           error() {
              this.$emit("hotitem",false)
           },
           add() {
             if(this.formdata.id=="" || this.formdata.id==undefined || this.formdata.id==null){
               this.$Message.info("商品没有选择")
               return
             }
             let _this = this
             let data = {
               token:this.$webapi.get('token'),
               itemId:this.formdata.id
             }
             this.$api.post('/hot_recommended/save',data,reset => {
                 if (reset.codeId === 1) {
                   _this.$emit("hotitem",false)
                 }else {
                   _this.$netcode.getApiCode(reset)
                }
             })
           },
           brandlist () {
             let _this = this
             let data = {
               token:this.$webapi.get('token'),
             }
             this.$api.get('/brand/findList',data,reset => {
                 if (reset.codeId === 1) {
                   let data = reset.resData
                   if(data.length>0){
                    _this.brand = data
                   }else{
                     _this.brand =[]
                   }
                 }else {
                   _this.$netcode.getApiCode(reset)
                }
             })
           },
           itemalllist () {
             let _this = this
             let data = {
               token:this.$webapi.get('token'),
               itemStatus:4,
               brandId:this.itemformdata.brandId
             }
             this.$api.get('/item/list',data,reset => {
                 if (reset.codeId === 1) {
                   let data = reset.resData
                   if(data.length>0){
                    _this.itemlist = data
                   }else{
                     _this.itemlist =[]
                   }
                 }else {
                   _this.$netcode.getApiCode(reset)
                }
             })
           }
        }
    }
</script>
