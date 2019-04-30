<template>
  <div class="order-page">
    <el-row>
      <router-view></router-view>
    </el-row>
    <el-row>
      <div v-if="steps<3" class="steps-btn">
        <!-- <el-button type="success" @click="prev">上一步</el-button> -->
        <el-button type="success" @click="next">下一步</el-button>
      </div>
      <div v-else class="back">
        <router-link to="/">
          <el-button type="success">完成并返回首页</el-button>
        </router-link>
      </div>
      <el-steps :active="steps" align-center finish-status="success">
        <el-step title="步骤1" description="创建订单"></el-step>
        <el-step title="步骤2" description="订单创建成功"></el-step>
        <el-step title="步骤3" description="等待老师上门授课"></el-step>
      </el-steps>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: 0,
      routerList:['orderStep1','orderOk','waiting']
    };
  },
  methods: {
    // prev() {
    //   if (this.steps > 0) {
    //     this.steps -= 1;
    //     this.$router.push(this.routerList[this.steps])
    //   }
    // },
    next() {
      if (this.steps < 3) {
        this.steps += 1;
        this.$router.push(this.routerList[this.steps])
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/order.scss";
</style>