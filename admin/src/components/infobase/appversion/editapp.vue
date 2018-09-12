<template>
   <div class="">
     <Modal v-model="show" width="500" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>编辑app版本</span>
       </p>
       <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="版本号" requery required>
                 <Input v-model="formValidate.version" placeholder="版本号" ></Input>
             </FormItem>
             <FormItem label="版本号" requery required>
                   <file-component @uploadComponent="uploadComponent" :fileloading="formValidate.url" v-if="show"></file-component>
             </FormItem>
             <FormItem label="APP类型" prop="loginName">
               <Select v-model="formValidate.type">
                   <Option value="" key="">请选择</Option>
                   <Option value="1" key="1">商城APP</Option>
                   <Option value="2" key="2">维护APP</Option>
               </Select>
             </FormItem>
             <FormItem label="升级类型" prop="loginName">
               <Select v-model="formValidate.bugType">
                   <Option value="" key="">请选择</Option>
                   <Option value="1" key="1">选择升级</Option>
                   <Option value="2" key="1">强制升级</Option>
               </Select>
             </FormItem>
             <FormItem label="升级描述" >
               <div class="">
                 <Input v-model="formValidate.versionDescribe" type="textarea" :rows="4" placeholder="升级描述"></Input>
               </div>
             </FormItem>
             <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >保存</Button>
                <Button type="error" @click="handleReset('formValidate')" >取消</Button>
            </FormItem>
         </Form>
       </div>
       <div slot="footer"></div>
     </Modal>
   </div>
</template>
<script>
    import fileComponent from "../../pub/Fileloading.vue"
    export default {
        props:{
          editaccountshow:{
            default:false
          },
          editAPPdata:{
            default:{}
          }
        },
        components: {
          fileComponent
        },
        data () {
            return {
                departmentvalue:"",
                show:false,
                value:"1",
                passwordshow:true,
                formValidate: {
                    id:"",
                    version:'',
                    url:'',
                    md5:'',
                    type:'',
                    versionDescribe:"",
                    bugType:""
                },
                ruleValidate: {
                    version: [
                        { required: true, message: '请输入版本号', trigger: 'blur' },
                        { type: 'string', min: 5, max:20, message: '请输入版本号', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
           this.formValidate = this.editAPPdata
           this.formValidate.bugType = "" + this.editAPPdata.bugType
           this.formValidate.type = "" + this.editAPPdata.appType
           this.show = this.editaccountshow
        },
        methods: {
            uploadComponent (e) {
                this.formValidate.url = e[0].path || ""
                this.formValidate.md5 = e[0].md5 || ""
            },
            cancel () {
               this.remove()
            },
            remove (item) {
              var _this = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要关闭吗?</p>',
                    onOk: () => {
                      _this.show = false
                      _this.$emit('Emitdata',{addshow:false})
                    },
                    onCancel: () => {
                       _this.show = true
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.formValidate.dep==""){
                            this.$Message.error('部门没有选择')
                            return
                        }
                        if(this.formValidate.role==""){
                            this.$Message.error('角色没有选择')
                            return
                        }
                        this.post(name)
                    }
                })
            },
            handleReset (name) {
                this.remove()
            },
            post (name) {
                let _this = this;
                var data = {
                  token:this.$webapi.get('token'),
                  id:this.formValidate.id,
                  version:this.formValidate.version,
                  url:this.formValidate.url,
                  md5:this.formValidate.md5,
                  type:parseInt(this.formValidate.type),
                  versionDescribe:this.formValidate.versionDescribe,
                  bugType:this.formValidate.bugType
                }
              this.$api.post("/mobile_app_version/update", data, reset => {
                if (reset.codeId === 1) {
                    _this.$Message.success('保存成功');
                    _this.$emit('Emitdata',{addshow:false})
                    _this.$router.push({path:"/member/app"})
                }else {
                   _this.$netcode.getApiCode(reset)
                   _this.show = true
                }
              })
            }
        }
    }
</script>
