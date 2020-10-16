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
            <BreadcrumbItem>文章详情</BreadcrumbItem>
            <BreadcrumbItem>编辑</BreadcrumbItem>
          </Breadcrumb>

          <div class="but">
            <Button type="info" ghost class="but1">删除</Button>
            <Button type="primary" class="but2">编辑</Button>
          </div><img src="../assets/Github.png" class="touxiang">
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

  export default {
    name: "WriteArticle",
    data: function () {
      return {
        Title: "",
        Content: "",
        // imgurl:'../assets/github.png'
      };
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

<style>
  html, body {
    height: 100%;
  }
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
  .touxiang{
    width: 41px;
    height: 41px;
    margin-top: 10px;
    margin-right: 20px;
    float: right;
  }
  .but {
    right: 15px;
    float: right;
  }

  .but2 {
    margin-left: 5px;
  }
  #edit > div > div > div.w-e-text-container{
    margin: 1% 20%;
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
    height: 100%;
  }
</style>
