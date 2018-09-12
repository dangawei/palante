<style scoped="" lang="less">
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
    width: 100%
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
</style>
<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>商品管理</BreadcrumbItem>
                <BreadcrumbItem>修改商品</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>修改商品</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
        <div class="pagelist">
             <div class="pagelist-hd">基本商品信息</div>
             <div class="pagelist-bd">
               <Row>
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
                 <FormItem label="商品名称" prop="name">
                     <Input v-model="formItem.name"></Input>
                 </FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="商品简介" prop="brief">
                     <Input v-model="formItem.brief"></Input>
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
                    <FormItem label="租车保证金" required>
                        <Input v-model="formItem.cashDeposit" maxlength="6" placeholder="租车保证金" style="width: 300px"></Input>
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
                       <i-switch size="large" v-model="yushoushow" @on-change="yushou">
                           <span slot="open">开启</span>
                           <span slot="close">关闭</span>
                       </i-switch>
                     </FormItem>
                   </Col>
                   <Col :xs="24" :sm="24" :md="24" :lg="24" v-if="formItem.itemType==2">
                     <FormItem label="预售定金" required>
                         <Input v-model="formItem.subscription" maxlength="6" placeholder="预售定金" style="width: 300px"></Input>
                     </FormItem>
                   </Col>
                   </Row>
                 </div>
                 <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
             <div class="pagelist-hd">上传图片</div>
             <div class="pagelist-bd">
                <div class="demo-upload-list" v-for="(item,index) in formItem.imageList" >
                    <img :src="item.url" width="50" height="50">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
                 <Upload @uploadComponent="uploadComponent" :model="12" v-if="imgshow"></Upload>
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
                   <ue @UE_data="uedata" :UE_editdata="formItem.prop" v-if ="show"></ue>
               </div>
               <!-- <div class="page-divider page-divider-horizontal "></div> -->
          </div>
          <div style="margin-top:80px;">
            <FormItem>
              <Button type="primary"  @click="handleSubmit('formItem')" size="large">保存</Button>
            </FormItem>
          </div>

      </Form>
      </div>
      </div>
</div>
</template>
<script>
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
            item:{},
            show:false,
            imageListdata:[],
            cardModel:[],
            name:"颜色",
            yushoushow:false,
            imgshow:false,
            ruleValidate: {
              name: [
                  { required: true, message: '商品名称没有填写', trigger: 'blur' }
              ],
              brief: [
                  { required: true, message: '商品简介没有填写', trigger: 'blur' }
              ],
            },
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.list()
      this.itemview()
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
                  _this.formItem.imageList.push(a)
                })
                _this.imgshow = true
            }
        })
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.additem()
            }
        })
      },
      additem(){
        let _this = this
        if(_this.formItem.prop==""){
            this.$Message.error('商品详情没有填写')
          return
        }
        if(_this.formItem.imageList.length<1){
          this.$Message.error('商品图片至少要1张以上')
          return
        }
        let data = {
            id:parseInt(this.$route.params.id),
            token:this.$webapi.get('token'),
            modelId:parseInt(this.formItem.carModelId),
            brief:this.formItem.brief,
            name:this.formItem.name,
            itemType:parseInt(this.formItem.itemType),
            subscription:this.formItem.subscription,
            cashDeposit:this.formItem.cashDeposit,
            prop:this.formItem.prop
        }
        this.$api.post("/item/update",data,reset => {
            if (reset.codeId === 1) {
               _this.$router.push({path:"/item/list"})
            }else{
               _this.$netcode.getApiCode(reset)
            }
        })
      },
      handleRemove (e) {
        let _this = this
        var data = {
            token:this.$webapi.get("token"),
            id:parseInt(e.id)
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
      uploadComponent (e) {
         var _this = this
          this.imgshow = false
          var data = {
              token:this.$webapi.get("token"),
              itemId:parseInt(this.$route.params.id),
              imageList:[]
          }
          if(e.items.length>0){
            e.items.forEach(function (a,index) {
                var str = {
                  url:a,
                  sequence:index
                }
                data.imageList.push(str)
            })
          }else {
            return
          }
          data.imageList = JSON.stringify(data.imageList)
          this.$api.post("/item_image/saveList",data, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('添加')
                _this.itemview()
                _this.imgshow = true
            }else {
              _this.$netcode.getApiCode(reset)
              _this.itemview()
              _this.imgshow = true
           }
          })
      }
    }
}

</script>
