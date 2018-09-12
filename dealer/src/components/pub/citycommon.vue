<style scoped lang="less">
</style>
<template>
<Row>
    <Col span="7">
        <Cascader :data="provincedata" v-model="citycommondata.provinceCode" @on-change="provinceCode"></Cascader>
    </Col>
    <Col span="2">-</Col>
    <Col span="7">
        <Cascader :data="cityData" v-model="citycommondata.cityCode" @on-change="cityCode"></Cascader>
    </Col>
    <Col span="1">-</Col>
    <Col span="7">
        <Cascader :data="areaData" v-model="citycommondata.areaCode" @on-change="areaCode" ></Cascader>
    </Col>
</Row>

</template>

<script>
let axios = require('axios')
import city from "../../js/commoncity.js"
export default {
    name: 'index',
    data() {
        return {
            provinceshow:false,
            citycommondata: {
                provinceCode:[],
                cityCode:[],
                areaCode:[]
            },
            exportdata:{
              provinceCode:[],
              cityCode:[],
              areaCode:[]
            },
            provincedata:[],
            cityData: [],
            areaData: []
        }
    },
    mounted() {
        //do something after mounting vue instance
        this.province()
    },
    methods: {
          provinceCode(value,selectedData) {
                let _this = this
                this.exportdata.provinceCode = []
                this.exportdata.cityCode = []
                this.exportdata.areaCode = []
                if(selectedData.length>0){
                    this.exportdata.provinceCode.push({label:selectedData[0].label,value:selectedData[0].value})
                }else{
                    this.exportdata.provinceCode.push({label:"",value:""})
                }
                this.$emit('endcommoncity', this.exportdata)
                setTimeout(function() {
                    _this.city()
                }, 300)
            },
            cityCode(value,selectedData) {
                let _this = this
                this.exportdata.cityCode = []
                this.exportdata.areaCode = []
                if(selectedData.length>0){
                    this.exportdata.cityCode.push({label:selectedData[0].label,value:selectedData[0].value})
                }else{
                    this.exportdata.cityCode.push({label:"",value:""})
                }
                this.$emit('endcommoncity', this.exportdata)
                setTimeout(function() {
                    _this.area()
                }, 300)
            },
            areaCode(value,selectedData) {
                let _this = this
                this.exportdata.areaCode = []
                if(selectedData.length>0){
                    this.exportdata.areaCode.push({label:selectedData[0].label,value:selectedData[0].value})
                }else{
                    this.exportdata.areaCode.push({label:"",value:""})
                }
                this.$emit('endcommoncity', this.exportdata)
            },
            province() {
                this.provincedata = city.getprovince()
            },
            city(e) {
                this.cityData = city.getcity(this.citycommondata.provinceCode)
            },
            area() {
              this.areaData = city.getarea(this.citycommondata.cityCode)
        }
    }
}

</script>
