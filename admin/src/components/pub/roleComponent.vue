<template>
  <div class="">
    <!-- <AutoComplete
        v-model="value3"
        :data="departmentdata"
        :filter-method="filterMethod"
        placeholder="角色名称"
        @on-select = "departmentselect"
        >
    </AutoComplete> -->
    <Select v-model="valuename" @on-change="departmentselect(valuename)">
        <Option v-for="item in alldata" :value="item.name">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['propRoleName'],
  data () {
    return {
      valuename: "",
      alldata:[],
      departmentdata:[]
    }
  },
  created() {
    //do something after creating vue instance
    this.valuename=this.propRoleName;
  },
  mounted() {
    //do something after mounting vue instance
    this.list()
    this.valuename = this.propRoleName
    // console.log(this.departmentdata);
  },
  methods: {
    list () {
      let _this = this;
      let data = {
        token:this.$webapi.get('token')
      }
      this.$api.get('/admin_role/list',data,reset => {
          if (reset.codeId === 1) {
              _this.alldata = reset.resData
              let data  = reset.resData
              _this.departmentdata = []
              data.forEach(function (list) {
                  _this.departmentdata.push(list.name)
              })
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
      this.$emit('roleselect',data)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
