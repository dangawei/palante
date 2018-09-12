<template>
  <div class="">
   <Modal v-model="show" width="760" @on-cancel="cancel">
      <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>添加车辆</span>
      </p>
      <div style="text-align:center">
           <div class="carbox">
              <div class="carbox-hd">
                <Form :model="formValidate"  :label-width="80" :mask-closable="false">
                    <Row>
                       <Col :xs="24" :sm="24" :md="8" :lg="8">
                          <FormItem label="车辆型号:" prop="value" >
                            <car-model @carmodelselect="carmodelselect01"></car-model>
                          </FormItem>
                        </Col>
                     <Col :xs="24" :sm="24" :md="8" :lg="8">
                          <FormItem label="sku:">
                             <sku-model @skucomponentemit="skucomponentemit" :modelId="formValidate.modelId"></sku-model>
                          </FormItem>
                        </Col>
                       <Col :xs="24" :sm="24" :md="8" :lg="8">
                          <div class="">
                            <FormItem style="margin-left: -70px;text-align:left">
                                <Button type="primary" @click="handleSubmit()">查询</Button>
                            </FormItem>
                          </div>
                        </Col>
                    </Row>
                </Form>
              </div>
              <div class="carbox-bd">
                  <Table border :columns="columnsdata" :data="data"></Table>
                  <div class="mt20">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate"></paging>
                  </div>
                  <div class="mt20">
                    <span @click="colse()">
                       <Button type="primary" >关闭</Button>
                    </span>
                  </div>
              </div>
           </div>
      </div>
      <div slot="footer">
      </div>
   </Modal>
</div>
</template>
<style lang="less" scoped>
  .carbox{
    display: block;
    overflow: hidden;
    min-height: 500px;
    .carbox-hd{

    }
  }
</style>
<script>
  import warehouseComponent from '../../pub/warehouse.vue'
  import carModel from '../../pub/carmodel.vue'
  import skuModel from '../../pub/skucomponent.vue'
  import Pages from '../../pub/page.vue'
  export default {
    components:{
      warehouseComponent,
      carModel,
      skuModel,
      paging:Pages
    },
    props:{
      addshow:{
        default:false
      },
      purchaseorderid:{
        default:""
      }
    },
    data () {
        return {
            show:false,
            formValidate:{
              warehouseId:'',
              modelId:"",
              skuId:"",
              modelId:"",
              vin:""
            },
            columnsdata: [
                {
                    title: '车辆型号',
                    key: 'modelName'
                },
                {
                    title: '属性值',
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
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:180,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default',
                                    disabled:params.row.show
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                      this.data[params.index].show = true
                                      this.itemdata.push(params.row)
                                      this.save()
                                    }
                                }
                            }, '加入')
                        ]);
                    }
                }
            ],
            data:[],
            itemdata:[],
            pageshow:false,
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:5,
            },
        }
    },
    mounted() {
      this.show = this.addshow
      this.list()
    },
    methods: {
      save () {
        this.exportList()
      },
      cancel (){
        this.colse()
      },
      exportList () {
        this.$emit("addcarcomponent",this.itemdata)
      },
      colse () {
        this.show = false
        this.$emit("closecarcomponent",)
      },
      list () {       
        var listdata = {
          modelId:this.formValidate.modelId,
          skuId:this.formValidate.skuId,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          vin:this.formValidate.vin,
          token:this.$webapi.get('token'),
          purchaseOrderId:this.purchaseorderid,
          staticStatus:1
        }
        var _this =  this
        this.$api.get('/car/can_out_page',listdata,reset => {
          if (reset.codeId === 1) {
              _this.data = []
              var data = reset.resData.list
              if(data.length>0){
                  if(_this.itemdata.length>0){
                    data.forEach(function (a) {
                       var idx = 0
                       _this.itemdata.forEach(function (b) {
                         if(a.vin == b.vin){
                            a.show = true
                            idx = 1
                         }
                       })
                       if(idx==0){
                         a.show = false
                       }
                    })
                  }else {
                    data.forEach(function (a) {
                      a.show = false
                    })
                  }
                   _this.data = data
              }else {
                data.forEach(function (a) {
                  a.show = false
                })
                 _this.data = data
              }
             _this.pageData.totalCount = reset.resData.totalCount
             _this.pageshow = true
          }else if(reset.codeId === -9){
            _this.data = []
            _this.pageData.pageCurrent = 1
            _this.pageData.totalCount = 0
            _this.pageshow = true
          }
        })
      },
      handleSubmit () {
        this.list()
      },
      pageComponentDate (e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      skucomponentemit (e){
         this.formValidate.skuId = e
      },
      carmodelselect01 (e) {
         this.formValidate.modelId = e.id
      },
      wareemitcomponent (e) {
        this.formValidate.warehouseId = e
      },
    }
}
</script>
