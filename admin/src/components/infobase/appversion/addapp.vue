<template>
   <div class="">
     <Modal v-model="show" width="500" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加app版本</span>
       </p>
       <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="版本号" prop="version" required>
                 <Input v-model="formValidate.version" placeholder="版本号" ></Input>
             </FormItem>
             <FormItem label="上传" requery required>
                   <file-component @fileComponent="uploadComponent"></file-component>
             </FormItem>
             <FormItem label="APP类型" prop="type">
               <Select v-model="formValidate.type">
                   <Option value="" key="">请选择</Option>
                   <Option value="1" key="1">商城APP</Option>
                   <Option value="2" key="2">维护APP</Option>
               </Select>
             </FormItem>
             <FormItem label="升级类型" version  prop="bugType">
               <Select v-model="formValidate.bugType">
                   <Option value="" key="">请选择</Option>
                   <Option value="1" key="1">选择升级</Option>
                   <Option value="2" key="2">强制升级</Option>
               </Select>
             </FormItem>
             <FormItem label="升级描述" >
               <div class="">
                 <Input v-model="formValidate.versionDescribe" type="textarea" :rows="4" placeholder="升级描述"></Input>
               </div>
             </FormItem>
             <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" >添加</Button>
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
    const version = (rule, value, callback) => {
            var myreg=/^[0-9]\.[0-9]\.[0-9]{1,3}$/;
            if (!myreg.test(value)) {
                callback(new Error('版本号格式不对'));
            } else {
                callback();
            }
       }
    export default {
        props:{
          dearleaddcountshow:{
            default:false
          }
        },
        components: {
          fileComponent
        },
        data () {
            return {
                departmentvalue:"",
                show:false,
                passwordshow:true,
                formValidate: {
                    version:'',
                    url:'',
                    md5:'',
                    type:'',
                    versionDescribe:"",
                    bugType:""
                },
                ruleValidate: {
                    version: [
                         { validator: version, trigger: 'blur' }
                    ],
                    type:[
                      { required: true, message: '请选择APP类型', trigger: 'change' }
                    ],
                    bugType:[
                        { required: true, message: '请选择升级类型', trigger: 'change' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
           this.show = this.dearleaddcountshow
        },
        methods: {
            uploadComponent (e) {
                this.formValidate.url = e.path || ""
                this.formValidate.md5 = e.md5 || ""
            },
            password01 () {
               this.passwordshow = !this.passwordshow
            },
            roleselect (e) {
                this.formValidate.dealerRoleId = e.id
            },
            dearleEmitComponent (e) {
                this.formValidate.dealerId = e
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
                  version:this.formValidate.version,
                  url:this.formValidate.url,
                  md5:this.formValidate.md5,
                  type:parseInt(this.formValidate.type),
                  versionDescribe:this.formValidate.versionDescribe,
                  bugType:this.formValidate.bugType
                }
              this.$api.post("/mobile_app_version/save", data, reset => {
                if (reset.codeId === 1) {
                    _this.$Message.success('添加成功');
                    _this.$emit('Emitdata',{addshow:false})
                }else {
                   _this.$netcode.getApiCode(reset)
                   _this.show = true
                }
              })
            }
        }
    }
</script>
