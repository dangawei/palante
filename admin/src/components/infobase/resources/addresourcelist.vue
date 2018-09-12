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
                                        <span @click="remove(item,index,objArr)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
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
                                        <span @click="remove(item,index,objtwo)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
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
                                        <span @click="handleRender(item)"><Icon type="android-menu" color="#1AAB8D"></Icon></span><span @click="remove(item,index,objthree)"><Icon type="android-cancel" color="#DD4E4E"></Icon></span>
                                    </p>

                                </div>

                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <resource-component-add :addid="add" :addresourceshow="addresourceshow" v-if="addresourceshow" @addEmitRes="addEmitRes" @addEmitCloseRes="addEmitCloseRes"></resource-component-add>
            <resource-component-edit @editresourcecomponentdata="editresourcecomponentdata" :editresourceshow="editresourceshow" :editresourcedata="editresourcedata" v-if="editresourceshow"></resource-component-edit>
       </div>
    </div>
</div>
</template>
<script>
import ResourceComponentAdd from './addresource.vue'
import ResourceComponentEdit from './editresource.vue'
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
                    addtitle:""
                },
                addresourceshow:false,
                editresourceshow: false,
                objArr: [],
                objtwo: [],
                objthree: [],
            }
        },
        components: {
            ResourceComponentEdit: ResourceComponentEdit,
            ResourceComponentAdd: ResourceComponentAdd
        },
        created() {
            // vm.$on("addmodal", (datas) => {
            //     this.addmodal = datas;
            //     this.list();
            // });
            // vm.$on("showtwo", (datas) => {
            //   alert(datas.rank)
            //     this.addmodal = datas.addmodal;
            //     if (datas.rank==1) {
            //         this.showtwo = datas.show;
            //         this.get(datas);
            //     }else{
            //         this.showtwo = datas.show;
            //         this.showthree = datas.show;
            //         this.getthree(datas);
            //     }
            // });
        },
        mounted() {
            this.list();
        },
        methods: {
            cancel () {
                this.addmodal = false
            },
            addmenuone() {
                this.addmodal = true;
                this.add.addtitle = "新增一级菜单";
                this.add.addid=0;
                this.add.rank=1;
                this.addresourceshow = true
            },
            addmenutwo() {
                this.add.addtitle = "新增二级菜单";
                this.add.addid=this.addone;
                this.add.rank=2;
                this.addmodal = true;
                this.addresourceshow = true
            },
            addmenuthree() {
                this.add.addtitle = "新增三级菜单";
                this.add.addid=this.addtwo;
                this.add.rank=3;
                this.addmodal = true;
                this.addresourceshow = true
            },
            handleRender(val) {
                this.editresourcedata = val;
                this.editresourceshow = true;
            },
            editresourcecomponentdata(e) {
                this.editresourceshow = e.editresourceshow;
                this.get(e)
            },
            addEmitCloseRes () {
              this.addresourceshow = false
            },
            addEmitRes (e) {
              this.addresourceshow = false
              this.get(e)
            },
            switchone(e) {
                this.showthree =false;
                this.showtwo = true;
                this.objthree=[];
                this.addone=e.id;
                this.gettwo(e);
            },
            switchtwo(e) {
                this.showthree = true;
                this.addtwo = e.id;
                this.getthree(e);
            },
            get(e) {
                let _this = this
                let data = {
                    token: this.$webapi.get('token'),
                    parentId: e.id,
                }
                this.$api.get('/admin_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                      if(e.curshow == 1){
                         this.list()
                      }else if(e.curshow==2) {
                        let data=reset.resData;
                        _this.objtwo=data;
                        for (var i =0; i <= _this.objtwo.length - 1; i++) {
                            _this.objtwo[i].rank= e.rank
                            _this.objtwo[i].curshow= e.curshow
                        }
                        _this.showtwo=true;
                      } else if(e.curshow == 3){
                          let data=reset.resData;
                          _this.objthree=data;
                          for (var i =0; i <= _this.objthree.length - 1; i++) {
                            _this.objthree[i].rank= e.rank
                            _this.objthree[i].curshow= e.curshow
                          }
                          _this.showthree=true;
                      }
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            gettwo(e) {
                let _this = this
                let data = {
                    token: this.$webapi.get('token'),
                    parentId: e.id,
                }
                this.$api.get('/admin_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                      var data = reset.resData;
                        data.forEach((a) =>{
                          a.rank = 2
                          a.curshow = 2
                        })
                        _this.objtwo = data;
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
                this.$api.get('/admin_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                        var data = reset.resData;
                          data.forEach((a) =>{
                            a.rank = 3
                            a.curshow = 3
                          })
                          _this.objthree = data;
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            list() {
                let _this = this
                let data = {
                    token:this.$webapi.get('token'),
                    name: '',
                    parentId: 0
                }
                this.$api.get('/admin_resources/list', data, reset => {
                    if (reset.codeId === 1) {
                        var data = reset.resData
                        data.forEach( (a)=>{
                          a.rank = 0
                          a.curshow = 1
                        })
                        _this.objArr = data
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            remove(e,index,itemlist) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除' + e.name + '吗?</p>',
                    onOk: () => {
                        let _this = this;
                        var data = {
                            token:this.$webapi.get('token'),
                            id:e.id
                        }
                        this.$api.post("/admin_resources/delete", data, reset => {
                            if (reset.codeId === 1) {
                                 itemlist.splice(index,1)
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
