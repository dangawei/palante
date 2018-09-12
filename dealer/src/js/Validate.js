var tel = /^[1][3,4,5,7,8,9][0-9]{9}$/
var card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 保存缓存里
export default {
    gettel: function () {
      return tel
    },
    getcard: function () {
      return card
    }
}
