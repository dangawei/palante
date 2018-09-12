fh<template>
	<div id="aboutus" style="width:100%">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/car">车辆管理</BreadcrumbItem>
          <BreadcrumbItem :to="'/userskulist/'+this.$route.params.modelId">sku属性列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>{{skutitle}}用户采购价格列表</h2>
          </div>
      </div>
    </div>

    <div class="page-component-view">
      <div class="page-component-bd">
        <!-- <div class="tableListOperator">
          <Button type="primary" @click="AddAreaPrice()">添加</Button>
        </div> -->
      	<Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <div>
              <i-table border :columns="columns" :data="areaPriceListDatas"></i-table>
            </div>

          </Col>
        </Row>
        <Row style="text-align:center">
          <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center;margin-top:15px">
            <Button type="primary" @click="handleSubmit()">保存</Button>
            <Button type="ghost" @click="handleRet()">返回</Button>
          </Col>
        </Row>
      </div>
    </div>

    <edit-user-buy-component v-if="editUserBuyComponentShow" :editUserBuyComponentShow="editUserBuyComponentShow" :editUserBuyComponentData="editUserBuyComponentData" @editUserBuyComponent="editUserBuyComponent"></edit-user-buy-component>

  </div>
</template>
<script>
  import EditUserBuyComponent from './edituserbuycomponent'
  import Pages from '../pub/page.vue'
  export default {
    components:{
      EditUserBuyComponent:EditUserBuyComponent,
      Paging: Pages,
    },
    data(){
      return{
        // 用户采购价格sku属性title
        skutitle:'',
        // 区域价格列表数据
        areaPriceListDatas:[],

        // 修改区域价格开关
        editUserBuyComponentShow:false,
        editUserBuyComponentData:'',
        // 车辆分页数据
        pageData:{
          totalCount:1,
          pageCurrent:1,
          pagesize:10,
        },
        pageshow:false,

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
            key: 'price',
            render: (h, params) => {
              return h('div', [
                h('Input',{
                  props:{
                    placeholder:'请输入价格',
                    value:params.row.userPurchasePrice
                  },
                  on:{
                    'on-blur':(e)=>{
                      params.row.userPurchasePrice=e.target.value;
                      this.areaPriceListDatas[params.index]=params.row;
                      if (this.editPriceDatas.length!=0) {
                        var editBool=0;
                        var isEdit=false;
                        var _this=this;
                        this.editPriceDatas.forEach(function(val,i){
                          if (val.id==params.row.id) {
                            val.userPurchasePrice = params.row.userPurchasePrice
                            isEdit=true;
                          }else{
                            editBool=1;
                          }
                        })
                        if (editBool==1&&isEdit==false) {
                          this.editPriceDatas.push(params.row)
                        }
                      }else{
                         this.editPriceDatas.push(params.row);
                      }
                    }
                  }
                })
              ]);
            },
            className: 'ivu-table-column-center'
          }
        ]
      }
    },
    mounted(){
      this.skutitle=this.$route.query.sku;
      this.list();
    },
    methods:{
      list(){
        let listdata={
          token:this.$webapi.get('token'),
          carSkuId:this.$route.params.id
        };
        let _this=this;
        this.$api.get('/open_city/user_purchase_price/byCarSkuId',listdata,reset=>{
          if (reset.codeId===1) {
            _this.areaPriceListDatas=reset.resData;
          }
        })
      },
      // 增加区域价格操作
      AddAreaPrice(){
        this.$router.push({
          path:'/userbuylist/adduserbuy/'+this.$route.params.modelId+'/'+this.$route.params.id,
          query:{
            sku:this.$route.query.sku
          }
        })
      },
      // 修改操作
      EditUserPrice(e){
        this.editUserBuyComponentShow=true;
        this.editUserBuyComponentData=e;
      },
      // 修改区域返回处理
      editUserBuyComponent(e){
        this.editUserBuyComponentShow=e
        this.list();
      },
      // 删除操作
      DeleteUserPrice(e){
        console.log(e);
        let _this = this
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确认要删除【'+this.skutitle+e.provinceName+e.cityName+'】的采购区域价格吗?</p>',
            onOk: () => {
                let _this = this;
								var data = {
									token:this.$webapi.get('token'),
									id:e.id
								}
                this.$api.post("/user_purchase_price/delete", data, reset => {
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
              price:parseFloat(val.userPurchasePrice),
            })

          // }
        })
        var data = {
          token:this.$webapi.get('token'),
          data:JSON.stringify(this.areadatas)
        }
        this.$api.post("/user_purchase_price/addList", data, reset => {
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
