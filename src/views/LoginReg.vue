<template>
  <div class="main">
    <div class="login">
      <div class="login-left">
        <img src="../assets/login_left.png" alt="登录"/>
      </div>
      <div class="login-right">
        <div class="title">
          <div class="titlt-img" style="float: left">
            <img src="../assets/pathroot.png" alt=""/>
          </div>
          <div class="titlt-cot" style="float: left">博客</div>
        </div>
        <div class="line">
          <hr/>
        </div>
        <div class="register">注册</div>
        <div class="login-input">
          <Input
            prefix="ios-person-outline"
            placeholder="请输入账号"
            style="width: auto"
            type="text"
            v-model="account"
          />
          <Input
            prefix="ios-lock-outline"
            placeholder="请输入密码"
            style="width: auto"
            type="password"
            v-model="password"
          />
        </div>
        <div class="login-butt">
          <button id="reg-butt" v-on:click="onReg">立即注册</button>
        </div>
        <div class="tips">已有账号 <a href="">立即登录</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from "@/router";

  var regs = {
    account: "",
    password: "",
  };
  export default {
    data() {
      return {
        single: null,
        account: "",
        password: "",
      };
    },
    methods: {
      //按钮
      onReg() {
        (regs.account = this.account), (regs.password = this.password);
        this.$axios.post("api/user/register", regs).then((res) => {
          console.log(res.data);
          if(res.data.code==200){
            router.push("/")
          }
          else{
            alert("failed")
          }
        });
      },
    },
  };
</script>

<style scoped>
  .login
  {
    text-align: center;
  }
  html,
  head,
  body {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .main > div {
    margin: 10% auto;
    width: 1000px;
    height: 540px;
    background-color: #ffffff;
    box-shadow: 0px 0px 36px 0px rgba(109, 152, 249, 0.16);
    border-radius: 12px;
  }

  .login-left {
    float: left;
  }

  .login-right {
    width: 50%;
    float: right;
  }

  .title {
    width: 120px;
    height: 38px;
    position: relative;
    margin: 10% auto 10%;
  }

  .titlt-cot {
    width: 70px;
    height: 28px;
    font-family: Source Han Sans CN;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #333333;
    margin: 8px;
  }

  .line {
    width: 360px;
    margin: auto;
  }

  .titlt-img > img {
    width: 32px;
    height: 38px;
  }

  .login-input {
    margin: 5% 0 4% 0;
  }

  .login-input
  > div.ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type-text
  > input {
    width: 360px;
    height: 40px;
    margin-bottom: 5%;
  }

  .login-input
  > div.ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type-password
  > input {
    width: 360px;
    height: 40px;
  }

  #register {
    margin-left: 35%;
  }

  .register {
    width: 180px;
    height: 23px;
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 2px;
    color: #333333;
    margin: 5% 0 0;
  }

  .tips {
    margin: 3% 0 0;
  }

  #reg-butt {

  }
</style>
