define(function(require, exports, module) {
   var common = require("common")
   var quevin = common.getUrlParam("vin")
   var cardata = {}
   var gocarview = {
     init:function () {
       this.list()
     },
     list:function () {
         var _this = this;
         common.loginAjax({
           url:common.rootUrl+"/car_model/detail",
           param:{
             token:common.cookie("token"),
             vin:quevin
           },
           type:"get",
           success:function (e) {
             if(e.codeId == 1){
                cardata = e.resData
                if(cardata==null){
                 $("#J_carbtn").addClass("none")
                }
                _this.listhtml()
                _this.dichtml()
                _this.btnhtml()
             }else if(e.codeId == -9){

             }
             else{
               common.showcodeId(e.codeId,e.codeDes)
             }
           }
         })
     },
     listhtml:function (){
        var batteryNo = cardata.batteryNo || ""
        var brandName = cardata.brandName || ""
        var licencePlateNumber = cardata.licencePlateNumber || ""
        var modelName = cardata.modelName || ""
        var simNo = cardata.simNo || ""
        var voltage = cardata.voltage || ""
        var terminalNo = cardata.terminalNo || ""
        var distance =  cardata.distance/10 || 0
        var motorNumber = cardata.monitorNo || ""
        var runModel = ""
            if(cardata.runModel==0){
              runModel = "无效"
            }
            if(cardata.runModel==1){
              runModel = "纯电"
            }
            if(cardata.runModel==2){
              runModel = "混动"
            }
            if(cardata.runModel==3){
              runModel = "燃油"
            }
        var str = ''
            str += ' <li><label>车牌号</label><div class="page-detail">'+licencePlateNumber+'</div></li>'
            str += ' <li><label>车架号</label><div class="page-detail">'+quevin+'</div></li>'
            str += ' <li><label>车辆型号</label><div class="page-detail">'+modelName+'</div></li>'
            str += ' <li><label>总里程</label><div class="page-detail">'+distance+'公里</div></li>'
            str += ' <li><label>电池编号</label><div class="page-detail">'+batteryNo+'</div></li>'
            str += ' <li><label>电机编号</label><div class="page-detail">'+motorNumber+'</div></li>'
            str += ' <li><label>终端号</label><div class="page-detail">'+terminalNo+'</div></li>'
            str += ' <li><label>运行模式</label><div class="page-detail">'+runModel+'</div></li>'
            $("#J_info").html(str)
     },
     dichtml:function () {
       var batteryNo = cardata.batteryNo || ""
       var brandName = cardata.brandName || ""
       var carFrameNo = cardata.carFrameNo || ""
       var licencePlateNumber = cardata.licencePlateNumber || ""
       var modelName = cardata.modelName || ""
       var simNo = cardata.simNo || ""
       var terminalNo = cardata.terminalNo || ""
       var voltage = cardata.voltage || ""
       var gear = cardata.gear || ""
       var soc = cardata.soc || 0
       var speed = cardata.speed/10 || 0
       var waring = cardata.waring || 0
       var terminalNo = cardata.terminalNo || 0
       var distance =  cardata.distance || 0
       var motorNumber = cardata.motorNumber || 0
       var monitorTemperature = cardata.monitorTemperature-40 || 0
       var chargeState = ""
       var lockstatus = ""
       var peak09 = cardata.peak09-40
       var carState = ""
           if(cardata.chargeState==0){
             chargeState = "无效"
           }
           if(cardata.chargeState==1){
             chargeState = "停车充电"
           }
           if(cardata.chargeState==2){
             chargeState = "行驶充电"
           }
           if(cardata.chargeState==3){
             chargeState = "未充电"
           }
           if(cardata.chargeState==4){
             chargeState = "充电完成"
           }
           if(cardata.carState==0){
             carState = "无效"
           }
           if(cardata.carState==1){
             carState = "启动"
           }
           if(cardata.carState==2){
             carState = "熄火"
           }
           if(cardata.carState==3){
             carState = "其他状态"
           }
           if(cardata.mcState==0){
              if(cardata.monitorState==1){
                  lockstatus= "耗电"
              }
              if(cardata.monitorState==2){
                  lockstatus= "发电"
              }
              if(cardata.monitorState==3){
                  lockstatus= "关闭"
              }
              if(cardata.monitorState==4){
                  lockstatus= "准备"
              }
              if(cardata.monitorState==0){
                  lockstatus= "其他异常"
              }
           }
           if(cardata.mcState==1){
             lockstatus = "开锁"
           }
           if(cardata.mcState==2){
             lockstatus = "关锁"
           }
       var str = ''
           str += ' <li><label>剩余电量</label><div class="page-detail">'+soc+'</div></li>'
           str += ' <li><label>档位信息</label><div class="page-detail">'+gear+'</div></li>'
           str += ' <li><label>车辆状态</label><div class="page-detail">'+carState+'</div></li>'
           str += ' <li><label>充电状态</label><div class="page-detail">'+chargeState+'</div></li>'
           str += ' <li><label>电机温度</label><div class="page-detail">'+monitorTemperature+'°C</div></li>'
           str += ' <li><label>电池温度</label><div class="page-detail">'+peak09+'°C</div></li>'
           str += ' <li><label>锁车状态</label><div class="page-detail">'+lockstatus+'</div></li>'
           str += ' <li><label>车速</label><div class="page-detail">'+speed+'</div></li>'
           $("#J_dicinfo").html(str)

     },
     btnhtml:function () {
       var _this = this;
       var $el = $(document)
        $el.on("click",'#J_carbtn',function () {
            _this.view()
        })
     },
     view:function () {
       var _this = this;
       var $el = $(document)
       var str = '<div class="carshow"><div class="mask"></div><div class="carinfo"><div class="carinfo-hd"><div class="carinfo-hd-title">我要报障</div></div>'
           str +='<div class="carinfo-bd"><ul><li><label>手机号:</label><div class="carinfo-detail"><input type="text" class="inputtxt" id="J_carinfo_tel" /></div></li>'
           str +='<li><label>故障内容:</label><div class="carinfo-detail"><textarea class="textarea" id="J_carinfo_centent"></textarea></div></li>'
           str +='<li><label></label><div class="carinfo-detail"><a href="javascript:void(0)" class="btn btn-gree mr10" id="J_tijiao">提交</a><a href="javascript:void(0)" class="btn btn-error" id="J_close">取消</a></div></li>'
           str += '</ul></div></div></div>'
           $("#J_carshowview").html(str)
           $el.find("#J_tijiao").off("click").click('#J_tijiao',function () {
              _this.post()
           })
           $el.find("#J_close").off("click").click('#J_close',function () {
              $("#J_carshowview").html("")
           })

     },
     post:function () {
       var tel = $("#J_carinfo_tel").val()
       var faultContent = $("#J_carinfo_centent").val()
       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
           if(!myreg.test(tel)){
             common.showTip("手机号码格式不对")
             return
           }
       common.loginAjax({
         url:common.rootUrl+"/fault_problem/save",
         param:{
           token:common.cookie("token"),
           dealerId:cardata.dealerId,
           dealerStorefrontId:cardata.dealerStorefrontId,
           faultContent:faultContent,
           mobileNo:tel,
           carId:cardata.carId,
           vin:cardata.vin,
           modelId:cardata.modelId
         },
         type:"post",
         success:function (e) {
           if(e.codeId == 1){
            window.location.href = window.location.href
           }else{
            common.showcodeId(e.codeId,e.codeDes)
           }
         }
       })
     }
   }
   gocarview.init()
 })
