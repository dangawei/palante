g<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="分类:" prop="icon">
                  <admin-component-edit @dealerComponentR="dealerComponentR"></admin-component-edit>
             </FormItem>
              <FormItem label="名称:" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
              </FormItem>
              <FormItem label="页面路径:" prop="path">
                  <Input v-model="formValidate.path" placeholder="请输入页面路径"></Input>
              </FormItem>
              <FormItem label="接口地址:" prop="url">
                  <Input v-model="formValidate.url" placeholder="请输入接口地址"></Input>
              </FormItem>
              <FormItem label="图标地址:" prop="icon">
                  <Input v-model="formValidate.icon" placeholder="请输入图标地址"></Input>
              </FormItem>
              <FormItem label="排序字段:" prop="resourcesOrder">
                  <Input v-model="formValidate.resourcesOrder" placeholder="请输入排序字段"></Input>
              </FormItem>
              <FormItem label="是否显示" >
                  <Select v-model="formValidate.isShow">
                     <Option value="1">显示</Option>
                     <Option value="-1">不显示</Option>
                  </Select>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                  <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
              </FormItem>
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    import adminComponentEdit from "../../pub/adminComponentResources.vue"
    export default {
        props:['editresourceshow','editresourcedata'],
        components: {
          adminComponentEdit
        },
        mounted() {
          //do something after mounting vue instance
          this.eshow=this.editresourceshow
          this.formValidate.id = this.editresourcedata.id;
          this.formValidate.name = this.editresourcedata.name;
          this.formValidate.path = this.editresourcedata.path;
          this.formValidate.parentId = this.editresourcedata.parentId;
          this.formValidate.url = this.editresourcedata.url;
          this.formValidate.icon = this.editresourcedata.icon;
          this.formValidate.resourcesOrder = this.editresourcedata.resourcesOrder;
          this.formValidate.isShow = ''+this.editresourcedata.isShow
          this.formValidate.rank = ''+this.editresourcedata.rank
          this.formValidate.curshow = this.editresourcedata.curshow
          this.title="修改总管理资源内容";
        },
        data () {
            return {
              title:"",
              formValidate:{
                id:'',
                name:'',
                path:'',
                parentId:'',
                url:'',
                icon:'',
                resourcesOrder:'',
                isShow:"",
              },
              ruleValidate: {


             },
             eshow:false
            }
        },
        methods: {
          cancel () {
            this.remove();
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            dealerComponentR (e) {
              this.formValidate.parentId = e
            },
            handleReset (name) {
              this.remove();
            },
            remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editresourcecomponentdata',{editresourceshow:false,id:this.formValidate.parentId,rank:this.formValidate.rank,curshow:this.formValidate.curshow})
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
            },
            post () {
              let _this = this;
              var data = {
                  token:this.$webapi.get('token'),
                  id:this.formValidate.id,
                  name:this.formValidate.name,
                  path:this.formValidate.path,
                  parentId:this.formValidate.parentId,
                  url:this.formValidate.url,
                  icon:this.formValidate.icon || "",
                  resourcesOrder:this.formValidate.resourcesOrder,
                  isShow:this.formValidate.isShow
              }
              this.$api.post("/admin_resources/update", data, reset => {
                if (reset.codeId === 1) {
                   this.$Message.success('修改成功');
                   _this.$emit('editresourcecomponentdata',{editresourceshow:false,id:_this.formValidate.parentId,rank:_this.formValidate.rank,curshow:_this.formValidate.curshow})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            changesel(){

               //this.formValidate.isShow = val
            }
        }
    }
</script>
