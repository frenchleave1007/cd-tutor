<template>
  <div class="other">
    <el-col :span="8">
      <p>
        地点管理
        <el-button type="primary" @click="handleAdd(1)">添加</el-button>
      </p>
      <el-table
        :data="areaData.filter(data => !area || data.name.toLowerCase().includes(area.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" width="150px;" prop="id"></el-table-column>
        <el-table-column label="名称" width="150px;" prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="area" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row,1)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="areaTotal"
        @current-change="areaCurrentChange"
        :page-size="8"
      ></el-pagination>
    </el-col>
    <el-col :span="8" class="mid">
      <p>
        课程管理
        <el-button type="primary" @click="handleAdd(2)">添加</el-button>
      </p>
      <el-table
        :data="lessonData.filter(data => !lesson || data.name.toLowerCase().includes(lesson.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" width="150px;" prop="id"></el-table-column>
        <el-table-column label="名称" width="150px;" prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="lesson" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row,2)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,2)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="lessonTotal"
        @current-change="lessonCurrentChange"
        :page-size="8"
      ></el-pagination>
    </el-col>
    <el-col :span="8">
      <p>
        职业管理
        <el-button type="primary" @click="handleAdd(3)">添加</el-button>
      </p>
      <el-table
        :data="teacherjobData.filter(data => !teacherjob || data.name.toLowerCase().includes(teacherjob.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="ID" width="150px;" prop="id"></el-table-column>
        <el-table-column label="名称" width="150px;" prop="name"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="teacherjob" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row,3)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,3)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="teacherjobTotal"
        @current-change="teacherjobCurrentChange"
        :page-size="8"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaData: [],
      lessonData: [],
      teacherjobData: [],
      area: "",
      lesson: "",
      teacherjob: "",
      areaPage: 1,
      lessonPage: 1,
      teacherjobPage: 1,
      areaTotal: 0,
      lessonTotal: 0,
      teacherjobTotal: 0
    };
  },
  methods: {
    handleEdit(index, row, flag) {
      //   console.log(index, row);
      clearTimeout(timer);
      var timer;
      this.$prompt(
        "请输入新" +
          (flag == 1 ? "教学地点" : flag == 2 ? "课程" : "职业类型") +
          "名称  (原来:" +
          row.name +
          ")",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(({ value }) => {
          this.axios
            .post("/api/updateSearchValue", {
              id: row.id,
              flag,
              value
            })
            .then(response => {
              if (response.data.status == "ok") {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                timer = setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
        })
        .catch(() => {});
    },
    handleDelete(index, row, flag) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/api/deleteSearchValue", {
              flag: flag,
              id: row.id
            })
            .then(response => {
              if (response.data.status == "ok") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                timer = setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
        })
        .catch(() => {});
    },
    handleAdd(flag) {
      //   console.log(flag);
      clearTimeout(timer);
      var timer;
      var area = "";
      var lesson = "";
      var teacherjob = "";
      this.$prompt(
        "请输入添加的" +
          (flag == 1 ? "教学地点" : flag == 2 ? "课程" : "职业类型") +
          "名称",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(({ value }) => {
          flag == 1
            ? (area = value)
            : flag == 2
            ? (lesson = value)
            : (teacherjob = value);
          // console.log(area+'-'+lesson+'-'+teacherjob)
          this.axios
            .post("/api/insertSearchValue", {
              area,
              lesson,
              teacherjob
            })
            .then(response => {
              if (response.data.status == "ok") {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                timer = setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
        })
        .catch(() => {});
    },
    currentChange() {
      this.axios
      .post("/api/getSearchValue", {
        areaPage: this.areaPage,
        lessonPage: this.lessonPage,
        teacherjobPage: this.teacherjobPage
      })
      .then(response => {
        var data = response.data.result;
        // console.log(data[0][0]["count(*)"]);
        this.areaTotal = data[0][0]["count(*)"];
        this.lessonTotal = data[2][0]["count(*)"];
        this.teacherjobTotal = data[4][0]["count(*)"];
        this.areaData = data[1];
        this.lessonData = data[3];
        this.teacherjobData = data[5];
      });
    },
    areaCurrentChange(currentPage) {
      this.areaPage = currentPage;
      this.currentChange();
    },
    lessonCurrentChange(currentPage) {
      this.lessonPage = currentPage;
      this.currentChange();
    },
    teacherjobCurrentChange(currentPage) {
      this.teacherjobPage = currentPage;
      this.currentChange();
    }
  },
  created() {
    this.axios
      .post("/api/getSearchValue", {
        areaPage: this.areaPage,
        lessonPage: this.lessonPage,
        teacherjobPage: this.teacherjobPage
      })
      .then(response => {
        var data = response.data.result;
        // console.log(data[0][0]["count(*)"]);
        this.areaTotal = data[0][0]["count(*)"];
        this.lessonTotal = data[2][0]["count(*)"];
        this.teacherjobTotal = data[4][0]["count(*)"];
        this.areaData = data[1];
        this.lessonData = data[3];
        this.teacherjobData = data[5];
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/otherManage.scss";
</style>
