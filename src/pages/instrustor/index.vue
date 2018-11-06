<template>
  <div class="instructor-toueist">
    <div class="containes" >
      <div class="content">
        {{content }}
      </div>
      <button class="menuss" @click="scanCode">扫码</button>
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
        content:'扫码内容'
      }
    },
    onLoad(option){
      console.log(option)

    },
    computed: {

    },
    methods: {
      scanCode(){
        var that = this;
        that.show = false;
        // 只允许从相机扫码
        wx.scanCode({
          // onlyFromCamera: true,
          success (res) {
            console.log(res)
            if(res.result){
              that.show = true;
              that.content = res.result;

            }
          }
        })
      },
      ImmediateUse(){

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
