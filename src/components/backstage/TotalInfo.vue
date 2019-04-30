<template>
  <div class="totalInfo">
    <el-row class="top">
      <p>数据统计</p>
      <el-row>
        <el-col :span="4" class="today">今日数据：</el-col>
        <el-col :span="4">
          {{newInfo.user}}
          <span>新增用户</span>
        </el-col>
        <el-col :span="4">
          {{newInfo.admin}}
          <span>新增管理员</span>
        </el-col>
        <el-col :span="4">
          {{newInfo.teacher}}
          <span>新增教师信息</span>
        </el-col>
        <el-col :span="4">
          {{newInfo.parent}}
          <span>新增家长信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="total">总数据：</el-col>
        <el-col :span="4">
          {{totalInfo.user}}
          <span>用户</span>
        </el-col>
        <el-col :span="4">
          {{totalInfo.admin}}
          <span>管理员</span>
        </el-col>
        <el-col :span="4">
          {{totalInfo.teacher}}
          <span>教师信息</span>
        </el-col>
        <el-col :span="4">
          {{totalInfo.parent}}
          <span>家长信息</span>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="content">
      <div class="myChart" id="myChart"></div>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/tooltip";
export default {
  data() {
    return {
      dateList: [],
      dataList: [[], [], [], []],
      totalInfo: {
        user: 0,
        admin: 0,
        teacher: 0,
        parent: 0
      },
      newInfo: {
        user: 0,
        admin: 0,
        teacher: 0,
        parent: 0
      }
    };
  },
  created() {
    this.getDay(-7);
    for (var i = 6; i >= 0; i--) {
      this.dateList.push(this.getDay(-i));
    }
    this.axios
      .post("/api/getTotalInfo", {
        date: this.dateList
      })
      .then(response => {
        var data = response.data.result;
        this.totalInfo.user = data[0][0]["count(*)"];
        this.totalInfo.admin = data[1][0]["count(*)"];
        this.totalInfo.teacher = data[2][0]["count(*)"];
        this.totalInfo.parent = data[3][0]["count(*)"];
        this.newInfo.user = data[4][0]["count(*)"];
        this.newInfo.admin = data[5][0]["count(*)"];
        this.newInfo.teacher = data[6][0]["count(*)"];
        this.newInfo.parent = data[7][0]["count(*)"];
        for (var i = 0; i < this.dataList.length; i++) {
          var count = i + 4;
          this.dataList[i] = [];
          for (var j = 0; j < 7; j++) {
            this.dataList[i].push(data[count][0]["count(*)"]);
            count += 4;
          }
          this.dataList[i].reverse();
        }
        this.initData();
      });
  },
  mounted() {
    // this.initData();
  },
  methods: {
    initData() {
      var myChart = echarts.init(document.getElementById("myChart"));
      var colors = ["#00A645", "#ff9800", "#DC1212", "#0C2BD9"];
      var option = {
        color: colors,
        title: {
          text: "近七天数据变化",
          textStyle: {
            color: "#000",
            fontSize: 24,
            fontFamily: "sans-serif"
          }
        },
        tooltip: {
          // 相应鼠标
          trigger: "axis"
        },
        legend: {
          data: ["新增用户", "新增管理员", "新增教师信息", "新增家长信息"],
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 20, // 设置宽度
          itemHeight: 20, // 设置高度
          itemGap: 40, // 设置间距
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontFamily: "sans-serif"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          //工具箱
          show: true,
          feature: {
            dataZoom: {
              //区域缩放
              yAxisIndex: "none"
            },
            dataView: { readOnly: false }, //以文字形式显示数据
            magicType: { type: ["bar", "line"] }, //动态数据切换，数据显示可以在该规定内容中切换显示方式
            restore: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dateList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增用户",
            type: "line",
            data: this.dataList[0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增管理员",
            type: "line",
            data: this.dataList[1],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增教师信息",
            type: "line",
            data: this.dataList[2],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增家长信息",
            type: "line",
            data: this.dataList[3],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day; //得到时间戳
      today.setTime(targetday_milliseconds); //把当前的时间设置为这个时间戳
      var tYear = today.getFullYear();
      var tMonth = ("0" + (today.getMonth() + 1)).slice(-2);
      var tDate = ("0" + today.getDate()).slice(-2);
      return tYear + "-" + tMonth + "-" + tDate;
    }
  }
  // watch: {
  //   dataList: {
  //     deep: true,
  //     handler: function(newVal, oldVal) {
  //       console.log("newValue", newVal);
  //       console.log("oldValue", oldVal.text);
  //     }
  //   }
  // }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/totalInfo.scss";
</style>
