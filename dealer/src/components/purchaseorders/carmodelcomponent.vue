<template>
	<div>
		<Select v-model="carModelId" @on-change=changemodel(carModelId) filterable>
			<Option v-for="(cell,index) in carModelData" :value="cell.id">{{cell.modelName}}</Option>
		</Select>
	</div>

</template>
<script>
	export default{
		props:['oncarmodelID'],
		data(){
			return{
				// 存储获取的车辆型号数据
				carModelData:[],
				// 存储选择的车辆型号id
		      	carModelId:'',
		      	adddatas:{},
			}
		},
		created() {
		  //do something after creating vue instance
		  this.carModelId = this.oncarmodelID
		},
		watch:{
			carModelId:function (e) {
				 this.getCarModel()
			}
		},
		// mounted(){
		// 	this.getCarModel();
		// },
		methods:{
			// 获取车辆型号
			getCarModel(){
				let data={
					token:this.$webapi.get('token')
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
				var data = {}
				this.carModelData.forEach(function (item) {
					 if(item.id == val){
						 	data.car_model_id = item.id
							data.car_model_name = item.modelName
					 }
				})
				this.$emit("adddatas",data);
			},
		}
	}
</script>
