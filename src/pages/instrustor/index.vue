<template>
  <div class="instructor-toueist">
    <div class="containes" >
      <div class="content">
        {{content }}
      </div>
      <button class="menuss" @getuserinfo="scanCode" open-type="getUserInfo"  hover-class="hoverNone" hover-stay-time="800">扫码</button>
      <button class="menuss hide"  :class="{show:show==true}" @click="ImmediateUse">立即使用</button>
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    .containes{
      width: calc(100% - 50px);
      height: 100%;
      margin: 0 auto;
      .content{
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 20px;
        height: 60%;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
      }
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
      button.hide{
        display: none;
      }
      button.show{
        display:block;
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
        show:false,
        content:'',
        mapId:''
      }
    },
    onLoad(option){
      console.log(option)

    },
    onShow(){
      var that = this;
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            utils.login(that, function (sessionID) {

            })
          }else{
            wx.redirectTo({
              url: '/pages/authorize/main'
            })
          }
        }
      })
    },
    computed: {

    },
    methods: {
      scanCode(){
        var that = this;
        wx.scanCode({
          // onlyFromCamera: true,
          success (res) {
            console.log(res)
            if(res.result){
                that.mapId = res.result;
                wx.request({
                  url:that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationScan",
                  method: "POST",
                  data: {
                    mapId: res.result,
                    sessionID: that.$store.state.board.sessionID
                  },
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    console.log(res)
                    if (res.data.success) {
                      that.show = true;
                        that.content = res.data.msg;
                    }else{
                      wx.showToast({
                        title:res.data.msg,
                        icon: 'none',
                        duration: 1500
                      })
                    }
                  }
                })


            }
          }
        });

      },
      ImmediateUse(){
        var that = this;
        wx.request({
          url:that.$store.state.board.urlHttp + "/wechatapi/wsva/execuVerificationUse",
          method: "POST",
          data: {
            mapId:  that.mapId,
            sessionID: that.$store.state.board.sessionID
          },
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            that.show = false;
            if (res.data.success) {
              wx.showToast({
                title:res.data.msg,
                icon: 'none',
                duration: 1500
              })
            }else{
              that.content ="";
              wx.showToast({
                title:"使用失败，请重新扫码。",
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
