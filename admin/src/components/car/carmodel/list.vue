<template>
  <div>
    <div class="page-component-bd">
      <!--查询条件-->
      <div class="tableListForm none">
          <Form ref="formCustom" :model="formCustom" :label-width="80">
            <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="6">
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="formCustom.name"></Input>
                    </FormItem>
                </Col>
                <!-- <Col :xs="24" :sm="24" :md="8" :lg="6">
                    <FormItem label="车辆型号" prop="name">
                        <car-model @carmodelselect="carmodelselect"></car-model>
                    </FormItem>
                </Col> -->
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
       <Button type="primary" @click="add()"><Icon type="ios-plus-empty"></Icon> 添加</Button>
     </div>
     <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div>
               <Table border :columns="columnsdata" :data="listdata"></Table>
               <div class="mt20">
                 <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
               </div>
             </div>
         </Col>
     </Row>
    </div>
    <add-component :addshow="addshow" @emitcomponent="emitcomponent" v-if="addshow"></add-component>
    <edit-component :editshow="editshow" @emitcomponent="emitcomponent" v-if="editshow" :editName="editName" :editID="editID"></edit-component>
  </div>
</template>
<script>
import Pages from '../../pub/page.vue'
import carModel from '../../pub/carmodel.vue'
import addComponent from './add.vue'
import editComponent from './edit.vue'
export default {
    components: {
      Paging:Pages,
      carModel,
      addComponent,
      editComponent
    },
    data () {
      return {
        listdata:[],
        formCustom:{
          name:"",
          carModelId:""
        },
        pageshow:false,
        addshow:false,
        editName:"",
        editID:"",
        editshow:false,
        pageData:{
            totalCount:1,
            pageCurrent:1,
            pagesize:10,
        },
        columnsdata:[
          {
              title: '名称',
              key: 'id',
              render: (h, params) => {
                return h('div', [
                    h('span', params.row.name)
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
                var str = this.$webapi.gettime('date', (params.row.createdAt) / 1000)
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
                                 this.editName = params.row.name
                                 this.editshow = true
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
      this.list()
    },
    methods: {
      add () {
         this.addshow  = true
      },
      pageComponentDate () {
        this.list()
      },
      emitcomponent (e) {
         this.addshow = false
         this.editshow = false
         this.list()
      },
      carmodelselect(e) {
         this.formCustom.carModelId = e.id
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            name:this.formCustom.name,
            pageNo:this.pageData.pageCurrent,
            pageSize:this.pageData.pagesize,
            carModelId:this.$route.params.id
        }
        this.$api.get('/model_type/page',data,reset => {
            if (reset.codeId === 1) {
                _this.listdata = reset.resData
                _this.pageData.totalCount = reset.resData.totalCount
                _this.pageshow = true
            }
            else if(reset.codeId === -9){
              _this.listdata = []
            }
            else {
                _this.$netcode.getApiCode(reset)
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
                let url="/model_type/delete?token=" + this.$webapi.get('token') + "&id=" + params.id;
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
<style lang="less">

</style>
