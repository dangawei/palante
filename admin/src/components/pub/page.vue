<template>
	<div class="page">
		 <Page :total="this.pagedata.totalCount" :current="this.pagedata.pageCurrent" :page-size="this.pagedata.pagesize"  @on-change="onChange" @on-page-size-change="onpagesizechange"  show-elevator show-sizer show-total :page-size-opts="pagedata.arrPageSize"></Page>
	</div>
</template>
<script>
	import {vm} from '../../js/infobase/vm.js'
    export default {
		props:['pageData'],
		mounted: function () {
			this.pagedata.totalCount = this.pageData.totalCount
			this.pagedata.pagesize = this.pageData.pagesize
			this.pagedata.pageCount = this.pageData.totalPage
			this.pagedata.pageCurrent = this.pageData.pageCurrent
     },
	    data(){
	    	return{
		  	    	// 分页
		       pagedata:{
								//分页数
								arrPageSize:[3,5,10,15,20],
								//分页大小
								pagesize:10,
								//总分页数
								pageCount:1,
								//当前页面
								pageCurrent:1,
								//总数
								totalCount:10
		         }
	      	}
        },
				watch:{
						"pageData.totalCount":function (e) {
							this.pagedata.totalCount = this.pageData.totalCount
							this.pagedata.pagesize = this.pageData.pagesize
							this.pagedata.pageCount = this.pageData.totalPage
							this.pagedata.pageCurrent = this.pageData.pageCurrent
						},
						"pageData.pageCurrent":function (e) {
							this.pagedata.totalCount = this.pageData.totalCount
							this.pagedata.pagesize = this.pageData.pagesize
							this.pagedata.pageCount = this.pageData.totalPage
							this.pagedata.pageCurrent = this.pageData.pageCurrent
						},
						pageData:{
							handler(curVal,oldVal){
								this.pagedata.totalCount = curVal.totalCount
								this.pagedata.pagesize = curVal.pagesize
								this.pagedata.pageCount = curVal.totalPage
								this.pagedata.pageCurrent = curVal.pageCurrent
						 	},
					    deep:true
						}
				},
        methods:{
			 	 onpagesizechange (pagesize) {
						this.pagedata.pagesize = pagesize
						this.$emit('pageComponentDate',this.pagedata);
	     		},
      	onChange:function(curpage){
         	this.pagedata.pageCurrent = curpage
        	this.$emit('pageComponentDate',this.pagedata)
         }
       }
    }
</script>
<style scoped>
	.page{
		margin-top: 18px;
		margin-bottom: 18px;
	}
</style>
