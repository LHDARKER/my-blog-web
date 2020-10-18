<template>
  <div class="layout">
    <Layout>
      <Header class="head">
        <Menu mode="horizontal" theme="light" active-name="1">
          <div class="layout-logo1">
            <img src="../assets/pathroot.png" />
          </div>
          <div class="layout-text">博客</div>
          <div class="layout-search">
            <Input search placeholder="搜索文章" />
          </div>
          <div class="layout-nav">
            <MenuItem name="1" class="item">
              <Button type="text" v-on:click="onAbout"><Icon type="md-add-circle" color="lighter blue" size="24"/></Button>
            </MenuItem>
            <MenuItem name="2" class="item">
              <Button type="text" ><Icon type="md-notifications" size="24"/></Button>
            </MenuItem>
            <MenuItem name="3" class="item">
              <Icon type="md-settings" size="24"/>
            </MenuItem>
            <Divider type="vertical"/>
            <span class="username">
              <Button type="text" v-on:click="onMine"><Icon type="md-person" size="24"/></Button>
                            <span>{{username}}</span>
                        </span>
          </div>
        </Menu>
      </Header>
      <div class="mid">
        <div v-for="item in data" :key="item.uid">
          <div>
            <h1 class="midtitle" v-on:click="onContent(item.uid)">{{ item.title }}</h1>
            <div>
              <div class="leftpic" v-if="item.thumbnail!=null">
                <img :src="require('../assets/pic26.png')" class="leftimg">
              </div>
              <div v-else></div>
            </div>
            <div class="middes">
              {{ item.content }}
            </div>
            <div class="leftmess">
              <Icon type="ios-person-outline" />
              <span>{{item.accountId}}</span>
              <Icon type="ios-time-outline" />
              <span>{{ item.createDate }}</span>
            </div>
            <div class="rightmess">
              <Icon type="ios-eye-outline"/>
              {{item.viewNum}}
              <Icon type="ios-chatbubbles-outline"/>
              {{item.commentNum}}
              <Icon type="ios-thumbs-up-outline"/>
              {{item.likeNum}}
            </div>
          </div>
          <Divider />
        </div>
        <Page :total="100" class="page" @on-change="onchange"/>
      </div>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        username:this.$route.query.username,
        userid:this.$route.query.userid,
        data: [
          
        ],
        pagenum:2
      };
    },
    methods:{
      onchange(pagenum){
        console.log("当前页面为：",pagenum)
        this.pagenum=pagenum
        var params = new URLSearchParams();
        params.append('page', pagenum);
        params.append('size', 3);
        this.$axios.post("api/article/findallarticles",params).then((res) => {
          this.data=res.data.body.content
        console.log( "isdata",this.data);
        console.log( "isdata",this.data.length);
      });
      },
      onMine(){
        console.log(this.userid)
        console.log(this.username)
        this.$router.push({
          "path":"/mine",
          "query":{
            "userid":this.userid,
            "username":this.username,
          }
        })
      },
      onAbout(){
        console.log(this.userid)
        console.log(this.username)
        this.$router.push({
          "path":"/about",
          "query":{
            "userid":this.userid,
            "username":this.username,
          }
        })
      },
      onContent(index){
        console.log(this.userid)
        console.log(this.username)
        console.log(index)
        this.$router.push({
          "path":"/content",
          "query":{
            "userid":this.userid,
            "username":this.username,
            "arcid":index,
          }
        })
      },

    },
     mounted() {
      // console.log("datais:",this.data)
      var params = new URLSearchParams();
        params.append('page', 1);
        params.append('size', 3);
        this.$axios.post("api/article/findallarticles",params).then((res) => {
          this.data=res.data.body.content
        console.log( "isdata",this.data);
        console.log( "isdata",this.data.length);
      });

}

  }
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 100%;
  width: 100%;
}

.head {
  width: 100%;
  height: 60px !important;
  background-color: #ffffff !important;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
}
.layout-logo1 {
  width: 50px;
  float: left;
  position: relative;
  margin-top: 8px;
  left: 20px;
  height: 42px;
}

.layout-text {
  float: left;
  position: relative;
  top: 18px;
  left: 25px;
  overflow: hidden;
  width: 55px;
  height: 20px;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 1px;
  color: #333333;
}

.layout-search {
  width: 200px;
  height: 32px;
  position: relative;
  margin-left: 750px;
  display: block;
  float: left;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.username {
  width: 100%;
  height: 18px;
  font-family: Microsoft YaHei UI, serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 1px;
  color: #666666;
  padding-top: 19px;
  margin-left: 15px;
}

.mid {
  width: 890px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 20px auto;
  padding: 0 50px;
}

.midtitle {
  width: 600px;
  height: 22px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 2px;
  color: #333333;
  margin-top: 30px;
  margin-bottom: 20px;
}

.middes {
  width: 810px;
  height: 74px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 28px;
  letter-spacing: 1px;
  color: #888888;
  margin-bottom: 50px;
}

.leftpic {
  float: left;
  width: 160px;
  height: 100px;
  margin-right: 10px;
}

.leftimg {
  width: 100%;
}

.leftmess {
  float: left;
  margin-bottom: 26px;
}

.rightmess {
  float: right;
  margin-bottom: 26px;
}

.page {
  float: right;
  width: auto;
  margin-bottom: 41px;
}
</style>
