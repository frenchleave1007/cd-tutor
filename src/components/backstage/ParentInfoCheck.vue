<template>
  <div class="admin-info">
    <el-row>
      <el-col :span="12">
        <p>家长名称：{{params.name}}</p>
        <p>家长电话：{{params.phone}}</p>
        <p>家长邮箱：{{params.email}}</p>
        <p>家长性别：{{params.sex}}</p>
        <p>期望教师文化水平：{{params.education}}</p>
        <p>期望教师教龄：{{params.teachage}}</p>
        <p>期望教师职业：{{params.teacherjob}}</p>
        <p>需求科目：{{params.teachlesson}}</p>
        <p>教学时间：{{params.teachtime}}</p>
        <p>教学时间详细说明：{{params.teachtimedis}}</p>
      </el-col>
      <el-col :span="12">
        <p>期望价格：{{params.price}}元/小时</p>
        <p>教学地点：{{params.teacharea}}</p>
        <p>教学地点详细说明：{{params.areadis}}</p>
        <p>其他：{{params.description}}</p>
        <p>发布时间：{{params.create_time}}</p>
        <p>管理员审核状态：{{params.flag}}</p>
        <p>审核结果：{{params.errmsg == null ? '暂无' : params.errmsg}}</p>
        <p>
          头像：
          <img
            :src="params.pic_path == 'null' ? '../../../static/images/default.jpg' : '/' + params.pic_path"
          >
        </p>
      </el-col>
    </el-row>
    <el-row>
      <div class="btn">
        <el-button
          type="success"
          v-if="params.flag == '未通过' || params.flag == '未审核'"
          @click="pass"
        >通过</el-button>
        <el-button
          type="danger"
          v-if="params.flag == '通过' || params.flag == '未审核'"
          @click="nopass"
        >不通过</el-button>
        <router-link to="parentInfo">
          <el-button type="info">返回</el-button>
        </router-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {}
    };
  },
  methods: {
    pass() {
      var self = this;
      this.axios
        .post("/api/setParentInfoStatus", {
          flag: "通过",
          errmsg:
            "【操作管理员：" +
            sessionStorage.adminName +
            "；编号：" +
            sessionStorage.adminNum +
            "】",
          id: self.params.id
        })
        .then(response => {
          var res = response.data;
          //   console.log(res);
          if (res.status == "ok") {
            this.changeSuccess();
          }
        });
    },
    nopass() {
      this.open();
    },
    open() {
      this.$prompt("请输入错误信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          var self = this;
          this.axios
            .post("/api/setParentInfoStatus", {
              flag: "未通过",
              errmsg:
                value +
                "【操作管理员：" +
                sessionStorage.adminName +
                "；编号：" +
                sessionStorage.adminNum +
                "】",
              id: self.params.id
            })
            .then(response => {
              var res = response.data;
              //   console.log(res);
              if (res.status == "ok") {
                this.changeSuccess();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    changeSuccess() {
      this.$alert("返回信息管理页面", "操作成功", {
        confirmButtonText: "确定",
        type: "success",
        showClose: false,
        callback: action => {
          this.$router.push("parentInfo");
        }
      });
    }
  },
  created() {
    this.params = this.$route.query;
    // console.log(this.params)
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/teacherInfoCheck.scss";
</style>