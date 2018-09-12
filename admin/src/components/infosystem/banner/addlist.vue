<template>
  <div class="">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/banner/list/">Banner管理</BreadcrumbItem>
          <BreadcrumbItem>添加Banner</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
          <div class="page-detail-hd">
                <h2>添加Banner</h2>
          </div>
      </div>
    </div>
    <div class="h20"></div>
    <Row>
       <Col span="6">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="标题名称" prop="title">
                 <Input v-model="formValidate.title" placeholder="标题名称没有填写"></Input>
             </FormItem>
             <FormItem label="显示终端" prop="useType" required>
               <Select v-model="formValidate.useType">
                   <Option value="" key="">全部</Option>
                   <Option value="1">WEB</Option>
                   <Option value="2">APP</Option>
               </Select>
             </FormItem>
             <FormItem label="显示位置" prop="locationId" required>
                <adv-component @EmitAdv="EmitAdv"></adv-component>
             </FormItem>
             <FormItem label="图片" prop="图片" required>
                  <img-component @uploadComponent="uploadComponent"></img-component>
                  <div class="mt10">
                     <Alert type="warning" show-icon>图片不能超过2M 上传图片尺寸1920*600</Alert>
                  </div>
             </FormItem>
             <FormItem label="链接" prop="url">
                 <Input v-model="formValidate.url" placeholder="案例:http://www.baidu.com"></Input>
             </FormItem>
             <FormItem label="有效期">
                 <Row>
                     <Col span="11">
                         <FormItem >
                             <DatePicker type="date" placeholder="有效期展示" size="default"  @on-change="getStartTime" ></DatePicker>
                         </FormItem>
                     </Col>
                 </Row>
             </FormItem>
             <FormItem>
                 <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
                 <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
             </FormItem>
         </Form>
       </Col>
   </Row>
  </div>
</template>
<script>
   import imgComponent from "../../pub/Uploadimg.vue"
   import advComponent from "../../pub/advcommon.vue"
    export default {
        components: {
          imgComponent,
          advComponent
        },
        data () {
            return {
                formValidate: {
                    title: '',
                    img: '',
                    url: '',
                    expireAt: '',
                    locationId:'',
                    useType:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题没有填写', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: 'banner链接没有填写', trigger: 'blur' }
                    ],
                    expireAt: [
                        { required: true, type: 'date', message: '结束时间没有填写', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            EmitAdv (e) {
              this.formValidate.locationId = e
            },
            uploadComponent (e) {
              this.formValidate.img = e[0]
            },
            getStartTime (e) {
                this.formValidate.expireAt = e
            },
            handleSubmit (name) {
                let _this = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.addpost()
                    } else {
                        this.$Message.error('提交失败');
                    }
                })
            },
            handleReset (name) {
               this.$router.push({path:"/banner/list/"})
            },
            addpost () {
                console.log(222222222222)
                let _this = this;
                var data = {
                  token:this.$webapi.get('token'),
                  title:this.formValidate.title,
                  url:this.formValidate.url,
                  img:this.formValidate.img,
                  expireAt:this.formValidate.expireAt,
                  useType:this.formValidate.useType,
                  locationId:this.formValidate.locationId
                }
                if(this.formValidate.img==""){
                   this.$Message.info("图片没有上传")
                   return
                }
                if(this.formValidate.locationId==""){
                   this.$Message.info("显示位置没有选择")
                   return
                }
                if(this.formValidate.useType==""){
                   this.$Message.info("显示终端没有选择")
                   return
                }
                this.$api.post("/advertising/add", data, reset => {
                  if (reset.codeId === 1) {
                      this.$router.push({path:"/banner/list"})
                  }else {
                    _this.$netcode.getApiCode(reset)
                 }
                })
            }
        }
    }
</script>
