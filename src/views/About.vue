<template>
  <div class="layout1">
    <Layout>
      <Header class="head">
        <Menu mode="horizontal" theme="light" active-name="1">
                    <span class="layout-logo">
                        <img src="../assets/pathroot.png"/>
                    </span>
          <Breadcrumb separator=">" class="layout-text1">
            <BreadcrumbItem to="/Home">Home</BreadcrumbItem>
            <BreadcrumbItem to="/content">文章详情</BreadcrumbItem>
            <BreadcrumbItem>编辑</BreadcrumbItem>
          </Breadcrumb>
          <div class="cbut" v-if="this.arcid==null">
            <Button type="info" ghost class="cbut1" @click="onDelete">删除</Button>
            <Button type="primary" class="cbut2" @click="onCreated">新建</Button>
          </div>
            <div v-else  class="cbut">
              <Button type="info" ghost class="cbut1" @click="onDelete">返回</Button>
              <Button type="primary" class="cbut2" @click="onRerite(arcid)">修改</Button>
            </div>
          <img src="../assets/Github.png" class="touxiang">
        </Menu>
      </Header>

    </Layout>
    <div id="edit">
      <div class="ArticleDetail">
        <div ref="editor" style="text-align: left"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import E from "wangeditor";

  var editor;
  var arcs = {
    title:"",
    content:"",
    uid:"",
    accountId:"",
    isdisDeleted:"",
  };

  export default {
    name: "WriteArticle",
    data: function () {
      return {
        username:this.$route.query.username,
        accountId:this.$route.query.userid,
        arcid:this.$route.query.arcid,
        title: "",
        Content: "",
      };
    },
    methods:{
      onDelete(){
        this.$router.push({
          "path": "/home",
          "query": {
            "userid": this.accountId,
            "username": this.username,
          }
        })
      },
      onCreated(){
        var htmlcode=editor.txt.html()
        var title = document.getElementsByTagName('h1')
        var content=document.getElementsByTagName('p')
        arcs.title=title[1].innerText
        arcs.content=content[2].innerText
        arcs.accountId=this.accountId
        console.log( this.accountId);

        this.$axios.post("api/article/addarticle",arcs).then((res) => {
          console.log( "isdata",res.data);
          this.$router.push({
            "path":"/mine",
            "query":{
              "userid":this.accountId,
              "username":this.username,
            }
          })
        });
      },
      onRerite(uid){
        var htmlcode=editor.txt.html()
        var title = document.getElementsByTagName('h1')
        var content=document.getElementsByTagName('p')
        arcs.title=title[1].innerText
        arcs.content=content[2].innerText
        arcs.accountId=this.accountId
        arcs.uid=uid
        arcs.isdisDeleted=0//无法赋值
        console.log(arcs.data);
        console.log(uid);
        this.$axios.post("api/article/modifyarticle",arcs).then((res) => {
          console.log( "isdata",res.data);
          alert("修改成功")
          this.$router.push({
            "path":"/home",
            "query":{
              "userid":this.accountId,
              "username":this.username,
            }
          })
        });
      },


    },
    mounted: function () {
      var That = this;
      editor = new E(this.$refs.editor);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer: "/api/UploadImg", // 上传图片到服务器
        uploadFileName: "Content", //后端使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.create();
    },
  };
</script>

<style >
  .layout1 {
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
  .layout-logo {
    width: 50px;
    float: left;
    position: relative;
    margin-top: 8px;
    margin-left: 28px;
    border-right: 1px solid #2c3e50;
    height: 42px;
  }

  .layout-text1 {
    float: left;
    position: relative;
    top: 18px;
    left: 25px;
    width: 280px;
    height: 20px;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #333333;
    padding: 0 5px;
  }
  .cbut {
    float: right;
  }
  .cbut2 {
      margin-left: 5px;
  }
  .touxiang{
    width: 41px;
    height: 41px;
    margin-top: 10px;
    margin-right: 20px;
    float: right;
  }
  #edit > div > div > div.w-e-text-container{
    margin: 1% 20% !important;
    border: 2px solid #c9d8db !important;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    height: 90% !important;
  }

  #edit > div > div > div.w-e-toolbar > div:nth-child(1) {
    margin-left: 15%;
  }

  #edit > div > div > div.w-e-text-container > div:nth-child(1) > h1,
  #edit > div > div > div.w-e-text-container > div:nth-child(1) > h2,
  #edit > div > div > div.w-e-text-container > div:nth-child(1) > h3,
  #edit > div > div > div.w-e-text-container > div:nth-child(1) > h4,
  #edit > div > div > div.w-e-text-container > div:nth-child(1) > h5 {
    border-bottom: 1px solid #c9d8db;
  }

  #edit,
  #edit > div.ArticleDetail,
  #edit > div.ArticleDetail > div {
    height: 90%;
  }
</style>
