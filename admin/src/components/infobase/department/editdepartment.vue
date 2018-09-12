<template>
    <div>
      <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{this.title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="编号:" prop="departmentNo">
                    <Input v-model="formValidate.departmentNo" placeholder="请输入部门编号"></Input>
                </FormItem>

                <FormItem label="部门:" prop="depname">
                    <Input v-model="formValidate.depname" placeholder="请输入部门"></Input>
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
    export default {
        props:['editdepartmentshow','editdepartmentdata'],
        created() {
          this.eshow=this.editdepartmentshow
          this.formValidate.depname = this.editdepartmentdata.name
          this.formValidate.id = this.editdepartmentdata.id;
          this.formValidate.departmentNo = this.editdepartmentdata.departmentNo;
          this.title="修改"+this.editdepartmentdata.name+"内容";
        },
        data () {
            return {
              title:"",
              formValidate:{
                  id:'',
                  departmentNo:'',
                  depname: ''
              },
              ruleValidate: {
                departmentNo: [
                    { required: true, message: '部门编号没有填写', trigger: 'blur' }
                ],
                depname: [
                    { required: true, message: '部门名称没有填写', trigger: 'blur' }
                ],
             },
             eshow:false
            }
        },
        methods: {
          cancel () {

             this.remove()
          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editdepartmentcomponentdata',{editdepartmentshow:false})
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
          },
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.post()
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
              this.remove();
            },
            post () {
              let _this = this;             
              var data = {
                token:this.$webapi.get('token'),
                id:this.formValidate.id,
                name:this.formValidate.depname,
                departmentNo:this.formValidate.departmentNo
              }
              this.$api.post("/admin_department/update", data, reset => {
                if (reset.codeId === 1) {
                    _this.$emit('editdepartmentcomponentdata',{  editdepartmentshow:false})
                }else {
                  _this.$netcode.getApiCode(reset)
               }
              })
            }
        }
    }
</script>
