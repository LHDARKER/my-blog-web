<template>
  <div class="layout">
    <Layout>
      <Header class="head">
        <Menu mode="horizontal" theme="light" active-name="1">
                    <span class="layout-logo">
                        <img src="../assets/pathroot.png"/>
                        <Divider type="vertical"/>
                    </span>
          <Breadcrumb separator=">" class="layout-text">
            <BreadcrumbItem to="/Home">Home</BreadcrumbItem>
            <BreadcrumbItem>我的文章</BreadcrumbItem>
          </Breadcrumb>
          <div class="layout-search">
            <Input search placeholder="搜索文章"/>
          </div>
          <div class="layout-nav">
            <MenuItem name="1" class="item">
              <Icon type="md-add-circle" color="lighter blue" size="24"/>
            </MenuItem>
            <MenuItem name="2" class="item">
              <Icon type="md-notifications" size="24"/>
            </MenuItem>
            <MenuItem name="3" class="item">
              <Icon type="md-settings" size="24"/>
            </MenuItem>
            <Divider type="vertical"/>
            <span class="username">
                            <Icon type="md-person" size="24"/>
                            <span>user.name</span>
                        </span>
          </div>
        </Menu>
      </Header>
      <div class="mid">
        <div v-for="item in data" :key="item.index">
          <div>
            <h1 class="midtitle">{{item.title}}</h1>
            <div v-if="item.imgsrc!==null">
              <div class="leftpic">
                <img src="require('../assets/'+item.imgsrc+'.png')" class="leftimg">
              </div>
            </div>
            <div v-else></div>
            <div class="middes">
              {{item.description}}
            </div>
            <div class="leftmess">
              <Icon type="ios-person-outline"/>
              <span>我不是大神</span>
              <Icon type="ios-time-outline"/>
              <span>2019-10-24 09:25</span>
            </div>
            <div class="rightmess">
              <Icon type="ios-eye-outline"/>
              500
              <Icon type="ios-chatbubbles-outline"/>
              166
              <Icon type="ios-thumbs-up-outline"/>
              241
            </div>
          </div>
          <Divider/>
        </div>
        <Page :total="10" class="page"/>
      </div>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "Mine",
    data() {
      return {
        data: [
          {
            index: 1,
            title: '面向对象、构造函数、原型与原型链1',
            description: '如果要我总结一下学习前端以来我遇到了哪些瓶颈，那么面向对象一定是第一个毫不犹豫想到的。尽管我现在对于面向\n' +
              '对象有了一些的了解，但是当初的那种似懂非懂的痛苦，依然历历在目。为了帮助大家能够更加直观的学习和了解面向\n' +
              '对象，我会用尽量简单易懂的描述来展示面向对象的相关知识。',
            imgsrc: null
          },
          {
            index: 2,
            title: 'Oracle创建数据库(数据库表空间)、表和用户',
            description: '1、Oracle创建数据库表空间思路分析 创建两个数据库的文件 创建用户与上面创建的文件形成映射关系给用户添加权限 一创建两个数据库的文件（monitor.dbf monitor_temp.dbf 两个文件）二、创建用户与上面创建的文件形成映射关系用户名为monitor，创建用户与上面创建的文件形成映射关系用户名为monitor,密码为mon...',
            imgsrc: 'pic26'
          },
          {
            index: 3,
            title: '面向对象、构造函数、原型与原型链2',
            description: '如果要我总结一下学习前端以来我遇到了哪些瓶颈，那么面向对象一定是第一个毫不犹豫想到的。尽管我现在对于面向\n' +
              '对象有了一些的了解，但是当初的那种似懂非懂的痛苦，依然历历在目。为了帮助大家能够更加直观的学习和了解面向\n' +
              '对象，我会用尽量简单易懂的描述来展示面向对象的相关知识。',
            imgsrc: null
          },
          {
            index: 4,
            title: '这里是文档名称这里是文档名称这里是文档名称',
            description: '1、Oracle创建数据库表空间思路分析 创建两个数据库的文件 创建用户与上面创建的文件形成映射关系给用户添加权限 一创建两个数据库的文件（monitor.dbf monitor_temp.dbf 两个文件）二、创建用户与上面创建的文件形成映射关系用户名为monitor，创建用户与上面创建的文件形成映射关系用户名为monitor,密码为mon...',
            imgsrc: null
          },
        ]
      }
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
  .layout-logo {
    width: 50px;
    float: left;
    position: relative;
    margin-top: 8px;
    margin-left: 28px;
    border-right: 1px solid #2c3e50;
    height: 42px;
  }

  .layout-text {
    float: left;
    position: relative;
    top: 18px;
    left: 25px;
    width: 200px;
    height: 20px;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #333333;
    padding: 0 5px;
  }

  .layout-search {
    width: 200px;
    height: 32px;
    position: relative;
    margin-left: 660px;
    display: block;
    float: left;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 10px;
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
    width: 150px;
    margin-bottom: 41px;
  }
</style>
