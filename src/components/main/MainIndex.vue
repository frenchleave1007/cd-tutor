<template>
  <div class="main">
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="10">
        <div class="gold-teacher">
          <img src="../../../static/images/goldcup.svg" alt>
          <span>金牌讲师</span>
          <img src="../../../static/images/goldcup.svg" alt>
        </div>
        <div class="teacher">
            <img src="http://www.jiajiao114.com/images/w_default_avatar.jpg" alt="">
            <p class="teacher-name">老师名字</p>
            <p class="edu">学历 | 教龄</p>
            <p class="dis">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
        </div>
        <div class="teacher">
            <img src="http://www.jiajiao114.com/images/w_default_avatar.jpg" alt="">
            <p class="teacher-name">老师名字</p>
            <p class="edu">学历 | 教龄</p>
            <p class="dis">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
        </div>
        <div class="teacher">
            <img src="http://www.jiajiao114.com/images/w_default_avatar.jpg" alt="">
            <p class="teacher-name">老师名字</p>
            <p class="edu">学历 | 教龄</p>
            <p class="dis">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <total-info />
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