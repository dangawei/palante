<template>
  <div class="">
    <!-- <AutoComplete
        v-model="value"
        :data="departmentdata"
        :filter-method="filterMethod"
        icon="ios-search"
        placeholder="部门名称"
        @on-select = "departmentselect"
        @on-change = "departmentchange"
        >
    </AutoComplete> -->
    <Select v-model="valuedata" @on-change="departmentselect(valuedata)" placeholder="选择部门">
       <Option  value="" key="">全部</Option>
        <Option v-for="item in alldata" :value="item.name" :key="item.id">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['department'],
  data () {
    return {
      valuedata: "",
      alldata:[]
    }
  },
  created() {

    //do something after creating vue instance
    this.list()
  },
  mounted() {
    //do something after mounting vue instance
    this.valuedata = this.department
  },
 //  watch: {
 //    department(newValue, oldValue) {
 //         this.valuedata = newValue
 //    }
 // },
  methods: {
    list () {
      let _this = this;
      let data = {
          token:this.$webapi.get('token'),
          departmentNo:"",
          name:"",
      }
      this.$api.get('/admin_department/findList',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
          }
      })
    },
    departmentselect (option) {
      var data = {}
      this.alldata.forEach(function (item) {
          if(item.name == option){
            data = item
          }
      })
      this.$emit('departmentselect',data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.demo-auto-complete-item{
      padding: 4px 0;
      border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
      font-size: 12px;
      padding: 4px 6px;
  }
  .demo-auto-complete-group span{
      color: #666;
      font-weight: bold;
  }
  .demo-auto-complete-group a{
      float: right;
  }
  .demo-auto-complete-count{
      float: right;
      color: #999;
  }
  .demo-auto-complete-more{
      display: block;
      margin: 0 auto;
      padding: 4px;
      text-align: center;
      font-size: 12px;
  }
</style>
