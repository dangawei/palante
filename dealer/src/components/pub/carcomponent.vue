<template>
    <div>
      <Modal v-model="carshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>修改车辆信息</span>
         </p>
         <div style="text-align:center">
           <Form  :model="formValidate"  :label-width="80">
               <FormItem label="vin码:">
                   <p style="text-align:left">{{formValidate.vin}}</p>
               </FormItem>
                <FormItem label="电池编号:">
                   <Input v-model="formValidate.batterNumber" ></Input>
                </FormItem>
                <FormItem label="电机编号:">
                    <Input v-model="formValidate.motorNumber" ></Input>
                </FormItem>
                <FormItem label="车牌号:" >
                    <Input v-model="formValidate.licencePlateNumber" ></Input>
                </FormItem>
                <FormItem label="终端号:" >
                    <Input v-model="formValidate.terminalNumber" ></Input>
                </FormItem>
        				<FormItem>
        				  	<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
        				  	<Button type="error" @click="handleReset()" style="margin-left: 8px">取消</Button>
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
    	props:['editshow','cardata'],
       mounted() {
          //do something after mounting vue instance
           this.formValidate.carId = this.cardata.id
           this.formValidate.licencePlateNumber = this.cardata.licencePlateNumber
           this.formValidate.vin = this.cardata.vin
           this.formValidate.batterNumber = this.cardata.batterNumber || ""
           this.formValidate.motorNumber = this.cardata.motorNumber || ""
           this.formValidate.terminalNumber = this.cardata.terminalNumber || ""
           this.olddata = this.cardata
           this.carshow = this.editshow
        },
        data () {
          return {
              carshow:false,
              olddata:{},
              formValidate:{
                  carId:"",
                  batterNumber:'',
                  motorNumber:'',
                  licencePlateNumber:"",
                  terminalNumber:""
              }
          }
        },
        methods: {
          cancel () {
              this.remove()
          },
        	handleSubmit () {
          	 this.post()
         	},
          handleReset () {
              this.remove();
          },
          remove () {
             this.carshow = false
             this.$emit("editCarcomponent",false)
          },
          post () {
            let _this = this
            var data = {
                carId:this.formValidate.carId,
                token:this.$webapi.get("token"),
            }
            if(this.formValidate.batterNumber != this.olddata.batterNumber ){
                data.batterNumber = this.formValidate.batterNumber
            }
            if(this.formValidate.motorNumber != this.olddata.motorNumber ){
                data.motorNumber = this.formValidate.motorNumber
            }
            if(this.formValidate.licencePlateNumber != this.olddata.licencePlateNumber ){
                data.licencePlateNumber = this.formValidate.licencePlateNumber
            }
            if(this.formValidate.terminalNumber != this.olddata.terminalNumber ){
                data.terminalNumber = this.formValidate.terminalNumber
            }
            this.$api.post("/car/update", data, reset => {
              if (reset.codeId === 1) {
                  _this.$Message.success('修改成功')
                  // _this.$router.push({path:"/car"})
                  // window.location.href = "/car"
                  _this.remove()
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
           },
        }
    }
</script>
