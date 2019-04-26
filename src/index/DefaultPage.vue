<template>
  <div class="default">
    <el-container>
      <el-header height>
        <header-index/>
      </el-header>
      <el-main>
        <!-- <main-index /> -->
        <router-view></router-view>
      </el-main>
      <el-footer height>
        <footer-index/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderIndex from "@/components/header/HeaderIndex";
import MainIndex from "@/components/main/MainIndex";
import FooterIndex from "@/components/footer/FooterIndex";
export default {
  components: {
    HeaderIndex,
    MainIndex,
    FooterIndex
  },
  created() {
    this.axios.get("/api/getSearchList").then(response => {
      var data = response.data.result;
      // console.log(data);
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var tempArr = [];
        for (var j = 0; j < data[i].length; j++) {
          tempArr.push(data[i][j].name);
        }
        arr.push(tempArr);
      }
      // console.log(arr);
      this.$store.commit('setSearchList',arr)
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/default/default.scss";
</style>