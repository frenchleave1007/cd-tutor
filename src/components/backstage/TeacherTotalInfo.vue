<template>
  <div class="teacherTotalInfo">
    <el-col :span="12">
      <div class="myChart" id="myChart1"></div>
    </el-col>
    <el-col :span="12">
      <div class="myChart" id="myChart2"></div>
    </el-col>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入饼图组件
import "echarts/lib/chart/pie";
// 引入提示框和图例组件
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/legendScroll";
export default {
  data() {
    return {
      legendArr1: [],
      dataList1: [],
      legendArr2: [],
      dataList2: []
    };
  },
  created() {
    this.axios.get("/api/getAllLessonAndArea").then(response => {
      var data = response.data.result;
      //   console.log(data[0]);
      var tempArr1 = [];
      for (var i = 0; i < data[0].length; i++) {
        tempArr1 = tempArr1.concat(data[0][i].teachlesson.split(","));
      }
      //   this.legendArr1 = tempArr1.filter(function(element, index, self) {
      //     return self.indexOf(element) === index;
      //   });
      for (var i = 0; i < tempArr1.length; i++) {
        if (this.legendArr1.indexOf(tempArr1[i]) == -1) {
          this.legendArr1.push(tempArr1[i]);
          var obj = {};
          obj.name = tempArr1[i];
          obj.value = 1;
          this.dataList1.push(obj);
        } else {
          this.dataList1[this.legendArr1.indexOf(tempArr1[i])].value++;
        }
      }

      var tempArr2 = [];
      for (var i = 0; i < data[1].length; i++) {
        tempArr2 = tempArr2.concat(data[1][i].teacharea.split(","));
      }
      for (var i = 0; i < tempArr2.length; i++) {
        if (this.legendArr2.indexOf(tempArr2[i]) == -1) {
          this.legendArr2.push(tempArr2[i]);
          var obj = {};
          obj.name = tempArr2[i];
          obj.value = 1;
          this.dataList2.push(obj);
        } else {
          this.dataList2[this.legendArr2.indexOf(tempArr2[i])].value++;
        }
      }
    });
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      //   console.log(this.dataList1)
      var myChart1 = echarts.init(document.getElementById("myChart1"));
      var myChart2 = echarts.init(document.getElementById("myChart2"));
      var option1 = {
        title: {
          text: "成都求知家教网教师科目信息统计",
          x: "center",
          textStyle: {
            color: "#000",
            fontSize: 24,
            fontFamily: "sans-serif"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "right",
          top: "5%",
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontFamily: "sans-serif"
          },
          data: this.legendArr1 //["小学数学", "高中数学", "小学英语", "初中语文", "初中英语", "小学语文"]
        },
        series: [
          {
            name: "年级科目",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.dataList1,
            label: {
              normal: {
                textStyle: {
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "sans-serif"
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      var option2 = {
        title: {
          text: "成都求知家教网教师分布统计",
          x: "center",
          textStyle: {
            color: "#000",
            fontSize: 24,
            fontFamily: "sans-serif"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: "right",
          top: "5%",
          data: this.legendArr2, //["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontFamily: "sans-serif"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
              normal: {
                textStyle: {
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "sans-serif"
                }
              }
            },
            data: this.dataList2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
    }
  },
  watch: {
    dataList1: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.initData();
      }
    },
    legendArr1: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.initData();
      }
    },
    dataList2: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.initData();
      }
    },
    legendArr2: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.initData();
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/teacherTotalInfo.scss";
</style>
