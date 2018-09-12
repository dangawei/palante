<template>
  <div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>车辆管理</BreadcrumbItem>
                <BreadcrumbItem>车辆参数</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>车辆参数</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
      <!--查询条件-->
      <!-- <div class="tableListForm">
          <Form ref="formCustom" :model="formCustom" :label-width="80">
            <Row>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                  <FormItem label="名称" prop="name">
                      <Input type="text" v-model="formCustom.name"></Input>
                  </FormItem>
              </Col>
              <Col :xs="24" :sm="24" :md="8" :lg="6">
                  <FormItem label="车辆型号" prop="name">
                      <car-model @carmodelselect="carmodelselect"></car-model>
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
      </div> -->
      <!--操作按钮-->
     <div class="tableListOperator">
       <Button type="primary" @click="add()"><Icon type="ios-plus-empty"></Icon>添加父类</Button>
     </div>
     <Row>
         <Col :xs="24" :sm="24" :md="24" :lg="24">
             <div>
                 <div class="">
                    <div class="carallbox">
                        <div class="carlist" v-for="(item,index) in listdata">
                           <div class="car-hd">
                              <span class="fl"  @click="itemclick(item,index)">{{item.name}}<em class="gray">(排序:{{item.sequence}})</em></span>
                              <span class="fr">
                                  <span class="" v-if="item.show" @click="itemclick(item,index)">
                                    <Button>收起</Button>
                                  </span>
                                  <span class="" v-else @click="itemclick(item,index)">
                                    <Button>展开</Button>
                                  </span>
                                  <span @click="edit(item)"><Button type="primary">修改</Button></span>
                                  <span @click="remove(item)"><Button type="error">删除</Button></span>
                              </span>
                           </div>
                           <div class="car-bd" v-if="item.show">
                              <div class="carbdlist" v-for="(itemlist,index) in item.secondList">
                                <div class="">
                                  <span v-if="itemlist.id">{{itemlist.name}}<em class="gray">(排序:{{itemlist.sequence}})</em></span>
                                  <span v-else>
                                      <Input v-model="itemlist.name" placeholder="子属性名称" style="width:200px;float:left;margin-top:5px;margin-right:10px"></Input>
                                      <span class="fl" style="height:35px;line-height:35px">排序:</span>
                                      <Input v-model="itemlist.sequence" placeholder="子属性排序" style="width:200px;float:left;margin-top:5px;margin-right:10px"></Input>
                                  </span>
                                </div>
                                <div class="">
                                  <span @click="edit(itemlist)"><Button type="primary">修改</Button></span>
                                  <span v-if="itemlist.id">
                                      <span @click="remove(itemlist)"><Button type="error">删除</Button></span>
                                  </span>
                                  <span v-else>
                                      <span @click="itemremove(item,index)"><Button type="error">删除</Button></span>
                                  </span>
                                </div>
                              </div>
                              <div class="mt10">
                                <span @click="additem(item)" class="fl mr10">
                                    <Button type="primary">添加{{item.name}}属性</Button>
                                </span>
                                <span @click="saveitem(item)" class="fl">
                                    <Button type="primary">保存</Button>
                                </span>
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
             </div>
         </Col>
     </Row>
    </div>
    </div>
    <add-component :addshow="addshow" @emitcomponent="emitcomponent" v-if="addshow"></add-component>
    <edit-component :editshow="editshow" @emitcomponent="emitcomponent" v-if="editshow" :editName="editName" :editID="editID" :sequence="sequence" :parentIdNum="parentIdNum"></edit-component>
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
        itemindex:"",
        formCustom:{
          name:"",
          carModelId:""
        },
        newdata:[],
        pageshow:false,
        addshow:false,
        editName:"",
        editID:"",
        sequence:"",
        editshow:false,
        parentIdNum:'',
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
      edit (item) {
        this.editName = item.name
        this.editID = item.id
        this.sequence = item.sequence
        this.parentIdNum = item.parentId
        this.editshow = true
      },
      itemclick (item,index) {
        item.show = !item.show
        if(item.show){
          this.itemindex = index
        }else{
          this.itemindex = ""
        }
      },
      add () {
         this.addshow  = true
      },
      inputblur (a) {
        if(this.newdata.length>0){
          var idx = -1
          this.newdata.forEach(function (b,index) {
              if(b.parentId == a.parentId){
                idx = index
              }
          })
          if(idx == -1){
            var item = {
              parentId:a.parentId,
              list:[{
                name:a.name,
                sequence:a.sequence
              }]
            }
            this.newdata.push(item)
          }else {
            var item = {
              name:a.name,
              sequence:a.sequence
            }
            this.newdata[idx].list.push(item)
          }
        }else {
          var item = {
            parentId:a.parentId,
            list:[{
              name:a.name,
              sequence:a.sequence
            }]
          }
          this.newdata.push(item)
        }
      },
      additem (item) {
           var newitem = {
             name:"",
             sequence:item.secondList.length+1,
             newshow:true,
             parentId:item.parentId
           }
          item.secondList.push(newitem)
      },
      saveitem (item) {
        var _this = this;
        var newitem = {
          token:this.$webapi.get("token"),
          parentId:item.id,
          data:[]
        }
        var idx = 0
        var idxshow = 0
        item.secondList.forEach(function (b) {
            if(b.name==""){
                idxshow = 1
            }
            if(!b.parentId){
              idx = 1
              newitem.data.push({
                name:b.name,
                sequence:parseInt(b.sequence)
              })
            }
        })
        if(idxshow == 1){
          this.$Message.info("参数名称不能空")
          return
        }
        newitem.data = JSON.stringify(newitem.data)
        if(idx == 1){
          this.$api.post("/model_configuration_property/saveList",newitem,reset => {
              if (reset.codeId === 1) {
                  _this.list();
                  _this.$Message.info('添加成功')
              }else {
                  _this.$netcode.getApiCode(reset)
              }
          })
        }else {
          this.$Message.info("该板块没有新内容")
        }
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
        let num = _this.itemindex
        let data = {
            token:this.$webapi.get('token')
        }
        this.$api.get('/model_configuration_property/getAllList',data,reset => {
            if (reset.codeId === 1) {
                var str = reset.resData
                str.forEach(function (a) {
                   a.show = false
                })
                setTimeout(function () {
                  if(num>=0){
                    str[num].show = true
                  }
                },300)
                _this.listdata = str
            }
            else if(reset.codeId === -9){
              _this.listdata = []
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
      },
      itemremove (item,index){
        item.secondList.splice(index,1)
      },
      remove (item) {
          let _this = this
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认【'+item.name+'】要删除吗?</p>',
              onOk: () => {
                let _this = this;
                let url="/model_configuration_property/delete?token=" + this.$webapi.get('token') + "&id=" + item.id;
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
.carallbox{
  .carlist{
    float: left;
    width: 100%;
    padding: 5px 0;
    .car-hd{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: #ddd 1px solid;
      cursor: pointer;
      font-weight: bold;
    }
    .car-bd{

    }
    .car-bd .carbdlist{
      border-bottom: #ddd 1px solid;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      color: #666;
      margin: 0 10px;
    }
  }
}
</style>
