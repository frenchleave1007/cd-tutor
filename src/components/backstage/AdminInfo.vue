<template>
  <div class="admin-info">
    <dl>
      <dt>管理员详细信息</dt>
      <dd>管理员id：{{params.id}}</dd>
      <dd>管理员名称：{{params.name}}</dd>
      <dd>管理员编号：{{params.admin_num}}</dd>
      <dd>管理员电话：{{params.phone}}</dd>
      <dd>创建者：{{params.creater_name == null ? 'null' : params.creater_name}}</dd>
      <dd>创建者编号：{{params.creater_num == null ? 'null' : params.creater_num}}</dd>
      <dd>创建时间：{{params.create_time == null ? 'null' : params.create_time}}</dd>
      <dd>上一次修改时间：{{params.change_time == null ? 'null' : params.change_time}}</dd>
      <dd>
        头像：
        <img :src="params.pic_path == null ? '../../../static/images/default.jpg' : '/' + params.pic_path">
      </dd>
    </dl>
    <div class="btn">
      <el-button type="success" @click="toChangePage">修改信息</el-button>
      <router-link to="adminManage">
        <el-button type="success">返回</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {}
    };
  },
  methods:{
    toChangePage(){
      this.$router.push({
        name: "adminChange",
        query: this.params
      });
    }
  },
  created() {
    this.params = this.$route.query;
    // console.log(this.$route.params)
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/adminInfo.scss";
</style>