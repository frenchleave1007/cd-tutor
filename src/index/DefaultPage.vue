<template>
  <div class="default">
    <el-container>
      <el-header height>
          <header-index />
      </el-header>
      <el-main>
        <!-- <main-index /> -->
        <router-view></router-view>
      </el-main>
      <el-footer height>
        <footer-index />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderIndex from '@/components/header/HeaderIndex'
import MainIndex from '@/components/main/MainIndex'
import FooterIndex from '@/components/footer/FooterIndex'
export default {
    components:{
        HeaderIndex,
        MainIndex,
        FooterIndex
    }
};
</script>

<style lang="scss">
@import '@/assets/css/default/default.scss'
</style>