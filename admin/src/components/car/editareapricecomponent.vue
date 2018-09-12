<template>
    <div>
        <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>修改区域价格</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="区域:" required>
                        <area-component :areaData="addAreaData" :level="level" @areaEmit="areaEmit"></area-component>
                    </FormItem>
                    <FormItem label="价格:" required prop="price">
                       <Input v-model="formValidate.price">
                           <span slot="append">(元)</span>
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
        props:['editAreaPriceComponentShow','editAreaPriceComponentData'],
        components:{
            areaComponent:areaComponent,
        },

        data(){
            return{
                formValidate:{
                    price:'',

                },
                eshow:false,
                ruleValidate: {
                    // price: [
                    //     { required: true, message: '价格没有填写', trigger: 'blur' }
                    // ]
                },
                // 添加区域价格数据
                addAreaPriceData:[],
                // 存储地域数据
                addAreaData:[],
                level:1,
            }
        },
        created(){
            this.eshow=this.editAreaPriceComponentShow
            this.formValidate.price=this.editAreaPriceComponentData.price;
            this.addAreaData.push(this.editAreaPriceComponentData.provinceCode);
            this.addAreaData.push(this.editAreaPriceComponentData.cityCode);
        },
        mounted(){

        },
        methods:{
            cancel(){
                this.$emit('editAreaPriceComponent',false)
            },
            handleAdd(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addAreaprice()
                    }
                })
            },
            handleCancel(){
               this.$emit('editAreaPriceComponent',false)
            },
            // 地域变化
            areaEmit(e){
                this.addAreaData=[];
                this.addAreaData=e;
            },
            addAreaprice(){
                let _this = this;
                console.log(this.addAreaData);
                var url = "/car_purchase_price/update?token=" + this.$webapi.get('token') + "&id=" + this.editAreaPriceComponentData.id+ "&carSkuId="+this.editAreaPriceComponentData.carSkuId+ "&provinceCode="+this.addAreaData[0].code+ "&provinceName="+this.addAreaData[0].name+ "&cityCode="+this.addAreaData[1].code+ "&cityName="+this.addAreaData[1].name+"&price="+this.formValidate.price;
                console.log(url);
                this.$api.post(url, null, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('修改成功!');
                        this.$emit('editAreaPriceComponent',false)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
