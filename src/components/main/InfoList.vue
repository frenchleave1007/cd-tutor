<template>
  <div class="info-list">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="wrapper">
          <div class="t-left">
            <img :src="item.image" alt>
            <p class="t-name">{{item.name}}</p>
            <p class="t-card" v-if="item.flag">编号：{{item.card}}</p>
          </div>
          <div class="t-mid">
            <dl v-if="item.flag">
              <dt>教师学历：</dt>
              <dd>{{item.graduatedSchool }} ( {{item.education}} )</dd>
              <dt>教龄：</dt>
              <dd>{{item.teachAge}}</dd>
              <dt>教师类型：</dt>
              <dd>{{item.teacherJob}}</dd>
              <dt>教学科目：</dt>
              <dd>{{item.teachLesson}}</dd>
              <dt>教学时间：</dt>
              <dd>{{item.teachTime}}</dd>
              <dt>期望薪资：</dt>
              <dd>{{item.price}}</dd>
              <dt>授课地点：</dt>
              <dd>{{item.teachArea}}--{{item.areaDis}}</dd>
            </dl>
            <dl v-else>
              <dt>需求科目：</dt>
              <dd>{{item.searchLesson}}</dd>
              <dt>期望教师学历：</dt>
              <dd>{{item.education}}</dd>
              <dt>期望教师教龄：</dt>
              <dd>{{item.teachAge}}</dd>
              <dt>期望教师类型：</dt>
              <dd>{{item.teacherJob}}</dd>
              <dt>教学时间：</dt>
              <dd>{{item.teachTime}}</dd>
              <dt>期望薪资：</dt>
              <dd>{{item.price}}</dd>
              <dt>授课地点：</dt>
              <dd>{{item.teachArea}}--{{item.areaDis}}</dd>
            </dl>
          </div>
          <div class="t-right">
            <p>{{item.description}}</p>
            <div class="more-btn">
              <router-link :to="{name:'details'}">
                <el-button type="warning">查看详情</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["list"]
};
</script>

<style lang="scss">
@import "@/assets/css/main/infoList.scss";
</style>