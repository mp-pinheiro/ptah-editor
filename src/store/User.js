import axios from 'axios'
import api from './api'
import { getCookie, setCookie } from '@editor/util'

export default {
  state: {
    access_token: '',
    isAuth: false,
    mcLists: [], // user mailchimp lists,
    user: {},
    library: {
      uploads: [],
      count: 0,
      totalSize: 0,
      quoteRest: 0
    }
  },

  mutations: {
    setToken (state, token) {
      state.access_token = token
    },

    setAuth (state, value) {
      state.isAuth = value
    },

    setLists (state, value) {
      state.mcLists = value
    },

    setUser (state, value) {
      state.user = value
    },

    setUploads (state, value) {
      state.library = value
    }
  },

  actions: {
    /**
     * User login
     * @param commit
     * @param dispatch
     * @param data {Object} {email, password}
     * @return {Promise.<T>|Promise<any>|Promise}
     */
    login ({ commit, dispatch }, data) {
      return axios.post(`${process.env.VUE_APP_API}auth/login`, data)
        .then((response) => {
          commit('setUser', response.data)
          dispatch('setToken', response.data)
          return response.data
        })
    },

    /**
     * Set new access token to store and localeStorage
     * @param commit
     * @param token
     */
    setToken ({ commit }, token) {
      let options = {}

      if (process.env.NODE_ENV === 'production') {
        options = {
          domain: `${process.env.VUE_APP_COOKIE_DOMAIN}`,
          secure: true
        }
      }

      if (token.clear) {
        options['max-age'] = -1
      }

      setCookie('token', token.accessToken, options)
      setCookie('refreshToken', token.refreshToken, options)
      commit('setAuth', true)
    },

    /**
     * Refresh expired token
     * @param commit
     * @param state
     * @param dispatch
     * @returns {Promise.<T>|Promise<any>|Promise}
     */
    refreshToken ({ state, dispatch }) {
      return axios.post(`${process.env.VUE_APP_API}auth/refresh`, { refreshToken: getCookie('refreshToken') })
        .then((response) => {
          dispatch('setToken', response.data)

          return response.data
        })
        .catch((error) => {
          console.warn(error)
          dispatch('logout')
        })
    },

    logout ({ commit, dispatch }) {
      dispatch('setToken', {
        accessToken: '',
        refreshToken: '',
        clear: true
      })

      commit('setAuth', false)
      window.location.href = '/login'
    },

    /**
     * Get user info
     * @param commit
     * @returns {userId, mailchimpIntegration}
     */
    getUser ({ commit }) {
      return api.request({
        url: `user`,
        method: 'get'
      })
        .then(data => {
          commit('setUser', data)
        })
    },

    /**
     * Get user mailchimp lists
     * @param commit
     */
    mailchimpLists ({ commit }) {
      return api.request({
        url: `mailchimp/maillists`,
        method: 'get'
      })
        .then((lists) => {
          commit('setLists', lists)
          return lists
        })
    },

    mailchimpLogin ({ commit }) {
      return api.request({
        url: 'mailchimp/login',
        method: 'get'
      })
    },

    mailchimpCallback ({ commit }, params) {
      return api.request({
        url: 'mailchimp/login/callback',
        method: 'get',
        params
      }).then((response) => {
        this.user = response

        return response
      })
    },

    getUploads ({ commit }) {
      return api.request({
        url: 'user/uploads',
        method: 'get'
      }).then((response) => {
        commit('setUploads', response)
      })
    }
  },

  namespaced: true
}
