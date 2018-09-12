<template>
    <div>
      <Modal v-model="editresourceshow" width="360" @on-cancel="cancel">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span> 
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称:" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
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
                  <Select v-model="formValidate.isShow" @on-change="changesel(formValidate.isShow)">
                     <Option value="显示" key="1">显示</Option>
                     <Option value="不显示" key="-1">不显示</Option>
                  </Select>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                  <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
        props:['editresourceshow','editresourcedata'],
        created() {
          this.formValidate.id = this.editresourcedata.id;
          this.formValidate.name = this.editresourcedata.name;
          this.formValidate.path = this.editresourcedata.path;
          this.formValidate.parentId = this.editresourcedata.parentId;
          this.formValidate.url = this.editresourcedata.url;
          this.formValidate.icon = this.editresourcedata.icon;
          this.formValidate.resourcesOrder = this.editresourcedata.resourcesOrder;
          if (this.editresourcedata.isShow) {
            this.formValidate.isShow="显示";
          }else{
            this.formValidate.isShow="不显示";
          };
          this.title="修改"+this.editresourcedata.name+"内容";
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
                
                
             }
            }
        },
        methods: {
          cancel () {
            this.$emit('editresourcecomponentdata',{editresourceshow:false})
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      if (this.formValidate.isShow=="显示") {
                        this.formValidate.isShow=1;
                      }else{
                        this.formValidate.isShow=-1;
                      }
                      this.post()
                    }
                })
            },
            handleReset (name) {
              console.log(this.editresourcecomponentdata);
                this.$refs[name].resetFields();
                this.$emit('editresourcecomponentdata',{editresourceshow:false})
            },
            post () {
              let _this = this;
              
              let datas={
                    token:this.$webapi.get('token'),
                    id:this.formValidate.id,
                    name:this.formValidate.name,
                    path:this.formValidate.path,
                    parentId:this.formValidate.parentId,
                    url:this.formValidate.url,
                    icon:this.formValidate.icon,
                    resourcesOrder:this.formValidate.resourcesOrder,
                    isShow:this.formValidate.isShow
                }
              this.$api.post("/admin_resources/update",datas, reset => {
                if (reset.codeId === 1) {
                  this.$Message.success('Success!');
                   _this.$emit('editresourcecomponentdata',{editresourceshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            },
            changesel(val){
                if (val=="显示") {
                    this.formValidate.isShow=1
                }else{
                    this.formValidate.isShow=-1
                }
            }
        }
    }
</script>