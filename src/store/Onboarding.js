export default {
  state: {
    name: '', // new project name
    logo: '',
    background: ''
  },

  mutations: {
    setName (state, value) {
      state.name = value
    },

    setLogo (state, value) {
      state.logo = value
    },

    setBackground (state, value) {
      state.background = value
    }
  },

  actions: {
  },

  namespaced: true
}
