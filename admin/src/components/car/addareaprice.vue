<template>
	<div id="aboutus" style="width:100%">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/car">车辆管理</BreadcrumbItem>
          <BreadcrumbItem :to="'/areapricelist/'+this.$route.params.modelId">sku属性列表</BreadcrumbItem>
          <BreadcrumbItem :to="{path:'/areapricelist/detail/'+this.$route.params.modelId+'/'+this.$route.params.id,query:{sku:skutitle}}">价格列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>添加{{skutitle}}区域价格列表</h2>
          </div>
      </div>
    </div>

    <div class="page-component-view">
      <div class="page-component-bd">
        <div class="tableListOperator">
          <Button type="primary"  @click="AddAreaPrice()">添加</Button>
        </div>

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
            <Button type="primary" @click="handleSubmit()">确定</Button>
          </Col>
        </Row>
      </div>
    </div>

  </div>
</template>
<script>
  import areaComponent from "../pub/iviewarea.vue"
  export default {
    components:{
      areaComponent:areaComponent,
    },
    data(){

      return{
				newarae:[],
        // 用户租车价格sku属性title
        skutitle:'',
        // 区域价格列表数据

        // 修改区域价格开关
        editUserPriceComponentShow:false,
        editUserPriceComponentData:'',
        areaData:[],
        // 表格列的配置描述
        columns:[


        ],
        areaPriceListDatas:[
          {
            price:0,
            addressData:[]
          },
        ],
        areadatas:[],
      }

    },
    created(){
      this.init();
    },
    mounted(){
      this.skutitle=this.$route.query.sku;
      // this.list();

    },
    watch:{
      // areadatas:(val,index)=>{
      //   console.log(val);
      //   console.log(index);
      // }
    },
    methods:{
      init(){
        let _this=this;
        this.columns=[
          {
            title: '地区',
            key: 'addressData',
            render: (h, params) => {
              return h('div', [
                h(areaComponent,{
                  props:{
                    areaData:params.row.addressData,
                    level:1
                  },
                  on:{
                    'areaEmit':(e)=>{
											_this.newarae = JSON.parse(JSON.stringify(e))
                    }
                  }
                })
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
                    value:params.row.price
                  },
                  on:{
                    'on-change':(e)=>{
                      // _this.areaPriceListDatas[params.index].price=e.target.value;
                      params.row.price=e.target.value;
                      _this.areaPriceListDatas[params.index]=params.row;
                    }
                  }
                })
              ]);
            },
            className: 'ivu-table-column-center'
          },

          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 420,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    // size: 'small'
                  },
                  style: {
                      marginRight: '5px',
                      color: '#fff'
                  },
                  on: {
                    click: () => {
                      _this.DeleteUserPrice(params.row)
                    }
                  }
                },'删除')
              ])
            }
          }
        ]
      },
      // 增加区域价格操作
      AddAreaPrice(){

				var _this = this
        if (this.areaPriceListDatas[0].price!=0 && this.newarae.length!=0) {
          if(this.areaPriceListDatas.length>0){
            _this.areaPriceListDatas[0].addressData = []
            this.newarae.forEach(function (a) {
                _this.areaPriceListDatas[0].addressData.push(""+a.code)
            })
          }
          this.newarae = []
          this.areaPriceListDatas.unshift({
            price:0,
            addressData:[]
          })
        }else{
          this.$Message.error("内容填写不完整");
        }
      },
      // 删除操作
      DeleteUserPrice(e){
        let _this = this
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确认要删除吗?</p>',
            onOk: () => {
                _this.areaPriceListDatas.splice(e._index,1);
            },
            onCancel: () => {

            }
        });

      },
      // 添加保存
      handleSubmit(){
        this.areadatas=[]
        let _this = this;
        _this.areaPriceListDatas[0].addressData = []
        this.newarae.forEach(function (a) {
            _this.areaPriceListDatas[0].addressData.push(""+a.code)
        })
        // if (this.areaPriceListDatas[0].price!=0 && this.areaPriceListDatas[0].addressData.length!=0) {
          this.areaPriceListDatas.forEach((val,index)=>{
            _this.areadatas.push({
              carSkuId:parseFloat(_this.$route.params.id),
              provinceCode:parseFloat(val.addressData[0]),
              cityCode:parseFloat(val.addressData[1]),
              price:parseFloat(val.price),
            })
          })
          var data = {
						token:this.$webapi.get('token'),
						data:JSON.stringify(this.areadatas)
					}
          this.$api.post("/car_purchase_price/addList", data, reset => {
              if (reset.codeId === 1) {
                _this.$Message.success('添加成功!');
                // _this.$router.back(-1)
              }else {
                  _this.$netcode.getApiCode(reset)
              }
          })
        // }else{
        //   this.$Message.error("内容填写不完整");
        // }

      }
    }
  }
</script>
