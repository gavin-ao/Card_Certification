<script>
  import utils from "./utils/utils.js";

  export default {
    onLaunch(option) {
    },
    onShow(option) {
      console.log(option)
      var that = this

      that.$store.state.board.otherHelpId = ''
      that.$store.state.board.myHelpId = ''
      that.$store.state.board.actId = ''
      that.$store.state.board.sessionID = ''
      if (option.query.actId) {
        that.$store.state.board.actId = option.query.actId;
        if (option.query.helpId) {
          that.$store.state.board.otherHelpId = option.query.helpId;

        }
        wx.redirectTo({
          url: '/pages/activePower/main'
        })
      }else{
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              utils.login(that, function (sessionID, actId) {

              })

            }else{
              wx.redirectTo({
                url: '/pages/instrustor/main'
              })
            }
          }
        })
      }

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
