<template>
  <div class="admin-manage">
    <div class="search">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchList.adminName" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="searchList.adminNum" placeholder="请输入管理员编号"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="searchList.adminPhone" placeholder="请输入管理员电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column label="头像" width="250">
        <template slot-scope="scope">
          <img
            class="admin-pic"
            :src="scope.row.pic_path == null ? '../../../static/images/default.jpg' : '/' + scope.row.pic_path"
          >
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="250">
        <template slot-scope="scope">
          <i class="el-icon-mobile-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="adminInfo(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            v-if="scope.row.admin_num == adminNumFlag || superFlag == 1"
            @click="adminChange(scope.$index, scope.row)"
          >修改</el-button>
          <!-- <router-link to="/adminInfo"><el-button size="mini" >查看详情</el-button></router-link> -->
          <el-button
            size="mini"
            type="danger"
            v-if="superFlag == 1"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="超级管理员">
        <template slot-scope="scope">
          <i
            class="el-icon-star-on"
            v-if="scope.row.super == 1"
            style="margin-left: 20px;color:#67c23a;font-size:30px;"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        background
        v-if="flag"
        layout="prev, pager, next"
        @current-change="allAdminCurrentChange"
        :page-size="8"
        :total="allAdminTotal"
      ></el-pagination>
      <el-pagination
        background
        v-if="!flag"
        layout="prev, pager, next"
        @current-change="searchAdminCurrentChange"
        :page-size="8"
        :total="searchAdminTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminNumFlag: sessionStorage.adminNum,
      superFlag: sessionStorage.super,
      adminList: [],
      flag: true,
      allAdminTotal: 0,
      searchAdminTotal: 0,
      allAdminCurrentPage: 1,
      searchAdminCurrentPage: 1,
      searchList: {
        adminName: "",
        adminNum: "",
        adminPhone: ""
      }
    };
  },
  methods: {
    adminChange(index, row) {
      this.$router.push({
        name: "adminChange",
        query: row
      });
    },
    adminInfo(index, row) {
      // console.log(index, row);
      this.$router.push({
        name: "adminInfo",
        query: row
      });
    },
    handleDelete(index, row) {
      // console.log(sessionStorage.adminNum);
      console.log(index, row);
      if (sessionStorage.adminNum == row.admin_num) {
        this.$confirm("不能删除自己，如要删除需要登录其他管理员账号", "提示", {
          confirmButtonText: "立即登录",
          cancelButtonText: "好吧",
          type: "info"
        })
          .then(() => {
            //then表示选择confirm  catch表示选择cancel
            this.axios.get("/api/adminLogout").then(response => {
              if (response.data.status == "ok") {
                // window.location.href = response.data.url;
                this.$router.push("/bgLogin");
                sessionStorage.removeItem("adminNum");
              }
            });
          })
          .catch(() => {});
      } else {
        this.$confirm("此操作将删除该管理员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios.get("/api/deleteAdmin?id=" + row.id).then(response => {
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
      }
    },
    search() {
      var self = this;
      this.axios
        .post("/api/searchAdmin", {
          adminName: self.searchList.adminName,
          adminNum: self.searchList.adminNum,
          adminPhone: self.searchList.adminPhone,
          currentPage: self.searchAdminCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.adminList = res.result[1];
            self.searchAdminTotal = res.result[0][0]["count(*)"];
          }
        });
    },
    searchFail() {
      this.$message.error("查询失败，请核对检索条件");
    },
    allAdminCurrentChange(currentPage) {
      // console.log(currentPage);
      this.allAdminCurrentPage = currentPage;
      var self = this;
      this.axios
        .get("/api/getAllAdmin?currentPage=" + self.allAdminCurrentPage)
        .then(response => {
          var res = response.data;
          // console.log(res[0][0]["count(*)"]);
          if (res) {
            // console.log(res[1])
            this.adminList = res[1];
            this.allAdminTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
          } else {
            this.adminList = [];
          }
        });
    },
    searchAdminCurrentChange(currentPage) {
      this.searchAdminCurrentPage = currentPage;
      var self = this;
      this.axios
        .post("/api/searchAdmin", {
          adminName: self.searchList.adminName,
          adminNum: self.searchList.adminNum,
          adminPhone: self.searchList.adminPhone,
          currentPage: self.searchAdminCurrentPage
        })
        .then(response => {
          var res = response.data;
          // console.log(res);
          if (res.status == "fail") {
            self.searchFail();
          } else {
            self.flag = false;
            self.adminList = res.result[1];
            self.searchAdminTotal = res.result[0][0]["count(*)"];
          }
        });
    }
  },
  mounted() {
    var self = this;
    this.axios
      .get("/api/getAllAdmin?currentPage=" + self.allAdminCurrentPage)
      .then(response => {
        var res = response.data;
        // console.log(res[0][0]["count(*)"]);
        if (res) {
          // console.log(res[1])
          this.adminList = res[1];
          this.allAdminTotal = res[0][0]["count(*)"]; // 数据总条数 决定分多少页
        } else {
          this.adminList = [];
        }
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/adminManage.scss";
</style>