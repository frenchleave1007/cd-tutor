import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  // adminNum:'管理员编号',
  // adminName:'管理员名称',
  userName:'用户名称'
}

const mutations = {
  // setAdminNum (state, val) {
  //   state.adminNum = val;
  // },
  // setAdminName (state, val) {
  //   state.adminName = val;
  // },
  setUserName (state, params) {
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
