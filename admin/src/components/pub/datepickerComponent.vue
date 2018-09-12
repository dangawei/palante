<template>
  <div class="">
      1111
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
      type:{
        type: String,
        default:""
      }
  },
  data () {
    return {
        placeholder:"选择时间",
        timedata:"",
        type:"date"
    }
  },
  methods: {
      Time (e) {
          this.timedata = e;
          this.exportTime()
      },
      exportTime (){
        this.$emit('exportTimeData',this.timedata)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
