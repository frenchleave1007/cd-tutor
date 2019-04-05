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
    <!-- <div class="suggest">
      <p>热门搜索：</p>
      <p>
        <span class="hot-title">课程名称：</span>
        <a href="#" v-for="(item, index) in lessonList" :key="index">{{item}}</a>
      </p>
      <p>
        <span class="hot-title">教师名称：</span>
        <a href="#" v-for="(item, index) in teacherList" :key="index">{{item}}</a>
      </p>
      <p>
        <span class="hot-title">教学阶段：</span>
        <a href="#" v-for="(item, index) in timeList" :key="index">{{item}}</a>
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      radio:'',
      lessonList:['数学','数学','数学','数学','数学','数学','数学'],
      teacherList:['数学','数学','数学','数学','数学','数学','数学'],
      timeList:['数学','数学','数学','数学','数学','数学','数学']
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/css/header/search.scss'
</style>