<template>

<div id="resource" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>基础信息</BreadcrumbItem>
                <BreadcrumbItem>资源管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>资源管理</h2>
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
                            <Button type="primary" @click="addlist()">
                                <Icon type="ios-plus-empty"></Icon> 添加</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <resource-component-edit @editresourcecomponentdata="editresourcecomponentdata" :editresourceshow="editresourceshow" :editresourcedata="editresourcedata" v-if="editresourceshow"></resource-component-edit>
            <modals :modalbool="modals"></modals>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div>
                        <i-table border :content="self" :columns="columns7" :data="objArr"></i-table>
                    </div>
                </Col>

            </Row>

            <!-- <Row style="text-align:center">
                <Col :xs="24" :sm="24" :md="24" :lg="24" style="text-align:center">
                    <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                </Col>
            </Row> -->
        </div>
    </div>
</div>

</template>

<script>

import Modals from '../../pub/modal'
import Pages from '../../pub/page.vue'
import ResourceComponentEdit from './editresource.vue'
import {vm} from '../../../js/infobase/vm.js'
export default {
    data() {
            return {
                pageshow: false,
                addmodal: false,
                typename: 'department',
                self: this,
                editresourcedata: {},
                editresourceshow: false,
                formCustom: {
                    departmentNo: '',
                    name: ''
                },
                ruleCustom: {
                    departmentNo: [{
                        trigger: 'blur'
                    }],
                    name: [{
                        trigger: 'blur'
                    }]
                },
                // 分页
                pageData: {
                    totalCount: 1,
                    //
                    pageCurrent: 1,

                    pagesize: 20,
                },
                modals: {
                    modalBool: false,
                    successText: ""
                },

                columns7: [{
                    title: 'id',
                    key: 'id',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.id)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '名称',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.name)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '页面地址',
                    key: 'path',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.path)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '父类ID',
                    key: 'parentId',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.parentId)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '接口地址',
                    key: 'url',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.url)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '图标地址',
                    key: 'icon',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.icon)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '排序字段',
                    key: 'resourcesOrder',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.resourcesOrder)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '是否显示',
                    key: 'isShow',
                    render: (h, params) => {
                        let d="";
                        if(params.row.isShow==1){
                            d="显示"
                        }else{
                            d="不显示"
                        }
                        return h('div', [

                            h('span', d)
                        ]);
                    },
                    className: 'ivu-table-column-center'
                }, {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:180,
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
                                        this.handleRender(params.row)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    // size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: '#fff'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)

                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
                objArr: [],
            }
        },
        components: {
            Modals: Modals,
            Paging: Pages,
            ResourceComponentEdit: ResourceComponentEdit
        },
        mounted() {
            // this.$api.get('http://localhost:8080/static/json/data.json')
            // var num=0;
            this.list();
        },
        created() {
            vm.$on("addmodal", (datas) => {
                this.list();
                this.addmodal = datas;
            });
        },
        methods: {
            handleRender(val) {
                    this.editresourcedata = val;
                    this.editresourceshow = true;
                },
                pageComponentDate(e) {
                    this.pageData.pageCurrent = e.pageCurrent
                    this.pageData.pagesize = e.pagesize
                    this.list()
                },
                editresourcecomponentdata(e) {
                    this.editresourceshow = e.editresourceshow;
                    this.list();
                },

                list() {
                    let _this = this
                    let data = {
                        token:this.$webapi.get('token'),
                        name:'',
                        parentId: ''
                    }                
                    this.$api.get('/admin_resources/list', data, reset => {
                        if (reset.codeId === 1) {
                            let data = reset.resData
                            _this.objArr = data

                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                remove(e) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确认删除【' + e.name + '】吗?</p>',
                        onOk: () => {
                            let _this = this;
                            var data = {
                              token:this.$webapi.get('token'),
                              id:e.id
                            }
                            this.$api.post("/admin_resources/delete", data, reset => {
                                if (reset.codeId === 1) {
                                    _this.list();
                                    _this.$Message.info('删除成功');
                                    _this.pageshow = true;
                                } else {
                                    _this.$netcode.getApiCode(reset)
                                }
                            })


                        },
                        onCancel: () => {

                        }
                    });

                },
                addlist() {
                    this.$router.push("/resource/addresourcelist");
                }
        }
}

</script>
<style scoped>

.res-name {
    padding: 10px 16px;
}

.res-name span {
    float: left;
    line-height: 32px;
    font-size: 20px;
}

ul {
    margin: 0;
    padding: 0px;
}

li {
    text-align: left;
    padding-left: 16px;
}

.res-title-name {
    padding-top: 6px;
    padding-bottom: 0px;
    position: relative;
    z-index: 1;
    transition: all .2s ease-in-out;
}

.res-title-div {
    font-size: 18px;
}

.res-title-div p {
    text-align: center;
}

.res-title-name-div {
    font-size: 16px;
}

.res-title-name-ul {
    margin: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    z-index: 900;
}

.icon {
    display: inline-block;
}

.icon-div {
    text-align: center;
}

.icon-div span {
    float: left;
}

.icon span {
    margin-left: 10px;
}

.menu {
    border-right: 1px solid #ccc;
}

</style>
