<template>
  <div class="vist-userInfo">
    <div class="container">
      <div class="login-icon">
        <img class="login-img" src="/static/images/bg.png" alt="">
      </div>
      <div class="login-from">

        <!--账号-->
        <div class="inputView">
          <img class="nameImage" src="/static/images/user.png"/>
          <label class="loginLab">账号</label>
          <input class="inputText" placeholder="请输入账号" @input="phoneInput"/>
        </div>
        <div class="line"></div>

        <!--密码-->
        <div class="inputView">
          <img class="keyImage" src="/static/images/password.png"/>
          <label class="loginLab">密码</label>
          <input class="inputText" password="true" placeholder="请输入密码" @input="passwordInput"/>
        </div>

        <!--按钮-->
        <div class="loginBtnView">
          <button class="loginBtn" type="primary" @click="login">登录</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import utils from "../../utils/utils.js";
  import md5 from "../../utils/md5.js";

  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    onLoad(option) {

    },
    components: {},
    computed: {},
    methods: {


// 获取输入账号
      phoneInput: function (e) {
        this.userName = e.target.value.trim()
      },

      // 获取输入密码
      passwordInput: function (e) {
        this.password = e.target.value.trim()
      },

      // 登录
      login: function () {
        if (this.userName.length == 0 || this.password.length == 0) {
          wx.showToast({
            title: '用户名和密码不能为空',
            icon: 'none',
            duration: 2000
          })
        } else {
          var that = this;
          wx.request({
            url:that.$store.state.board.urlHttp + "/service/verification_login",
            method: "POST",
            data: {
              userName: that.userName,
              pwd: md5.hex_md5(that.password)
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                wx.setStorageSync("userName", that.userName);
                wx.setStorageSync("password", that.password);
                wx.setStorageSync("userId", res.data.userId);
                wx.setStorageSync("storeId", res.data.storeId);
                wx.navigateTo({
                  url: '/pages/wechatLogin/main'
                })
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })

        }


      }
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
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      box-sizing: border-box;
      background-color: #f2f2f2
    }

    /*登录图片*/
    .login-icon {
      flex: none;
    }
    .login-img {
      width: 750 rpx;
    }

    /*表单内容*/
    .login-from {
      flex: auto;
      width: 80%;
      margin: 0 auto;
      margin-top: 20px;
      /*height: 100%;*/
    }

    .inputView {
      background-color: #fff;
      line-height: 44px;
    }
    /*输入框*/
    .nameImage, .keyImage {
      margin-left: 22px;
      width: 14px;
      height: 14px
    }

    .loginLab {
      margin: 15px 15px 15px 10px;
      color: #545454;
      font-size: 14px
    }
    .inputText {
      /*flex: block;*/
      display: inline-block;
      float: right;
      /*text-align: right;*/
      /*margin-right: 22px;*/
      margin-top: 11px;
      color: #cccccc;
      font-size: 14px;
      width: 60%;
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: #cccccc;
      margin-top: 1px;
    }
    /*按钮*/
    .loginBtnView {
      width: 100%;
      height: auto;
      background-color: #f2f2f2;
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0px;
    }

    .loginBtn {
      width: 80%;
      margin-top: 35px;
    }

  }
</style>
