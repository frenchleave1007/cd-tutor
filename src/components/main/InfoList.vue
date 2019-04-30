<template>
  <div class="info-list">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="wrapper">
          <div class="t-left">
            <img
              :src="item.pic_path == 'null' ? '../../../static/images/default.jpg' : '/' + item.pic_path"
            >
            <p class="t-name">{{item.name}}</p>
            <p class="t-card" v-if="item.typeFlag">编号：{{item.card}}</p>
          </div>
          <div class="t-mid">
            <dl v-if="item.typeFlag">
              <dt>教师学历：</dt>
              <dd>{{item.graduated}} ( {{item.education}} )</dd>
              <dt>获得荣誉：</dt>
              <dd>{{item.honor == null?"暂无":item.honor}}</dd>
              <dt>教龄：</dt>
              <dd>{{item.teachage}}</dd>
              <dt>教师类型：</dt>
              <dd>{{item.teacherjob}}</dd>
              <dt>教学科目：</dt>
              <dd>{{item.teachlesson}}</dd>
              <dt>教学时间：</dt>
              <dd>{{item.teachtime}}</dd>
              <dt>教学时段：</dt>
              <dd>{{item.teachtimesolt}}</dd>
            </dl>
            <dl v-else>
              <dt>需求科目：</dt>
              <dd>{{item.teachlesson}}</dd>
              <dt>期望教师学历：</dt>
              <dd>{{item.education}}</dd>
              <dt>期望教师教龄：</dt>
              <dd>{{item.teachage}}</dd>
              <dt>期望教师类型：</dt>
              <dd>{{item.teacherjob}}</dd>
              <dt>教学时间：</dt>
              <dd>{{item.teachtime}}</dd>
              <dt>教学时段：</dt>
              <dd>{{item.teachtimesolt}}</dd>
            </dl>
          </div>
          <div class="t-right">
            <dl>
              <dt>期望薪资：</dt>
              <dd>{{item.price}} 元/小时</dd>
              <dt>授课地点：</dt>
              <dd>{{item.teacharea}}( {{item.areadis}} )</dd>
            </dl>
            <p>更多描述：{{item.description}}</p>
            <div class="more-btn">
              <router-link
                :to="{name:'details',query:{id:item.id,teacher_id:item.teacher_id}}"
              >
                <el-button type="warning">查看详情</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="list.length==0" class="noInfo">暂无符合搜索条件的信息！！！</div>
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