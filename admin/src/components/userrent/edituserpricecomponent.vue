<template>
    <div>
        <Modal v-model="editUserPriceComponentShow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>修改用户租车价格</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="区域:" required>
                        <area-component :areaData="areaData" :level="level" @areaEmit="areaEmit"></area-component>
                    </FormItem>
                    <FormItem label="价格:" required prop="price">
                       <Input v-model="formValidate.price">
                           <span slot="append">(万元)</span>
                       </Input>
                    </FormItem>
                    <FormItem label="租车时间:" required prop="price">
                       <Input v-model="formValidate.duration">
                           <span slot="append">(月)</span>
                       </Input>
                    </FormItem>
        			<FormItem>
        			  	<Button type="primary" @click="handleAdd('formValidate')">修改</Button>
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
    import areaComponent from "../pub/iviewarea.vue"
    export default{
        props:['editUserPriceComponentShow','editUserPriceComponentData'],
        components:{
            areaComponent:areaComponent,
        },

        data(){
            return{
                formValidate:{
                    price:'',
                    duration:'',
                    provinceCode:'',
                    cityCode:'',
                    provinceName:'',
                    cityName:''
                },
                ruleValidate: {
                    // price: [
                    //     { required: true, message: '价格没有填写', trigger: 'blur' },

                    // ],
                    // duration:[
                    //     { required: true, message: '租车时间没有填写', trigger: 'blur' }
                    // ]
                },
                // 添加区域价格数据
                addAreaPriceData:[],
                // 存储地域数据
                areaData:[],
                level:1,
            }
        },
        created(){
            this.formValidate.price=this.editUserPriceComponentData.price;
            this.formValidate.duration=this.editUserPriceComponentData.duration;
            this.formValidate.provinceCode=this.editUserPriceComponentData.provinceCode;
            this.formValidate.cityCode=this.editUserPriceComponentData.cityCode;
            this.areaData.push(this.editUserPriceComponentData.provinceCode);
            this.areaData.push(this.editUserPriceComponentData.cityCode);
        },
        mounted(){

            // console.log(this.editUserPriceComponentData.price)
        },
        methods:{
            cancel(){
                this.$emit('editUserPriceComponent',false)
            },
            handleAdd(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // if (this.addAreaData.provinceCode.length==0||this.addAreaData.cityCode.length==0) {
                        //     _this.$Message.error('请选择完整地区!');
                        // }else{
                        //     this.addAreaprice()
                        // }
                        this.editUsrPrice()

                    }else{

                        this.$Message.error('内容填写不完整!')
                    }
                })
            },
            handleCancel(){
               this.$emit('editUserPriceComponent',false)
            },
            // 区域改变
            areaEmit(e){
                this.formValidate.provinceCode=e[0].code;
                this.formValidate.cityCode=e[1].code;
                this.areaData=e;
            },
            editUsrPrice(){
                let _this = this;                
                var data = {
                    token:this.$webapi.get('token'),
                    id:this.editUserPriceComponentData.id,
                    carSkuId:this.formValidate.provinceCode,
                    provinceCode:this.formValidate.provinceCode,
                    cityCode:this.formValidate.cityCode,
                    duration:this.formValidate.duration,
                    price:this.formValidate.price
                }
                this.$api.post("/user_rental_price/update", null, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('修改成功!');
                        _this.$emit('editUserPriceComponent',false)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
