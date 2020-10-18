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
          </Breadcrumb>
          <div class="but">
            <Button type="info" ghost class="but1" v-on:click="onDelete(arcid)">删除</Button>
            <Button type="primary" class="but2" v-on:click="onWrite(arcid)">编辑</Button>
          </div>
        </Menu>
      </Header>

      <div id="content">
        <div class="con-title">
          <h1>qweqwe</h1>
        </div>
        <hr/>
        <div class="con-tag">
          标签：
          <Tag
            v-for="item in count"
            :key="item"
            :name="item"
            closable
            @on-close="handleClose2"
          >{{ item }}
          </Tag
          >
          <Button icon="ios-add" type="dashed" size="small" @click="handleAdd"
          >添加标签
          </Button
          >
        </div>
        <div class="con-article">
          <p>
            seww</p>
          <pre><code>
function cool(x) {
  return x + 1;
}
</code></pre>
          <p>qweqweqweqeqweww</p>
          <pre><code>
function cool(x) {
  return x + 1;
}
</code></pre>
          <p>qweqweqweqeqweww</p>
          <pre><code>
function cool(x) {
  return x + 1;
}
</code></pre>
        </div>
        <div class="con-flie">
          附件：
          <Upload
            multiple
            action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </div>
        <div class="con-author"></div>
        <div class="comment">
          <List>
            <ListItem>
              <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                            title="张三" description="This is description, this is description."/>
            </ListItem>
            <ListItem>
              <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                            title="This is title" description="This is description, this is description."/>
            </ListItem>
            <ListItem>
              <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                            title="This is title" description="This is description, this is description."/>
              <template slot="action">
                <li>
                  <a href="">Edit</a>
                </li>
                <li>
                  <a href="">More</a>
                </li>
              </template>
            </ListItem>
          </List>
        </div>
      </div>
    </Layout>
  </div>
</template>
<script>
  import E from 'wangeditor'

  var editor;
  var arcs = {
      arcid: "",
  };
  export default {

    data() {
      return {
          username:this.$route.query.username,
          userid:this.$route.query.userid,
          arcid:this.$route.query.arcid,
        count: ["Java教程", "java编程基础"],
        Title: '',
        Content: ''

      };

    },
    methods: {
      handleAdd() {
        if (this.count.length) {
          this.count.push(this.count[this.count.length - 1] + 1);
        } else {
          this.count.push(0);
        }
      },
      handleClose2(event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
      },
        onDelete(uid){
            arcs.arcid=this.arcid
            console.log(arcs.arcid)
            console.log(uid)
            var deles = new URLSearchParams();
            deles.append('uid',uid);
            this.$axios.post("api/article/deletearticle",deles).then((res) => {
                this.data=res.data
                console.log( "isdata",this.data);
                alert("删除成功")
            })
            this.$router.push({
                "path":"/home",
                "query":{
                    "userid":this.userid,
                    "username":this.username,
                }
            })
        },
        onWrite(uid){
        console.log(this.arcid)
          console.log(uid)
            this.$router.push({
                "path":"/about",
                "query":{
                    "userid":this.userid,
                    "username":this.username,
                    "arcid":this.arcid,
                }
            })
        },
    },
    mounted: function () {
      var That = this;
      editor = new E(this.$refs.editor);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html
        },
        uploadImgServer: '/api/UploadImg', // 上传图片到服务器
        uploadFileName: 'Content', //后端使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      }
      editor.create()
    }
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
</style>
