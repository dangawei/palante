<template>
    <div>
        <Modal v-model="eshow" width="360" @on-cancel="cancel" :mask-closable="false">
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
        props:['editUserBuyComponentShow','editUserBuyComponentData'],
        components:{
            areaComponent:areaComponent,
        },

        data(){
            return{
                formValidate:{
                    price:'',
                    provinceCode:'',
                    cityCode:'',
                    provinceName:'',
                    cityName:''
                },
                ruleValidate: {
                    // price: [
                    //     { required: true, message: '价格没有填写', trigger: 'blur' },

                    // ],

                },
                // 添加区域价格数据
                addAreaPriceData:[],
                // 存储地域数据
                areaData:[],
                level:1,
                eshow:false
            }
        },
        created(){
            this.eshow=this.editUserBuyComponentShow
            this.formValidate.price=this.editUserBuyComponentData.price;
            this.formValidate.provinceCode=this.editUserBuyComponentData.provinceCode;
            this.formValidate.cityCode=this.editUserBuyComponentData.cityCode;
            this.areaData.push(this.editUserBuyComponentData.provinceCode);
            this.areaData.push(this.editUserBuyComponentData.cityCode);
        },
        mounted(){

            // console.log(this.areaData)
        },
        methods:{
            cancel(){
                this.remove();
            },
            remove (item) {
              this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确认要关闭吗?</p>',
                  onOk: () => {
                    this.$emit('editUserBuyComponent',false)
                  },
                  onCancel: () => {
                     this.eshow = true
                  }
              });
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
                this.remove();
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
                    id:this.editUserBuyComponentData.id,
                    carSkuId:this.editUserBuyComponentData.carSkuId,
                    provinceCode:this.formValidate.provinceCode,
                    cityCode:this.formValidate.cityCode,
                    price:this.formValidate.price
                }
                this.$api.post("/user_purchase_price/update", data, reset => {
                    if (reset.codeId === 1) {
                        _this.$Message.success('修改成功!');
                        _this.$emit('editUserBuyComponent',false)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }
        }
    }
</script>
