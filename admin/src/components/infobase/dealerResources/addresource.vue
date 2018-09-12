<template>
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
            <Select v-model="formValidate.isShow">
               <Option value="1" >显示</Option>
               <Option value="-1">不显示</Option>
            </Select>
        </FormItem>
        <FormItem>
           <Button type="ghost" @click="handleReset('formValidate')" size="large">取消</Button>
           <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" size="large">确定</Button>
       </FormItem>

    </Form>
</template>
<script>
    import {vm} from '../../../js/infobase/vm.js'

    export default {
        props:['addid'],
        data () {
            return {

                formValidate: {
                    bool:false,
                    name:'',
                    path:'',
                    url:'',
                    icon:'',
                    resourcesOrder:1,
                    isShow:'1',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],

                }
            }
        },
        created() {

        },
        methods: {
            handleSubmit (name) {

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        vm.$emit("addmodal",this.formValidate.bool);

                        this.post();
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                vm.$emit("addmodal",this.formValidate.bool)
            },
            post () {
              let _this = this;
              let data=[
                {
                    name:this.formValidate.name,
                    parentId:parseInt(this.addid.addid),
                    url:this.formValidate.url,
                    icon:this.formValidate.icon,
                    resourcesOrder:parseInt(this.formValidate.resourcesOrder),
                    isShow:parseInt(this.formValidate.isShow),
                    path:this.formValidate.path
                }
              ]
              var resourcesdata = {
                  token:this.$webapi.get('token'),
                  data:JSON.stringify(data)
              }
              this.$api.post("/dealer_resources/addResources", resourcesdata, reset => {
                if (reset.codeId === 1) {
                    this.$Message.success('添加成功');
                    if (this.addid.rank==0) {
                        vm.$emit("addmodal",this.formValidate.bool);
                    }else{
                        vm.$emit("showtwo",{
                            "addmodal":this.formValidate.bool,
                            "show":true,
                            "rank":this.addid.rank,
                            "id":this.addid.addid
                        });
                    }
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
