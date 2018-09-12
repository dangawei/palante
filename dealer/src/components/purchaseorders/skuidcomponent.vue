<template>
	<div>
		<Select v-model="carSkuId" @on-change=changesku(carSkuId) filterable>
			<Option v-for="(cell,index) in carSkuData" :value="index">{{ cell.skuCodeCombination }}</Option>
		</Select>
	</div>
	
</template>
<script>
	export default{
		props:["carmodelid"],
		data(){
			return{
				// sku属性数据
				carSkuData:[],
				// 存储选择的sku属性id
				carSkuId:'',
				addskuids:{},
			}
		},
		mounted(){
			if (this.carmodelid!=0) {
				this.getCarSku(this.carmodelid);
			}
		},
		methods:{
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
				this.addskuids.car_sku_id=this.carSkuData[val].id;
				this.addskuids.car_sku_skuCodeCombination=this.carSkuData[val].skuCodeCombination;
				this.$emit("addskuids",this.addskuids);
			},
		}
	}
</script>