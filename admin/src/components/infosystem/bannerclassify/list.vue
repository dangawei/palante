
<template>
<div class="">
  <div class="pageHeader">
      <div class="pageBread">
          <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>基本信息</BreadcrumbItem>
              <BreadcrumbItem>广告位置</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>广告位置</h2>
          </div>
      </div>
  </div>
  <div class="page-component-view">
      <div class="page-component-bd">
        <!--查询条件-->
        <div class="tableListForm">
            <Form ref="formCustom" :model="formCustom" :label-width="80">
              <Row>
                  <Col :xs="24" :sm="24" :md="8" :lg="6">
                      <FormItem label="状态" prop="status">
                        <Select v-model="formCustom.status">
                           <Option value="">全部</Option>
                           <Option value="1">显示</Option>
                           <Option value="-1">隐藏</Option>
                       </Select>
                      </FormItem>
                  </Col>
                  <Col :xs="24" :sm="24" :md="12" :lg="6">
                    <div class="">
                      <FormItem style="margin-left: -70px;text-align:left">
                          <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                      </FormItem>
                    </div>
                  </Col>
              </Row>
            </Form>
        </div>
        <!--操作按钮-->
       <div class="tableListOperator">
         <Button type="primary" @click="addsku()"><Icon type="ios-plus-empty"></Icon> 添加</Button>
       </div>
       <Row>
           <Col :xs="24" :sm="24" :md="24" :lg="24">
               <div>
                 <Table border :columns="columnsdata" :data="listdata"></Table>
               </div>
           </Col>
       </Row>
      </div>
  </div>
  <add-component :addshow="addshow" @emitcomponent="emitcomponent" v-if="addshow"></add-component>
  <component-edit :editshow="editshow" @emitcomponent="emitcomponent" v-if="editshow" :editName="editName" :editID="editID"></component-edit>
</div>
</template>
<script>
import addComponent from "./add.vue"
import ComponentEdit from "./edit.vue"
export default {
    components: {
      addComponent,
      ComponentEdit
    },
    data() {
        return {
          editName:"",
          editID:"",
          editduration:"",
          addshow:false,
          editshow:false,
          formCustom:{
            status:""
          },
          pageData:{
              totalCount:1,
              pageCurrent:1,
              pagesize:10,
          },
          listdata:[],
          columnsdata:[
            {
                title: '名称',
                key: 'id',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.locationDescribe)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '状态',
                key: 'id',
                render: (h, params) => {
                   var str = ""
                    if(params.row.status == 1){
                        str = "显示"
                    }else {
                        str = "隐藏"
                    }
                  return h('div', [
                      h('span', str)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '创建时间',
                key: 'id',
                render: (h, params) => {
                  var str = this.$webapi.gettime('date', (params.row.createdAt) / 1000)
                   return h('div', [
                       h('span', str)
                   ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '创建人',
                key: 'id',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.creatorName)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '修改时间',
                key: 'id',
                render: (h, params) => {
                  var str = this.$webapi.gettime('date', (params.row.updatedAt) / 1000)
                   return h('div', [
                       h('span', str)
                   ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '修改人',
                key: 'id',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.updatorName)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width:240,
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
                                   this.editID = params.row.id
                                   this.editName = params.row.locationDescribe
                                   this.editshow = true
                                }
                            }
                        }, '修改'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'default',
                                disabled:params.row.status==-1
                            },
                            on: {
                                click: () => {
                                   this.remove(params.row)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
          ]
        }
    },
    mounted() {
      //do something after mounting vue instance
      this.list()
    },
    methods: {
      addsku () {
          this.addshow = true
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            status:this.formCustom.status,
            pageNo:this.pageData.pageCurrent,
            pageSize:this.pageData.pagesize
        }
        this.$api.get('/advertisingLocation/page',data,reset => {
            if (reset.codeId === 1) {
                _this.listdata = reset.resData.list
            }else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      emitcomponent (e) {
        this.addshow = e
        this.editshow = e
        this.list()
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.locationDescribe+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/advertisingLocation/delete?token=" + this.$webapi.get('token') + "&advertisingId=" + params.id;
                this.$api.post(url,null,reset => {
                    if (reset.codeId === 1) {
                        _this.list();
                        _this.$Message.info('删除成功')
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
                _this.Message.success("删除成功");
              },
              onCancel: () => {

              }
          })
      },
      handleSubmit () {
         this.list()
      }
    }
}
</script>
