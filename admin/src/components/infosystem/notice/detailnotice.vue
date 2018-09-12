<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem to="/notice/list/">公告管理列表</BreadcrumbItem>
              <BreadcrumbItem>公告详情</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>【{{this.formValidate.title}}】详情</h2>
              </div>
          </div>
        </div>

        <div class="page-component-view">
            <div class="page-component-bd">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                  <FormItem label="标题:" prop="title">
                      <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                  </FormItem>
                  <FormItem label="内容:" prop="content">
                      <ue @UE_data="uedata" :UE_editdata="formValidate.content" v-if="UE_show"></ue>
                  </FormItem>
                  <FormItem class="btns">
                   <!--  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button> -->
                    <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
                </FormItem>
              </Form>
          </div>
        </div>
    </div>
</template>
<script>
  import Ue from '../../pub/UE.vue'
    export default {
        // props:['editaboutusshow','editaboutusdta'],
        created() {
           this.list()
        },
        data () {
            return {
              title:"",
              UE_show:false,
              formValidate:{
                  id:'',
                  title:'',
                  content: ''
              },
              newitem:{

              },
              ruleValidate: {
                title: [
                    { required: true, message: '标题没有填写', trigger: 'blur' }
                ]
             }
            }
        },
        components:{
            Ue:Ue
        },
        mounted(){
          
          this.formValidate.title =  this.$route.query.title
          this.formValidate.id =  this.$route.params.id
        },
        methods: {
          list () {
            let _this = this;
            var url = "/announcement/content?token=" + this.$webapi.get('token') + "&announcementId=" + this.$route.params.id
            this.$api.get(url, null, reset => {
              if (reset.codeId === 1) {
                  _this.formValidate.content = reset.resData.content
                  _this.UE_show = true
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          },
            handleReset (name) {
               this.$router.back(-1)
            },
            
            // 获取编辑器的内容
            uedata(datas){
                return this.formValidate.content=datas;
            }
        },
        watch:{
            "formValidate.title" : {
                handler: function (val, oldVal) {
                    if(val != oldVal&& oldVal!=""){
                      this.newitem.title = val
                    }
                 },
                deep: true
              }
        }
    }
</script>
<style scoped>
    .btns{
        margin-top: 100px;
    }
</style>
