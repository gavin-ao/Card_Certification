<template>
  <div>

  </div>
</template>

<script>
  import utils from "../../utils/utils.js";
export default {

  data () {
    return {
      logs: []
    }
  },
  onShow(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          utils.login(that, function (sessionID) {
            wx.request({
              url: that.$store.state.board.urlHttp + "/wechatapi/wsva/getAuthorization",
              method: "POST",
              data: {
                sessionID:sessionID,
              },
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  wx.redirectTo({
                    url: '/pages/scanCode/main'
                  })
                }else{
                  wx.redirectTo({
                    url: '/pages/authorize/main'
                  })
                }
              }
            })
          })
        }else{
          wx.redirectTo({
            url: '/pages/authorize/main'
          })
        }
      }
    })
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
