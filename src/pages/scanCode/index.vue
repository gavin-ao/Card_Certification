<template>
  <div class="vist-userInfo">
    <img src="/static/img/19.jpg" alt="" mode="scaleToFill" style="width: 100%;height: 100%;">
    <div class="containers">
      <div class="menuss" @click="scanCode" hover-class="hoverNone" hover-stay-time="800">扫码开始核销</div>
    </div>

  </div>
</template>

<script>
  import utils from "../../utils/utils.js";
  import md5 from "../../utils/md5.js";

  export default {
    data() {
      return {}
    },
    onLoad(option) {

    },
    onShow() {
      var that = this;
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            utils.login(that, function (sessionID) {

            })
          } else {
            wx.redirectTo({
              url: '/pages/authorize/main'
            })
          }
        }
      })
    },
    components: {},
    computed: {},
    methods: {
      scanCode() {
        var that = this;
        var userId = wx.getStorageSync("userId");
        var storeId = wx.getStorageSync("storeId");
        var that = this;
        wx.scanCode({
          success(res) {
            console.log(res)
            if (res.result) {
              wx.navigateTo({
                url: '/pages/instrustor/main?mapId=' + res.result
              })

            }
          }
        });
      },
    },
    created() {

    }
    ,
    mounted() {
      wx.setNavigationBarTitle({
        title: "核销e"
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    .containers {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;

      .menuss {
        width: 200px;
        height: 100px;
        line-height: 100px;
        border-radius: 8px;
        background-color: rgba(204, 145, 69, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
        text-align: center;
        font-family: Microsoft Yahei;
        border: 0px;
        /*border: 1px solid rgba(255, 255, 255, 0);*/
      }
    }

  }
</style>
