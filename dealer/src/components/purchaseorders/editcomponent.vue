<template>
    <div>
      <Modal v-model="eshow" width="420" @on-cancel="cancel" :mask-closable="false">
        <p slot="header">
           <Icon type="information-circled"></Icon>
           <span>修改采购单</span>
        </p>
        <div style="text-align:center">
          <Form ref="editdatas" :model="editdatas" :rules="ruleValidate" :label-width="80">
            <FormItem label="车辆型号" prop="carModelId">
              <Select v-model="carModelId" @on-change=changemodel(carModelId) filterable :placeholder="carModelName">
                <Option v-for="(cell,index) in carModelData" :value="index">{{ cell.modelName }}</Option>
              </Select>

            </FormItem>
            <FormItem label="SKU属性" prop="carSkuId">
              <Select v-model="carSkuId" @on-change=changesku(carSkuId) style="text-align:left" filterable :placeholder="carSkuName">
                  <Option v-for="(cell,index) in carSkuData" :value="index">{{ cell.skuCodeCombination }}</Option>
              </Select>
            </FormItem>
            <FormItem label="车辆数量" prop="purchaseQuantity">
              <Input v-model="editdatas.purchaseQuantity" placeholder="carQuantity"></Input>
            </FormItem>
            <FormItem label="区域价格" prop="unitPrice">

              <Input v-model="editdatas.unitPrice" disabled="disabled"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSave('editdatas')" size="large">修改</Button>

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
        props:['editlistshow','editlistdata','purchaseOrderId','dealerId'],
        data () {
            return {

              carModelName:'',
              carSkuName:'',
              carQuantity:Number,
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
              pricedata:[],
              skudata:[],
              ruleValidate: {
                purchase_quantity:[{
                  required: true,
                  message: '数量没有填写',
                  trigger: 'blur'
                }]

              },
              eshow:false
            }
        },
        created(){
          this.eshow=this.editlistshow
          this.editdatas=JSON.parse(JSON.stringify(this.editlistdata));
          this.carModelName=this.editlistdata.carModel;
          this.carSkuName=this.editlistdata.carSku;
          this.carQuantity=this.editlistdata.purchaseQuantity;
          this.carAdressPrice=this.editlistdata.unitPrice;
        },
        mounted(){
          this.getCarModel();
          this.getCarSku(this.editlistdata.carModelId);
          console.log(this.editdatas);
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
            this.editdatas.carModelId=this.carModelData[val].id;
            this.editdatas.carModel=this.carModelData[val].modelName;
            this.getCarSku(this.editdatas.carModelId)
          },
          // 根据车型选择sku
          getCarSku(e){
            // console.log(e);
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
            this.editdatas.carSkuId=this.carSkuData[val].id;
            this.editdatas.carSku=this.carSkuData[val].skuCodeCombination;
            this.getAddressPrice(this.editdatas.carSkuId);
          },
          // 获得区域价格
          getAddressPrice(e){
            let data={
              token:this.$webapi.get('token'),
              carSkuId:e,
              dealerId:this.dealerId
            };
            let _this=this;
            this.$api.get('/car_purchase_price/byCarSkuIdAndDealerId',data,reset=>{
              if (reset.codeId===1) {
                _this.editdatas.unitPrice=reset.resData.price;
              }else{
                _this.$netcode.getApiCode(reset)
                _this.editdatas.unitPrice=""                 
              }
            })
          },

          cancel () {
            this.editdatas=this.editlistdata;
            // this.$emit('editlistshows',{editshow:false})
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
          handleSave(name) {
            // console.log(this.editdatas);
              this.$refs[name].validate((valid) => {
              this.editdetail();

              })
          },
          // 修改采购单
          editdetail(){

            // let _this = this
            // _this.$emit('editlistshows',{editshow:false,editdata:this.editdatas})
            // console.log(_this.editdatas.unitPrice)
            this.remove();

          },
          remove (params) {
            let _this = this
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认修改吗?</p>',
                onOk: () => {
                  var detailArr=[]
                  var detailData={id:this.editdatas.id,car_model_id:this.editdatas.carModelId,car_sku_id:this.editdatas.carSkuId,purchase_quantity:this.$webapi.toDecimal2(this.editdatas.purchaseQuantity)}
                  detailArr.push(detailData)
                  // var obj2 = JSON.stringify(detailArr)
                  if (_this.editdatas.unitPrice!=''&&_this.editdatas.unitPrice!=null){
                    // var url = "/purchase_order/update?token=" + this.$webapi.get('token') + "&id="+this.purchaseOrderId+"&detail="+obj2;
                    var data={
                      token:this.$webapi.get('token'),
                      id:this.purchaseOrderId,
                      detail:JSON.stringify(detailArr)
                    }
                    this.$api.post("/purchase_order/update", data, reset => {
                      if (reset.codeId === 1) {
                        _this.$Message.success("修改成功!");
                        _this.$emit('editlistshows',{editshow:false})
                      }else {
                        _this.$netcode.getApiCode(reset)
                      }
                    })
                  }else{
                    _this.$Message.error("数据不完整!")
                  }
                },
                onCancel: () => {

                }
            });

          },
        }
    }
</script>
