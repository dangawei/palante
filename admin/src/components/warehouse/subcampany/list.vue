<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem >仓库信息</BreadcrumbItem>
                <BreadcrumbItem>仓库信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>仓库信息</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <div class="textalign" v-if="addstauts==0">
                <span @click="add()"><Button type="primary" >添加仓库</Button></span>
            </div>
            <Form :model="formItem" :label-width="100" v-if="addstauts==1">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="创建时间:">
                                    <p>{{formItem.createdAt}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="分公司名称:">
                                    <p>{{formItem.subcompanyName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="仓库名称:">
                                    <p>{{formItem.name}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="地址:">
                                    <p>{{formItem.provinceName}}{{formItem.cityName}}{{formItem.areaName}}{{formItem.address}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                    <div class="textalign">
                        <span @click="edit()"><Button type="primary" >修改</Button></span>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    <add-component :addshow="addshow" @emitcomponent="emitcomponent" v-if="addshow"></add-component>
    <edit-component :editshow="editshow" @emitcomponent="emitcomponent" v-if="editshow" :editdata="formItem"></edit-component>
</div>
</template>
<script>
  import addComponent from './add.vue'
  import editComponent from './edit.vue'
  export default {
    components: {
        editComponent,
        addComponent
    },
    data () {
        return {
            addstauts:1,
            addshow:false,
            editshow:false,
            pageshow:false,
            formItem:{},
            pageData:{
                totalCount:1,
                pageCurrent:1,
                pagesize:10,
            },
            editdata:{}
        }
    },
    mounted() {
      this.list()
    },
    methods: {
      emitcomponent (e){
        this.addshow = false
        this.editshow = false
        this.list()
      },
      edit () {
        this.editshow = true
      },
      list () {
        var listdata = {
          pageNo:this.pageData.pageCurrent,
          pageSize:this.pageData.pagesize,
          token:this.$webapi.get('token'),
        }
        var _this =  this
        this.$api.get('/warehouse/getBySubCompanyId',listdata,reset => {
          if (reset.codeId === 1) {
             var data = {}
             if(reset.resData){
                data = reset.resData
                data.createdAt = this.$webapi.gettime("time",data.createdAt/1000)
                _this.formItem = data
                _this.addstauts = 1
             }else{
               _this.addstauts = 0
               _this.formItem = data
             }
          }else if(reset.codeId === -9){
            _this.formItem = {}
          }
        })
      },
     add () {
         this.addshow = true
     },
    }
  }
</script>
