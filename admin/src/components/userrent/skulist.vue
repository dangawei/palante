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

  </div>
</template>
<script>
  
  export default {
    components:{
      // AddAreaPriceComponent:AddAreaPriceComponent,
    },
    data(){
      return{
        // sku列表数据
        skuListData:[],

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
            title: '设置用户购买区域价格数',
            key: 'userPurchasePriceNum',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.userPurchasePriceNum)
              ]);
            },
            className: 'ivu-table-column-center'
          },
          {
            title: '设置用户租车区域价格数',
            key: 'userRentPriceNum',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.userRentPriceNum)
              ]);
            },
            className: 'ivu-table-column-center'
          },
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
            title: '操作',
            key: 'action',
            align: 'center',
            width: 420,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                      type: 'primary',
                      // size: 'small'
                  },
                  style: {
                      marginRight: '5px',
                      color: '#fff'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path:"/userbuylist/"+this.$route.params.modelId+"/"+params.row.id,
                        query:{
                          sku:params.row.skuCodeCombination
                        },
                         
                      })
                    }
                  }
                }, '用户购买价格列表'),
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
                        path:"/userpricelist/"+this.$route.params.modelId+"/"+params.row.id,
                        query:{
                          sku:params.row.skuCodeCombination
                        },
                        // name:'UserPriceList',
                        // params:params.row
                        
                      })
                    }
                  }
                }, '用户租车价格列表'),
              ]);
          }
        }],
      }
    },
    mounted(){
      // console.log(this.$route.params);
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
    }
  }
</script>