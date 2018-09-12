<style scoped="" lang="less">
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
                    <FormItem label="租车保证金">
                        <Input v-model="formItem.cashDeposit" placeholder="租车保证金" style="width: 300px"></Input>
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
                         <Input v-model="formItem.subscription" placeholder="预售定金" style="width: 300px" ></Input>
                     </FormItem>
                   </Col>
                   </Row>
                 </div>
                 <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
             <div class="pagelist-hd">上传商品图片</div>
             <div class="pagelist-bd">
                 <Upload @uploadComponent="uploadComponent" :model="12" v-if="show"></Upload>
                 <div class="mt10">
                   <Alert type="warning" show-icon>
                       图片不能超过2M
                       <span slot="desc">上传图片尺寸1200*800 4:3比例</span>
                   </Alert>
                 </div>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
        </div>
        <div class="pagelist">
             <div class="pagelist-hd">车辆型号SKU</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="24" :lg="24">
                 <FormItem label="">
                    <div v-for="item in cardModel" class="itemsku">
                      <p class="itemsku-img"><img :src="item.pic" ></p>
                      <p>{{item.skuCodeCombination}}</p>
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
                   <ue @UE_data="uedata"></ue>
               </div>
          </div>
         <FormItem style="margin-top:80px;">
           <Button type="primary" @click="handleSubmit('formItem')" size="large">我要发布</Button>
           <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px" size="large">返回</Button>
       </FormItem>
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
              itemType:"1",
              money:"",
              prop:[],
              imageList:[]
            },
            cardModel:[],
            yushoushow:false,
            show:false,
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
      this.formItem.modelName = this.$route.params.title
      this.formItem.brandName = this.$route.params.brandName
      this.cardlist()
      this.show = true
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
      cardlist () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            carModelId:this.$route.params.id
        }
        this.$api.get('/car_sku/list',data,reset => {
            if (reset.codeId === 1) {
                _this.cardModel = reset.resData
            }
        })
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.post()
            }
        })
      },
      post () {
        let _this = this
        if(_this.formItem.prop==""){
            this.$Message.error('商品详情没有填写')
          return
        }
        if(_this.formItem.imageList.length<1){
          this.$Message.error('商品图片至少要1张以上')
          return
        }
        if(_this.yushoushow){
          if(_this.formItem.subscription==""){
             this.$Message.error("预售定金不能为空")
             return
          }
        }
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
        var data = []
        if(e.items.length>0){
          e.items.forEach(function (a,index) {
            data.push({
              url:a,
              sequence:""+index
            })
          })
        }
        this.formItem.imageList = data
      },
      uedata (e) {
         this.formItem.prop = e
      },
      handleReset(){
        this.$router.back(-1);
      }
    }
}

</script>
