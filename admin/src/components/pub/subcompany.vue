<template>
  <div class="">
    <Select v-model="company" @on-change="companycode()" placeholder="选择分公司">
        <Option  value="" >全部</Option>
        <Option v-for="item in companydata" :value="item.id" >{{ item.companyName }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
      type:{
        type: String,
        default:""
      },
      subCompanyId:{
        default:""
      }
  },
  data () {
    return {
         company:"",
         companydata:[]
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.company = this.subCompanyId
    this.list()
  },
  methods: {
      companycode () {
       this.$emit('subcompanyemit',this.company)
      },
      list () {
        let _this = this
        let data = {
            token:this.$webapi.get('token'),
            name:""
        }
        this.$api.get('/admin_subcompany/findList',data,reset => {
            if (reset.codeId === 1) {
                _this.companydata = reset.resData
            }
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
