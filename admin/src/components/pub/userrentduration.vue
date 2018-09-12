<template>
	<div>
		<Select v-model="durations" @on-change="durationChange(durations)" placeholder="租赁期限">
			<Option :value="6">半年</Option>
			<Option :value="12">一年</Option>
			<Option :value="24">二年</Option>
			<Option :value="36">三年</Option>
		</Select>
	</div>
</template>
<script>
	export default{
		props:['duration','seq'],
		data(){
			return{
				durations:{
					type:Number
				}

			}
		},
		created(){
			this.durations=this.duration;
		},
		methods:{
			durationChange(e){
				this.$emit("durations",{'seq':this.seq,'dur':e})
			}
		}
	}
</script>
