export default {
  state: {
    isShowTips: true,
    stepTips: 1
  },

  mutations: {
    setShowTips (state, value) {
      state.isShowTips = value
      localStorage.setItem('isShowTips', value)
    },
    setStepTips (state, value) {
      state.stepTips = value
      localStorage.setItem('stepTips', value)
    }
  },

  actions: {
    setShowTips ({ commit, state }, value) {
      commit('setShowTips', (typeof value !== 'undefined') ? value : false)
    },
    setStepTips ({ commit, state }, value) {
      commit('setStepTips', (typeof value !== 'undefined') ? value : false)
    }
  },

  namespaced: true
}
