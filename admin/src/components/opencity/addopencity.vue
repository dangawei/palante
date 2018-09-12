<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加开放城市</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :label-width="100">
            <FormItem label="选择开放城市:">
              <area-component :level="level" @areaEmit="areaEmit"></area-component>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">保存</Button>
              <Button type="error" @click="handleSubmit('adddatas')" size="large">取消</Button>
            </FormItem>
          </Form>
        </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
  import areaComponent from "../pub/iviewarea.vue"
    export default {
      props:['addshow'],
      components:{
        areaComponent:areaComponent,
      },
      data () {
        return {
          level:1,
          adddatas:{
            provinceCode:'',
            cityCode:'',
          },
          ashow:false,
          ruleValidate: {
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
        cancel () {
          this.remove();
        },
        handleSave(name) {
          if(this.adddatas.provinceCode){
            this.post();
          }else{
            this.$Message.error('失败!')
          }
        },
        handleSubmit(){
          this.remove();
        },
        remove (item) {
          this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('addshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
          });
        },
        post() {
          let _this = this;
          var url = "/open_city/add?token=" + this.$webapi.get('token') + "&provinceCode=" + this.adddatas.provinceCode + "&cityCode="+this.adddatas.cityCode
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
              _this.$emit('addshow',false)
              _this.$Message.success("添加成功!")
            }else {
              _this.$netcode.getApiCode(reset)
           }
          })
        },//post
        areaEmit(e) {
          // console.log(e);
          this.adddatas.provinceCode = e[0].code
          this.adddatas.cityCode = e[1].code
        },
      }
    }
</script>
