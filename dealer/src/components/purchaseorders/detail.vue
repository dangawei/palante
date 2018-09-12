<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/purchaseorder">采购单管理</BreadcrumbItem>
          <BreadcrumbItem>采购单详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>采购单{{formItem.purchaseOrderNo}}详情</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate">
        <div class="pagelist">
          <div class="pagelist-hd">操作详情</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="创建人:" prop="creatorName">
                    <p>{{formItem.creatorName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="创建时间:" prop="createdAt">
                    <p>{{formItem.createdAt}}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="修改人:" prop="updatorName">
                    <p>{{formItem.updatorName}}</p>
                  </FormItem>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="修改时间:" prop="updatedAt">
                    <p>{{formItem.updatedAt}}</p>
                  </FormItem>
                </Col>
              </Row>

             </div>
             <div class="page-divider page-divider-horizontal "></div>
         </div>
         <div class="pagelist">
            <div class="pagelist-hd">经销商信息</div>
            <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商名字:" label-position="left" prop="dealerName">
                            <p>{{formItem.dealerName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="收货地址:" label-position="left" prop="shippingAddress">
                            <p>{{formItem.shippingAddress}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商审核人:" label-position="left" prop="dealerAuditorName">
                            <p>{{formItem.dealerAuditorName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="经销商审核时间:" label-position="left" prop="dealerAuditedAt">
                            <p>{{formItem.dealerAuditedAt}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem label="经销商审核意见:" label-position="left" prop="dealerAuditOpinion">
                    <p>{{formItem.dealerAuditOpinion}}</p>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div class="page-divider page-divider-horizontal "></div>
            <div class="pagelist" v-if="adminAuditshow">
              <div class="pagelist-hd">总管理审核信息</div>
              <div class="pagelist-bd">
              <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="总管理审核人:" label-position="left" prop="adminAuditorName">
                            <p>{{formItem.adminAuditorName}}</p>
                        </FormItem>
                   </div>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="审核时间:" label-position="left" prop="adminAuditedAt">
                            <p>{{formItem.adminAuditedAt}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
              <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                        <FormItem label="审核意见:" label-position="left" prop="adminAuditOpinion">
                            <p>{{formItem.adminAuditOpinion}}</p>
                        </FormItem>
                   </div>
                </Col>
              </Row>
              </div>
              <div class="page-divider page-divider-horizontal "></div>
            </div>

            <Row>
              <div class="pagelist-hd">采购信息</div>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="">
                  <i-table border :columns="columnsdata" :data="formItem.purchaseOrderDetailVOList"></i-table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
                </div>
              </Col>

            </Row>
            <div class="page-divider page-divider-horizontal "></div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <p style="text-align:right;">
                  <strong>总计:</strong><span>{{formItem.totalPrice}}万元</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                  <div style="text-align: center;">
                    <Button type="primary"  @click="submit()" v-if="status==1">提交</Button>
                    <Button type="primary"  @click="Success()" v-if="status==5">完成</Button>
                  </div>
              </Col>
            </Row>
          </div>

        </Form>
      </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  components: {
    // Upload
  },
  created() {
    //do something after creating vue instance
    if (this.$route.query.status==5||this.$route.query.status==6) {
      this.adminAuditshow=true;
    }
  },
  data () {
    return {
      adminAuditshow:false,
      pageshow:false,
      formItem: {},
      detailData:[],
      ruleValidate: {

      },
      // 分页数据
      pageData:{
        totalCount:1,
        pageCurrent:1,
        pagesize:10,
      },
      // 监听采购单状态
      status:'',
      // 审核不通过弹窗
      nopassmodel:false,
      // 审核不通过理由
      opinion:'',
      columnsdata: [
        {
            title: '车辆型号',
            key: 'carModel',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.carModel)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: 'sku属性',
            key: 'carSku',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.carSku)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
            title: '采购数量',
            key: 'purchaseQuantity',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.purchaseQuantity)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
          title: '交货数量',
          key: 'deliveryQuantity',
          render: (h, params) => {
            return h('div', [
                h('span', params.row.deliveryQuantity)
            ]);
          },
          className:'ivu-table-column-center'
        },
        {
            title: '单价(元)',
            key: 'unitPrice',
            render: (h, params) => {
              return h('div', [
                  h('span', params.row.unitPrice)
              ]);
            },
            className:'ivu-table-column-center'
        },
        {
          title: '总价(元)',
          key: 'total',
          render: (h, params) => {

            return h('div', [
                h('span', params.row.totalPrice)
            ]);
          },
          className:'ivu-table-column-center'
        },
      ],
    }
  },
  mounted(){
    this.status=this.$route.query.status
    this.list()
  },
  methods: {
    submit () {
      let _this = this
      // var url = "/purchase_order/submit?token=" + this.$webapi.get('token') + "&id="+this.$route.query.id
      let datas={
        token:this.$webapi.get('token'),
        id:this.$route.query.id
      }
      this.$api.post("/purchase_order/submit", datas, reset => {
        if (reset.codeId === 1) {
          _this.$Message.success("提交成功!");
          _this.$router.push("/purchaseorder");
        }else {
          _this.$netcode.getApiCode(reset)
        }
      })
    },

    // 取消
    cancel(){
      this.nopassmodel=false;
      this.opinion='';
    },
    Success(){
      var datas = {
        token:this.$webapi.get('token'),
        id:this.formItem.id
      }
      this.$api.post("/purchase_order/make_sure",datas,reset=>{
        if (reset.codeId === 1) {
          this.$Message.success("采购单完成!")
          this.status=7;
        } else {
          _this.$netcode.getApiCode(reset)
        }
      })
    },
    list () {
      var listdata = {
        token:this.$webapi.get('token'),
        id:this.$route.query.id,
      }
      var _this =  this
      this.$api.get('/purchase_order/detail',listdata,reset => {
        if (reset.codeId === 1) {
          _this.formItem=reset.resData;
           _this.formItem.createdAt=this.$webapi.gettime('date',(_this.formItem.createdAt)/1000)
           _this.formItem.updatedAt=this.$webapi.gettime('date',(_this.formItem.updatedAt)/1000)
           _this.formItem.adminAuditedAt=this.$webapi.gettime('date',(_this.formItem.adminAuditedAt)/1000)
           _this.formItem.dealerAuditedAt=this.$webapi.gettime('date',(_this.formItem.dealerAuditedAt)/1000)
        } else {
          _this.$netcode.getApiCode(reset)
       }
      })

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
