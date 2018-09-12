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
                     <Col :xs="24" :sm="24" :md="24" :lg="24">
                       <FormItem label="用户" prop="name" required>
                            {{name}}
                            <span @click="editselectUser" v-if="name"><Button type="primary">修改用户</Button></span>
                            <span @click="selectUser" v-else><Button type="primary">选择用户</Button></span>
                       </FormItem>
                     </Col>
                     <!-- <Col :xs="24" :sm="24" :md="24" :lg="24">
                       <FormItem label="门店名称" required>
                           <storefrontname @storeEmit="storeEmit"></storefrontname>
                       </FormItem>
                     </Col> -->
                       <Col :xs="24" :sm="24" :md="24" :lg="24">
                         <FormItem label="还车类型" prop="contactname" required>
                           <Select v-model="formItem.returnType" >
                             <Option value="" >全部</Option>
                             <Option value="1" >正常还车</Option>
                             <Option value="2" >非正常还车</Option>
                          </Select>
                         </FormItem>
                       </Col>
                  </Row>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
            </div>
         <div class="pagelist" v-if="carlistshow">
           <div class="pagelist-hd">车辆列表 <span @click="usercar"><Button type="primary" >选择车辆</Button></span></div>
           <div class="pagelist-bd">
             <Table border :columns="columnsdata" :data="usercardata"></Table>
           </div>
           <div class="page-divider page-divider-horizontal "></div>
          </div>
         <FormItem>
           <Button type="primary" @click="handleSubmit()" size="large" :disabled="usercardata.length<1">添加</Button>
       </FormItem>
      </Form>
      </div>
      </div>
      <add-user-component v-if="usershow" :usershow="usershow" @skucomponent="userexport"></add-user-component>
      <user-car-component v-if="usercarshow" :usercarshow="usercarshow" @caruserlist="caruserlist" :userdata="userdata"></user-car-component>
  </div>
</template>
<script>
import storefrontname from '../pub/storefrontname.vue'
import addUserComponent from '../pub/selectuser.vue'
import userCarComponent from './usercar.vue'
export default {
  name: 'index',
  components: {
     storefrontname,
     addUserComponent,
     userCarComponent
  },
  data () {
    return {
        usershow:false,
        usercarshow:false,
        name:"",
        userdata:{
          userAccountId:''
        },
        usercardata:[],
        columnsdata: [
            {
                title: '车辆型号',
                key: 'carModelName',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.carModelName)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '车辆属性',
                key: 'carSkuValue',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.carSkuValue)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: 'vin',
                key: 'carVin',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.carVin)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '车牌',
                key: 'licencePlateNumber',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.licencePlateNumber)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
              title: '保证金',
              key: 'foregift',
              render: (h, params) => {
                return h('div', [
                  h('Input',{
                    props:{
                      placeholder:'请输入价格',
                      value:params.row.foregift
                    },
                    on:{
                      'on-blur':(e)=>{
                        params.row.foregift = e.target.value;
                        this.usercardata[params.index].foregift = e.target.value;
                        console.log(this.usercardata[params.index].foregift)
                      }
                    }
                  })
                ]);
              },
              className: 'ivu-table-column-center'
            },
            {
              title: '备注',
              key: 'remark',
              render: (h, params) => {
                return h('div', [
                  h('Input',{
                    props:{
                      placeholder:'备注',
                      value:params.row.remark,
                      type:'textarea'
                    },
                    on:{
                      'on-blur':(e)=>{
                        params.row.remark = e.target.value;
                        this.usercardata[params.index].remark = e.target.value;
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
                width:180,
                render: (h, params) => {
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
                                  this.usercardata.splice(params.index,1)
                                }
                            }
                        }, '删除'),
                    ]);
                }
            }
        ],
        carlistshow:false,
        formItem:{
          returnType:'1',
          carList:[],
          userAccountId:"",
          dealerStorefrontId:""
        }
      }
  },
  methods: {
    storeEmit (e){
      this.formItem.dealerStorefrontId  = e.id
    },
    caruserlist (e) {
       this.usercarshow = false
       if(e){
          var data = []
          e.forEach(function (a) {
            a.foregift = ""
            a.remark = ""
            data.push(a)
          })
         this.usercardata = data
       }
    },
    usercar () {
       if(this.userdata.userAccountId==undefined || this.userdata.userAccountId==null){
         this.$Message.info("用户没有选择")
       }
       this.usercarshow = true
    },
    userclose () {
      this.usershow = false
    },
    userexport (e) {
      this.carlistshow = true
      this.usershow = false
      this.userdata = e
      this.name = e.name
    },
    editselectUser () {
      var _this = this;
      this.$Modal.info({
        title:"修改用户",
        content:"修改用户，车辆列表会清空的，确定要更改换用户吗",
        onOk:function () {
            _this.name = ""
            _this.carlistshow = false
            _this.userdata ={}
            _this.usercardata = []
            _this.usershow = true
        }
      })
    },
    selectUser() {
       this.usershow = true
    },
    handleSubmit () {
      if(this.formItem.returnType==""){
        this.$Message.info("还车类型没有选择")
        return
      }
       var reset = {
         token:this.$webapi.get("token"),
         userAccountId:parseInt(this.userdata.userAccountId),
         // dealerStorefrontId:parseInt(this.formItem.dealerStorefrontId),
         returnType:parseInt(this.formItem.returnType),
         carList:[]
       }
       if(this.usercardata.length>0){
         this.usercardata.forEach(function (a) {
            var data = {
              carId:parseInt(a.carId),
              foregift:parseFloat(a.foregift),
              remark:a.remark
            }
            reset.carList.push(data)
         })
       }else{
         this.$Message.info("车辆没有选择")
         return
       }
       reset.carList = JSON.stringify(reset.carList)
       this.$api.post('/return_car_listing/save',reset,reset => {
         if (reset.codeId === 1) {
           this.$router.push({path:"/car/list/"})
         }else{
           this.$netcode.getApiCode(reset)
         }
       })
    }
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
