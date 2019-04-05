<template>
  <div class="details">
    <el-row class="details-row1">
      <dt class="details-top">
        <el-col :span="8" class="details-top-left">
          <img src="http://www.jiajiao114.com/images/w_default_avatar.jpg" alt>
        </el-col>
        <el-col :span="8" class="details-top-mid">
          <p class="name">李老师</p>
          <p class="card">编号：123123</p>
          <p class="dis">
            李老师李老师李老师李老师李老师李老师李老师李老师
            李老师李老师李老师李老师李老师李老师李老师李老师李老师李老师
          </p>
        </el-col>
        <el-col :span="8" class="details-top-right">
          <dl>
            <dt>教师学历：</dt>
            <dd>研究生</dd>
          </dl>
          <dl>
            <dt>毕业院校：</dt>
            <dd>成都工业学院</dd>
          </dl>
          <dl>
            <dt>教龄：</dt>
            <dd>1年</dd>
          </dl>
          <dl>
            <dt>教师类型：</dt>
            <dd>在职教师</dd>
          </dl>
          <dl>
            <dt>获得证书：</dt>
            <dd class="honor">教师资格证，英语专业8级证书，IELTS, TOEFL , TCF</dd>
          </dl>
        </el-col>
      </dt>
    </el-row>
    <el-row>
      <div class="details-content">
        <div class="details-content-title">
          <p>详细信息</p>
        </div>
        <div class="details-list">
          <el-col :span="12">
            <div class="details-wrapper">
              <div class="details-list-title">教学经历：</div>
              <div class="details-list-content">教过高二女生数学和英语，其中英语成绩和总成绩均在一个学期后提升至班级第一名。 有学生数学成绩提高30分。</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">获得证书：</div>
              <div class="details-list-content">
                <span>教师资格证</span>
                <span>英语专业8级证书</span>
                <span>IELTS</span>
                <span>TOEFL</span>
                <span>TCF</span>
              </div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课科目：</div>
              <div class="details-list-content">
                <span>高等数学</span>
                <span>高等数学</span>
                <span>高等数学</span>
                <span>高等数学</span>
                <span>高等数学</span>
              </div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课区域：</div>
              <div class="details-list-content">郫都区</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">详细地址：</div>
              <div class="details-list-content">成都工业学院附近</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课时间：</div>
              <div class="details-list-content">周六上午9:00-12：00</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">薪资要求：</div>
              <div class="details-list-content">100 元/小时</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">自我评价：</div>
              <div class="details-list-content">
                主要辅导英语和数学，教过几十名学生，有学生成绩提高至班级第一名。
                主要辅导英语和数学，教过几十名学生，有学生成绩提高至班级第一名。
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <router-link :to="{name:'order'}">
              <el-button type="success" round>立即下单</el-button>
            </router-link>
          </el-col>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input10: ""
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/details.scss";
</style>