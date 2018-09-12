let iView = require('iView')
// 网络状态错误
function netstatus (err) {
 }
// 接口返回来的状态
function ApiCode (res){
// 返回状态逻辑
   iView.Message.warning(res.msg)
   return
}
// 接口返回code状态
export default {
    getCode: function (err) {
      return netstatus(err)
    },
    getApiCode: function (res) {
      return ApiCode(res)
    }
}
