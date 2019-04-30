<template>
  <div class="details">
    <el-row class="details-row1">
      <dt class="details-top">
        <el-col :span="8" class="details-top-left">
          <img
            :src="dataList.pic_path == 'null' ? '../../../static/images/default.jpg' : '/' + dataList.pic_path"
          >
        </el-col>
        <el-col :span="8" class="details-top-mid">
          <p class="name">{{dataList.name}}</p>
          <p class="card" v-if="dataList.card">教师编号：{{dataList.card}}</p>
          <p class="creat_time">注册时间：{{dataList.create_time}}</p>
        </el-col>
        <el-col :span="8" class="details-top-right">
          <dl>
            <dt>{{dataList.teacher_id == undefined?"期望教师水平":"教师水平"}}：</dt>
            <dd>{{dataList.education}}</dd>
          </dl>
          <dl v-if="dataList.graduated">
            <dt>毕业院校：</dt>
            <dd>{{dataList.graduated}}</dd>
          </dl>
          <dl>
            <dt>教龄：</dt>
            <dd>{{dataList.teachage}}</dd>
          </dl>
          <dl>
            <dt>教师类型：</dt>
            <dd>{{dataList.teacherjob}}</dd>
          </dl>
          <dl>
            <dt>{{dataList.teacher_id == undefined?"家长性别":"教师性别"}}：</dt>
            <dd>{{dataList.sex}}</dd>
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
          <el-col :span="16">
            <div class="details-wrapper">
              <div class="details-list-title">{{dataList.teacher_id == undefined?"需求科目":"授课科目"}}：</div>
              <div class="details-list-content">
                <span>{{dataList.teachlesson}}</span>
              </div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课区域：</div>
              <div class="details-list-content">{{dataList.teacharea}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">详细地址：</div>
              <div class="details-list-content">{{dataList.areadis}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课时间：</div>
              <div class="details-list-content">{{dataList.teachtime}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">授课时间详细说明：</div>
              <div class="details-list-content">{{dataList.teachtimedis}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">薪资要求：</div>
              <div class="details-list-content">{{dataList.price}} 元/小时</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">联系电话：</div>
              <div class="details-list-content">{{dataList.phone}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">Email：</div>
              <div class="details-list-content">{{dataList.email}}</div>
            </div>
            <div class="details-wrapper">
              <div class="details-list-title">更多描述：</div>
              <div class="details-list-content">{{dataList.description}}</div>
            </div>
          </el-col>
          <!-- <el-col class="orderBtn" :span="8">
            <router-link :to="{name:'order'}">
              <el-button type="success">立即预约</el-button>
            </router-link>
          </el-col> -->
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  created() {
    var id = this.$route.query.id;
    var teacher_id = this.$route.query.teacher_id;
    var type = "teacher";
    if (teacher_id == undefined) {
      type = "parent";
    }
    this.axios
      .get("/api/getDetailTeacherInfo?type=" + type + "&id=" + id)
      .then(response => {
        var data = response.data.result;
        if (response.data.status == "ok") {
          this.dataList = data[0];
        }
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/details.scss";
</style>