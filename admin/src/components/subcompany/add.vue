<style scoped lang="less">
</style>
<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/subcompany/list">分公司列表</BreadcrumbItem>
                <BreadcrumbItem>添加分公司列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加分公司</h2>
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
                                <FormItem label="分公司名称" prop="name">
                                    <Input v-model="formItem.name" autocomplete="no" placeholder="分公司名称"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                              <Row>
                                <Col :xs="24" :sm="24" :md="6" :lg="8">
                                  <FormItem label="公司图片" prop="pic" required>
                                       <Upload @uploadComponent="uploadComponent"></Upload>
                                       <div class="mt10">
                                          <Alert type="warning" show-icon>图片不能超过2M</Alert>
                                       </div>
                                  </FormItem>
                                </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                              <Row>
                                <Col :xs="24" :sm="24" :md="6" :lg="8">
                                  <FormItem label="营业执照图片" prop="pic" required>
                                       <Upload @uploadComponent="businessLicenseNo"></Upload>
                                       <div class="mt10">
                                          <Alert type="warning" show-icon>图片不能超过2M</Alert>
                                       </div>
                                  </FormItem>
                                </Col>
                              </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="营业执照号" prop="businessLicenseNo">
                                    <Input v-model="formItem.businessLicenseNo" placeholder="营业执照号"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <Row>
                                  <Col :xs="24" :sm="24" :md="6" :lg="8">
                                      <FormItem label="联系人" prop="principalsName" >
                                          <Input v-model="formItem.principalsName" placeholder="联系人"></Input>
                                      </FormItem>
                                  </Col>
                                </Row>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="8">
                                <FormItem label="联系人电话" prop="principalsTelephone" >
                                    <Input v-model="formItem.principalsTelephone" placeholder="联系人电话" ></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="6" :lg="24"></Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="省市区" required>
                                    <citycommon @areaEmit="areaEmit" ></citycommon>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <FormItem label="具体地址" prop="address">
                                    <Input v-model="formItem.address" type="textarea" autocomplete="no" :rows="4" placeholder="具体地址"  @on-blur="addressblur()"></Input>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="24" :lg="24">
                                <div class="">
                                   左击获取经纬度:{{this.formItem.longitude}},{{this.formItem.latitude}}
                                </div>
                                <div id="container" style="width:100%;height:700px"></div>
                            </Col>
                        </Row>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                </div>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')" size="large">添加</Button>
                    <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px" size="large">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>

</template>

<script>
var map;
var markers=[]
var placeSearch;
import citycommon from "../pub/iviewarea.vue"
import Upload from "../pub/Uploadimg.vue"
import mapComponent from "../pub/map.vue"
export default {
    name: 'index',
    components: {
        citycommon,
        Upload,
        mapComponent
    },
    mounted() {
      //do something after mounting vue instance
      this.show = true
      this.mapshow = true
      this.maplist()
    },
    data() {
      const validateMobile = (rule, value, callback) => {
              var myreg=this.$Validate.gettel()
              if (!myreg.test(value)) {
                  callback(new Error('手机号码格式不对'));
              } else {
                  callback();
              }
       }
        return {
            mapshow:false,
            level:2,
            show:false,
            num:100000,
            formItem: {
                name: '',
                businessLicenseNo:"",
                businessLicense:"",
                principalsName: "",
                principalsTelephone: "",
                address: "",
                contactName: "",
                icon: "",
                provinceCode: "",
                cityCode: "",
                areaCode: "",
                longitude:"",
                latitude:""
            },
            ruleValidate: {
                businessLicenseNo: [{
                    required: true,
                    message: '营业执照号没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '营业执照号没有填写',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '分公司名称没有填写',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 20,
                    message: '经销商名称没有填写',
                    trigger: 'blur'
                }],
                principalsName: [{
                    required: true,
                    message: '联系人没有填写',
                    trigger: 'blur'
                }],
                principalsTelephone: [{
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
      maplist () {
        var _this = this
        //地图加载
         map = new AMap.Map("container", {
             resizeEnable: true
         });
         AMap.plugin(['AMap.ToolBar', 'AMap.Scale',"AMap.ToolBar","AMap.Geocoder"], function () {
           map.addControl(new AMap.ToolBar())
           map.addControl(new AMap.Scale())
           map.addControl(new AMap.ToolBar())
           map.addControl(new AMap.Geocoder())
         })
         //输入提示
          var autoOptions = {
              input: "tipinput"
          };
          var auto = new AMap.Autocomplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
              map: map
          });  //构造地点查询类
          AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
          function select(e) {
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name);  //关键字查询查询
          }

          map.on('click',function(e){
               map.remove(markers)
               _this.select(e.lnglat.lng,e.lnglat.lat)
         })
      },
      addressblur  () {
        var _this = this;
        map = new AMap.Map("container", {
             resizeEnable: true
         })
           var geocoder = new AMap.Geocoder({
            city: "", //城市，默认：“全国”
            radius: 1000 //范围，默认：500
           });
            //地理编码,返回地理编码结果
            geocoder.getLocation(_this.formItem.address, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    var geocode = result.geocodes
                    for (var i = 0; i < geocode.length; i++) {
                       _this.select(geocode[i].location.getLng(),geocode[i].location.getLat())
                    }
                }
            })
          map.on('click',function(e){
               map.remove(markers)
               _this.select(e.lnglat.lng,e.lnglat.lat)
         })
      },
      select (Lng,Lat) {
          this.formItem.longitude = Lng
          this.formItem.latitude = Lat
          markers = new AMap.Marker({
             map: map,
             position: [Lng,Lat],
             icon: new AMap.Icon({
                 size: new AMap.Size(40, 50),  //图标大小
                 image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                 imageOffset: new AMap.Pixel(0, -60)
             })
        })
        //console.log(e)
        //map.setZoom(12)
        map.setCenter([Lng,Lat])
        if(this.lver==1){
           map.setCity(mapdata01.cityName);
        }
      },
        exMapData (e){
          this.formItem.longitude = e.lng
          this.formItem.latitude = e.lat
        },
        uploadComponent (e){
            this.formItem.pic = e[0];
        },
        businessLicenseNo (e){
            this.formItem.businessLicense = e[0];
            console.log(this.formItem.businessLicense);
        },
        areaEmit(e) {
            this.formItem.provinceCode = e[0].code
            this.formItem.cityCode = e[1].code
            this.formItem.areaCode = e[2].code
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.post()
                }
            })
        },
      handleReset(name) {
          this.$router.back(-1);
      },
     post () {
        var _this =  this
        if(this.formItem.businessLicenseNo==""){
          this.$Message.warning("营业执照号没有填写")
          return
        }
        if(this.formItem.pic=="" || this.formItem.pic==undefined){
          this.$Message.warning("公司图片没有上传")
          return
        }
        if(this.formItem.businessLicense=="" || this.formItem.businessLicense==undefined){
          this.$Message.warning("营业执照图片没有上传")
          return
        }
        var data = {
          token:this.$webapi.get('token'),
          name:this.formItem.name,
          principalsName:this.formItem.principalsName,
          principalsTelephone:this.formItem.principalsTelephone,
          provinceCode:this.formItem.provinceCode,
          cityCode:this.formItem.cityCode,
          areaCode:this.formItem.areaCode,
          address:this.formItem.address,
          longitude:this.formItem.longitude,
          latitude:this.formItem.latitude,
          pic:this.formItem.pic,
          businessLicense:this.formItem.businessLicense,
          businessLicenseNo:this.formItem.businessLicenseNo
        }
       this.$api.post("/admin_subcompany/save",data,reset => {
         if (reset.codeId === 1) {
            _this.$router.push({path:"/subcompany/list"})
         } else {
           _this.$netcode.getApiCode(reset)
        }
       })
     }
    }
}
</script>
