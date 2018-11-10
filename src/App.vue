<script>
  import utils from "./utils/utils.js";

  export default {
    onLaunch(option) {
    },
    onShow(option) {
      console.log(option)
      var that = this;
      if(option.path =="pages/wechatLogin/main"){
        wx.redirectTo({
          url: '/pages/authorize/main'
        })
      }
      // wx.getSetting({
      //   success: function (res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       utils.login(that, function (sessionID) {
      //         wx.request({
      //           url: that.$store.state.board.urlHttp + "/wechatapi/wsva/getAuthorization",
      //           method: "POST",
      //           data: {
      //             sessionID:sessionID,
      //           },
      //           header: {'content-type': 'application/x-www-form-urlencoded'},
      //           success: function (res) {
      //             if (res.data.success) {
      //               wx.redirectTo({
      //                 url: '/pages/instrustor/main'
      //               })
      //             }else{
      //               wx.redirectTo({
      //                 url: '/pages/authorize/main'
      //               })
      //             }
      //           }
      //         })
      //       })
      //     }else{
      //       wx.redirectTo({
      //         url: '/pages/authorize/main'
      //       })
      //     }
      //   }
      // })

    },
    created() {

    }
  }
</script>

<style>
  page {
    height: 100%;
    width: 100%;
  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
