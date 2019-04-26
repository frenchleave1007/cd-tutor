<template>
  <div class="admin-manage">
    <div class="search">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchList.teacherName" placeholder="请输入教师姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="searchList.teacherPhone" placeholder="请输入教师电话"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="searchList.create_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="teacherInfo" style="width: 100%">
      <el-table-column label="发布时间" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师姓名" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师电话" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息状态" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.flag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="statusChange(scope.$index, scope.row)">查看并审核</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        background
        v-if="flag"
        layout="prev, pager, next"
        @current-change="allInfoCurrentChange"
        :page-size="8"
        :total="allInfoTotal"
      ></el-pagination>
      <el-pagination
        background
        v-if="!flag"
        layout="prev, pager, next"
        @current-change="searchInfoCurrentChange"
        :page-size="8"
        :total="searchInfoTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherInfo: [],
      flag: true,
      allInfoTotal: 0,
      searchInfoTotal: 0,
      allInfoCurrentPage: 1,
      searchInfoCurrentPage: 1,
      searchList: {
        teacherName: "",
        teacherPhone: "",
        create_time: ""
      }
    };
  },
  methods: {
    statusChange(index, row) {
      this.$router.push({
        name: "teacherInfoCheck",
        query: row
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/api/adminDeleteTeacherInfo?id=" + row.id)
            .then(response => {
              if (response.data.status == "ok") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                location.reload();
              }
            });
        })
        .catch(() => {});
    },
    search() {
      // console.log(this.searchList.create_time == '')
      var self = this;
      this.axios
        .post("/api/searchTeacherInfo", {
          teacherName: self.searchList.teacherName,
          teacherPhone: self.searchList.teacherPhone,
          create_time: self.timeTypeChange(),
          currentPage: self.searchInfoCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.teacherInfo = res.result[1];
            self.searchInfoTotal = res.result[0][0]["count(*)"];
          }
        });
    },
    searchFail() {
      this.$message.error("未找到任何信息，请核对检索条件");
    },
    allInfoCurrentChange(currentPage) {
      // console.log(currentPage);
      this.allInfoCurrentPage = currentPage;
      var self = this;
      this.axios
        .get("/api/getAllTeacherInfo?currentPage=" + self.allInfoCurrentPage)
        .then(response => {
          var res = response.data;
          // console.log(res[0][0]["count(*)"]);
          if (res) {
            // console.log(res[1])
            this.teacherInfo = res[1];
            this.allAdminTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
          } else {
            this.teacherInfo = [];
          }
        });
    },
    searchInfoCurrentChange(currentPage) {
      this.searchInfoCurrentPage = currentPage;
      var self = this;
      this.axios
        .post("/api/searchTeacherInfo", {
          teacherName: self.searchList.teacherName,
          teacherPhone: self.searchList.teacherPhone,
          create_time: self.timeTypeChange(),
          currentPage: self.searchInfoCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.teacherInfo = res.result[1];
            self.searchAdminTotal = res.result[0][0]["count(*)"];
          }
        });
    },
    timeTypeChange() {
      if (this.searchList.create_time == "") {
        return "";
      } else {
        var time = new Date(this.searchList.create_time);
        return (
          time.getFullYear() +
          "-" +
          ("0" + (time.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + time.getDate()).slice(-2)
        );
      }
    }
  },
  mounted() {
    var self = this;
    this.axios
      .get("/api/getAllTeacherInfo?currentPage=" + self.allInfoCurrentPage)
      .then(response => {
        var res = response.data;
        if (res) {
          // console.log(res[1])
          this.teacherInfo = res[1];
          this.allInfoTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
        } else {
          this.teacherInfo = [];
        }
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/adminManage.scss";
</style>