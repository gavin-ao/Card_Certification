<template>
  <div class="instructor-toueist">
    <div class="containes">
      <div class="content">
        {{content }}
      </div>
      <!--<button class="menuss" @getuserinfo="scanCode" open-type="getUserInfo" hover-class="hoverNone"-->
              <!--hover-stay-time="800">扫码-->
      <!--</button>-->
      <div class="menu menuss hide" :class="{show:show==true}" @click="ImmediateUse">确认销券</div>
      <div class="menu menus hide" :class="{show:show==false}" disabled="disabled">已核销</div>
      <p class="text">卡券核销后不可撤回</p>
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    .containes {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      .content {
        height: 220px;
        width: 100%;
        background-color: #EAAB16;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        margin-bottom: 30px;
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
        font-family: PingFangSC-bold;
      }
      .menu{
        width: 335px;
        height: 50px;
        line-height: 50px;
        border-radius: 8px;
        font-size: 20px;
        text-align: center;
        margin: 0 auto;
        font-family: Microsoft Yahei;
        /*border: 1px solid rgba(255, 255, 255, 0);*/
        color: rgba(255, 255, 255, 1);
        border: 0px;
      }
      .menuss {
        background-color: rgba(3, 190, 0, 1);
      }
      .menus {
        background-color: rgba(208, 208, 208, 1);
      }
      div.hide {
        display: none;
      }
      div.show {
        display: block;
      }
      .text{
        width: 100%;
        height: 22px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.4);
        font-size: 16px;
        text-align: center;
        font-family: PingFangSC-regular;
        margin-top: 36px;

      }
    }
  }
</style>

<script>
  import utils from "../../utils/utils.js";

  export default {
    name: '',
    props: [],
    data() {
      return {
        show: '',
        content: '',
        mapId: ''
      }
    },
    onLoad(option) {
      console.log(option)
      var that = this;
      that.mapId = option.mapId;
      wx.request({
        url: that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationScan",
        method: "POST",
        data: {
          mapId: that.mapId,
          sessionID: that.$store.state.board.sessionID
        },
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            that.show = true;
            that.content = res.data.msg;
          } else {
            that.show = false;
            that.content = res.data.msg;
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })

    },
    onShow() {

    },
    computed: {},
    methods: {
      // scanCode() {
      //   var that = this;
      //   wx.scanCode({
      //     // onlyFromCamera: true,
      //     success(res) {
      //       console.log(res)
      //       if (res.result) {
      //         that.mapId = res.result;
      //         wx.request({
      //           url: that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationScan",
      //           method: "POST",
      //           data: {
      //             mapId: res.result,
      //             sessionID: that.$store.state.board.sessionID
      //           },
      //           header: {'content-type': 'application/x-www-form-urlencoded'},
      //           success: function (res) {
      //             console.log(res)
      //             if (res.data.success) {
      //               that.show = true;
      //               that.content = res.data.msg;
      //             } else {
      //               wx.showToast({
      //                 title: res.data.msg,
      //                 icon: 'none',
      //                 duration: 1500
      //               })
      //             }
      //           }
      //         })
      //
      //
      //       }
      //     }
      //   });
      //
      // },
      ImmediateUse() {
        var that = this;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationUse",
          method: "POST",
          data: {
            mapId: that.mapId,
            sessionID: that.$store.state.board.sessionID
          },
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              that.show = false;
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
            } else {
              that.content = "";
              wx.showToast({
                title: "使用失败，请重新扫码。",
                icon: 'none',
                duration: 1500
              })
            }
          }
        })
      }
    },
    created() {
    },
    mounted() {
      var that = this;

    },
    components: {}
  }
</script>
