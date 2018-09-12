<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改开放城市</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="100">
            <FormItem>
              <area-component :areaData="addAreaData" :level="level" @areaEmit="areaEmit"></area-component>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
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
      props:['editshow','editdata'],
      components:{
        areaComponent:areaComponent,
      },
      data () {
        return {
          level:1,
          adddatas:{
            provinceCode:'',
            cityCode:'',
            provinceName:'',
            cityName:''
          },
          ashow:false,
          ruleValidate: {
          },
          // 存储地域数据
          addAreaData:[],
        }
      },
      created(){
        this.ashow=this.editshow
        this.adddatas.provinceName=this.editdata.provinceName
        this.adddatas.cityName=this.editdata.cityName
        this.addAreaData.push(this.editdata.provinceCode)
        this.addAreaData.push(this.editdata.cityCode)
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
                this.$emit('editshow',false)
              },
              onCancel: () => {
                 this.ashow = true
              }
          });
        },
        post() {
          let _this = this;
          var url = "/open_city/update?token=" + this.$webapi.get('token')+ "&id="+this.editdata.id + "&provinceCode=" + this.adddatas.provinceCode + "&cityCode="+this.adddatas.cityCode
          this.$api.post(url, null, reset => {
            if (reset.codeId === 1) {
              _this.$emit('editshow',false)
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
