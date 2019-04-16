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
      searchList: [
        {
          title: "授课区域",
          value: [
            "不限",
            "锦江区",
            "青羊区",
            "金牛区",
            "武侯区",
            "成华区",
            "高新区",
            "龙泉驿区",
            "新都区",
            "温江区",
            "双流区",
            "郫都区",
            "邛崃市",
            "崇州市",
            "金堂县",
            "大邑县",
            "蒲江县",
            "新津县",
            "简阳市",
            "都江堰市",
            "彭州市"
          ]
        },
        {
          title: "教授科目",
          value: [
            "不限",
            "小学数学",
            "高中数学",
            "大学数学",
            "小学英语",
            "初中英语",
            "高中英语"
          ]
        },
        {
          title: "教师类型",
          value: [
            "不限",
            "大学老师",
            "高中老师",
            "初中老师",
            "小学老师",
            "全职家教",
            "在校学生"
          ]
        },
        {
          title: "授课时间",
          value: [
            "不限",
            "工作日",
            "周末",
            "上午(7:00-12:00)",
            "下午(12:01-17:00)",
            "晚上(17:01-22:00)"
          ]
        },
        {
          title: "教师性别",
          value: ["不限", "男", "女"]
        }
      ],
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
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/teacherList.scss";
</style>