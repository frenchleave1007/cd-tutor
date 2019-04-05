<template>
  <div class="footer">
    <div class="footer-list">
      <el-row>
        <el-col :span="5">
          <img src="../../../static/images/logo.png" alt="cd-tutor" class="footer-logo">
        </el-col>
        <el-col :span="5">
          <dl>
            <dt>找家教</dt>
            <dd>怎么找？</dd>
            <dd>多少钱？</dd>
            <dd>靠谱吗？</dd>
          </dl>
        </el-col>
        <el-col :span="5">
          <dl>
            <dt>当老师</dt>
            <dd>怎么当？</dd>
            <dd>多少钱？</dd>
            <dd>靠谱吗？</dd>
          </dl>
        </el-col>
        <el-col :span="5">
          <dl>
            <dt>关于</dt>
            <dd>团队介绍</dd>
            <dd>隐私保护说明</dd>
            <dd>联系我们</dd>
          </dl>
        </el-col>
        <el-col :span="4" class="kefu">
          <img src="../../../static/images/kefu.svg" alt>
          <p>直接联系:123123123</p>
          <p>客服时间：23:59-00:00</p>
        </el-col>
      </el-row>
    </div>
    <div class="copy">
      <p>合作联系：frenchl1007@qq.com</p>
      <p>Copyright © 2019 cd-tutor. Powered By Frenchleave</p>
      <router-link tag="a" to="/">@cd-tutor</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/css/footer/footer.scss";
</style>