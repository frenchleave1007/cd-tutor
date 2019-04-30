import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  searchList: [
    {
      title: "授课区域",
      value: [
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
        "小学数学",
        "小学语文",
        "小学英语",
        "初中数学",
        "初中语文",
        "初中英语",
        "高中数学",
        "高中英语",
        "高中语文",
        "高中物理",
        "高中化学",
        "高中生物",
        "高中政治",
        "高中历史",
        "高中地理"
      ]
    },
    {
      title: "教师类型",
      value: [
        "大学老师",
        "高中老师",
        "初中老师",
        "小学老师",
        "职业家教",
        "在校学生",
        "其他"
      ]
    },
    {
      title: "授课时间",
      value: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ]
    },
    {
      title: "授课时段",
      value: [
        "上午",
        "下午",
        "晚上"
      ]
    },
    {
      title: "薪资(每小时)",
      value: ["100以下", "100-200","200-300","300以上"]
    }
  ],
}

const mutations = {
  setSearchList (state, val) {
    state.searchList[0].value = val[0];
    state.searchList[1].value = val[1];
    state.searchList[2].value = val[2];
  },
  // setAdminName (state, val) {
  //   state.adminName = val;
  // },
  setUserName(state, params) {
    state.userName = params
  },
}

// const actions = {
//   setAdminName ({ commit }, val) {
//     // 异步提交
//     commit('setAdminName', val)
//   },
//   setUserName ({ commit }, val) {
//     commit('setUserName', val)
//   },
// }

export default new Vuex.Store({
  state,
  mutations,
  // actions
})
