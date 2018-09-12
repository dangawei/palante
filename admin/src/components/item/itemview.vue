<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/item/list">商品管理</BreadcrumbItem>
                <BreadcrumbItem>发布商品</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>发布商品</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
        <Alert type="error" v-if="formItem.itemStatus==2">
         审核不通过理由
          <span slot="desc">
             {{formItem.auditFailure}}
          </span>
       </Alert>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
        <div class="pagelist">
             <div class="pagelist-hd">基本商品信息</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="商品状态">
                     <span v-if="formItem.itemStatus==1">等待审核</span>
                     <span v-if="formItem.itemStatus==2">审核不通过</span>
                     <span v-if="formItem.itemStatus==3">审核通过</span>
                     <span v-if="formItem.itemStatus==4">上架</span>
                     <span v-if="formItem.itemStatus==5">下架</span>
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="品牌名称">
                     {{this.formItem.brandName}}
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="车辆型号名称">
                     {{this.formItem.modelName}}
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="商品名称">
                      {{formItem.name}}
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="商品简介">
                     {{formItem.brief}}
                 </FormItem>
               </Col>
               </Row>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
              <div class="pagelist-hd">租车类型</div>
              <div class="pagelist-bd">
                <Row>
                  <Col :xs="24" :sm="24" :md="24" :lg="24" >
                    <FormItem label="租车保证金">
                         {{formItem.cashDeposit}}
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
         <div class="pagelist">
                 <div class="pagelist-hd">预售类型</div>
                 <div class="pagelist-bd">
                   <Row>
                   <Col :xs="24" :sm="24" :md="24" :lg="24">
                     <FormItem label="预售状态">
                       {{yushoushow==1?"开启":"关闭"}}
                     </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="24" :lg="24" v-if="formItem.itemType==2">
                     <FormItem label="预售定金">
                          {{formItem.subscription}}
                     </FormItem>
                   </Col>
                   </Row>
                 </div>
                 <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
             <div class="pagelist-hd">上传图片</div>
             <div class="pagelist-bd">
                 <span v-for="item in formItem.imageList" class="pageimgbox">
                    <img :src="item" alt="" >
                 </span>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
        </div>
        <div class="pagelist">
             <div class="pagelist-hd">车辆型号SKU</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="">
                   <div class="" v-for="item in cardModel">
                     <div class="itemviewsku" v-if="item.name == name">
                       <div class="fl label">
                         {{item.name}}
                       </div>
                       <div v-for="itemList in item.valueDoList" class="itemsku fl">
                         <p class="itemsku-img"><img :src="itemList.url" ></p>
                         <p>{{itemList.value}}</p>
                       </div>
                     </div>
                     <div v-else class="itemviewsku">
                       <div class="fl label">
                         {{item.name}}
                       </div>
                       <div v-for="itemList in item.valueDoList" class="fl">
                         <p class="valuename">{{itemList.value}}</p>
                       </div>
                     </div>
                   </div>
                 </FormItem>
               </Col>
               </Row>
             </div>
              <div class="page-divider page-divider-horizontal "></div>
           </div>
           <div class="pagelist">
               <div class="pagelist-hd">商品详情</div>
               <div class="pagelist-bd">
                   <div class="itemview" :style="itemviewac">
                     <div class="ql-editor" style="max-height:800px;overflow-y: scroll;" v-html="formItem.prop"></div>
                   </div>
               </div>
          </div>
          <!-- <div class="page-divider page-divider-horizontal "></div> -->
          <div style="margin-top: 80px;">
            <FormItem>
              <Button type="primary" @click="pass()" size="large" v-if="formItem.itemStatus==1">审核通过</Button>
              <Button type="primary" @click="nopass()" size="large" v-if="formItem.itemStatus==1">审核不通过</Button>
              <Button type="primary" @click="push()" size="large" v-if="formItem.itemStatus==3 || formItem.itemStatus==5">上架</Button>
              <Button type="primary" @click="pull()" size="large" v-if="formItem.itemStatus==4">下架</Button>
            </FormItem>
          </div>

      </Form>
      </div>
      </div>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Ue from '../pub/UE.vue'
import Upload from "../pub/Uploadimg.vue"
export default {
    components: {
      Upload,
      Ue
    },
    data() {
        return {
            formItem:{
              modelName:"",
              name:"",
              brandName:"",
              brief:"",
              itemType:"",
              money:"",
              prop:[],
              imageList:[]
            },
            name:"颜色",
            item:{},
            itemStatus:0,
            auditFailure:"",
            imageListdata:[],
            cardModel:[],
            show:false,
            yushoushow:false,
            imgshow:false,
            itemviewac:{},
            ruleValidate: {

            },
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.list()
      this.itemview()
      this.itemviewac = {
        width:window.innerWidth-400+"px"
      }
    },
    computed:{
        // itemStatus:function (e) {
        //     console.log(e)
        // }
    },
    methods:{
      yushou (e) {
         if(e){
            this.formItem.itemType = 2
            this.formItem.subscription = ""
         }else{
            this.formItem.itemType = 1
            this.formItem.subscription = ""
         }
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            id:this.$route.params.id
        }
        this.$api.get('/item/getOne',data,reset => {
            if (reset.codeId === 1) {
                  var data = reset.resData
                  _this.formItem.brandName = data.brandName
                  _this.formItem.modelName = data.modelName
                  _this.formItem.name = data.name
                  _this.formItem.brief = data.brief
                  _this.formItem.cashDeposit = data.cashDeposit
                  _this.formItem.subscription = data.subscription
                  _this.formItem.brandName = data.brandName
                  _this.formItem.itemType = data.itemType
                  _this.formItem.prop = data.prop
                  _this.formItem.itemStatus = data.itemStatus
                  _this.formItem.auditFailure = data.auditFailure
                  _this.formItem.carModelId = data.carModelId
                  if(data.itemType==2){
                    _this.yushoushow = true
                  }
                  _this.show = true
                  _this.cardmodel()
            }
        })
      },
      itemview () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            itemId:this.$route.params.id
        }
        this.$api.get('/item_image/list',data,reset => {
            if (reset.codeId === 1) {
                _this.imageListdata = reset.resData
                _this.formItem.imageList = []
                reset.resData.forEach(function (a) {
                  _this.formItem.imageList.push(a.url)
                })
                _this.imgshow = true
            }
        })
      },
      cardmodel () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            modelId:this.formItem.carModelId
        }
        this.$api.get('/sku_meta_property/getByModelId',data,reset => {
            if (reset.codeId === 1) {
                _this.cardModel = reset.resData
            }
        })
      },
      additem(){
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            modelId:parseInt(this.$route.params.id),
            brief:this.formItem.brief,
            name:this.formItem.name,
            itemType:parseInt(this.formItem.itemType),
            subscription:this.formItem.subscription,
            cashDeposit:this.formItem.cashDeposit,
            prop:this.formItem.prop,
            imageList:JSON.stringify(this.formItem.imageList)
        }
        this.$api.post("/item/save",data,reset => {
            if (reset.codeId === 1) {
               _this.$router.push({path:"/item/list"})
            }else{
               _this.$netcode.getApiCode(reset)
            }
        })
      },
      uploadComponent (e) {
        var _this = this
        this.imgshow = false
        if(e.length>0){
          _this.imageListdata.forEach(function (a) {
            var idx = 0
            e.forEach(function (b) {
               if(a == b.url){
                  idx = 1
               }
            })
            if(idx==0){
              _this.item = a
            }
          })
        }
        this.delpost()
      },
      delpost () {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            id:parseInt(this.item.id)
        }
        var url = "/item_image/delete?"+ this.$QS.stringify(data)
        this.$api.post(url, null, reset => {
          if (reset.codeId === 1) {
              _this.$Message.success('删除成功')
              _this.itemview()
          }else {
            _this.$netcode.getApiCode(reset)
            _this.itemview()
         }
        })
      },
      uedata (e) {
         this.formItem.prop = e
      },
      push () {
        this.itemStatus = 4
        this.post()
      },
      pass () {
         this.itemStatus = 3
         this.auit()
      },
      pull () {
        this.itemStatus = 5
        this.post()
      },
      nopass () {
        var _this = this;
         this.itemStatus = 2
         this.$Modal.confirm({
                   render: (h) => {
                       return h('Input', {
                           props: {
                               value: this.auditFailure,
                               autofocus: true,
                               placeholder: '审核不通过理由'
                           },
                           on: {
                               input: (val) => {
                                   this.auditFailure = val
                               }
                           }
                       })
                   },
                   onOk: () => {
                      _this.auit()
                   }
               })
      },
      auit () {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            id:parseInt(this.$route.params.id),
            itemStatus:this.itemStatus,
            auditFailure:this.auditFailure
        }
        var url = "/item/audit?"+ this.$QS.stringify(data)
        this.$api.post(url, null, reset => {
          if (reset.codeId === 1) {
              _this.$Message.success('操作成功')
              this.$router.push({path:"/item/list/"})
          }else {
            _this.$netcode.getApiCode(reset)
            _this.itemview()
         }
        })
      },
      post () {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            id:parseInt(this.$route.params.id),
            itemStatus:this.itemStatus,
            auditFailure:this.auditFailure
        }
        var url = "/item/update?"+ this.$QS.stringify(data)
        this.$api.post(url, null, reset => {
          if (reset.codeId === 1) {
              _this.$Message.success('操作成功')
              this.$router.push({path:"/item/list/"})
          }else {
            _this.$netcode.getApiCode(reset)
            _this.itemview()
         }
        })
      },
      itemStatus (e) {

      }
    }
}
</script>
<style scoped lang="less">
  .itemviewsku{
    float: left;
    width: 100%;
    .label{
      float: left;
      width: 80px;
    }
    .valuename{
      width: 80px;
      height: 30px;
      background: #00b5ab;
      color: #fff;
      border-radius: 2px;
      line-height: 30px;
      text-align: center;
      margin-right: 20px;
    }
  }
  .itemsku{
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
    width: 100px;
    overflow: hidden;
  }
  .itemsku p{
    float: left;
    width: 100%;
    text-align:center;
  }
  .itemsku-img{
    width: 100%;
    height: 100px;
    border: #ddd 1px solid;
    background: #fff;
    img{
      width: 100%
    }
  }
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
  .itemview{
    img{
      max-width:1200px!important
    }
  }
</style>
