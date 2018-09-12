<template>
  <div class="">
    <Modal v-model="show" width="800" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>采购单列表(付款过的)</span>
       </p>
       <div style="text-align:center;overflow: hidden;">
           <Form ref="formValidate" :model="formValidate"  :label-width="80">
               <Row>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                     <FormItem label="采购单单号:" prop="purchase_order_no">
                         <Input v-model="formValidate.purchase_order_no"></Input>
                     </FormItem>
                   </div>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                     <FormItem label="经销商名称:" prop="dealer_name">
                          <dearleComponent @dearleEmitComponent="dearleEmitComponent" :dealerId="dealerId"></dearleComponent>
                     </FormItem>
                   </div>
                 </Col>
                 <Col :xs="24" :sm="24" :md="8" :lg="8">
                   <div class="">
                     <FormItem>
                         <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
                     </FormItem>
                   </div>
                 </Col>
               </Row>
               <Row>
                 <Col :xs="24" :sm="24" :md="24" :lg="24">
                   <div>
                     <Table border :columns="columnsdata" :data="listdata"></Table>
                     <div class="mt20">
                       <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                     </div>
                   </div>
                 </Col>
               </Row>
           </Form>
       </div>
       <div slot="footer">
       </div>
    </Modal>
  </div>
</template>
<script>
import Pages from './page.vue'
import dearleComponent from './alldearleComponent.vue'
export default {
    props:{
      addpurchaseshow:{
         default:false
      },
      dealerId:{
        default:''
      },
      dealername:{
        default:""
      }
    },
    components: {
      Paging:Pages,
      dearleComponent
    },
    mounted() {
      //do something after mounting vue instance
      this.show = this.addpurchaseshow
      this.formValidate.dealer_name = this.dealername
      this.list()
    },
    data() {
        return {
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            newdata:{},
            formValidate:{
              dealer_name:'',
              purchase_order_no:''
            },
            pageshow:false,
            show:false,
            listdata:[],
            columnsdata:[
              {
                  title: '采购单单号',
                  key: 'id',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.purchaseOrderNo)
                    ]);
                  },
                  className:'ivu-table-column-center'
              },
              {
                  title: '经销商名称',
                  key: 'id',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.dealerIName)
                    ]);
                  },
                  className:'ivu-table-column-center'
              },
              {
                  title: '总金额',
                  key: 'id',
                  render: (h, params) => {
                    return h('div', [
                        h('span', params.row.totalPrice)
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
                      var disabled = false
                      if(params.row.status!==1){
                          disabled = true
                      }
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
                                    this.newdata = params.row
                                    this.exportdata()
                                  }
                              }
                          }, '选择')
                      ]);
                  }
              }
            ],
            addcarshow:true
        }
    },
    methods: {
        dearleEmitComponent (e){
            this.formValidate.dealer_name = e.name
        },
        pageComponentDate (e) {
          this.pageData.pageCurrent = e.pageCurrent
          this.list()
        },
        cancel () {
           this.remove()
        },
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要关闭吗?</p>',
                onOk: () => {
                    this.$emit("emitcomponent",null)
                },
                onCancel: () => {
                   this.show = true
                }
            });
        },
        handleSubmit (name) {
          this.list()
       },
       list () {
         let _this = this
         let data = {
             token:this.$webapi.get('token'),
             purchase_order_no:this.formValidate.purchase_order_no,
             pageNo:this.pageData.pageCurrent,
             pageSize:this.pageData.pagesize,
             dealer_name:this.formValidate.dealer_name,
             status:5
         }
         this.$api.get('/purchase_order/page',data,reset => {
             if (reset.codeId === 1) {
                 _this.listdata = reset.resData.list
                 _this.pageData.totalCount = reset.resData.totalCount
                 _this.pageshow = true
             }
             else if(reset.codeId === -9){
               _this.listdata = []
             }
             else {
                 _this.$netcode.getApiCode(reset)
             }
         })
       },
      exportdata () {
          this.show = false
          this.$emit('emitcomponent',this.newdata)
      }
    }
  }
</script>
