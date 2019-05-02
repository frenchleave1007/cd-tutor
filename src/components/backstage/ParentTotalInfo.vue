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
      dataList2: [],
      legendArr3: [],
      dataList3: []
    };
  },
  created() {
    this.axios.get("/api/getAllLessonAndTeachtime").then(response => {
      var data = response.data.result;
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
        tempArr2 = tempArr2.concat(data[1][i].teachtime.split(","));
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
      var tempArr3 = [];
      for (var i = 0; i < data[2].length; i++) {
        tempArr3 = tempArr3.concat(data[2][i].teachtimesolt.split(","));
      }
      for (var i = 0; i < tempArr3.length; i++) {
        if (this.legendArr3.indexOf(tempArr3[i]) == -1) {
          this.legendArr3.push(tempArr3[i]);
          var obj = {};
          obj.name = tempArr3[i];
          obj.value = 1;
          this.dataList3.push(obj);
        } else {
          this.dataList3[this.legendArr3.indexOf(tempArr3[i])].value++;
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
          text: "成都求知家教网家长需求科目统计",
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
          x: "center",
          y: "bottom",
          data: this.legendArr1,
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontFamily: "sans-serif"
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "需求年级科目",
            type: "pie",
            radius: [20, 250],
            center: ["50%", "45%"],
            roseType: "area",
            label: {
              normal: {
                textStyle: {
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "sans-serif"
                }
              }
            },
            data: this.dataList1
          }
        ]
      };
      var option2 = {
        title: {
          text: "成都求知家教网家长需求时间统计",
          x: "center",
          textStyle: {
            color: "#000",
            fontSize: 24,
            fontFamily: "sans-serif"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "center",
          y: "bottom",
          data: this.legendArr2.concat(this.legendArr3),
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontFamily: "sans-serif"
          }
        },
        series: [
          {
            name: "教学时段",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner",
                textStyle: {
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "sans-serif"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.dataList3
          },
          {
            name: "教学日期",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    fontSize: 18,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 18,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: this.dataList2
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
    },
    dataList3: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.initData();
      }
    },
    legendArr3: {
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