<template>
  <div>
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>还车列表</BreadcrumbItem>
          <BreadcrumbItem>添加还车单</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>添加还车单</h2>
          </div>
      </div>
    </div>
    <div class="page-view allm20">
      <div class="page-view-body">
      <Form ref="formItem" :model="formItem"  :label-width="100">
         <div class="pagelist">
                <div class="pagelist-hd">基本信息</div>
                <div class="pagelist-bd">
                  <Row>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="还车单号" prop="name" required>
                           {{formItem.returnCarListingDo.listingNo}}
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="门店名称" required>
                          {{formItem.returnCarListingDo.dealerStorefrontName}}
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="还车类型" required>
                          <span v-if="formItem.returnCarListingDo.returnType==1">正常还车</span>
                          <span v-if="formItem.returnCarListingDo.returnType==2">非正常还车</span>
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="还车状态" required>
                          <span v-if="formItem.returnCarListingDo.status==1">待审核</span>
                          <span v-if="formItem.returnCarListingDo.status==2">审核通过</span>
                          <span v-if="formItem.returnCarListingDo.status==3">审核不通过</span>
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="创建人" required>
                           {{formItem.returnCarListingDo.creatorName}}
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="创建时间" required>
                           {{formItem.returnCarListingDo.createdAt/1000 | ordertime}}
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="修改人" required>
                           {{formItem.returnCarListingDo.updatorName}}
                       </FormItem>
                     </Col>
                     <Col :xs="24" :sm="24" :md="12" :lg="12">
                       <FormItem label="修改时间" required>
                           {{formItem.returnCarListingDo.updatedAt/1000 | ordertime}}
                       </FormItem>
                     </Col>
                  </Row>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
            </div>
         <div class="pagelist" >
           <div class="pagelist-hd">车辆列表</div>
           <div class="pagelist-bd">
             <Table border :columns="columnsdata" :data="formItem.detailsDoPage.list"></Table>
             <div class="mt20">
               <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
             </div>
             <div class="mt20" style="text-align:center">
                <span v-if="formItem.returnCarListingDo.status==1"><Button type="primary" @click="auit()">审核</Button></span>
             </div>
           </div>
           <div class="page-divider page-divider-horizontal "></div>
          </div>
      </Form>
      </div>
      </div>
      <auit-component :auitshow="auitshow" v-if="auitshow" @auitemit="auitemit"></auit-component>
  </div>
</template>
<script>
import Pages from '../pub/page.vue'
import auitComponent from './auit.vue'
export default {
  name: 'index',
  components: {
      Paging:Pages,
      auitComponent
  },
  data () {
    return {
        auitshow:false,
        pageData:{
            totalCount:1,
            pageCurrent:1,
            pagesize:10,
        },
        status:"2",
        pageshow:false,
        usercardata:[],
        columnsdata:[
          {
              title: 'vin',
              key: 'vin'
          },
          {
              title: '车辆型号',
              key: 'carModelName'
          },
          {
              title: '车辆型号',
              key: 'carSkuValue'
          },
          {
              title: '车辆型号图片',
              key: 'img',
              render: (h, params) => {
                  return h('div', [
                      h('img', {
                        attrs: {
                            src: params.row.carSkuPicUrl
                        },
                        style: {
                            width: '40px',
                            height: '40px'
                        }
                      })
                  ]);
              },
              className: 'ivu-table-column-center'
          },
          {
              title: '原保证金',
              key: 'orderForegift'
          },
          {
              title: '退还保证金',
              key: 'returnForegift'
          },
          {
              title: '电池编号',
              key: 'batterNumber'
          },
          {
              title: '电机编号',
              key: 'motorNumber'
          },
          {
              title: '车牌号',
              key: 'licencePlateNumber'
          },
          {
              title: '终端号',
              key: 'terminalNumber'
          },
          {
              title: '备注',
              key: 'remark'
          },
        ],
        formItem:{}
      }
  },
  mounted() {
    //do something after mounting vue instance
    this.list()
  },
  filters: {
    ordertime: function (time) {
      var type = type || 'date'
      var time = time ? parseInt(time, 10) : null
      var result = ''
      if (time) {
        var tdate = new Date(time * 1000)
        var year = tdate.getFullYear()
        var month = tdate.getMonth() + 1
        var date = tdate.getDate()
        var hour = tdate.getHours()
        var minute = tdate.getMinutes()
        var second = tdate.getSeconds()
        month = month > 9 ? month : '0' + month
        date = date > 9 ? date : '0' + date
        hour = hour > 9 ? hour : '0' + hour
        minute = minute > 9 ? minute : '0' + minute
        second = second > 9 ? second : '0' + second
        result = [year, month, date].join('-')
        if (type == 'time') {
            result += ' ' + [hour, minute, second].join(':')
        }
      }
      return result
    }
  },
  methods: {
    pageComponentDate (e) {
      this.pageData.pageCurrent = e.pageCurrent
      this.pageData.pagesize = e.pagesize
      this.list()
    },
    auitemit (e) {
      this.auitshow = false
      if(e){
        var data = {
            token:this.$webapi.get("token"),
            id:this.$route.params.id,
            status:e
        }
        this.$api.post('/return_car_listing/audit',data,reset => {
          if (reset.codeId === 1) {
             this.$router.push({path:"/car/list/"})
          }else{
            this.$netcode.getApiCode(reset)
          }
        })
      }
    },
    auit (){
     this.auitshow = true
    },
    list () {
      var _this = this
      var data = {
          token:this.$webapi.get("token"),
          id:this.$route.params.id,
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize
      }
      this.$api.get('/return_car_listing/getDetails',data,reset => {
        if (reset.codeId === 1) {
          _this.formItem = reset.resData
          _this.pageData.totalCount = reset.resData.detailsDoPage.totalCount
          _this.pageshow = true
        }else{
          this.$netcode.getApiCode(reset)
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
  .carlistBox{
    display:flex;
    flex-direction: column;
    width: 100%;
    .carlist{
      display:flex;
      flex-direction:row;
      .carlist-name{
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: row;
      }
      .carlist-foregift{
        flex: 1
      }
    }
  }

</style>
