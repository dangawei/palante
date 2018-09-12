<template>
	<div id="aboutus" style="width:100%">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/car">车辆管理</BreadcrumbItem>
          <BreadcrumbItem :to="'/areapricelist/'+this.$route.params.modelId">sku属性列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>{{skutitle}}区域价格列表</h2>
          </div>
      </div>
    </div>

    <div class="page-component-view">
      <div class="page-component-bd">
        <!-- <div class="tableListOperator">
          <Button type="primary"  @click="AddAreaPrice()">添加</Button>
        </div> -->

      	<Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <div>
              <i-table border :columns="columns" :data="areaPriceListDatas">

              </i-table>
            </div>

          </Col>
        </Row>
        <Row style="text-align:center">
          <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center;margin-top:15px">
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="ghost" @click="handleRet()">返回</Button>
          </Col>
        </Row>
        <Row style="text-align:center">
          <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
          </Col>
        </Row>
      </div>
    </div>

    <add-area-price-component v-if="addAreaPriceComponentShow" :addAreaPriceComponentShow="addAreaPriceComponentShow" :addAreaPriceComponentData="addAreaPriceComponentData" @addAreaPriceComponent="addAreaPriceComponent"></add-area-price-component>

    <edit-area-price-component v-if="editAreaPriceComponentShow" :editAreaPriceComponentShow="editAreaPriceComponentShow" :editAreaPriceComponentData="editAreaPriceComponentData" @editAreaPriceComponent="editAreaPriceComponent"></edit-area-price-component>

  </div>
</template>
<script>
  import AddAreaPriceComponent from './addareapricecomponent'
  import EditAreaPriceComponent from './editareapricecomponent'
  import Pages from '../pub/page.vue'
  export default {
    components:{
      AddAreaPriceComponent:AddAreaPriceComponent,
      EditAreaPriceComponent:EditAreaPriceComponent,
      Paging: Pages,
    },
    data(){
      return{
        // sku属性name
        skutitle:'',
        // 区域价格列表数据
        areaPriceListDatas:[],

        // 添加区域价格开关
        addAreaPriceComponentShow:false,
        addAreaPriceComponentData:'',
        // 修改区域价格开关
        editAreaPriceComponentShow:false,
        editAreaPriceComponentData:'',
        // 车辆分页数据
        pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:10,
        },
        pageshow:false,
        // 获取进入页面时的数据
        EnterData:'',

        // 原始的数据
        originalPriceDatas:[],
        //修改后的数据
        editPriceDatas:[],
        // 表格列的配置描述
        columns:[
          {
            title: '区域',
            key: 'skuCodeCombination',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.provinceName+params.row.cityName)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '价格(元)',
            key: 'carPurchasePrice',
            render: (h, params) => {
              return h('div', [
                h('Input',{
                  props:{
                    placeholder:'请输入价格',
                    value:params.row.carPurchasePrice
                  },
                  on:{
                    'on-blur':(e)=>{
                      params.row.carPurchasePrice=e.target.value;
                      this.areaPriceListDatas[params.index]=params.row;
                      if (this.editPriceDatas.length!=0) {
                        var idx = 0
												var idxnum = 0
                        var _this=this;
                        this.editPriceDatas.forEach(function(val,i){
                          if (val.id==params.row.id) {
                            val.carPurchasePrice=params.row.carPurchasePrice
                             idx = 1
														 idxnum = i
                          }
                        })
                        if (idx == 1) {
													this.editPriceDatas[idxnum].carPurchasePrice = params.row.carPurchasePrice
                        }else {
													this.editPriceDatas.push(params.row)
												}
                      }else{
                        this.editPriceDatas.push(params.row);
                      }
											console.log(this.editPriceDatas)
                    }
                  }
                })
              ]);
            },
            className: 'ivu-table-column-center'
          },
        ]
      }
    },

    mounted(){
      // console.log(this.$route.params)
      this.skutitle=this.$route.query.sku;
      this.EnterData=this.$route.params;
      console.log(this.$webapi.get('token'))
      this.list();
    },
    methods:{
      list(){
        let listdata={
          token:this.$webapi.get('token'),
          carSkuId:this.$route.params.id,
          // pageNo:this.pageData.pageCurrent,
          // pageSize:this.pageData.pagesize
        };
        let _this=this;
        this.$api.get('/open_city/car_purchase_price/byCarSkuId',listdata,reset=>{
          if (reset.codeId===1) {
            _this.areaPriceListDatas=reset.resData;
            _this.originalPriceDatas=reset.resData.concat();
            // _this.pageData.totalCount = reset.resData.totalCount
            // _this.pageshow = true
          }
        })
      },
      // 增加区域价格操作
      AddAreaPrice(){
        this.$router.push({
          path:'/areapricelist/addareaprice/'+this.$route.params.modelId+'/'+this.$route.params.id,
          query:{
            sku:this.$route.query.sku
          }
        })
        // this.addAreaPriceComponentShow=true;

        // this.addAreaPriceComponentData=this.$route.params;
      },
      // 修改操作
      EditAreaPrice(e){
        this.editAreaPriceComponentShow=true;
        this.editAreaPriceComponentData=e;
        console.log(e);
      },
      // 区域价格返回处理
      addAreaPriceComponent(e){
        this.addAreaPriceComponentShow=e
        this.list();
      },
      // 修改区域返回处理
      editAreaPriceComponent(e){
        this.editAreaPriceComponentShow=e
        this.list();
      },
      // 删除操作
      DeleteArePrice(e){
        console.log(e);
        let _this = this
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确认要删除【'+e.provinceName+e.cityName+'】的区域价格吗?</p>',
            onOk: () => {
                let _this = this;
                var data = {
									token:this.$webapi.get('token'),
									id:e.id
								}
                this.$api.post("/car_purchase_price/delete", data, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('删除成功!');
                        _this.list();
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            onCancel: () => {

            }
        });

      },
      pageComponentDate(e) {
        this.pageData.pageCurrent = e.pageCurrent
        this.pageData.pagesize = e.pagesize
        this.list()
      },
      // 添加保存
      handleSubmit(){
        this.areadatas=[]
        let _this = this;
        this.editPriceDatas.forEach((val,index)=>{
          // if (val.carPurchasePrice!=0&&val.carPurchasePrice!=null&&val.carPurchasePrice!='') {
              _this.areadatas.push({
            carSkuId:parseFloat(_this.$route.params.id),
              provinceCode:parseInt(val.provinceCode),
              cityCode:parseInt(val.cityCode),
              price:parseFloat(val.carPurchasePrice),
            })

          // }
        })
        var data = {
          token:this.$webapi.get('token'),
          data:JSON.stringify(this.areadatas)
        }
        this.$api.post("/car_purchase_price/addList", data, reset => {
            if (reset.codeId === 1) {
              _this.$Message.success('保存成功!');
              _this.$router.back(-1)
              // window.location.reload();
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },//handleSubmit
      handleRet(){
        this.$router.back(-1);
      }
    }
  }
</script>
