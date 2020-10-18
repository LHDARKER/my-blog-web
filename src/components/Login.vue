<template>
  <div class="main">
    <div class="login">
      <div class="login-left">
        <img src="../assets/login_left.png" alt="登录" />
      </div>
      <div class="login-right">
        <div class="title">
          <div class="titlt-img" style="float: left">
            <img src="../assets/pathroot.png" alt="" />
          </div>
          <div class="titlt-cot" style="float: left">博客</div>
        </div>
        <div class="line">
          <hr />
        </div>
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
        <div class="check">
          <Checkbox v-model="single" style="">记住密码</Checkbox>
          <router-link to="/register" id="register"
            >注册 | 忘记密码</router-link
          >
        </div>
        <div class="login-butt">
          <button id="but-in" v-on:click="onLog">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from "@/router";

  var logs = {
    account: "",
    password: "",
  };
export default {
  data(){
    return{
      single:null,
      account: "",
      password: "",
    }
  },
  methods:{
    onLog(){
      (logs.account = this.account), (logs.password = this.password);
      this.$axios.post("api/user/login", logs).then((res) => {
        console.log(res.data);
        if(res.data.code===200){
          console.log(res.data.body.account)
          console.log(res.data.body.uid)
          this.$router.push({
            "path":"/home",
             "query":{
            "userid":res.data.body.uid,
               "username":res.data.body.account,
          }
        })
        }
        else{
          alert("failed")
        }
      });
    },
  }
};
</script>
<style>
html,
head,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

/* body {
  background: url(../assets/login_back.png);
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
} */
.main{
  height: 100%;
  background: url(../assets/login_back.png);
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
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
  margin: 14% 0 4% 0;
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
.login-butt > button {
  width: 360px;
  height: 40px;
  background-color: #6d98f9;
  box-shadow: 0px 1px 6px 0px #ffffff;
  border-radius: 4px;
  color: #ffffff;
  border: none;
}
#but-in {
  margin-top: 5%;
}
</style>
