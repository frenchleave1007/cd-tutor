<template>
  <div class="backstage">
    <el-col :span="4" class="left" style="min-width: 140px;">
      <el-menu :default-openeds="this.handleOpen()"  :unique-opened="true" router class="el-menu-vertical-demo"
      @open="handleOpen">
        <el-menu-item index="totalInfo">
          <i class="el-icon-view"></i>数据总览
        </el-menu-item>
        <el-submenu index="userManage">
          <template slot="title">
            <i class="el-icon-setting"></i>用户管理
          </template>
          <el-menu-item index="userInfo">所有用户</el-menu-item>
        </el-submenu>
        <el-submenu index="infoManage">
          <template slot="title">
            <i class="el-icon-edit"></i>发布信息管理
          </template>
          <el-menu-item index="teacherInfo">教师信息发布</el-menu-item>
          <el-menu-item index="parentInfo">家长信息发布</el-menu-item>
        </el-submenu>
        <el-submenu index="order">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>订单管理
          </template>
          <el-menu-item index="orderManage">订单管理</el-menu-item>
        </el-submenu>
        <el-submenu index="admin">
          <template slot="title">
            <i class="el-icon-star-off"></i>管理员管理
          </template>
          <el-menu-item index="adminManage">管理员总览</el-menu-item>
          <el-menu-item index="addAdmin">管理员添加</el-menu-item>
        </el-submenu>
        <el-submenu index="about">
          <template slot="title">
            <i class="el-icon-info"></i>关于
          </template>
          <el-menu-item index="about">关于</el-menu-item>
        </el-submenu>
        <el-menu-item index="/mainIndex">
          <i class="el-icon-back"></i>
          返回主界面
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="right">
      <el-row class="right-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/bgIndex">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="admin">
          <el-col :span="8">
            <!-- <img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt> -->
          </el-col>
          <el-col :span="8">
            <p>
              你好!
              <span>{{getAdminName}}</span>
            </p>
            <p>编号：{{getAdminNum}}</p>
          </el-col>
          <el-col :span="8">
            <el-button @click="adminLogout">退出</el-button>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <router-view/>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentList: []
    };
  },
  methods: {
    adminLogout() {
      this.axios.get("/api/adminLogout").then(response => {
        if (response.data.status == "ok") {
          // window.location.href = response.data.url;
          this.$router.push("/bgLogin");
          sessionStorage.removeItem("adminNum");
          sessionStorage.removeItem("adminName");
        }
      });
    },
    handleOpen(key,keyPath){
      return keyPath
    }
  },
  computed: {
    getAdminNum() {
      return sessionStorage.adminNum;
    },
    getAdminName() {
      return sessionStorage.adminName;
    },
    defaultActive: function() {
      console.log(this.$route.path.replace("/bgIndex/", ""));
      this.$route.path.replace("/bgIndex/", "");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/bgIndex.scss";
</style>