<template>
  <div class="total-info">
    <el-row>
      <div class="teacher-title">
        <span>教师区</span>
        <router-link :to="{name:'teacherlist'}">
          <span>
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </router-link>
      </div>
      <info-list :list="teacherInfoList"/>
    </el-row>
    <el-row>
      <div class="parent-title">
        <span>家长区</span>
        <router-link :to="{name:'parentlist'}">
          <span>
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </router-link>
      </div>
      <info-list :list="parentInfoList"/>
    </el-row>
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
      teacherInfoList: [
        {
          typeFlag: true, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高老师",
          card: "123123",
          graduatedSchool: "成院",
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
          typeFlag: true, //true教师  false家长
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
          typeFlag: true, //true教师  false家长
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
      ],
      parentInfoList: [
        {
          typeFlag: false, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高家长",
          education: "博士",
          teachAge: "1年",
          teacherJob: "在职教师",
          searchLesson: "小学英语",
          teachTime: "周六9:00-12:00",
          price: "50 元/小时",
          teachArea: "郫都区",
          areaDis: "成都工业学院附近",
          description:
            "善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。"
        },
        {
          typeFlag: false, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高家长",
          education: "博士",
          teachAge: "1年",
          teacherJob: "在职教师",
          searchLesson: "小学英语",
          teachTime: "周六9:00-12:00",
          price: "50 元/小时",
          teachArea: "郫都区",
          areaDis: "成都工业学院附近",
          description:
            "善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。善于与孩子沟通，能够及时发现学生的问题，并掌握他们的优点和缺点，积极引导学生自助学习，并学会举一反三。本人性格开朗，做事认真负责，并获得过国家奖学金，让学生快乐成长。"
        },
        {
          typeFlag: false, //true教师  false家长
          image: "http://www.jiajiao114.com/images/w_default_avatar.jpg",
          name: "高家长",
          education: "博士",
          teachAge: "1年",
          teacherJob: "在职教师",
          searchLesson: "小学英语",
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
  created() {
    this.axios.get("/api/getDisplayInfo").then(response => {
      if(response.data.status == 'ok'){
        var data = response.data.result;
        for(var i = 0;i<data[0].length;i++){
          data[0][i]['typeFlag'] = 'true'
        }
        this.teacherInfoList = data[0].slice(0,5);
        this.parentInfoList = data[1].slice(0,5);
      }
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/totalInfo.scss";
</style>