<style scoped lang="less">
</style>
<template>
  <Row>
    <Col span="12">
      <Select v-model="data.parsentID" @on-change = "parentitem" v-if="parsentshow">
         <Option  value="0">父级</Option>
         <Option v-for="item in parsent" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
   </Col>
   <Col span="12">
     <Select v-model="data.parsentseedID" v-if="seedshow" @on-change = "parentseeditem">
        <Option  value="">全部</Option>
        <Option v-for="item in parsentseed" :value="item.id" :key="item.id">{{ item.name }}</Option>
     </Select>
  </Col>
  </Row>
</template>
<script>
      export default {
        data () {
          return {
               name:"dealerComponentR",
               parsentshow:false,
               seedshow:false,
               data:{
                  parsentID:0,
                  parsentseedID:0
               },
               parsent:[],
               parsentseed:[]
          }
        },
        created() {
          //do something after creating vue instance
          this.list()
        },
        methods: {
          parentitem (e) {
              this.data.parsentID = e
              this.data.parsentseedID = 0
              this.seed()
              this.emitcomponent()
          },
          parentseeditem (e) {
            this.data.parsentseedID = e
            this.emitcomponent()
          },
          list () {
            let _this = this
            let data = {
              token:this.$webapi.get('token'),
              parentId:0
            }
            this.$api.get('/dealer_resources/list',data,reset => {
                if (reset.codeId === 1) {
                  _this.parsent = reset.resData
                  _this.parsentshow = true
                }else {
                  _this.$netcode.getApiCode(reset)
               }
            })
          },
          seed () {
            let _this = this
            let data = {
              token:this.$webapi.get('token'),
              parentId:this.data.parsentID
            }
            this.$api.get('/dealer_resources/list',data,reset => {
                if (reset.codeId === 1) {
                  _this.parsentseed = reset.resData
                  if(_this.parsentseed.length>0){
                      _this.seedshow = true
                  }else{
                      _this.seedshow = false
                  }
                }else {
                  _this.$netcode.getApiCode(reset)
               }
            })
          },
          emitcomponent () {
             var id = 0;
             if(this.data.parsentseedID==0){
                id = this.data.parsentID
             }else{
                id = this.data.parsentseedID
             }
              this.$emit('dealerComponentR',id)
          },
        }
      }
</script>
