<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/brand">品牌列表</BreadcrumbItem>
                <BreadcrumbItem>添加品牌信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加品牌信息</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="供应商名称" required>
                                    <Select v-model="val" @on-change=changeval(val)>
                                        <Option value="" key="">全部</Option>
                                        <Option v-for="item in enterprisedata" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                            <FormItem label="品牌名称" required prop="name">
                                <Input v-model="formItem.name" placeholder="品牌名称"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="品牌图片" prop="brand">
                                    <Upload @uploadComponent="uploadbrandurl"></Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="官网地址">
                                    <Input v-model="formItem.url" placeholder="官网地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">添加</Button>
                    <Button type="ghost" @click="handleReset('formItem')" size="large">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>
<script>
import Upload from "../pub/Uploadimg.vue"
const brandname = (rule, value, callback) => {
    var myreg=/^[\u2E80-\u9FFF]{2,16}$/;
    if (!myreg.test(value)) {
        callback(new Error('必须是中文字'));
    } else {
        callback();
    }
}
export default {
    components: {
        Upload
    },
    data(){
        return{
            enterprisedata:[],
            val:'',
            formItem: {
                enterpriseId:'',
                name: '',
                brandurl:'',
                url:''

            },
            ruleValidate: {
              name: [
                   { validator: brandname, trigger: 'blur' }
              ]
            }
        }
    },
    mounted(){
        this.enterprise();
    },
    methods:{
        enterprise(){
            let _this = this
            let data = {
                token:this.$webapi.get('token'),
            }
            this.$api.get('/enterprise/findList',data,reset => {
                if (reset.codeId === 1) {
                    let data = reset.resData
                     _this.enterprisedata=data

                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.post();
                }
            })
        },
        post(){
            let _this = this;
            if(!this.formItem.enterpriseId){
               this.$Message.success('企业名称没有选择');
               return
            }
            var data = {
              token:this.$webapi.get('token'),
              enterpriseId:this.formItem.enterpriseId,
              name:this.formItem.name,
              icon:this.formItem.brandurl,
              url:this.formItem.url
            }
            this.$api.post("/brand/save", data, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('添加成功!');
                    this.$router.push('/brand');
                }else {
                  _this.$netcode.getApiCode(reset)
                }
            })
        },
        handleReset(name) {
           this.$router.back(-1);
        },
        changeval(value){
            this.formItem.enterpriseId=value;
        },
        uploadbrandurl(e){
            this.formItem.brandurl=e[0];
        },
        uploadenterpriseurl(e){
            this.formItem.enterpriseurl=e[0];
        }
    }
}
</script>
