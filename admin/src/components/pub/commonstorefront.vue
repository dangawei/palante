<template>
	<div>
		<Select v-model="durations" @on-change="durationChange(durations)" placeholder="租赁期限">
			<Option value="">全部</Option></Option>
			<Option :value="12">一年</Option>
		</Select>
	</div>
</template>
<script>
	export default{
		props:{
      
    },
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
