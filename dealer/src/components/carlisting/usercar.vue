<template>
  <div class="">
   <Modal v-model="show" width="760" @on-cancel="cancel" :mask-closable="false">
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
                          <FormItem label="车牌Vin码" prop="value" >
                             <Input v-model="formValidate.vin" placeholder="车牌Vin码"  />
                           </FormItem>
                        </Col>
                     <Col :xs="24" :sm="24" :md="8" :lg="8">
                          <FormItem label="车牌号">
                              <Input v-model="formValidate.licencePlateNumber" placeholder="车牌号"  />
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
                      <span><Button type="primary" @click="save()">保存</Button></span>
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
  import carModel from '../pub/carmodel.vue'
  import skuModel from '../pub/skucomponent.vue'
  import Pages from '../pub/page.vue'
  export default {
    components:{
      carModel,
      skuModel,
      paging:Pages
    },
    props:{
      usercarshow:{
        default:false
      },
      userdata:{
        default:{}
      }
    },
    data () {
        return {
            itemdata:[],
            show:true,
            formValidate:{
              userAccountId:'',
              warehouseId:'',
              modelId:"",
              skuId:"",
              modelId:"",
              vin:""
            },
            columnsdata: [
                {
                    title: '车辆型号',
                    key: 'carModelName'
                },
                {
                    title: '属性值',
                    key: 'carSkuValue'
                },
                {
                    title: 'vin',
                    key: 'carVin'
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
                                      if(this.itemdata.length>=this.formValidate.quantity){
                                          this.$Message.info("你选择车辆数量为"+this.formValidate.quantity)
                                          return
                                      }
                                      this.data[params.index].show = true
                                      this.itemdata.push(params.row)
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
              pagesize:10,
            },
        }
    },
    mounted() {
      this.formValidate.userAccountId = this.userdata.userAccountId
      this.show = this.usercarshow
      this.list()
    },
    methods: {
      save () {
        this.exportList()
      },
      cancel (){
        this.exportList()
      },
      exportList () {
        this.show = false
        this.$emit("caruserlist",this.itemdata)
      },
      list () {
        var listdata = {
          userAccountId:this.formValidate.userAccountId,
          carVin:this.formValidate.carVin,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          licencePlateNumber:this.formValidate.licencePlateNumber,
          token:this.$webapi.get('token')
        }
        var _this =  this
        this.$api.get('/order_buyer/car_page',listdata,reset => {
          if (reset.codeId === 1) {
              var data =  reset.resData.list
              data.forEach(function (a) {
                a.show = false
              })
              _this.data = data
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
      }
    }
}
</script>
