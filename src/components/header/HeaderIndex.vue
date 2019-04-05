<template>
  <div class="header">
    <div class="headerBg">
      <el-row class="header-row1">
        <div class="header-login">
          <el-col class="header-left" :span="12">
            <span>欢迎你！</span>
            <router-link tag="a" :to="{name:'login'}">立即登录</router-link>
            <router-link tag="a" :to="{name:'register'}">免费注册</router-link>
          </el-col>
          <el-col class="header-right" :span="12">
            <span>我是老师</span>
            <router-link tag="a" :to="{name:'publish'}">我的发布</router-link>
            <router-link tag="a" :to="{name:'information'}">信息修改</router-link>
            <router-link tag="a" :to="{name:''}">我的订单</router-link>
            <span class="hot-call">家教热线：400-400-400</span>
          </el-col>
        </div>
      </el-row>
    </div>
    <el-row class="header-row2">
      <el-col :span="5">
        <div class="logo">
          <router-link to="/">
            <img src="../../../static/images/logo.png" alt>
          </router-link>
        </div>
      </el-col>
      <el-col class="header-search" :span="14">
        <header-search/>
      </el-col>
      <el-col class="right-login" :span="5">
        <div class="loginPic">
          <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt>
          <p>Hi! 欢迎你!</p>
        </div>
        <div class="login-btn">
          <router-link :to="{name:'login'}">
            <el-button round>立即登录</el-button>
          </router-link>
          <router-link :to="{name:'register'}">
            <el-button round>免费注册</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderSearch from "@/components/header/HeaderSearch";
export default {
  components: {
    HeaderSearch
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/header.scss";
</style>