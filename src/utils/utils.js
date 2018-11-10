function login(that, func) {
    wx.login({
      success: function (res) {
        var code = res.code;
        // wx.setStorageSync('code', res.code)
        wx.getUserInfo({
          lang: "zh_CN",
          success: function (res) {
            console.log(new Date().getTime())
            var key = {};
            key.encryptedData = res.encryptedData
            key.iv = res.iv
            that.$store.state.board.nickName = res.userInfo.nickName;
            that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;

            var url = that.$store.state.board.urlHttp + '/wechatapi/service/newLogin';
            wx.request({
              url: url,
              method: "POST",
              data: {
                appid: that.$store.state.board.appid,
                secret: that.$store.state.board.secret,
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  console.log(new Date().getTime())
                  that.$store.state.board.sessionID = res.data.sessionID
                  // var currentPages = wx.getStorageSync('currentPages')
                  // that.$store.state.board.headPic=[]
                  var sessionID = that.$store.state.board.sessionID;
                  func(sessionID);
                }
              }
            })
          }
        })
      }
    })
}

module.exports = {
  login: login
}
