<template>
  <div class="search">
    <div>
      <el-radio-group v-model="type" class="search-type" size="medium" fill="#67C23A">
        <el-radio-button label="课程名称"></el-radio-button>
        <el-radio-button :label="radio == '搜教师'?'教师名称':'家长名称'"></el-radio-button>
        <el-radio-button label="教学地点"></el-radio-button>
      </el-radio-group>

      <el-input v-model="key" placeholder="请输入搜索的关键字" class="input">
        <i slot="prefix" class="el-input__icon el-icon-edit" clearable></i>
      </el-input>
      <router-link v-if="radio == '搜教师'" :to="{name:'teacherlist',query:{type:type,key:key}}">
        <el-button type="success" class="search-btn">搜索</el-button>
      </router-link>
      <router-link v-if="radio == '搜家长'" :to="{name:'parentlist',query:{type:type,key:key}}">
        <el-button type="success" class="search-btn">搜索</el-button>
      </router-link>
      <el-radio-group v-model="radio" class="search-type" size="medium" fill="#67C23A">
        <el-radio-button label="搜教师"></el-radio-button>
        <el-radio-button label="搜家长"></el-radio-button>
      </el-radio-group>
    </div>
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
      key: "",
      type: "课程名称",
      radio: "搜教师"
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/css/header/search.scss";
</style>