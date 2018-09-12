<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加广告</span>
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
              <DatePicker type="date" placeholder="有效时间" @on-change="startTime"></DatePicker>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
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
        props:['addshow'],
        components: {
          Upload
        },
        data () {
            return {
              adddatas:{
                title:'',
                url:'',
                expireAt:'',
                img:'',
              },
              ashow:false,
              ruleValidate: {
                title:[{
                  required: true,
                  message: '标题没有填写',
                  trigger: 'focus'
                }],
                url:[{
                  required: true,
                  message: '链接地址没有填写',
                  trigger: 'blur'
                }],
                img:[{
                  required: true,
                  message: '图片没上传',
                  trigger: 'blur'
                }],
              }
            }
        },
        created(){
          this.ashow=this.addshow
        },
        mounted(){
          // this.getCarModel();
        },
        methods: {
          startTime (e){
            this.adddatas.expireAt = e
          },
          uploadComponent (e){
            console.log(e);
            this.adddatas.img = e[0];
          },
          cancel () {
            this.$emit('addshow',false)
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
          post() {
            let _this = this;
          //  var url = "?token=" +  + "&title=" + this.adddatas.title + "&url=http://"+this.adddatas.url + "&img="+this.adddatas.img+"&expireAt="+this.adddatas.expireAt
            var data = {
                token:this.$webapi.get('token'),
                title:this.adddatas.title,
                url:"http://"+this.adddatas.url,
                img:this.adddatas.img,
                expireAt:this.adddatas.expireAt
            }
            this.$api.post("/advertising/add", data, reset => {
              if (reset.codeId === 1) {
                _this.$emit('addshow',false)
                _this.$Message.success("添加成功!")
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
          }
        }
    }
</script>
