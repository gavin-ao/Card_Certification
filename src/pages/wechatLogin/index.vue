<template>
  <div class="vist-userInfo">
    <div class="container">
      <button class="menuss" @getuserinfo="scanCode" open-type="getUserInfo"  hover-class="hoverNone" hover-stay-time="800">授权绑定</button>
    </div>

  </div>
</template>

<script>
  import utils from "../../utils/utils.js";
  import md5 from "../../utils/md5.js";

  export default {
    data() {
      return {

      }
    },
    onLoad(option) {

    },
    components: {},
    computed: {},
    methods: {
      scanCode(){
        var that = this;
        var userId =   wx.getStorageSync("userId");
        var storeId = wx.getStorageSync("storeId");
        // 这里修改成跳转的页面
        utils.login(that, function (sessionID) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationBind",
            method: "POST",
            data: {
              sessionID:sessionID,
              userId: userId,
              storeId: storeId
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                wx.redirectTo({
                  url: '/pages/scanCode/main'
                })
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2500
                })
              }
            }
          })
        });

      },
    },
    created() {

    }
    ,
    mounted() {
      wx.setNavigationBarTitle({
        title: "用户授权"
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    background-color: #fff;
    justify-content: initial;
    height: 100%;

    .container {
      .menuss {
        margin: 0 auto;
        width: 270px;
        height: 40px;
        background: #EF6D00;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
        border-radius: 24px;
        border: none;
        margin-top: 10px;
      }
    }

  }
</style>
