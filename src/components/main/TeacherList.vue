<template>
  <div class="teacher-list">
    <el-row class="t-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="t-search" v-if="this.$route.query.type == undefined">
      <dl v-for="(item, index) in searchList" :key="index">
        <dt>{{item.title}}：</dt>
        <dd v-for="(v,i) in item.value" :key="i">
          <span :class="{'on':i == 0}" @click="select(index,i)">{{v}}</span>
        </dd>
      </dl>
    </el-row>
    <info-list :list="teacherInfoList"/>
    <div class="fenye-btn">
      <el-pagination
        class="page-num"
        background
        layout="prev, pager, next"
        @current-change="infoPageChange"
        :page-size="10"
        :total="teacherInfoTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import InfoList from "@/components/main/InfoList";
export default {
  components: {
    InfoList
  },
  data() {
    return {
      teacherInfoTotal: 0,
      currentPage: 1,
      teacherInfoList: [],
      searchList: [
        {
          title: "授课区域",
          value: [
            // "锦江区",
            // "青羊区",
            // "金牛区",
            // "武侯区",
            // "成华区",
            // "高新区",
            // "龙泉驿区",
            // "新都区",
            // "温江区",
            // "双流区",
            // "郫都区",
            // "邛崃市",
            // "崇州市",
            // "金堂县",
            // "大邑县",
            // "蒲江县",
            // "新津县",
            // "简阳市",
            // "都江堰市",
            // "彭州市"
          ]
        },
        {
          title: "教授科目",
          value: [
            // "小学数学",
            // "小学语文",
            // "小学英语",
            // "初中数学",
            // "初中语文",
            // "初中英语",
            // "高中数学",
            // "高中英语",
            // "高中语文",
            // "高中物理",
            // "高中化学",
            // "高中生物",
            // "高中政治",
            // "高中历史",
            // "高中地理"
          ]
        },
        {
          title: "授课时间",
          value: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        {
          title: "授课时段",
          value: ["上午", "下午", "晚上"]
        },
        {
          title: "薪资(每小时)",
          value: ["100以下", "100-200", "200-300", "300以上"]
        }
      ],
      searchArr: [
        "不限",
        "不限",
        "不限",
        "不限",
        "不限"
        // teacharea: "不限",
        // teachlesson: "不限",
        // teachtime: "不限",
        // teachtimesolt: "不限",
        // price: "不限"
      ]
    };
  },
  methods: {
    getSearchInfo() {
      var type =
        this.$route.query.type == undefined ? "不限" : this.$route.query.type;
      var key =
        this.$route.query.key == undefined ? "不限" : this.$route.query.key;
      var currentPage = this.currentPage;
      console.log(type,key)
      this.axios
        .post("/api/displaySearchInfo", {
          type: type,
          key: key,
          table: "teacher",
          currentPage: currentPage
        })
        .then(response => {
          if (response.data.status == "ok") {
            var data = response.data.result;
            // console.log(data);
            this.teacherInfoTotal = data[0][0]["count(*)"];
            for (var i = 0; i < data[1].length; i++) {
              data[1][i]["typeFlag"] = "true"; //标记为教师
            }
            this.teacherInfoList = data[1];
          }
        });
    },
    infoPageChange(currentPage) {
      this.currentPage = currentPage;
      if(this.$route.query.type == undefined){
        this.getSearchInfoList();
      }else{
      this.getSearchInfo();
      }
    },
    select(index, i) {
      var e = e || window.event;
      // console.log(index,i,e.target.innerHTML)
      // console.log(e);
      // console.log(e.path[2].children);
      // console.log(e.target);
      // e.target.classList.add("on");
      //获得点击a标签的上两层父级的子元素得到obj对象，遍历obj(类数组)，如果obj存在子元素并且子元素类数组的第一位有值（a标签）,则移除class，最后添加class
      var obj = e.path[2].children;
      for (var a in obj) {
        // console.log(obj[a].children , obj[a].children[0])
        if (obj[a].children && obj[a].children[0]) {
          obj[a].children[0].classList.remove("on");
        }
      }
      e.target.classList.add("on");
      this.searchArr[index] = e.target.innerHTML;
      // console.log(this.searchArr);
      this.getSearchInfoList();
    },
    getSearchInfoList() {
      this.axios
        .post("/api/getSearchInfoList", {
          searchArr: this.searchArr,
          table: "teacher",
          currentPage: this.currentPage
        })
        .then(response => {
          if (response.data.status == "ok") {
            var data = response.data.result;
            // console.log(data);
            this.teacherInfoTotal = data[0][0]["count(*)"];
            for (var i = 0; i < data[1].length; i++) {
              data[1][i]["typeFlag"] = "true"; //标记为教师
            }
            this.teacherInfoList = data[1];
            // console.log(this.teacherInfoList)
          }
        });
    }
  },
  created() {
    this.axios.get("/api/getSearchList").then(response => {
      var data = response.data.result;
      for (var i = 0; i < data[0].length; i++) {
        this.searchList[0].value.push(data[0][i].name);
      }
      for (var i = 0; i < data[1].length; i++) {
        this.searchList[1].value.push(data[1][i].name);
      }
    });
    for (var i = 0; i < this.searchList.length; i++) {
      this.searchList[i].value.unshift("不限");
    }
    if (this.$route.query.type == undefined) {
      this.getSearchInfoList();
    } else {
      this.getSearchInfo();
    }
  },
  watch: {
    $route: "getSearchInfo"
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/teacherList.scss";
</style>