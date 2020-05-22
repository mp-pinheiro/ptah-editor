import Goals from './OnboardingGoalsScheme'
import Presets from './OnboardingPresetsScheme'

export default {
  state: {
    name: '', // new project name
    logo: '',
    background: '',
    goal: '', // selected goal id
    goals: Goals,
    presets: Presets,
    preset: null // selected preset object
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
    },

    setGoal (state, value) {
      state.goal = value
    },

    setPreset (state, value) {
      state.preset = value
    }
  },

  actions: {
  },

  namespaced: true
}
