<template>
  <div class="header">
    <div class="headerBg">
      <el-row class="header-row1">
        <div class="header-login">
          <el-col class="header-left" :span="12">
            <span>欢迎你！</span>
            <span v-if="!flag" class="userName">{{userName}}</span>
            <router-link v-if="flag" tag="a" :to="{name:'login'}">立即登录</router-link>
            <router-link v-if="flag" tag="a" :to="{name:'register'}">免费注册</router-link>
          </el-col>
          <el-col class="header-right" :span="12">
            <router-link v-if="!flag" tag="a" :to="{name:'publish'}">我的发布</router-link>
            <router-link v-if="!flag" tag="a" :to="{name:'infoChange'}">信息修改</router-link>
            <router-link v-if="!flag" tag="a" :to="{name:''}">我的订单</router-link>
            <span class="logout" v-if="!flag" @click="userLogout">退出登录</span>
            <span class="hot-call">家教热线：400-400-400</span>
          </el-col>
        </div>
      </el-row>
    </div>
    <el-row class="header-row2">
      <el-col :span="5">
        <div class="logo">
          <router-link to="/">
            <img src="../../../static/images/logo.png">
          </router-link>
        </div>
      </el-col>
      <el-col class="header-search" :span="14">
        <header-search/>
      </el-col>
      <el-col class="right-login" :span="5">
        <div class="loginPic">
          <img :src="userPic == 'null' ? '../../../static/images/default.jpg' : '/' + userPic">
          <p>Hi! 欢迎你!</p>
        </div>
        <div class="login-btn">
          <router-link v-if="flag" :to="{name:'login'}">
            <el-button round>立即登录</el-button>
          </router-link>
          <router-link v-if="flag" :to="{name:'register'}">
            <el-button round>免费注册</el-button>
          </router-link>
          <p v-if="!flag">{{userName}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderSearch from "@/components/header/HeaderSearch";
export default {
  data() {
    return {
      userName: "",
      userPhone: "",
      userPic: "null",
      flag: true
    };
  },
  components: {
    HeaderSearch
  },
  created() {
    if (sessionStorage.userName) {
      this.flag = false;
      this.userName = sessionStorage.userName;
      this.userPhone = sessionStorage.userPhone;
      this.userPic = sessionStorage.userPic;
    }
  },
  methods: {
    userLogout() {
      this.flag = true;
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userPhone");
      sessionStorage.removeItem("userPic");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/header.scss";
</style>