<template>
    <div>
      <Modal v-model="editcarshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>编辑车辆型号</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="车辆型号:" required>
                   <Input v-model="formValidate.modelName" ></Input>
                </FormItem>
                <FormItem label="型号图片:" required>
                    <img-component @uploadComponent="uploadComponent" :Uploadimg="formValidate.pic" v-if="carshow"></img-component>
                    <p class="textalignleft">图片上传尺寸:1200*800</p>
                </FormItem>
                <FormItem label="品牌:" prop="areacode" required>
                   <brand-component @brandComponentData="brandComponentData" :brandname="formValidate.brandName" v-if="carshow"></brand-component>
                </FormItem>
                <FormItem label="车辆分类:" required>
                   <car-model-common @carModelselect="carModelselect" :carModelName="formValidate.carModelCategoryName" v-if="carshow"></car-model-common>
                </FormItem>
                <FormItem label="座位数:" prop="seating">
                    <Input v-model="formValidate.seating" ></Input>
                </FormItem>
                <FormItem label="曾用名:" >
                    <Input v-model="formValidate.expropriationName" ></Input>
                </FormItem>
                <FormItem label="指导价:">
                    <Input v-model="formValidate.guidePrice">
                      <span slot="append">(元)</span>
                    </Input>
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
    import carModel from '../pub/carmodel.vue'
    import brandComponent from '../pub/brandComponent.vue'
    import imgComponent from "../pub/Uploadimg.vue"
    import carModelCommon from '../pub/carModelCommon.vue'
    export default {
    	props:['editcarshow','editcardata'],
        components: {
          	carModel,
          	brandComponent,
            imgComponent,
            carModelCommon
        },
        mounted() {
          //do something after mounting vue instance
          this.formValidate.id = this.editcardata.id
          this.formValidate.modelName = this.editcardata.modelName
          this.formValidate.guidePrice = this.editcardata.guidePrice
          this.formValidate.expropriationName = this.editcardata.expropriationName
          this.formValidate.brandId = this.editcardata.brandId
          this.formValidate.brandName = this.editcardata.brandName
          this.formValidate.pic = this.editcardata.pic
          this.formValidate.seating = this.editcardata.seating
          this.formValidate.carModelCategoryId = this.editcardata.carModelCategoryId
          this.formValidate.carModelCategoryName = this.editcardata.carModelCategoryName
          this.carshow = true
        },
        data () {
          return {
              carshow:false,
              formValidate:{
                  id:"",
                  modelName:'',
                  guidePrice:'',
                  expropriationName:"",
                  brandId:"",
                  pic:"",
                  carModelCategoryId:"",
                  seating:""
              },
              newitem:{

              },
              brandname:"",
              ruleValidate: {
              }
          }
        },
        methods: {
          uploadComponent (e){
            this.formValidate.pic = e[0]
          },
          brandComponentData (e){
            console.log(e);
              this.formValidate.brandId = e.id
          },
    			// carmodelselect (e) {
    			//   	this.formValidate.modelName = e.modelName
    			// },
    			areaselect (e) {
    				let _this=this;
    				e.forEach((item)=>{
    					if (item.code) {
    						this.formValidate.areacode = item.code;
    						this.getprice()
    						return;
    					}
    				})
    			},
          cancel () {
             this.remove()
          },
          remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                        this.$emit("editcarshowdata",false)
                  },
                  onCancel: () => {
                     this.editcarshow = true
                  }
              });
          },
        	handleSubmit (area) {
          	this.$refs[area].validate((valid) => {
              	if (valid) {
                    console.log(this.formValidate.brandId)
                    if(this.formValidate.brandId==""){
                      this.$Message.error('品牌没有选择')
                      return
                    }
                    if(this.formValidate.modelName==""){
                      this.$Message.error('车辆型号没有选择')
                      return
                    }
                		this.post()
              	}
          	})
         	},
          handleReset (area) {
              this.remove();
          },
          post () {
            let _this = this
            var data = {
                id:this.formValidate.id,
                token:this.$webapi.get("token"),
                modelName:this.newitem.modelName,
                guidePrice:this.formValidate.guidePrice,
                expropriationName:this.formValidate.expropriationName,
                brandId:this.formValidate.brandId,
                pic:this.formValidate.pic,
                seating:parseInt(this.formValidate.seating),
                carModelCategoryId:this.formValidate.carModelCategoryId
            }
            console.log(data);
            var url = "/car_model/update?"+ this.$QS.stringify(data)
            this.$api.post(url, null, reset => {
              if (reset.codeId === 1) {
                  _this.$Message.success('修改成功')
                  // _this.$router.push({path:"/car"})
                  // window.location.href = "/car"
                  this.$emit("editcarshowdata",false)
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
           },
           carModelselect(e){
            console.log(e);
            this.formValidate.carModelCategoryId=e.id
           }
        },
        watch:{
            "formValidate.modelName":{
              handler(curVal,oldVal){
                  if(curVal!=oldVal){
                    this.newitem.modelName = curVal
                  }　　　　　　　
　　　　　　　 },
　　　　　　   deep:true
            }
        }
    }
</script>
