import Goals from './OnboardingGoalsScheme'
import Presets from './OnboardingPresetsScheme'
import CheckList from './OnboardingCheckListScheme'

import { filter } from 'lodash-es'

const COLORS = {
  headers: '',
  text: '',
  button: '',
  buttonText: ''
}

const defaultState = {
  name: '', // new project name
  logo: '',
  background: '',
  colors: COLORS,
  imageForPalette: null,
  palette: null,
  checkList: CheckList, // onboarding check-list
  activeStep: '',
  goal: '', // selected goal id
  goals: Goals,
  presets: Presets,
  preset: null // selected preset object
}

export default {
  state: defaultState,

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

    setActiveStep (state, value) {
      state.activeStep = value
    },

    activateCheckListItem (state, item) {
      state.checkList[item].status = true
    },

    deactivateCheckListItem (state, item) {
      state.checkList[item].status = false
    },

    setPalette (state, value) {
      state.palette = value
    },

    setImageForPalette (state, value) {
      state.imageForPalette = value
    },

    setColors (state, value) {
      state.colors = value
    },

    setGoal (state, value) {
      state.goal = value
    },

    setPreset (state, value) {
      state.preset = value
    },

    resetState (state) {
      for (let prop in state) {
        prop = defaultState[prop]
      }
    }
  },

  actions: {
    activateCheckListItem ({ state, commit }, item) {
      commit('activateCheckListItem', item)
    },

    deactivateCheckListItem ({ state, commit }, item) {
      commit('deactivateCheckListItem', item)
    },

    updateColors ({ state, commit }, palette) {
      const colors = state.colors

      Object.keys(colors).forEach((key, index) => {
        colors[key] = palette[index]
      })

      commit('setColors', colors)
    }
  },

  getters: {
    progress: (state) => {
      let all = Object.keys(state.checkList).length
      let checked = filter(state.checkList, 'status').length

      return (checked / all * 100).toFixed(0)
    },

    colorsPalette: (state) => {
      return Object.values(state.colors).filter(c => c !== '')
    }
  },

  namespaced: true
}
