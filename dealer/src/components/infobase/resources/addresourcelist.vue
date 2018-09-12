<style scoped>

.res-name {
    padding: 10px 16px;
    text-align: right;
    border-bottom: 1px solid #ccc;
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
    text-align: right;
    padding-right:10px;
}

.icon-div span {
    float: left;
}

.icon span {
    display: inline-block;
    margin-left: 15px;
}

.menu {
    border-right: 1px solid #ccc;
}

</style>

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
                <h2>资源管理增加</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <Row>
                <Col span="8">
                    <div class="menu">
                        <div class="res-name">
                            <span>一级菜单</span>
                            <Button type="primary" @click="addmenuone()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objArr">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span>
                                        <span @click="switchone(item)"><Icon type="android-add-circle" color="#1AAB8D"></Icon></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>

                </Col>
                <Col span="8">
                    <div class="menu" v-if="showtwo">
                        <div class="res-name">
                            <span>二级菜单</span>
                            <Button type="primary" @click="addmenutwo()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objtwo">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span>
                                        <span @click="switchtwo(item)"><Icon type="android-add-circle" color="#1AAB8D"></Icon></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span="8">
                    <div class="menu" v-if="showthree">
                        <div class="res-name">
                            <span>三级菜单</span>
                            <Button type="primary" @click="addmenuthree()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objthree">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span><span @click="remove(item)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                    </p>

                                </div>

                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>

            <Modal
                v-model="addmodal"
                :title="addtitle"
                >
                <resource-component-add :addid="add"></resource-component-add>
                <div slot="footer">
                </div>
            </Modal>

            <modals :modalbool="modals"></modals>
            <resource-component-edit @editresourcecomponentdata="editresourcecomponentdata" :editresourceshow="editresourceshow" :editresourcedata="editresourcedata" v-if="editresourceshow"></resource-component-edit>

        </div>
    </div>
</div>

</template>

<script>

import Modals from '../../pub/modal'
import ResourceComponentAdd from './addresource.vue'
import ResourceComponentEdit from './editresource.vue'
import {vm}
from '../../../js/infobase/vm.js'
export default {
    data() {
            return {
                showtwo: false,
                showthree: false,
                addtitle: '',
                addmodal: false,
                editresourcedata: {},
                addone:'',
                addtwo:'',
                add:{
                    addid:0,
                    rank:0,
                },

                editresourceshow: false,
                objArr: [],
                modals: {
                    modalBool: false,
                    successText: ""
                },
                objtwo: [],
                objthree: [],
            }
        },
        components: {
            Modals: Modals,
            ResourceComponentEdit: ResourceComponentEdit,
            ResourceComponentAdd: ResourceComponentAdd
        },
        created() {
            vm.$on("addmodal", (datas) => {
                this.addmodal = datas;
                this.list();
            });
            vm.$on("showtwo", (datas) => {
                this.addmodal = datas.addmodal;
                if (datas.rank==1) {
                    this.showtwo = datas.show;
                    this.get(datas);
                }else{
                    this.showtwo = datas.show;
                    this.showthree = datas.show;
                    this.getthree(datas);
                }

            });
        },
        mounted() {
            this.list();

        },
        methods: {
            addmenuone() {
                this.addmodal = true;
                this.addtitle = "新增一级菜单";
                this.add.addid=0;
                this.add.rank=0;
                console.log(this.add.addid);
            },
            addmenutwo() {

                this.addtitle = "新增二级菜单";
                this.add.addid=this.addone;
                this.add.rank=1;
                this.addmodal = true;
            },
            addmenuthree() {

                this.addtitle = "新增三级菜单";
                this.add.addid=this.addtwo;
                this.add.rank=2;
                this.addmodal = true;
            },
            handleRender(val) {
                this.editresourcedata = val;
                this.editresourceshow = true;
            },
            editresourcecomponentdata(e) {
                this.editresourceshow = e.editresourceshow;
                this.list();
            },
            switchone(e) {
                this.showthree=false;
                this.objthree=[];
                this.addone=e.id;
                this.get(e);
            },
            switchtwo(e) {
                this.showthree=true;
                this.addtwo=e.id;

                this.getthree(e);
            },

            get(e) {

                let _this = this
                let data = {
                    token: this.$webapi.get('token'),
                    parentId: e.id,
                }
                this.$api.get('/dealer_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                        let data=reset.resData;
                        _this.objtwo=data;
                        for (var i =0; i <= _this.objtwo.length - 1; i++) {
                            _this.objtwo[i].rank=1;
                        }

                        _this.showtwo=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            getthree(e) {
                let _this = this
                let data = {
                    token: this.$webapi.get('token'),
                    parentId: e.id,
                }
                this.$api.get('/dealer_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                        let data=reset.resData;
                        _this.objthree=data;
                        for (var i =0; i <=  _this.objthree.length - 1; i++) {
                            _this.objthree[i].rank=2;
                        }
                        _this.showthree=true;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            list() {
                console.log(this.$webapi.get('token'))
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    name: '',
                    parentId: 0
                }
                this.$api.get('/dealer_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                        let data = reset.resData
                        _this.objArr = data
                        for (var i =0; i <=  _this.objArr.length - 1; i++) {
                            _this.objArr[i].rank=0;
                        }
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove(e) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除' + e.name + '吗?</p>',
                    onOk: () => {
                        let _this = this;
                        
                        let datas={
                            token:this.$webapi.get('token'),
                            id:e.id,
                            status:-1
                            
                        }
                        this.$api.post("/dealer_resources/update",datas, reset => {
                            if (reset.codeId === 1) {
                                console.log(e);
                                if (e.rank==0) {
                                    _this.list();
                                }else if (e.rank==1) {
                                    let parent={
                                        id:e.parentId
                                    }
                                    _this.get(parent);
                                }else{
                                    let parent={
                                        id:e.parentId
                                    }
                                    _this.getthree(parent);
                                }

                                _this.$Message.info('删除成功');
                            } else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });

            },
        },

}

</script>
