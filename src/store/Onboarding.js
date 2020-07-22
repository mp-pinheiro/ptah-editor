import Goals from './OnboardingGoalsScheme'
import Presets from './OnboardingPresetsScheme'
import CheckList from './OnboardingCheckListScheme'

import { filter } from 'lodash-es'

const COLORS = {
  headers: '',
  text: '',
  button: '',
  buttonText: '',
  buttonHover: '',
  add1: ''
}

const FONTS = {
  'Lato': {
    variants: ['regular'],
    subsets: ['latin', 'cyrillic']
  },
  'Montserrat': {
    variants: ['regular'],
    subsets: ['latin', 'cyrillic']
  }
}
const SETUP_FONTS = {
  'h1': 'Montserrat',
  'p': 'Lato',
  'btn': 'Montserrat'
}

const defaultState = {
  name: '', // new project name
  logo: '',
  video: '',
  background: '',
  backgroundColor: '#fafafa',
  firstScreen: '',
  colors: COLORS,
  fonts: FONTS,
  setupFonts: SETUP_FONTS,
  imageForPalette: null,
  palette: null,
  checkList: CheckList, // onboarding check-list
  activeStep: '',
  goal: '', // selected goal id
  goals: Goals,
  presets: Presets,
  preset: null, // selected preset object,
  loading: false
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

    setVideo (state, value) {
      state.video = value
    },

    setBackground (state, value) {
      state.background = value
    },

    setFirstScreen (state, value) {
      state.firstScreen = value
    },

    setBackgroundColor (state, value) {
      state.backgroundColor = value
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

    setFonts (state, value) {
      state.fonts = value
    },

    setSetupFonts (state, value) {
      state.setupFonts = value
    },

    setGoal (state, value) {
      state.goal = value
    },

    setPreset (state, value) {
      state.preset = value
    },

    resetState (state) {
      state.logo = ''
      state.background = ''
      state.backgroundColor = '#fafafa'
      state.firstScreen = ''
      state.colors = COLORS
      state.palette = null
      state.fonts = FONTS
      state.setupFonts = SETUP_FONTS
    },

    setLoading (state, value) {
      state.loading = value
    }
  },

  actions: {
    activateCheckListItem ({ state, commit }, item) {
      commit('activateCheckListItem', item)
    },

    deactivateCheckListItem ({ state, commit }, item) {
      commit('deactivateCheckListItem', item)
    },

    deactivateCheckList ({ state, commit }) {
      Object.keys(state.checkList).forEach((key, index) => {
        commit('deactivateCheckListItem', key)
      })
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
