<template>
  <div class="main">
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="10">
        <div class="gold-teacher">
          <img src="../../../static/images/goldcup.svg" alt>
          <span>操作流程</span>
          <img src="../../../static/images/goldcup.svg" alt>
        </div>
        <div class="teacher">
          <i class="el-icon-search"></i>
          <p class="teacher-name">根据自己的需求查看并筛选教师或者家长</p>
        </div>
        <div class="jiantou">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="teacher">
          <i class="el-icon-phone-outline"></i>
          <p class="teacher-name">预约教师或家长，与之联系，自行商量后续问题</p>
        </div>
        <div class="jiantou">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="teacher">
          <i class="el-icon-edit-outline"></i>
          <p class="teacher-name">达成教学合作之后，等待教师上门教学</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <total-info/>
    </el-row>
  </div>
</template>

<script>
import Slider from "@/components/main/Slider";
import TotalInfo from "@/components/main/TotalInfo";
export default {
  components: {
    Slider,
    TotalInfo
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/main.scss";
</style>