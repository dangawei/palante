<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="">出库单列表</BreadcrumbItem>
          <BreadcrumbItem>出库单详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>出库单详情</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :label-width="100">
        <div class="pagelist">
             <div class="pagelist-hd">出库基本信息</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="出库单号">{{formItem.stockOutDo.stockOutNo}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="出库类型" >{{formItem.stockOutDo.stockOutType | stockOutType}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="经销商" >{{formItem.stockOutDo.dealerName}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="状态">{{formItem.stockOutDo.status | status}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="创建人">{{formItem.stockOutDo.creatorName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="创建时间">{{formItem.stockOutDo.createdAt | data}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                   <FormItem label="仓库">{{formItem.stockOutDo.warehouseName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="出库地址">{{formItem.stockOutDo.address}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核人">{{formItem.stockOutDo.auditName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核时间">{{formItem.stockOutDo.auditedAt | data}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核意见">{{formItem.stockOutDo.auditOpinion}}</FormItem>
               </Col>
               </Row>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
              <div class="pagelist-hd">采购信息</div>
              <div class="pagelist-bd">
                <Row>
                <Col :xs="24" :sm="24" :md="6" :lg="8">
                  <FormItem label="采购单号">{{formItem.purchaseOrderDo.purchaseOrderNo}}</FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="8">
                  <FormItem label="送货地址" >{{formItem.purchaseOrderDo.shippingAddress}}</FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="6" :lg="8">
                  <FormItem label="采购金额" >{{formItem.purchaseOrderDo.totalPrice}}</FormItem>
                </Col>
                </Row>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
          </div>
         <div class="pagelist">
            <div class="pagelist-hd">出库单列表</div>
            <div class="pagelist-bd">
               <Table border :columns="columnsdata" :data="data"></Table>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
         </div>
         <FormItem>
           <span v-if="status==1">
             <Button type="primary" @click="handleSubmit()" size="large">审核</Button>
        </span>
       </FormItem>
      </Form>
      </div>
      </div>
      <auit-component :addshow="auitshow" @emitcomponent="emitcomponent"  @skucomponent="skucomponent" v-if="auitshow"></auit-component>
  </div>
</template>
<script>
import auitComponent from "./auit.vue"
export default {
  name: 'index',
  components: {
    auitComponent
  },
  created() {
    this.list()
    this.value = "111"
  },
  data () {
    return {
      value:"",
      Uploadshow:false,
      formItem: {},
      status:"",
      auitshow:false,
      columnsdata: [
          {
              title: '车辆型号',
              key: 'modelName'
          },
          {
              title: '车辆配置',
              key: 'skuValue'
          },
          {
              title: 'vin',
              key: 'vin'
          },
          {
              title: '车牌',
              key: 'licencePlateNumber'
          },
          {
              title: '电池编号',
              key: 'batterNumber'
          },
          {
              title: '电机编号',
              key: 'motorNumber'
          },
          {
              title: '终端号',
              key: 'terminalNumber'
          },
      ],
      data:[]
   }
  },
  filters: {
   data:function (input) {
       if(!input){
          return ""
       }
       var d = new Date(input);
       var year = d.getFullYear();
       var month = d.getMonth() + 1;
       var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
       var hour = d.getHours();
       var minutes = d.getMinutes();
       var seconds = d.getSeconds();
       return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
  },
  status:function (input) {
      var str = ""
      if(input==1){
         str="待审核"
      }
      if(input==2){
        str="审核通过"
      }
      if(input==3){
        str="审核不通过"
      }
     return str
  },
  stockOutType:function (input) {
      var str = ""
      if(input==1){
          str = "出库经销商"
      }
      if(input==2){
          str = "出库售出或用于出租"
      }
     return str
  },
 },
  mounted() {
    //do something after mounting vue instance
     this.status = this.$route.params.status
  },
  methods: {
    skucomponent (){
      this.auitshow = false
    },
    emitcomponent (e) {
      this.auitshow = false
      this.formItem = e
      this.save()
    },
    handleSubmit () {
      this.auitshow = true
    },
    list () {
      var listdata = {
        id:this.$route.params.id,
        token:this.$webapi.get('token'),
      }
      var _this =  this
      this.$api.get('/warehouse_stockout/getOne',listdata,reset => {
        if (reset.codeId === 1) {
           _this.formItem = reset.resData
           _this.data = reset.resData.messageDoList
        }else if(reset.codeId === -9){
           _this.data = []
        }
        else {
          _this.$netcode.getApiCode(reset)
       }
      })
    },
    save () {
      let _this = this
      var data = {
          token:this.$webapi.get("token"),
          id:parseInt(this.$route.params.id),
          status:parseInt(this.formItem.status),
          auditOpinion:this.formItem.auditOpinion
      }
      this.$api.post("/warehouse_stockout/audit",data,reset => {
          if (reset.codeId === 1) {
             this.$router.push({path:"/stockout/list/"})
          }else {
            _this.$netcode.getApiCode(reset)
         }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
