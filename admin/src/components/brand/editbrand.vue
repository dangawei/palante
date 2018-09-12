<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/brand">品牌列表</BreadcrumbItem>
                <BreadcrumbItem>修改品牌信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>修改品牌信息</h2>
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
                                <FormItem label="供应商名称" prop="id">
                                   <!-- <Select v-model="val" @on-change=changeval(val) :placeholder="formItem.enterprisename">
                                        <Option v-for="item in enterprisedata" :value="item.id" :key="item.enterprisename">{{ item.enterprisename }}</Option>
                                    </Select> -->
                                    <p>{{formItem.enterprisename}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="品牌名称" prop="brandName">
                                    <Input v-model="formItem.brandName" placeholder="品牌名称"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="品牌图标" prop="brand">
                                    <Upload @uploadComponent="uploadbrandurl" :Uploadimg="formItem.icon" v-if="show"></Upload>
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
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">保存</Button>
                    <Button type="ghost" @click="handleReset('formItem')" size="large">取消</Button>

                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>
<script>
    import Upload from "../pub/Uploadimg.vue"
export default {
    components: {
        Upload
    },
    created(){

    },
    mounted () {
        this.list()
        // console.log(this.$route.query);
        this.formItem.id=this.$route.params.id
        this.formItem.enterpriseId=this.$route.params.enterpriseId
        this.formItem.enterprisename=this.$route.query.enterprisename
        // setTimeout(()=>{
        //     this.enterprise();
        // },300)
        // console.log(this.formItem)
    },
    data(){
        return{
            enterprisedata:[],
            val:"",
            companyshow:false,
            show:false,
            formItem: {
                id:'',
                enterpriseId:'',
                enterprisename:'',
                brandName:"",
                icon:'',
                url:''
            },
            ruleValidate: {
                brandName: [{
                    required: true,
                    message: '品牌名称没有填写',
                    trigger: 'blur'
                }],

            }
        }
    },
    methods:{
        // enterprise(){
        //     let _this = this
        //     let data = {
        //         token:this.$webapi.get('token'),
        //     }
        //     this.$api.get('/enterprise/findList',data,reset => {
        //         if (reset.codeId === 1) {
        //             let data = reset.resData
        //              _this.enterprisedata=data;

        //         }else {
        //             _this.$netcode.getApiCode(reset)
        //         }
        //     })
        // },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                    this.post();
                    // this.$router.push('/brand');
                } else {
                    this.$Message.error('Fail!')
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
            this.formItem.icon=e[0];
        },
        list(){
            let _this=this
            let datas={
                token:this.$webapi.get('token'),
                enterpriseId:parseInt(this.$route.params.enterpriseId),
                name:this.$route.query.brandname
            }
            this.$api.get("/brand/findList",datas,reset=>{
            if (reset.codeId===1) {
                _this.formItem.icon = reset.resData[0].icon
                _this.formItem.url=reset.resData[0].url
                _this.formItem.brandName=reset.resData[0].brandName
                this.show = true
            }else{
                _this.$netcode.getApiCode(reset)
            }
           })
        },
        post(){
            let _this = this;
            var data = {
              token:this.$webapi.get('token'),
              id:this.formItem.id,
              enterpriseId:this.formItem.enterpriseId,
              icon:this.formItem.icon,
              url:this.formItem.url,
              name:this.formItem.brandName
            }
            this.$api.post("/brand/update", data, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('修改成功!');
                    this.$router.push('/brand');
                }else {
                  _this.$netcode.getApiCode(reset)
                }
            })
        },
    }
}
</script>
