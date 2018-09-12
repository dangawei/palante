<template>
	<div>
		<Select v-model="value" @on-change="durationChange(value)" v-if="show">
			<Option value="0">父级</Option>
			<Option :value="item.id" v-for="item in items">{{item.title}}</Option>
		</Select>
	</div>
</template>
<script>
	export default{
		props:{
      navID:{
        default:0
      }
    },
		data(){
			return{
				show:false,
        value:0,
        items:[]
			}
		},
		mounted() {
      //do something after mounting vue instance
      this.navID = this.navID
			this.list()
    },
		methods:{
      list () {
        let _this = this;
        let data = {
            token:this.$webapi.get('token'),
            pageNo:"1",
            pageSize:"10000",
            status:"1"
        }
        this.$api.get('/navigation_bar/page',data,reset => {
            if (reset.codeId === 1) {
                _this.items = reset.resData.list
								_this.show = true
            }
        })
      },
			durationChange(e){			
				this.$emit("componentnav",e)
			}
		}
	}
</script>
