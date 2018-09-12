<template>
    <div id="aboutus" style="width:100%">
        <div class="pageHeader">
          <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem to="/notice/list/">公告管理列表</BreadcrumbItem>
              <BreadcrumbItem>添加公告</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="page-detail">
              <div class="page-detail-hd">
                 <h2>添加公告</h2>
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
                      <ue @UE_data="uedata"></ue>
                  </FormItem>
                  <FormItem class="btns">
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
        data () {
            return {
              title:"",
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
          Ue
        },
        methods: {
          // cancel () {
          //   this.$emit('editaboutuscomponentdata',{editaboutusshow:false})
          // },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
                this.$router.back(-1);
            },
            post () {
              if(this.formValidate.content==""){
                this.$Message.error('内容没有填写')
                return
              }
              let _this = this;
              var data = {
                  token:this.$webapi.get('token'),
                  title:this.newitem.title,
                  content:this.formValidate.content
              }             
              this.$api.post("/announcement/add", data, reset => {
                if (reset.codeId === 1) {
                   this.$Message.success('保存成功')
                   this.$router.push({path:"/notice/list"})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
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
