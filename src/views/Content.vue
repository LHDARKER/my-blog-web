<template>
  <div class="layout1">
    <Layout>
      <Header class="head">
        <Menu mode="horizontal" theme="light" active-name="1">
          <span class="layout-logo">
            <img src="../assets/pathroot.png" />
          </span>
          <Breadcrumb separator=">" class="layout-text1">
            <Button class="tohomebut" ghost  v-on:click="toHome"></Button>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>文章详情</BreadcrumbItem>
          </Breadcrumb>
          <div class="but">
            <Button type="info" ghost class="but1" v-on:click="onDelete(arcid)"
              >删除</Button
            >
            <Button type="primary" class="but2" v-on:click="onWrite(arcid)"
              >编辑</Button
            >
          </div>
        </Menu>
      </Header>

      <div id="content">
        <div class="con-title">
          <h1>{{this.title}}</h1>
        </div>
        <hr />
        <!--                  删不掉-->
        <div class="con-tag">
          标签：
          <Tag
            v-for="(item,id) in count"
                      :key="id"
            closable
            @on-close="handleClose2(item.uid)"
            >{{item.content}}
          </Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签
          </Button>
        </div>
        <div class="con-article">
          {{this.content}}
        </div>
        <div class="con-flie">
          附件：
          <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </div>
        <div class="con-author"></div>
        <div class="comment" >
          <div>
            <div class="area">评论区（ {{ contentnum }} ）</div>
          </div>
          <div>
            <div class="usercontent" v-for="(items, indexs) in usercontent" :key="indexs">
            <div class="avatar">
              <img src="../assets/login_left.png" alt="" />
              <div>{{ items.accountId }}</div>
              <div>{{ items.createDate }}</div>
            </div>
            <div class="contenttext">{{ items.content }}</div>
            <div class="reply">
              < <div
                    class="replyinfo"
                    v-for="(item, index) in items.reply"
                    :key="index"
            >
              {{ item.account }}：<span>{{ item.content }}</span>
            </div>
            </div>
              <p class="checkreply"  @click="onFindReply(indexs)">查看回复</p>
              <div class="contentlike">
                <img src="../assets/like.png" alt="点赞" />
                <span>点赞</span>
                <img src="../assets/comment.png" alt="评论" />
                <span>评论</span>
                <img
                        src="../assets/return.png"
                        alt="回复"
                        @click="handleRender(indexs)"
                />
                <span>回复</span>
                <img src="../assets/delete.png" alt="删除"
                     @click="handleDelete(indexs)"/>
                <span>删除</span>
              </div>
            </div>
          </div>
          <div>
            <div class="myavatar">
              <img src="../assets/login_left.png" alt="" />
              <div ref="editor" style="text-align: left"></div>
            </div>
            <div>
              <button class="butt butt1">确定</button>
              <button class="butt butt2" @click="onAddContent">确定</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>
<script>
import { Col } from 'view-design';
import E from "wangeditor";

var editor;
var arcs = {
  arcid: "",
};
var addcontent = {
  accountId: 0,
  articleId: 0,
  commentNum: 0,
  content: "",
  createDate: "",
  likeNum: 0,
  uid: 0,
};
var reply={
  "accountId": 0,
  "commentId": 0,
  "content": "string",
  "uid": 0
};
var label={
  articleId: 0,
  content:null
}
export default {
  data() {
    return {
      username: this.$route.query.username,
      userid: this.$route.query.userid,
      arcid: this.$route.query.arcid,
      title: "",
      content: "",
      count: [],
      value: '',
      contentnum: 1,
      usercontent: [

      ],
      userreply:[{

      }]
    };
  },
  methods: {
    handleAdd() {
      this.$Modal.confirm({
        render: (h) => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "Please enter your label...",
            },
            on: {
              input: (val) => {
                this.value = val;
              },
            },
          });
        },
        onOk: () => {
          label.articleId=this.arcid;
          label.content=this.value;
          console.log(this.value);
          this.$axios.post("api/label/addLabel",label).then((res) => {
            console.log("label back",res.data);
            var newlabels = new URLSearchParams();
            newlabels.append('aricleId', this.arcid);
            this.$axios.post("api/label/findarticlesbyuser",newlabels).then((res) => {
              console.log("labels",res.data);
              for(var i=0;i<res.data.body.length;i++){
                this.count[i]=res.data.body[i];
              }
              console.log("count",this.count);
              this.value=null;
              this.$forceUpdate();
            });
          });
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        },
      });
    },
    handleClose2(iuid) {
      console.log(iuid);
      var clolabels = new URLSearchParams();
      clolabels.append('uid',iuid);
      this.$axios.post("api/label/deleteLabel",clolabels).then((res) => {
        console.log("dellabels",res.data);
        console.log("delcount",this.count);
        var newlabels = new URLSearchParams();
        newlabels.append('aricleId', this.arcid);
        this.$axios.post("api/label/findarticlesbyuser",newlabels).then((res) => {
          console.log("labels",res.data);
          for(var i=0;i<res.data.body.length;i++){
            this.count[i]=res.data.body[i];
          }
          console.log("count",this.count);
          this.value=null;
          this.$forceUpdate();
          this.$router.go(0)
        });
      });
    },
    onDelete(uid) {
      arcs.arcid = this.arcid;
      console.log(arcs.arcid);
      console.log(uid);
      var deles = new URLSearchParams();
      deles.append("uid", uid);
      this.$axios.post("api/article/deletearticle", deles).then((res) => {
        this.data = res.data;
        console.log("isdata", this.data);
        alert("删除成功");
      });
      this.$router.push({
        path: "/home",
        query: {
          userid: this.userid,
          username: this.username,
        },
      });
    },
    onWrite(uid) {
      console.log(this.arcid);
      console.log(uid);
      this.$router.push({
        path: "/about",
        query: {
          userid: this.userid,
          username: this.username,
          arcid: this.arcid,
        },
      });
    },
    onAddContent() {
      (addcontent.accountId = this.username),
              (addcontent.articleId = this.arcid),
              (addcontent.content = editor.txt.text());
      var time = new Date();
      var times =
              time.getFullYear() +
              "-" +
              (time.getMonth() + 1) +
              "-" +
              time.getDate() +
              " " +
              time.getHours() +
              ":" +
              time.getMinutes() +
              ":" +
              time.getSeconds();
      // console.log(times);
      addcontent.createDate = times;
      this.$axios.post("api/comment/addComment", addcontent).then((res) => {
        // console.log(res.data);
        // window.onload.reload();
        this.value=null;
      });

    },
    toHome(){
      this.$router.push({
        "path":"/home",
        "query":{
          "userid":this.userid,
          "username":this.username,
        }
      })
    },
    handleRender(indexs) {
      this.$Modal.confirm({
        onOk: () => {
          // console.log("回复：", indexs);
          reply.accountId=this.userid;
          reply.content=this.value;
          reply.commentId=indexs;
          this.$axios.post("api/reply/addReply", reply).then((res) => {
            // console.log("回复：", res.data);
            this.$forceUpdate();
          });
          // this.$Message.info("Clicked cancel");
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        },
        render: (h) => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "Please enter your name...",
            },
            on: {
              input: (val) => {
                this.value = val;
              },
            },
          });
        },
      });
    },
    onFindReply(index){
      console.log(index)
      this.$axios.post("api/reply/findAllReplyid?commentId="+index).then((res) => {
        this.usercontent[index].reply=res.data.body
        console.log(this.usercontent[index])
        // console.log("查看回复", res.data.body);
        this.$forceUpdate();
      });
    },
  },
  mounted: function f1() {
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
    var arcid=this.$route.query.arcid;
    var params = new URLSearchParams();
    params.append('uid', arcid);
    // console.log("uid data",arcid);
    this.$axios.post("api/article/findartbyid1",params).then((res) => {
      this.data = res.data;
      console.log("uid data", this.data);
      // console.log(res.data.body[0].title);
      this.title=res.data.body[0].title;
      this.content=res.data.body[0].content;
    });

    var paramsarcid = new URLSearchParams();
    paramsarcid.append('articleId', arcid);
    this.$axios.post("api/comment/findartcomment2",paramsarcid).then((res) => {
      // console.log("comment：",res.data);
      this.usercontent = res.data.body;
    });


    var labels = new URLSearchParams();
    labels.append('aricleId', this.arcid);
    this.$axios.post("api/label/findarticlesbyuser",labels).then((res) => {
      console.log("labels",res.data);
      for(var i=0;i<res.data.body.length;i++){
        this.count[i]=res.data.body[i];
      }
      console.log("count",this.count);
      this.$forceUpdate();
    });
    
  }
};
</script>
<style>
html,
body {
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

.but {
  right: 15px;
  float: right;
}

.but2 {
  margin-left: 5px;
}

#content {
  width: 52%;
  /* background-color: aquamarine; */
  background-color: #ffffff;
  margin: auto;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

#content > div.con-tag > div,
#content > div.con-tag > button {
  border-radius: 30px;
}

.con-article > pre {
  margin: auto;
  /* width: 90%; */
  background-color: rgba(175, 174, 173, 0.178);
}

.con-article {
  word-wrap: break-word;
}

#content > div {
  padding: 2% 5%;
  text-align: left;
}

#content > div.con-article {
  padding: 0 5%;
}
.tohomebut{
  position: absolute;
  width: 41px;
  height: 25px;
  margin-bottom: 24px;
}
.layout1 * {
  text-align: left;
}

.usercontent {
  border-bottom: 1px solid #dde4eb;
}

.area {
  background-color: #f6f6f6;
  padding: 10px;
}
.avatar {
  height: 50px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}

.avatar img,
.myavatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100px;
  float: left;
}

.avatar > div {
  margin: 5px;
  float: left;
}

.myavatar {
  height: auto;
  padding: 20px 10px;
  width: 100%;
}

.myavatar img {
  margin: 10px 10px 10px 0;
}

.contentlike {
  padding: 20px 10px 10px 0;
}
.contenttext,
.contentlike {
  margin-left: 40px;
}

.contentlike span {
  margin-right: 15px;
}
.checkreply{
  margin: 15px 15px 5px 40px;
  color: #4c7ff7;
  cursor:pointer;
}

.reply{
  background-color: #f6f6f6;
  margin: 15px 15px 5px 40px;

}

.replyinfo{
  margin-top: 10px;
  color: #666666;

}


.replyinfo span{
  color: #333333;
}


.butt {
  width: 70px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
  flex: none;
  margin-left: 50px;
}

.butt1 {
  color: #cccccc;
  border: solid 1px #cccccc;
}

.butt2 {
  color: #fff;
  background-color: #6d98f9;
  border: none;
  margin-left: 10px;
}
.w-e-toolbar {
  flex-wrap: nowrap;
}
.w-e-text-container {
  margin-left: 40px !important;
}
</style>