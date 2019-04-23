<template>
  <div class="search">
    <el-radio-group v-model="radio" class="search-type" size="medium" fill="#67C23A">
      <el-radio-button label="课程名称"></el-radio-button>
      <el-radio-button label="教师名称"></el-radio-button>
      <el-radio-button label="教学阶段"></el-radio-button>
    </el-radio-group>
    <el-input v-model="input" placeholder="请输入内容" class="input">
      <i slot="prefix" class="el-input__icon el-icon-edit" clearable></i>
    </el-input>
    <el-button type="success" class="search-btn">搜索</el-button>
    <div class="choose">
      <div>
        <img src="../../../static/images/teacher.svg">
        <router-link to="beATeacher">
          <p>我要当老师</p>
        </router-link>
      </div>
      <div>
        <img src="../../../static/images/student.svg">
        <router-link to="foundTeacher">
          <p>马上找家教</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      radio: ""
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/search.scss";
</style>