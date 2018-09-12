<template>
  <div class="">
    <Modal v-model="show" width="360" @on-cancel="cancel" :mask-closable="false">
       <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加入库单</span>
       </p>
       <div style="text-align:center">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="导入车辆:" prop="name">
                <Upload
                :action="commonurl"
                :header="header"
                :show-upload-list ="false"
                :Accept="Accept"
                :format="format"
                name="excelCarFile"
                :on-success="onsuccess"
                :on-progress="onprogress"
                :before-upload="beforeupload"
                style="text-align:left">
                    <Button type="ghost" icon="ios-cloud-upload-outline">导入车辆文件</Button>
                </Upload>
                <p style="text-align:left;color:#999">导入文件成功后自动关闭对话框</p>
              </FormItem>
              <!-- <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
              </FormItem> -->
        </Form>
       </div>
       <div slot="footer">
       </div>
    </Modal>
  </div>
</template>
<script>
import citycommon from "../../pub/iviewarea.vue"
export default {
    props: ['addshow'],
    components: {
      citycommon
    },
    mounted() {
      //do something after mounting vue instance
      this.show = this.addshow
    },
    data() {
        return {
            show:false,
            commonurl:this.$webapicommon + "/warehouse_stockin/import/car?token="+this.$webapi.get("token"),
            header: {
                'Content-Type': 'multipart/form-data'
            },
            format: ['xlsx'],
            Accept: "application/json",
            formValidate:{
                name:"",
                address:"",
                province_code:"",
                city_code:"",
                area_code:""
            },
            ruleValidate: {
                name: [
                  { required: true, message: '名称没有填写', trigger: 'blur' }
                ],
                address: [
                  { required: true, message: '地址没有填写', trigger: 'blur' }
                ]
             },
          addcarshow:true
        }
    },
    methods: {
       onsuccess(response, file, fileList) {
           if(response.codeId == 1){
              this.$emit("emitcomponent",false)
           }else {
             this.$Message.info(response.codeDes)
           }
       },
       areaEmit (e) {
          this.formValidate.province_code = e[0].code
          this.formValidate.city_code= e[1].code
          //this.formValidate.area_code= e[2].code
       },
       cancel () {this.$emit("emitcomponent",false)},
       remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要关闭吗?</p>',
                onOk: () => {
                    this.$emit("emitcomponent",false)
                },
                onCancel: () => {
                   this.show = true
                }
            });
        },
       handleSubmit (name) {
           this.$refs[name].validate((valid) => {
               if (valid) {
                  this.post()
               }
           })},
       handleReset (name) {
           this.$refs[name].resetFields();
       },
       post() {
          let _this = this
          if(this.formValidate.province_code==""){
            this.$Message.info("城市没有选择")
            return
          }
          if(this.formValidate.city_code==""){
            this.$Message.info("城市没有选择")
            return
          }
          var data = {
              token:this.$webapi.get("token"),
              name:this.formValidate.name,
              province_code:this.formValidate.province_code,
              city_code:this.formValidate.city_code,
              address:this.formValidate.address
          }
          var url = "/warehouse/save?"+ this.$QS.stringify(data)
          this.$api.get("/warehouse_stockin/import/car", null, reset => {
            if (reset.codeId === 1) {
                _this.$Message.success('添加成功')
                _this.exportdata()
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
      },
       exportdata () {
          this.show = false
          this.$emit('emitcomponent',false)
      }
    }
  }
</script>
