import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentAdmin: {name: '', position: '', account: ''}
  },
  mutations: {
    toggleCurrentAdmin: (state, payload) => Object.assign(state.currentAdmin, payload)
  },
  actions: {
  },
  modules: {
  }
})
