<!--
orderBuyerTotalAll，经销商订单总的统计；
orderBuyerTotalList，经销商下订单各门店的总统计；
orderBuyerTypeList，经销商按订单类型统计；
orderBuyerTypeStore，经销商下门店按订单类型统计；
-->
<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem >统计</BreadcrumbItem>
          <BreadcrumbItem >分公司订单统计列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>分公司订单统计列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                     <Col :xs="24" :sm="24" :md="12" :lg="8">
                        <FormItem label="开始时间" >
                          <DatePicker type="date" v-model="formCustom.startTime" placeholder="开始时间" @on-change="startTime"></DatePicker>
                          <DatePicker type="date" v-model="formCustom.endTime" placeholder="结束时间" @on-change="endTime"></DatePicker>
                        </FormItem>
                    </Col>
                   <Col :xs="24" :sm="24" :md="12" :lg="6">
                     <div class="">
                       <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit()">查询</Button>
                       </FormItem>
                     </div>
                   </Col>
               </Row>
           </Form>
       </div>
        <!--操作按钮-->
        <div class="cardBox" v-if="show">
          <Row>
             <Col :xs="24" :sm="24" :md="6" :lg="6">
               <div class="total_card">
                 <Card>
                     <div class="zd_cardbody">
                       <div class="card_hd">
                          <div class="">订单总金额</div>
                          <div class="">
                            <Tooltip content="指标说明" placement="top">
                               <Icon type="ios-information-outline" size="20"></Icon>
                           </Tooltip>
                          </div>
                       </div>
                       <div class="card_bd">
                         <i-circle :percent="percent">
                             <span class="demo-Circle-inner" style="font-size:24px">
                               <span v-if="data.orderBuyerTotalAll.tradeAmount==0">0</span>
                               <span v-else>
                                 <countTo :startVal='0' decimals="2"   decimal="." :endVal='data.orderBuyerTotalAll.tradeAmount' :duration='data.orderBuyerTotalAll.tradeAmount'></countTo>
                               </span>
                             </span>
                         </i-circle>
                       </div>
                       <div class="card_foot mt10">
                         <span class="gray">订单笔数:{{data.orderBuyerTotalAll.orderQuantity}} 车辆数:{{data.orderBuyerTotalAll.orderCarQuantity}}</span>
                         <span @click="cardview(0)">
                           <Button type="primary">进入详情</Button>
                         </span>
                       </div>
                     </div>
                 </Card>
               </div>
             </Col>
             <Col :xs="24" :sm="24" :md="6" :lg="6">
               <div class="total_card">
                 <Card>
                     <div class="zd_cardbody">
                       <div class="card_hd">
                          <div class="">售卖订单总金额</div>
                          <div class="">
                            <Tooltip content="售卖订单总金额" placement="top">
                               <Icon type="ios-information-outline" size="20"></Icon>
                           </Tooltip>
                          </div>
                       </div>
                       <div class="card_bd">
                         <i-circle :percent="percent">
                           <span class="demo-Circle-inner" style="font-size:24px">
                             <span v-if="data.orderBuyerTypeAdminList[0].tradeAmount==0">0</span>
                             <span v-else>
                               <countTo :startVal='0' decimals="2" decimal="." :endVal='data.orderBuyerTypeAdminList[0].tradeAmount' :duration='data.orderBuyerTypeAdminList[0].tradeAmount'></countTo>
                            </span>
                            </span>
                         </i-circle>
                       </div>
                       <div class="card_foot mt10">
                         <span class="gray">订单笔数:{{data.orderBuyerTypeAdminList[0].orderQuantity}} 车辆数:{{data.orderBuyerTypeAdminList[0].orderCarQuantity}}</span>
                         <span @click="cardview(1)">
                           <Button type="primary">进入详情</Button>
                         </span>
                       </div>
                     </div>
                 </Card>
               </div>
             </Col>
             <Col :xs="24" :sm="24" :md="6" :lg="6">
             <div class="total_card">
               <Card>
                   <div class="zd_cardbody">
                     <div class="card_hd">
                        <div class="">租车订单总金额</div>
                        <div class="">
                          <Tooltip content="租车订单总金额" placement="top">
                             <Icon type="ios-information-outline" size="20"></Icon>
                         </Tooltip>
                        </div>
                     </div>
                     <div class="card_bd">
                       <i-circle :percent="percent">
                         <span class="demo-Circle-inner" style="font-size:24px">
                           <span v-if="data.orderBuyerTypeAdminList[1].tradeAmount==0">0</span>
                           <span v-else>
                             <countTo :startVal='0' decimals="2" decimal="." :endVal='data.orderBuyerTypeAdminList[1].tradeAmount' :duration='data.orderBuyerTypeAdminList[1].tradeAmount'></countTo>
                          </span>
                         </span>
                       </i-circle>
                     </div>
                     <div class="card_foot mt10">
                       <span class="gray">订单笔数:{{data.orderBuyerTypeAdminList[1].orderQuantity}} 车辆数:{{data.orderBuyerTypeAdminList[1].orderCarQuantity}}</span>
                       <span @click="cardview(1)">
                         <Button type="primary">进入详情</Button>
                       </span>
                     </div>
                   </div>
               </Card>
             </div>
             </Col>
             <Col :xs="24" :sm="24" :md="6" :lg="6">
               <div class="total_card">
               <Card>
                   <div class="zd_cardbody">
                     <div class="card_hd">
                        <div class="">预售订单总金额</div>
                        <div class="">
                          <Tooltip content="预售订单总金额" placement="top">
                             <Icon type="ios-information-outline" size="20"></Icon>
                         </Tooltip>
                        </div>
                     </div>
                     <div class="card_bd">
                       <i-circle :percent="percent">
                         <span class="demo-Circle-inner" style="font-size:24px">
                           <span v-if="data.orderBuyerTypeAdminList[2].tradeAmount==0">0</span>
                           <span v-else>
                             <countTo :startVal='0' decimals="2" decimal="." :endVal='data.orderBuyerTypeAdminList[2].tradeAmount' :duration='data.orderBuyerTypeAdminList[2].tradeAmount'></countTo>
                          </span>
                         </span>
                       </i-circle>
                     </div>
                     <div class="card_foot mt10">
                       <span class="gray">订单笔数:{{data.orderBuyerTypeAdminList[2].orderQuantity}} 车辆数:{{data.orderBuyerTypeAdminList[2].orderCarQuantity}}</span>
                       <span @click="cardview(1)">
                         <Button type="primary">进入详情</Button>
                       </span>
                     </div>
                   </div>
               </Card>
              </div>
             </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="total_card">
                <Card>
                    <div class="zd_cardbody">
                      <div class="card_hd">
                         <div class="">分公司下订单各经销商的总统计</div>
                         <div class="">
                           <Tooltip content="分公司下订单各经销商的总统计" placement="top">
                              <Icon type="ios-information-outline" size="20"></Icon>
                          </Tooltip>
                         </div>
                      </div>
                      <div class="card_bd">
                        <Tabs value="1" @on-click="tablist" >
                            <TabPane label="经销商" name="1">
                              <div class="" style="margin:0 10px">
                                  <Table border :columns="columnsdata" :data="dearldata.orderBuyerTotalDealerList"></Table>
                              </div>
                            </TabPane>
                        </Tabs>
                      </div>
                    </div>
                </Card>
              </div>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="total_card mt20">
                <Card>
                    <div class="zd_cardbody">
                      <div class="card_hd">
                         <div class="">分公司下经销商按订单类型统计</div>
                         <div class="">
                           <Tooltip content="指标说明" placement="top">
                              <Icon type="ios-information-outline" size="20"></Icon>
                          </Tooltip>
                         </div>
                      </div>
                      <div class="card_bd">
                        <Tabs value="1" @on-click="tablist" >
                            <TabPane label="售卖" name="1">
                              <div class="" style="margin:0 10px">
                                  <Table border :columns="columnsdata" :data="newdata" v-if="tabshow==1"></Table>
                              </div>
                            </TabPane>
                            <TabPane label="租车" name="2">
                              <div class="" style="margin:0 10px">
                                <Table border :columns="columnsdata" :data="newdata" v-if="tabshow==2"></Table>
                              </div>
                            </TabPane>
                            <TabPane label="预售" name="3">
                              <div class="" style="margin:0 10px">
                               <Table border :columns="columnsdata" :data="newdata" v-if="tabshow==3"></Table>
                              </div>
                            </TabPane>
                        </Tabs>
                      </div>
                    </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
  import countTo from 'vue-count-to'
  export default {
    components: {
        countTo
    },
    data () {
        return {
            show:false,
            percent:100,
            formCustom:{
              startTime:"",
              endTime:""
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            data:{},
            dearldata:{},
            tabshow:1,
            columnsdata: [
                {
                    title: '经销商名称',
                    key: 'id',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.dealerName)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '总金额',
                    key: 'tradeAmount',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.tradeAmount)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '订单笔数',
                    key: 'orderQuantity',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.orderQuantity)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:180,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.$router.push({path:"/dearleorder/order",query:{
                                          startTime:this.formCustom.startTime,
                                          endTime:this.formCustom.endTime,
                                          subcompanyId:params.row.subcompanyId,
                                          order_type:params.row.orderType
                                      }})
                                    }
                                }
                            }, '进入详情'),
                        ]);
                    }
                }
            ],
            newdata:[]
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      cardview (e){
        this.$router.push({path:"/dearleorder/order",query:{
            startTime:this.formCustom.startTime,
            endTime:this.formCustom.endTime,
            order_type:e
        }})
      },
      handleSubmit () {
        this.list()
      },
      list () {
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime
        }
        this.$api.get('/order_statistics/subcompany_total',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData
             _this.show = true
             _this.shoplist()
          }
        })
      },
      shoplist (){
        var _this =  this
        var listdata = {
          token:this.$webapi.get('token'),
          startTime:this.formCustom.startTime,
          endTime:this.formCustom.endTime,
          dealer_id:""
        }
        this.$api.get('/order_statistics/dealer_total',listdata,reset => {
          if (reset.codeId === 1) {
              _this.dearldata = reset.resData
              _this.newtablist(1)
          }
        })
      },
      tablist (e) {
        this.tabshow = e
        this.newtablist(e)
      },
      newtablist (e){
        var resetdata = []
        if(this.dearldata.orderBuyerTypeDealer.length>0){
          this.dearldata.orderBuyerTypeDealer.forEach(function (a) {
            if(a.orderType == e){
               resetdata.push(a)
            }
          })
        }
        this.newdata = resetdata
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.list()
      },
      startTime (e) {
        this.formCustom.startTime = e
      },
      endTime (e) {
        this.formCustom.endTime = e
      },
      storeEmit (e) {
        this.formCustom.dealer_storefront_name = e.name
      }
    }
  }
</script>
<style lang="less" scoped>
   .page-component-view{
     background:#f5f7f9!important
   }
   .total_card{
     margin: 0 10px;
   }
</style>
