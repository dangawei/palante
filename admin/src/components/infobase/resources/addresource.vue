<template>

    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{addid.addtitle}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
               <FormItem label="名称:" prop="name">
                   <Input v-model="formValidate.name" placeholder="请输入名称" ref="focusBool"></Input>
               </FormItem>
               <FormItem label="页面路径:" prop="path">
                   <Input v-model="formValidate.path" placeholder="请输入部门名称"></Input>
               </FormItem>
               <FormItem label="接口地址:" prop="url">
                   <Input v-model="formValidate.url" placeholder="请输入接口地址"></Input>
               </FormItem>
               <FormItem label="图标地址:" prop="icon">
                   <Input v-model="formValidate.icon" placeholder="请输入部门名称"></Input>
               </FormItem>
               <FormItem label="排序字段:" prop="resourcesOrder">
                   <Input v-model="formValidate.resourcesOrder" placeholder="请输入部门名称"></Input>
               </FormItem>
               <FormItem label="是否显示" >
                   <Select v-model="formValidate.isShow" >
                      <Option value="1" >显示</Option>
                      <Option value="-1">不显示</Option>
                   </Select>
               </FormItem>
               <FormItem>
                  <Button type="error" @click="handleReset('formValidate')" size="large">取消</Button>
                  <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
              </FormItem>

           </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:{
          addid:{
            default:{}
          },
          addresourceshow:{
            default:false
          }
        },
        data () {
            return {
                focusBool:'',
                eshow:false,
                formValidate: {
                    bool:false,
                    name:'',
                    path:'',
                    url:'',
                    icon:'',
                    resourcesOrder:1,
                    isShow:"1",
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
          //do something after mounting vue instance
           this.eshow = this.addresourceshow
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // vm.$emit("addmodal",this.formValidate.bool);
                        this.post()

                    } else {
                        this.$Message.error('内容填写不完整!')
                        // this.focusBool=true;
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
              this.remove()
            },
            cancel () {
              this.remove()
            },
            remove()  {
             this.$emit("addEmitCloseRes")
            },
            post () {
              let _this = this;
               var data = [{
                  name:this.formValidate.name,
                  path:this.formValidate.path,
                  parentId:this.addid.addid,
                  icon:this.formValidate.icon,
                  url:this.formValidate.url,
                  isShow:this.formValidate.isShow,
                  resourcesOrder:parseInt(this.formValidate.resourcesOrder)
               }];
              var itemdata = {
                token:this.$webapi.get('token'),
                data:JSON.stringify(data)
              }
              this.$api.post('/admin_resources/addResources',itemdata, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('成功');
                    this.$emit("addEmitRes",{curshow:_this.addid.rank,id:_this.addid.addid,rank:_this.addid.rank-1})
                }else {
                    _this.$netcode.getApiCode(reset)
                }
              })
            }
        }
    }
</script>
