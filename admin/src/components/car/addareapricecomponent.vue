<template>
    <div>
        <Modal v-model="cshow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加区域价格</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="区域:" required>
                        <area-component @areaEmit="areaEmit" :level="level"></area-component>
                    </FormItem>
                    <FormItem label="价格:" required prop="price">
                       <Input v-model="formValidate.price">
                           <span slot="append">(元)</span>
                       </Input>
                    </FormItem>
        			<FormItem>
        			  	<Button type="primary" @click="handleAdd('formValidate')">添加</Button>
        			  	<Button type="ghost" @click="handleCancel('formValidate')" style="margin-left: 8px">取消</Button>
        			</FormItem>
                </Form>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
    // import citycommon from "../pub/citycommon.vue"
    import AreaComponent from "../pub/iviewarea.vue"
    export default{
        props:['addAreaPriceComponentShow','addAreaPriceComponentData'],
        components:{
            AreaComponent:AreaComponent,
        },

        data(){
            return{
                formValidate:{
                    price:'',

                },
                cshow:false,
                ruleValidate: {
                    price: [
                        { required: true, message: '价格没有填写', trigger: 'blur' }
                    ]
                },
                // 添加区域价格数据
                addAreaPriceData:[],
                // 存储地域数据
                addAreaData:[],
                level:1,
            }
        },
        created(){
            this.cshow=this.addAreaPriceComponentShow
        },
        mounted(){

            console.log(this.addAreaPriceComponentData);
        },
        methods:{
            areaEmit(e) {
                this.addAreaData=[]
                this.addAreaData.provinceCode = e[0]
                this.addAreaData.cityCode = e[1]
                this.addAreaData.areaCode = e[2]
            },
            cancel(){
                this.$emit('addAreaPriceComponent',false)
            },
            handleAdd(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.addAreaData.provinceCode.length==0||this.addAreaData.cityCode.length==0) {
                            _this.$Message.error('请选择完整地区!');
                        }else{
                            this.addAreaprice()
                        }

                    }
                })
            },
            handleCancel(){
               this.$emit('addAreaPriceComponent',false)
            },
            endcommoncity(e){
                this.addAreaData=e;
            },
            addAreaprice(){
                this.addAreaPriceData=[]
                let addData={
                    carSkuId:parseInt(this.addAreaPriceComponentData.id),
                    provinceCode:this.addAreaData.provinceCode.code,
                    provinceName:this.addAreaData.provinceCode.name,
                    cityCode:this.addAreaData.cityCode.code,
                    cityName:this.addAreaData.cityCode.name,
                    price:parseFloat(this.formValidate.price)
                };
                this.addAreaPriceData.push(addData);
                let _this = this;
                var data = {
                    token:this.$webapi.get('token'),
                    data:JSON.stringify(this.addAreaPriceData)
                }
                this.$api.post("/car_purchase_price/addList", data, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('添加成功!');
                        _this.$emit('addAreaPriceComponent',false)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
