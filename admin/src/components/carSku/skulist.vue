<template>
<div class="">
  <div class="pageHeader">
      <div class="pageBread">
          <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>车辆管理</BreadcrumbItem>
              <BreadcrumbItem>SKU分类</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
              <h2>SKU分类</h2>
          </div>
      </div>
  </div>
  <div class="page-component-view">
      <div class="page-component-bd">
        <!--操作按钮-->
        <div class="tableListOperator">
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div>
                        <Button type="primary" @click="addsku()">
                            <Icon type="ios-plus-empty"></Icon> 添加</Button>
                    </div>
                </Col>
            </Row>
        </div>
        <Row>
            <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div>
                    <i-table border :content="self" :columns="columnsdata" :data="listdata"></i-table>
                </div>
            </Col>

        </Row>
      </div>
  </div>
  <sku-component v-if="addskushow" :addskushow="addskushow" @skuComponentData="skuComponentData"></sku-component>
  <sku-component-edit v-if="editskushow" :editskushow="editskushow" @skuComponenteditData="skuComponenteditData" :editskuid="editskuid"></sku-component-edit>
</div>
</template>
<script>
import SkuComponent from "./addsku.vue"
import skuComponentEdit from "./editsku.vue"
export default {
    components: {
      SkuComponent,
      skuComponentEdit
    },
    created() {
      //do something after creating vue instance
      this.list ()
    },
    data() {
        return {
          addskushow:false,
          editskushow:false,
          editskuid:"",
          formCustom:{
          },
          self:this,
          pageData:{
              totalCount:1,
              pageCurrent:1,
              pagesize:10,
          },
          ruleCustom: {
          },
          listdata:[],
          columnsdata:[
            {
                title: 'id',
                key: 'id',
                width:80,
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.id)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '车辆型号',
                key: 'carModelId',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.modelname)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: 'SKU属性',
                key: 'name',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.name)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '排序',
                key: 'sequence',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.sequence)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: '创建时间',
                key: 'createdAt',
                render: (h, params) => {
                 var str = this.$webapi.gettime('date', (params.row.createdAt) / 1000)
                  return h('div', [
                      h('span', str)
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
                                   this.editskuid = params.row.id
                                   this.editskushow = true
                                }
                            }
                        }, '修改'),
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
                                   this.$router.push({path:"/carsku/"+params.row.id+"/"+params.row.name})
                                }
                            }
                        }, 'SKU属性'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'default'
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
    mounted(){

    },
    methods: {
      addsku () {
        this.addskushow = true
      },
      skuComponentData (e) {
          this.addskushow = e
          this.list()
      },
      skuComponenteditData (e) {
          this.editskushow = e
          this.list()
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            modelId:this.$route.params.id
        }
        this.$api.get('/sku_meta_property/list/by_modelId',data,reset => {
            if (reset.codeId == 1) {
                 _this.listdata = reset.resData                 
                 _this.listdata.forEach(function(item){
                   item.modelname = _this.$route.params.modelname
                 })
            }
            else if(reset.codeId == 1021){
                  _this.listdata = []
            }
        })
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.name+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/sku_meta_property/delete?token=" + this.$webapi.get('token') + "&id=" + params.id;
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
          });

      }
    }
}
</script>
