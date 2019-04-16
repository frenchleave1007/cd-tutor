<template>
  <div class="backstage">
    <el-col :span="4" class="left" style="min-width: 140px;">
      <el-menu :default-openeds="['']">
        <el-menu-item index="totalInfo">
          <i class="el-icon-view"></i>数据总览
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>用户管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="infoList">所有用户</el-menu-item>
            <el-menu-item index="teacherInfoList">教师列表</el-menu-item>
            <el-menu-item index="parentInfoList">家长列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit"></i>发布信息管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="teacherMsg">教师信息发布</el-menu-item>
            <el-menu-item index="parentMsg">家长信息发布</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-picture"></i>用户头像管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="parentMsg">用户头像管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>订单管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="orderManage">订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-star-off"></i>管理员管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="adminManage">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-info"></i>关于
          </template>
          <el-menu-item-group>
            <el-menu-item index="about">关于</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" class="right">
      <el-row class="right-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/bgIndex">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="admin">
        <el-col :span="8">
          <img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt>
        </el-col>
        <el-col :span="12">
          <p>你好!</p>
          <p>你好你狠阿斯达四狠阿斯达四狠阿斯达四</p>
        </el-col>
        <el-col :span="4"></el-col>
      </div>
      </el-row>
      <el-row>
          <router-view />
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
  mounted() {
    this.axios.get("/getAllStudent").then(response => {
      let res = response.data;
      console.log(response.data);
      if (res) {
        this.studentList = res;
      } else {
        this.studentList = [];
      }
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/bgIndex.scss";
</style>