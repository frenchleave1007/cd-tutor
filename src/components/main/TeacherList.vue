<template>
  <div class="teacher-list">
    <el-row class="t-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="t-search">
      <dl v-for="(item, index) in searchList" :key="index">
        <dt>{{item.title}}：</dt>
        <dd v-for="(v,i) in item.value" :key="i">
          <a href="#" :class="{'on':i == 0}" @click="select(index,i)">{{v}}</a>
        </dd>
      </dl>
    </el-row>
    <info-list :list="teacherInfoList"/>
    <div class="fenye-btn">
      <el-pagination class="page-num" background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>

<script>
import InfoList from "@/components/main/InfoList";
export default {
  components: {
    InfoList
  },
  methods: {
    select: function(index, i, e) {
      var e = e || window.event;
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
    }
  },
  data() {
    return {
      arr: "",
      searchList: [],
      teacherInfoList: [
        {
          flag: true, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高老师",
          card: "123123",
          graduatedSchool: "成都工业学院",
          education: "研究生",
          teachAge: "1年",
          teacherJob: "在职教师",
          teachLesson: "小学英语",
          teachTime: "周六9:00-12:00",
          price: "50 元/小时",
          teachArea: "郫都区",
          areaDis: "成都工业学院附近",
          description:
            "善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。"
        },
        {
          flag: true, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高老师",
          card: "123123",
          graduatedSchool: "成都工业学院",
          education: "研究生",
          teachAge: "1年",
          teacherJob: "在职教师",
          teachLesson: "小学英语",
          teachTime: "周六9:00-12:00",
          price: "50 元/小时",
          teachArea: "郫都区",
          areaDis: "成都工业学院附近",
          description:
            "善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。"
        },
        {
          flag: true, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高老师",
          card: "123123",
          graduatedSchool: "成都工业学院",
          education: "研究生",
          teachAge: "1年",
          teacherJob: "在职教师",
          teachLesson: "小学英语",
          teachTime: "周六9:00-12:00",
          price: "50 元/小时",
          teachArea: "郫都区",
          areaDis: "成都工业学院附近",
          description:
            "善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。"
        }
      ]
    };
  },
  created(){
    this.searchList = this.$store.state.searchList;
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/teacherList.scss";
</style>