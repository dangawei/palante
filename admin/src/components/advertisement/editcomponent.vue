<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改广告</span>
        </p>
        <div>
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem label="标题" prop="title">
              <Input v-model="adddatas.title" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="链接地址" prop="url">
              <Input v-model="adddatas.url" placeholder="链接地址"></Input>
            </FormItem>
            <FormItem label="图片" prop="password">
              <Upload @uploadComponent="uploadComponent"></Upload>
            </FormItem>
            <FormItem label="有效日期" >
              <DatePicker type="date" :placeholder="adddatas.expireAt" @on-change="startTime"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">修改</Button>
              <Button type="primary" @click="handleSubmit('adddatas')" size="large">取消</Button>
            </FormItem>
          </Form>
        </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
  import {vm} from '../../js/infobase/vm.js'
  import Upload from "../pub/Uploadimg.vue"
    export default {
        props:['editshow','editdata'],
        components: {
          Upload
        },
        data () {
            return {
              adddatas:{
                id:'',
                title:'',
                url:'',
                expireAt:'',
                img:'',
              },
              ashow:false,
              ruleValidate: {

              }
            }
        },
        created(){
          this.editdata.expireAt=this.$webapi.gettime('date',(this.editdata.expireAt)/1000)
          this.ashow=this.editshow
          this.adddatas.id=this.editdata.id
          this.adddatas.title=this.editdata.title
          this.adddatas.url=this.editdata.url
          this.adddatas.expireAt=this.editdata.expireAt
          this.adddatas.img=this.editdata.img
        },
        mounted(){

          // this.getCarModel();
        },
        methods: {
          startTime (e){
            this.adddatas.expireAt = e
          },
          uploadComponent (e){
            this.adddatas.img = e[0];
          },
          cancel () {
            this.remove()
            // _this.$emit('editshow',false)
          },
          handleSave(name) {
            let _this = this
            this.$refs[name].validate((valid) => {
              if(valid){
                _this.post();
              }else{
                _this.$Message.error('失败!')
              }
            })
          },
          remove (item) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('editshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
            });
          },
          handleSubmit(name){
            this.remove();
          },
          post () {
            let _this = this;
            var data = {
                token:this.$webapi.get('token'),
                advertisingId:this.adddatas.id,
                title:this.adddatas.title,
                url:this.adddatas.url,
                expireAt:this.adddatas.expireAt,
                img:this.adddatas.img
            }
            this.$api.post("/advertising/update", data, reset => {
              if (reset.codeId === 1) {
                _this.$emit('editshow',false)
                _this.$Message.success("修改成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
