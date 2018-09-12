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
        <!--查询条件-->
        <div class="tableListForm">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            </Form>
        </div>
        <!--操作按钮-->
       <div class="tableListOperator">
         <Button type="primary" @click="addsku()"><Icon type="ios-plus-empty"></Icon> 添加</Button>
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
  <sku-component :addskushow="addskushow" @skucomponent="skucomponent" v-if="addskushow" :skuID="skuID" :skuName="skuName"></sku-component>
  <sku-component-edit :editskushow="editskushow" @skucomponent="skucomponent" v-if="editskushow" :skuID="skuID" :editSkuID="editSkuID" :skuName="skuName" :editSkuName="editSkuName"></sku-component-edit>
</div>
</template>
<script>
import SkuComponent from "./add.vue"
import SkuComponentEdit from "./edit.vue"
export default {
    components: {
      SkuComponent,
      SkuComponentEdit
    },
    data() {
        return {
          editSkuName:"",
          editSkuID:"",
          addskushow:false,
          editskushow:false,
          skuID:this.$route.params.id,
          skuName:this.$route.params.title,
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
                title: '父级分类',
                key: 'id',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.propertyName)
                  ]);
                },
                className:'ivu-table-column-center'
            },
            {
                title: 'SKU属性',
                key: 'id',
                render: (h, params) => {
                  return h('div', [
                      h('span', params.row.value)
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
                      h('span', params.row.id)
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
                                   this.editSkuID = params.row.id
                                   this.editSkuName = params.row.value
                                   this.editskushow = true
                                }
                            }
                        }, '修改'),
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
    mounted() {
      //do something after mounting vue instance
      this.list()
    },
    methods: {
      addsku () {
          this.addskushow = true
      },
      list () {
       
      },
      skucomponent (e) {
        this.addskushow = e
        this.list()
      },
      remove (params) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+params.value+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/sku_meta_property_value/delete?token=" + this.$webapi.get('token') + "&id=" + params.id;
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
      }
    }
}
</script>
