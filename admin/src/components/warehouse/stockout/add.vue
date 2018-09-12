<style scoped lang="less">
  .exportcar{
    .exportcar-hd{
      height: 50px;
      line-height: 50px;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    .exportcar-bd{
      .carListBox{
         display: block;
         overflow: hidden;
         border: #ddd 1px solid;
        .carLsit{
          float: left;
          width: 100%;
          .carList-hd{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            padding: 15px 8px;
            border-bottom: #ddd 1px solid;
          }
          .carList-bd{
            ul{
              li{
                float: left;
                width: 100%;
                line-height: 35px;
                padding:10px;
                display:flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem >出库单列表</BreadcrumbItem>
                <BreadcrumbItem>添加出库单</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加出库单</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-hd">经销商信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="经销商名称:" required >
                                     <dearle-Component @dearleEmitComponent="dearleEmitComponent"></dearle-Component>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="选择采购单:" required >
                                    {{reset.purchase_order_no}}
                                    <Button type="primary" @click="select()">选择采购单单号</Button>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24" v-if="carlistdata.length>0">
                                <FormItem label="采购清单:" required >
                                  <Card style="width:350px">
                                     <ul>
                                         <li v-for="item in carlistdata">{{item.carModel}}-{{item.carSku}}<span class="fr">{{item.purchaseQuantity}}辆</span></li>
                                      </ul>
                                 </Card>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
            </Form>
            <Form :label-width="100">
                <div class="pagelist">
                     <div class="pagelist-hd">车辆信息</div>
                     <div class="pagelist-bd">
                        <div class="exportcar">
                            <div class="exportcar-hd">
                                <span>已选择车辆</span>
                                <span @click="add()"> <Button type="primary">添加车辆</Button></span>
                            </div>
                            <div class="exportcar-bd">
                                <div class="carListBox">
                                  <div class="carLsit" v-for="(item,itemindex) in data">
                                      <div class="carList-hd">
                                            <div class="">
                                                {{item.name}}{{item.skuValue}} <Badge :count="item.list.length"></Badge>
                                            </div>
                                            <div class="">
                                                <span v-if="item.show" @click="open(item)">
                                                  <Button type="ghost">收起</Button>
                                                </span>
                                                <span v-else @click="open(item)">
                                                  <Button type="ghost">展开</Button>
                                                </span>
                                            </div>
                                      </div>
                                      <div class="carList-bd" v-if="item.show">
                                          <ul>
                                            <li v-for="(itemlist,itemlistindex) in item.list">
                                              <div class="">
                                                 {{itemlist.vin}} - {{itemlist.licencePlateNumber}}
                                              </div>
                                              <div class="">
                                                <Button type="error" @click="delitem(itemlistindex,item,itemindex)">删除</Button>
                                              </div>
                                            </li>
                                          </ul>
                                      </div>
                                  </div>
                                </div>
                                <div class="mt20" style="text-align:center">
                                    <span @click="save()">
                                       <Button type="primary" :disabled="this.data.length<1 || saveshow">提交出库单</Button>
                                     </span>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div class="page-divider page-divider-horizontal "></div>
                 </div>
            </Form>
        </div>
    </div>
    <add-component v-if="addshow" :addshow="addshow" :purchaseorderid="reset.purchase_order_id" @addcarcomponent="addcarcomponent" @closecarcomponent="closecarcomponent"></add-component>
    <add-purchaseorder v-if="addpurchaseshow" :addpurchaseshow="addpurchaseshow" @emitcomponent="emitcomponent" :dealerId="reset.dealerId" :dealername="reset.dealername"></add-purchaseorder>
</div>
</template>
<script>
import dearleComponent from "../../pub/alldearleComponent.vue"
import addComponent from "./addComponent.vue"
import addPurchaseorder from "../../pub/purchaseorder.vue"
export default{
    components: {
      dearleComponent,
      addComponent,
      addPurchaseorder
    },
    mounted(){

    },
    data(){
        return {
           addpurchaseshow:false,
           addshow:false,
           kong:"",
           reset:{
              dealerId:"",
              dealername:"",
              stockOutType:"",
              address:"",
              carList:"",
              purchase_order_no:"",
              purchase_order_id:""
           },
           carlistdata:[],
           saveshow:false,
           data:[]
        }
    },
    methods:{
       emitcomponent (e) {
         if(e!=null){
           this.reset.purchase_order_no = e.purchaseOrderNo
           this.reset.purchase_order_id = e.id
           this.plist()
         }
         this.addpurchaseshow = false
       },
       plist () {
         var _this = this
         var data = {
           token:this.$webapi.get("token"),
           id:this.reset.purchase_order_id
         }
         this.$api.get("/purchase_order/detail", data, reset => {
           if (reset.codeId === 1) {
              this.carlistdata = reset.resData.purchaseOrderDetailVOList
           }
         })
       },
       select () {
         var _this = this
         if(this.reset.purchase_order_no){
             this.$Modal.confirm({
                title:"提示",
                content:"更换采购单,之前选择的采购单相关的内容，就会删除了，确认要更换吗？",
                onOk:function () {
                   _this.reset.purchase_order_no = ""
                   _this.reset.carList = []
                   _this.reset.data = []
                   _this.carlistdata=[]
                   _this.addpurchaseshow = true
                }
             })

         }else{
            this.addpurchaseshow = true
         }
       },
       add () {
          this.addshow = true
       },
       delitem (itemlistindex,item,index) {
         if(item.list.length==1){
            this.data.splice(index,1)
         }else{
           item.list.splice(itemlistindex,1)
         }
       },
       closecarcomponent () {
         this.addshow = false
       },
       addcarcomponent (e) {
          if(e.length>0){
            this.carlist(e)
          }
       },
       carlist (e) {
         var _this  = this;
         var item = e
         if(this.data.length>0){
           var data = this.data
           item.forEach(function (a) {
             if(data.length<1){
               var str = _this.newitem(a)
               data.push(str)
             }else {
               var idx = 0
               data.forEach(function (b) {
                   if(a.modelId == b.modelId && a.skuId == b.skuId){
                      idx = 1
                      var itemindex = 0
                      b.list.forEach(function (c) {
                        if(a.vin == c.vin){
                          itemindex = 1
                        }
                      })
                      if(itemindex==0){
                        b.list.push({
                          licencePlateNumber:a.licencePlateNumber,
                          vin:a.vin,
                          id:a.id
                        })
                      }
                   }
               })
               if(idx == 0){
                 var str = _this.newitem(a)
                 data.push(str)
               }
             }
           })
           this.data = data
          }else {
            var data = []
            item.forEach(function (a) {
              if(data.length<1){
                var str = _this.newitem(a)
                data.push(str)
              }else {
                var idx = 0
                data.forEach(function (b) {
                    if(a.modelId == b.modelId && a.skuId == b.skuId){
                       idx = 1
                       var itemindex = 0
                       b.list.forEach(function (c) {
                         if(a.vin == c.vin){
                           itemindex = 1
                         }
                       })
                       if(itemindex==0){
                         b.list.push({
                           licencePlateNumber:a.licencePlateNumber,
                           vin:a.vin,
                           id:a.id
                         })
                       }
                    }
                })
                if(idx == 0){
                  var str = _this.newitem(a)
                  data.push(str)
                }
              }
            })
            this.data = data
          }
       },
       resetitem (item) {
         var _this = this;
          var reset = []
          item.forEach(function (a) {
             var idx = 0
             if(reset.length>0){
                reset.forEach(function (b) {
                   if(b.skuId == a.skuId){
                      idx = 1
                      if(b.list.length>0){
                          var listidx = 0
                          b.list.forEach(function (e) {
                              if(a.vin == e.vin){
                                  listidx = 1
                              }
                          })
                        if(listidx==0){
                            var str = {
                              licencePlateNumber:a.licencePlateNumber,
                              vin:a.vin,
                              id:a.id
                            }
                            a.list.push(str)
                        }
                      }else{
                         //一般删除直接没有了
                      }
                   }
                })
                if(idx == 0){
                  var str = _this.newitem(a)
                     reset.push(str)
                }
             }else{
               var str = _this.newitem(a)
                  reset.push(str)
             }
          })
       },
       jieitem (){
         var reset = []
          this.data.forEach(function (a) {
            if(a.list.length>0){
               a.list.forEach(function (b) {
                  var str = {
                    name:a.modelName,
                    modelId:a.modelId,
                    show:false,
                    skuValue:a.skuValue,
                    skuId:a.skuId,
                    licencePlateNumber:b.licencePlateNumber,
                    vin:b.vin,
                    id:b.id
                  }
                  reset.push(str)
               })
            }
          })
         return reset
       },
       newitem (e) {
         var str = {
           name:e.modelName,
           modelId:e.modelId,
           show:false,
           skuValue:e.skuValue,
           skuId:e.skuId,
           list:[{
             licencePlateNumber:e.licencePlateNumber,
             vin:e.vin,
             id:e.id
           }]
         }
         return str
       },
       open (item) {
          item.show = !item.show
       },
       save () {
          if(this.reset.dealerId == ''){
             this.$Message.error('经销商没有选择')
             return
          }
          if(this.data.length<1){
             this.$Message.error('车辆没有选择')
             return
          }
          this.saveshow = true
          var reset = []
          this.data.forEach(function (item) {
            if(item.list.length>0){
              item.list.forEach(function (b) {
                var str = {
                  id:parseInt(b.id)
                }
                reset.push(str)
              })
            }
          })
          let _this = this
          var data = {
              token:this.$webapi.get("token"),
              dealerId:parseInt(this.reset.dealerId),
              stockOutType:1,
              address:this.reset.address,
              purchase_order_no:this.reset.purchase_order_no,
              carList:reset
          }
          data.carList = JSON.stringify(data.carList)
          this.$api.post("/warehouse_stockout/save", data, reset => {
             setTimeout(function () {
               _this.saveshow = false
             },300)
            if (reset.codeId === 1) {
               _this.$Message.success('添加成功')
               _this.$router.push({path:"/stockout/list/"})
            }else {
               _this.$netcode.getApiCode(reset)
           }
          })
       },
       dearleEmitComponent (e) {
         var _this = this
         this.reset.dealerId = e.id;
         this.reset.dealername = e.name;
         var dealerId = e
         var data = {
           token:this.$webapi.get("token"),
           status:1
         }
         this.$api.get("/dealer/getList", data, reset => {
           if (reset.codeId === 1) {
               var data = reset.resData
               data.forEach(function (a) {
                  if(a.id === dealerId){
                    _this.reset.address = a.address
                  }
               })
           }
         })
       }
    }
}
</script>
