<template>
  <div class="loginin">
    <Login/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Login from '@/components/Login.vue'

  export default {
    name: 'LoginIn',
    components: {
      Login
    }
  }
</script>
<style scoped>
  #app{
    text-align: center;
  }
  .loginin
  {
    text-align: center;
  }
  html, head, body {
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
    margin: 8px

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
    margin: 14% 0 4% 0;

  }

  .login-input > div.ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type-text > input {
    width: 360px;
    height: 40px;
    margin-bottom: 5%;
  }

  .login-input > div.ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type-password > input {
    width: 360px;
    height: 40px;
  }

  .login-butt > button {
    margin-top: 5%;
    width: 360px;
    height: 40px;
    background-color: #6d98f9;
    box-shadow: 0px 1px 6px 0px #ffffff;
    border-radius: 4px;
    color: #ffffff;

  }

  #register {
    margin-left: 35%;

  }
</style>
