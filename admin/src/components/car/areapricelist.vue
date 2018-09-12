<template>
	<div id="aboutus" style="width:100%">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/car">车辆管理</BreadcrumbItem>
          <BreadcrumbItem>sku属性列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
             <h2>sku属性列表</h2>
          </div>
      </div>
    </div>
        
    <div class="page-component-view">
      <div class="page-component-bd">
      	<Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <div>
              <i-table border :columns="columns" :data="skuListData">

              </i-table>
            </div>
            
          </Col>
        </Row>
      </div>
    </div>

    <add-area-price-component v-if="addAreaPriceComponentShow" :addAreaPriceComponentShow="addAreaPriceComponentShow" :addAreaPriceComponentData="addAreaPriceComponentData" @addAreaPriceComponent="addAreaPriceComponent"></add-area-price-component>

  </div>
</template>
<script>
  import AddAreaPriceComponent from './addareapricecomponent'
  export default {
    components:{
      AddAreaPriceComponent:AddAreaPriceComponent,
    },
    data(){
      return{
        // sku列表数据
        skuListData:[],

        // 添加区域价格开关
        addAreaPriceComponentShow:false,
        addAreaPriceComponentData:'',
        // 表格列的配置描述
        columns:[
          {
            title: 'sku属性',
            key: 'skuCodeCombination',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.skuCodeCombination)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '售卖数量',
            key: 'soldCount',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.soldCount)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          // {
          //   title: '创建者',
          //   key: 'creatorName',
          //   render: (h, params) => {
          //     return h('div', [
          //     h('span', params.row.creatorName)
          //     ]);
          //   },
          //   className: 'ivu-table-column-center'
          // }, 
          {
            title: '创建时间',
            key: 'creatorAt',
            render: (h, params) => {
              var str = this.$webapi.gettime('date', (params.row.createdAt) / 1000)
              return h('div', [
                h('span', str)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '设置区域价格数量',
            key: 'carPurchasePriceNum',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.carPurchasePriceNum)
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
                // h('Button', {
                //   props: {
                //       type: 'primary',
                //       // size: 'small'
                //   },
                //   style: {
                //       marginRight: '5px',
                //       color: '#fff'
                //   },
                //   on: {
                //     click: () => {
                //       this.AddAreaPrice(params.row)

                //     }
                //   }
                // }, '添加区域价格'),
                h('Button', {
                  props: {
                      type: 'info',
                      // size: 'small'
                  },
                  style: {
                      marginRight: '5px',
                      color: '#fff'
                  },
                  on: {
                    click: () => {
                      // this.AreaPriceDetail(params.row)
                      this.$router.push({
                        path:"/areapricelist/detail/"+this.$route.params.modelId+"/"+params.row.id,
                        // name:'AreaPriceDetailList',
                        // params:params.row
                        query:{
                          sku:params.row.skuCodeCombination
                        },
                      })
                    }
                  }
                }, '开放城市价格列表'),
              ]);
          }
        }],
      }
    },
    mounted(){
      // console.log(this.$route.query)
      let a="4"
      // console.log(this.$webapi.toDecimal2(a));
      // console.log(typeof this.$webapi.toDecimal2(a));
      // console.log(this.$webapi.get('token'))
      this.list();
    },
    methods:{
      list(){
        let listdata={
          token:this.$webapi.get('token'),
          carModelId:this.$route.params.modelId
        };
        let _this=this;
        this.$api.get('/car_sku/list',listdata,reset=>{
          if (reset.codeId===1) {
            _this.skuListData=reset.resData;
          }
        })
      },
      // 增加区域价格操作
      AddAreaPrice(e){
        // this.addAreaPriceComponentShow=true;
        // this.addAreaPriceComponentData=e;
        this.$router.push({
          path:'/areapricelist/addareaprice/'+this.$route.params.modelId+'/'+e.id,
          query:{
            sku:this.$route.query.sku
          }
        })
      },
      // 添加区域价格返回处理
      addAreaPriceComponent(e){
        this.addAreaPriceComponentShow=e
      },
      // 查看sku区域价格详情操作
      AreaPriceDetail(e){
        this.$router.push({
          name:'AreaPriceDetailList',
          params:e
        })
      }
    }
  }
</script>