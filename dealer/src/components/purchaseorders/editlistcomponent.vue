<template>
    <div>
      <Modal v-model="eshow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span> 修改采购单</span>
        </p>
        <div style="text-align:center">
          <Form ref="editdatas" :model="editdatas" :rules="ruleValidate" :label-width="80">
            <FormItem label="车辆型号" prop="car_model_id">
              <Select v-model="carModelId" @on-change=changemodel(carModelId) filterable :placeholder="carModelName">
                <Option v-for="(cell,index) in carModelData" :value="index">{{ cell.modelName }}</Option>
              </Select>
              
            </FormItem>
            <FormItem label="SKU属性" prop="car_sku_id">
              <Select v-model="carSkuId" @on-change=changesku(carSkuId) style="text-align:left" filterable :placeholder="carSkuName">
                  <Option v-for="(cell,index) in carSkuData" :value="index">{{ cell.skuCodeCombination }}</Option>
              </Select>
            </FormItem>
            <FormItem label="车辆数量" prop="purchase_quantity">
              <Input v-model="editdatas.purchase_quantity" placeholder="采购车辆数量" :placeholder="carQuantity"></Input>
            </FormItem>
            <FormItem label="区域价格" prop="address_price">
              
              <Input v-model="editdatas.address_price.address_price" placeholder="区域价格" disabled="disabled" :placeholder="carAdressPrice"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('editdatas')" size="large">修改</Button>
              <Button type="primary" @click="handleSubmit('editdatas')" size="large">取消</Button>
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
        props:['editlistshow','editlistdata'],
        data () {
            return {
              
              carModelName:'',
              carSkuName:'',
              carQuantity:'',
              carAdressPrice:'',
            
              editdatas:{},
              // 存储获取的车辆型号数据
              carModelData:'',
              // 存储选择的车辆型号id
              carModelId:'',
              // sku属性数据
              carSkuData:'',
              // 存储选择的sku属性id
              carSkuId:'',

              priceval:'',
              skuval:'',
              carModelData:[],
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
          // console.log(this.editlistdata);
          this.eshow=this.editlistshow
          this.editdatas=this.editlistdata;
          this.carModelName=this.editlistdata.car_model.car_model_name;
          this.carSkuName=this.editlistdata.car_sku.car_sku_skuCodeCombination;
          this.carQuantity=this.editlistdata.purchase_quantity;
          this.carAdressPrice=this.editlistdata.address_price.address_price;
        },
        mounted(){
          this.getCarModel();
          this.getCarSku(this.editdatas.car_model.car_model_id);
        },
        methods: {
          // 获取车辆型号
          getCarModel(){
            let data={
              token:this.$webapi.get('token'),
            };
            let _this=this;
            this.$api.get('/car_model/list',data,reset=>{
              if (reset.codeId===1) {
                _this.carModelData=reset.resData;
              }
            })
          },
          // 选择车辆型号
          changemodel(val){
            this.showIndex=true;
            // console.log(val);
            this.editdatas.car_model.car_model_id=this.carModelData[val].id;
            this.editdatas.car_model.car_model_name=this.carModelData[val].modelName;
            this.getCarSku(this.editdatas.car_model.car_model_id)
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
              }
            })
          },
          // 选择sku属性
          changesku(val){
            this.editdatas.car_sku.car_sku_id=this.carSkuData[val].id;
            this.editdatas.car_sku.car_sku_skuCodeCombination=this.carSkuData[val].skuCodeCombination;
            this.getAddressPrice(this.editdatas.car_sku.car_sku_id);
          },
          // 获得区域价格
          getAddressPrice(e){
            let data={
              token:this.$webapi.get('token'),
              carSkuId:e
            };
            let _this=this;
            this.$api.get('/car_purchase_price/list',data,reset=>{
              if (reset.codeId===1||reset.codeId===-9) {
                _this.editdatas.address_price.address_price_id=reset.resData[0].id;
                _this.editdatas.address_price.address_price=reset.resData[0].price;
              }
            })
          },

          cancel () {
            this.remove();
            
          },
          remove(){
            this.$Modal.confirm({
              title: '提示',
              content: '<p>确认要关闭吗?</p>',
              onOk: () => {
                this.$emit('editlistshows',{editshow:false})
                
              },
              onCancel: () => {
                 this.eshow = true
              }
            });
          },
          handleSubmit(name){
            this.remove();
          },
          handleSave(name) {
              this.$refs[name].validate((valid) => {
                // if (valid) {
                    if (this.editdatas.car_sku.car_sku_id&&this.editdatas.car_model.car_model_id&&this.editdatas.purchase_quantity) {
                      console.log(this.editdatas);
                      this.$emit('editlistshows',{editshow:false,parchase:this.editdatas})
                      this.$Message.Success('修改成功!')
                    }else{
                      this.$Message.error('填写不完整!')
                    }
                    
                    // this.$emit()
                // } else {
                //     this.$Message.error('Fail!')
                // }
              })
          },
        }
    }
</script>
