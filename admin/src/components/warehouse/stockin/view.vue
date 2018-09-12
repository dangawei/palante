<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="">入库单列表</BreadcrumbItem>
          <BreadcrumbItem>入库单详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>入库单详情</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :label-width="100">
        <div class="pagelist">
             <div class="pagelist-hd">基本信息</div>
             <div class="pagelist-bd">
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="入库单号">{{formItem.stockInNo}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="仓库名称" >{{formItem.warehouseName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="采购单号" >{{formItem.purchaseOrderNo}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="数量">{{formItem.quantity}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="状态">{{formItem.status | status}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="入库时间">{{formItem.stockInDate | data}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="创建人">{{formItem.creatorName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="创建时间">{{formItem.createdAt | data}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="修改时间">{{formItem.updatedAt | data}}</FormItem>
               </Col>
               </Row>
               <Row>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核人">{{formItem.auditName}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核时间">{{formItem.auditedAt | data}}</FormItem>
               </Col>
               <Col :xs="24" :sm="24" :md="6" :lg="8">
                 <FormItem label="审核意见">{{formItem.auditOpinion}}</FormItem>
               </Col>
               </Row>
             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
            <div class="pagelist-hd">入库单列表</div>
            <div class="pagelist-bd">
               <Table border :columns="columnsdata" :data="data"></Table>
               <div class="mt20" style="text-align:center">
                 <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </div>
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
      <auit-component :addshow="auitshow" @emitcomponent="emitcomponent" v-if="auitshow"></auit-component>
  </div>
</template>
<script>
import auitComponent from "./auit.vue"
import Pages from '../../pub/page.vue'
export default {
  name: 'index',
  components: {
    auitComponent,
    Paging:Pages,
  },
  created() {
   this.list()
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
  }
 },
  data () {
    return {
      Uploadshow:false,
      formItem: {},
      status:"",
      auitshow:false,
      columnsdata: [
          {
              title: '分公司',
              key: 'companyName'
          },
          {
              title: '车辆型号',
              key: 'modelName'
          },
          {
              title: '车辆属性',
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
          }
      ],
      data:[],
      pageshow:false,
      pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:10,
      }
   }
  },
  mounted() {
    //do something after mounting vue instance
     this.status = this.$route.params.status
  },
  methods: {
    emitcomponent (e) {
      this.auitshow = false
      this.formItem = e
      if(e!=""){
        this.save()
      }
    },
    pageComponentDate (e) {
      this.pageData.pageCurrent = e.pageCurrent
      this.pageData.pagesize = e.pagesize
      this.list()
    },
    handleSubmit () {
      this.auitshow = true
    },
    list () {
      var listdata = {
        id:this.$route.params.id,
        token:this.$webapi.get('token'),
        pageNo:this.pageData.pageCurrent,
        pageSize:this.pageData.pagesize
      }
      var _this =  this
      this.$api.get('/warehouse_stockin/getOne',listdata,reset => {
        if (reset.codeId === 1) {
          _this.formItem = reset.resData.stockInDo
          _this.data = reset.resData.pagination.list
          _this.pageData.totalCount = reset.resData.pagination.totalCount
          _this.pageshow = true
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
      this.$api.post("/warehouse_stockin/audit",data,reset => {
        if (reset.codeId === 1) {
             this.$router.push({path:"/stockin/list/"})
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
