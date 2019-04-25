<template>
  <div class="admin-manage">
    <div class="search">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchList.userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="searchList.userPhone" placeholder="请输入用户电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <img
            class="admin-pic"
            :src="scope.row.pic_path == null ? '../../../static/images/default.jpg' : '/' + scope.row.pic_path"
          >
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="350">
        <template slot-scope="scope">
          <i class="el-icon-message"></i>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="250">
        <template slot-scope="scope">
          <i class="el-icon-mobile-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        background
        v-if="flag"
        layout="prev, pager, next"
        @current-change="allUserCurrentChange"
        :page-size="8"
        :total="allUserTotal"
      ></el-pagination>
      <el-pagination
        background
        v-if="!flag"
        layout="prev, pager, next"
        @current-change="searchUserCurrentChange"
        :page-size="8"
        :total="searchUserTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      flag: true,
      allUserTotal: 0,
      searchUserTotal: 0,
      allUserCurrentPage: 1,
      searchUserCurrentPage: 1,
      searchList: {
        userName: "",
        userPhone: ""
      }
    };
  },
  methods: {
    handleDelete(index, row) {
      var self = this;
      //   console.log(index, row);
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.get("/api/canDelete?id=" + row.id).then(response => {
            // console.log(response.data);
            if (
              response.data.result[0].length == 0 &&
              response.data.result[1].length == 0
            ) {
              self.deleteFun(row.id);
            } else {
              this.$message({
                type: "error",
                message: "该用户有发布的信息，不能删除!"
              });
            }
          });
        })
        .catch(() => {});
    },
    deleteFun(id) {
      this.axios.get("/api/deleteUser?id=" + id).then(response => {
        if (response.data.status == "ok") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          location.reload();
        }
      });
    },
    search() {
      var self = this;
      this.axios
        .post("/api/searchUser", {
          userName: self.searchList.userName,
          userPhone: self.searchList.userPhone,
          currentPage: self.searchUserCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.userList = res.result[1];
            self.searchUserTotal = res.result[0][0]["count(*)"];
          }
        });
    },
    searchFail() {
      this.$message.error("未找到任何信息，请核对检索条件");
    },
    allUserCurrentChange(currentPage) {
      // console.log(currentPage);
      this.allUserCurrentPage = currentPage;
      var self = this;
      this.axios
        .get("/api/getAllUser?currentPage=" + self.allUserCurrentPage)
        .then(response => {
          var res = response.data;
          // console.log(res[0][0]["count(*)"]);
          if (res) {
            // console.log(res[1])
            this.userList = res[1];
            this.allUserTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
          } else {
            this.userList = [];
          }
        });
    },
    searchUserCurrentChange(currentPage) {
      this.searchUserCurrentPage = currentPage;
      var self = this;
      this.axios
        .post("/api/searchUser", {
          userName: self.searchList.userName,
          userPhone: self.searchList.userPhone,
          currentPage: self.searchUserCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.userList = res.result[1];
            self.searchUserTotal = res.result[0][0]["count(*)"];
          }
        });
    }
  },
  mounted() {
    var self = this;
    this.axios
      .get("/api/getAllUser?currentPage=" + self.allUserCurrentPage)
      .then(response => {
        var res = response.data;
        // console.log(res[0][0]["count(*)"]);
        if (res) {
          // console.log(res[1])
          this.userList = res[1];
          this.allUserTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
        } else {
          this.userList = [];
        }
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/adminManage.scss";
</style>