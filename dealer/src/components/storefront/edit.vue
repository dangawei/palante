<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/storefront/list/">门店列表</BreadcrumbItem>
                <BreadcrumbItem>修改门店</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>修改【{{this.formItem.name}}】</h2>
            </div>
        </div>
    </div>
    <div class="page-view allm20">
        <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd">
                        <Row>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="门店名称" prop="name">
                                    <Input v-model="formItem.name" placeholder="门店名称"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                              <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="8">
                                      <FormItem label="负责人名字" prop="principalsName">
                                          <Input v-model="formItem.principalsName" placeholder="负责人名字"></Input>
                                      </FormItem>
                                 </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                              <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="8">
                                      <FormItem label="负责人电话" prop="principalsTelephone">
                                          <Input v-model="formItem.principalsTelephone" placeholder="负责人电话"></Input>
                                      </FormItem>
                                 </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="24">
                                <FormItem label="上传店招" required>
                                  <Upload @uploadComponent="uploadComponent" :Uploadimg="formItem.pic" v-if="show"></Upload>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">

                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="24"></Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="选择城市" required>
                                     <span>{{formItem.provinceName}}</span> - <span>{{formItem.cityName}}</span>
                                     <Select v-model="formItem.areaCode" @on-change="shoplist" v-if="show">
                                        <Option value="" key="">全部</Option>
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="具体地址" prop="address">
                                    <Input v-model="formItem.address" type="textarea" :rows="4" placeholder="具体地址" @on-blur="address"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                              <FormItem label="经纬度" prop="address">
                                 <div class="">
                                    左击获取经纬度:{{this.formItem.longitude}},{{this.formItem.latitude}}
                                 </div>
                                 <div id="container"></div>
                                  <!-- <map-component @exMapData="exMapData" :mapmodel="1" :longitude="this.formItem.longitude" :latitude="this.formItem.latitude"  v-if="mapshow"></map-component> -->
                              </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">保存</Button>
                    <Button type="ghost" @click="handleReset('formItem')" size="large">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>

</template>

<script>
var map;
var markers;
import citycommon from "../pub/iviewarea.vue"
import Upload from "../pub/Uploadimg.vue"
import mapComponent from "../pub/map.vue"
import city from "../../js/commoncity.js"
export default {
    name: 'index',
    components: {
        citycommon,
        Upload,
        mapComponent
    },
    mounted() {
      //do something after creating vue instance
       this.list()
    },
    data() {
      const validateMobile = (rule, value, callback) => {
              var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
              if (!myreg.test(value)) {
                  callback(new Error('手机号码格式不对'));
              } else {
                  callback();
              }
       }
        return {
            mapshow:false,
            mapnum:1000000,
            show:false,
            areaData:[],
            cityList:[],
            formItem: {
              principalsName:"",
              principalsTelephone:"",
              name: '',
              contactTelephone: "",
              address: "",
              pic: "",
              provinceCode: "",
              cityCode: "",
              areaCode: "",
              longitude:"",
              latitude:""
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: '门店名称没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '门店名称没有填写',
                    trigger: 'blur'
                }],
                principalsName: [{
                    required: true,
                    message: '负责人名字没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '负责人名字没有填写',
                    trigger: 'blur'
                }],
                principalsTelephone: [{
                    required: true,
                    message: '负责人电话没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '负责人电话没有填写',
                    trigger: 'blur'
                }],
                contactName: [{
                    required: true,
                    message: '联系人没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '联系人长度不能超过20字符',
                    trigger: 'blur'
                }],
                contactTelephone: [{
                    required: true,
                    message: '联系电话没有填写',
                    trigger: 'blur'
                },
                {validator: validateMobile, trigger: 'blur'}
              ],
              address: [{
                    required: true,
                    message: '地址没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 5,
                    message: '地址最小不能5个字符',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        shoplist (e) {
            var _this = this
            this.formItem.areaCode = e
            this.cityList.forEach(function (a) {
              if(a.value == e){
                _this.formItem.areaName = a.label
              }
            })
            this.citymap()
        },
        map (x,y) {
          var _this = this;
          console.log(x,y)
          //初始化地图
          map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 14
          })
         map.setCenter([x,y])
          //添加点标记，并使用自己的icon
         markers = new AMap.Marker({
            map: map,
            position: [x,y],
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),  //图标大小
                image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                imageOffset: new AMap.Pixel(0, -60)
            })
         })
         map.add(markers);
         map.on('click',function(e){
              console.log(e.lnglat.lng,e.lnglat.lat)
              map.remove(markers)
              _this.formItem.longitude = e.lnglat.lng
              _this.formItem.latitude = e.lnglat.lat
              _this.map(e.lnglat.lng,e.lnglat.lat)
         })
        },
        address () {
           this.citymap()
        },
        citymap () {
          var _this = this;
          var cityname =""+this.formItem.provinceName + this.formItem.cityName+this.formItem.areaName + this.formItem.address
          var geocoder = new AMap.Geocoder({
             city: "", //城市，默认：“全国”
             radius: 1000 //范围，默认：500
         });
         //地理编码,返回地理编码结果
         geocoder.getLocation(cityname, function(status, result) {
             if (status === 'complete' && result.info === 'OK') {
                  _this.formItem.longitude = result.geocodes[0].location.lng
                  _this.formItem.latitude = result.geocodes[0].location.lat
                  _this.map(result.geocodes[0].location.lng,result.geocodes[0].location.lat)
             }
         });
        },
        list () {
          var _this =  this
          var listdata = {
            token:this.$webapi.get('token'),
            id:this.$route.params.id
          }
          this.$api.get('/dealer_storefront/getOne',listdata,reset => {
            if (reset.codeId === 1) {
               var data = reset.resData
               _this.formItem.principalsName = data.principalsName;
               _this.formItem.principalsTelephone= data.principalsTelephone;
               _this.formItem.name= data.name;
               _this.formItem.contactTelephone= data.contactTelephone;
               _this.formItem.address= data.address;
               _this.formItem.pic= data.pic;
               _this.formItem.provinceCode= data.provinceCode;
               _this.formItem.cityCode= data.cityCode;
               _this.formItem.areaCode= parseInt(data.areaCode);
               _this.formItem.provinceCode= data.provinceCode;
               _this.formItem.provinceName= data.provinceName;
               _this.formItem.cityName= data.cityName;
               _this.formItem.longitude= data.longitude;
               _this.formItem.latitude= data.latitude;
               _this.areaData=[data.provinceCode,data.cityCode,data.areaCode]
               _this.cityList = city.getarea(data.cityCode)
               _this.show = true
               _this.mapshow = true
               _this.map(data.longitude,data.latitude)
            } else {
              _this.$netcode.getApiCode(reset)
           }
          })
        },
        exMapData (e) {
          this.formItem.longitude = e.lng
          this.formItem.latitude = e.lat
        },
        uploadComponent (e){
            this.formItem.pic = e[0];
        },
        endcommoncity(e) {
          this.formItem.provinceCode = e[0].code
          this.formItem.cityCode = e[1].code
          this.formItem.areaCode = e[2].code
          this.formItem.provinceName = e[0].name
          this.formItem.cityName = e[1].name
          this.formItem.areaName = e[2].name
          this.citymap()
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.post()
                } else {
                    this.$Message.error('内容填写不完整!')
                }
            })
        },
      handleReset(name) {
          this.$router.back(-1);
      },
     post () {
       var _this =  this
       var data ={
           id:this.$route.params.id,
           token:this.$webapi.get('token'),
           name:this.formItem.name,
           principalsName:this.formItem.principalsName,
           principalsTelephone:this.formItem.principalsTelephone,
           provinceCode:this.formItem.provinceCode,
           cityCode:this.formItem.cityCode,
           areaCode:this.formItem.areaCode,
           longitude:this.formItem.longitude,
           latitude:this.formItem.latitude,
           pic:this.formItem.pic,
           address:this.formItem.address
       }
       this.$api.post("/dealer_storefront/update",data,reset => {
         if (reset.codeId === 1) {
            _this.$router.push({path:"/storefront/list"})
         } else {
           _this.$netcode.getApiCode(reset)
        }
       })
     }
    }
}

</script>
<style lang="less">
  #container{
    width: 100%;
    height: 800px;
  }
</style>
