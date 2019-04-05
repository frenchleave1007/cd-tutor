<template>
  <div class="main-slider">
    <el-carousel>
      <el-carousel-item class="slider" v-for="(item,index) in sliderList" :key="index">
        <img :src="item" alt>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderList: [
        "../../../static/images/s1.png",
        "../../../static/images/s2.png",
        "../../../static/images/s3.png",
        "../../../static/images/s4.png",
      ]
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/slider.scss";
</style>