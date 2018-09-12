<style scoped>

.base-info {
    font-size: 18px;
    text-align: left;
    padding-top: 15px;
    margin-bottom: 26px;
    padding-left: 30px;
    padding-bottom: 15px;
    background-color: #fff;
}

.base-color {
    color: #8c8c8c;
}

h3 {
    font-size: 26px;
    text-align: left;
}

.dep-updata {
    text-align: left;
    padding-left: 30px;
    margin-bottom: 15px;
}

.content-bottom {
    width: 100%;
}

</style>

<template>

<div id="aboutus" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>车辆管理</BreadcrumbItem>
                <BreadcrumbItem>车辆列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>车辆列表</h2>
            </div>
        </div>
    </div>

    <div class="page-component-view">
        <div class="page-component-bd">
            <!--查询条件-->
            <div class="tableListForm">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="型号">
                                <car-model @carmodelselect="carmodelselect"></car-model>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="品牌">
                                <brand-component @brandComponentData="brandComponentData"></brand-component>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8" style="text-align:left">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <!--操作按钮-->
            <div class="tableListOperator">
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div>
                            <Button type="primary" @click="addcar()">
                                <Icon type="ios-plus-empty"></Icon> 添加</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <add-car v-if="addcarshow" :addcarshow="addcarshow" @addcarshowdata="addcarshowdata"></add-car>
            <edit-car v-if="editcarshow" :editcardata="editcardata" @editcarshowdata="editcarshowdata" :editcarshow="editcarshow"></edit-car>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div>
                        <i-table border :content="self" :columns="columns7" :data="objArr"></i-table>
                    </div>
                </Col>

            </Row>
            <Row style="text-align:center">
                <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                </Col>
            </Row>
        </div>
    </div>
</div>

</template>

<script>

import Pages from '../pub/page.vue'
import addCar from './addcar.vue'
import editCar from './editcar.vue'
import carModel from '../pub/carmodel.vue'
import brandComponent from '../pub/brandComponent.vue'
import {vm}from '../../js/infobase/vm.js'
export default {
    components: {
        Paging: Pages,
        addCar: addCar,
        editCar: editCar,
        carModel,
        brandComponent,
    },
    data() {
            return {
                pageshow: false,
                editcarshow: false,
                addcarshow: false,
                typename: 'Aboutus',
                editcardata: '',
                self: this,
                formCustom: {
                    brandId: '',
                    modelName: ''
                },
                pageData:{
                    totalCount:1,
                    pageCurrent:1,
                    pagesize:10,
                },
                ruleCustom: {
                    name: [{
                        trigger: 'blur'
                    }]
                },
                columns7: [
                  {
                   title: '品牌名称',
                   key: 'model',
                   render: (h, params) => {
                       return h('div', [
                           h('span', params.row.brandName)
                       ]);
                   },
                   className: 'ivu-table-column-center'
                 },
                 {
                    title: '车辆型号',
                    key: 'model',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.modelName)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                 },
                 {
                    title: '车辆分类',
                    key: 'model',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.carModelCategoryName)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                 },
                 {
                    title: '座位数',
                    key: 'model',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.seating)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                 },
                {
                    title: '曾用名',
                    key: 'model',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.expropriationName)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                },
                {
                    title: '车辆型号图片',
                    key: 'img',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                              attrs: {
                                  src: params.row.pic
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                            })
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '创建者',
                    key: 'creatorName',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.creatorName)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '创建时间',
                    key: 'creatorAt',
                    render: (h, params) => {
                        var str = this.$webapi.gettime('date', (params.row.createdAt) / 1000)
                        return h('div', [
                            h('span', str)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '更新时间',
                    key: 'updatedAt',
                    render: (h, params) => {
                        var str = this.$webapi.gettime('date', (params.row.updatedAt) / 1000)
                        return h('div', [
                            h('span', str)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '更新者',
                    key: 'updatorName',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.updatorName)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    paddingLeft:0,
                    width: 420,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        this.handleRender(params.row)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                       this.$router.push({
                                            path:"/skuitemlist/"+params.row.id+"/"+params.row.modelName,
                                            query:{
                                                brand:params.row.brandName
                                            }
                                        })
                                    }
                                }
                            }, 'SKU属性'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({path:"/item/deploy/"+params.row.id+"/"+params.row.modelName})
                                    }
                                }
                            }, '配置'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        // this.setup(params.row)
                                        this.$router.push(
                                            {
                                                path:"/areapricelist/"+params.row.id,
                                                // query:{
                                                //     id:params.row.id
                                                // }
                                            })

                                    }
                                }
                            }, '经销商价格'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        // this.setup(params.row)
                                        this.$router.push(
                                            {
                                                path:"/userskulist/"+params.row.id,


                                            })

                                    }
                                }
                            }, '用户价格'),
                        ]);
                    }
                }],
                objArr: [],
            }
        },

        mounted() {
            this.list();
        },
        created() {
            // vm.$on("addmodal",(datas)=>{
            //     this.list();
            //     this.addaboutusshow=datas;
            // });
        },
        methods: {
              addcar () {
                 this.addcarshow = true
              },
              carmodelselect(e) {
                 this.formCustom.modelName = e.modelName;
              },
             brandComponentData (e){
                console.log(e)
                this.formCustom.brandId = e.id || ""
             },
            handleRender(val) {
                this.editcardata = val
                this.editcarshow = true

            },
            pageComponentDate(e) {
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            editaboutuscomponentdata(e) {
                this.editaboutusshow = e.editaboutusshow;
                this.list();
            },
            addcarshowdata(e) {
                this.addcarshow = e;
                this.list()
            },
            editcarshowdata(e) {
                this.editcarshow = e;
                this.list()
            },
            list() {
                let _this = this
                let data = {
                    token: this.$webapi.get('token'),
                    brandId:this.formCustom.brandId,
                    modelName:this.formCustom.modelName,
                    pageNo:this.pageData.pageCurrent,
                    pageSize:this.pageData.pagesize
                }
                this.$api.get('/car_model/page', data, reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        _this.objArr = data.list;
                        _this.pageData.totalCount = data.totalCount
                        _this.pageshow = true
                    }
                    else if(reset.codeId ==-9){
                      _this.objArr = [];
                      _this.pageData.totalCount = 0
                      _this.pageData.pageCurrent = 1
                      _this.pageshow = true
                    }
                    else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            // setup(e) {
            //     this.$router.push({
            //         name: 'AreaPriceList',
            //         params: e
            //     })
            // },
            remove(e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认' + e.model + '删除吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/car_model/delete",data,reset => {
                            if (reset.codeId === 1) {
                                _this.list()
                                _this.$Message.info('删除成功')
                                _this.pageshow =  true
                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });

            },
            handleSubmit(name) {
                this.pageData.pageCurrent = 1
                this.pageshow = false
                this.list()
            },
            handleReset(name) {
                this.$refs[name].resetFields()
                this.list();
            }
        }
}

</script>
