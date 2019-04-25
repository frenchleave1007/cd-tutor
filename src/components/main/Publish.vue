<template>
  <div class="publish">
    <p class="title">我发布的信息</p>
    <el-row class="teacher">
      <p class="title2">我要当老师</p>
      <el-table :data="teacherData" style="width: 100%">
        <el-table-column label="发布日期" width="300">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.flag != '已删除'"
              size="mini"
              type="success"
              @click="checkTeacherInfo(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button
              v-if="scope.row.flag != '已删除'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              v-if="scope.row.flag == '已删除'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >了解并删除此条信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="teacherTotal"
        layout="prev, pager, next"
        @current-change="teacherCurrentChange"
        :page-size="10"
        :total="teacherTotal"
      ></el-pagination>
    </el-row>
    <el-row class="parent">
      <p class="title2">我要找家教</p>
      <el-table :data="parentData" style="width: 100%">
        <el-table-column label="发布日期" width="300">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.flag != '已删除'"
              size="mini"
              type="success"
              @click="checkParentInfo(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button
              v-if="scope.row.flag != '已删除'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              v-if="scope.row.flag == '已删除'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >了解并删除此条信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="parentTotal"
        layout="prev, pager, next"
        @current-change="parentCurrentChange"
        :page-size="10"
        :total="parentTotal"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import InfoList from "@/components/main/InfoList";
export default {
  data() {
    return {
      parentTotal: 0,
      teacherTotal: 0,
      teacherData: [],
      parentData: [],
      teacherPage: 1,
      parentPage: 1
    };
  },
  methods: {
    checkTeacherInfo(index, row) {
      sessionStorage.teacherInfoId = row.id;
      this.$router.push({
        name: "teacherInfoChange",
      });
    },
    checkParentInfo(index, row) {
      // console.log(row)
      sessionStorage.parentInfoId = row.id;
      this.$router.push({
        name: "parentInfoChange",
      });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post("/api/deletePublishInfo",{
            id:row.id,
            teacher_id:row.teacher_id,
            parent_id:row.parent_id
          }).then(response => {
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
    teacherCurrentChange(currentPage) {
      this.teacherPage = currentPage;
      var self = this;
      this.axios
        .post("/api/getPublishInfo", {
          phone: sessionStorage.userPhone,
          teacherCurrentPage: currentPage,
          parentCurrentPage: self.parentPage
        })
        .then(response => {
          // console.log(response.data.result[0][0]["count(*)"]);
          this.teacherTotal = response.data.result[0][0]["count(*)"];
          this.parentTotal = response.data.result[2][0]["count(*)"];
          this.teacherData = response.data.result[1];
          this.parentData = response.data.result[3];
          // console.log(this.teacherData);
        });
    },
    parentCurrentChange() {
      this.parentPage = currentPage;
      var self = this;
      this.axios
        .post("/api/getPublishInfo", {
          phone: sessionStorage.userPhone,
          teacherCurrentPage: self.teacherPage,
          parentCurrentPage: currentPage
        })
        .then(response => {
          // console.log(response.data.result[0][0]["count(*)"]);
          this.teacherTotal = response.data.result[0][0]["count(*)"];
          this.parentTotal = response.data.result[2][0]["count(*)"];
          this.teacherData = response.data.result[1];
          this.parentData = response.data.result[3];
          // console.log(this.teacherData);
        });
    }
  },
  created() {
    this.axios
      .post("/api/getPublishInfo", {
        phone: sessionStorage.userPhone,
        teacherCurrentPage: 1,
        parentCurrentPage: 1
      })
      .then(response => {
        // console.log(response.data)
        // console.log(response.data.result[0][0]["count(*)"]);
        this.teacherTotal = response.data.result[0][0]["count(*)"];
        this.parentTotal = response.data.result[2][0]["count(*)"];
        this.teacherData = response.data.result[1];
        this.parentData = response.data.result[3];
        // console.log(this.teacherData);
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/publish.scss";
</style>
