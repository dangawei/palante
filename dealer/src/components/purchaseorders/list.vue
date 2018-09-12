<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>采购单管理</BreadcrumbItem>
          <BreadcrumbItem>采购单列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>采购单列表</h2>
          </div>
      </div>
    </div>
    <div class="page-component-view">
     <div class="page-component-bd">
       <!--查询条件-->
       <div class="tableListForm">
           <Form ref="formCustom" :model="formCustom" :label-width="80">
               <Row>
                    <Col :xs="24" :sm="24" :md="8" :lg="8">
                      <FormItem label="采购单号" prop="purchaseOrderNo">
                        <AutoComplete
                            v-model="value2"
                            placeholder="请输入采购单号"
                            >
                            <Option v-for="item in buyiddata" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>

                       </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                      <div class="">
                        <FormItem style="margin-left: -70px;text-align:left">
                           <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                       </FormItem>
                     </div>
                   </Col>
               </Row>
           </Form>
       </div>
        <!--操作按钮-->
       <div class="tableListOperator">
          <Button type="primary"  @click="add()">添加</Button>
       </div>
      <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div class="">
                  <i-table border :columns="columnsdata" :data="data"></i-table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                  </div>
             </div>
         </Col>
      </Row>
    </div>
  </div>
  </div>
</template>
<script>
  import Pages from '../pub/page.vue'
  import citycommon from "../pub/citycommon.vue"
  export default {
    components: {
        Paging:Pages,
        citycommon
    },
    data () {
        return {
            addshow:true,
            editshow:false,
            pageshow:false,
            buyiddata:[

            ],
            value2:'',
            formCustom:{
              purchaseOrderNo:'',
              createdAt:'',
            },
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            columnsdata: [
                {
                    title: '采购单号',
                    key: 'purchaseOrderNo',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.purchaseOrderNo)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '总计费用(元)',
                    key: 'totalPrice',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.totalPrice)
                      ]);
                    },
                    className:'ivu-table-column-center'
                },
                {
                    title: '创建人',
                    key: 'creatorName',
                    render: (h, params) => {
                      return h('div', [
                          h('span', params.row.creatorName)
                    ])
                 }
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '修改人',
                    key: 'updatorName',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatorName)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                      var str = this.$webapi.gettime('date',(params.row.updatedAt)/1000)
                      return h('div', [
                          h('span', str)
                    ])
                 }
                },
                {
                  title: '状态',
                  key: 'status',
                  render: (h, params) => {
                    var str = ""
                    switch(params.row.status)
                    {
                      case 1:
                        str = "待提交";
                        break;
                      case 2:
                        str = "待审核";
                        break;
                      case 3:
                        str = "经销商审核通过,待平台确认";
                        break;
                      case 4:
                        str = "经销商审核不通过";
                        break;
                      case 5:
                        str = "平台确认发货";
                        break;
                      case 6:
                        str = "平台审核不通过";
                        break;
                      case 7:
                        str = "采购完成";
                        break;
                    }
                    return h('div', [
                        h('span', str)
                    ])
                  }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:250,
                    render: (h, params) => {
                        let boolValue=false
                        if (params.row.status==3  || params.row.status==5 || params.row.status==2 || params.row.status==4  || params.row.status==7) {
                          boolValue=true
                        }else{
                          boolValue=false
                        }
                        var editstatus = true
                        if(params.row.status!=4 && params.row.status!=1){
                          editstatus = true
                        }else{
                          editstatus = false
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                  type: 'primary',
                                  size: 'default',
                                  disabled:editstatus
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.$router.push({
                                        path:"/purchaseorder/editlist",
                                        query:{
                                          id:params.row.id,

                                        }
                                        // name:'POEditList',
                                        // params:{
                                        //   id:params.row.id
                                        // }
                                      })
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default',
                                    disabled:boolValue
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                       this.remove(params.row);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.$router.push({
                                        path:"/purchaseorder/detail",
                                        query:{
                                          id:params.row.id,
                                          status:params.row.status
                                        }
                                      })
                                    }
                                }
                            }, '详情'),
                        ]);
                    }
                }
            ],
            data: [],
        }
    },
    // beforeRouteEnte(to,from,next){
    //   next(em=>{
    //     console.log(vm.data);
    //     em.data.forEach((val,index,arr)=>{
    //       em.buyiddata.push(val.purchaseOrderNo);
    //     })

    //   })
    // },
    mounted() {
      console.log(this.$webapi.get('token'))
      this.list()
    },
    methods: {
      getbuyiddata(){

      },
      pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.pageData.pagesize = e.pagesize
          this.list()
      },
      list () {
        var listdata = {
          token:this.$webapi.get('token'),
          status:this.formCustom.status,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          purchase_order_no:this.value2,
        }
        var _this =  this
        this.$api.get('/purchase_order/page',listdata,reset => {
          if (reset.codeId === 1) {
             _this.data = reset.resData.list
             _this.buyiddata=[];
            _this.data.forEach((val,index,arr)=>{
              _this.buyiddata.push(val.purchaseOrderNo)
            })
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          } else {
            _this.$netcode.getApiCode(reset)
         }
        })
      },
      add () {
          this.$router.push({path:"/purchaseorder/addlist"})
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.purchaseOrderNo+'】要删除吗?</p>',
              onOk: () => {
                _this.itemdel(params.id)
              },
              onCancel: () => {

              }
          });

      },
      itemdel (params) {
        let _this = this
        // var url = "/purchase_order/delete?token=" + this.$webapi.get('token') + "&id="+params
        let datas={
          token:this.$webapi.get('token'),
          id:params
        }
        this.$api.post("/purchase_order/delete",datas, reset => {
          if (reset.codeId === 1) {
            _this.$Message.success("删除成功!");
            _this.list();
          }else {
            _this.$netcode.getApiCode(reset)
          }
        })
     },

     handleSubmit (name) {
       this.pageshow = false
       this.pageData.pageCurrent = 1
       this.list()
    },
    handleReset (name) {
        this.$refs[name].resetFields()
        this.list()
     }
    }
  }
</script>
