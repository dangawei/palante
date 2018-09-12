<template>
    <div>
      <Modal v-model="ashow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>添加采购单</span>
        </p>
        <div style="text-align:center">
          <Form ref="adddatas" :model="adddatas" :rules="ruleValidate" :label-width="80">
            <FormItem label="车辆型号" prop="car_model_id">
              <Select v-model="carModelId" @on-change=changemodel(carModelId) filterable>
                <Option v-for="(cell,index) in carModelData" :value="index">{{ cell.modelName }}</Option>
              </Select>

            </FormItem>
            <FormItem label="SKU属性" prop="car_sku_id">
              <Select v-model="carSkuId" @on-change=changesku(carSkuId) style="text-align:left" filterable>
                  <Option v-for="(cell,index) in carSkuData" :value="index">{{ cell.skuCodeCombination }}</Option>
              </Select>
            </FormItem>
            <FormItem label="车辆数量" prop="purchase_quantity">
              <Input v-model="adddatas.purchase_quantity" placeholder="采购车辆数量"></Input>
            </FormItem>
            <FormItem label="区域价格" prop="address_price">              
              <Input v-model="adddatas.address_price" placeholder="区域价格" disabled="disabled"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('adddatas')" size="large">添加</Button>
              <!-- <Button type="primary" @click="handleSubmit('adddatas')" size="large">提交</Button> -->
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
    export default {
        props:['addshow','addressdata'],
        data () {
            return {
              adddatas:{
                car_model_id:'',
                car_model_name:'',
                car_sku_id:'',
                car_sku_skuCodeCombination:'',
                purchase_quantity:'',
                address_price_id:'',
                address_price:''
              },
              ashow:false,
              // 存储获取的车辆型号数据
              carModelData:[],
              // 存储选择的车辆型号id
              carModelId:'',
              // sku属性数据
              carSkuData:[],
              // 存储选择的sku属性id
              carSkuId:'',

              priceval:'',
              skuval:'',
              pricedata:[],
              skudata:[],
              ruleValidate: {
                purchase_quantity:[{
                  required: true,
                  message: '数量没有填写',
                  trigger: 'blur'
                }]

              }
            }
        },
        created(){
          this.ashow=this.addshow
        },
        mounted(){
          this.getCarModel();
        },
        methods: {
          // 获取车辆型号
          getCarModel(){
            let data={
              token:this.$webapi.get('token'),
              brandId:'',
              modelName:''
            };
            let _this=this;
            this.$api.get('/car_model/list',data,reset=>{
              if (reset.codeId===1) {
                _this.carModelData=reset.resData;
              } else {
                _this.$netcode.getApiCode(reset)
              }
            })
          },
          // 选择车辆型号
          changemodel(val){
            // console.log(val)
            this.adddatas.car_model_id=this.carModelData[val].id;
            this.adddatas.car_model_name=this.carModelData[val].modelName;
            this.getCarSku(this.adddatas.car_model_id)
          },
          // 根据车型选择sku
          getCarSku(e){
            let data={
              token:this.$webapi.get('token'),
              carModelId:e
            };
            let _this=this;
            this.$api.get('/car_sku/list',data,reset=>{
              if (reset.codeId===1||reset.codeId===-9) {
                _this.carSkuData=reset.resData;
              } else {
                _this.$netcode.getApiCode(reset)

              }
            })
          },
          // 选择sku属性
          changesku(val){
            this.adddatas.car_sku_id=this.carSkuData[val].id;
            this.adddatas.car_sku_skuCodeCombination=this.carSkuData[val].skuCodeCombination;
            this.getAddressPrice(this.adddatas.car_sku_id);
          },
          // 获得区域价格
          getAddressPrice(e){
            let data={
              token:this.$webapi.get('token'),
              carSkuId:e,
              provinceCode:this.addressdata.provinceCode,
              cityCode:this.addressdata.cityCode
            };
            let _this=this;
            this.$api.get('/car_purchase_price/list',data,reset=>{
              if (reset.codeId===1) {
                _this.adddatas.address_price_id=reset.resData[0].id;
                _this.adddatas.address_price=reset.resData[0].price;
              } else {
                _this.$netcode.getApiCode(reset)
                _this.adddatas.address_price=""
              }
            })
          },
          cancel () {
            this.$emit('addlistshow',{addshow:false})
            this.adddatas={}
          },
          handleSave(name) {
            let _this = this
            this.$refs[name].validate((valid) => {
              if(valid){
                if ((_this.adddatas.car_sku_id!=null&&_this.adddatas.car_sku_id!='')&&(_this.adddatas.car_model_id!=null&&_this.adddatas.car_model_id!='')&&(_this.adddatas.purchase_quantity!=null&&_this.adddatas.purchase_quantity!='')&&(_this.adddatas.address_price!=null&&_this.adddatas.address_price!='')){
                  _this.$emit('addlistshow',{addshow:false,parchase:_this.adddatas})
                  _this.$Message.Success('成功')
                }else{
                  _this.$Message.error('填写不完整!')
                }
              }else{
                _this.$Message.error('失败!')
              }
            })
          },
        }
    }
</script>
