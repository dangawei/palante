<template>
    <div>
      <Modal v-model="addcarshow" width="360" @on-cancel="cancel" :mask-closable="false">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>添加车辆型号</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="品牌:" prop="areacode" required>
                  <brand-component @brandComponentData="brandComponentData"></brand-component>
                </FormItem>
                <FormItem label="车辆型号:" required>
                   <Input v-model="formValidate.modelName" ></Input>
                </FormItem>
                <FormItem label="车辆图片:" required>
                    <img-component @uploadComponent="uploadComponent"></img-component>
                    <div class="mt10">
                       <Alert type="warning" show-icon>图片不能超过2M 上传图片尺寸1200*800 4:3比例</Alert>                       
                    </div>
                </FormItem>
                <FormItem label="车辆分类:" required>
                   <car-model-common @carModelselect="carModelselect"></car-model-common>
                </FormItem>
                <FormItem label="座位数:" prop="seating">
                    <Input v-model="formValidate.seating"></Input>
                </FormItem>
                <FormItem label="曾用名:" >
                    <Input v-model="formValidate.expropriationName" ></Input>
                </FormItem>
                <FormItem label="指导价:" prop="guidePrice">
                    <Input v-model="formValidate.guidePrice">
                      <span slot="append">(元)</span>
                    </Input>
                </FormItem>
        				<FormItem>
        				  	<Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
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
    import carModelCommon from '../pub/carModelCommon.vue'
    import imgComponent from "../pub/Uploadimg.vue"
    export default {
    	props:['addcarshow'],
        components: {
          	carModel,
          	brandComponent,
            imgComponent,
            carModelCommon
        },
        data () {
          return {
              formValidate:{
                  modelName:'',
                  guidePrice:'',
                  expropriationName:"",
                  brandId:"",
                  pic:"",
                  carModelCategoryId:"",
                  seating:""
              },
              ruleValidate: {
                guidePrice: [
                       { required: true, message: '指导价没有填写', trigger: 'blur' }
                  ],
                seating: [
                    { required: true, message: '座位数没有填写', trigger: 'blur' }
                  ]
              }
          }
        },
        methods: {
          carModelselect (e) {
            this.formValidate.carModelCategoryId = e.id
          },
          uploadComponent (e){
            this.formValidate.pic = e[0]
          },
          brandComponentData (e){
              this.formValidate.brandId = e.id
          },
    			carmodelselect (e) {
    			  	this.formValidate.modelName = e.modelName
    			},
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
                      this.$emit("addcarshowdata",false)
                  },
                  onCancel: () => {
                     this.addcarshow = true
                  }
              });
          },
        	getprice(){
        		let _this=this;
        		let pricedata=[
            		{
            			carmodelid:1,
            			areacode:210000,
            			price:"￥20万"
            		},
            		{
            			carmodelid:1,
            			areacode:210001,
            			price:"￥21万"
            		},
            		{
            			carmodelid:1,
            			areacode:310000,
            			price:"￥30万"
            		},
            		{
            			carmodelid:1,
            			areacode:310001,
            			price:"￥31万"
            		},
            		{
            			carmodelid:2,
            			areacode:210000,
            			price:"￥25万"
            		},
            		{
            			carmodelid:2,
            			areacode:210001,
            			price:"￥26万"
            		},
            		{
            			carmodelid:2,
            			areacode:310000,
            			price:"￥27万"
            		},
            		{
            			carmodelid:2,
            			areacode:310001,
            			price:"￥28万"
            		},
            		{
            			carmodelid:3,
            			areacode:210000,
            			price:"￥43万"
            		},
            		{
            			carmodelid:3,
            			areacode:210001,
            			price:"￥42万"
            		},
            		{
            			carmodelid:3,
            			areacode:310000,
            			price:"￥41万"
            		},
            		{
            			carmodelid:3,
            			areacode:310001,
            			price:"￥40万"
            		},
            	];
            	if (this.formValidate.id=="") {
            		this.$Message.success('请选择车辆和地域!');
            	}else{
            		pricedata.forEach((item)=>{
            			if (_this.formValidate.id==item.carmodelid&&_this.formValidate.areacode==item.areacode) {
            				_this.formValidate.price=item.price;
            			}
            		})
            	}
        	},
        	handleSubmit (area) {
          	this.$refs[area].validate((valid) => {
              	if (valid) {
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
              this.remove()
          },
          post () {
            let _this = this
            var data = {
                token:this.$webapi.get("token"),
                modelName:this.formValidate.modelName,
                guidePrice:this.formValidate.guidePrice,
                expropriationName:this.formValidate.expropriationName,
                brandId:this.formValidate.brandId,
                pic:this.formValidate.pic,
                carModelCategoryId:parseInt(this.formValidate.carModelCategoryId),
                seating:parseInt(this.formValidate.seating)
            }
            this.$api.post("/car_model/save", data, reset => {
              if (reset.codeId === 1) {
                  _this.$Message.success('添加成功')
                  _this.$emit("addcarshowdata",false)
              }else {
                _this.$netcode.getApiCode(reset)
             }
            })
           }
        }
    }
</script>
