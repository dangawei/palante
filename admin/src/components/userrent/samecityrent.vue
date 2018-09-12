<template>
	<div class="expand-wrap">
		<Row class="expand-row" v-for="(item,index) in data">
            <Col span="8" class="expand-col">
                <span class="expand-value">{{ item.provinceName+item.cityName }}</span>
            </Col>
            <Col span="8" class="expand-col">
                <user-rent-duration :duration="item.duration" :seq="index" @durations="durations"></user-rent-duration> 
            </Col>
            <Col span="8" class="expand-col">
                <Input v-model="item.price" @on-change="samecity(index)"></Input>
            </Col>
        </Row>
	</div>
</template>
<script>
	import UserRentDuration from '../pub/userrentduration.vue'
	export default{
		props:['datas'],
		components:{
			UserRentDuration: UserRentDuration
		},
		data(){
			return{
				data:{
					type:Array
				}

			}
		},
		created(){
			this.data=this.datas;
		},
		methods:{
			durations(e){
				this.data[e.seq].duration=e.dur;
				this.$emit("samecityrentprice",this.data[e.seq]);
			},
			samecity(index){
				this.$emit("samecityrentprice",this.data[index]);
			}
		}
	}
</script>
<style scoped>
	.expand-wrap{
		
	}
	.expand-row{
		border-bottom:1px solid #DDDEE1;	
		text-align: center;
	}
	.expand-col{
		padding-left: 15px;
		padding-right: 15px;
		height: 46px;
		line-height: 46px;
	}
</style>