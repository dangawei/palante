<template>
  <div class="">
     <Button :type="type" :disabled="disabled" :size="size" @click="ButtomEmit">提交出库单</Button>
  </div>
</template>
<script>
export default {
  props:{
    type:{
      default:"primary"
    },
    disabled:{
      default:false
    },
    size:{
      default:"default"
    }
  },
  data () {
    return {}
  },
  created() {
    this.list()
  },
  mounted() {
    //do something after mounting vue instance
  },
  methods: {
    ButtomEmit () {
      this.$emit("ButtomEmitClick")
    }
  }
}
</script>
