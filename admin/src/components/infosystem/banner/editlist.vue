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
                <h2>编辑Banner</h2>
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
             <FormItem label="显示终端">
               <Select v-model="formValidate.useType" required>
                   <Option value="">全部</Option>
                   <Option value="1">WEB</Option>
                   <Option value="2">APP</Option>
               </Select>
             </FormItem>
             <FormItem label="显示位置" prop="locationId" required>
                <adv-component @EmitAdv="EmitAdv" :advID="formValidate.advId" v-if="show"></adv-component>
             </FormItem>
             <FormItem label="图片" prop="图片" required>
               <Row>
                   <Col span="11" style="text-align: left">
                       <FormItem >
                          <img-component @uploadComponent="uploadComponent" :Uploadimg="formValidate.img" v-if="uploadshow"></img-component>
                       </FormItem>
                   </Col>
               </Row>
             </FormItem>
             <FormItem label="链接" prop="url">
                 <Input v-model="formValidate.url" placeholder="案例:http://www.baidu.com"></Input>
             </FormItem>
             <FormItem label="有效期">
                 <Row>
                     <Col span="11" style="text-align: left">
                         <FormItem prop="date">
                             <DatePicker type="date" placeholder="有效期展示" v-model="formValidate.date"  @on-change="getStartTime"></DatePicker>
                         </FormItem>
                     </Col>
                 </Row>
             </FormItem>
             <FormItem>
                 <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                 <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
                uploadshow:false,
                orderstart:[],
                show:false,
                formValidate: {
                    name: '',
                    url: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    expireAt:'',
                    enddata:'',
                    desc: '',
                    useType:'',
                    advId:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '标题没有填写', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: 'banner链接没有填写', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '开始时间没有填写', trigger: 'change' }
                    ],
                    enddate: [
                        { required: true, type: 'date', message: '结束时间没有填写', trigger: 'change' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
          this.list()
        },
        methods: {
            EmitAdv (e) {
              this.formValidate.advId = e
            },
            list () {
              let _this = this
              var data = {
                token:this.$webapi.get('token'),
                pageNo:1,
                pageSize:1000,
                title:this.$route.params.title,
              }
              this.$api.get("/advertising/page", data, reset => {
                if (reset.codeId === 1) {
                    var data = []
                    reset.resData.list.forEach(function (item) {
                      if(item.id == _this.$route.params.id){
                          data = item
                        _this.orderstart = data
                        _this.formValidate.title = data.title
                        _this.formValidate.advertisingId = data.id
                        _this.formValidate.date =  data.expireAt
                        _this.formValidate.expireAt =  data.expireAt
                        _this.formValidate.img = data.img
                        _this.formValidate.url = data.url
                        _this.formValidate.useType = ''+data.useType
                        _this.uploadshow = true
                        _this.show = true
                        _this.formValidate.advId = data.locationId
                      }
                    })
                   }else {
                   _this.$netcode.getApiCode(reset)
               }
              })
            },
            handleSubmit (name) {
              var _this = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.post()
                    } else {
                        this.$Message.error('提交失败');
                    }
                })
            },
            uploadComponent (e) {
                this.formValidate.img = e[0]
            },
            getStartTime (e) {
                this.formValidate.expireAt = e
            },
            handleReset (name) {
               this.$router.push({path:"/banner/list/"})
            },
            post () {
              var _this =  this
              var data = {
                 token:this.$webapi.get('token'),
                 advertisingId:parseInt(this.orderstart.id),
                 url:this.formValidate.url,
                 img:this.formValidate.img,
                 expireAt:this.formValidate.expireAt,
                 useType:this.formValidate.useType,
                 locationId:this.formValidate.advId
              }
              if(this.formValidate.title !== this.orderstart.title){
               data.title = this.formValidate.title
              }
              this.$api.post("/advertising/update",data,reset => {
                if (reset.codeId === 1) {
                   _this.$router.push({path:"/banner/list/"})
                } else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
